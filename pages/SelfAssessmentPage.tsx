import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import PageHeader from '../components/PageHeader';
import AssessmentQuestion from '../components/AssessmentQuestion';
import AssessmentResults from '../components/AssessmentResults';
import { questions, sections } from '../assessment/questions';
import { buildReport, clearDraft, emptyDraft, emptyResponse, readDraft, responseErrors, saveDraft, type Draft, type Response } from '../assessment/model';
import '../assessment/assessment.css';

// Preserve session-only answers across same-tab toolkit navigation. This is
// deliberately memory-only: reload/closing the tab still requires storage.
let sessionDraft: Draft | null = null;

export default function SelfAssessmentPage() {
  const [initial] = useState(() => sessionDraft ? { draft: sessionDraft, status: 'session' as const } : readDraft());
  const [draft, setDraft] = useState(initial.draft);
  const [view, setView] = useState(-1);
  const [storageMessage, setStorageMessage] = useState(() => initial.status === 'session' ? 'Session-only draft restored. Keep this tab open; answers will be lost on reload if storage remains unavailable.' : initial.status === 'restored' ? 'A saved draft is ready to resume on this browser.' : initial.status === 'unavailable' ? 'Browser storage is unavailable. You can continue, but your draft will not be saved.' : initial.status === 'invalid' ? 'The saved draft could not be read. It has not been overwritten. Clear it to start a new assessment.' : initial.status === 'incompatible' ? 'The saved draft uses a different question set. It has not been overwritten. Clear it to start with the current questions.' : 'Your draft will be saved on this browser as you answer.');
  const [blocked, setBlocked] = useState(initial.status === 'invalid' || initial.status === 'incompatible');
  const [confirmClear, setConfirmClear] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [exporting, setExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');
  const [exportFailed, setExportFailed] = useState(false);
  const contentHeading = useRef<HTMLHeadingElement>(null);
  const clearButton = useRef<HTMLButtonElement>(null);
  const cancelClear = useRef<HTMLButtonElement>(null);
  const focusTarget = useRef<string | null>(null);
  const moveFocus = useRef(false);
  const exportingRef = useRef(false);
  const report = useMemo(() => buildReport(draft), [draft]);
  const currentQuestions = questions.filter(question => question.sectionId === sections[view]?.id);

  useLayoutEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    const target = focusTarget.current ? document.getElementById(`heading-${focusTarget.current}`) : contentHeading.current;
    focusTarget.current = null;
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [view]);
  useLayoutEffect(() => { if (confirmClear) cancelClear.current?.focus(); }, [confirmClear]);

  function persist(next: Draft) {
    const updated = { ...next, updatedAt: new Date().toISOString() };
    setDraft(updated);
    setExportMessage('');
    const saved = saveDraft(updated);
    sessionDraft = saved ? null : updated;
    setStorageMessage(saved ? 'Draft saved on this browser.' : 'Draft could not be saved. Keep this tab open; your answers are available for this session only and will be lost on reload.');
  }
  function updateResponse(id: string, patch: Partial<Response>) {
    persist({ ...draft, responses: { ...draft.responses, [id]: { ...(draft.responses[id] || emptyResponse()), ...patch } } });
  }
  function navigate(next: number, questionId?: string) {
    if (exportingRef.current) return;
    setAnnouncement('');
    setShowErrors(false);
    if (next === view && questionId) {
      const target = document.getElementById(`heading-${questionId}`);
      target?.focus();
      return;
    }
    focusTarget.current = questionId || null;
    moveFocus.current = true;
    setView(next);
  }
  function continueSection() {
    const invalid = currentQuestions.filter(question => responseErrors(question, draft.responses[question.id] || emptyResponse()).length > 0);
    if (invalid.length) {
      setShowErrors(true);
      setAnnouncement('Complete the required follow-up details, or choose Review findings to create a partial report.');
      const question = invalid[0];
      document.querySelector<HTMLElement>(`#question-${question.id} [aria-invalid="true"]`)?.focus();
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`#question-${question.id} textarea[aria-required="true"]`)?.focus());
      return;
    }
    navigate(view + 1);
  }
  function reset() {
    if (exportingRef.current) return;
    const cleared = clearDraft();
    const fresh = emptyDraft();
    sessionDraft = cleared ? null : fresh;
    setDraft(fresh);
    setBlocked(false);
    setConfirmClear(false);
    setExportMessage('');
    setStorageMessage(cleared ? 'Assessment cleared. A new draft will be saved when you enter answers.' : 'Current answers cleared. Browser storage could not be cleared; a previous draft may remain on this device.');
    if (view === -1) contentHeading.current?.focus();
    else navigate(-1);
  }
  async function exportPdf() {
    if (exportingRef.current) return;
    exportingRef.current = true;
    setExporting(true);
    setExportFailed(false);
    setExportMessage('Preparing your report…');
    try {
      const { downloadAssessmentPdf } = await import('../assessment/pdf');
      await downloadAssessmentPdf(report);
      setExportMessage('PDF prepared. Your browser will handle the download.');
    } catch (error) {
      setExportFailed(true);
      setExportMessage(error instanceof Error ? error.message : 'Could not create the PDF. Your answers are safe. Please try again or use the on-screen report.');
    } finally {
      exportingRef.current = false;
      setExporting(false);
    }
  }
  const title = view === -1 ? 'Before you begin' : view === sections.length ? 'Your findings and next steps' : sections[view].title;

  return <>
    <PageHeader title="Accessibility & inclusion self-assessment" description="Reflect on your learning experience, identify barriers, and take away a practical improvement report." breadcrumbs={[{ label: 'Toolkit', to: '/' }, { label: 'Self-assessment' }]} />
    <div className="site-container assessment-layout">
      <aside className="assessment-sidebar" aria-label="Assessment progress">
        <p className="assessment-progress-label"><strong>{report.answered} of {report.total}</strong> questions answered</p>
        <progress value={report.answered} max={report.total} aria-label="Questions answered" />
        {report.pending > 0 && <p className="assessment-small">{report.pending} {report.pending === 1 ? 'answer needs' : 'answers need'} required details.</p>}
        <nav aria-label="Assessment sections"><ol>
          <li><button type="button" aria-current={view === -1 ? 'step' : undefined} onClick={() => navigate(-1)} disabled={exporting}>Before you begin</button></li>
          {sections.map((section, index) => <li key={section.id}><button type="button" disabled={blocked || exporting} aria-current={view === index ? 'step' : undefined} onClick={() => navigate(index)}><span>{index + 1}. {section.title}</span><span className="assessment-section-count">{questions.filter(question => question.sectionId === section.id && draft.responses[question.id]?.answer).length}/{questions.filter(question => question.sectionId === section.id).length} answered</span></button></li>)}
          <li><button type="button" disabled={blocked || exporting} aria-current={view === sections.length ? 'step' : undefined} onClick={() => navigate(sections.length)}>Review findings</button></li>
        </ol></nav>
        <p className="assessment-small" role="status" aria-atomic="true">{storageMessage}</p>
        <button ref={clearButton} type="button" disabled={exporting} className="assessment-text-button" onClick={() => setConfirmClear(true)}>Clear assessment</button>
        {confirmClear && <div className="assessment-notice" role="group" aria-label="Confirm clearing assessment">
          <p>Clear all answers and the saved draft on this browser? This cannot be undone.</p>
          <div className="assessment-actions"><button type="button" disabled={exporting} className="assessment-secondary" onClick={reset}>Yes, clear all answers</button><button ref={cancelClear} type="button" disabled={exporting} className="assessment-text-button" onClick={() => { setConfirmClear(false); clearButton.current?.focus(); }}>Cancel</button></div>
        </div>}
      </aside>
      <div className="assessment-content" aria-busy={exporting}>
        <h2 ref={contentHeading} tabIndex={-1}>{title}</h2>
        <p role="status" className="assessment-errors" aria-atomic="true">{announcement}</p>
        {view === -1 ? <div className="assessment-intro">
          <p>Assess a product, course, platform, or learning experience—not your personal abilities. These 22 questions bring together the toolkit’s existing guidance for learning engineers, instructional designers, developers, product managers, educators, and curriculum specialists.</p>
          <div className="assessment-notice"><strong>A reflection tool, not a certification.</strong><p>Your answers are self-reported. The report does not prove conformance or replace testing with learners and assistive technology.</p></div>
          <ul className="assessment-instructions"><li>Choose <strong>No / Not yet fully</strong> for gaps or partial implementation to see immediate guidance.</li><li>Choose <strong>Yes</strong> to record implementation examples or an explanation.</li><li>Choose <strong>Not sure</strong> for a practical way to check.</li><li>Skip questions if needed. You can download a clearly marked partial assessment.</li></ul>
          <p className="assessment-small">Answers stay in this browser; this feature does not submit them to a server. Other people using the same browser profile may see your saved draft. Do not include names, diagnoses, passwords, or other sensitive learner information. Clear the assessment when using a shared device. Written responses are limited to 4,000 characters.</p>
          <div className="assessment-field"><label htmlFor="assessment-project">Project or product name <span className="assessment-optional">(optional)</span></label><input id="assessment-project" maxLength={160} value={draft.project} disabled={blocked} onChange={event => persist({ ...draft, project: event.target.value })} /></div>
          <div className="assessment-field"><label htmlFor="assessment-scope">What are you assessing? <span className="assessment-optional">(optional)</span></label><p id="scope-help" className="assessment-small">For example, a course, a release, or the learner journey from enrolment to lesson completion.</p><textarea id="assessment-scope" maxLength={1000} rows={3} aria-describedby="scope-help" value={draft.scope} disabled={blocked} onChange={event => persist({ ...draft, scope: event.target.value })} /></div>
          {blocked ? <p className="assessment-notice">Use Clear assessment to remove the unreadable or incompatible draft before starting. Your stored draft has not been changed.</p> : <button type="button" className="brand-button" onClick={() => navigate(0)}>{report.answered ? 'Resume assessment' : 'Start assessment'}<span className="material-icons" aria-hidden="true">arrow_forward</span></button>}
        </div> : view === sections.length ? <>
          <div className="assessment-actions"><button type="button" className="brand-button" disabled={exporting} onClick={exportPdf}>{exporting ? 'Preparing PDF…' : 'Download PDF report'}</button><button type="button" className="assessment-secondary" disabled={exporting} onClick={() => navigate(-1)}>Edit project details</button></div>
          <p role={exportFailed ? 'alert' : 'status'} className={exportFailed ? 'assessment-errors' : 'assessment-small'}>{exportMessage}</p>
          <p className="assessment-small">The PDF contains selectable text, but is not a certified tagged accessible PDF. The complete report remains available below as structured web content. If a character or writing system cannot be exported reliably, the PDF will explain the limitation rather than silently alter your response.</p>
          <AssessmentResults report={report} edit={id => navigate(sections.findIndex(section => section.id === questions.find(question => question.id === id)?.sectionId), id)} />
          <button type="button" className="assessment-secondary" disabled={exporting} onClick={() => navigate(sections.length - 1)}>Back to questions</button>
        </> : <>
          <p className="assessment-section-description">{sections[view].description}</p>
          <p className="assessment-small">No answer is selected by default. Implementation details are optional, except when you select Other. Keep examples free of personal information.</p>
          {currentQuestions.map(question => <AssessmentQuestion key={question.id} question={question} response={draft.responses[question.id] || emptyResponse()} update={patch => updateResponse(question.id, patch)} showErrors={showErrors} />)}
          <div className="assessment-section-actions"><button type="button" className="assessment-secondary" onClick={() => navigate(view - 1)}>Back</button><button type="button" className="brand-button" onClick={continueSection}>{view === sections.length - 1 ? 'Review findings' : 'Continue'}<span className="material-icons" aria-hidden="true">arrow_forward</span></button></div>
          <button type="button" className="assessment-text-button" onClick={() => navigate(sections.length)}>Review findings, including incomplete answers</button>
        </>}
      </div>
    </div>
  </>;
}