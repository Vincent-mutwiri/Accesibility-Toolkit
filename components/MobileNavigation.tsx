import React, { useState } from 'react';

interface NavigationItem {
  label: string;
  href: string;
}

interface MobileNavigationProps {
  items: NavigationItem[];
  currentSection?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ items, currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-blue text-white p-3 rounded-full shadow-lg hover:bg-brand-blue/90 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <span className="material-icons">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 min-w-[200px] max-h-[60vh] overflow-y-auto">
          <div className="p-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white px-3 py-2 border-b border-slate-200 dark:border-slate-700">
              Quick Navigation
            </h3>
            <ul className="py-2">
              {items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                      currentSection === item.href.substring(1) 
                        ? 'text-brand-blue font-medium' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.label}
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

export default MobileNavigation;