import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Preferences {
  theme: 'system' | 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  reducedMotion: boolean;
  textSpacing: boolean;
  bigTargets: boolean;
  readingRuler: boolean;
  screenReaderSupport: boolean;
  readAloudControls: boolean;
  rate: number;
  voice: string;
}
const KEY = 'ihub-accessibility-v1';
const defaults: Preferences = { theme: 'system', fontSize: 'medium', highContrast: false, reducedMotion: false, textSpacing: false, bigTargets: false, readingRuler: false, screenReaderSupport: false, readAloudControls: false, rate: 1, voice: '' };
const legacyKeys = ['theme', 'fontSize', 'highContrast', 'reducedMotion', 'screenReader'];
function validate(value: Partial<Preferences>): Preferences {
  const p = { ...defaults };
  if (['system', 'light', 'dark'].includes(value.theme)) p.theme = value.theme;
  if (['small', 'medium', 'large', 'extra-large'].includes(value.fontSize)) p.fontSize = value.fontSize;
  for (const key of ['highContrast', 'reducedMotion', 'textSpacing', 'bigTargets', 'readingRuler', 'screenReaderSupport', 'readAloudControls'] as const) {
    if (typeof value[key] === 'boolean') p[key] = value[key];
  }
  if ([.5, .75, 1, 1.25, 1.5, 2].includes(value.rate)) p.rate = value.rate;
  if (typeof value.voice === 'string') p.voice = value.voice.slice(0, 300);
  return p;
}
function load(): Preferences {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return validate(JSON.parse(saved) || {});
    return validate({ theme: localStorage.getItem('theme') as Preferences['theme'], fontSize: localStorage.getItem('fontSize') as Preferences['fontSize'], highContrast: localStorage.getItem('highContrast') === 'true', reducedMotion: localStorage.getItem('reducedMotion') === 'true' });
  } catch { return { ...defaults }; }
}
const Context = createContext<{ preferences: Preferences; update: (value: Partial<Preferences>) => void; reset: () => void } | null>(null);
export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState(load);
  useEffect(function applyPreferences() {
    try {
      localStorage.setItem(KEY, JSON.stringify(preferences));
      legacyKeys.forEach(key => localStorage.removeItem(key));
    } catch { /* Preferences remain usable for this session. */ }
    const root = document.documentElement;
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      root.classList.toggle('dark', preferences.theme === 'dark' || (preferences.theme === 'system' && scheme.matches));
      root.classList.toggle('reduced-motion', preferences.reducedMotion || motion.matches);
    };
    apply();
    scheme.addEventListener('change', apply);
    motion.addEventListener('change', apply);
    root.setAttribute('data-font-size', preferences.fontSize);
    root.classList.remove('screen-reader-optimized');
    for (const [key, name] of [['highContrast', 'high-contrast'], ['textSpacing', 'text-spacing'], ['bigTargets', 'big-targets']] as const) root.classList.toggle(name, preferences[key]);
    return () => { scheme.removeEventListener('change', apply); motion.removeEventListener('change', apply); };
  }, [preferences]);
  return <Context.Provider value={{ preferences, update: value => setPreferences(previous => validate({ ...previous, ...value })), reset: () => setPreferences({ ...defaults }) }}>{children}</Context.Provider>;
}
export function useAccessibility() {
  const context = useContext(Context);
  if (!context) throw new Error('AccessibilityProvider is required');
  return context;
}
