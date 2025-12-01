import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-subtle-light dark:text-subtle-dark mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-icons-outlined text-base mx-2">chevron_right</span>
        <span className="text-text-light dark:text-text-dark font-semibold">About</span>
      </nav>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">About the Toolkit</h1>
        <p className="text-lg text-subtle-light dark:text-subtle-dark leading-relaxed mb-8">
          The Equity and Inclusion Toolkit was developed to address the growing need for practical guidance in designing inclusive educational technology.
        </p>
        <div className="prose prose-lg dark:prose-invert max-w-none text-subtle-light dark:text-subtle-dark">
          <p>
            This living document and interactive tool serves learning engineers, instructional designers, and product developers. Our mission is to ensure that no learner is left behind due to the design choices made in digital products.
          </p>
          <h3>Our Vision</h3>
          <p>
            A world where digital learning is inherently accessible, culturally responsive, and equitable for all learners regardless of their background, ability, or location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;