import React from 'react';
import { Link } from 'react-router-dom';
import Checklist from '../components/Checklist';

const DigitalLearningPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Toolkit</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">Digital Learning Content</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">Digital Learning Content</h1>
        <p className="text-lg text-subtle-light dark:text-subtle-dark leading-relaxed mb-10">
          Digital content includes text-based resources, multimedia, visuals, and interactive elements. Inclusive digital content is Accessible, Representative, Usable, and Flexible.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
          
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">Core Principles</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-primary">1. Accessibility</h3>
              <p className="mb-2">Usable by people with diverse abilities.</p>
              <ul className="list-disc pl-5 text-sm">
                <li>Add alt text to all images and charts.</li>
                <li>Provide captions/transcripts for video/audio.</li>
                <li>Ensure minimum color contrast (4.5:1).</li>
                <li>Ensure files are properly tagged (PDFs, HTML).</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary">2. Representation</h3>
              <p className="mb-2">Reflects diverse voices, stories, and perspectives.</p>
              <ul className="list-disc pl-5 text-sm">
                <li>Use inclusive imagery (gender, ethnicity, age, ability).</li>
                <li>Apply bias-free language.</li>
                <li>Integrate case studies from multiple global contexts.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary">3. Usability & Navigation</h3>
              <p className="mb-2">Intuitive and consistent experience across devices.</p>
              <ul className="list-disc pl-5 text-sm">
                <li>Logical headings and structure.</li>
                <li>Mobile-first design optimization.</li>
                <li>Plain language to aid understanding.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary">4. Flexibility</h3>
              <p className="mb-2">Multiple ways to access and interact.</p>
              <ul className="list-disc pl-5 text-sm">
                <li>Offer content in Text, Audio, and Video formats.</li>
                <li>Provide offline/downloadable options.</li>
                <li>Allow self-pacing (pause, replay, skip).</li>
              </ul>
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
    </div>
  );
};

export default DigitalLearningPage;