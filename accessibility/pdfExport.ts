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

function addCanvasToPdf(doc: import('jspdf').jsPDF, canvas: HTMLCanvasElement, isFirstPage: boolean): void {
  const pageWidth = A4_WIDTH_MM - MARGIN_MM * 2;
  const pageHeight = A4_HEIGHT_MM - MARGIN_MM * 2;

  const pxPerMm = canvas.width / pageWidth;
  const renderedPageHeightPx = pageHeight * pxPerMm;
  const totalPages = Math.ceil(canvas.height / renderedPageHeightPx);

  for (let i = 0; i < totalPages; i += 1) {
    if (i > 0 || !isFirstPage) doc.addPage();
    const slice = document.createElement('canvas');
    slice.width = canvas.width;
    slice.height = Math.min(renderedPageHeightPx, canvas.height - i * renderedPageHeightPx);
    const ctx = slice.getContext('2d')!;
    ctx.drawImage(
      canvas,
      0, i * renderedPageHeightPx,
      canvas.width, slice.height,
      0, 0,
      canvas.width, slice.height,
    );
    const dataUrl = slice.toDataURL('image/png');
    const renderedSliceHeightMm = slice.height / pxPerMm;
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
// Used for the "download the whole toolkit" action — each guide becomes a
// titled section, paginated end-to-end.
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
  let first = true;
  for (let index = 0; index < sections.length; index += 1) {
    const { element, title } = sections[index];
    onProgress?.(`Capturing ${title} (${index + 1}/${sections.length})…`);
    const canvas = await withHiddenChrome(() => captureToCanvas(element, html2canvas));
    if (!first) doc.addPage();
    if (title) {
      doc.setFontSize(20);
      doc.setTextColor(36, 36, 35);
      doc.text(title, MARGIN_MM, MARGIN_MM + 8);
      // Reserve ~18mm for the section title above the captured image.
      const pageWidth = A4_WIDTH_MM - MARGIN_MM * 2;
      const pageHeight = A4_HEIGHT_MM - MARGIN_MM * 2 - 18;
      const pxPerMm = canvas.width / pageWidth;
      const renderedPageHeightPx = pageHeight * pxPerMm;
      const totalPages = Math.ceil(canvas.height / renderedPageHeightPx);
      for (let i = 0; i < totalPages; i += 1) {
        if (i > 0) doc.addPage();
        const slice = document.createElement('canvas');
        slice.width = canvas.width;
        slice.height = Math.min(renderedPageHeightPx, canvas.height - i * renderedPageHeightPx);
        const ctx = slice.getContext('2d')!;
        ctx.drawImage(
          canvas,
          0, i * renderedPageHeightPx,
          canvas.width, slice.height,
          0, 0,
          canvas.width, slice.height,
        );
        const dataUrl = slice.toDataURL('image/png');
        const renderedSliceHeightMm = slice.height / pxPerMm;
        doc.addImage(dataUrl, 'PNG', MARGIN_MM, MARGIN_MM + 18, pageWidth, renderedSliceHeightMm);
      }
    } else {
      addCanvasToPdf(doc, canvas, first);
    }
    first = false;
  }
  onProgress?.('Saving toolkit…');
  doc.save(`${slugify(filename)}.pdf`);
  onProgress?.('Saved');
}
