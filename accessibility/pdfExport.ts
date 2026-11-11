// Shared PDF export helpers built on jsPDF + html2canvas.
//
// html2canvas clones the source element into an off-screen iframe, so it does
// not move the live DOM. We capture at 2x scale for crisp text, then slice the
// resulting canvas into A4 pages. Material Icons and custom fonts render
// through the cloned document's stylesheet, so they appear in the PDF too.
//
// jsPDF and html2canvas are loaded dynamically so they only ship to users who
// actually trigger an export — keeping the landing page bundle small.

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

async function captureToCanvas(element: HTMLElement, html2canvas: typeof import('html2canvas-pro')['default']): Promise<HTMLCanvasElement> {
  return html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: getComputedStyle(document.body).backgroundColor || '#ffffff',
    // Ignore elements that are only meaningful on screen (the floating back /
    // next buttons, the reading-tools toolbar, the print toolbar itself).
    ignoreElements: el =>
      el.closest('.pdf-ignore, .reading-tools, .floating-back-button, .floating-nav-button, [data-floating-nav]') !== null,
  });
}

// Find a Y near targetY where the canvas row is mostly background, so page
// breaks land in whitespace rather than slicing through text. The background
// color is sampled from the bottom edge of the canvas (below all content),
// which html2canvas fills with the configured backgroundColor. We search a
// window both above and below the target and pick the closest uniform row.
function findSafeBreakY(canvas: HTMLCanvasElement, targetY: number, maxSearchPx: number): number {
  if (targetY <= 0 || targetY >= canvas.height) return targetY;
  const ctx = canvas.getContext('2d')!;
  // Sample the background color from the very bottom row (pure fill, no content).
  const bg = ctx.getImageData(0, Math.max(0, canvas.height - 1), canvas.width, 1).data;
  const bgR = bg[0], bgG = bg[1], bgB = bg[2];
  const tolerance = 14;
  const sampleStep = 4; // sample every 4th pixel for speed
  const minBgFraction = 0.92;

  const startY = Math.max(0, targetY - maxSearchPx);
  const endY = Math.min(canvas.height, targetY + maxSearchPx);
  const imageData = ctx.getImageData(0, startY, canvas.width, endY - startY);
  const data = imageData.data;
  const width = canvas.width;

  let bestY = targetY;
  let bestDistance = Infinity;
  for (let y = 0; y < endY - startY; y += 1) {
    let bgCount = 0;
    let totalCount = 0;
    for (let x = 0; x < width; x += sampleStep) {
      const idx = (y * width + x) * 4;
      totalCount += 1;
      if (
        Math.abs(data[idx] - bgR) <= tolerance &&
        Math.abs(data[idx + 1] - bgG) <= tolerance &&
        Math.abs(data[idx + 2] - bgB) <= tolerance
      ) {
        bgCount += 1;
      }
    }
    if (totalCount > 0 && bgCount / totalCount >= minBgFraction) {
      const distance = Math.abs(startY + y - targetY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestY = startY + y;
      }
    }
  }
  return bestY;
}

function addCanvasToPdf(doc: import('jspdf').jsPDF, canvas: HTMLCanvasElement, isFirstPage: boolean): void {
  const pageWidth = A4_WIDTH_MM - MARGIN_MM * 2;
  const pageHeight = A4_HEIGHT_MM - MARGIN_MM * 2;

  const pxPerMm = canvas.width / pageWidth;
  // Reserve a ~8mm bottom margin by targeting slightly less than the full
  // page height; the whitespace-aware break then lands just above a gap,
  // giving each page a natural bottom margin so words are never clipped.
  const targetPageHeightPx = Math.floor((pageHeight - 8) * pxPerMm);
  // Search ±18% of the target height for a safe (whitespace) break row.
  const searchWindow = Math.floor(targetPageHeightPx * 0.18);

  let cursorY = 0;
  let pageIndex = 0;
  while (cursorY < canvas.height) {
    const needsNewPage = !(isFirstPage && pageIndex === 0);
    if (needsNewPage) doc.addPage();

    const idealEnd = cursorY + targetPageHeightPx;
    let endY = Math.min(idealEnd, canvas.height);
    // For interior breaks, snap to the nearest whitespace row.
    if (endY < canvas.height) {
      const safe = findSafeBreakY(canvas, idealEnd, searchWindow);
      // Guard against zero-progress loops: never break above the cursor.
      if (safe > cursorY) endY = safe;
    }

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

    cursorY = endY;
    pageIndex += 1;
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
