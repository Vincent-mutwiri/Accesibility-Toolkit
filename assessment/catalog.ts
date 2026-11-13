import { questions, sections, type Question, type Section, type Source } from './questions';

/** Authored adaptations of the toolkit guides, not a standards-conformance audit. */
export const MODULE_VERSION = '1.0.0';

export interface AssessmentModule {
  id: string;
  title: string;
  family: 'product' | 'accessibility';
  description: string;
  questionIds: string[];
  source: Source;
  version: string;
}

// Paths are registered in App.tsx. Section IDs below are literal DOM IDs in the
// corresponding guides. Disability guides have no section anchors: link to the
// page rather than inventing an anchor from a heading or checklist input ID.
const management = (sectionId: string, label: string): Source => ({ path: '/management-systems', sectionId, label: `Management Systems — ${label}` });
const online = (sectionId: string, label: string): Source => ({ path: '/online-learning', sectionId, label: `Online Learning — ${label}` });
const digital = (sectionId: string, label: string): Source => ({ path: '/digital-learning', sectionId, label: `Digital Learning — ${label}` });
const tutoring = (sectionId: string, label: string): Source => ({ path: '/tutoring', sectionId, label: `Tutoring & Test Prep — ${label}` });
const steam = (sectionId: string, label: string): Source => ({ path: '/steam', sectionId, label: `STEAM — ${label}` });
const workforce = (sectionId: string, label: string): Source => ({ path: '/workforce', sectionId, label: `Workforce & Skills — ${label}` });
const visual: Source = { path: '/visual-impairment', label: 'Visual Impairment — EdTech Systems' };
const hearing: Source = { path: '/hearing-impairment', label: 'Hearing Impairment — EdTech Systems' };
const cognitive: Source = { path: '/intellectual-developmental-disabilities', label: 'Intellectual Developmental Disabilities — Practical Applications' };
const dualSensory: Source = { path: '/dual-sensory-loss', label: 'Dual Sensory Loss — Tactile-first Design' };

/** Registry order is the stable assessment, section, and report order. */
export const modules: AssessmentModule[] = [
  {
    id: 'management-systems', title: 'Management Systems', family: 'product',
    description: 'Review authentication alternatives, scoring review, learner data choices, and responsible personalization in learning management and information systems.',
    questionIds: ['SH04', 'SH05', 'SH06', 'SH08', 'MS01', 'MS02', 'MS03'],
    source: management('introduction', 'Introduction'), version: MODULE_VERSION,
  },
  {
    id: 'online-learning', title: 'Online Learning', family: 'product',
    description: 'Review live participation, written discussion, safe communities, supportive feedback, and equivalent asynchronous learning.',
    questionIds: ['SH01', 'SH02', 'SH03', 'SH08', 'OL01'],
    source: online('introduction', 'Introduction'), version: MODULE_VERSION,
  },
  {
    id: 'digital-learning', title: 'Digital Learning Content', family: 'product',
    description: 'Review default contrast, accessible table structure, decorative images, and controls for distracting motion or background audio.',
    questionIds: ['SH07', 'DL01', 'DL02', 'DL03'],
    source: digital('introduction', 'Introduction'), version: MODULE_VERSION,
  },
  {
    id: 'tutoring', title: 'Tutoring & Test Prep', family: 'product',
    description: 'Review inclusive live tutoring, community participation, personalization and data transparency, supportive feedback, and published technical requirements.',
    questionIds: ['SH01', 'SH02', 'SH03', 'SH04', 'SH05', 'SH06', 'SH08', 'TUT01'],
    source: tutoring('introduction', 'Introduction'), version: MODULE_VERSION,
  },
  {
    id: 'steam', title: 'STEAM', family: 'product',
    description: 'Review fair recommendations, data explanations, sensory controls, scaffolded creative work, offline project editing, and reflection.',
    questionIds: ['SH04', 'SH05', 'SH07', 'STM01', 'STM02', 'STM03'],
    source: steam('introduction', 'Introduction'), version: MODULE_VERSION,
  },
  {
    id: 'workforce', title: 'Workforce & Skills', family: 'product',
    description: 'Review community access and safety, fair matching, recognition of informal skills, credential validation, and portable achievements.',
    questionIds: ['SH02', 'SH03', 'SH04', 'WF01', 'WF02', 'WF03'],
    source: workforce('introduction', 'Introduction'), version: MODULE_VERSION,
  },
  {
    id: 'visual-access', title: 'Visual Access', family: 'accessibility',
    description: 'Review motion controls, mathematical structure, and dialog operation without depending on sight. Adds depth to, rather than replacing, the core checks.',
    questionIds: ['SH07', 'VIS01', 'VIS02'], source: visual, version: MODULE_VERSION,
  },
  {
    id: 'hearing-access', title: 'Hearing Access', family: 'accessibility',
    description: 'Review live captions, written participation, caption customization, and equivalent text-based conversation without depending on hearing.',
    questionIds: ['SH01', 'SH02', 'HEAR01', 'HEAR02'], source: hearing, version: MODULE_VERSION,
  },
  {
    id: 'cognitive-access', title: 'Cognitive Access', family: 'accessibility',
    description: 'Review reduced distraction, supportive feedback, adjustable practice difficulty, and assessment spread across manageable interactions.',
    questionIds: ['SH07', 'SH08', 'COG01', 'COG02'], source: cognitive, version: MODULE_VERSION,
  },
  {
    id: 'dual-sensory-access', title: 'Dual Sensory Access', family: 'accessibility',
    description: 'Review complete journeys with refreshable Braille and tactile or structured alternatives to spatial content, without assuming residual sight or hearing.',
    questionIds: ['DSL01', 'DSL02'], source: dualSensory, version: MODULE_VERSION,
  },
];

