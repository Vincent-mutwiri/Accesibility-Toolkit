import React, { useState } from 'react';

const OnlineLearningMobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const sections = [
    { label: 'Introduction', href: '#introduction' },
    { label: 'Accessible Design', href: '#accessible-design' },
    { label: 'Flexible Learning', href: '#flexible-learning' },
    { label: 'Cultural Content', href: '#cultural-content' },
    { label: 'Equitable Access', href: '#equitable-access' },
    { label: 'Inclusive Interaction', href: '#inclusive-interaction' },
    { label: 'Feedback Support', href: '#feedback-support' },
    { label: 'Monitoring', href: '#monitoring' },
    { label: 'Checklist', href: '#checklist' }
  ];

  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-blue text-white p-3 rounded-full shadow-lg hover:bg-brand-blue/90 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <span className="material-icons text-lg">
          {isOpen ? 'close' : 'computer'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 w-52 max-h-96 overflow-y-auto">
          <div className="p-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-2 py-1 border-b border-slate-200 dark:border-slate-700 mb-2">
              Online Learning
            </h3>
            <ul className="space-y-1">
              {sections.map((section, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(section.href)}
                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors text-slate-600 dark:text-slate-400"
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineLearningMobileNav;