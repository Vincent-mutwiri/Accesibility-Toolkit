import React from 'react';
import Checklist from '../components/Checklist';
import { ColorContrastActivity } from '../components/Activities';
import PageHeader from '../components/PageHeader';

const ManagementSystemsPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Management Systems"
        description="Management Systems represent the backbone of digital learning infrastructure, serving as the central hub where learners, educators, administrators, and content intersect. These include Learning Management Systems (LMS), Student Information Systems (SIS), and Learning Analytics platforms."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Management Systems' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Practical Applications (How To)</h2>
              <p className="text-slate-600 dark:text-slate-300">Ensuring your management systems are developed effectively requires consideration in the following areas:</p>

              <div className="space-y-8 mt-8">
                <div className="border-l-4 border-brand-blue pl-6 py-2 bg-brand-blue/5 rounded-r-xl">
                  <h3 className="text-xl font-bold text-brand-blue">1. Inclusive User Interface and Experience Design</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-300">
                    <li><strong>Multi-language Support:</strong> Provide comprehensive multilingual interfaces and right-to-left support.</li>
                    <li><strong>Accessibility-First:</strong> WCAG 2.1 AA compliance, multiple input methods, and assistive technology compatibility.</li>
                    <li><strong>Culturally Responsive:</strong> Design iconography and themes that are universally understood and culturally respectful.</li>
                  </ul>

                  <div className="not-prose mt-6">
                    <ColorContrastActivity />
                  </div>
                </div>

                <div className="border-l-4 border-brand-green pl-6 py-2 bg-brand-green/5 rounded-r-xl">
                  <h3 className="text-xl font-bold text-brand-green">2. Equitable Access and Authentication</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-300">
                    <li><strong>Flexible Authentication:</strong> Multiple methods (phone, email, guest) and offline options.</li>
                    <li><strong>Connectivity:</strong> PWA technology for low-bandwidth and offline synchronization.</li>
                    <li><strong>Economic Barriers:</strong> Consider freemium models and partnerships for free access points.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-brand-yellow pl-6 py-2 bg-brand-yellow/5 rounded-r-xl">
                  <h3 className="text-xl font-bold text-brand-yellow">3. Inclusive Content Management</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-300">
                    <li><strong>UDL Implementation:</strong> Support multiple means of representation (visual, auditory, tactile).</li>
                    <li><strong>Bias-Free Curation:</strong> Establish diverse review panels and bias detection in algorithms.</li>
                    <li><strong>Personalization:</strong> Avoid stereotyping in recommendations and allow user control.</li>
                  </ul>
                </div>

                <div className="border-l-4 border-brand-orange pl-6 py-2 bg-brand-orange/5 rounded-r-xl">
                  <h3 className="text-xl font-bold text-brand-orange">4. Equitable Assessment and Evaluation</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-300">
                    <li><strong>Formats:</strong> Provide varied assessment types (oral, visual, performance-based).</li>
                    <li><strong>Bias Mitigation:</strong> Audit AI tools and provide human review for high-stakes assessments.</li>
                    <li><strong>Feedback:</strong> Ensure feedback is culturally appropriate and constructive.</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Monitoring and Evaluation (Key Metrics)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h4 className="font-bold text-brand-blue mb-2">Access & Participation</h4>
                  <ul className="text-sm list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    <li>Enrollment/Completion disparities by demographic.</li>
                    <li>Device types and connectivity speeds.</li>
                    <li>Geographic gaps in access.</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h4 className="font-bold text-brand-green mb-2">Learning Outcomes</h4>
                  <ul className="text-sm list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    <li>Competency attainment across groups.</li>
                    <li>Assessment performance bias analysis.</li>
                    <li>Long-term career/educational progression.</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h4 className="font-bold text-brand-yellow mb-2">User Experience</h4>
                  <ul className="text-sm list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    <li>Accessibility feature usage rates.</li>
                    <li>Satisfaction with cultural responsiveness.</li>
                    <li>Sense of belonging surveys.</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h4 className="font-bold text-brand-orange mb-2">System Equity</h4>
                  <ul className="text-sm list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                    <li>Algorithmic fairness audits.</li>
                    <li>Support resolution rates by demographic.</li>
                  </ul>
                </div>
              </div>
            </div>

            <Checklist
              title="Equitable Management Systems Checklist"
              items={[
                "Conduct comprehensive stakeholder analysis including historically marginalized communities",
                "Establish diverse advisory board with community representatives",
                "Complete accessibility requirements analysis and compliance planning (WCAG 2.1 AA)",
                "Develop multilingual and multicultural content strategy",
                "Design flexible authentication systems accommodating various access levels",
                "Implement culturally responsive visual design and iconography",
                "Optimize for low-bandwidth and mobile-first environments (PWA)",
                "Provide offline synchronization and downloadable content options",
                "Create multiple input methods (keyboard, voice, touch)",
                "Develop multilingual customer support with cultural competency training",
                "Establish clear reporting mechanisms for bias, harassment, and accessibility issues",
                "Conduct usability testing with diverse user groups across all demographic categories",
                "Perform bias audits of all algorithmic systems and recommendation engines"
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

export default ManagementSystemsPage;