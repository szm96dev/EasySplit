import React from 'react';
import { Field, ErrorMessage } from 'formik';

const Input = ({ 
  name, 
  type = 'text', 
  label, 
  placeholder, 
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
      
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`input w-full ${className}`}
        {...props}
      />
      
      <ErrorMessage 
        name={name} 
        component="div" 
        className="text-status-error dark:text-dark-status-error text-sm" 
      />
    </div>
  );
};

export default React.memo(Input);
