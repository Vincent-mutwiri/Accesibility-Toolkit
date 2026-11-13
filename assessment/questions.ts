/** Change this version whenever wording, options, or applicability changes. */
export const QUESTION_VERSION = '1.0.0';

export interface Section {
  id: string;
  title: string;
  description: string;
}

/** Router pathname and an existing DOM section ID, kept separate for HashRouter. */
export interface Source {
  label: string;
  path: string;
  sectionId?: string;
}

export interface Question {
  id: string;
  sectionId: string;
  text: string;
  options: { id: string; label: string }[];
  /** Q21/Q22 use Response.notes for their optional open-ended Yes follow-up. */
  openPrompt?: string;
  guidance: string;
  verify: string;
  source: Source;
  allowNA: boolean;
  /** Feature-absence condition for specialist questions that permit Not applicable. */
  naCondition?: string;
  /** Related core checks, not replacements for those checks. */
  relatedCore?: string[];
}

export const sections: Section[] = [
  { id: 'A', title: 'Navigation and interaction', description: 'Review keyboard access, screen-reader testing, predictable navigation, and reading display controls.' },
  { id: 'B', title: 'Learning content and media', description: 'Review text alternatives, captions, transcripts, information cues, and downloadable documents. Not applicable is available only when the corresponding content type is genuinely absent, not to exclude learners who need an alternative format.' },
  { id: 'C', title: 'Clear and flexible learning', description: 'Review clear instructions, manageable sections, alternative formats, ways to demonstrate learning, and pacing.' },
  { id: 'D', title: 'Access, language, and representation', description: 'Review connectivity, learner devices, diverse representation, and language support.' },
  { id: 'E', title: 'Support, testing, and improvement', description: 'Review support channels, release checks, learner participation, and tracked improvements. Do not include names or personal information.' },
];

// The shared UI adds Other — please describe (stable ID 'other') to Q01–Q20.
// options contains only the question-specific examples; Q21/Q22 are open-ended.

// Verified in App.tsx and the matching id attributes in DigitalLearningPage.tsx
// and OnlineLearningPage.tsx. No fabricated anchors on unanchored guide pages.
function digital(sectionId: string, title: string): Source {
  return { label: `Digital Learning — ${title}`, path: '/digital-learning', sectionId };
}

function online(sectionId: string, title: string): Source {
  return { label: `Online Learning — ${title}`, path: '/online-learning', sectionId };
}

