// Adapted from AI-for-Accessibility-Toolkit tools/adapters/read-aloud.js.
// Apache-2.0; provenance and modifications in THIRD_PARTY_NOTICES.md.
const SKIP = 'script,style,noscript,template,nav,header,footer,aside,button,input,select,textarea,[role="navigation"],[aria-hidden="true"],[hidden],[inert],[aria-live]:not([aria-live="off"]),[role="status"],[role="alert"],.material-icons,.material-icons-outlined,[data-reading-tools]';
const BLOCKS = new Set(['P', 'DIV', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TD', 'TH', 'TR', 'DT', 'DD', 'SECTION', 'ARTICLE', 'BLOCKQUOTE', 'FIGCAPTION', 'CAPTION', 'LEGEND', 'FIELDSET', 'LABEL', 'SUMMARY', 'BR']);
export function extractReadableText(element: HTMLElement): string {
  const parts: string[] = [];
  let lastBlock: Element | null = null;
  function walk(el: Element) {
    if (el.matches(SKIP)) return;
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return;
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.replace(/\s+/g, ' ') || '';
        if (!text.trim()) { if (parts.length) parts.push(' '); continue; }
        let block = el;
        while (block !== element && !BLOCKS.has(block.tagName) && block.parentElement) block = block.parentElement;
        if (block !== lastBlock && parts.length) parts.push(/[.!?:;,]$/.test(parts.join('').trimEnd()) ? ' ' : '. ');
        lastBlock = block;
        parts.push(text);
      } else if (node instanceof Element) walk(node);
    }
  }
  walk(element);
  return parts.join('').replace(/\s+/g, ' ').replace(/\s+([.,;:!?])/g, '$1').trim();
}
export function chunkText(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [text];
  const result: string[] = [];
  let current = '';
  for (let sentence of sentences) {
    while (sentence.length > 220) {
      const space = sentence.lastIndexOf(' ', 220);
      const at = space > 40 ? space : 220;
      if (current) { result.push(current); current = ''; }
      result.push(sentence.slice(0, at));
      sentence = sentence.slice(at);
    }
    if ((current + sentence).length > 220 && current) { result.push(current); current = ''; }
    current += sentence;
  }
  if (current.trim()) result.push(current);
  return result.map(part => part.trim()).filter(Boolean);
}
export type SpeechState = 'idle' | 'starting' | 'reading' | 'paused';
export function createReader(onState: (state: SpeechState, message: string) => void) {
  let run = 0;
  let utterance: SpeechSynthesisUtterance | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  function cancel() {
    run++;
    clearTimeout(timer);
    utterance = null;
    window.speechSynthesis?.cancel();
  }
  return {
    start(text: string, rate: number, voice: SpeechSynthesisVoice | undefined) {
      cancel();
      if (typeof window.speechSynthesis?.speak !== 'function' || typeof window.SpeechSynthesisUtterance !== 'function') { onState('idle', 'Read aloud is unavailable in this browser.'); return; }
      const chunks = chunkText(text);
      if (!chunks.length) { onState('idle', 'No guide text is available to read.'); return; }
      const currentRun = run;
      onState('starting', 'Starting read aloud…');
      timer = setTimeout(() => { if (run === currentRun) { cancel(); onState('idle', 'Speech did not start. Try another voice or try again.'); } }, 8000);
      const speak = (index: number) => {
        if (currentRun !== run) return;
        utterance = new SpeechSynthesisUtterance(chunks[index]);
        utterance.rate = rate;
        utterance.lang = voice?.lang || document.documentElement.lang || 'en';
        if (voice) utterance.voice = voice;
        utterance.onstart = () => { if (currentRun === run) { clearTimeout(timer); onState('reading', 'Reading guide.'); } };
        utterance.onend = () => {
          if (currentRun !== run) return;
          if (index + 1 < chunks.length) speak(index + 1);
          else { utterance = null; onState('idle', 'Finished reading.'); }
        };
        utterance.onerror = () => { if (currentRun === run) { cancel(); onState('idle', 'Speech stopped. Try again or choose another voice.'); } };
        try { window.speechSynthesis.speak(utterance); } catch { cancel(); onState('idle', 'Read aloud could not start. Try another voice.'); }
      };
      speak(0);
    },
    pause() { window.speechSynthesis.pause(); onState('paused', 'Reading paused.'); },
    resume() { window.speechSynthesis.resume(); onState('reading', 'Reading guide.'); },
    stop() { cancel(); onState('idle', 'Reading stopped.'); },
    dispose: cancel,
  };
}
