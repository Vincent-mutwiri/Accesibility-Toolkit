import React, { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface FloatingNavButtonProps {
  icon: string;
  items: NavItem[];
  color?: string;
}

const FloatingNavButton: React.FC<FloatingNavButtonProps> = ({ icon, items, color = 'brand-blue' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const colorClasses: Record<string, string> = {
    'brand-blue': 'bg-brand-blue hover:bg-brand-blue/90',
    'brand-green': 'bg-brand-green hover:bg-brand-green/90',
    'brand-yellow': 'bg-brand-yellow hover:bg-brand-yellow/90',
    'brand-purple': 'bg-brand-purple hover:bg-brand-purple/90',
    'brand-red': 'bg-brand-red hover:bg-brand-red/90',
    'brand-cyan': 'bg-brand-cyan hover:bg-brand-cyan/90',
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 z-50 ${colorClasses[color]} text-white p-4 rounded-full shadow-lg transition-all`}
        aria-label="Toggle navigation menu"
      >
        <span className="material-icons text-2xl">
          {isOpen ? 'close' : icon}
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 w-64 max-h-96 overflow-y-auto">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Quick Navigation</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left text-sm text-slate-600 dark:text-slate-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors py-1"
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
