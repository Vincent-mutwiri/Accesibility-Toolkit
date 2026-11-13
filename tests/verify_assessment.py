"""Run assessment recovery gates with fresh servers and revision-bound evidence.

No new dependencies: the browser suites use the existing Playwright/pypdf setup.
Axe and the browser are required here: a missing audit must not look like a pass.
Artifacts stay outside the repository; each invocation gets a new run directory.
"""
import argparse
from contextlib import contextmanager
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import signal
import socket
import subprocess
import sys
import time
from urllib.error import URLError
from urllib.request import urlopen


ROOT = Path(__file__).resolve().parents[1]


def timestamp():
    return datetime.now(timezone.utc).isoformat()


def git(root, *args):
    return subprocess.check_output(['git', '-C', str(root), *args])


def source_snapshot(root):
    """Hash tracked/non-ignored files, including dirty content and new tests.

    Ignored dependency, environment and build directories are not source evidence.
    Deleted tracked files get an explicit marker rather than disappearing silently.
    """
    names = git(root, 'ls-files', '--cached', '--others', '--exclude-standard', '-z')
    files = {}
    for name in sorted(set(os.fsdecode(name) for name in names.split(b'\0') if name)):
        path = root / name
        if path.is_symlink():
            content = ('symlink:' + os.readlink(path)).encode()
        elif path.is_file():
            content = path.read_bytes()
        else:
            files[name] = 'missing'
            continue
        files[name] = hashlib.sha256(content).hexdigest()
    digest = hashlib.sha256(json.dumps(files, sort_keys=True).encode()).hexdigest()
    return {
        'head': git(root, 'rev-parse', 'HEAD').decode().strip(),
        'status': git(root, 'status', '--porcelain=v1', '--untracked-files=all').decode(),
        'sha256': digest,
        'files': files,
    }


def write_manifest(path, manifest):
    temp = path.with_suffix('.tmp')
    temp.write_text(json.dumps(manifest, indent=2) + '\n')
    temp.replace(path)


def stop_process(process):
    """Stop only the process group this runner started, including descendants."""
    if process.poll() is not None:
        return
    os.killpg(process.pid, signal.SIGTERM)
    try:
        process.wait(timeout=10)
    except subprocess.TimeoutExpired:
        os.killpg(process.pid, signal.SIGKILL)
        process.wait(timeout=10)


def run_step(name, command, root, output, manifest, timeout):
    record = {'name': name, 'command': [str(arg) for arg in command],
              'cwd': str(root), 'started_at': timestamp(), 'status': 'running',
              'log': str(output / (name + '.log'))}
    manifest['steps'].append(record)
    write_manifest(output / 'manifest.json', manifest)
    print('RUN ' + name, flush=True)
    process = None
    try:
        with Path(record['log']).open('wb') as log:
            process = subprocess.Popen(record['command'], cwd=root, stdout=log,
                                       stderr=subprocess.STDOUT, start_new_session=True)
            record['exit_code'] = process.wait(timeout=timeout)
        record['status'] = 'passed' if record['exit_code'] == 0 else 'failed'
        if record['status'] != 'passed':
            raise RuntimeError(f'{name} failed; see {record["log"]}')
    except BaseException as error:
        record['status'] = 'interrupted' if isinstance(error, KeyboardInterrupt) else 'failed'
        record['error'] = str(error) or type(error).__name__
        raise
    finally:
        if process:
            stop_process(process)
            record['exit_code'] = process.returncode
        record['ended_at'] = timestamp()
        write_manifest(output / 'manifest.json', manifest)


