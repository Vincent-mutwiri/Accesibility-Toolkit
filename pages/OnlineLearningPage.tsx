import React from 'react';
import Checklist from '../components/Checklist';
import { MultilingualToggleActivity } from '../components/Activities';
import PageHeader from '../components/PageHeader';

const OnlineLearningPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Online Learning"
        description="Online learning refers to educational experiences delivered primarily through digital platforms and internet-based tools. It enables learners to access courses, resources, and engage in interactions with educators and peers, regardless of geography or time."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Online Learning' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Practical Applications</h2>

              <div className="grid gap-6 not-prose">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-blue/50 transition-colors group">
                  <h3 className="text-xl font-bold text-brand-blue mb-3 group-hover:text-brand-blue/80">Accessible Design</h3>
                  <p className="text-slate-600 dark:text-slate-300">Strive for WCAG 2.1 AAA compliance. Use clear fonts, high-contrast colors, and descriptive alt text. Provide transcripts and captions for all media.</p>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-green/50 transition-colors group">
                  <h3 className="text-xl font-bold text-brand-green mb-3 group-hover:text-brand-green/80">Flexible Learning Pathways</h3>
                  <p className="text-slate-600 dark:text-slate-300">Align with UDL principles. Offer content in multiple formats (text, audio, video) and allow self-paced progression to reduce barriers for diverse learners.</p>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-yellow/50 transition-colors group">
                  <h3 className="text-xl font-bold text-brand-yellow mb-3 group-hover:text-brand-yellow/80">Culturally Responsive Content</h3>
                  <p className="text-slate-600 dark:text-slate-300">Use diverse examples and avoid stereotypes. Embed cultural responsiveness to create a sense of belonging, which is critical for sustained participation.</p>

                  <div className="mt-4">
                    <MultilingualToggleActivity />
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-orange/50 transition-colors group">
                  <h3 className="text-xl font-bold text-brand-orange mb-3 group-hover:text-brand-orange/80">Equitable Access</h3>
                  <p className="text-slate-600 dark:text-slate-300">Optimize for low-bandwidth and mobile use. Ensure core features are usable on low-cost devices to close the digital divide.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Key Metrics for M&E</h2>
              <ul className="space-y-4 not-prose">
                <li className="flex items-start">
                  <span className="material-icons text-brand-blue mr-3 mt-1">analytics</span>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Access</strong>
                    <span className="text-slate-600 dark:text-slate-400">% of learners logging in without technical barriers; Device/connectivity types.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-brand-green mr-3 mt-1">groups</span>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Participation</strong>
                    <span className="text-slate-600 dark:text-slate-400">Contribution rates in forums; Balance across demographic groups.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-brand-yellow mr-3 mt-1">school</span>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Outcomes</strong>
                    <span className="text-slate-600 dark:text-slate-400">Completion rates and performance disaggregated by demographics.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-brand-orange mr-3 mt-1">sentiment_satisfied</span>
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Inclusion</strong>
                    <span className="text-slate-600 dark:text-slate-400">Survey results on feeling respected/represented; Quality of peer interaction.</span>
                  </div>
                </li>
              </ul>
            </div>

            <Checklist
              title="Online Learning Equity Checklist"
              items={[
                "Conduct needs assessment to identify barriers (access, language, disability)",
                "Gather input from diverse learners and community representatives",
                "Apply accessibility standards (WCAG 2.1 AA minimum)",
                "Ensure interface works across devices (low-end smartphones, tablets)",
                "Incorporate multilingual navigation and right-to-left text support",
                "Design culturally responsive visuals, icons, and representations",
                "Optimize platform for low-bandwidth environments and offline access",
                "Ensure compatibility with assistive technologies (screen readers)",
                "Create multiple support channels (chat, email, forums)",
                "Track enrollment diversity across gender, age, disability groups",
                "Regularly audit algorithmic bias in content recommendations"
              ]}
            />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-brand-blue font-medium hover:underline">Practical Applications</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Key Metrics</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Checklist</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineLearningPage;