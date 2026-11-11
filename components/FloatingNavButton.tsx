import React, { useState, useEffect, useId, useRef } from 'react';
import { focusSection } from '../accessibility/navigation';

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
  const panelId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(function dismissDisclosure() {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    focusSection(document.getElementById(id));
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={trigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-brand-ink hover:bg-brand-ink/80 text-white p-4 rounded-full shadow-lg transition-all"
        aria-label="Toggle page contents"
      >
        <span aria-hidden="true" className="material-icons text-2xl">
          {isOpen ? 'close' : icon}
        </span>
      </button>

      {isOpen && (
        <div id={panelId} className="fixed bottom-20 right-4 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 w-64 max-h-96 overflow-y-auto">
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
