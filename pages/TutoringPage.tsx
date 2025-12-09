import React from 'react';
import Checklist from '../components/Checklist';
import { AssessmentSelectorActivity, FeedbackScenario } from '../components/Activities';
import PageHeader from '../components/PageHeader';
import TutoringMobileNav from '../components/TutoringMobileNav';
import FloatingBackButton from '../components/FloatingBackButton';
import FloatingNavButton from '../components/FloatingNavButton';

const TutoringPage: React.FC = () => {
  const navigationItems = [
    { label: 'Introduction', href: '#introduction' },
    { label: 'Essential Features', href: '#essential-features' },
    { label: 'Accessibility', href: '#accessibility' },
    { label: 'Content Design', href: '#content-design' },
    { label: 'Cognitive Load', href: '#cognitive-load' },
    { label: 'Monitoring', href: '#monitoring' },
    { label: 'Checklist', href: '#checklist' }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Tutoring and Test Prep Platforms"
        description="Tutoring and Test prep platforms are vital enablers of personalized learning, providing targeted academic support, practice tools, and resources for high-stakes exams. From an equity perspective, they hold unique influence over who gains access to quality support."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Tutoring & Test Prep' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            {/* Introduction Section */}
            <div id="introduction" className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">1. Introduction</h2>
              <p className="mb-4">Tutoring digital learning platforms focus on providing personalized educational support to learners by using digital tools and adaptive algorithms to offer extra support in areas where students are struggling. Personalized learning tailors content to each individual's needs and pace, based on their strengths and weaknesses.</p>
              <p className="mb-4">Test prep focuses on preparing students for exams and tests to improve learning outcomes using personalized test prep tools.</p>
              <p className="mb-4">From an equity and inclusion perspective, they hold unique influence over who gains access to quality support, how learners' abilities are recognized, and what opportunities are created through exam performance. Designed fairly, they can broaden pathways for underserved learners. When poorly designed, they risk reinforcing systemic barriers and reducing opportunities.</p>
              <p className="mb-4">Here are the essential features you could incorporate into your platform to address different challenges faced by learners in tutoring and test prep digital solutions, ensuring equity and inclusion in digital learning.</p>
            </div>

            {/* Essential Features Section */}
            <div id="essential-features" className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">2. Essential Features for Equity and Inclusion</h2>

              <div className="grid gap-6 not-prose">
                <div id="accessibility" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-blue/50 transition-colors scroll-mt-24">
                  <h3 className="text-xl font-bold text-brand-blue mb-3">Accessibility Features</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span><span>Implement WCAG 2.1 AA compliance as a baseline, striving for AAA where possible</span></li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span><span><strong>Live Tutoring:</strong> Provide real-time captioning and transcription options for live sessions, ensuring clear and concise verbal communication while allowing pauses</span></li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span><span><strong>Revision Materials:</strong> All recommended materials such as videos, reading resources, and interactive exercises must include closed captions, transcripts, and alternative text for images</span></li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span><span><strong>Interface:</strong> Ensure full keyboard navigation, screen reader compatibility, and customizable display options (font size, contrast, color schemes)</span></li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span><span><strong>Input/Interaction:</strong> Voice input options for chat/search, and interactive elements that do not solely depend on fine motor skills</span></li>
                  </ul>
                </div>

                <div id="content-design" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-green/50 transition-colors scroll-mt-24">
                  <h3 className="text-xl font-bold text-brand-green mb-3">Content Design (Revision Materials)</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Clear, structured, and uncluttered layout for all recommended revision materials</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Avoidance of distracting animations or rapidly flashing visuals</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Multiple modalities for concept explanation (e.g., text, diagram, video, audio)</li>
                  </ul>
                </div>

                <div id="cognitive-load" className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-yellow/50 transition-colors scroll-mt-24">
                  <h3 className="text-xl font-bold text-brand-yellow mb-3">Cognitive Load Management</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-4">
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span><span><strong>Personalization Engine:</strong> Make sure the personalization algorithm detects and targets specific learning gaps, providing content in manageable chunks</span></li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span><span><strong>Tutoring content:</strong> Break down complex topics using clear analogies and regularly check for understanding</span></li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span><span><strong>Revision Materials:</strong> Materials should be scaffolded, gradually increasing in complexity, with clear learning objectives and summaries</span></li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span><span><strong>Progress Tracking:</strong> Provide visible and encouraging progress indicators (e.g., "You have completed 70% of this topic!")</span></li>
                  </ul>
                  <div className="mt-4">
                    <AssessmentSelectorActivity />
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-orange/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">Offline Access & Low Bandwidth Optimization</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span><span><strong>Revision Materials:</strong> Allow downloading of recommended revision materials for offline study</span></li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span><span><strong>Platform Functionality:</strong> Prioritize core tutoring functionalities for low-bandwidth connections. Offer text-only modes for live sessions if video is problematic</span></li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span><span><strong>Device Compatibility:</strong> Ensure the platform and revision materials function well on a wide range of devices (smartphones, tablets, various browsers) with minimal hardware requirements</span></li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-purple/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-purple mb-3">Cultural Relevance & Sensitivity</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span><strong>Content Localization:</strong> Ensure revision materials and examples are culturally relevant and sensitive</li>
                    <li className="flex items-start"><span className="material-icons text-brand-purple text-sm mr-2 mt-1">check</span>Offer language localization for the platform interface and key content that the learners can relate with</li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-red/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-red mb-3">Cost & Infrastructure</h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span>Design the platform to minimize data usage</li>
                    <li className="flex items-start"><span className="material-icons text-brand-red text-sm mr-2 mt-1">check</span>Provide clear system requirements to manage learner expectations regarding internet speed or device capabilities</li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Additional Key Features</h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-start">
                      <span className="material-icons text-brand-blue text-sm mr-2 mt-1">quiz</span>
                      <div><strong>Adaptive Practice and Assessments:</strong> Implement diverse practice formats such as quizzes, oral, visual, and performance tasks. Use AI-driven adaptivity cautiously, with bias checks to prevent stereotyping.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-green text-sm mr-2 mt-1">library_books</span>
                      <div><strong>Equitable Content and Test Prep Materials:</strong> Ensure diverse representation in examples, case studies, and practice items. Translate and localize materials for multilingual learners.</div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-yellow text-sm mr-2 mt-1">forum</span>
                      <div className="w-full">
                        <strong>Inclusive Communication and Feedback:</strong> Offer feedback in multiple languages and styles. Use culturally sensitive encouragement strategies to boost learner confidence.
                        <div className="mt-4">
                          <FeedbackScenario />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="material-icons text-brand-orange text-sm mr-2 mt-1">security</span>
                      <div><strong>Data Privacy and Fairness:</strong> Ensure transparent use of learner data. Review algorithms powering recommendations and scoring. Give learners control over personalization settings.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring and Evaluation Section */}
            <div id="monitoring" className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">3. Monitoring and Evaluation (Key Metrics)</h2>
              <div className="grid gap-4 not-prose">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-blue mr-3 mt-1">trending_up</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">Learning Outcomes</strong>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Track score improvements, mastery progress, and skill retention.</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-green mr-3 mt-1">equalizer</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">Equity Gaps</strong>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Record performance and engagement across gender, socioeconomic, linguistic, and disability groups.</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-yellow mr-3 mt-1">sentiment_satisfied</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">User Experience</strong>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Measure satisfaction with tutor interactions, accessibility feature use, and sense of belonging.</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <span className="material-icons text-brand-orange mr-3 mt-1">fact_check</span>
                    <div>
                      <strong className="block text-slate-900 dark:text-white mb-2">Fairness Checks</strong>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Conduct bias audits of matching algorithms and practice test scoring.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="checklist" className="scroll-mt-24">
              <Checklist
                title="Tutoring Platform Equity & Inclusion Checklist"
                items={[
                  "Does the live tutoring feature provide real-time captions or transcripts?",
                  "Are all suggested revision materials accessible (captions, alt text, keyboard navigation)?",
                  "Can the platform interface be tailored to visual preferences?",
                  "Are there alternative ways to interact with the tutor or platform?",
                  "Can revision materials be downloaded for offline access?",
                  "Does the live tutoring work well on low-bandwidth connections (e.g., text-only mode)?",
                  "Is the platform compatible with a broad range of devices and browsers?",
                  "Do tutors and revision materials reflect cultural diversity and sensitivity?",
                  "Are language localization options available for the platform and content?",
                  "Does the personalization algorithm provide content in manageable chunks?",
                  "Are materials scaffolded with clear learning objectives and summaries?",
                  "Do progress indicators provide encouraging feedback to learners?",
                  "Are diverse practice formats available (quizzes, oral, visual, performance tasks)?",
                  "Is AI-driven adaptivity checked for bias to prevent stereotyping?",
                  "Do examples and case studies ensure diverse representation?",
                  "Are materials translated and localized for multilingual learners?",
                  "Is content regularly reviewed for cultural fairness and bias?",
                  "Is feedback offered in multiple languages and culturally sensitive styles?",
                  "Are there safe spaces for peer study groups and community support?",
                  "Is learner data use transparent with clear privacy controls?",
                  "Are algorithms powering recommendations and scoring regularly audited?",
                  "Do learners have control over personalization settings?"
                ]}
              />
            </div>
        </div>
      </div>
      <TutoringMobileNav />
      <FloatingBackButton />
      <FloatingNavButton 
        icon="quiz"
        items={[
          { id: 'introduction', label: 'Introduction' },
          { id: 'accessibility', label: 'Accessibility' },
          { id: 'content-design', label: 'Content Design' },
          { id: 'cognitive-load', label: 'Cognitive Load' },
          { id: 'monitoring', label: 'Monitoring' },
          { id: 'checklist', label: 'Checklist' }
        ]}
        color="brand-yellow"
      />
    </div>
  );
};

export default TutoringPage;