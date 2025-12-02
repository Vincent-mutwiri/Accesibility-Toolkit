import React, { useState, useEffect } from 'react';
import FloatingBackButton from '../components/FloatingBackButton';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'extra-large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  useEffect(() => {
    // Load saved settings
    // Load saved settings
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    const savedFontSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large' | 'extra-large' || 'medium';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';
    const savedScreenReader = localStorage.getItem('screenReader') === 'true';

    setTheme(initialTheme);
    setFontSize(savedFontSize);
    setHighContrast(savedHighContrast);
    setReducedMotion(savedReducedMotion);
    setScreenReader(savedScreenReader);

    // Apply theme
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    // Apply font size
    document.documentElement.setAttribute('data-font-size', savedFontSize);

    // Apply accessibility settings
    document.documentElement.classList.toggle('high-contrast', savedHighContrast);
    document.documentElement.classList.toggle('reduced-motion', savedReducedMotion);
    document.documentElement.classList.toggle('screen-reader-optimized', savedScreenReader);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleFontSizeChange = (newSize: 'small' | 'medium' | 'large' | 'extra-large') => {
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize);
    document.documentElement.setAttribute('data-font-size', newSize);
  };

  const handleHighContrastChange = (enabled: boolean) => {
    setHighContrast(enabled);
    localStorage.setItem('highContrast', enabled.toString());
    document.documentElement.classList.toggle('high-contrast', enabled);
  };

  const handleReducedMotionChange = (enabled: boolean) => {
    setReducedMotion(enabled);
    localStorage.setItem('reducedMotion', enabled.toString());
    document.documentElement.classList.toggle('reduced-motion', enabled);
  };

  const handleScreenReaderChange = (enabled: boolean) => {
    setScreenReader(enabled);
    localStorage.setItem('screenReader', enabled.toString());
    document.documentElement.classList.toggle('screen-reader-optimized', enabled);
  };

  const resetSettings = () => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = systemPrefersDark ? 'dark' : 'light';

    setTheme(defaultTheme);
    setFontSize('medium');
    setHighContrast(false);
    setReducedMotion(false);
    setScreenReader(false);

    localStorage.removeItem('theme');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('reducedMotion');
    localStorage.removeItem('screenReader');

    document.documentElement.classList.remove('high-contrast', 'reduced-motion', 'screen-reader-optimized');
    document.documentElement.classList.toggle('dark', defaultTheme === 'dark');
    document.documentElement.setAttribute('data-font-size', 'medium');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            <span className="material-icons text-brand-blue text-4xl mr-3 align-middle">settings</span>
            Accessibility Settings
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Customize your experience with accessibility options and preferences.
          </p>
        </div>

        <div className="space-y-8">
          {/* Theme Settings */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="material-icons text-brand-blue mr-2">palette</span>
              Theme
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Choose between light and dark mode for better visibility.</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${theme === 'light'
                  ? 'border-brand-blue bg-brand-blue text-white'
                  : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-brand-blue'
                  }`}
                aria-pressed={theme === 'light'}
              >
                <span className="material-icons mr-2">light_mode</span>
                Light Mode
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${theme === 'dark'
                  ? 'border-brand-blue bg-brand-blue text-white'
                  : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-brand-blue'
                  }`}
                aria-pressed={theme === 'dark'}
              >
                <span className="material-icons mr-2">dark_mode</span>
                Dark Mode
              </button>
            </div>
          </div>

          {/* Font Size Settings */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="material-icons text-brand-green mr-2">text_fields</span>
              Font Size
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Adjust text size for better readability.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'small', label: 'Small', size: 'text-sm' },
                { value: 'medium', label: 'Medium', size: 'text-base' },
                { value: 'large', label: 'Large', size: 'text-lg' },
                { value: 'extra-large', label: 'Extra Large', size: 'text-xl' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFontSizeChange(option.value as any)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${option.size} ${fontSize === option.value
                    ? 'border-brand-green bg-brand-green text-white'
                    : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-brand-green'
                    }`}
                  aria-pressed={fontSize === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Options */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="material-icons text-brand-orange mr-2">accessibility</span>
              Accessibility Options
            </h2>
            <div className="space-y-6">
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">High Contrast</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Increase contrast for better visibility</p>
                </div>
                <button
                  onClick={() => handleHighContrastChange(!highContrast)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${highContrast ? 'bg-brand-orange' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  role="switch"
                  aria-checked={highContrast}
                  aria-label="Toggle high contrast"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Reduced Motion</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Minimize animations and transitions</p>
                </div>
                <button
                  onClick={() => handleReducedMotionChange(!reducedMotion)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${reducedMotion ? 'bg-brand-orange' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  role="switch"
                  aria-checked={reducedMotion}
                  aria-label="Toggle reduced motion"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              {/* Screen Reader Optimization */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Screen Reader Optimization</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Optimize interface for screen readers</p>
                </div>
                <button
                  onClick={() => handleScreenReaderChange(!screenReader)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${screenReader ? 'bg-brand-orange' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  role="switch"
                  aria-checked={screenReader}
                  aria-label="Toggle screen reader optimization"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${screenReader ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Reset Settings */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <span className="material-icons text-red-500 mr-2">restore</span>
              Reset Settings
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Reset all accessibility settings to their default values.
            </p>
            <button
              onClick={resetSettings}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <span className="material-icons mr-2">refresh</span>
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      <FloatingBackButton />
    </div>
  );
};

export default SettingsPage;