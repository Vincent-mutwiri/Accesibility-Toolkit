import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import FloatingBackButton from '../components/FloatingBackButton';
import { useAccessibility, Preferences } from '../accessibility/Preferences';

const options = [
  { key: 'highContrast', label: 'High contrast', help: 'Strengthen text and boundaries.' },
  { key: 'reducedMotion', label: 'Reduced motion', help: 'Minimize animations and transitions. Your device’s reduced motion preference is always respected.' },
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
      <p>Keyboard and screen reader access are always enabled. Read aloud controls are available above each guide.</p>
      <fieldset className="content-panel"><legend>Appearance</legend>
        <div className="reading-field"><label htmlFor="accessibility-theme">Theme</label><select id="accessibility-theme" value={preferences.theme} onChange={event => update({ theme: event.target.value as Preferences['theme'] })}><option value="system">Use device setting</option><option value="light">Light</option><option value="dark">Dark</option></select></div>
        <div className="reading-field"><label htmlFor="accessibility-size">Text size</label><select id="accessibility-size" value={preferences.fontSize} onChange={event => update({ fontSize: event.target.value as Preferences['fontSize'] })}><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option><option value="extra-large">Extra large</option></select></div>
      </fieldset>
      <fieldset className="content-panel"><legend>Reading and interaction</legend>
        {options.map(option => <label key={option.key} className="preference-option">
          <input type="checkbox" checked={preferences[option.key]} onChange={event => update({ [option.key]: event.target.checked })} aria-labelledby={`${option.key}-label`} aria-describedby={`${option.key}-help`} />
          <span><strong id={`${option.key}-label`}>{option.label}</strong><span id={`${option.key}-help`} className="preference-help">{option.help}</span></span>
        </label>)}
      </fieldset>
      <p>Preferences are saved in this browser when storage is available. Reset restores device appearance, standard text size, and turns optional tools off.</p>
      <button className="brand-button brand-button-dark" type="button" onClick={() => { reset(); setMessage('Accessibility preferences reset to defaults.'); }}>Reset to defaults</button>
      <p role="status">{message}</p>
    </div>
    <FloatingBackButton />
  </>;
}
