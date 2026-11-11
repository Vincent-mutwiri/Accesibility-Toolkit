# Accessibility integration

Guide routes show read-aloud controls only after the person enables Read aloud
on the Accessibility page. The whole toolbar and its help text are hidden by
default; the choice persists, and reset hides it again. The Accessibility page
controls theme, text size, contrast, motion, spacing, larger targets and a
reading ruler. The Screen reader support switch is off by default and enables
automatic heading focus on page changes. The choice persists and reset turns
it off. Navigation always waits for lazy content and updates the page title;
normal semantic HTML, keyboard controls, skip links and explicit status/error
messages remain available. Contents controls move focus to section headings.

## Adapter boundaries

`readAloud.ts` and `ReadingRuler.tsx` adapt selected Apache-2.0 source from
AI-for-Accessibility-Toolkit. See `../THIRD_PARTY_NOTICES.md` and the included
license. No dependency on the sibling repository is required to build or run.

- Read aloud uses native speech synthesis and sentence-sized chunks. It
  excludes navigation, controls, decorative icons, live regions and hidden
  content. Speech is never started by restoring a preference, and is cancelled
  on route changes. The displayed status reflects actual speech callbacks.
- Voice lists update when the browser makes voices available. A missing saved
  voice falls back to the device default. Browser/OS voice availability,
  network requirements and actual pronunciation vary; offline speech is not
  guaranteed. There is no app-managed speech service or AI request.
- The ruler is a React-owned, non-interactive visual band with no dimming
  overlay. It follows pointer/touch position, keyboard focus and arrow keys
  outside editable fields. It never prevents the browser's native key actions.
- App-owned CSS provides larger controls and spacing; it does not rewrite
  React-managed text or inject generic repair observers.

## Preferences and compatibility

`Preferences.tsx` owns the validated `ihub-accessibility-v1` browser-storage
record. It migrates the former theme, font size, contrast and motion keys and
removes the obsolete screen reader key. Blocked or corrupt storage falls back
to session state/defaults. Reset clears optional tools and restores device
appearance, standard text and normal speech rate. Device reduced motion
remains effective even when the optional switch is unchecked.

The preferences contain display/reading choices only. No inferred disability
profile, audio recording, telemetry or AI provider has been added.

## Verification

Run with the existing local Python Playwright installation and Chromium/Brave:

```sh
pnpm exec tsc --noEmit
pnpm build
pnpm dev
# In another terminal:
python3 tests/check_accessibility.py --url http://localhost:3000
```

For automated accessibility rules, provide a local axe-core 4.10.3 bundle:

```sh
curl -fL https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js -o /tmp/ihub-axe.min.js
python3 tests/check_accessibility.py --axe /tmp/ihub-axe.min.js
```

The suite covers all 18 routes, heading focus/title updates, skip links,
menus, section focus, checklists, feedback labels/errors, saved preferences,
reset/migration, ruler controls, denied storage, OS preferences, 320px and
720px reflow, and deterministic speech lifecycle checks. Speech mocks verify
control behavior and cancellation; they do not verify audible playback.
The 720px check approximates the layout width at 200% zoom on a 1440px screen;
actual browser zoom still needs a manual check. Reports and screenshots are
written under `/tmp/ihub-accessibility-qa` by default.

Latest local verification (2026-11-11): TypeScript and production build passed;
the full browser suite passed, with zero axe findings across 18 routes and
six additional combined-preference/light-dark scans. The audit also led to
fixes for 61 existing unlabeled guide checkboxes. These results apply to the
automated scenarios above, not to the manual checks below.

## Manual acceptance still required

- NVDA with Firefox: headings/landmarks, first navigation to an unloaded
  guide, Back/Forward, menus, checkboxes and feedback errors.
- VoiceOver with Safari and TalkBack with Chrome: the same flows, including
  touch exploration, toolbar names/states and focus after navigation.
- Real speech: start, pause/resume, stop, long guides, navigation during
  speech, available voices and delayed/missing voice lists on each browser.
- Actual 200% zoom, dark/light/high-contrast appearance, reduced motion,
  larger controls and spacing combinations, including opened checklists.
- Reading ruler: keyboard and touch use without obstructing content or
  consuming native navigation keys.

These assistive-technology and listening checks require real devices/software;
automated rule checks do not establish WCAG conformance or universal access.

## Existing dependency findings

Production dependency audits flag existing React Router advisories in the
installed/locked version. This change adds only React type declarations and
does not upgrade the router. The application uses declarative HashRouter
with fixed internal route targets; it has no SSR or framework data loaders.
Review the advisory applicability and upgrade the router before a release.
Both existing lockfiles were kept in sync for the new type declarations;
this workspace currently installs with pnpm.
