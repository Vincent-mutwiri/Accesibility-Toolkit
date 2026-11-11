import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import FloatingBackButton from '../components/FloatingBackButton';
import { useAccessibility } from '../accessibility/Preferences';

const options = [
  { key: 'highContrast', label: 'High contrast', help: 'Strengthen text and boundaries.' },
  { key: 'reducedMotion', label: 'Reduced motion', help: 'Minimize animations and transitions. Your device’s reduced motion preference is always respected.' },
  { key: 'screenReaderSupport', label: 'Screen reader support', help: 'Move focus to the heading when opening a page so your screen reader can announce it. Off by default.' },
  { key: 'readAloudControls', label: 'Read aloud', help: 'Show read, pause, stop, speed, and voice controls above each guide. Off by default; reading starts only when you press Read guide.' },
  { key: 'textSpacing', label: 'Increased text spacing', help: 'Add space between letters, words, and lines.' },
  { key: 'bigTargets', label: 'Larger controls', help: 'Make buttons and form controls at least 44 pixels tall and wide. Linked text receives extra spacing.' },
  { key: 'readingRuler', label: 'Reading ruler', help: 'Follow a line with a highlight band. Move your pointer, touch the page, tab to content, or use the up and down arrow keys outside form fields.' },
] as const;
export default function SettingsPage() {
  const { preferences, update, reset } = useAccessibility();
  const [message, setMessage] = useState('');
  return <>
    <PageHeader title="Make the toolkit work for you." description="Choose your preferred appearance, text size, and reading options." breadcrumbs={[{ label: 'Toolkit', to: '/' }, { label: 'Accessibility settings' }]} />
    <div className="site-container accessibility-settings">
      <p>Choose the accessibility tools you want to use. Enable screen reader support or read aloud below when you need them.</p>
      <section className="settings-card" aria-labelledby="settings-theme-title">
        <h2 id="settings-theme-title"><span className="material-icons" aria-hidden="true">palette</span>Theme</h2>
        <p>Choose between light and dark mode for better visibility.</p>
        <div className="settings-theme-choices" role="group" aria-labelledby="settings-theme-title">
          {([{ value: 'light', label: 'Light Mode', icon: 'light_mode' }, { value: 'dark', label: 'Dark Mode', icon: 'dark_mode' }, { value: 'system', label: 'Use device setting', icon: 'devices' }] as const).map(option => <button key={option.value} type="button" className="settings-choice" aria-pressed={preferences.theme === option.value} onClick={() => update({ theme: option.value })}><span className="material-icons" aria-hidden="true">{option.icon}</span>{option.label}</button>)}
        </div>
      </section>
      <section className="settings-card" aria-labelledby="settings-size-title">
        <h2 id="settings-size-title"><span className="material-icons" aria-hidden="true">text_fields</span>Font Size</h2>
        <p>Adjust text size for better readability.</p>
        <div className="settings-size-choices" role="group" aria-labelledby="settings-size-title">
          {([{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }, { value: 'extra-large', label: 'Extra Large' }] as const).map(option => <button key={option.value} type="button" className={`settings-choice settings-size-${option.value}`} aria-pressed={preferences.fontSize === option.value} onClick={() => update({ fontSize: option.value })}>{option.label}</button>)}
        </div>
      </section>
      <section className="settings-card" aria-labelledby="settings-options-title">
        <h2 id="settings-options-title"><span className="material-icons" aria-hidden="true">accessibility</span>Accessibility Options</h2>
        {options.map(option => <div key={option.key} className="preference-option">
          <div><strong id={`${option.key}-label`}>{option.label}</strong><span id={`${option.key}-help`} className="preference-help">{option.help}</span></div>
          <button type="button" className="preference-switch" role="switch" aria-checked={preferences[option.key]} aria-labelledby={`${option.key}-label`} aria-describedby={`${option.key}-help`} onClick={() => update({ [option.key]: !preferences[option.key] })}><span className="preference-switch-track" aria-hidden="true"><span /></span></button>
        </div>)}
      </section>
      <section className="settings-card" aria-labelledby="settings-reset-title">
        <h2 id="settings-reset-title"><span className="material-icons" aria-hidden="true">restore</span>Reset Settings</h2>
        <p>Preferences are saved in this browser when storage is available. Reset restores device appearance, standard text size, and turns optional tools off.</p>
        <button className="brand-button brand-button-dark" type="button" onClick={() => { reset(); setMessage('Accessibility preferences reset to defaults.'); }}>Reset to defaults</button>
      </section>
      <p role="status">{message}</p>
    </div>
    <FloatingBackButton />
  </>;
}
