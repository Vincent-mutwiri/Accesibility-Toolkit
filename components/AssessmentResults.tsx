import React from 'react';
import { type Report } from '../assessment/model';
import { ToolkitResource } from './AssessmentQuestion';

const groups = [
  { answer: 'no', title: 'Improvement plan', empty: 'No gaps reported. Unanswered and uncertain items still need attention.' },
  { answer: 'unsure', title: 'Needs verification', empty: 'No answers marked Not sure.' },
  { answer: 'yes', title: 'Reported strengths', empty: 'No practices marked Yes yet.' },
  { answer: 'na', title: 'Not applicable', empty: 'No features or content types excluded from the assessment.' },
  { answer: 'unanswered', title: 'Unanswered questions', empty: 'All main questions have an answer.' },
] as const;

export default function AssessmentResults({ report, edit }: { report: Report; edit: (id: string) => void }) {
  return <div className="assessment-results">
    <div className="assessment-report-intro">
      <p className="assessment-report-state">{report.complete ? 'Complete self-assessment' : 'Partial assessment'}</p>
      <p><strong>{report.project || 'Untitled project'}</strong></p>
      <p className="assessment-preserve">Scope: {report.scope || 'Not provided'}</p>
      <p className="assessment-small">Prepared {new Date(report.generatedAt).toLocaleString()} · Question set {report.questionVersion}</p>
      <p>This report records your own assessment, not an independent audit or accessibility certification. No score or unreviewed priority ranking is assigned.</p>
      <p>Completion applies only to the selected scope, not comprehensive accessibility coverage. Overall progress counts each question once; module totals may overlap because shared questions contribute to each relevant module.</p>
    </div>
    <section aria-labelledby="report-coverage" className="assessment-report-coverage">
      <h3 id="report-coverage">Assessment coverage</h3>
      <p><strong>Shared core:</strong> {report.core.answered} of {report.core.total} answered · {report.core.complete ? 'Complete' : 'Partial'} · Version {report.questionVersion}{report.core.pending ? ` · ${report.core.pending} need required details` : ''}</p>
      <h4>Selected modules</h4>
      {report.modules.length ? <ul className="assessment-coverage-list">{report.modules.map(module => <li key={module.id}><strong>{module.title}</strong> ({module.family === 'product' ? 'Product category' : 'Accessibility focus'}) · Version {module.version}<br />{module.answered} of {module.total} answered · {module.complete ? 'Complete' : 'Partial'}{module.pending ? ` · ${module.pending} need required details` : ''}</li>)}</ul> : <p>None selected. This is a core-only assessment.</p>}
      <h4>Not assessed in depth</h4>
      <p>{report.notAssessed.length ? report.notAssessed.join(' · ') : 'None — all category modules are included.'}</p>
      <p className="assessment-small">Unselected modules have not been passed or declared Not applicable. Any retained inactive answers are excluded from this report.</p>
    </section>
    <dl className="assessment-counts">{groups.map(group => <div key={group.answer}><dt>{group.answer === 'no' ? 'To improve' : group.answer === 'unsure' ? 'To verify' : group.answer === 'yes' ? 'Yes' : group.answer === 'na' ? 'Not applicable' : 'Unanswered'}</dt><dd>{report.counts[group.answer]}</dd></div>)}</dl>
    {report.pending > 0 && <p className="assessment-notice">{report.pending} answered {report.pending === 1 ? 'question has' : 'questions have'} required follow-up details missing. These are flagged below and in the PDF.</p>}
    <p className="assessment-small">The sections below are the full response record, including implementation examples and written details. Use Edit answer to revisit any finding.</p>
    {groups.map(group => <section key={group.answer} aria-labelledby={`results-${group.answer}`}>
      <h3 id={`results-${group.answer}`}>{group.title}</h3>
      {report.items.filter(item => item.answer === group.answer).length === 0 ? <p className="assessment-small">{group.empty}</p> : report.items.filter(item => item.answer === group.answer).map(item => <article key={item.id} className="assessment-finding">
        <h4>{item.id}: {item.question}</h4>
        <p className="assessment-small">{item.modules.length ? `Modules: ${item.modules.join(' · ')}` : 'Shared core'}</p>
        <p><strong>Your answer:</strong> {item.label}</p>
        {item.details.map((detail, index) => <p className="assessment-preserve" key={index}>{detail}</p>)}
        {item.answer === 'no' && <p><strong>Suggested improvement:</strong> {item.guidance}</p>}
        {item.answer === 'unsure' && <p><strong>How to check:</strong> {item.verify}</p>}
        {item.errors.length > 0 && <ul className="assessment-errors">{item.errors.map(error => <li key={error}>Required detail missing: {error}</li>)}</ul>}
        <div className="assessment-question-footer"><ToolkitResource source={item.source} /><button type="button" className="assessment-text-button" onClick={() => edit(item.id)}>Edit answer<span className="sr-only"> for {item.id}</span></button></div>
      </article>)}
    </section>)}
  </div>;
}