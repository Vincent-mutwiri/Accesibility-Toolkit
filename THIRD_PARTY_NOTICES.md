# Accessibility adapter attribution

The text extraction, speech chunking, cancellation lifecycle and reading-band
behavior in `accessibility/readAloud.ts` and `accessibility/ReadingRuler.tsx`
are adapted from the AI-for-Accessibility-Toolkit:

- Source: `tools/adapters/read-aloud.js`, `tools/adapters/reading-ruler.js`
- Source revision: `04ba203adcdd43bfbf91b64329e9be812658f12e`
- Local source reviewed: `/home/vincent/Desktop/Projects/senses_Hackathon/AI-for-Accessibility-Toolkit`
- License: Apache License 2.0, reproduced in `accessibility/LICENSE-Apache-2.0.txt`.
- No separate NOTICE file was present in the source repository.

Modifications: TypeScript interfaces and React lifecycle integration; native
browser speech only; explicit user-started playback; sequential chunk queue;
status reporting and startup timeout; expanded exclusions for app controls and
icons; React-rendered ruler with pointer, touch, keyboard and focus support,
without the original dimming overlays. No AI provider, telemetry, external
service or global adapter registration is included.
