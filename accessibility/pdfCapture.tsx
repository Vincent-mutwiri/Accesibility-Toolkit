// Signals to descendants that a PDF capture is in progress. Components that
// hide interactive state behind toggles (e.g. the collapsible Checklist) read
// this and force their content fully expanded so the captured snapshot shows
// everything. It is also used to surface a PDF-only header (logo + toolkit
// name) at the top of each captured guide.

import React, { createContext, useContext } from 'react';

const PdfCaptureContext = createContext<boolean>(false);

export const PdfCaptureProvider = PdfCaptureContext.Provider;

export function usePdfCapturing(): boolean {
  return useContext(PdfCaptureContext);
}

// Header rendered at the top of each captured guide. Hidden on screen via the
// .pdf-only rule, which reveals it only while <html> carries .pdf-capturing.
// The light-mode logo is forced on so the PDF reads correctly on white.
export const PdfHeader: React.FC<{ title?: string }> = ({ title }) => (
  <header className="pdf-only pdf-header">
    <img src="/logos/ihub-logo.png" alt="iHUB" className="pdf-logo" />
    <div className="pdf-header-text">
      <span className="pdf-header-product">iHUB&rsquo;s EdTech Inclusion Toolkit</span>
      {title && <span className="pdf-header-title">{title}</span>}
    </div>
  </header>
);
