import React, { memo } from 'react';

const baseStyles = 'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

const variantClasses = {
  primary: 'bg-brand-primary text-white hover:bg-interactive-primary-hover',
  secondary: 'bg-bg-secondary dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary border border-border-primary dark:border-dark-border-primary',
  outline: 'border border-border-primary dark:border-dark-border-primary text-text-primary dark:text-dark-text-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  ghost: 'text-text-primary dark:text-dark-text-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary',
  gradient: 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-interactive-primary-hover hover:to-brand-secondary text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
};

const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  children,
  ...rest
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const classes = [baseStyles, sizeClasses[size], variantClasses[variant], widthClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} disabled={rest.disabled || loading} {...rest}>
      {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
      {loading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
      {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default memo(Button);