/** Stable semantic option IDs describe implementation methods, not scores. */
export const specialistQuestions: Question[] = [
  {
    id: 'SH01', sectionId: 'shared',
    text: 'Do live learning sessions provide accurate real-time captions or transcription?',
    options: [
      { id: 'live-caption-service', label: 'Real-time captioning service' },
      { id: 'live-transcript', label: 'Live text transcription' },
      { id: 'caption-quality-review', label: 'Checks of accuracy, speaker identification, and delay' },
    ],
    guidance: 'Arrange real-time captions or transcription for live speech. Check specialist terms, speaker changes, and delay; an unreviewed automatic caption switch alone does not establish usable access. Prerecorded captions are covered separately in Q06.',
    verify: 'Join a representative live session as a learner. Enable captions, compare them with speech including subject terms and speaker changes, and record accuracy and delay. Confirm learners can find the service before the session.',
    source: tutoring('accessibility', 'Live Tutoring'), allowNA: true,
    naCondition: 'Only when the product has no live sessions containing speech.', relatedCore: ['Q06', 'Q07'],
  },
  {
    id: 'SH02', sectionId: 'shared',
    text: 'Can learners participate in discussions through a written channel rather than speech alone?',
    options: [
      { id: 'session-text-chat', label: 'Text chat during sessions' },
      { id: 'discussion-forums', label: 'Written discussion forums' },
      { id: 'collaborative-documents', label: 'Shared written collaboration spaces' },
    ],
    guidance: 'Provide a written route for contributing questions and ideas, not just reading others’ contributions. Make sure facilitators include written contributions in the discussion. General help channels remain covered by Q19.',
    verify: 'Take part in a representative discussion without speaking. Post a question and respond to a peer; check that the facilitator and other learners can see and respond to the contribution without requiring a voice follow-up.',
    source: online('inclusive-interaction', 'Inclusive Interaction'), allowNA: true,
    naCondition: 'Only when the product has no learner discussions or collaborative communication.', relatedCore: ['Q12', 'Q19'],
  },
  {
    id: 'SH03', sectionId: 'shared',
    text: 'Are learner discussions and community spaces moderated to support safe, respectful participation?',
    options: [
      { id: 'community-conduct-rules', label: 'Visible community conduct rules' },
      { id: 'accessible-reporting', label: 'Accessible routes to report harmful behaviour' },
      { id: 'moderator-response-process', label: 'Assigned moderators and a documented response process' },
    ],
    guidance: 'Make respectful participation expectations visible, provide a usable reporting route, and assign responsibility for responding. Moderation should protect marginalized voices rather than discourage them from participating.',
    verify: 'Inspect conduct rules and the moderation process. Using a test account, locate and exercise the reporting route without posting harmful content. Trace an anonymised or simulated report to a moderator response and follow-up.',
    source: online('inclusive-interaction', 'Inclusive Interaction'), allowNA: true,
    naCondition: 'Only when the product has no learner community, peer discussion, or collaborative spaces.', relatedCore: ['Q19', 'Q22'],
  },
  {
    id: 'SH04', sectionId: 'shared',
    text: 'Are algorithms that recommend, match, or score learners reviewed for unfair outcomes?',
    options: [
      { id: 'algorithm-outcome-review', label: 'Reviews of recommendation, matching, or scoring outcomes' },
      { id: 'representative-test-cases', label: 'Representative test cases for bias and stereotyping' },
      { id: 'tracked-fairness-actions', label: 'Recorded findings, owners, and follow-up checks' },
    ],
    guidance: 'Identify automated decisions that affect learning or opportunity. Review outcomes for unfair differences and stereotyping, document limitations, and track corrective action. Do not collect sensitive personal data in this assessment.',
    verify: 'Review a recent algorithm review record with anonymised or synthetic examples. Check which decisions and groups were considered, how unfair outcomes were investigated, and whether an assigned action was checked after changes.',
    source: management('monitoring', 'Algorithmic Fairness Audits'), allowNA: true,
    naCondition: 'Only when no algorithms recommend learning content, match opportunities, or score learners.', relatedCore: ['Q17', 'Q20', 'Q22'],
  },
  {
    id: 'SH05', sectionId: 'shared',
    text: 'Is learner data use explained clearly at the point where data is collected or used?',
    options: [
      { id: 'plain-data-notice', label: 'Plain-language explanations of data use' },
      { id: 'contextual-data-explanation', label: 'Contextual explanations alongside collection or use' },
      { id: 'data-sharing-explanation', label: 'Clear explanations of sharing and retention' },
    ],
    guidance: 'Explain what learner data is used, why it is needed, and who receives it in language learners can understand. Distinguish essential processing from optional uses instead of relying only on a long privacy policy.',
    verify: 'Follow a learner journey through registration, progress tracking, and recommendations where present. At each collection or use point, locate the explanation and compare it with the documented data flow, sharing, and retention arrangements.',
    source: management('data-privacy', 'Data Privacy and Algorithmic Fairness'), allowNA: true,
    naCondition: 'Only when no learner data is collected, stored, or used, including analytics and progress data.', relatedCore: ['Q10'],
  },
  {
    id: 'SH06', sectionId: 'shared',
    text: 'Can learners review and change personalization settings rather than being locked into an inferred profile?',
    options: [
      { id: 'editable-learning-preferences', label: 'Editable learning preferences and profiles' },
      { id: 'recommendation-override', label: 'Ways to override recommended learning paths' },
      { id: 'personalization-reset', label: 'Controls to reset or turn off optional personalization' },
    ],
    guidance: 'Let learners correct inferred preferences and change their learning pathway. Avoid using demographic assumptions to lock learners into a level or topic. Keep controls clearly labelled and usable with assistive technology.',
    verify: 'Use a test profile with recommendations enabled. Find and change its settings, override a recommendation, and check that the resulting pathway changes without removing access to essential learning.',
    source: management('content-management', 'Personalization Without Stereotyping'), allowNA: true,
    naCondition: 'Only when the product does not personalize content, recommendations, or learning pathways.', relatedCore: ['Q14', 'Q17'],
  },
  {
    id: 'SH07', sectionId: 'shared',
    text: 'Can learners reduce or turn off non-essential animation and background audio?',
    options: [
      { id: 'pause-disable-motion', label: 'Controls to pause or disable non-essential motion' },
      { id: 'reduced-motion-preference', label: 'Support for reduced-motion preferences' },
      { id: 'background-audio-control', label: 'Separate controls to mute or reduce background audio' },
    ],
    guidance: 'Reduce sensory distraction without removing learning information. Respect reduced-motion preferences and provide usable motion and background-audio controls. This goes beyond using multiple cues for important information in Q08.',
    verify: 'Open representative animated or audio-enhanced activities. Enable the device reduced-motion preference and test available pause, disable, and mute controls using a keyboard. Check that essential instructions and task state remain available.',
    source: cognitive, allowNA: true,
    naCondition: 'Only when there is no non-essential animation, moving content, or background audio.', relatedCore: ['Q08', 'Q14'],
  },
  {
    id: 'SH08', sectionId: 'shared',
    text: 'Does learning feedback acknowledge effort and explain a constructive next step without shaming learners?',
    options: [
      { id: 'supportive-error-feedback', label: 'Supportive explanations of errors' },
      { id: 'actionable-next-steps', label: 'Specific, achievable next steps' },
      { id: 'effort-progress-recognition', label: 'Recognition of effort and progress' },
    ],
    guidance: 'Use encouraging, specific feedback that helps learners understand what to try next. Avoid labels that imply fixed ability, public comparisons, or shaming. Review feedback across success, error, and retry states.',
    verify: 'Complete a sample activity with correct and incorrect responses and a retry. Inspect feedback for respectful language, an understandable explanation, and an actionable next step; review learner feedback on whether it helps.',
    source: cognitive, allowNA: true,
    naCondition: 'Only when the product has no learning activities that provide feedback.', relatedCore: ['Q10', 'Q19'],
  },
  {
    id: 'MS01', sectionId: 'management-systems',
    text: 'Can eligible learners access learning without needing an institutional email address?',
    options: [
      { id: 'personal-email-access', label: 'Registration with a personal email address' },
      { id: 'guest-access', label: 'Guest access to essential learning' },
      { id: 'alternative-account-route', label: 'An alternative account or supported enrollment route' },
    ],
    guidance: 'Do not make possession of an institutional email address the only route into learning. Offer an appropriate alternative that preserves privacy and access to essential activities, including on shared devices.',
    verify: 'Attempt enrollment and an essential activity using a test learner without an institutional email address. Confirm that the alternative route works through completion, not just to a preview or registration screen.',
    source: management('access-authentication', 'Equitable Access and Authentication'), allowNA: true,
    naCondition: 'Only when learning is openly accessible without registration.', relatedCore: ['Q15', 'Q16'],
  },
  {
    id: 'MS02', sectionId: 'management-systems',
    text: 'Can learners request human review of high-stakes automated assessment scores or decisions?',
    options: [
      { id: 'score-review-request', label: 'A clearly labelled score-review request route' },
      { id: 'human-review-process', label: 'A documented human review process' },
      { id: 'review-outcome-explanation', label: 'An explanation of the review outcome' },
    ],
    guidance: 'Explain how to challenge an automated score or assessment decision and who will review it. Make human oversight meaningful, with access to relevant evidence and authority to correct an error.',
    verify: 'From a test automated result, locate and submit a review request. Trace a simulated or anonymised case to a responsible human reviewer, a reasoned outcome, and correction of the learner record where needed.',
    source: management('assessment', 'Equitable Assessment and Evaluation'), allowNA: true,
    naCondition: 'Only when the system makes no high-stakes automated assessment scores or decisions.', relatedCore: ['Q13', 'Q19'],
  },
  {
    id: 'MS03', sectionId: 'management-systems',
    text: 'Can learners decline optional data collection or sharing without losing essential learning access?',
    options: [
      { id: 'optional-data-choices', label: 'Separate choices for optional data uses' },
      { id: 'withdraw-optional-consent', label: 'Controls to withdraw optional permissions' },
      { id: 'essential-access-preserved', label: 'Essential learning retained after declining optional uses' },
    ],
    guidance: 'Distinguish essential data processing from optional analytics, profiling, and sharing. Explain the choices clearly and avoid forcing agreement to optional uses as a condition of essential learning access.',
    verify: 'Using a test account, decline each optional data use and later withdraw a permission. Confirm the choice is recorded, the optional processing stops as documented, and essential lessons and submissions remain accessible.',
    source: management('data-privacy', 'Learner Privacy and Data Control'), allowNA: true,
    naCondition: 'Only when there is no optional learner data collection, processing, or sharing.', relatedCore: ['Q10'],
  },
  {
    id: 'OL01', sectionId: 'online-learning',
    text: 'Can learners complete equivalent essential learning activities outside scheduled attendance?',
    options: [
      { id: 'accessible-session-materials', label: 'Accessible recordings, transcripts, or equivalent materials' },
      { id: 'equivalent-async-activity', label: 'An equivalent asynchronous learning activity' },
      { id: 'async-questions-feedback', label: 'Asynchronous opportunities for questions and feedback' },
    ],
    guidance: 'Map an asynchronous route to the same objectives and opportunities to practise and receive feedback. A recording alone may not replace an interactive task. Avoid attendance-only penalties where an equivalent route is appropriate.',
    verify: 'Choose a live lesson and follow its alternative route without attending. Compare objectives, materials, required participation, assessment, and access to feedback. Confirm the route is clearly communicated and does not impose a lesser outcome.',
    source: online('flexible-learning', 'Flexible Learning Pathways'), allowNA: true,
    naCondition: 'Only when the product has no scheduled live learning sessions.', relatedCore: ['Q12', 'Q13', 'Q14'],
  },
  {
    id: 'DL01', sectionId: 'digital-learning',
    text: 'Is text readable against its background in the default learning display?',
    options: [
      { id: 'default-contrast-measurement', label: 'Measured text and background contrast' },
      { id: 'default-theme-review', label: 'Review of default themes and text states' },
      { id: 'image-overlay-contrast', label: 'Checks of text over images and media' },
    ],
    guidance: 'Check default colours before relying on optional display controls. Measure representative text/background pairs, including instructions, links, placeholders, and text over imagery. The guide uses 4.5:1 as a practical minimum for ordinary text; this assessment does not establish standards conformance.',
    verify: 'Open a fresh learner session with default settings. Use a contrast checker on representative text/background pairs and interactive states, recording measured ratios and any failures. Check text over images at its least contrasting area.',
    source: digital('accessibility', 'Text and Background Contrast'), allowNA: true,
    naCondition: 'Only when the learning experience contains no visual text.', relatedCore: ['Q04', 'Q08'],
  },
  {
    id: 'DL02', sectionId: 'digital-learning',
    text: 'Do web-based learning data tables identify headers and their relationships to data cells?',
    options: [
      { id: 'semantic-table-headers', label: 'Semantic row and column headers' },
      { id: 'complex-header-associations', label: 'Explicit associations for complex table headers' },
      { id: 'table-reader-checks', label: 'Screen-reader checks of table navigation' },
    ],
    guidance: 'Use real HTML table structure for web-based tabular data and identify the headers each cell belongs to. Avoid using screenshots as the only table format. Include complex tables, not only simple examples; downloaded documents remain covered by Q09.',
    verify: 'Navigate representative web tables cell by cell with a screen reader. Confirm the appropriate row and column headers are announced, including merged or multi-level headers. Inspect HTML header associations where announcements are unclear.',
    source: digital('checklist', 'Tables and Headers'), allowNA: true,
    naCondition: 'Only when learning content contains no web-based data tables.', relatedCore: ['Q02', 'Q09'],
  },
  {
    id: 'DL03', sectionId: 'digital-learning',
    text: 'Are purely decorative images ignored by assistive technology?',
    options: [
      { id: 'empty-decorative-alt', label: 'Empty text alternatives for decorative images' },
      { id: 'decorative-document-artifacts', label: 'Decorative elements marked as artifacts in documents' },
      { id: 'decoration-reader-review', label: 'Screen-reader review for unnecessary image announcements' },
    ],
    guidance: 'Separate decoration from meaningful instructional images. Mark decoration so it does not interrupt reading, but do not hide images that convey content or act as controls. Q05 separately covers alternatives for meaningful visuals.',
    verify: 'Review image purpose with the content author, then read representative lessons and downloads with a screen reader. Confirm decorative images are skipped and meaningful images and image controls still have useful names or alternatives.',
    source: digital('checklist', 'Decorative Images'), allowNA: true,
    naCondition: 'Only when the learning experience has no purely decorative images.', relatedCore: ['Q05', 'Q09'],
  },
  {
    id: 'TUT01', sectionId: 'tutoring',
    text: 'Are device, connection, and data requirements explained before learners start tutoring or test preparation?',
    options: [
      { id: 'published-device-requirements', label: 'Published device and browser requirements' },
      { id: 'session-data-estimates', label: 'Indicative session bandwidth or data requirements' },
      { id: 'pre-session-check', label: 'A pre-session compatibility check and low-data alternatives' },
    ],
    guidance: 'State practical requirements before sign-up or payment, including for live sessions, practice tools, and downloads. Explain available low-data alternatives and limitations. Publishing requirements does not replace testing on learners’ devices in Q16.',
    verify: 'Approach enrollment as a new learner on a low-cost device. Find requirements before committing, compare them with measured or tested session behaviour, and try the advertised compatibility check and low-data alternative.',
    source: tutoring('checklist', 'Device Compatibility and Low-bandwidth Tutoring'), allowNA: false,
    relatedCore: ['Q15', 'Q16'],
  },
  {
    id: 'STM01', sectionId: 'steam',
    text: 'Can learners choose scaffolding that supports progress from guided STEAM steps toward independent creation?',
    options: [
      { id: 'guided-project-steps', label: 'Guided project steps with clear goals' },
      { id: 'worked-project-examples', label: 'Worked examples or starter templates' },
      { id: 'progressive-open-challenges', label: 'Progressively more open-ended challenges' },
    ],
    guidance: 'Build a bridge from a supported starting point to independent inquiry or design. Offer optional examples, manageable steps, and opportunities to remove or revisit scaffolds as confidence grows without prescribing a single creative outcome.',
    verify: 'Follow an introductory project into a more open challenge. Check that starting instructions and examples are available, support can be revisited, and learners have meaningful choices as guidance is reduced.',
    source: steam('interactive-content', 'Interactive and Experiential Content Design'), allowNA: true,
    naCondition: 'Only when the product has no open-ended projects or creative tasks.', relatedCore: ['Q10', 'Q11'],
  },
  {
    id: 'STM02', sectionId: 'steam',
    text: 'Can learners edit STEAM projects offline and synchronize their work when connected again?',
    options: [
      { id: 'offline-project-editing', label: 'Local offline project editing' },
      { id: 'reconnection-sync', label: 'Synchronization after reconnecting' },
      { id: 'sync-conflict-recovery', label: 'Clear sync status and recovery from conflicts or failures' },
    ],
    guidance: 'Support active project work, not only downloading a read-only template. Keep edits safe while disconnected, explain synchronization status, and provide a way to recover from interrupted sync or conflicting versions.',
    verify: 'Open a representative project, disconnect the network, make and save edits, then close and reopen it. Reconnect and confirm edits synchronize without loss. Test an interrupted synchronization or version conflict and check recovery instructions.',
    source: steam('offline-access', 'Offline Access and Low-Bandwidth Optimization'), allowNA: true,
    naCondition: 'Only when the product has no editable learner projects.', relatedCore: ['Q15', 'Q16'],
  },
  {
    id: 'STM03', sectionId: 'steam',
    text: 'Can learners reflect on and revise their STEAM design or inquiry process?',
    options: [
      { id: 'reflection-prompts', label: 'Reflection prompts about choices and results' },
      { id: 'project-journals', label: 'Accessible project journals or process logs' },
      { id: 'revision-checkpoints', label: 'Checkpoints to review feedback and revise work' },
    ],
    guidance: 'Provide accessible ways to record why a learner made a choice, what happened, and what they would change. Allow revisiting and iteration so reflection supports learning rather than becoming a one-off submission requirement.',
    verify: 'Complete a sample project and locate its reflection tools. Record a reflection, revisit it, and revise the work. Confirm prompts address the process and tools can be used with the same access methods as the project.',
    source: steam('interactive-content', 'Reflection Tools'), allowNA: true,
    naCondition: 'Only when the product has no projects or experiments.', relatedCore: ['Q13', 'Q14'],
  },
  {
    id: 'WF01', sectionId: 'workforce',
    text: 'Can learner profiles capture informal work experience and non-traditional skills?',
    options: [
      { id: 'informal-experience-fields', label: 'Profile fields for informal and unpaid work' },
      { id: 'skills-evidence-portfolios', label: 'Skills evidence through projects or portfolios' },
      { id: 'non-degree-profile-route', label: 'A profile route that does not require a formal degree or job title' },
    ],
    guidance: 'Recognize skills gained through informal employment, community work, care work, and self-directed learning. Avoid requiring formal qualifications or employers for every profile entry, and let learners explain relevant evidence.',
    verify: 'Create a test profile for a learner with informal experience but no formal degree or employer. Add skills and evidence, preview the profile or CV, and confirm those skills are retained and visible to relevant opportunities.',
    source: workforce('inclusive-access', 'Inclusive Access and Onboarding'), allowNA: true,
    naCondition: 'Only when the product has no learner skills profiles, CVs, or experience records.', relatedCore: ['Q10', 'Q17'],
  },
  {
    id: 'WF02', sectionId: 'workforce',
    text: 'Have credentials been validated with relevant employers or local professional associations?',
    options: [
      { id: 'employer-credential-review', label: 'Credential review with relevant employers' },
      { id: 'association-recognition', label: 'Validation with local professional or trade associations' },
      { id: 'documented-recognition-scope', label: 'Documented recognition scope and limitations' },
    ],
    guidance: 'Check whether a credential represents skills that relevant employers or associations recognize. Record the scope and limits of recognition and communicate them accurately; issuing a digital badge alone is not evidence of acceptance.',
    verify: 'Inspect recent validation records with relevant employers or associations. Compare the credential’s skills and assessment evidence with what was reviewed, and check that learner-facing claims match the documented recognition and limitations.',
    source: workforce('assessment', 'Inclusive Assessment and Certification'), allowNA: true,
    naCondition: 'Only when the product offers no certificates, badges, or other credentials.', relatedCore: ['Q13'],
  },
  {
    id: 'WF03', sectionId: 'workforce',
    text: 'Can learners share credentials or achievements beyond a single professional network?',
    options: [
      { id: 'downloadable-credentials', label: 'Downloadable credentials or achievement records' },
      { id: 'portable-verification-link', label: 'Portable verification links controlled by the learner' },
      { id: 'multi-channel-sharing', label: 'Sharing through multiple channels without a required network account' },
    ],
    guidance: 'Let learners carry evidence of achievement to employers and communities outside one platform or social network. Make any public sharing a learner choice and avoid exposing personal data by default.',
    verify: 'Earn a test credential and share it without using the preferred professional network. Open the exported record or verification link as a recipient without that network account and check that the achievement can be understood and verified.',
    source: workforce('checklist', 'Digital Badges Shareable Beyond LinkedIn'), allowNA: true,
    naCondition: 'Only when the product provides no credentials.', relatedCore: ['Q09', 'Q16'],
  },
  {
    id: 'VIS01', sectionId: 'visual-access',
    text: 'Is mathematical notation available in a structured form that assistive technology can interpret?',
    options: [
      { id: 'structured-math-markup', label: 'Structured mathematical markup such as MathML' },
      { id: 'math-reader-testing', label: 'Screen-reader testing of mathematical structure' },
      { id: 'accessible-math-alternative', label: 'Equivalent accessible notation when the primary rendering is unsupported' },
    ],
    guidance: 'Preserve mathematical relationships instead of relying on a picture of an equation or an unstructured string. Test the actual notation and reading software learners use, including fractions, indices, and grouped expressions.',
    verify: 'Select representative equations, including a fraction and nested expression where present. Read and navigate them with a supported screen reader, checking that grouping and relationships are conveyed correctly. Check exported versions as well.',
    source: visual, allowNA: true,
    naCondition: 'Only when learning content and assessments contain no mathematical notation.', relatedCore: ['Q02', 'Q05', 'Q13'],
  },
  {
    id: 'VIS02', sectionId: 'visual-access',
    text: 'Are dialogs announced, keyboard operable, and dismissible with focus returned to a meaningful place?',
    options: [
      { id: 'named-announced-dialogs', label: 'Named dialogs announced by screen readers' },
      { id: 'managed-dialog-focus', label: 'Appropriate focus entry and management' },
      { id: 'dialog-dismiss-return', label: 'Keyboard dismissal and meaningful focus return' },
    ],
    guidance: 'Ensure a learner knows when a dialog opens, what it is for, and how to finish or cancel it. Manage focus appropriately for modal and non-modal dialogs and avoid leaving focus on hidden content after closure.',
    verify: 'Open representative dialogs using a keyboard and screen reader. Check the announced name and purpose, focus location, access to all controls, and dismissal. After closing, verify focus returns to the opener or a logical next step.',
    source: visual, allowNA: true,
    naCondition: 'Only when the product has no dialogs, modal windows, or pop-ups.', relatedCore: ['Q01', 'Q02', 'Q03'],
  },
  {
    id: 'HEAR01', sectionId: 'hearing-access',
    text: 'Can learners adjust caption size, style, and contrast in the media player?',
    options: [
      { id: 'caption-size-control', label: 'Caption text size controls' },
      { id: 'caption-style-control', label: 'Caption font or style controls' },
      { id: 'caption-contrast-control', label: 'Caption text and background contrast controls' },
    ],
    guidance: 'Provide caption presentation controls in the actual player, or reliably support device caption preferences. Ensure adjusted captions remain readable without hiding essential content. Caption availability and accuracy remain separate checks.',
    verify: 'Play representative media, enable captions, and change their size, style, and contrast. Test access to controls with a keyboard and confirm caption text is not clipped or obscuring essential content at larger settings.',
    source: hearing, allowNA: true,
    naCondition: 'Only when the product has no video or live media to which captions apply. Missing required captions is a barrier, not a reason to choose Not applicable.', relatedCore: ['Q04', 'Q06'],
  },
  {
    id: 'HEAR02', sectionId: 'hearing-access',
    text: 'Can learners complete voice-based conversations, including AI interactions, through an equivalent text route?',
    options: [
      { id: 'text-conversation-input', label: 'Text input for conversation turns' },
      { id: 'text-conversation-output', label: 'Readable text responses and conversation history' },
      { id: 'conversation-feature-parity', label: 'Equivalent actions and outcomes through text' },
    ],
    guidance: 'A transcript of a voice exchange is not enough if a learner still has to speak to continue. Provide text input and output for the same tasks, responses, and actions, including conversational assistants. SH02 separately covers peer discussion channels.',
    verify: 'Complete a representative voice-based conversation using only text, including any AI assistant. Compare available actions, response detail, follow-up questions, and final outcomes with the voice route; record any voice-only step.',
    source: hearing, allowNA: true,
    naCondition: 'Only when the product has no voice-based conversational features, including voice-only AI or support interactions.', relatedCore: ['Q12', 'Q19'],
  },
  {
    id: 'COG01', sectionId: 'cognitive-access',
    text: 'Can learners adjust practice difficulty or obtain an appropriate supported level?',
    options: [
      { id: 'practice-level-choice', label: 'Learner controls for practice difficulty' },
      { id: 'supported-practice-route', label: 'A supported route with additional scaffolding' },
      { id: 'revisitable-practice-levels', label: 'Ways to revisit levels without being locked into a label' },
    ],
    guidance: 'Make practice challenge adjustable without inferring a fixed ability from disability or demographics. Explain level choices clearly and allow learners to revisit support. Preserve the learning objective rather than simply removing meaningful work.',
    verify: 'Enter a practice activity and change difficulty or request a supported level. Confirm instructions and challenge change as described, progress is retained appropriately, and the learner can return to a different level without a permanent restriction.',
    source: cognitive, allowNA: true,
    naCondition: 'Only when the product has no practice activities. Missing difficulty controls are a barrier, not a reason to choose Not applicable.', relatedCore: ['Q11', 'Q14'],
  },
  {
    id: 'COG02', sectionId: 'cognitive-access',
    text: 'Can assessment evidence be gathered through short, manageable interactions distributed over time?',
    options: [
      { id: 'short-assessment-interactions', label: 'Assessment spread across short interactions' },
      { id: 'saved-assessment-checkpoints', label: 'Saved checkpoints and resumable assessment' },
      { id: 'distributed-skill-evidence', label: 'Skill evidence gathered across multiple attempts or tasks' },
    ],
    guidance: 'Reduce unnecessary sustained cognitive load by collecting evidence through short interactions distributed over time. Preserve what the assessment is intended to measure, explain how parts contribute to the result, and support breaks without losing work. Keep a reviewed assessment plan that maps the interactions to the learning objectives.',
    verify: 'Inspect a reviewed assessment plan mapping short interactions distributed over time to the objectives. Follow a sample sequence, including a break and return. Confirm work is retained, instructions explain the sequence, and the combined evidence addresses the intended objectives rather than speed or endurance alone.',
    source: cognitive, allowNA: true,
    naCondition: 'Only when the product has no assessments.', relatedCore: ['Q11', 'Q13', 'Q14'],
  },
  {
    id: 'DSL01', sectionId: 'dual-sensory-access',
    text: 'Have essential journeys been tested with an appropriate refreshable-Braille setup without relying on visual or audio output?',
    options: [
      { id: 'braille-hardware-journey-tests', label: 'Complete journey tests with refreshable Braille hardware' },
      { id: 'braille-user-participation', label: 'Accessible testing with Braille users' },
      { id: 'braille-barrier-follow-up', label: 'Recorded Braille access barriers and retests' },
    ],
    guidance: 'Test real task completion on supported Braille hardware, not only a screen reader’s spoken output. Include navigation, instructions, input, errors, and submission without visual or audio cues. Record device and software combinations and involve users appropriately. Lack of equipment or testing evidence means Not sure, not Not applicable.',
    verify: 'With a refreshable Braille display and supported reading software, complete an essential learner journey without relying on the screen or audio. Record the hardware, software, task outcome, missing labels or state changes, and follow-up retests. Do not record participant identities.',
    source: dualSensory, allowNA: false,
    relatedCore: ['Q02', 'Q08', 'Q20', 'Q21'],
  },
  {
    id: 'DSL02', sectionId: 'dual-sensory-access',
    text: 'Do essential spatial concepts have tactile or structured alternatives that preserve their learning purpose?',
    options: [
      { id: 'tactile-spatial-materials', label: 'Tactile diagrams, models, or spatial materials' },
      { id: 'structured-spatial-descriptions', label: 'Structured descriptions of spatial relationships' },
      { id: 'nonvisual-spatial-interactions', label: 'Non-visual interaction routes with equivalent outcomes' },
    ],
    guidance: 'Identify the relationships and actions learners must understand in maps, diagrams, simulations, or spatial tasks. Provide tactile materials or navigable structured alternatives; a short image label or an audio-only description may not preserve the learning purpose for a deafblind learner.',
    verify: 'Select an essential spatial task and complete its alternative without sight or hearing, using tactile materials or structured text through Braille as appropriate. Compare relationships, available actions, and outcomes with the original task and review usability with relevant learners.',
    source: dualSensory, allowNA: true,
    naCondition: 'Only when the product has no essential spatial concepts.', relatedCore: ['Q05', 'Q12', 'Q13'],
  },
];

