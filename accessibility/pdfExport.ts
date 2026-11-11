// Shared PDF export helpers built on jsPDF + html2canvas.
//
// html2canvas clones the source element into an off-screen iframe, so it does
// not move the live DOM. We capture at 2x scale for crisp text, then slice the
// resulting canvas into A4 pages. Material Icons and custom fonts render
// through the cloned document's stylesheet, so they appear in the PDF too.
//
// jsPDF and html2canvas are loaded dynamically so they only ship to users who
// actually trigger an export — keeping the landing page bundle small.

import { planPageSlices, type VerticalRange } from './pdfPagination';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 10;

export type PdfProgress = (status: string) => void;

async function loadLibs() {
  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas-pro'),
  ]);
  return { jsPDF, html2canvas };
}

function slugify(text: string): string {
  return text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'guide';
}

function deriveTitleFrom(element: HTMLElement): string {
  const heading = element.querySelector('h1, h2');
  if (heading?.textContent?.trim()) return heading.textContent.trim();
  return document.title.replace(/\s*\|\s*iHUB.*$/i, '').trim() || 'guide';
}

// Hide elements that should never appear in the PDF (floating buttons, toolbars)
// while the capture runs. We toggle a class on <html> so a single CSS rule covers
// everything, including descendants of the cloned subtree.
async function withHiddenChrome<T>(action: () => Promise<T>): Promise<T> {
  const root = document.documentElement;
  root.classList.add('pdf-capturing');
  // Let the layout settle before html2canvas takes its snapshot.
  await new Promise(resolve => requestAnimationFrame(() => resolve(null)));
  try {
    return await action();
  } finally {
    root.classList.remove('pdf-capturing');
  }
}

interface Capture { canvas: HTMLCanvasElement; protectedRanges: VerticalRange[]; }

// Measure actual text lines, controls and checklist rows while the same
// expanded/PDF-only layout is visible to html2canvas. Colours and the amount
// of whitespace surrounding a word do not affect these boundaries.
function collectProtectedRanges(element: HTMLElement): { height: number; ranges: VerticalRange[] } {
  const origin = element.getBoundingClientRect();
  const ranges: VerticalRange[] = [];
  const add = (rect: DOMRect) => {
    if (!rect.width || !rect.height) return;
    ranges.push({ start: rect.top - origin.top - 2, end: rect.bottom - origin.top + 2 });
  };
  const ignored = '.pdf-ignore, .guide-export, .reading-tools, [hidden], [aria-hidden="true"]';
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!node.textContent?.trim() || !parent || parent.closest(ignored)) continue;
    const style = getComputedStyle(parent);
    if (style.visibility === 'hidden' || style.display === 'none') continue;
    const textRange = document.createRange();
    textRange.selectNodeContents(node);
    for (const rect of textRange.getClientRects()) add(rect);
  }
  for (const item of element.querySelectorAll<HTMLElement>('label, li:has(input[type="checkbox"]), h1, h2, h3, h4, h5, h6, img, input, [data-pdf-keep-together]')) {
    if (!item.closest(ignored)) add(item.getBoundingClientRect());
  }
  return { height: origin.height, ranges };
}

async function captureToCanvas(element: HTMLElement, html2canvas: typeof import('html2canvas-pro')['default']): Promise<Capture> {
  await document.fonts.ready;
  const measured = collectProtectedRanges(element);
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: getComputedStyle(document.body).backgroundColor || '#ffffff',
    // Ignore elements that are only meaningful on screen (the floating back /
    // next buttons, the reading-tools toolbar, the print toolbar itself).
    ignoreElements: el =>
      el.closest('.pdf-ignore, .reading-tools, .floating-back-button, .floating-nav-button, [data-floating-nav]') !== null,
  });
  const scale = canvas.height / measured.height;
  return { canvas, protectedRanges: measured.ranges.map(range => ({ start: range.start * scale, end: range.end * scale })) };
}

function addCanvasToPdf(doc: import('jspdf').jsPDF, capture: Capture, isFirstPage: boolean): void {
  const { canvas, protectedRanges } = capture;
  const pageWidth = A4_WIDTH_MM - MARGIN_MM * 2;
  const pageHeight = A4_HEIGHT_MM - MARGIN_MM * 2;

  const pxPerMm = canvas.width / pageWidth;
  const maxPageHeightPx = Math.floor((pageHeight - 8) * pxPerMm);
  const slices = planPageSlices(canvas.height, maxPageHeightPx, protectedRanges);
  for (const [pageIndex, { start: cursorY, end: endY }] of slices.entries()) {
    if (!(isFirstPage && pageIndex === 0)) doc.addPage();

    const sliceHeight = endY - cursorY;
    const slice = document.createElement('canvas');
    slice.width = canvas.width;
    slice.height = sliceHeight;
    const ctx = slice.getContext('2d')!;
    ctx.drawImage(
      canvas,
      0, cursorY,
      canvas.width, sliceHeight,
      0, 0,
      canvas.width, sliceHeight,
    );
    const dataUrl = slice.toDataURL('image/png');
    const renderedSliceHeightMm = sliceHeight / pxPerMm;
    doc.addImage(dataUrl, 'PNG', MARGIN_MM, MARGIN_MM, pageWidth, renderedSliceHeightMm);

  }
}

// Capture a single DOM element and save it as a multi-page A4 PDF.
export async function downloadElementAsPdf(
  element: HTMLElement,
  filename?: string,
  onProgress?: PdfProgress,
): Promise<void> {
  onProgress?.('Preparing document…');
  const { jsPDF, html2canvas } = await loadLibs();
  const canvas = await withHiddenChrome(() => captureToCanvas(element, html2canvas));
  onProgress?.('Rendering pages…');
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  addCanvasToPdf(doc, canvas, true);
  const name = `${slugify(filename || deriveTitleFrom(element))}.pdf`;
  doc.save(name);
  onProgress?.('Saved');
}

// Capture several elements sequentially into a single combined PDF.
// Used for the "download the whole toolkit" action — each guide is captured
// with its own PDF header (logo + title) already in the rendered content, so
// each section is simply paginated end-to-end. `title` is only used for the
// status message shown to the user while the capture runs.
export async function downloadElementsAsPdf(
  sections: { element: HTMLElement; title: string }[],
  filename: string,
  onProgress?: PdfProgress,
): Promise<void> {
  if (!sections.length) {
    onProgress?.('Nothing to export');
    return;
  }
  const { jsPDF, html2canvas } = await loadLibs();
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  for (let index = 0; index < sections.length; index += 1) {
    const { element, title } = sections[index];
    onProgress?.(`Capturing ${title} (${index + 1}/${sections.length})…`);
    const canvas = await withHiddenChrome(() => captureToCanvas(element, html2canvas));
    addCanvasToPdf(doc, canvas, index === 0);
  }
  onProgress?.('Saving toolkit…');
  doc.save(`${slugify(filename)}.pdf`);
  onProgress?.('Saved');
}
