# Teammate failure recovery and verification

## Incident and scope

On November 13, 2026, category-assessment teammate runs failed with connection,
certificate-verification, and disconnected-task errors. A failed worker does not
mean its files are absent, complete, or correct. Runtime status and delivery
status are tracked separately below.

The replacement attempts `run_00010`, `run_00011`, and `run_00012` remain failed.
They did not successfully resume. The lead completed report/test deliverables
and reviewed and validated the model left in the shared working tree. The
extension was subsequently recorded in base commit
`fd61dc527253b2166ced147184b81c7cfc8033ce`; that existing commit is not the identity
of the later recovery fixes. A verification manifest identifies the exact working
tree tested, including uncommitted changes.

## Reconciliation

| Failed assignment | Recovered responsibility | Completion evidence to require |
| --- | --- | --- |
| `module-reports`: `run_00008`, replacement `run_00010` | Lead completed combined HTML/PDF coverage, versions, completion, module labels and inactive exclusions | Module suite: partial/full all-52 reports, unique findings, supported Unicode, core-only inactive exclusions, production-preview exports |
| `module-tests`: `run_00009`, replacement `run_00011` | Lead implemented module regressions and ran the existing suites | Recorded scenario results, axe state results, browser errors, command exit codes and source identity |
| `module-model`: `run_00007`, replacement `run_00012` | Lead retained and reviewed model changes, then validated migration, persistence, report boundaries and applicability | All 1,024 selections; schema-1 restoration without writes; failed-save preservation; strict version/input validation; inactive restoration; maximum escaped draft round trip |

No completion is inferred from a worker becoming idle or from TypeScript alone.
Review in this recovery pass is lead-performed, not an independent teammate or
human sign-off.

## Findings corrected in the recovery pass

- **Keyboard focus loss:** activating Discard selection changes removed the
  focused button and left focus on the page body. Focus now moves to the module
  picker heading, with a keyboard regression assertion.
- **Overwritten PDF evidence:** production checks reused development filenames.
  Production PDFs and screenshots now have their own subdirectory, while the
  root results file contains the combined development/production scenario list.
- **Revision ambiguity:** historical logs did not identify the precise dirty
  source used. The verification runner records HEAD, Git status, per-file source
  hashes before/after, build hashes, required audit/browser hashes, commands,
  timestamps, logs and exit statuses. Source changes during a run invalidate it.
- **Server/artifact ambiguity:** verification uses its own strict-port development
  server and preview of a fresh build, refuses occupied ports, and retains each
  invocation in a new external output directory. Guide PDF tests now accept the
  same explicit URL/browser/output options as the other suites.

## Repeatable validation

Prerequisites: installed project dependencies, Python Playwright and pypdf, the
existing Brave binary, and a local axe bundle. Nothing downloads or disables TLS
verification. This comprehensive gate requires axe; a missing file is a failure,
not a silent skipped audit.

From `/home/vincent/Desktop/Projects/iHUB Projects/Accessibility V2/Accesibility-Toolkit`:

```sh
python3 tests/verify_assessment.py --help
python3 tests/verify_assessment.py \
  --browser /opt/brave.com/brave/brave \
  --axe /tmp/ihub-axe.min.js \
  --output /tmp/ihub-assessment-verification
```

The runner uses ports 3001 and 4174 by default; override `--dev-port` and
`--preview-port` with two free ports. Existing servers on 3000/4173 are not
reused or stopped. It runs whitespace validation, TypeScript, runner unit tests,
a production build, core/module regressions, production assessment PDF checks,
the general accessibility suite and all four guide PDF variants. Every check
must exit zero, and the final manifest must say `status: passed` and
`source_unchanged: true`.

Each run prints its absolute evidence directory. Its `manifest.json` is the
authoritative status; individual passing scenario lines or an incomplete results
file are insufficient. Preserve the entire directory for handoff or CI artifacts:
local `/tmp` evidence is not durable storage. A timeout/failure is nonzero and
stops the remaining gates; interruption is explicitly not a pass. Abrupt process
termination can leave `status: running`, which must be treated as incomplete.

## Future teammate recovery procedure

1. Inspect run status, last messages, assigned files and the working-tree diff.
   Preserve partial work; never reset or overwrite the shared tree blindly.
2. Confirm the worker has stopped before transferring ownership. If it is still
   running, cancel and await its termination first.
3. Retry a plausible transient failure once with a compact handoff. If it fails
   again, reassign or complete directly, keeping one writer per file.
4. Reconcile each requirement against actual code and test evidence. Review the
   replacement work and run the full gate against stable source.
5. Close with precise wording: “The worker remains failed; its deliverables were
   recovered and validated against the attached source manifest.” Do not claim
   the runtime itself was repaired.

## Unresolved boundaries

- The teammate host/API runtime is outside this repository. Its connection and
  certificate root causes have not been established here. Inspect the host's
  redacted logs and trusted-CA/proxy configuration before retrying in that host;
  never bypass TLS certificate verification. No runtime repair is claimed.
- Automated checks are not an accessibility audit or certification. Manual
  screen-reader/device and specialist-content review remain necessary, notably
  for dual-sensory journeys. The selectable-text PDF is not a tagged accessible
  PDF; semantic HTML remains the reading alternative.
- No independent human review or new commit is performed by the verification
  runner. Any subsequent source change requires another run.