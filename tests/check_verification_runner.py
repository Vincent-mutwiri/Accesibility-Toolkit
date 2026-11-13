"""Standard-library tests for trustworthy verification failure handling."""
import json
from pathlib import Path
import socket
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
from verify_assessment import run_step, server, source_snapshot


class VerificationRunnerTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / 'source'
        self.output = Path(self.temp.name) / 'evidence'
        self.root.mkdir()
        self.output.mkdir()
        self.manifest = {'status': 'running', 'steps': [], 'servers': []}
        subprocess.run(['git', 'init', '-q', str(self.root)], check=True)
        (self.root / 'tracked.txt').write_text('original\n')
        (self.root / '.gitignore').write_text('ignored/\n')
        subprocess.run(['git', '-C', str(self.root), 'add', '.'], check=True)
        subprocess.run(['git', '-C', str(self.root), '-c', 'user.name=Verification test',
                        '-c', 'user.email=verification@example.invalid', 'commit', '-qm', 'fixture'], check=True)

    def record(self):
        return json.loads((self.output / 'manifest.json').read_text())['steps'][-1]

    def test_snapshot_detects_dirty_source(self):
        before = source_snapshot(self.root)
        (self.root / 'tracked.txt').write_text('modified\n')
        after = source_snapshot(self.root)
        self.assertEqual(before['head'], after['head'])
        self.assertNotEqual(before['sha256'], after['sha256'])
        self.assertTrue(after['status'])

    def test_snapshot_includes_new_files_and_deletions(self):
        before = source_snapshot(self.root)
        (self.root / 'new-test.py').write_text('assert True\n')
        (self.root / 'tracked.txt').unlink()
        after = source_snapshot(self.root)
        self.assertIn('new-test.py', after['files'])
        self.assertEqual(after['files']['tracked.txt'], 'missing')
        self.assertNotEqual(before['sha256'], after['sha256'])

    def test_snapshot_excludes_ignored_build_artifacts(self):
        before = source_snapshot(self.root)
        (self.root / 'ignored').mkdir()
        (self.root / 'ignored/build.txt').write_text('generated\n')
        self.assertEqual(before, source_snapshot(self.root))

    def test_success_has_exit_code_command_and_log(self):
        run_step('passing', [sys.executable, '-c', 'print("captured result")'],
                 self.root, self.output, self.manifest, 10)
        record = self.record()
        self.assertEqual(record['status'], 'passed')
        self.assertEqual(record['exit_code'], 0)
        self.assertEqual(record['cwd'], str(self.root))
        self.assertIn('captured result', Path(record['log']).read_text())
        self.assertIn('ended_at', record)

    def test_nonzero_exit_never_passes(self):
        with self.assertRaises(RuntimeError):
            run_step('failing', [sys.executable, '-c', 'raise SystemExit(7)'],
                     self.root, self.output, self.manifest, 10)
        self.assertEqual(self.record()['status'], 'failed')
        self.assertEqual(self.record()['exit_code'], 7)

    def test_timeout_stops_process_and_records_failure(self):
        with self.assertRaises(subprocess.TimeoutExpired):
            run_step('timeout', [sys.executable, '-c', 'import time;time.sleep(30)'],
                     self.root, self.output, self.manifest, .1)
        self.assertEqual(self.record()['status'], 'failed')
        self.assertIsNotNone(self.record()['exit_code'])
        self.assertNotEqual(self.record()['exit_code'], 0)

    def test_missing_command_records_failure(self):
        with self.assertRaises(FileNotFoundError):
            run_step('missing', [self.root / 'nonexistent'],
                     self.root, self.output, self.manifest, 10)
        self.assertEqual(self.record()['status'], 'failed')

    def test_busy_port_is_not_reused_or_terminated(self):
        with socket.socket() as listener:
            listener.bind(('127.0.0.1', 0))
            listener.listen()
            port = listener.getsockname()[1]
            with self.assertRaises(OSError):
                with server('development', port, self.root, self.output, self.manifest):
                    self.fail('Existing server must not be reused')
            # The listening socket still works after refusal.
            with socket.create_connection(('127.0.0.1', port), timeout=1):
                connection, _ = listener.accept()
                connection.close()
        self.assertEqual(self.manifest['servers'], [])


if __name__ == '__main__':
    unittest.main(verbosity=2)