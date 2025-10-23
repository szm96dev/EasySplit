import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div className={`relative w-full ${sizeClasses[size]} transform overflow-hidden rounded-xl sm:rounded-2xl bg-bg-primary dark:bg-dark-bg-primary shadow-2xl transition-all`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border-primary dark:border-dark-border-primary">
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary rounded-lg transition-colors"
            >
              <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
