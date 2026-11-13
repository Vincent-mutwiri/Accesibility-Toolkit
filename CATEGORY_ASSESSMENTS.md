# Category-specific self-assessment

The assessment combines the unchanged 22-question core with optional category
modules and generates one HTML/PDF report. It is a self-reported reflection, not
a score, audit, certification, or assessment of a learner's diagnosis.

## Content and ownership

`assessment/questions.ts` owns the core (question version 1.0.0).
`assessment/catalog.ts` owns 30 authored specialist questions and ten modules.
The specialist questions adapt existing toolkit guides; they do not establish
that every prescription or certification claim in those guides is appropriate.
In particular, dual sensory questions need specialist/user review before any
claim of broad access. Braille testing does not represent all deafblind people.

| Module | Shared references | Exclusive questions |
| --- | --- | --- |
| Management Systems (including LMS) | SH04, SH05, SH06, SH08 | MS01–MS03 |
| Online Learning | SH01, SH02, SH03, SH08 | OL01 |
| Digital Learning | SH07 | DL01–DL03 |
| Tutoring & Revision | SH01–SH06, SH08 | TUT01 |
| STEAM | SH04, SH05, SH07 | STM01–STM03 |
| Workforce & Skills | SH02, SH03, SH04 | WF01–WF03 |
| Visual access | SH07 | VIS01–VIS02 |
| Hearing access | SH01, SH02 | HEAR01–HEAR02 |
| Cognitive accessibility / IDD | SH07, SH08 | COG01–COG02 |
| Dual sensory access | None | DSL01–DSL02 |

Shared checks cover live captions, written participation, moderation, algorithm
review, data transparency, personalization controls, reduced stimulation, and
constructive feedback. An answer is reused only for the identical question in
the same declared project/scope. Different feature contexts must be described
in the answer: partial implementation is No / Not yet fully.

All modules together add 30 unique questions, giving 52 with the core. Module
summaries overlap; overall progress counts each question once. Related core IDs
explain boundaries but never copy or mutate answers. Not applicable is allowed
only under each question's stated absence rule. HEAR01 cannot excuse missing
captions reported by Q06 or an active SH01.

## Selection and persistence

- Choose zero or more modules before starting. Apply or discard pending changes
  before leaving setup. All ten modules are available; core-only is supported.
- Removing modules retains their responses in the draft but excludes exclusive
  inactive questions from progress, active validation, findings, and PDF output.
- Re-adding compatible modules restores answers. Clearing removes both active
  and inactive responses after confirmation.
- Guide entry links only suggest a module; they never overwrite selections.
- Draft schema 2 uses the existing dedicated storage key. Schema 1 core-only
  records are validated and migrated in memory, without writing on restoration.
  A successful explicit save replaces the record atomically through setItem.
- All module versions, including those governing inactive answers, are checked.
  Unknown IDs, duplicate module selections, and malformed responses are rejected.
  Incompatible records remain untouched until an explicit clear or save.
- Failed storage falls back to this tab's memory with a visible warning. It
  survives same-tab navigation, not reload or closing the tab.

## Reporting and maintenance

`getActiveQuestions`/`getActiveSections` are the common selection boundary.
`buildReport` derives core/module completion, selected versions, unselected
modules, counts, and unique findings for both HTML and PDF. Complete always
means complete for the selected scope; unselected modules are **Not assessed in
depth**, never passed or Not applicable. Export uses a captured report snapshot.

Change a module's version when its wording, options, applicability, or question
membership changes. Changes to a shared question require versioning every
referencing module. Do not silently reinterpret old responses. Future migration
must be explicit and independently tested.

The PDF remains selectable Unicode text, **not a tagged accessible PDF**.
Structured HTML remains available. Unsupported writing systems fail explicitly
rather than silently changing text. Manual screen-reader, device, content, and
PDF accessibility review remain necessary.

## Verification

Use the repository's existing TypeScript/build commands, then run both the core
assessment regression and `tests/check_assessment_modules.py` against the local
Vite server. The module suite checks catalog combinations, draft compatibility,
selection/restoration, validation, report scope, and PDF content. Local Python
Playwright, pypdf, Brave, and an optional local axe script are the same tools used
by the existing regression suite. Do not add real learner information to fixtures.

For an additional production-preview PDF check, run a preview of the current
build on port 4173 and pass `--production-url http://localhost:4173` to the module
suite. The main `--url` must still point at Vite development: pure model checks
intentionally import the source TypeScript modules through Vite.

Validated on November 13, 2026:

- TypeScript, production build, and whitespace validation passed.
- Core assessment: 17/17 scenarios, 11 axe states, no findings or page errors.
- Category assessment, including production preview: 12/12 scenarios, all 1,024
  module selections, 11 axe states, no findings or page errors.
- General accessibility regression passed with axe enabled.
- Existing guide PDF pagination regression passed all four export variants.
- Full/partial 52-question PDFs preserved supported Unicode and unique findings;
  core-only export excluded retained inactive specialist details.

These are automated regression results, not a conformance or certification claim.