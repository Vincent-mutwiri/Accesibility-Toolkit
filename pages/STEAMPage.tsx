import React from 'react';
import Checklist from '../components/Checklist';
import { BiasSpottingActivity, ProjectAdaptationChallenge } from '../components/Activities';
import PageHeader from '../components/PageHeader';
import STEAMMobileNav from '../components/STEAMMobileNav';
import FloatingBackButton from '../components/FloatingBackButton';

const STEAMPage: React.FC = () => {
  const navigationItems = [
    { label: 'Introduction', href: '#introduction' },
    { label: 'Key Design Areas', href: '#key-design-areas' },
    { label: 'Accessibility', href: '#accessibility' },
    { label: 'Interactive Content', href: '#interactive-content' },
    { label: 'Cognitive Load', href: '#cognitive-load' },
    { label: 'Offline Access', href: '#offline-access' },
    { label: 'Cultural Relevance', href: '#cultural-relevance' },
    { label: 'Monitoring', href: '#monitoring' },
    { label: 'Checklist', href: '#checklist' }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="STEAM Digital Learning Platforms"
        description="STEAM (Science, Technology, Engineering, Arts, and Mathematics) digital platforms foster creativity, innovation, and critical thinking by integrating multiple disciplines into interactive and project-based learning experiences."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'STEAM Platforms' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Introduction Section */}
            <div id="introduction" className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Introduction</h2>
              <p className="mb-4">STEAM (Science, Technology, Engineering, Arts, and Mathematics) digital platforms foster creativity, innovation, and critical thinking by integrating multiple disciplines into interactive and project-based learning experiences. These platforms go beyond content delivery — they create spaces where learners can experiment, design, build, and problem-solve collaboratively.</p>
              <p className="mb-4">A well-designed STEAM platform empowers learners to connect theory with practice, encouraging inquiry-based learning and real-world application. By combining science and the arts, they nurture both analytical and creative skills, preparing students for future careers in emerging fields.</p>
              <p className="mb-4">From an equity and inclusion perspective, STEAM platforms play a pivotal role in broadening participation — especially for rural learners, and those from under-resourced schools. Fairly designed platforms can help democratize access to scientific tools, labs, and creative technologies that are otherwise out of reach. Poorly designed systems, however, risk reinforcing exclusion in STEM participation and creative opportunities.</p>
            </div>

            {/* Key Design Areas Section */}
            <div id="key-design-areas" className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Design Areas</h2>

              <div className="grid gap-6 not-prose">
                <div id="accessibility" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-blue/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-blue mb-3">1. Accessibility Features</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Accessible STEAM platforms ensure that learners of all abilities can participate meaningfully in scientific inquiry, design tasks, coding, and digital creation. This helps prevent exclusion and ensures full participation in both technical and creative aspects of STEAM learning.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Design Considerations:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Comply with WCAG 2.1 AA accessibility standards, ensuring lab simulations, coding interfaces, and creative tools are compatible with screen readers, voice input, and keyboard navigation.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Provide color contrast options and pattern variations for color-blind users in graphs, simulations, and artistic visualizations.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Offer both visual (drag-and-drop) and code-based modes for programming and design to support learners with diverse abilities.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Include captions, transcripts, and audio descriptions for experiment videos, design walkthroughs, and tutorials.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Incorporate haptic or tactile feedback where possible, especially in robotics or design tasks requiring sensory cues.</li>
                  </ul>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg text-sm">
                    <strong>Evidence-in-Practice:</strong> PhET Interactive Simulations and LabXchange integrate accessible coding/lab environments. GeoGebra and PhET use accessible visual contrast and pattern differentiation. Scratch, Tynker, and Blockly combine block-based and text-based modes.
                  </div>
                </div>

                <div id="interactive-content" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-green/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-green mb-3">2. Interactive & Experiential Content Design</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">STEAM learning thrives on hands-on, inquiry-based, and creative experimentation. Platforms should simulate real-world design, modeling, and problem-solving, supporting students as they move from guided exploration to open creative invention.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Design Considerations:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Support digital labs, maker challenges, and creative coding projects that mirror real-world STEAM inquiry.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Scaffold creativity by moving from guided steps to more open-ended design tasks.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Use multimodal content — text, visuals, video, AR/VR, storytelling — to explain complex STEAM concepts.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Provide reflection tools such as journals or prompts to help learners evaluate their creative and scientific processes.</li>
                  </ul>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg text-sm">
                    <strong>Evidence-in-Practice:</strong> TinkerCAD, CoSpaces EDU, and PhET simulate real-world experimentation and digital making.
                  </div>
                </div>

                <div id="cognitive-load" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-yellow/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-yellow mb-3">3. Cognitive Load & Creative Flow Management</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">STEAM tasks can be cognitively demanding, blending analytical reasoning with creative problem-solving. Platforms should balance structure with creative freedom to maintain engagement without overwhelming learners.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Design Considerations:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Use guided discovery with manageable steps and clear progress indicators.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Provide creative checkpoints to allow pausing, reviewing feedback, and iterating designs.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Keep interfaces clean and intuitive with minimal clutter and clear tooltips.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Adjust challenge levels adaptively based on learner progress.</li>
                  </ul>
                  <div className="mt-4">
                    <BiasSpottingActivity />
                  </div>
                </div>

                <div id="offline-access" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-orange/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">4. Offline Access & Low-Bandwidth Optimization</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">Given the digital divide in STEAM access, platforms should ensure usability in low-connectivity environments so that rural and underserved learners can fully participate.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Design Considerations:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Allow project templates or datasets to be downloaded for offline use.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Offer lightweight or text-based versions of STEAM simulations.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Ensure full functionality on low-cost devices and mobile browsers.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Enable local offline work with automatic syncing when online.</li>
                  </ul>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg text-sm">
                    <strong>Evidence-in-Practice:</strong> Kolibri and LabXchange offer offline access and syncing capabilities.
                  </div>
                  <div className="mt-4">
                    <ProjectAdaptationChallenge />
                  </div>
                </div>

                <div id="cultural-relevance" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-purple/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-purple mb-3">5. Cultural Relevance & Local Context</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200">STEAM learning becomes more meaningful when connected to learners' lived experiences, local challenges, and cultural identities. Localizing content can strengthen relevance and engagement across diverse communities.</p>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Design Considerations:</h4>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span>Use familiar cultural contexts in science or design challenges.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span>Encourage projects addressing local issues like energy, water, or waste.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span>Highlight scientists, artists, engineers, and innovators from diverse backgrounds.</li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Additional Key Areas</h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-start">
                      <span className="material-icons text-brand-blue text-sm mr-2 mt-1">attach_money</span>
                      <div><strong>Cost & Infrastructure:</strong> Reduce data consumption by optimizing multimedia and simulations. Support shared labs, mobile devices, and low-spec machines. Integrate open-source or free tools.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-green text-sm mr-2 mt-1">route</span>
                      <div><strong>Adaptive Learning Paths:</strong> Recommend projects aligned with learner interests and strengths. Support multiple assessment formats: portfolios, prototypes, presentations, and quizzes.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-yellow text-sm mr-2 mt-1">diversity_3</span>
                      <div><strong>Equitable Representation:</strong> Use inclusive narratives that celebrate contributions from underrepresented groups. Avoid gender stereotypes in avatars, storylines, or project framing.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-orange text-sm mr-2 mt-1">groups</span>
                      <div><strong>Inclusive Collaboration:</strong> Facilitate peer studios or collaborative workspaces. Provide mentorship opportunities with educators and industry practitioners.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-purple text-sm mr-2 mt-1">security</span>
                      <div><strong>Data Privacy & Ethics:</strong> Clearly explain how learner data, projects, and creative outputs are used. Audit AI algorithms for fairness in project recommendations or feedback.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring & Evaluation Section */}
            <div id="monitoring" className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Monitoring & Evaluation (Key Metrics)</h2>
              <p className="mb-6">Monitoring and Evaluation ensures that inclusive STEAM design is not just well-intentioned but consistently implemented and improved over time. For most early-stage EdTech teams, M&E must be simple, practical, and tightly connected to the product development workflow.</p>

              <div className="grid gap-4 not-prose">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-blue mr-3 mt-1">accessibility</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">Accessibility Indicators</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• % of images with alt text (checked during content upload)</li>
                        <li>• % of videos with captions/transcripts</li>
                        <li>• Mobile and low-bandwidth performance (e.g., page load time under 3G)</li>
                        <li>• Basic screen-reader compatibility check per release</li>
                        <li>• Text readability levels (ensuring age-appropriate complexity)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-green mr-3 mt-1">trending_up</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">Engagement Indicators</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Module completion rates</li>
                        <li>• Average time spent on lessons (videos, simulations, interactive tasks)</li>
                        <li>• Drop-off points (screens or activities where learners stop)</li>
                        <li>• Most and least preferred formats (video, text, experiment, animation)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-yellow mr-3 mt-1">feedback</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">Learner Feedback Indicators</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Simple 1–5 satisfaction rating after modules</li>
                        <li>• Open-ended responses to "What was difficult?"</li>
                        <li>• Teacher/parent observations (especially for younger learners)</li>
                        <li>• Feedback from girls and learners with disabilities on barriers they face</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-orange mr-3 mt-1">equalizer</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">Equity of Reach Indicators</strong>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• User distribution by region and gender (only if voluntarily provided)</li>
                        <li>• Device type and connectivity patterns (2G, shared device, mobile only)</li>
                        <li>• Differences in engagement between groups (e.g., boys vs girls, rural vs urban)</li>
                        <li>• Participation in advanced or extension activities by demographic</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="checklist">
              <Checklist
                title="STEAM Platform Equity & Inclusion Checklist"
                items={[
                  "Are creative tools screen-reader and keyboard compatible?",
                  "Are visuals accessible for color-blind users?",
                  "Are captions/transcripts available for videos?",
                  "Can learners download or sync STEAM projects offline?",
                  "Are simplified simulations available?",
                  "Does the platform run on mobile and low-cost devices?",
                  "Are project themes locally meaningful?",
                  "Does content represent diverse STEAM innovators?",
                  "Are multilingual/localized options available?",
                  "Do lab simulations support both visual and code-based modes?",
                  "Is haptic or tactile feedback incorporated where possible?",
                  "Are digital labs and maker challenges available?",
                  "Do platforms scaffold creativity from guided to open-ended tasks?",
                  "Are reflection tools (journals, prompts) provided?",
                  "Do interfaces maintain clean design with clear tooltips?",
                  "Are creative checkpoints available for pausing and iteration?",
                  "Can project templates be downloaded for offline use?",
                  "Are lightweight versions of simulations available?",
                  "Do challenges use familiar cultural contexts?",
                  "Are local issues (energy, water, waste) addressed in projects?",
                  "Is data consumption minimized through optimization?",
                  "Are open-source or free tools integrated?",
                  "Do learning paths adapt to learner interests and strengths?",
                  "Are multiple assessment formats supported (portfolios, prototypes, presentations)?",
                  "Do narratives celebrate contributions from underrepresented groups?",
                  "Are gender stereotypes avoided in avatars and storylines?",
                  "Are peer studios or collaborative workspaces facilitated?",
                  "Are mentorship opportunities with industry practitioners provided?",
                  "Is learner data use clearly explained and transparent?",
                  "Are AI algorithms audited for fairness in recommendations?"
                ]}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-brand-purple font-medium hover:underline">Introduction</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-purple transition-colors">Accessibility Features</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-purple transition-colors">Interactive Content Design</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-purple transition-colors">Cognitive Load Management</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-purple transition-colors">Offline Access & Bandwidth</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-purple transition-colors">Cultural Relevance</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-purple transition-colors">Monitoring & Evaluation</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-purple transition-colors">Checklist</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <STEAMMobileNav />
      <FloatingBackButton />
    </div>
  );
};

export default STEAMPage;