import React, { useState } from 'react';

const STEAMMobileNav: React.FC = () => {
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
    { label: 'Key Design Areas', href: '#key-design-areas' },
    { label: 'Accessibility', href: '#accessibility' },
    { label: 'Interactive Content', href: '#interactive-content' },
    { label: 'Cognitive Load', href: '#cognitive-load' },
    { label: 'Offline Access', href: '#offline-access' },
    { label: 'Cultural Relevance', href: '#cultural-relevance' },
    { label: 'Monitoring', href: '#monitoring' },
    { label: 'Checklist', href: '#checklist' }
  ];

  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-purple text-white p-3 rounded-full shadow-lg hover:bg-brand-purple/90 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <span className="material-icons text-lg">
          {isOpen ? 'close' : 'science'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 w-52 max-h-96 overflow-y-auto">
          <div className="p-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-2 py-1 border-b border-slate-200 dark:border-slate-700 mb-2">
              STEAM Platforms
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

export default STEAMMobileNav;