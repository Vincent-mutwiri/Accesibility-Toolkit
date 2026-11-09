import React, { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface FloatingNavButtonProps {
  icon: string;
  items: NavItem[];
}

const FloatingNavButton: React.FC<FloatingNavButtonProps> = ({ icon, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: document.documentElement.classList.contains('reduced-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-brand-ink hover:bg-brand-ink/80 text-white p-4 rounded-full shadow-lg transition-all"
        aria-label="Toggle page contents"
        aria-expanded={isOpen}
        aria-controls="page-contents"
      >
        <span className="material-icons text-2xl">
          {isOpen ? 'close' : icon}
        </span>
      </button>

      {isOpen && (
        <div id="page-contents" className="fixed bottom-20 right-4 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 w-64 max-h-96 overflow-y-auto">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Quick Navigation</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left text-sm text-slate-600 dark:text-slate-400 hover:text-secondary dark:hover:text-secondary transition-colors py-1"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FloatingNavButton;
