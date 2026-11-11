export interface VerticalRange { start: number; end: number; }

// Work in integer canvas pixels. Never move a break below the physical page
// limit: jsPDF would clip the excess while the next page skips those pixels.
export function planPageSlices(height: number, pageHeight: number, protectedRanges: VerticalRange[]): VerticalRange[] {
  const limit = Math.max(1, Math.floor(pageHeight));
  const ranges = protectedRanges
    .map(range => ({ start: Math.max(0, Math.floor(range.start)), end: Math.min(height, Math.ceil(range.end)) }))
    // Oversized containers may span pages, while their individual text lines
    // are still protected by the separate ranges collected from the DOM.
    .filter(range => range.end > range.start && range.end - range.start < limit)
    .sort((a, b) => a.start - b.start);
  const slices: VerticalRange[] = [];
  let start = 0;
  while (start < height) {
    let end = Math.min(start + limit, height);
    if (end < height) {
      // Moving upward may intersect another range (e.g. adjacent columns).
      // Repeat until the break is in a gap rather than inside any item.
      let previous: number;
      do {
        previous = end;
        for (const range of ranges) {
          if (range.start >= end) break;
          if (range.start < end && range.end > end && range.start > start) end = range.start;
        }
      } while (end !== previous);
    }
    slices.push({ start, end });
    start = end;
  }
  return slices;
}
