// Renders every guide page off-screen so the "Download the whole toolkit"
// button can capture them into a single combined PDF. The pages mount inside
// the live Router (they use <Link> and useNavigate), but live in a container
// parked far off the viewport so they never appear on screen.

import React, { useState } from 'react';
import { downloadElementsAsPdf } from './pdfExport';

// Guide pages are imported eagerly (not lazy) so they are guaranteed to be
// mounted and measurable when the capture runs.
import ManagementSystemsPage from '../pages/ManagementSystemsPage';
import OnlineLearningPage from '../pages/OnlineLearningPage';
import DigitalLearningPage from '../pages/DigitalLearningPage';
import TutoringPage from '../pages/TutoringPage';
import STEAMPage from '../pages/STEAMPage';
import WorkforcePage from '../pages/WorkforcePage';
import LMSPage from '../pages/LMSPage';
import VisualImpairmentPage from '../pages/VisualImpairmentPage';
import IntellectualDevelopmentalDisabilitiesPage from '../pages/IntellectualDevelopmentalDisabilitiesPage';
import HearingImpairmentPage from '../pages/HearingImpairmentPage';
import DualSensoryLossPage from '../pages/DualSensoryLossPage';

const guides: { title: string; Component: React.ComponentType }[] = [
  { title: 'Management Systems', Component: ManagementSystemsPage },
  { title: 'Online Learning', Component: OnlineLearningPage },
  { title: 'Digital Learning', Component: DigitalLearningPage },
  { title: 'Tutoring & Test Prep', Component: TutoringPage },
  { title: 'STEAM', Component: STEAMPage },
  { title: 'Workforce & Skills', Component: WorkforcePage },
  { title: 'LMS', Component: LMSPage },
  { title: 'Visual Impairment', Component: VisualImpairmentPage },
  { title: 'Intellectual & Developmental Disabilities', Component: IntellectualDevelopmentalDisabilitiesPage },
  { title: 'Hearing Impairment', Component: HearingImpairmentPage },
  { title: 'Dual Sensory Loss', Component: DualSensoryLossPage },
];

type Props = {
  className?: string;
  label?: string;
};

const ToolkitDownloadButton: React.FC<Props> = ({ className, label = 'Download the whole toolkit' }) => {
  const [active, setActive] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [status, setStatus] = useState('');

  const download = async () => {
    if (exporting) return;
    // Mount the off-screen surface, wait two frames for React to commit and
    // for fonts/images to settle, then capture. Tear down afterwards.
    setActive(true);
    setExporting(true);
    setStatus('Preparing guides…');
    await new Promise(resolve => requestAnimationFrame(() => resolve(null)));
    await new Promise(resolve => requestAnimationFrame(() => resolve(null)));
    try {
      const container = document.querySelector<HTMLElement>('[data-toolkit-export-surface]');
      if (!container) {
        setStatus('Nothing to export.');
        return;
      }
      const sections = Array.from(container.querySelectorAll<HTMLElement>('[data-toolkit-section]'))
        .map(node => {
          const title = node.getAttribute('data-toolkit-section') || '';
          return { element: node, title };
        });
      await downloadElementsAsPdf(sections, 'iHUB-EdTech-Inclusion-Toolkit', setStatus);
    } catch (error) {
      console.error('Toolkit PDF export failed', error);
      setStatus('Could not build the PDF. Please try again.');
    } finally {
      setExporting(false);
      setStatus(current => (current.startsWith('Could not') ? current : ''));
      setTimeout(() => setActive(false), 1500);
    }
  };

  return (
    <>
      <button
        type="button"
        className={className || 'pdf-button'}
        onClick={download}
        disabled={exporting}
      >
        <span className="material-icons" aria-hidden="true">{exporting ? 'hourglass_empty' : 'picture_as_pdf'}</span>
        <span>{exporting ? (status || 'Preparing…') : label}</span>
      </button>
      {exporting && status && (
        <p className="export-status" role="status" aria-atomic="true">{status}</p>
      )}
      {active && (
        <div
          aria-hidden="true"
          data-toolkit-export-surface
          style={{
            position: 'fixed',
            left: '-99999px',
            top: 0,
            width: '820px',
            pointerEvents: 'none',
            opacity: 0,
            zIndex: -1,
          }}
        >
          {/* The surface renders with the toolkit's own layout context so the
              guide pages look exactly as they do on screen. */}
          <div style={{ background: '#ffffff', color: '#242423' }}>
            {guides.map(({ title, Component }) => (
              <section key={title} data-toolkit-section={title} style={{ padding: '24px 32px' }}>
                <Component />
              </section>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ToolkitDownloadButton;
