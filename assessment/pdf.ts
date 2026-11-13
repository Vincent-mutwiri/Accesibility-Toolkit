import type { Report } from './model';

const FONT = 'AssessmentDejaVu';
const MARGIN = 18;
const INK = '#242423';
const MUTED = '#535B51';
const ACCENT = '#454E4A';
const LIME = '#BAD531';
const HTML_FALLBACK = 'Please use the on-screen HTML report instead.';

let fontData: Promise<string> | undefined;

/** Load only our locally hosted, licensed font; never send report text to a service. */
function loadFont(): Promise<string> {
  if (!fontData) {
    fontData = (async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}fonts/DejaVuSans.ttf`);
      if (!response.ok) throw new Error('Font request failed');
      const bytes = new Uint8Array(await response.arrayBuffer());
      // Avoid spreading an entire TTF into a function's argument list.
      let binary = '';
      for (let offset = 0; offset < bytes.length; offset += 8192) {
        binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
      }
      return btoa(binary);
    })().catch(() => {
      fontData = undefined; // A later export can retry after a transient network failure.
      throw new Error(`The PDF font could not be loaded. Retry when the toolkit is available. ${HTML_FALLBACK}`);
    });
  }
  return fontData;
}

function toolkitUrl(source: Report['items'][number]['source']): string {
  // HashRouter routes belong AFTER #, not in the server pathname.
  const url = new URL(window.location.href);
  url.search = '';
  const route = new URL(source.path.startsWith('/') ? source.path : `/${source.path}`, 'https://toolkit.invalid');
  if (source.sectionId) route.searchParams.set('section', source.sectionId);
  url.hash = `${route.pathname}${route.search}`;
  return url.href;
}

/**
 * Download a text-based self-assessment, not a screenshot or a compliance certificate.
 * Selectable text and document language do NOT make this a tagged/PDF-UA report.
 * Reject rather than silently substitute glyphs or damage unsupported writing systems.
 */
export async function downloadAssessmentPdf(report: Report): Promise<void> {
  const [{ jsPDF }, data] = await Promise.all([import('jspdf'), loadFont()]);
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true, putOnlyUsedFonts: true });
  doc.addFileToVFS('DejaVuSans.ttf', data);
  doc.addFont('DejaVuSans.ttf', FONT, 'normal');
  doc.setFont(FONT, 'normal');
  doc.setLanguage('en-GB');

  // jsPDF's installed TTF encoder works on UTF-16 code units and can omit missing
  // glyphs. Check its parsed cmap before any text is drawn or a file is saved.
  const metadata = doc.getFont().metadata as { characterToGlyph?: (code: number) => number };
  if (doc.getFont().fontName !== FONT || typeof metadata.characterToGlyph !== 'function') {
    throw new Error(`The PDF Unicode font could not be registered. ${HTML_FALLBACK}`);
  }
  const checked = new Set<string>();
  const glyphCharacters = new Map<number, string>();
  function text(value: string): string {
    const normalized = value.normalize('NFC').replace(/\r\n?/g, '\n').replace(/\t/g, '    ');
    for (const character of normalized) {
      if (character === '\n' || checked.has(character)) continue;
      const code = character.codePointAt(0)!;
      // This renderer has no general complex-script shaping engine. Restrict to
      // simple scripts and symbols that can be faithfully rendered/extracted.
      const simpleScript = /[\p{Script=Latin}\p{Script=Greek}\p{Script=Cyrillic}\p{Script=Common}]/u.test(character);
      const glyph = metadata.characterToGlyph!(code);
      if (code > 0xffff || /[\p{Cc}\p{Cf}\p{M}\p{Zl}\p{Zp}]/u.test(character) || !simpleScript || !glyph) {
        const point = `U+${code.toString(16).toUpperCase().padStart(4, '0')}`;
        throw new Error(`PDF export cannot safely render character ${point} with the local font and text renderer. ${HTML_FALLBACK}`);
      }
      // The encoder stores one Unicode value per glyph. Reject aliases instead
      // of changing the extracted text (e.g. two characters sharing one glyph).
      const previous = glyphCharacters.get(glyph);
      if (previous && previous !== character) {
        throw new Error(`PDF export cannot preserve distinct characters U+${previous.codePointAt(0)!.toString(16).toUpperCase()} and U+${code.toString(16).toUpperCase()} in this font. ${HTML_FALLBACK}`);
      }
      glyphCharacters.set(glyph, character);
      checked.add(character);
    }
    return normalized;
  }

  doc.setDocumentProperties({
    title: text(`Accessibility & Inclusion Self-Assessment${report.project ? ` - ${report.project}` : ''}`),
    subject: 'Self-reported accessibility and inclusion findings; not certification',
    author: 'iHUB EdTech Inclusion Toolkit',
    creator: 'iHUB EdTech Inclusion Toolkit',
  });
  const generated = new Date(report.generatedAt);
  if (!Number.isNaN(generated.getTime())) doc.setCreationDate(generated);

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const contentWidth = width - MARGIN * 2;
  const bottom = height - 23;
  let y = 29;

  function header(): void {
    doc.setFont(FONT, 'normal').setFontSize(9).setTextColor(ACCENT);
    doc.text('iHUB | EDTECH INCLUSION TOOLKIT', MARGIN, 14);
    doc.setDrawColor(LIME).setLineWidth(0.8);
    doc.line(MARGIN, 19, width - MARGIN, 19);
  }
  function ensureRoom(mm: number): void {
    if (y + mm > bottom) {
      doc.addPage();
      header();
      y = 29;
    }
  }
  function paragraph(value: string, options: { size?: number; color?: string; gap?: number; url?: string } = {}): void {
    const size = options.size ?? 10;
    const lineHeight = size * (25.4 / 72) * 1.45;
    doc.setFontSize(size).setTextColor(options.color ?? INK);
    const lines = doc.splitTextToSize(text(value), contentWidth - 0.5) as string[];
    for (const line of lines) {
      ensureRoom(lineHeight);
      // A single baseline at a time permits even one very long response to span pages.
      doc.setFontSize(size).setTextColor(options.color ?? INK);
      doc.text(line, MARGIN, y);
      if (options.url && line) {
        doc.link(MARGIN, y - size * (25.4 / 72), Math.min(contentWidth, doc.getTextWidth(line)), lineHeight, { url: options.url });
      }
      y += lineHeight;
    }
    y += options.gap ?? 2;
  }

  header();
  paragraph('Accessibility & Inclusion', { size: 21, color: ACCENT, gap: 0 });
  paragraph('Self-Assessment Report', { size: 18, color: ACCENT, gap: 5 });
  paragraph(`Project: ${report.project || 'Not specified'}`, { size: 12 });
  paragraph(`Scope: ${report.scope || 'Not specified'}`);
  paragraph(`Generated: ${report.generatedAt}`, { color: MUTED });
  paragraph(`Question-set version: ${report.questionVersion}`, { color: MUTED });
  paragraph(`Status: ${report.complete ? 'Complete self-assessment' : 'Partial assessment'} | ${report.answered} of ${report.total} answered`);
  paragraph(`Answered questions with missing required details: ${report.pending}`);
  paragraph('This is a self-reported improvement plan, not an accessibility audit, compliance score or certification. A Yes answer records a reported strength, not independently verified evidence.');
  paragraph('This PDF contains selectable text but is not a tagged accessible PDF. Use the on-screen HTML report for a semantic, accessible reading alternative.', { color: MUTED, gap: 5 });
  paragraph('Response counts', { size: 14, color: ACCENT });
  paragraph(`Yes: ${report.counts.yes} | No / Not yet fully: ${report.counts.no} | Not sure: ${report.counts.unsure}`);
  paragraph(`Not applicable: ${report.counts.na} | Unanswered: ${report.counts.unanswered}`, { gap: 6 });
  paragraph('Full responses and next steps', { size: 15, color: ACCENT });
  paragraph('Each question appears once below, grouped by its current answer. Missing required details are listed with the response. Toolkit guidance links open the relevant guide.', { color: MUTED, gap: 5 });

  const groups = [
    { answer: 'yes', heading: 'Self-reported strengths', note: 'Reported as implemented; review the details and validate with learners.' },
    { answer: 'no', heading: 'Gaps and recommended actions', note: 'No / Not yet fully: use these actions to plan improvements.' },
    { answer: 'unsure', heading: 'Needs verification', note: 'Not sure: gather evidence before changing these answers.' },
    { answer: 'na', heading: 'Not applicable', note: 'Declared exclusions and their recorded reasons; revisit when scope changes.' },
    { answer: 'unanswered', heading: 'Unanswered questions', note: 'No answer has been recorded; these are not assessed strengths or gaps.' },
  ] as const;

  for (const group of groups) {
    const items = report.items.filter(item => item.answer === group.answer);
    ensureRoom(36);
    paragraph(`${group.heading} (${items.length})`, { size: 15, color: ACCENT });
    paragraph(group.note, { color: MUTED });
    if (!items.length) paragraph('None recorded.', { color: MUTED, gap: 5 });
    for (const item of items) {
      ensureRoom(26);
      paragraph(`${item.id} | Section: ${item.sectionId}`, { size: 9, color: MUTED, gap: 1 });
      paragraph(item.question, { size: 12 });
      paragraph(`Answer: ${item.label}`);
      if (item.details.length) {
        const label = item.answer === 'na' ? 'Reason for exclusion:' : item.answer === 'yes' ? 'Implementation details:' : 'Recorded context:';
        paragraph(label, { color: MUTED, gap: 1 });
        for (const detail of item.details) paragraph(detail);
      }
      if (item.answer === 'no' && item.guidance) paragraph(`Recommended action: ${item.guidance}`);
      if (item.answer === 'unsure' && item.verify) paragraph(`How to verify: ${item.verify}`);
      for (const error of item.errors) paragraph(`Needs completion: ${error}`, { color: '#813c20' });
      paragraph(`Toolkit guidance: ${item.source.label}`, { color: ACCENT, url: toolkitUrl(item.source), gap: 6 });
    }
    y += 3;
  }

  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);
    doc.setDrawColor(LIME).setLineWidth(0.3);
    doc.line(MARGIN, height - 18, width - MARGIN, height - 18);
    doc.setFontSize(8).setTextColor(MUTED);
    doc.text('iHUB | Self-reported assessment, not certification', MARGIN, height - 12);
    doc.text(`Page ${page} of ${pages}`, width - MARGIN, height - 12, { align: 'right' });
  }
  const project = report.project.normalize('NFKD').replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  const date = Number.isNaN(generated.getTime()) ? '' : `-${generated.toISOString().slice(0, 10)}`;
  await doc.save(`iHUB-assessment${project ? `-${project}` : ''}${date}.pdf`, { returnPromise: true });
}