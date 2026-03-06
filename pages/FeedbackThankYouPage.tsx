import React from 'react';
import { Link } from 'react-router-dom';
import FloatingBackButton from '../components/FloatingBackButton';

const FeedbackThankYouPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-lg w-full bg-card-light dark:bg-card-dark rounded-2xl p-8 border border-border-light dark:border-border-dark text-center">
        <span className="material-icons text-4xl text-green-600 dark:text-green-400">check_circle</span>
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mt-4">Thanks for your feedback!</h1>
        <p className="text-subtle-light dark:text-subtle-dark mt-3">
          We appreciate you taking the time to help improve the Equity and Inclusion Toolkit.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blue/90"
          >
            Back to Home
          </Link>
          <Link
            to="/feedback"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-gray-50 dark:hover:bg-slate-800"
          >
            Send another response
          </Link>
        </div>
      </div>
      <FloatingBackButton />
    </div>
  );
};

export default FeedbackThankYouPage;
