import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300">
        <div className="p-8 md:p-12 space-y-10">
          
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark tracking-tight">
              Accessibility Toolkit
            </h1>
            <p className="text-lg text-subtle-light dark:text-subtle-dark max-w-2xl mx-auto leading-relaxed">
              An essential guide to creating inclusive and accessible digital experiences for everyone.
            </p>
          </div>

          <div className="space-y-8">
            {/* Description */}
            <section className="border-t border-border-light dark:border-border-dark pt-8">
              <h2 className="text-2xl font-semibold mb-3 text-text-light dark:text-text-dark">Description</h2>
              <p className="text-subtle-light dark:text-subtle-dark leading-relaxed">
                This toolkit provides a comprehensive set of guidelines, best practices, and resources to help designers, developers, and content creators build accessible products. It covers fundamental principles and practical techniques to ensure usability for people with diverse abilities.
              </p>
            </section>

            {/* Goal */}
            <section className="border-t border-border-light dark:border-border-dark pt-8">
              <h2 className="text-2xl font-semibold mb-3 text-text-light dark:text-text-dark">Goal</h2>
              <p className="text-subtle-light dark:text-subtle-dark leading-relaxed">
                Our primary goal is to empower teams to integrate accessibility into their workflow from the outset. We aim to foster a culture of inclusive design, leading to more equitable and user-friendly digital products that serve a wider audience effectively.
              </p>
            </section>

            {/* Definition */}
            <section className="border-t border-border-light dark:border-border-dark pt-8">
              <h2 className="text-2xl font-semibold mb-3 text-text-light dark:text-text-dark">Definition of Inclusivity, Equity & Inclusion</h2>
              <p className="text-subtle-light dark:text-subtle-dark leading-relaxed">
                This section delves into the core concepts of inclusivity, equity, and inclusion within the context of digital design. It clarifies their distinctions and interconnectedness, providing a foundational understanding for building truly accessible and welcoming experiences.
              </p>
            </section>
          </div>

          {/* Navigation Cards */}
          <section className="border-t border-border-light dark:border-border-dark pt-8 text-center">
            <h2 className="text-2xl font-semibold mb-8 text-text-light dark:text-text-dark">Sections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link 
                to="/lms" 
                className="group flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span className="material-icons mr-2 group-hover:scale-110 transition-transform">school</span>
                LMS
              </Link>
              
              <button 
                className="group flex items-center justify-center px-6 py-4 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark bg-background-light dark:bg-card-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all shadow-sm hover:shadow-md cursor-not-allowed opacity-60"
                title="Coming Soon"
                disabled
              >
                <span className="material-icons mr-2">science</span>
                STEAM
              </button>
              
              <button 
                className="group flex items-center justify-center px-6 py-4 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark bg-background-light dark:bg-card-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all shadow-sm hover:shadow-md cursor-not-allowed opacity-60"
                title="Coming Soon"
                disabled
              >
                <span className="material-icons mr-2">cast_for_education</span>
                Online Learning
              </button>
            </div>
          </section>

          {/* Conclusion */}
          <section className="border-t border-border-light dark:border-border-dark pt-8">
            <h2 className="text-2xl font-semibold mb-3 text-text-light dark:text-text-dark">Conclusion</h2>
            <p className="text-subtle-light dark:text-subtle-dark leading-relaxed">
              By embracing the principles and practices outlined in this toolkit, we can collectively work towards a more accessible digital world. Continuous learning and application are key to making a lasting impact on digital inclusion.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;