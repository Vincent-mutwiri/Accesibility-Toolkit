import React from 'react';
import { Link } from 'react-router-dom';
import Checklist from '../components/Checklist';

const TutoringPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Toolkit</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">Tutoring & Test Prep</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">Tutoring & Test Prep</h1>
        <p className="text-lg text-subtle-light dark:text-subtle-dark leading-relaxed mb-10">
          Tutoring and test-preparation platforms offer personalized academic support and preparation for exams. From an equity perspective, they hold influence over who gains access to quality support. Designed fairly, they broaden pathways; poorly designed, they reinforce barriers.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">Essential Features for Equity</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Accessibility Features</h3>
              <p className="mt-2">Implement WCAG 2.1 AA. Provide real-time captioning for live tutoring. Ensure full keyboard navigation and voice input options.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Cognitive Load Management</h3>
              <p className="mt-2">Personalization engines should provide content in manageable chunks. Materials should be scaffolded, gradually increasing in complexity.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Offline & Low Bandwidth</h3>
              <p className="mt-2">Allow downloading of revision materials. Offer text-only modes for live sessions if video connectivity is poor.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Cultural Relevance</h3>
              <p className="mt-2">Ensure revision materials and examples are culturally relevant. Offer language localization for interfaces.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">Monitoring and Evaluation</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Learning Outcomes:</strong> Track score improvements and skill retention.</li>
            <li><strong>Equity Gaps:</strong> Record performance across gender, socioeconomic, and disability groups.</li>
            <li><strong>Fairness Checks:</strong> Conduct bias audits of matching algorithms and practice scoring.</li>
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
    </div>
  );
};

export default TutoringPage;