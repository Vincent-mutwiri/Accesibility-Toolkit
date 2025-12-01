import React from 'react';
import { Link } from 'react-router-dom';
import Checklist from '../components/Checklist';
import { AuthChoiceActivity } from '../components/Activities';

const WorkforcePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Toolkit</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">Workforce & Skills</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">Workforce & Skills</h1>
        <p className="text-lg text-subtle-light dark:text-subtle-dark leading-relaxed mb-10">
          Workforce EdTech should expand opportunity, not gatekeep it. This section focuses on embedding equity into workforce learning platforms so they are fair, accessible, and relevant for excluded learners, including informal workers and underrepresented professionals.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">1. Inclusive Access & Onboarding</h2>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li><strong>Multiple paths:</strong> Phone-first (SMS), social logins, email.</li>
                <li><strong>Offline onboarding:</strong> Printable guides or facilitator-led sessions.</li>
                <li><strong>Inclusive profiles:</strong> Allow capturing of informal skills (e.g., caregiving, farming).</li>
              </ul>
              <div className="not-prose">
                <AuthChoiceActivity />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">2. Inclusive Content & Assessment</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Representation:</strong> Examples from multiple sectors (mechanics, tailoring, freelancing).</li>
                <li><strong>Flexible assessment:</strong> Projects, portfolios, and practical tasks, not just quizzes.</li>
                <li><strong>Alternative submissions:</strong> Accept video or audio uploads.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">3. Career Services & Job Matching</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Bias-checked algorithms:</strong> Ensure matching doesn't down-rank based on gender or education gaps.</li>
                <li><strong>CV tools:</strong> Templates that highlight transferable skills from informal experience.</li>
                <li><strong>Employer engagement:</strong> Partner to validate alternative credentials.</li>
              </ul>
            </section>
          </div>

        </div>

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
  );
};

export default WorkforcePage;