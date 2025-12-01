import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-subtle-light dark:text-subtle-dark text-sm">
        <p>© {new Date().getFullYear()} Accessibility Toolkit. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;