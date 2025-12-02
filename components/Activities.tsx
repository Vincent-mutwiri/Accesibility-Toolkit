import React, { useState, ReactNode } from 'react';

// --- Wrapper Component ---
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
          {title} <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Interactive</span>
        </h3>
        <p className="text-sm text-subtle-light dark:text-subtle-dark">{description}</p>
      </div>
    </div>
    <div className="p-6 md:p-8">
      {children}
    </div>
  </div>
);

// --- 1. Color Contrast Activity ---
export const ColorContrastActivity: React.FC = () => {
  const [level, setLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const styles = {
    low: { bg: '#E5E7EB', text: '#9CA3AF', label: 'Fail (Low Contrast)' },
    medium: { bg: '#E5E7EB', text: '#4B5563', label: 'AA (Medium Contrast)' },
    high: { bg: '#F3F4F6', text: '#111827', label: 'AAA (High Contrast)' },
  };

  const current = styles[level];

  return (
    <ActivityWrapper
      title="Color Contrast Simulator"
      description="See how contrast affects readability for learners with visual impairments."
      icon="contrast"
    >
      <div className="space-y-6">
        <div className="flex justify-center gap-4">
          {(['low', 'medium', 'high'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${level === l
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="p-8 rounded-lg border border-gray-200 flex flex-col items-center justify-center text-center transition-colors duration-300" style={{ backgroundColor: current.bg }}>
          <h4 className="text-2xl font-bold mb-2 transition-colors duration-300" style={{ color: current.text }}>Course Progress</h4>
          <p className="mb-4 transition-colors duration-300" style={{ color: current.text }}>You have completed 75% of this module.</p>
          <button className="px-6 py-2 rounded transition-colors duration-300" style={{ backgroundColor: current.text, color: current.bg }}>
            Continue Learning
          </button>
        </div>

        <div className="text-center text-sm font-medium text-subtle-light dark:text-subtle-dark">
          WCAG Status: <span className={level === 'low' ? 'text-red-500' : 'text-green-500'}>{current.label}</span>
        </div>
      </div>
    </ActivityWrapper>
  );
};

// --- 2. Multilingual Toggle Activity ---
export const MultilingualToggleActivity: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'sw' | 'ar'>('en');

  const content = {
    en: { title: 'New Assignment', body: 'Please complete the algebra quiz by Friday.', button: 'View Details', dir: 'ltr' },
    sw: { title: 'Kazi Mpya', body: 'Tafadhali maliza zoezi la aljebra kufikia Ijumaa.', button: 'Angalia Maelezo', dir: 'ltr' },
    ar: { title: 'مهمة جديدة', body: 'يرجى إكمال اختبار الجبر بحلول يوم الجمعة.', button: 'عرض التفاصيل', dir: 'rtl' },
  };

  const current = content[lang];

  return (
    <ActivityWrapper
      title="Multilingual Interface Toggle"
      description="Experience how language options and layout direction (RTL) support inclusion."
      icon="translate"
    >
      <div className="space-y-6">
        <div className="flex justify-center gap-2">
          <button onClick={() => setLang('en')} className={`px-3 py-1 rounded text-sm ${lang === 'en' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>English</button>
          <button onClick={() => setLang('sw')} className={`px-3 py-1 rounded text-sm ${lang === 'sw' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Kiswahili</button>
          <button onClick={() => setLang('ar')} className={`px-3 py-1 rounded text-sm ${lang === 'ar' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Arabic (RTL)</button>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-card-light dark:bg-card-dark shadow-sm max-w-sm mx-auto" dir={current.dir}>
          <div className={`flex items-start gap-4 ${current.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full shrink-0">
              <span className="material-icons text-primary">notifications</span>
            </div>
            <div>
              <h4 className="font-bold text-lg text-text-light dark:text-text-dark">{current.title}</h4>
              <p className="text-subtle-light dark:text-subtle-dark text-sm mt-1 mb-3">{current.body}</p>
              <button className="text-primary text-sm font-bold hover:underline">{current.button}</button>
            </div>
          </div>
        </div>
      </div>
    </ActivityWrapper>
  );
};

// --- 3. UDL Preview Activity ---
export const UDLPreviewActivity: React.FC = () => {
  const [mode, setMode] = useState<'text' | 'audio' | 'visual'>('text');

  return (
    <ActivityWrapper
      title="UDL Content Preview"
      description="See how multiple means of representation support different learner needs."
      icon="auto_stories"
    >
      <div className="space-y-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'text', icon: 'description', label: 'Read' },
            { id: 'audio', icon: 'headphones', label: 'Listen' },
            { id: 'visual', icon: 'image', label: 'Watch' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${mode === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-subtle-light dark:text-subtle-dark hover:text-text-light'
                }`}
            >
              <span className="material-icons text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 bg-background-light dark:bg-background-dark rounded-lg min-h-[200px] flex flex-col justify-center">
          {mode === 'text' && (
            <div className="animate-fade-in">
              <h4 className="font-bold text-lg mb-2">Photosynthesis</h4>
              <p className="leading-relaxed">Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a byproduct.</p>
            </div>
          )}
          {mode === 'audio' && (
            <div className="animate-fade-in flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons text-primary text-3xl">play_arrow</span>
              </div>
              <p className="text-sm font-bold mb-2">Audio Transcript:</p>
              <p className="text-sm italic text-center text-subtle-light dark:text-subtle-dark">"Welcome to this lesson on Photosynthesis. Imagine a plant as a factory..."</p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                <div className="w-1/3 h-full bg-primary"></div>
              </div>
            </div>
          )}
          {mode === 'visual' && (
            <div className="animate-fade-in flex flex-col items-center">
              <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
                <div className="flex items-center justify-center gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="material-icons text-yellow-500 text-4xl">wb_sunny</span>
                    <span className="text-xs">Sunlight</span>
                  </div>
                  <span className="material-icons text-gray-400">arrow_forward</span>
                  <div className="flex flex-col items-center">
                    <span className="material-icons text-green-600 text-5xl">eco</span>
                    <span className="text-xs">Plant</span>
                  </div>
                  <span className="material-icons text-gray-400">arrow_forward</span>
                  <div className="flex flex-col items-center">
                    <span className="material-icons text-blue-400 text-4xl">air</span>
                    <span className="text-xs">Oxygen</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-subtle-light dark:text-subtle-dark text-center">Diagram showing inputs (Sunlight) and outputs (Oxygen) of the plant.</p>
            </div>
          )}
        </div>
      </div>
    </ActivityWrapper>
  );
};

// --- 4. Assessment Format Selector ---
export const AssessmentSelectorActivity: React.FC = () => {
  const [format, setFormat] = useState<'quiz' | 'oral' | 'project'>('quiz');

  return (
    <ActivityWrapper
      title="Assessment Format Selector"
      description="Toggle between assessment types to see how flexibility allows learners to demonstrate mastery differently."
      icon="quiz"
    >
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-2">
          {(['quiz', 'oral', 'project'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${format === f
                  ? 'border-primary bg-primary/5 text-primary font-bold'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
            >
              {f === 'quiz' && 'Standard Quiz'}
              {f === 'oral' && 'Oral/Audio Response'}
              {f === 'project' && 'Project Upload'}
            </button>
          ))}
        </div>
        <div className="md:col-span-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          {format === 'quiz' && (
            <div className="space-y-4 animate-fade-in">
              <h5 className="font-bold">Question 1:</h5>
              <p className="text-sm">Identify the primary cause of...</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2"><input type="radio" name="q1" /> <label>Option A</label></div>
                <div className="flex items-center gap-2"><input type="radio" name="q1" /> <label>Option B</label></div>
                <div className="flex items-center gap-2"><input type="radio" name="q1" /> <label>Option C</label></div>
              </div>
            </div>
          )}
          {format === 'oral' && (
            <div className="flex flex-col items-center text-center animate-fade-in">
              <span className="material-icons text-5xl text-primary mb-2">mic</span>
              <h5 className="font-bold mb-2">Record your answer</h5>
              <p className="text-sm text-subtle-light mb-4">Explain the primary cause in your own words (Max 2 mins).</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-600">
                <span className="material-icons text-sm">fiber_manual_record</span> Record
              </button>
            </div>
          )}
          {format === 'project' && (
            <div className="flex flex-col items-center text-center animate-fade-in">
              <span className="material-icons text-5xl text-blue-500 mb-2">cloud_upload</span>
              <h5 className="font-bold mb-2">Submit your Portfolio</h5>
              <p className="text-sm text-subtle-light mb-4">Upload a presentation, video, or document demonstrating your analysis.</p>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 w-full py-8 rounded-lg">
                Drag & Drop files here
              </div>
            </div>
          )}
        </div>
      </div>
    </ActivityWrapper>
  );
};

// --- 5. Bias Spotting Activity ---
export const BiasSpottingActivity: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (id: number) => {
    setSelected(id);
    setShowFeedback(true);
  };

  return (
    <ActivityWrapper
      title="Representation Bias Spotting"
      description="Which team image represents an inclusive STEAM environment? Click to select."
      icon="groups"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Option A */}
        <div
          onClick={() => handleSelect(1)}
          className={`cursor-pointer border-4 rounded-xl overflow-hidden relative transition-all ${selected === 1 ? 'border-red-400' : 'border-transparent hover:shadow-lg'
            }`}
        >
          <div className="bg-gray-200 h-40 flex items-center justify-center">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-12 rounded-full bg-blue-300 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-800">Boy</div>
              ))}
            </div>
          </div>
          <div className="p-3 bg-card-light dark:bg-card-dark text-center font-bold">Team Alpha</div>
          {selected === 1 && (
            <div className="absolute inset-0 bg-white/90 dark:bg-black/90 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
              <span className="material-icons text-red-500 text-4xl mb-2">error</span>
              <p className="text-red-600 font-bold">Try Again</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">This group lacks gender and racial diversity, reinforcing stereotypes that STEAM is only for certain groups.</p>
              <button onClick={(e) => { e.stopPropagation(); setSelected(null); }} className="mt-2 text-sm underline">Retry</button>
            </div>
          )}
        </div>

        {/* Option B */}
        <div
          onClick={() => handleSelect(2)}
          className={`cursor-pointer border-4 rounded-xl overflow-hidden relative transition-all ${selected === 2 ? 'border-green-500' : 'border-transparent hover:shadow-lg'
            }`}
        >
          <div className="bg-gray-200 h-40 flex items-center justify-center">
            <div className="flex -space-x-2">
              <div className="w-12 h-12 rounded-full bg-pink-300 border-2 border-white flex items-center justify-center text-xs font-bold text-pink-800">Girl</div>
              <div className="w-12 h-12 rounded-full bg-brown-400 border-2 border-white flex items-center justify-center text-xs font-bold text-yellow-100" style={{ backgroundColor: '#8D6E63' }}>Boy</div>
              <div className="w-12 h-12 rounded-full bg-purple-300 border-2 border-white flex items-center justify-center text-xs font-bold text-purple-800">Dis.</div>
            </div>
          </div>
          <div className="p-3 bg-card-light dark:bg-card-dark text-center font-bold">Team Beta</div>
          {selected === 2 && (
            <div className="absolute inset-0 bg-white/90 dark:bg-black/90 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
              <span className="material-icons text-green-500 text-4xl mb-2">check_circle</span>
              <p className="text-green-600 font-bold">Correct!</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">This team represents diverse genders, ethnicities, and abilities, fostering a welcoming environment for all.</p>
            </div>
          )}
        </div>
      </div>
    </ActivityWrapper>
  );
};

// --- 6. Auth Choice Activity ---
export const AuthChoiceActivity: React.FC = () => {
  const [choice, setChoice] = useState<string | null>(null);

  const feedback = {
    email: { status: 'warning', title: 'Barrier Detected', msg: 'Many rural workers do not have active email addresses. This might exclude them.' },
    phone: { status: 'success', title: 'Great Choice', msg: 'Mobile penetration is high. OTP via SMS is accessible to most informal workers.' },
    social: { status: 'info', title: 'Mixed Impact', msg: 'Convenient for some, but requires a smartphone and data, which not all workers possess.' }
  };

  return (
    <ActivityWrapper
      title="Authentication Choice Scenario"
      description="You are building for rural informal workers. Choose the best login method."
      icon="lock"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button onClick={() => setChoice('email')} className={`p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center gap-2 ${choice === 'email' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : ''}`}>
            <span className="material-icons">email</span>
            Email + Password
          </button>
          <button onClick={() => setChoice('phone')} className={`p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center gap-2 ${choice === 'phone' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}>
            <span className="material-icons">sms</span>
            Phone Number (OTP)
          </button>
          <button onClick={() => setChoice('social')} className={`p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center gap-2 ${choice === 'social' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
            <span className="material-icons">public</span>
            Social Login
          </button>
        </div>

        {choice && (
          <div className={`p-4 rounded-lg border-l-4 animate-fade-in ${feedback[choice as keyof typeof feedback].status === 'success' ? 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
              feedback[choice as keyof typeof feedback].status === 'warning' ? 'bg-orange-50 border-orange-500 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
            }`}>
            <h4 className="font-bold flex items-center gap-2">
              <span className="material-icons text-sm">
                {feedback[choice as keyof typeof feedback].status === 'success' ? 'check_circle' :
                  feedback[choice as keyof typeof feedback].status === 'warning' ? 'warning' : 'info'}
              </span>
              {feedback[choice as keyof typeof feedback].title}
            </h4>
            <p className="text-sm mt-1">{feedback[choice as keyof typeof feedback].msg}</p>
          </div>
        )}
      </div>
    </ActivityWrapper>
  );
};
// --- 7. Bandwidth Simulator ---
export const BandwidthSimulator: React.FC = () => {
  const [bandwidth, setBandwidth] = useState<'high' | 'low'>('high');

  return (
    <ActivityWrapper
      title="Bandwidth Simulator"
      description="Toggle between connection speeds to see why low-bandwidth optimization matters."
      icon="wifi"
    >
      <div className="space-y-6">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setBandwidth('high')}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${bandwidth === 'high'
                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              }`}
          >
            <span className="material-icons text-sm">wifi</span> High Speed (4G/WiFi)
          </button>
          <button
            onClick={() => setBandwidth('low')}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${bandwidth === 'low'
                ? 'bg-orange-100 text-orange-800 border-2 border-orange-500'
                : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              }`}
          >
            <span className="material-icons text-sm">network_check</span> Low Speed (2G/3G)
          </button>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
            <span className="font-bold text-sm">Course Video: Introduction to Algebra</span>
            {bandwidth === 'low' && <span className="text-xs text-orange-600 font-bold animate-pulse">Connection Unstable...</span>}
          </div>

          <div className="aspect-video bg-black flex items-center justify-center relative">
            {bandwidth === 'high' ? (
              <div className="text-center animate-fade-in">
                <span className="material-icons text-white text-6xl opacity-80">play_circle</span>
                <p className="text-white mt-2">HD Video Loading...</p>
                <div className="w-64 h-1 bg-gray-700 rounded-full mt-4 mx-auto overflow-hidden">
                  <div className="w-full h-full bg-blue-500 animate-[loading_1s_ease-in-out]"></div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <span className="material-icons text-gray-500 text-4xl mb-2 animate-spin">refresh</span>
                <p className="text-gray-400 text-sm">Buffering... (45%)</p>
                <div className="mt-6 p-3 bg-gray-800 rounded border border-gray-700 text-left max-w-xs mx-auto">
                  <p className="text-xs text-gray-300 mb-2">Video failing to load?</p>
                  <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 w-full">
                    Download Text Transcript (50KB)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200">
          <strong>Insight:</strong> {bandwidth === 'high'
            ? "On high-speed connections, rich media engages learners effectively."
            : "On low-bandwidth connections, heavy media fails. Providing text alternatives or downloadable options ensures learning continues."}
        </div>
      </div>
    </ActivityWrapper>
  );
};

// --- 8. Screen Reader Simulator ---
export const ScreenReaderSimulator: React.FC = () => {
  const [hasAltText, setHasAltText] = useState(false);

  return (
    <ActivityWrapper
      title="Screen Reader Simulator"
      description="Experience how screen readers interpret images with and without Alt Text."
      icon="hearing"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg flex items-center justify-center relative overflow-hidden group">
            <span className="material-icons text-6xl text-gray-400">bar_chart</span>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white font-medium">Chart showing 50% growth</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium">Enable Alt Text?</span>
            <button
              onClick={() => setHasAltText(!hasAltText)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${hasAltText ? 'bg-primary' : 'bg-gray-300'
                }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${hasAltText ? 'translate-x-6' : 'translate-x-1'
                }`} />
            </button>
          </div>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm leading-relaxed shadow-inner overflow-y-auto h-48">
          <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-2 text-gray-400">
            <span className="material-icons text-xs">settings_voice</span> Screen Reader Output
          </div>
          <p className="mb-2">{">"} Heading Level 2: Quarterly Results</p>
          <p className="mb-2">{">"} Paragraph: The results are shown below.</p>
          <div className={`p-2 rounded ${hasAltText ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'}`}>
            {hasAltText ? (
              <p>{">"} <span className="font-bold">Image:</span> Bar chart showing 50% revenue growth in Q4 compared to Q3.</p>
            ) : (
              <p>{">"} <span className="font-bold">Image:</span> IMG_2024_FINAL_v2.jpg</p>
            )}
          </div>
          <p className="mt-2 text-gray-500">{">"} End of section.</p>
        </div>
      </div>
    </ActivityWrapper>
  );
};

// --- 9. Feedback Scenario ---
export const FeedbackScenario: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    {
      id: 1,
      text: "You failed the quiz. You need to study harder next time.",
      feedback: "This is 'Fixed Mindset' feedback. It judges ability without offering a path forward, which can demotivate struggling learners.",
      status: 'warning'
    },
    {
      id: 2,
      text: "I noticed you struggled with fractions. Here is a video that explains it differently. Let's try again!",
      feedback: "Excellent! This is 'Growth Mindset' feedback. It identifies the specific gap and provides a resource to close it.",
      status: 'success'
    }
  ];

  return (
    <ActivityWrapper
      title="Inclusive Feedback Challenge"
      description="Choose the feedback that best supports a learner who just failed an assessment."
      icon="thumbs_up_down"
    >
      <div className="space-y-4">
        <p className="font-medium text-slate-900 dark:text-white">Scenario: A student scores 40% on a math module.</p>
        <div className="grid gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${selectedOption === opt.id
                  ? opt.status === 'success'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                }`}
            >
              <div className="flex items-start gap-3">
                <span className={`material-icons mt-0.5 ${selectedOption === opt.id ? 'text-inherit' : 'text-gray-400'}`}>
                  {selectedOption === opt.id ? (opt.status === 'success' ? 'check_circle' : 'cancel') : 'radio_button_unchecked'}
                </span>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">"{opt.text}"</p>
                  {selectedOption === opt.id && (
                    <p className={`text-sm mt-2 ${opt.status === 'success' ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'}`}>
                      {opt.feedback}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ActivityWrapper>
  );
};

// --- 10. Project Adaptation Challenge ---
export const ProjectAdaptationChallenge: React.FC = () => {
  const [resourceLevel, setResourceLevel] = useState<'high' | 'low'>('low');

  return (
    <ActivityWrapper
      title="Project Adaptation Challenge"
      description="Adapt a STEAM project for a low-resource classroom."
      icon="build"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <span className="font-bold">Classroom Context:</span>
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded p-1">
            <button
              onClick={() => setResourceLevel('high')}
              className={`px-3 py-1 text-xs rounded ${resourceLevel === 'high' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
            >
              High Tech Lab
            </button>
            <button
              onClick={() => setResourceLevel('low')}
              className={`px-3 py-1 text-xs rounded ${resourceLevel === 'low' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
            >
              Rural Classroom
            </button>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h4 className="font-bold text-lg mb-2">Project Goal: Design a Water Filter</h4>
          <p className="text-sm text-subtle-light mb-6">Students must understand filtration layers and clean water access.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border-2 text-center ${resourceLevel === 'high' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 opacity-50'}`}>
              <span className="material-icons text-3xl mb-2 text-blue-500">print</span>
              <h5 className="font-bold text-sm">3D Printed Filter</h5>
              <p className="text-xs mt-1 text-gray-500">Requires CAD software & Printer</p>
            </div>

            <div className={`p-4 rounded-lg border-2 text-center ${resourceLevel === 'low' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 opacity-50'}`}>
              <span className="material-icons text-3xl mb-2 text-brown-500" style={{ color: '#8D6E63' }}>recycling</span>
              <h5 className="font-bold text-sm">Plastic Bottle & Sand</h5>
              <p className="text-xs mt-1 text-gray-500">Uses locally available waste materials</p>
            </div>

            <div className={`p-4 rounded-lg border-2 text-center ${resourceLevel === 'high' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 opacity-50'}`}>
              <span className="material-icons text-3xl mb-2 text-purple-500">science</span>
              <h5 className="font-bold text-sm">Digital Simulation</h5>
              <p className="text-xs mt-1 text-gray-500">Requires tablets/computers</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded text-sm text-blue-800 dark:text-blue-200">
            {resourceLevel === 'low'
              ? "In a low-resource setting, using recycled bottles and sand teaches the same scientific principles without requiring expensive equipment."
              : "In a high-tech lab, digital simulations or 3D printing can enhance precision, but remember to teach the underlying physical concepts too."}
          </div>
        </div>
      </div>
    </ActivityWrapper>
  );
};

// --- 11. Skill Mapping Tool ---
export const SkillMappingTool: React.FC = () => {
  const [matches, setMatches] = useState<Record<string, string>>({});

  const informalSkills = [
    { id: 'market', label: 'Selling vegetables in the market', formal: 'Sales & Negotiation' },
    { id: 'budget', label: 'Managing home expenses', formal: 'Financial Literacy' },
    { id: 'farm', label: 'Coordinating harvest workers', formal: 'Team Management' }
  ];

  const handleMatch = (id: string, formal: string) => {
    setMatches(prev => ({ ...prev, [id]: formal }));
  };

  return (
    <ActivityWrapper
      title="Informal to Formal Skill Mapper"
      description="Translate informal life experiences into professional competencies for a CV."
      icon="work_outline"
    >
      <div className="space-y-4">
        {informalSkills.map((skill) => (
          <div key={skill.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-500 uppercase">Informal Experience</span>
              <p className="font-medium">{skill.label}</p>
            </div>
            <div className="hidden md:block text-gray-400">
              <span className="material-icons">arrow_forward</span>
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-gray-500 uppercase">Formal Competency</span>
              {matches[skill.id] ? (
                <div className="flex items-center justify-between bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-2 rounded font-bold text-sm">
                  {matches[skill.id]}
                  <span className="material-icons text-sm">check_circle</span>
                </div>
              ) : (
                <button
                  onClick={() => handleMatch(skill.id, skill.formal)}
                  className="w-full text-left px-3 py-2 border border-dashed border-gray-400 rounded text-gray-500 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Click to translate skill...
                </button>
              )}
            </div>
          </div>
        ))}
        <p className="text-xs text-center text-gray-500 mt-2">
          Helping learners name their skills builds confidence and improves employability.
        </p>
      </div>
    </ActivityWrapper>
  );
};

// --- 12. Privacy Configurator ---
export const PrivacyConfigurator: React.FC = () => {
  const [settings, setSettings] = useState({
    publicProfile: true,
    shareGrades: true,
    ads: true
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isSafe = !settings.publicProfile && !settings.shareGrades && !settings.ads;

  return (
    <ActivityWrapper
      title="Privacy Settings Audit"
      description="Configure the privacy settings for a student profile. Aim for maximum safety."
      icon="security"
    >
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div>
              <h4 className="font-bold text-sm">Student Profile Settings</h4>
              <p className="text-xs text-gray-500">Default Configuration</p>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Public Profile Visibility</p>
                <p className="text-xs text-gray-500">Allow anyone on the internet to see this student's photo and location.</p>
              </div>
              <button
                onClick={() => toggle('publicProfile')}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.publicProfile ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings.publicProfile ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Share Grades on Leaderboard</p>
                <p className="text-xs text-gray-500">Publicly display test scores to all other students.</p>
              </div>
              <button
                onClick={() => toggle('shareGrades')}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.shareGrades ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings.shareGrades ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Allow Targeted Advertising</p>
                <p className="text-xs text-gray-500">Use student data to show commercial ads.</p>
              </div>
              <button
                onClick={() => toggle('ads')}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.ads ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings.ads ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg text-sm transition-colors ${isSafe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <div className="flex items-center gap-2 font-bold mb-1">
            <span className="material-icons text-lg">{isSafe ? 'verified_user' : 'gpp_bad'}</span>
            {isSafe ? "Safe Configuration" : "Privacy Risks Detected"}
          </div>
          <p>
            {isSafe
              ? "Great job! You've prioritized student safety and dignity by disabling invasive tracking and public shaming."
              : "Warning: Public profiles can expose students to harm. Public leaderboards can demotivate struggling learners. Ads exploit student data."}
          </p>
        </div>
      </div>
    </ActivityWrapper>
  );
};
