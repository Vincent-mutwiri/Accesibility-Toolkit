import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from './Preferences';
import { createReader, extractReadableText, SpeechState } from './readAloud';
import { downloadElementAsPdf } from './pdfExport';

export default function Guide({ children }: { children: React.ReactNode }) {
  const content = useRef<HTMLDivElement>(null);
  const { preferences, update } = useAccessibility();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [state, setState] = useState<SpeechState>('idle');
  const [message, setMessage] = useState('');
  const [exporting, setExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
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
  const exportPdf = async () => {
    if (!content.current || exporting) return;
    setExporting(true);
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
  return <>
    <section className="guide-export site-container" aria-label="Download this guide">
      <button type="button" className="pdf-button" onClick={exportPdf} disabled={exporting}>
        <span className="material-icons" aria-hidden="true">{exporting ? 'hourglass_empty' : 'picture_as_pdf'}</span>
        <span>{exporting ? (exportStatus || 'Preparing…') : 'Download PDF'}</span>
      </button>
      {exportStatus && exporting && <p className="export-status" role="status" aria-atomic="true">{exportStatus}</p>}
    </section>
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
    <div ref={content} data-guide-content>{children}</div>
  </>;
}
