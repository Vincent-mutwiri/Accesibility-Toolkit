import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <img 
    src="/CcHUB logo.png" 
    alt="CcHUB Logo" 
    className="h-10 w-auto mr-3"
  />
);

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card-light dark:bg-card-dark shadow-sm border-b border-border-light dark:border-border-dark sticky top-0 z-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="group-hover:scale-105 transition-transform duration-200">
              <Logo />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight text-text-light dark:text-text-dark">Equity and Inclusion</span>
              <span className="text-xs font-medium tracking-wider text-primary uppercase">Toolkit</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-subtle-light dark:text-subtle-dark hover:text-primary dark:hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/about" className="text-subtle-light dark:text-subtle-dark hover:text-primary dark:hover:text-primary transition-colors font-medium">About</Link>
            <Link to="/resources" className="text-subtle-light dark:text-subtle-dark hover:text-primary dark:hover:text-primary transition-colors font-medium">Resources</Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-subtle-light hover:text-primary p-2 focus:outline-none"
            >
              <span className="material-icons">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-3 rounded-md text-base font-medium text-text-light dark:text-text-dark hover:bg-primary/5 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-3 rounded-md text-base font-medium text-text-light dark:text-text-dark hover:bg-primary/5 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/resources" 
              className="block px-3 py-3 rounded-md text-base font-medium text-text-light dark:text-text-dark hover:bg-primary/5 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <div className="border-t border-border-light dark:border-border-dark my-2"></div>
            <p className="px-3 py-2 text-xs font-semibold text-subtle-light uppercase tracking-wider">Categories</p>
            <Link to="/online-learning" className="block px-3 py-2 text-sm text-subtle-light hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Online Learning</Link>
            <Link to="/digital-learning" className="block px-3 py-2 text-sm text-subtle-light hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Digital Learning</Link>
            <Link to="/tutoring" className="block px-3 py-2 text-sm text-subtle-light hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Tutoring & Prep</Link>
            <Link to="/steam" className="block px-3 py-2 text-sm text-subtle-light hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>STEAM</Link>
            <Link to="/workforce" className="block px-3 py-2 text-sm text-subtle-light hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Workforce</Link>
            <Link to="/management-systems" className="block px-3 py-2 text-sm text-subtle-light hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Management Systems</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;