export const allQuestions: Question[] = [...questions, ...specialistQuestions];

/** Module membership lives in the registry; shared questions occur only once. */
export function modulesForQuestion(id: string, selectedModules: readonly string[]): AssessmentModule[] {
  const selected = new Set(selectedModules);
  return modules.filter(module => selected.has(module.id) && module.questionIds.includes(id));
}

export function getActiveQuestions(selectedModules: readonly string[]): Question[] {
  const selected = new Set(selectedModules);
  const activeIds = new Set(modules.filter(module => selected.has(module.id)).flatMap(module => module.questionIds));
  return [...questions, ...specialistQuestions.filter(question => activeIds.has(question.id))];
}

export function getActiveSections(selectedModules: readonly string[]): Section[] {
  const active = getActiveQuestions(selectedModules);
  const selected = new Set(selectedModules);
  return [
    ...sections,
    ...(active.some(question => question.sectionId === 'shared') ? [{
      id: 'shared', title: 'Shared specialist checks',
      description: 'These checks apply to more than one selected module. Answer each once; the answer contributes to every relevant selected module. Use Not applicable only under the stated feature-absence condition, never because learners with an access need are not currently identified.',
    }] : []),
    ...modules.filter(module => selected.has(module.id) && active.some(question => question.sectionId === module.id))
      .map(module => ({ id: module.id, title: module.title, description: module.description })),
  ];
}