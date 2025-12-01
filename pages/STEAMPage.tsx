import React from 'react';
import Checklist from '../components/Checklist';
import { BiasSpottingActivity } from '../components/Activities';
import PageHeader from '../components/PageHeader';

const STEAMPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="STEAM Digital Learning"
        description="STEAM (Science, Technology, Engineering, Arts, and Mathematics) platforms foster creativity and critical thinking. Fairly designed platforms can democratize access to scientific tools and creative technologies that are otherwise out of reach."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'STEAM Platforms' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Design Areas</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8 not-prose">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-purple/50 transition-colors group">
                  <h3 className="font-bold text-brand-purple mb-2 group-hover:text-brand-purple/80">Accessibility Features</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Ensure lab simulations and coding interfaces are compatible with screen readers. Provide color contrast options for data visualizations. Use haptic feedback where possible.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-cyan/50 transition-colors group">
                  <h3 className="font-bold text-brand-cyan mb-2 group-hover:text-brand-cyan/80">Experiential Design</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Scaffold creativity from guided steps to open-ended tasks. Use multimodal content (text, visual, AR/VR). Provide reflection tools for the creative process.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-orange/50 transition-colors group">
                  <h3 className="font-bold text-brand-orange mb-2 group-hover:text-brand-orange/80">Offline Access</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Allow project templates to be downloaded. Offer lightweight or text-based versions of simulations. Ensure functionality on low-cost devices.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-green/50 transition-colors group">
                  <h3 className="font-bold text-brand-green mb-2 group-hover:text-brand-green/80">Cultural Relevance</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Use familiar cultural contexts in challenges. Highlight innovators from diverse backgrounds. Encourage projects addressing local issues.</p>
                </div>
              </div>

              <div className="mt-8 mb-8">
                <BiasSpottingActivity />
              </div>
            </div>

            <Checklist
              title="STEAM Platform Checklist"
              items={[
                "Are creative tools screen-reader and keyboard compatible?",
                "Are visuals accessible for color-blind users?",
                "Are captions/transcripts available for videos?",
                "Can learners download or sync STEAM projects offline?",
                "Are simplified simulations available?",
                "Does the platform run on mobile and low-cost devices?",
                "Are project themes locally meaningful?",
                "Does content represent diverse STEAM innovators?",
                "Are multilingual/localized options available?"
              ]}
            />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-brand-purple font-medium hover:underline">Key Design Areas</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-purple transition-colors">Checklist</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STEAMPage;