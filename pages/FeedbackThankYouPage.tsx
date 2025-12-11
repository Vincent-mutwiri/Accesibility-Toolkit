import React from 'react';
import { Link } from 'react-router-dom';

const FeedbackThankYouPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-12 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-icons text-4xl text-green-600 dark:text-green-400">check_circle</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-6">Thank You!</h1>
          <p className="text-xl text-subtle-light dark:text-subtle-dark mb-8">
            Thank you for helping us improve the Accessibility Toolkit. Your feedback is invaluable in making our tools more effective and inclusive.
          </p>
        </div>
        
        <Link 
          to="/"
          className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          <span className="material-icons mr-2">home</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default FeedbackThankYouPage;