/** Examples document implementation methods; they are not a score or proof. */
export const questions: Question[] = [
  {
    id: 'Q01', sectionId: 'A',
    text: 'Can learners complete essential activities using only a keyboard?',
    options: [
      { id: 'keyboard-menus-buttons', label: 'Keyboard-accessible menus and buttons' },
      { id: 'keyboard-quizzes-forms', label: 'keyboard-accessible quizzes and forms' },
      { id: 'drag-drop-alternatives', label: 'alternatives to drag-and-drop' },
      { id: 'keyboard-journey-tests', label: 'complete learner journeys tested without a mouse' },
    ],
    guidance: 'Start with an essential journey, such as opening a lesson and submitting an activity. Identify steps that require a mouse and provide keyboard-operable alternatives.',
    verify: 'Try completing a lesson using your keyboard without touching the mouse. Can you reach and operate every essential control? Check menus, forms, quizzes, drag-and-drop alternatives, and submission; record any keyboard trap or missing focus indicator.',
    source: digital('accessibility', 'Accessibility'), allowNA: false,
  },
  {
    id: 'Q02', sectionId: 'A',
    text: 'Have you tested essential learner journeys with a screen reader?',
    options: [
      { id: 'nvda', label: 'Tested with NVDA' },
      { id: 'voiceover', label: 'VoiceOver' },
      { id: 'jaws', label: 'JAWS' },
      { id: 'another-screen-reader', label: 'another screen reader' },
      { id: 'screen-reader-users', label: 'involved screen-reader users in testing' },
    ],
    guidance: 'Test a complete learner journey with a screen reader. Record where information, controls, instructions, or feedback cannot be understood or operated.',
    verify: 'Review test records for a complete login, lesson, quiz, and submission journey. Identify the screen reader, browser, date, and unresolved barriers. If no records exist, run that journey with NVDA, VoiceOver, or JAWS and check control names, headings, instructions, and feedback.',
    source: digital('accessibility', 'Accessibility'), allowNA: false,
  },
  {
    id: 'Q03', sectionId: 'A',
    text: 'Is navigation consistent and clearly labelled throughout the learning experience?',
    options: [
      { id: 'consistent-menus', label: 'Consistent menu locations' },
      { id: 'descriptive-labels', label: 'descriptive link and button labels' },
      { id: 'clear-headings', label: 'clear headings' },
      { id: 'current-location', label: 'clear indication of the current page or section' },
    ],
    guidance: 'Review a typical learning journey. Make navigation predictable and replace unclear labels with wording that explains the destination or action.',
    verify: 'Follow a journey across onboarding, a lesson, and an activity. Compare menu positions and labels, check that headings describe each section, and confirm that learners can identify their current location and predict each link or button action.',
    source: digital('usability', 'Usability & Navigation'), allowNA: false,
  },
  {
    id: 'Q04', sectionId: 'A',
    text: 'Can learners adjust the reading display to suit their needs?',
    options: [
      { id: 'text-resizing', label: 'Text resizing' },
      { id: 'spacing-adjustments', label: 'spacing adjustments' },
      { id: 'contrast-themes', label: 'contrast or theme options' },
      { id: 'enlarged-text-tests', label: 'layouts tested with enlarged text' },
    ],
    guidance: 'Review whether learners can enlarge and adjust text without losing content or controls. Identify display settings that would improve readability.',
    verify: 'Open a lesson and an activity on a narrow screen. Enlarge text, increase spacing, and try available contrast or theme settings. Check whether text, instructions, navigation, and submission controls remain visible, readable, and usable without overlap or clipping.',
    source: online('checklist', 'Checklist — customisable display features'), allowNA: false,
  },
  {
    id: 'Q05', sectionId: 'B',
    text: 'Do meaningful images, charts, and diagrams have text alternatives that explain their learning purpose?',
    options: [
      { id: 'descriptive-alt-text', label: 'Descriptive alternative text' },
      { id: 'chart-summaries', label: 'written chart summaries' },
      { id: 'graph-data-tables', label: 'data tables accompanying graphs' },
      { id: 'decorative-images', label: 'decorative images identified as decorative' },
    ],
    guidance: 'Review visuals in your most-used lessons. Add descriptions that communicate the information learners need, including explanations for complex charts and diagrams.',
    verify: 'Sample meaningful images, charts, and diagrams in essential lessons. Read their text alternatives without viewing the visuals: do they communicate the learning information, relationships, and data? Check that decorative images are ignored. Use Not applicable only if these content types are genuinely absent.',
    source: digital('accessibility', 'Accessibility'), allowNA: true,
  },
  {
    id: 'Q06', sectionId: 'B',
    text: 'Do prerecorded learning videos have accurate, synchronised captions?',
    options: [
      { id: 'manual-captions', label: 'Manually written captions' },
      { id: 'reviewed-auto-captions', label: 'automatically generated captions reviewed and corrected' },
      { id: 'caption-timing', label: 'captions checked for timing' },
      { id: 'sounds-speakers', label: 'relevant sounds and speakers identified' },
    ],
    guidance: 'Add or correct captions, starting with essential learning videos. Review their accuracy and timing rather than relying on unreviewed automatic output.',
    verify: 'Play essential prerecorded videos with captions enabled and compare them with the audio. Check wording, specialist terms, timing, speaker changes, and sounds needed to understand the lesson. Confirm automatic captions were reviewed. Use Not applicable only if prerecorded learning videos are absent.',
    source: digital('accessibility', 'Accessibility — captions and transcripts'), allowNA: true,
  },
  {
    id: 'Q07', sectionId: 'B',
    text: 'Are text transcripts available for learning audio and video?',
    options: [
      { id: 'adjacent-transcripts', label: 'Transcripts beside the media' },
      { id: 'downloadable-transcripts', label: 'downloadable transcripts' },
      { id: 'speaker-identification', label: 'speaker identification' },
      { id: 'reviewed-transcripts', label: 'transcripts reviewed against the recording' },
    ],
    guidance: 'Provide text versions of spoken learning content. Make transcripts easy to find alongside the relevant audio or video.',
    verify: 'For essential audio and video, locate the transcript from the media player or lesson. Compare it against the recording for complete spoken content and speaker identification, and check that learners can read or download it. Use Not applicable only if learning audio and video are both absent.',
    source: digital('accessibility', 'Accessibility — captions and transcripts'), allowNA: true,
  },
  {
    id: 'Q08', sectionId: 'B',
    text: 'Can learners understand important information without relying on colour or sound alone?',
    options: [
      { id: 'colour-text-labels', label: 'Text labels alongside colour' },
      { id: 'explained-icons', label: 'icons with explanatory text' },
      { id: 'written-feedback', label: 'written error and success messages' },
      { id: 'visible-sound-alternatives', label: 'visible alternatives to sound alerts' },
    ],
    guidance: 'Review instructions, alerts, and activity feedback. Add text or another appropriate alternative wherever colour or sound is the only way to understand the message.',
    verify: 'Mute sound and inspect instructions, charts, status indicators, and error or success feedback without using colour differences to interpret them. Can a learner identify the meaning and required action from text, labels, patterns, or another equivalent cue?',
    source: digital('checklist', 'Checklist — information alternatives'), allowNA: false,
  },
  {
    id: 'Q09', sectionId: 'B',
    text: 'Are downloadable learning documents checked for accessibility before sharing?',
    options: [
      { id: 'structured-headings', label: 'Structured headings' },
      { id: 'meaningful-links', label: 'meaningful link text' },
      { id: 'image-descriptions', label: 'image descriptions' },
      { id: 'table-headers', label: 'table headers' },
      { id: 'document-checks', label: 'document accessibility checks' },
      { id: 'assistive-technology-tests', label: 'assistive-technology testing' },
    ],
    guidance: 'Review the documents learners use most. Address their structure and reading order, and provide an accessible alternative where a document cannot yet be used effectively.',
    verify: 'Inspect the most-used downloadable documents and their pre-sharing review records. Run the document accessibility checker, then manually check headings, links, image descriptions, table headers, and screen-reader reading order. Use Not applicable only if downloadable learning documents are absent.',
    source: digital('accessibility', 'Accessibility — structured files'), allowNA: true,
  },
  {
    id: 'Q10', sectionId: 'C',
    text: 'Are instructions written in clear language, with unfamiliar terms explained?',
    options: [
      { id: 'plain-language-review', label: 'Plain-language review' },
      { id: 'definitions-glossary', label: 'definitions or glossary' },
      { id: 'worked-examples', label: 'worked examples' },
      { id: 'learner-instruction-tests', label: 'instructions tested with learners' },
    ],
    guidance: 'Start with onboarding and activity instructions. Simplify the wording, explain unfamiliar terms, and show an example of what learners should do.',
    verify: 'Review onboarding and activity instructions for unexplained jargon and long or ambiguous sentences. Ask intended learners to explain what they would do next, and check whether definitions and worked examples resolve unfamiliar terms without additional help.',
    source: digital('usability', 'Usability & Navigation'), allowNA: false,
  },
  {
    id: 'Q11', sectionId: 'C',
    text: 'Is learning content divided into manageable, clearly labelled sections?',
    options: [
      { id: 'short-modules', label: 'Short modules' },
      { id: 'step-by-step', label: 'step-by-step instructions' },
      { id: 'clear-headings', label: 'clear headings' },
      { id: 'summaries', label: 'summaries' },
      { id: 'progress-indicators', label: 'progress indicators' },
    ],
    guidance: 'Break long lessons and tasks into smaller sections. Give each section a clear purpose and help learners understand their progress.',
    verify: 'Inspect a long lesson and a multi-step activity. Check whether headings describe manageable units, instructions separate each step, and learners can identify what they have completed and what comes next. Ask learners whether any section is difficult to follow as a single unit.',
    source: digital('usability', 'Usability & Navigation'), allowNA: false,
  },
  {
    id: 'Q12', sectionId: 'C',
    text: 'Can learners access key explanations in more than one format?',
    options: [
      { id: 'text', label: 'Text explanations' },
      { id: 'audio', label: 'audio explanations' },
      { id: 'captioned-video', label: 'captioned video' },
      { id: 'illustrated-examples', label: 'illustrated examples' },
      { id: 'accessible-demonstrations', label: 'accessible demonstrations' },
    ],
    guidance: 'Identify essential concepts currently explained in only one format. Add another appropriate format while preserving the same learning meaning.',
    verify: 'List the key concepts in an essential lesson and locate the formats explaining each one. Check that learners can find at least two appropriate formats and that each communicates the same learning meaning, including information conveyed by media or demonstrations.',
    source: digital('flexibility', 'Flexibility'), allowNA: false,
  },
  {
    id: 'Q13', sectionId: 'C',
    text: 'Can learners demonstrate understanding in different ways, where the learning objective allows it?',
    options: [
      { id: 'written', label: 'Written responses' },
      { id: 'oral-recorded', label: 'oral or recorded responses' },
      { id: 'visual-work', label: 'visual work' },
      { id: 'practical-demonstrations', label: 'practical demonstrations' },
      { id: 'projects-portfolios', label: 'projects or portfolios' },
    ],
    guidance: 'Review whether a single response format creates an unnecessary barrier. Offer alternatives that assess the same knowledge or skill.',
    verify: 'Compare assessment objectives, permitted response formats, and marking criteria. Where a specific format is not essential to the objective, check that learners can choose an alternative and are assessed on equivalent knowledge or skill rather than the chosen medium.',
    source: digital('flexibility', 'Flexibility'), allowNA: false,
  },
  {
    id: 'Q14', sectionId: 'C',
    text: 'Can learners control their learning pace where the activity allows it?',
    options: [
      { id: 'pause-replay', label: 'Pause and replay controls' },
      { id: 'self-paced', label: 'self-paced lessons' },
      { id: 'saved-progress', label: 'saved progress' },
      { id: 'revisit-material', label: 'opportunities to revisit material' },
      { id: 'adjustable-time', label: 'adjustable time allowances' },
    ],
    guidance: 'Review activities that force a fixed pace. Add opportunities to pause, revisit material, or receive additional time where appropriate.',
    verify: 'Try pausing and replaying media, leaving and resuming a lesson, and revisiting completed material. Inspect timed activities for adjustable allowances or a clear route to request them where timing is not essential to the objective. Record any forced pace or lost progress.',
    source: digital('flexibility', 'Flexibility'), allowNA: false,
  },
  {
    id: 'Q15', sectionId: 'D',
    text: 'Can learners access essential materials when internet connectivity is limited?',
    options: [
      { id: 'downloadable-lessons', label: 'Downloadable lessons' },
      { id: 'offline-materials', label: 'offline materials' },
      { id: 'text-first', label: 'text-first versions' },
      { id: 'compressed-media', label: 'compressed media' },
      { id: 'low-data-participation', label: 'low-data participation options' },
    ],
    guidance: 'Identify the materials learners need most. Provide a lower-data or downloadable route and make its availability clear before learners begin.',
    verify: 'Use a slow or interrupted connection to open essential materials and complete a core activity. Locate low-data or downloadable versions, then disconnect and test downloaded content. Check that essential explanations and participation routes remain available and limitations are clearly stated.',
    source: online('equitable-access', 'Equitable Access'), allowNA: false,
  },
  {
    id: 'Q16', sectionId: 'D',
    text: 'Have essential activities been tested on the devices learners actually use?',
    options: [
      { id: 'low-cost-smartphones', label: 'Low-cost smartphones' },
      { id: 'tablets', label: 'tablets' },
      { id: 'shared-devices', label: 'shared devices' },
      { id: 'desktops', label: 'desktop computers' },
      { id: 'browsers-older-devices', label: 'relevant browsers and older devices' },
    ],
    guidance: 'Identify common learner devices and test an essential activity on them. Record problems with layout, controls, loading, and task completion.',
    verify: 'Compare learner device and browser information with your test records. On common devices, including low-cost or shared devices where relevant, complete login, a lesson, and submission. Check layout, controls, loading, and task completion rather than relying only on a desktop preview.',
    source: online('checklist', 'Checklist — device and browser testing'), allowNA: false,
  },
  {
    id: 'Q17', sectionId: 'D',
    text: 'Is learning content reviewed for diverse representation and stereotypes?',
    options: [
      { id: 'diverse-imagery', label: 'Diverse imagery' },
      { id: 'varied-names-examples', label: 'varied names and examples' },
      { id: 'local-case-studies', label: 'locally relevant case studies' },
      { id: 'inclusive-language-review', label: 'inclusive-language review' },
      { id: 'community-review', label: 'review by people familiar with the represented communities' },
    ],
    guidance: 'Review examples, imagery, and scenarios. Address stereotypes and expand whose experiences and perspectives are represented.',
    verify: 'Review a representative sample of images, names, examples, and scenarios alongside content-review records. Check whose perspectives are present or absent and whether roles or traits reinforce stereotypes. Seek review from people familiar with the represented communities and record resulting changes.',
    source: digital('representation', 'Representation'), allowNA: false,
  },
  {
    id: 'Q18', sectionId: 'D',
    text: 'Do learners have language support appropriate to your intended audience?',
    options: [
      { id: 'translated-instructions', label: 'Translated instructions' },
      { id: 'multilingual-content', label: 'multilingual content' },
      { id: 'localised-examples', label: 'localised examples' },
      { id: 'language-selection', label: 'language selection' },
      { id: 'multilingual-help', label: 'multilingual help or glossaries' },
    ],
    guidance: 'Identify language barriers in essential instructions and activities. Prioritise support based on the learners you intend to serve.',
    verify: 'Identify the intended audience’s language needs and compare them with available instructions, content, language selection, glossaries, and help. Ask speakers of the relevant languages to try an essential activity and check that translation and localised examples preserve the intended meaning.',
    source: online('checklist', 'Checklist — language needs and multilingual support'), allowNA: false,
  },
  {
    id: 'Q19', sectionId: 'E',
    text: 'Can learners ask for help or report an accessibility barrier through a channel they can use?',
    options: [
      { id: 'feedback-form', label: 'In-product feedback form' },
      { id: 'email', label: 'email' },
      { id: 'text-chat', label: 'text-based chat' },
      { id: 'phone-voice', label: 'phone or voice support' },
      { id: 'assistance-instructions', label: 'clear instructions for requesting assistance' },
    ],
    guidance: 'Provide a clearly labelled route for reporting barriers and requesting help. Avoid making a single communication method the only option.',
    verify: 'From a lesson, find instructions for requesting help or reporting a barrier. Test the available channels using keyboard and assistive technology where relevant, confirm a non-voice route exists, and check that a learner receives an acknowledgement and knows what to expect next.',
    source: online('feedback-support', 'Feedback and Support'), allowNA: false,
  },
  {
    id: 'Q20', sectionId: 'E',
    text: 'Are accessibility checks part of your process before releasing new or updated content and features?',
    options: [
      { id: 'automated-checks', label: 'Automated checks' },
      { id: 'manual-keyboard-checks', label: 'manual keyboard checks' },
      { id: 'screen-reader-checks', label: 'screen-reader checks' },
      { id: 'content-review', label: 'content review' },
      { id: 'release-checklist', label: 'documented release checklist' },
    ],
    guidance: 'Add accessibility checks to the release process. Start with essential learner journeys and record unresolved barriers for follow-up.',
    verify: 'Inspect a recent release checklist and completed test records. Confirm that automated checks, manual keyboard and screen-reader checks, and content review happened before release, covered essential journeys, and produced recorded follow-up for unresolved barriers.',
    source: digital('checklist', 'Checklist — pre-release audits and testing'), allowNA: false,
  },
  {
    id: 'Q21', sectionId: 'E',
    text: 'Do you involve learners with disabilities in reviewing or testing the learning experience?',
    options: [],
    openPrompt: 'Describe how learners participate, what they review, and how you make participation accessible. Do not include names or personal information.',
    guidance: 'Plan accessible research or testing with learners with disabilities. Use their feedback to identify barriers that internal reviews may miss.',
    verify: 'Review anonymised research or testing plans and findings. Check whether learners with disabilities participated, what journeys or materials they reviewed, how access needs were supported, and how their feedback informed decisions. Do not collect names or personal information here.',
    source: online('checklist', 'Checklist — learner input and diverse learner pilots'), allowNA: false,
  },
  {
    id: 'Q22', sectionId: 'E',
    text: 'Do you turn learner feedback and observed barriers into tracked improvements?',
    options: [],
    openPrompt: 'Describe how you record issues, decide what to address, assign responsibility, and check whether changes helped. You may include one anonymised example.',
    guidance: 'Create a simple improvement log. Record the barrier, planned action, responsible person, and how you will check the result.',
    verify: 'Trace one anonymised feedback item or observed barrier from its initial record to a planned action, assigned responsibility, and a follow-up check. Verify that the log records whether the change helped rather than only marking the issue closed.',
    source: digital('checklist', 'Checklist — feedback review and updates'), allowNA: false,
  },
];