import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <span className="material-icons text-primary text-2xl">accessibility_new</span>
            </div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white tracking-tight">Toolkit</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">About</Link>
            <Link to="/resources" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Resources</Link>
          </nav>
          {/* Mobile menu button placeholder (optional) */}
          <div className="md:hidden">
            <button className="text-slate-500 hover:text-primary p-2">
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;