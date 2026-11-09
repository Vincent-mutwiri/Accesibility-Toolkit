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

// Helper to scroll to top on route change
const ScrollToTopHelper = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = mediaQuery.matches;

      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Restore preferences on every entry route, not only on the settings page.
    applyTheme();
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize && ['small', 'medium', 'large', 'extra-large'].includes(fontSize)) {
      document.documentElement.setAttribute('data-font-size', fontSize);
    }
    for (const [key, className] of [['highContrast', 'high-contrast'], ['reducedMotion', 'reduced-motion'], ['screenReader', 'screen-reader-optimized']]) {
      document.documentElement.classList.toggle(className, localStorage.getItem(key) === 'true');
    }

    // Listen for system changes
    const handleChange = () => {
      if (!localStorage.getItem('theme')) {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <HashRouter>
      <ScrollToTopHelper />
      <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <a href="#main-content" className="skip-link" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          <React.Suspense fallback={<div className="site-container py-16" role="status">Loading guide…</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/references" element={<ReferencesPage />} />
            <Route path="/management-systems" element={<ManagementSystemsPage />} />
            <Route path="/online-learning" element={<OnlineLearningPage />} />
            <Route path="/digital-learning" element={<DigitalLearningPage />} />
            <Route path="/tutoring" element={<TutoringPage />} />
            <Route path="/steam" element={<STEAMPage />} />
            <Route path="/workforce" element={<WorkforcePage />} />
            <Route path="/lms" element={<LMSPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/feedback/thank-you" element={<FeedbackThankYouPage />} />
            <Route path="/visual-impairment" element={<VisualImpairmentPage />} />
            <Route path="/intellectual-developmental-disabilities" element={<IntellectualDevelopmentalDisabilitiesPage />} />
            <Route path="/hearing-impairment" element={<HearingImpairmentPage />} />
            <Route path="/dual-sensory-loss" element={<DualSensoryLossPage />} />
          </Routes>
          </React.Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;