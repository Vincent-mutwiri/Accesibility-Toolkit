import React, { useState } from 'react';

const TutoringMobileNav: React.FC = () => {
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
    { label: 'Essential Features', href: '#essential-features' },
    { label: 'Accessibility', href: '#accessibility' },
    { label: 'Content Design', href: '#content-design' },
    { label: 'Cognitive Load', href: '#cognitive-load' },
    { label: 'Monitoring', href: '#monitoring' },
    { label: 'Checklist', href: '#checklist' }
  ];

  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-green text-white p-3 rounded-full shadow-lg hover:bg-brand-green/90 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <span className="material-icons text-lg">
          {isOpen ? 'close' : 'school'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 w-48 max-h-80 overflow-y-auto">
          <div className="p-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-2 py-1 border-b border-slate-200 dark:border-slate-700 mb-2">
              Tutoring & Test Prep
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

export default TutoringMobileNav;