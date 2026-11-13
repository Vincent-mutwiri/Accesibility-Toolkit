import React from 'react';
import { Link } from 'react-router-dom';
import { questions } from '../assessment/questions';
import { type Answer, type Response, responseErrors } from '../assessment/model';

type Question = typeof questions[number];

export function ToolkitResource({ source }: { source: Question['source'] }) {
  const to = source.path + (source.sectionId ? `?section=${encodeURIComponent(source.sectionId)}` : '');
  return <Link className="text-link" to={to}>Toolkit: {source.label}</Link>;
}

export default function AssessmentQuestion({ question, response, update, showErrors, errors: providedErrors, moduleLabels = [] }: {
  question: Question;
  response: Response;
  update: (patch: Partial<Response>) => void;
  showErrors: boolean;
  errors?: string[];
  moduleLabels?: string[];
}) {
  const { id } = question;
  const errors = providedErrors ?? responseErrors(question, response);
  const otherError = showErrors && response.answer === 'yes' && response.options.includes('other') && !response.other.trim();
  const reasonError = showErrors && response.answer === 'na' && errors.length > 0;
  const answers: { value: Answer; label: string }[] = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No / Not yet fully' },
    { value: 'unsure', label: 'Not sure' },
    ...(question.allowNA ? [{ value: 'na' as const, label: 'Not applicable' }] : []),
  ];
  return <fieldset className="assessment-question" id={`question-${id}`}>
    <legend tabIndex={-1} id={`heading-${id}`}><span className="assessment-question-number">{id.replace('Q', '')}</span>{question.text}</legend>
    {moduleLabels.length > 0 && <p className="assessment-small">Applies to: {moduleLabels.join(' · ')}{moduleLabels.length > 1 ? '. Answer once for the full declared scope.' : ''}</p>}
    {question.relatedCore?.length > 0 && <p className="assessment-small">Related core checks: {question.relatedCore.join(', ')}. This specialist question checks a separate capability; it does not change those answers.</p>}
    {question.naCondition && <p className="assessment-small">Not applicable only when: {question.naCondition} Missing safeguards are No / Not yet fully, not Not applicable.</p>}
    <div className="assessment-answers">
      {answers.map(answer => <label key={answer.value} className={response.answer === answer.value ? 'is-selected' : ''}>
        <input type="radio" name={`answer-${id}`} value={answer.value} checked={response.answer === answer.value} onChange={() => update({ answer: answer.value })} />
        <span>{answer.label}</span>
      </label>)}
    </div>
    <p className="assessment-feedback" role="status" aria-atomic="true">
      {response.answer === 'no' ? `Suggested improvement: ${question.guidance}` : response.answer === 'unsure' ? `How to check: ${question.verify}` : response.answer === 'yes' ? 'Record how you have implemented this below. These details are self-reported, not independently verified.' : response.answer === 'na' ? `Explain why this content type or feature is absent from your assessment scope.${question.naCondition ? ` ${question.naCondition}` : ''}` : ''}
    </p>
    {response.answer === 'yes' && <div className="assessment-followup">
      {question.openPrompt ? <div className="assessment-field">
        <label htmlFor={`notes-${id}`}>{question.openPrompt} <span className="assessment-optional">(optional)</span></label>
        <textarea id={`notes-${id}`} maxLength={4000} rows={4} value={response.notes} onChange={event => update({ notes: event.target.value })} />
      </div> : <>
        <fieldset className="assessment-examples"><legend>How have you implemented this? <span className="assessment-optional">Select all that apply (optional).</span></legend>
          {question.options.map(option => <label key={option.id}>
            <input type="checkbox" checked={response.options.includes(option.id)} onChange={event => update({ options: event.target.checked ? [...response.options, option.id] : response.options.filter(value => value !== option.id) })} />
            <span>{option.label}</span>
          </label>)}
          <label><input type="checkbox" checked={response.options.includes('other')} onChange={event => update({ options: event.target.checked ? [...response.options, 'other'] : response.options.filter(value => value !== 'other') })} /><span>Other — please describe</span></label>
        </fieldset>
        {response.options.includes('other') && <div className="assessment-field">
          <label htmlFor={`other-${id}`}>Describe your other implementation method (required)</label>
          <textarea id={`other-${id}`} maxLength={4000} rows={3} value={response.other} aria-required="true" aria-invalid={otherError} aria-describedby={otherError ? `errors-${id}` : undefined} onChange={event => update({ other: event.target.value })} />
        </div>}
        <div className="assessment-field">
          <label htmlFor={`notes-${id}`}>Add an example or explanation <span className="assessment-optional">(optional)</span></label>
          <textarea id={`notes-${id}`} maxLength={4000} rows={3} value={response.notes} onChange={event => update({ notes: event.target.value })} />
        </div>
      </>}
      <p className="assessment-small">Examples describe methods, not a scoring checklist. A single selection does not prove that the whole practice is implemented.</p>
    </div>}
    {(response.answer === 'no' || response.answer === 'unsure') && <div className="assessment-field">
      <label htmlFor={`context-${id}`}>{response.answer === 'no' ? 'What have you already implemented, or what is blocking progress?' : 'What do you need to check?'} <span className="assessment-optional">(optional)</span></label>
      <textarea id={`context-${id}`} maxLength={4000} rows={3} value={response.context} onChange={event => update({ context: event.target.value })} />
    </div>}
    {response.answer === 'na' && <div className="assessment-field">
      <label htmlFor={`reason-${id}`}>Why is this content type or feature not applicable? (required)</label>
      <textarea id={`reason-${id}`} maxLength={4000} rows={3} value={response.naReason} aria-required="true" aria-invalid={reasonError} aria-describedby={reasonError ? `errors-${id}` : undefined} onChange={event => update({ naReason: event.target.value })} />
    </div>}
    {showErrors && errors.length > 0 && <ul id={`errors-${id}`} className="assessment-errors">{errors.map(error => <li key={error}>{error}</li>)}</ul>}
    {response.answer && <div className="assessment-question-footer"><ToolkitResource source={question.source} /><button type="button" className="assessment-text-button" onClick={() => { update({ answer: undefined }); requestAnimationFrame(() => document.getElementById(`heading-${id}`)?.focus()); }}>Clear answer<span className="sr-only"> for {id}</span></button></div>}
  </fieldset>;
}