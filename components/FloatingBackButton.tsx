import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingBackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleBackClick}
      className="fixed bottom-4 left-4 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-3 rounded-full shadow-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
      aria-label="Back to homepage"
    >
      <span className="material-icons text-lg">
        arrow_back
      </span>
    </button>
  );
};

export default FloatingBackButton;