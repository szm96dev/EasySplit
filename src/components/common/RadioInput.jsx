import React from 'react';
import { Field, ErrorMessage } from 'formik';

const RadioInput = ({ 
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
        <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary">
          {label}
          {required && <span className="text-status-error dark:text-dark-status-error ml-1">*</span>}
        </label>
      )}
      
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <Field
              type="radio"
              name={name}
              value={option.value}
              disabled={disabled}
              className="w-4 h-4 border-border-primary dark:border-dark-border-primary text-brand-primary dark:text-dark-interactive-primary focus:ring-brand-primary dark:focus:ring-dark-interactive-primary flex-shrink-0"
              {...props}
            />
            <span className="text-sm text-text-primary dark:text-dark-text-primary">
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

export default React.memo(RadioInput);