@contextmanager
def server(kind, port, root, output, manifest):
    # Never silently reuse another process's server/build or terminate it.
    with socket.socket() as probe:
        probe.bind(('127.0.0.1', port))
    vite = root / 'node_modules' / '.bin' / 'vite'
    command = [str(vite), *(['preview'] if kind == 'production' else []),
               '--host', '127.0.0.1', '--port', str(port), '--strictPort']
    url = f'http://127.0.0.1:{port}'
    record = {'kind': kind, 'url': url, 'command': command,
              'log': str(output / (kind + '-server.log')), 'started_at': timestamp()}
    manifest['servers'].append(record)
    write_manifest(output / 'manifest.json', manifest)
    with Path(record['log']).open('wb') as log:
        process = subprocess.Popen(command, cwd=root, stdout=log,
                                   stderr=subprocess.STDOUT, start_new_session=True)
        try:
            deadline = time.monotonic() + 30
            while time.monotonic() < deadline:
                if process.poll() is not None:
                    raise RuntimeError(f'{kind} server exited; see {record["log"]}')
                try:
                    with urlopen(url, timeout=1) as response:
                        body = response.read().decode()
                    marker = '/assets/' if kind == 'production' else '/@vite/client'
                    if marker not in body:
                        raise RuntimeError(f'{kind} server returned an unexpected application')
                    record['ready_at'] = timestamp()
                    write_manifest(output / 'manifest.json', manifest)
                    break
                except (URLError, TimeoutError):
                    time.sleep(.2)
            else:
                raise RuntimeError(f'{kind} server did not become ready; see {record["log"]}')
            yield url
        finally:
            stop_process(process)
            record['stopped_at'] = timestamp()
            record['exit_code'] = process.returncode
            write_manifest(output / 'manifest.json', manifest)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=Path('/tmp/ihub-assessment-verification'))
    parser.add_argument('--browser', type=Path, default=Path('/opt/brave.com/brave/brave'))
    parser.add_argument('--axe', type=Path, default=Path('/tmp/ihub-axe.min.js'))
    parser.add_argument('--dev-port', type=int, default=3001)
    parser.add_argument('--preview-port', type=int, default=4174)
    parser.add_argument('--timeout', type=int, default=600, help='Maximum seconds per check')
    args = parser.parse_args()
    args.output = args.output.resolve()
    args.browser, args.axe = args.browser.resolve(), args.axe.resolve()
    if args.output == ROOT or ROOT in args.output.parents:
        parser.error('--output must be outside the source repository')
    if not (0 < args.dev_port < 65536 and 0 < args.preview_port < 65536):
        parser.error('ports must be in the range 1–65535')
    if args.dev_port == args.preview_port or args.timeout <= 0:
        parser.error('ports must differ and --timeout must be positive')
    output = args.output / datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    output.mkdir(parents=True, exist_ok=False)
    manifest = {'started_at': timestamp(), 'status': 'running', 'root': str(ROOT),
                'output': str(output), 'source_before': source_snapshot(ROOT),
                'steps': [], 'servers': [], 'python': sys.version}
    write_manifest(output / 'manifest.json', manifest)
    print('Evidence: ' + str(output), flush=True)
    exit_code = 1
    try:
        for label, path in [('browser', args.browser), ('axe', args.axe)]:
            if not path.is_file():
                raise RuntimeError(f'Required {label} is missing: {path}')
        manifest['tools'] = {label: {'path': str(path), 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
                             for label, path in [('browser', args.browser), ('axe', args.axe)]}
        def check(name, command):
            run_step(name, command, ROOT, output, manifest, args.timeout)

        check('whitespace', ['git', 'diff', '--check'])
        check('typescript', [ROOT / 'node_modules/.bin/tsc', '--noEmit'])
        check('runner-tests', [sys.executable, ROOT / 'tests/check_verification_runner.py'])
        check('build', ['npm', 'run', 'build'])
        manifest['build'] = {str(path.relative_to(ROOT / 'dist')): hashlib.sha256(path.read_bytes()).hexdigest()
                             for path in sorted((ROOT / 'dist').rglob('*')) if path.is_file()}
        with server('development', args.dev_port, ROOT, output, manifest) as dev:
            with server('production', args.preview_port, ROOT, output, manifest) as preview:
                common = ['--url', dev, '--browser', args.browser]
                check('core', [sys.executable, ROOT / 'tests/check_self_assessment.py', *common,
                               '--axe', args.axe, '--output', output / 'core'])
                check('modules', [sys.executable, ROOT / 'tests/check_assessment_modules.py', *common,
                                  '--production-url', preview, '--axe', args.axe, '--output', output / 'modules'])
                check('accessibility', [sys.executable, ROOT / 'tests/check_accessibility.py', *common,
                                        '--axe', args.axe, '--output', output / 'accessibility'])
                check('guide-pdf', [sys.executable, ROOT / 'tests/check_pdf_export.py', *common,
                                    '--output', output / 'guide-pdf'])
        manifest['status'] = 'passed'
        exit_code = 0
    except KeyboardInterrupt:
        manifest['status'], manifest['error'] = 'interrupted', 'Verification interrupted; not a pass.'
        exit_code = 130
    except Exception as error:
        manifest['status'], manifest['error'] = 'failed', str(error)
    finally:
        manifest['source_after'] = source_snapshot(ROOT)
        manifest['source_unchanged'] = manifest['source_before'] == manifest['source_after']
        if not manifest['source_unchanged']:
            manifest['status'], manifest['error'] = 'failed', 'Source changed during validation; rerun on a stable checkout.'
            exit_code = 1
        manifest['ended_at'] = timestamp()
        write_manifest(output / 'manifest.json', manifest)
    print(manifest['status'].upper() + ': ' + str(output / 'manifest.json'), flush=True)
    return exit_code


if __name__ == '__main__':
    raise SystemExit(main())