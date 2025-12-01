import React from 'react';
import Checklist from '../components/Checklist';
import PageHeader from '../components/PageHeader';

const TutoringPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Tutoring & Test Prep"
        description="Tutoring and test-preparation platforms offer personalized academic support and preparation for exams. From an equity perspective, they hold influence over who gains access to quality support."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Tutoring & Test Prep' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <p className="lead text-xl text-slate-700 dark:text-slate-200">
                Designed fairly, tutoring platforms broaden pathways; poorly designed, they reinforce barriers.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-8">Essential Features for Equity</h2>

              <div className="grid gap-6 not-prose">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                    <span className="material-icons mr-2">accessibility_new</span>
                    Accessibility Features
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">Implement WCAG 2.1 AA. Provide real-time captioning for live tutoring. Ensure full keyboard navigation and voice input options.</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                    <span className="material-icons mr-2">psychology</span>
                    Cognitive Load Management
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">Personalization engines should provide content in manageable chunks. Materials should be scaffolded, gradually increasing in complexity.</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                    <span className="material-icons mr-2">wifi_off</span>
                    Offline & Low Bandwidth
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">Allow downloading of revision materials. Offer text-only modes for live sessions if video connectivity is poor.</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                    <span className="material-icons mr-2">public</span>
                    Cultural Relevance
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">Ensure revision materials and examples are culturally relevant. Offer language localization for interfaces.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Monitoring and Evaluation</h2>
              <ul className="space-y-4 not-prose">
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mr-3 mt-1">check_circle</span>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Learning Outcomes</strong>
                    <span className="text-slate-600 dark:text-slate-400">Track score improvements and skill retention.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mr-3 mt-1">check_circle</span>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Equity Gaps</strong>
                    <span className="text-slate-600 dark:text-slate-400">Record performance across gender, socioeconomic, and disability groups.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-green-500 mr-3 mt-1">check_circle</span>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Fairness Checks</strong>
                    <span className="text-slate-600 dark:text-slate-400">Conduct bias audits of matching algorithms and practice scoring.</span>
                  </div>
                </li>
              </ul>
            </div>

            <Checklist
              title="Tutoring Platform Checklist"
              items={[
                "Does live tutoring provide real-time captions or transcripts?",
                "Are all revision materials accessible (alt text, keyboard nav)?",
                "Can the platform interface be tailored to visual preferences?",
                "Are there alternative ways to interact with the tutor?",
                "Can materials be downloaded for offline access?",
                "Does live tutoring work on low-bandwidth (text-only mode)?",
                "Is the platform compatible with broad range of devices?",
                "Do tutors/materials reflect cultural diversity?",
                "Are language localization options available?"
              ]}
            />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-primary font-medium hover:underline">Essential Features</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Monitoring & Evaluation</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">Checklist</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringPage;