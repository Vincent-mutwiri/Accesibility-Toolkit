import React, { useState } from 'react';
import { getActiveQuestions, modules } from '../assessment/catalog';

export default function AssessmentModules({ selected, disabled, suggested, apply, pendingChange }: {
  selected: string[];
  disabled: boolean;
  suggested?: string;
  apply: (ids: string[]) => void;
  pendingChange: (changed: boolean) => void;
}) {
  const [pending, setPending] = useState(selected);
  const changed = pending.length !== selected.length || pending.some(id => !selected.includes(id));
  const suggestedModule = modules.find(module => module.id === suggested);
  const preview = getActiveQuestions(pending);
  const removed = modules.filter(module => selected.includes(module.id) && !pending.includes(module.id));
  function choose(ids: string[]) {
    setPending(ids);
    pendingChange(ids.length !== selected.length || ids.some(id => !selected.includes(id)));
  }
  return <section className="assessment-module-picker" aria-labelledby="module-picker-title">
    <h3 id="module-picker-title" tabIndex={-1}>Choose category modules</h3>
    <p>The 22-question shared core is always included. Select any relevant product and accessibility-focus modules, or leave all unchecked for a core-only assessment.</p>
    <p className="assessment-small">These assess barriers in your product, not learners’ diagnoses. Unselected modules are not assessed in depth; they are not passed or declared irrelevant.</p>
    {suggestedModule && !pending.includes(suggestedModule.id) && <p className="assessment-notice">The guide suggested {suggestedModule.title}. <button type="button" className="assessment-text-button" disabled={disabled} onClick={() => choose([...pending, suggestedModule.id])}>Add suggested module</button></p>}
    {(['product', 'accessibility'] as const).map(family => <fieldset key={family} disabled={disabled} className="assessment-module-group">
      <legend>{family === 'product' ? 'Product categories' : 'Accessibility focus'}</legend>
      {modules.filter(module => module.family === family).map(module => <label key={module.id}>
        <input type="checkbox" checked={pending.includes(module.id)} onChange={event => choose(event.target.checked ? [...pending, module.id] : pending.filter(id => id !== module.id))} />
        <span><strong>{module.title}</strong><span className="assessment-module-description">{module.description} · {module.questionIds.length} specialist questions, including shared questions</span></span>
      </label>)}
    </fieldset>)}
    <p className="assessment-notice" role="status" aria-atomic="true">Preview: {preview.length} unique questions — 22 core and {preview.length - 22} specialist. Shared questions appear once. Currently applied: {getActiveQuestions(selected).length} questions.</p>
    {removed.length > 0 && <p>Removing {removed.map(module => module.title).join(', ')} will retain its answers in this draft, but exclude questions exclusive to those modules from progress and reports. Re-selecting a compatible module restores its answers.</p>}
    <div className="assessment-actions">
      <button type="button" className="assessment-secondary" disabled={disabled || !changed} onClick={() => {
        const ordered = modules.filter(module => pending.includes(module.id)).map(module => module.id);
        apply(ordered);
        pendingChange(false);
        setPending(ordered);
      }}>Apply module changes</button>
      {changed && <button type="button" className="assessment-text-button" disabled={disabled} onClick={() => choose(selected)}>Discard selection changes</button>}
    </div>
    {changed && <p className="assessment-small">Apply these changes before starting, or discard them to keep the current assessment scope.</p>}
  </section>;
}