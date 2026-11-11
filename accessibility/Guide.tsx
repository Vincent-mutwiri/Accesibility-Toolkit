import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useAccessibility } from './Preferences';
import { createReader, extractReadableText, SpeechState } from './readAloud';
import { downloadElementAsPdf } from './pdfExport';
import { PdfCaptureProvider, PdfHeader } from './pdfCapture';

export default function Guide({ children }: { children: React.ReactNode }) {
  const content = useRef<HTMLDivElement>(null);
  const { preferences, update } = useAccessibility();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [state, setState] = useState<SpeechState>('idle');
  const [message, setMessage] = useState('');
  const [exporting, setExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  // Anchor node the Download PDF button is portalled into. We insert it as a
  // placeholder immediately before the #checklist section (the last block of
  // every guide), so the button sits at the bottom of the guide body, just
  // above the checklist — without editing each guide page.
  const [pdfAnchor, setPdfAnchor] = useState<HTMLElement | null>(null);
  const { pathname } = useLocation();
  const [reader] = useState(() => createReader((next, text) => { setState(next); setMessage(text); }));
  const supported = typeof window.speechSynthesis?.speak === 'function' && typeof window.SpeechSynthesisUtterance === 'function';
  useEffect(function speechLifecycle() {
    if (!preferences.readAloudControls) return;
    if (supported) {
      const load = () => setVoices(window.speechSynthesis.getVoices());
      load();
      window.speechSynthesis.addEventListener('voiceschanged', load);
      return () => { reader.dispose(); window.speechSynthesis.removeEventListener('voiceschanged', load); };
    }
    return () => reader.dispose();
  }, [reader, supported, preferences.readAloudControls]);

  // Locate the checklist inside this guide and create a placeholder for the
  // PDF button directly before it. Re-runs on route change so each guide
  // gets its own anchor.
  useEffect(function placePdfButton() {
    const root = content.current;
    if (!root) return;
    const checklist = root.querySelector('#checklist');
    if (!checklist || !(checklist instanceof HTMLElement)) return;
    const anchor = document.createElement('div');
    anchor.className = 'guide-export site-container pdf-ignore';
    checklist.before(anchor);
    setPdfAnchor(anchor);
    return () => { anchor.remove(); setPdfAnchor(null); };
  }, [pathname]);

  const exportPdf = async () => {
    if (!content.current || exporting) return;
    setExporting(true);
    // Wait for React to commit the capture state (forces the Checklist open
    // and reveals the PDF header) before html2canvas snapshots the DOM.
    await new Promise(resolve => requestAnimationFrame(() => resolve(null)));
    await new Promise(resolve => requestAnimationFrame(() => resolve(null)));
    try {
      await downloadElementAsPdf(content.current, undefined, setExportStatus);
    } catch (error) {
      console.error('PDF export failed', error);
      setExportStatus('Could not build the PDF. Please try again.');
    } finally {
      setExporting(false);
      setTimeout(() => setExportStatus(''), 4000);
    }
  };
  const pdfButton = (
    <>
      <button type="button" className="pdf-button" onClick={exportPdf} disabled={exporting}>
        <span className="material-icons" aria-hidden="true">{exporting ? 'hourglass_empty' : 'picture_as_pdf'}</span>
        <span>{exporting ? (exportStatus || 'Preparing…') : 'Download PDF'}</span>
      </button>
      {exportStatus && exporting && <p className="export-status" role="status" aria-atomic="true">{exportStatus}</p>}
    </>
  );
  return <>
    {preferences.readAloudControls && <section className="reading-tools site-container" aria-label="Guide reading tools" data-reading-tools>
      <div className="reading-actions">
        <button type="button" disabled={!supported || state !== 'idle'} onClick={() => reader.start(extractReadableText(content.current!), preferences.rate, voices.find(voice => voice.voiceURI === preferences.voice))}>Read guide</button>
        <button type="button" disabled={state !== 'reading' && state !== 'paused'} onClick={() => state === 'paused' ? reader.resume() : reader.pause()}>{state === 'paused' ? 'Resume' : 'Pause'}</button>
        <button type="button" disabled={state === 'idle'} onClick={() => reader.stop()}>Stop</button>
        <div className="reading-field"><label htmlFor="reading-speed">Reading speed</label><select id="reading-speed" value={preferences.rate} disabled={state !== 'idle'} onChange={event => update({ rate: Number(event.target.value) })}>{[.5, .75, 1, 1.25, 1.5, 2].map(rate => <option key={rate} value={rate}>{rate}×</option>)}</select></div>
        <div className="reading-field"><label htmlFor="reading-voice">Voice</label><select id="reading-voice" value={voices.some(voice => voice.voiceURI === preferences.voice) ? preferences.voice : ''} disabled={!supported || state !== 'idle'} onChange={event => update({ voice: event.target.value })}><option value="">Device default</option>{voices.map(voice => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>)}</select></div>
        <Link to="/settings">Reading preferences</Link>
      </div>
      <p className="reading-help">Read aloud starts only when you choose. Voice availability depends on your device.</p>
      {!supported && <p>Read aloud is unavailable in this browser. All guide text remains available.</p>}
      <p className="reading-status" role="status" aria-atomic="true">{message}</p>
    </section>}
    <div ref={content} data-guide-content>
      <PdfCaptureProvider value={exporting}>
        <PdfHeader />
        {children}
      </PdfCaptureProvider>
    </div>
    {/* The Download PDF button is portalled into a placeholder inserted just
        before #checklist, so it appears at the bottom of the guide body. */}
    {pdfAnchor && createPortal(pdfButton, pdfAnchor)}
  </>;
}
