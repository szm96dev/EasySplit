import React from 'react';
import { Field, ErrorMessage } from 'formik';

const MultiSelectInput = ({ 
  name, 
  label, 
  options = [], 
  className = '', 
  required = false,
  disabled = false,
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-text-primary dark:text-dark-text-primary"
        >
          {label}
          {required && <span className="text-status-error dark:text-dark-status-error ml-1">*</span>}
        </label>
      )}
      
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary cursor-pointer w-fit">
            <Field
              type="checkbox"
              name={name}
              value={option.value}
              disabled={disabled}
              className="w-4 h-4 rounded border-border-primary dark:border-dark-border-primary text-brand-primary dark:text-dark-interactive-primary focus:ring-brand-primary dark:focus:ring-dark-interactive-primary flex-shrink-0"
              {...props}
            />
            <span className="text-sm text-text-primary dark:text-dark-text-primary whitespace-nowrap">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      
      <ErrorMessage 
        name={name} 
        component="div" 
        className="text-status-error dark:text-dark-status-error text-sm" 
      />
    </div>
  );
};

export default React.memo(MultiSelectInput);
