import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormInput = ({ 
  name, 
  type = 'text', 
  label, 
  placeholder, 
  options = [],
  min, 
  max, 
  step = '0.01',
  className = '', 
  required = false,
  disabled = false,
  ...props 
}) => {
  const renderInput = () => {
    if (type === 'select') {
      return (
        <Field
          as="select"
          id={name}
          name={name}
          disabled={disabled}
          className={`input w-full ${className}`}
          {...props}
        >
          <option value="" disabled>
            {placeholder || 'Select an option'}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      );
    }

    return (
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={`input w-full ${className}`}
        {...props}
      />
    );
  };

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
      
      {renderInput()}
      
      <ErrorMessage 
        name={name} 
        component="div" 
        className="text-status-error dark:text-dark-status-error text-sm" 
      />
    </div>
  );
};

export default React.memo(FormInput);
