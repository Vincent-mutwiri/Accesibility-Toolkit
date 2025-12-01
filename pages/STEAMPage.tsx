import React from 'react';
import { Link } from 'react-router-dom';
import Checklist from '../components/Checklist';
import { BiasSpottingActivity } from '../components/Activities';

const STEAMPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Toolkit</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">STEAM Platforms</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">STEAM Digital Learning</h1>
        <p className="text-lg text-subtle-light dark:text-subtle-dark leading-relaxed mb-10">
          STEAM (Science, Technology, Engineering, Arts, and Mathematics) platforms foster creativity and critical thinking. Fairly designed platforms can democratize access to scientific tools and creative technologies that are otherwise out of reach.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-8 mb-4">Key Design Areas</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg">
              <h3 className="font-bold text-primary mb-2">Accessibility Features</h3>
              <p className="text-sm">Ensure lab simulations and coding interfaces are compatible with screen readers. Provide color contrast options for data visualizations. Use haptic feedback where possible.</p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg">
              <h3 className="font-bold text-primary mb-2">Experiential Design</h3>
              <p className="text-sm">Scaffold creativity from guided steps to open-ended tasks. Use multimodal content (text, visual, AR/VR). Provide reflection tools for the creative process.</p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg">
              <h3 className="font-bold text-primary mb-2">Offline Access</h3>
              <p className="text-sm">Allow project templates to be downloaded. Offer lightweight or text-based versions of simulations. Ensure functionality on low-cost devices.</p>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg">
              <h3 className="font-bold text-primary mb-2">Cultural Relevance</h3>
              <p className="text-sm">Use familiar cultural contexts in challenges. Highlight innovators from diverse backgrounds. Encourage projects addressing local issues.</p>
            </div>
          </div>
          
          <div className="not-prose mt-8 mb-8">
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
    </div>
  );
};

export default STEAMPage;