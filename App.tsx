import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LMSPage from './pages/LMSPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/lms" element={<LMSPage />} />
            {/* Placeholder routes for future expansion */}
            <Route path="/steam" element={<LandingPage />} />
            <Route path="/online-learning" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;