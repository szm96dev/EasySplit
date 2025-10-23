import React from 'react';
import { Field, ErrorMessage } from 'formik';

const SelectInput = ({ 
  name, 
  label, 
  options = [], 
  placeholder = 'Select an option',
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
        as="select"
        id={name}
        name={name}
        disabled={disabled}
        className={`input w-full ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      
      <ErrorMessage 
        name={name} 
        component="div" 
        className="text-status-error dark:text-dark-status-error text-sm" 
      />
    </div>
  );
};

export default SelectInput;
