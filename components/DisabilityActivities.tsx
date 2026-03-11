import React, { ReactNode, useState } from 'react';

// Dedicated interactive demos for the "Designing for Specific Disabilities" pages.
// Kept separate from Activities.tsx to avoid mixing category activities with disability-focused ones.

interface WrapperProps {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}

const ActivityWrapper: React.FC<WrapperProps> = ({ title, description, icon, children }) => (
  <div className="my-10 bg-white dark:bg-gray-800 rounded-xl border-2 border-primary/20 overflow-hidden shadow-lg transition-all hover:shadow-xl">
    <div className="bg-primary/5 dark:bg-primary/20 p-4 border-b border-primary/10 flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-full text-primary">
        <span className="material-icons">{icon}</span>
      </div>
      <div>
        <h3 className="font-bold text-lg text-text-light dark:text-text-dark flex items-center gap-2">
          {title}{' '}
          <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Interactive</span>
        </h3>
        <p className="text-sm text-subtle-light dark:text-subtle-dark">{description}</p>
      </div>
    </div>
    <div className="p-6 md:p-8">{children}</div>
  </div>
);

// 1) VISUAL: Text size + spacing controls
export const TextSizeAndSpacingActivity: React.FC = () => {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [lineHeight, setLineHeight] = useState<'tight' | 'normal' | 'loose'>('normal');

  const fontSizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';
  const lineHeightClass = lineHeight === 'tight' ? 'leading-snug' : lineHeight === 'loose' ? 'leading-loose' : 'leading-relaxed';

  return (
    <ActivityWrapper
      title="Readable Text Controls"
      description="Toggle text size and spacing to see how readability improvements support low-vision learners."
      icon="text_fields"
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark">
            <p className="text-xs font-semibold text-gray-500 uppercase">Text size</p>
            <div className="flex gap-2 mt-2">
              {([
                { id: 'sm', label: 'Small' },
                { id: 'md', label: 'Medium' },
                { id: 'lg', label: 'Large' }
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSize(opt.id)}
                  className={`px-3 py-1.5 rounded text-sm border transition-colors ${size === opt.id ? 'bg-primary text-white border-primary' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark">
            <p className="text-xs font-semibold text-gray-500 uppercase">Line spacing</p>
            <div className="flex gap-2 mt-2">
              {([
                { id: 'tight', label: 'Tight' },
                { id: 'normal', label: 'Normal' },
                { id: 'loose', label: 'Loose' }
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLineHeight(opt.id)}
                  className={`px-3 py-1.5 rounded text-sm border transition-colors ${lineHeight === opt.id ? 'bg-primary text-white border-primary' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark">
          <p className={`text-text-light dark:text-text-dark ${fontSizeClass} ${lineHeightClass}`}>
            <strong>Lesson note:</strong> Learners should be able to resize text and adjust spacing without the layout breaking.
            Good defaults are helpful, but giving control reduces fatigue and improves comprehension.
          </p>
          <p className="text-xs text-subtle-light dark:text-subtle-dark mt-3">
            Tip: target at least 200% text zoom support and keep controls keyboard-accessible.
          </p>
        </div>
      </div>
    </ActivityWrapper>
  );
};

// 2) VISUAL: Focus indicator toggle
export const FocusIndicatorActivity: React.FC = () => {
  const [strongFocus, setStrongFocus] = useState(true);

  return (
    <ActivityWrapper
      title="Keyboard Focus Visibility"
      description="Toggle focus styles to see why visible focus indicators matter for non-mouse navigation."
      icon="keyboard"
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div>
            <p className="font-medium text-sm text-text-light dark:text-text-dark">Strong focus outline</p>
            <p className="text-xs text-subtle-light dark:text-subtle-dark">Try tabbing through the buttons below.</p>
          </div>
          <button
            onClick={() => setStrongFocus((v) => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${strongFocus ? 'bg-primary' : 'bg-gray-300'}`}
            aria-label="Toggle strong focus"
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${strongFocus ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['Start lesson', 'Open menu', 'Submit quiz'].map((label) => (
            <button
              key={label}
              className={`px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark font-semibold ${
                strongFocus
                  ? 'focus:outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary'
                  : 'focus:outline-none focus:ring-0'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="text-xs text-subtle-light dark:text-subtle-dark">
          If focus is invisible, users can get lost — especially when using screen readers, keyboard-only navigation, or switch devices.
        </p>
      </div>
    </ActivityWrapper>
  );
};

// 3) HEARING: Captions + transcript toggle
export const CaptionsAndTranscriptActivity: React.FC = () => {
  const [captionsOn, setCaptionsOn] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <ActivityWrapper
      title="Captions + Transcript Preview"
      description="Toggle captions and open a transcript to see how learners access meaning without sound."
      icon="closed_caption"
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3 items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark">
          <div className="flex items-center gap-3">
            <span className="material-icons text-primary">smart_display</span>
            <div>
              <p className="font-semibold text-text-light dark:text-text-dark">Video: Algebra Basics</p>
              <p className="text-xs text-subtle-light dark:text-subtle-dark">Duration: 3:12</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-subtle-light dark:text-subtle-dark">Captions</label>
            <button
              onClick={() => setCaptionsOn((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${captionsOn ? 'bg-primary' : 'bg-gray-300'}`}
              aria-label="Toggle captions"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${captionsOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-black relative">
          <div className="aspect-video flex items-center justify-center text-white/70">
            <span className="material-icons text-6xl">play_circle</span>
          </div>
          {captionsOn ? (
            <div className="absolute bottom-3 left-3 right-3 bg-black/70 text-white text-sm p-3 rounded-lg">
              <p>[Teacher] Today we’ll learn how to simplify expressions.</p>
              <p className="opacity-80">[Music fades]</p>
            </div>
          ) : (
            <div className="absolute bottom-3 left-3 right-3 text-white/60 text-xs p-2">
              Captions are off.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowTranscript((v) => !v)}
            className="text-primary font-semibold text-sm hover:underline"
          >
            {showTranscript ? 'Hide transcript' : 'Open transcript'}
          </button>
          <button className="text-sm px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">
            Download transcript
          </button>
        </div>

        {showTranscript && (
          <div className="animate-fade-in p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark">
            <p className="text-xs font-semibold text-gray-500 uppercase">Transcript</p>
            <p className="mt-2 text-sm text-text-light dark:text-text-dark leading-relaxed">
              Welcome! In this lesson we simplify expressions by combining like terms. First, we identify terms with the same variable…
            </p>
          </div>
        )}
      </div>
    </ActivityWrapper>
  );
};

// 4) HEARING: Sound-only vs visual alerts
export const AlertModalityActivity: React.FC = () => {
  const [mode, setMode] = useState<'soundOnly' | 'visualText'>('soundOnly');

  return (
    <ActivityWrapper
      title="Notification Modality Demo"
      description="Compare sound-only alerts to visual + text alerts for inclusive communication."
      icon="notifications"
    >
      <div className="space-y-5">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('soundOnly')}
            className={`px-3 py-2 rounded-lg border text-sm font-semibold ${mode === 'soundOnly' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-400 text-orange-700 dark:text-orange-200' : 'border-gray-200 dark:border-gray-700'}`}
          >
            Sound-only
          </button>
          <button
            onClick={() => setMode('visualText')}
            className={`px-3 py-2 rounded-lg border text-sm font-semibold ${mode === 'visualText' ? 'bg-green-50 dark:bg-green-900/20 border-green-400 text-green-700 dark:text-green-200' : 'border-gray-200 dark:border-gray-700'}`}
          >
            Visual + text
          </button>
        </div>

        <div className="max-w-md mx-auto border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-card-light dark:bg-card-dark">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <p className="font-bold text-sm">Classroom feed</p>
            <span className="text-xs text-subtle-light dark:text-subtle-dark">Now</span>
          </div>

          <div className="p-5 space-y-4">
            {mode === 'soundOnly' ? (
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-text-light dark:text-text-dark">🔊 *Ding!*</p>
                <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1">
                  A sound played, but there’s no text confirmation of what happened.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <span className="material-icons text-green-600">notifications</span>
                  <div>
                    <p className="font-semibold text-text-light dark:text-text-dark">New assignment</p>
                    <p className="text-sm text-subtle-light dark:text-subtle-dark">Please complete the algebra quiz by Friday.</p>
                    <button className="mt-2 text-sm font-bold text-primary hover:underline">View details</button>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-subtle-light dark:text-subtle-dark">
              Inclusive alerts should be perceivable without sound and should leave a persistent trail (not just a transient beep).
            </p>
          </div>
        </div>
      </div>
    </ActivityWrapper>
  );
};

// 5) IDD: Plain language toggle
export const PlainLanguageRewriteActivity: React.FC = () => {
  const [plain, setPlain] = useState(true);

  return (
    <ActivityWrapper
      title="Plain Language Rewrite"
      description="Toggle between complex and plain-language instructions to see how clarity reduces cognitive load."
      icon="notes"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div>
            <p className="font-medium text-sm text-text-light dark:text-text-dark">Plain language</p>
            <p className="text-xs text-subtle-light dark:text-subtle-dark">Keep instructions short, concrete, and step-by-step.</p>
          </div>
          <button
            onClick={() => setPlain((v) => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${plain ? 'bg-primary' : 'bg-gray-300'}`}
            aria-label="Toggle plain language"
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${plain ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark">
          <p className="text-xs font-semibold text-gray-500 uppercase">Instruction</p>
          {plain ? (
            <ol className="mt-2 list-decimal list-inside text-text-light dark:text-text-dark space-y-1">
              <li>Open the quiz.</li>
              <li>Answer 5 questions.</li>
              <li>Click “Submit”.</li>
              <li>Read your feedback.</li>
            </ol>
          ) : (
            <p className="mt-2 text-text-light dark:text-text-dark">
              Commence the assessment module and respond to the requisite items, ensuring completion prior to initiating submission for automated evaluation.
            </p>
          )}
        </div>
      </div>
    </ActivityWrapper>
  );
};

// 6) IDD: Step-by-step task chunking
export const StepByStepTaskActivity: React.FC = () => {
  const steps = ['Choose a topic', 'Read one example', 'Answer one question', 'Check your answer'];
  const [current, setCurrent] = useState(0);

  return (
    <ActivityWrapper
      title="Task Chunking (One step at a time)"
      description="Experience how breaking tasks into steps supports learners with attention and working-memory challenges."
      icon="playlist_add_check"
    >
      <div className="space-y-5">
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark">
          <p className="text-xs font-semibold text-gray-500 uppercase">Current step</p>
          <p className="mt-2 text-lg font-bold text-text-light dark:text-text-dark">{steps[current]}</p>
          <div className="mt-4 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${((current + 1) / steps.length) * 100}%` }} />
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold"
              disabled={current === 0}
            >
              Back
            </button>
            <button
              onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90"
              disabled={current === steps.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <p className="text-xs text-subtle-light dark:text-subtle-dark">
          Chunking reduces overwhelm and gives learners a clear sense of progress.
        </p>
      </div>
    </ActivityWrapper>
  );
};

// 7) DSL: Haptic pattern dictionary
export const HapticPatternDictionaryActivity: React.FC = () => {
  const patterns = {
    info: { label: 'Info', pulses: 2, color: 'bg-blue-500' },
    warning: { label: 'Warning', pulses: 3, color: 'bg-orange-500' },
    critical: { label: 'Critical', pulses: 5, color: 'bg-red-500' }
  } as const;

  const [selected, setSelected] = useState<keyof typeof patterns>('info');
  const current = patterns[selected];

  return (
    <ActivityWrapper
      title="Haptic Alert Dictionary"
      description="Pick an alert type to see consistent vibration patterns that don’t rely on sound or sight."
      icon="vibration"
    >
      <div className="space-y-5">
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(patterns) as (keyof typeof patterns)[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-3 py-2 rounded-lg border text-sm font-semibold ${selected === key ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-gray-700'}`}
            >
              {patterns[key].label}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark">
          <p className="text-xs font-semibold text-gray-500 uppercase">Vibration pattern</p>
          <div className="mt-3 flex items-center gap-2">
            {Array.from({ length: current.pulses }).map((_, i) => (
              <span key={i} className={`h-3 w-3 rounded-full ${current.color}`} />
            ))}
          </div>
          <p className="mt-3 text-sm text-subtle-light dark:text-subtle-dark">
            Example: {current.label} alerts use <strong>{current.pulses}</strong> short pulses.
          </p>
        </div>
      </div>
    </ActivityWrapper>
  );
};

// 8) DSL: Linear navigation demo
export const BrailleFirstNavigationActivity: React.FC = () => {
  const [step, setStep] = useState(0);

  const flow = [
    { title: 'Home', desc: 'Press Enter to open Lessons.' },
    { title: 'Lessons', desc: 'Press Enter to open Module 1.' },
    { title: 'Module 1', desc: 'Press Enter to open Quiz.' },
    { title: 'Quiz', desc: 'Press Enter to submit.' }
  ];

  return (
    <ActivityWrapper
      title="Braille-first Navigation Flow"
      description="A linear, predictable flow reduces disorientation for deafblind and dual-sensory users."
      icon="route"
    >
      <div className="space-y-5">
        <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark">
          <p className="text-xs font-semibold text-gray-500 uppercase">Current location</p>
          <p className="mt-2 text-lg font-bold text-text-light dark:text-text-dark">{flow[step].title}</p>
          <p className="text-sm text-subtle-light dark:text-subtle-dark mt-1">{flow[step].desc}</p>

          <div className="mt-4 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${((step + 1) / flow.length) * 100}%` }} />
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold"
              disabled={step === 0}
            >
              Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(flow.length - 1, s + 1))}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90"
              disabled={step === flow.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <p className="text-xs text-subtle-light dark:text-subtle-dark">
          Goal: no surprise layout shifts, no time pressure, and clear “where am I” feedback.
        </p>
      </div>
    </ActivityWrapper>
  );
};
