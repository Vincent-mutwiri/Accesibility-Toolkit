import React from 'react';
import Checklist from '../components/Checklist';
import { AuthChoiceActivity } from '../components/Activities';
import PageHeader from '../components/PageHeader';

const WorkforcePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Workforce & Skills"
        description="Workforce EdTech should expand opportunity, not gatekeep it. This section focuses on embedding equity into workforce learning platforms so they are fair, accessible, and relevant for excluded learners, including informal workers and underrepresented professionals."
        breadcrumbs={[
          { label: 'Toolkit', to: '/' },
          { label: 'Workforce & Skills' }
        ]}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">

              <div className="space-y-8">
                <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-red/50 transition-colors">
                  <h2 className="text-2xl font-bold text-brand-red mb-4">1. Inclusive Access & Onboarding</h2>
                  <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-600 dark:text-slate-300">
                    <li><strong>Multiple paths:</strong> Phone-first (SMS), social logins, email.</li>
                    <li><strong>Offline onboarding:</strong> Printable guides or facilitator-led sessions.</li>
                    <li><strong>Inclusive profiles:</strong> Allow capturing of informal skills (e.g., caregiving, farming).</li>
                  </ul>
                  <div className="not-prose">
                    <AuthChoiceActivity />
                  </div>
                </section>

                <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-orange/50 transition-colors">
                  <h2 className="text-2xl font-bold text-brand-orange mb-4">2. Inclusive Content & Assessment</h2>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                    <li><strong>Representation:</strong> Examples from multiple sectors (mechanics, tailoring, freelancing).</li>
                    <li><strong>Flexible assessment:</strong> Projects, portfolios, and practical tasks, not just quizzes.</li>
                    <li><strong>Alternative submissions:</strong> Accept video or audio uploads.</li>
                  </ul>
                </section>

                <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-yellow/50 transition-colors">
                  <h2 className="text-2xl font-bold text-brand-yellow mb-4">3. Career Services & Job Matching</h2>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                    <li><strong>Bias-checked algorithms:</strong> Ensure matching doesn't down-rank based on gender or education gaps.</li>
                    <li><strong>CV tools:</strong> Templates that highlight transferable skills from informal experience.</li>
                    <li><strong>Employer engagement:</strong> Partner to validate alternative credentials.</li>
                  </ul>
                </section>
              </div>

            </div>

            <div className="mt-12">
              <Checklist
                title="Workforce & Skills Checklist"
                items={[
                  "Sign-up works on low-bandwidth and basic phones",
                  "Profiles capture informal & non-traditional skills",
                  "Onboarding materials in text, audio, video, captions",
                  "Content examples reflect diverse local economies",
                  "Multiple assessment types (projects, practical demos)",
                  "Certifications recognized by employers",
                  "Job matching algorithms audited for bias",
                  "CV-building tools allow informal work experience",
                  "Mentors represent diverse backgrounds",
                  "Safe, moderated community spaces available"
                ]}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-brand-red font-medium hover:underline">Inclusive Access</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Content & Assessment</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Career Services</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-brand-red transition-colors">Checklist</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkforcePage;