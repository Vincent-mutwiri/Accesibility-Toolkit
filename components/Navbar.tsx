import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="bg-card-light dark:bg-card-dark shadow-sm border-b border-border-light dark:border-border-dark sticky top-0 z-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="material-icons text-primary text-3xl group-hover:opacity-80 transition-opacity">accessibility_new</span>
            <span className="font-bold text-xl text-text-light dark:text-text-dark">Toolkit</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-subtle-light dark:text-subtle-dark hover:text-primary dark:hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/about" className="text-subtle-light dark:text-subtle-dark hover:text-primary dark:hover:text-primary transition-colors font-medium">About</Link>
            <Link to="/resources" className="text-subtle-light dark:text-subtle-dark hover:text-primary dark:hover:text-primary transition-colors font-medium">Resources</Link>
          </nav>
          {/* Mobile menu button placeholder (optional) */}
          <div className="md:hidden">
            <button className="text-subtle-light hover:text-primary">
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;