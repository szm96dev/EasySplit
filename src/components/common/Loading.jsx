import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary dark:border-dark-interactive-primary mb-4"></div>
        <p className="text-text-secondary dark:text-dark-text-secondary">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
