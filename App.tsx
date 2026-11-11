import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ManagementSystemsPage = React.lazy(() => import('./pages/ManagementSystemsPage'));
const OnlineLearningPage = React.lazy(() => import('./pages/OnlineLearningPage'));
const DigitalLearningPage = React.lazy(() => import('./pages/DigitalLearningPage'));
const TutoringPage = React.lazy(() => import('./pages/TutoringPage'));
const STEAMPage = React.lazy(() => import('./pages/STEAMPage'));
const WorkforcePage = React.lazy(() => import('./pages/WorkforcePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage'));
const ReferencesPage = React.lazy(() => import('./pages/ReferencesPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const LMSPage = React.lazy(() => import('./pages/LMSPage'));
const FeedbackPage = React.lazy(() => import('./pages/FeedbackPage'));
const FeedbackThankYouPage = React.lazy(() => import('./pages/FeedbackThankYouPage'));
const VisualImpairmentPage = React.lazy(() => import('./pages/VisualImpairmentPage'));
const IntellectualDevelopmentalDisabilitiesPage = React.lazy(() => import('./pages/IntellectualDevelopmentalDisabilitiesPage'));
const HearingImpairmentPage = React.lazy(() => import('./pages/HearingImpairmentPage'));
const DualSensoryLossPage = React.lazy(() => import('./pages/DualSensoryLossPage'));
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { AccessibilityProvider } from './accessibility/Preferences';
import ReadingRuler from './accessibility/ReadingRuler';
import Guide from './accessibility/Guide';

// Inside Suspense: run only after the new route's content has committed.
function RouteAccessibility({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  React.useLayoutEffect(function focusLoadedPage() {
    // Wait past the hash navigation's native focus/scroll handling and any
    // lazy fallback. A hidden previous page must never receive focus.
    let frame = 0;
    const main = document.getElementById('main-content')!;
    const focus = () => {
      const heading = main.querySelector<HTMLElement>('h1');
      if (!heading?.getClientRects().length) return;
      document.title = `${heading.textContent?.trim()} | iHUB Inclusion Toolkit`;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      window.scrollTo(0, 0);
      observer.disconnect();
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(focus); };
    const observer = new MutationObserver(schedule);
    observer.observe(main, { childList: true, subtree: true });
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [pathname]);
  return <>{children}</>;
}

function RouteView({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return <React.Suspense key={pathname} fallback={<div className="site-container py-16" role="status">Loading guide…</div>}>
    <RouteAccessibility>{children}</RouteAccessibility>
  </React.Suspense>;
}

const App: React.FC = () => {
  return (
    <AccessibilityProvider><HashRouter>
      <ReadingRuler />
      <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <a href="#main-content" className="skip-link" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          <RouteView>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/references" element={<ReferencesPage />} />
            <Route path="/management-systems" element={<Guide key="ManagementSystemsPage"><ManagementSystemsPage /></Guide>} />
            <Route path="/online-learning" element={<Guide key="OnlineLearningPage"><OnlineLearningPage /></Guide>} />
            <Route path="/digital-learning" element={<Guide key="DigitalLearningPage"><DigitalLearningPage /></Guide>} />
            <Route path="/tutoring" element={<Guide key="TutoringPage"><TutoringPage /></Guide>} />
            <Route path="/steam" element={<Guide key="STEAMPage"><STEAMPage /></Guide>} />
            <Route path="/workforce" element={<Guide key="WorkforcePage"><WorkforcePage /></Guide>} />
            <Route path="/lms" element={<Guide key="LMSPage"><LMSPage /></Guide>} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/feedback/thank-you" element={<FeedbackThankYouPage />} />
            <Route path="/visual-impairment" element={<Guide key="VisualImpairmentPage"><VisualImpairmentPage /></Guide>} />
            <Route path="/intellectual-developmental-disabilities" element={<Guide key="IntellectualDevelopmentalDisabilitiesPage"><IntellectualDevelopmentalDisabilitiesPage /></Guide>} />
            <Route path="/hearing-impairment" element={<Guide key="HearingImpairmentPage"><HearingImpairmentPage /></Guide>} />
            <Route path="/dual-sensory-loss" element={<Guide key="DualSensoryLossPage"><DualSensoryLossPage /></Guide>} />
          </Routes>
          </RouteView>
        </main>
        <Footer />
      </div>
    </HashRouter></AccessibilityProvider>
  );
};

export default App;
