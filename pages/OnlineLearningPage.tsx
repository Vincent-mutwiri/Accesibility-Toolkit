import React from 'react';
import { Link } from 'react-router-dom';
import Checklist from '../components/Checklist';

const OnlineLearningPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Toolkit</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">Online Learning</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">Online Learning</h1>
        <p className="text-lg text-subtle-light dark:text-subtle-dark leading-relaxed mb-10">
          Online learning refers to educational experiences delivered primarily through digital platforms and internet-based tools. It enables learners to access courses, resources, and engage in interactions with educators and peers, regardless of geography or time.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">Practical Applications</h2>
          
          <div className="grid gap-6">
            <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl">
              <h3 className="text-xl font-bold text-primary mb-3">Accessible Design</h3>
              <p>Strive for WCAG 2.1 AAA compliance. Use clear fonts, high-contrast colors, and descriptive alt text. Provide transcripts and captions for all media.</p>
            </div>
            
            <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl">
              <h3 className="text-xl font-bold text-primary mb-3">Flexible Learning Pathways</h3>
              <p>Align with UDL principles. Offer content in multiple formats (text, audio, video) and allow self-paced progression to reduce barriers for diverse learners.</p>
            </div>

            <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl">
              <h3 className="text-xl font-bold text-primary mb-3">Culturally Responsive Content</h3>
              <p>Use diverse examples and avoid stereotypes. Embed cultural responsiveness to create a sense of belonging, which is critical for sustained participation.</p>
            </div>

            <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl">
              <h3 className="text-xl font-bold text-primary mb-3">Equitable Access</h3>
              <p>Optimize for low-bandwidth and mobile use. Ensure core features are usable on low-cost devices to close the digital divide.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-12 mb-4">Key Metrics for M&E</h2>
          <ul className="space-y-4">
            <li><strong>Access:</strong> % of learners logging in without technical barriers; Device/connectivity types.</li>
            <li><strong>Participation:</strong> Contribution rates in forums; Balance across demographic groups.</li>
            <li><strong>Outcomes:</strong> Completion rates and performance disaggregated by demographics.</li>
            <li><strong>Inclusion:</strong> Survey results on feeling respected/represented; Quality of peer interaction.</li>
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
    </div>
  );
};

export default OnlineLearningPage;