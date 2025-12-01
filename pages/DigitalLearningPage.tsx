import React from 'react';
import Checklist from '../components/Checklist';
import { UDLPreviewActivity } from '../components/Activities';
import PageHeader from '../components/PageHeader';

const DigitalLearningPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Digital Learning Content"
        description="Digital content includes text-based resources, multimedia, visuals, and interactive elements. Inclusive digital content is Accessible, Representative, Usable, and Flexible."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Digital Learning Content' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Core Principles</h2>

              <div className="grid gap-6 not-prose">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-blue/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-blue mb-3">1. Accessibility</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200 font-medium">Usable by people with diverse abilities.</p>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Add alt text to all images and charts.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Provide captions/transcripts for video/audio.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Ensure minimum color contrast (4.5:1).</li>
                    <li className="flex items-start"><span className="material-icons text-brand-blue text-sm mr-2 mt-1">check</span>Ensure files are properly tagged (PDFs, HTML).</li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-green/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-green mb-3">2. Representation</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200 font-medium">Reflects diverse voices, stories, and perspectives.</p>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Use inclusive imagery (gender, ethnicity, age, ability).</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Apply bias-free language.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-green text-sm mr-2 mt-1">check</span>Integrate case studies from multiple global contexts.</li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-yellow/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-yellow mb-3">3. Usability & Navigation</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200 font-medium">Intuitive and consistent experience across devices.</p>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Logical headings and structure.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Mobile-first design optimization.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-yellow text-sm mr-2 mt-1">check</span>Plain language to aid understanding.</li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-orange/50 transition-colors">
                  <h3 className="text-xl font-bold text-brand-orange mb-3">4. Flexibility</h3>
                  <p className="mb-4 text-slate-700 dark:text-slate-200 font-medium">Multiple ways to access and interact.</p>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Offer content in Text, Audio, and Video formats.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Provide offline/downloadable options.</li>
                    <li className="flex items-start"><span className="material-icons text-brand-orange text-sm mr-2 mt-1">check</span>Allow self-pacing (pause, replay, skip).</li>
                  </ul>
                  <div className="mt-4">
                    <UDLPreviewActivity />
                  </div>
                </div>
              </div>
            </div>

            <Checklist
              title="Digital Content Checklist"
              items={[
                "All images, icons, graphs include meaningful alt text",
                "Decorative images marked as decorative",
                "Videos include closed captions and transcripts",
                "Audio files include transcripts",
                "Interactive elements are keyboard-accessible",
                "Text/background colors meet WCAG contrast (4.5:1)",
                "Headings follow logical hierarchy (H1 -> H2)",
                "Images reflect diversity in gender, race, age, ability",
                "Content avoids stereotypes and tokenism",
                "Content loads quickly (optimized images)",
                "Low-bandwidth versions available (text-only/PDF)",
                "Content available in multiple formats (Text, Audio, Video)"
              ]}
            />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-brand-blue font-medium hover:underline">Core Principles</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-blue transition-colors">Checklist</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalLearningPage;