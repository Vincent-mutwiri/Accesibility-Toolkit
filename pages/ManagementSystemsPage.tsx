import React from 'react';
import { Link } from 'react-router-dom';
import Checklist from '../components/Checklist';

const ManagementSystemsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Toolkit</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">Management Systems</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">Management Systems</h1>
        <p className="text-lg text-subtle-light dark:text-subtle-dark leading-relaxed mb-10">
          Management Systems represent the backbone of digital learning infrastructure, serving as the central hub where learners, educators, administrators, and content intersect. These include Learning Management Systems (LMS), Student Information Systems (SIS), and Learning Analytics platforms.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">Practical Applications (How To)</h2>
          <p>Ensuring your management systems are developed effectively requires consideration in the following areas:</p>

          <div className="space-y-8 mt-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">1. Inclusive User Interface and Experience Design</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Multi-language Support:</strong> Provide comprehensive multilingual interfaces and right-to-left support.</li>
                <li><strong>Accessibility-First:</strong> WCAG 2.1 AA compliance, multiple input methods, and assistive technology compatibility.</li>
                <li><strong>Culturally Responsive:</strong> Design iconography and themes that are universally understood and culturally respectful.</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">2. Equitable Access and Authentication</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Flexible Authentication:</strong> Multiple methods (phone, email, guest) and offline options.</li>
                <li><strong>Connectivity:</strong> PWA technology for low-bandwidth and offline synchronization.</li>
                <li><strong>Economic Barriers:</strong> Consider freemium models and partnerships for free access points.</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">3. Inclusive Content Management</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>UDL Implementation:</strong> Support multiple means of representation (visual, auditory, tactile).</li>
                <li><strong>Bias-Free Curation:</strong> Establish diverse review panels and bias detection in algorithms.</li>
                <li><strong>Personalization:</strong> Avoid stereotyping in recommendations and allow user control.</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">4. Equitable Assessment and Evaluation</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Formats:</strong> Provide varied assessment types (oral, visual, performance-based).</li>
                <li><strong>Bias Mitigation:</strong> Audit AI tools and provide human review for high-stakes assessments.</li>
                <li><strong>Feedback:</strong> Ensure feedback is culturally appropriate and constructive.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-12 mb-4">Monitoring and Evaluation (Key Metrics)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl">
              <h4 className="font-bold text-text-light dark:text-text-dark mb-2">Access & Participation</h4>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Enrollment/Completion disparities by demographic.</li>
                <li>Device types and connectivity speeds.</li>
                <li>Geographic gaps in access.</li>
              </ul>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl">
              <h4 className="font-bold text-text-light dark:text-text-dark mb-2">Learning Outcomes</h4>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Competency attainment across groups.</li>
                <li>Assessment performance bias analysis.</li>
                <li>Long-term career/educational progression.</li>
              </ul>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl">
              <h4 className="font-bold text-text-light dark:text-text-dark mb-2">User Experience</h4>
              <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Accessibility feature usage rates.</li>
                <li>Satisfaction with cultural responsiveness.</li>
                <li>Sense of belonging surveys.</li>
              </ul>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl">
              <h4 className="font-bold text-text-light dark:text-text-dark mb-2">System Equity</h4>
              <ul className="text-sm list-disc pl-4 space-y-1">
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
    </div>
  );
};

export default ManagementSystemsPage;