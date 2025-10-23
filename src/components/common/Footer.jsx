import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-bg-card dark:bg-dark-bg-card border-t border-border-primary dark:border-dark-border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">💰</span>
            </div>
            <span className="font-bold text-xl gradient-text">
              EasySplit
            </span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
              © 2024 EasySplit. Split expenses with friends, colleagues, and any group.
            </p>
            <p className="text-text-tertiary dark:text-dark-text-tertiary text-xs mt-1">
              Built with React, Redux, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
