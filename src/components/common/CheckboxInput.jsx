import React from 'react';
import { Field, ErrorMessage } from 'formik';

const CheckboxInput = ({ 
  name, 
  label, 
  className = '', 
  required = false,
  disabled = false,
  ...props 
}) => {
  return (
    <div className="space-y-1">
      <label className="flex items-center space-x-2 cursor-pointer">
        <Field
          id={name}
          name={name}
          type="checkbox"
          disabled={disabled}
          className={`w-4 h-4 rounded border-border-primary dark:border-dark-border-primary text-brand-primary dark:text-dark-interactive-primary focus:ring-brand-primary dark:focus:ring-dark-interactive-primary flex-shrink-0 ${className}`}
          {...props}
        />
        
        {label && (
          <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            {label}
            {required && <span className="text-status-error dark:text-dark-status-error ml-1">*</span>}
          </span>
        )}
      </label>
      
      <ErrorMessage 
        name={name} 
        component="div" 
        className="text-status-error dark:text-dark-status-error text-sm" 
      />
    </div>
  );
};

export default CheckboxInput;
