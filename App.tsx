import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ManagementSystemsPage from './pages/ManagementSystemsPage';
import OnlineLearningPage from './pages/OnlineLearningPage';
import DigitalLearningPage from './pages/DigitalLearningPage';
import TutoringPage from './pages/TutoringPage';
import STEAMPage from './pages/STEAMPage';
import WorkforcePage from './pages/WorkforcePage';
import AboutPage from './pages/AboutPage';
import ResourcesPage from './pages/ResourcesPage';
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
  return (
    <HashRouter>
      <ScrollToTopHelper />
      <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/management-systems" element={<ManagementSystemsPage />} />
            <Route path="/online-learning" element={<OnlineLearningPage />} />
            <Route path="/digital-learning" element={<DigitalLearningPage />} />
            <Route path="/tutoring" element={<TutoringPage />} />
            <Route path="/steam" element={<STEAMPage />} />
            <Route path="/workforce" element={<WorkforcePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;