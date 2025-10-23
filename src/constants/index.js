// App-wide constants
export const APP_CONFIG = {
  NAME: 'EasySplit',
  VERSION: '1.0.0',
  DESCRIPTION: 'Split expenses among friends, colleagues, and any group',
};

// Currency configuration
export const CURRENCY = {
  DEFAULT: 'USD',
  SYMBOL: '$',
  LOCALE: 'en-US',
};

// Theme configuration
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  STORAGE_KEY: 'easy_split_theme',
};

// Split types
export const SPLIT_TYPES = {
  EQUAL: 'equal',
  WEIGHTED: 'weighted',
};

// Expense status
export const EXPENSE_STATUS = {
  SETTLED: 'settled',
  UNSETTLED: 'unsettled',
};

// Filter options
export const FILTER_OPTIONS = {
  ALL: 'all',
  SETTLED: 'settled',
  UNSETTLED: 'unsettled',
};

// Modal sizes
export const MODAL_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  DANGER: 'danger',
  GHOST: 'ghost',
  GRADIENT: 'gradient',
};

// Button sizes
export const BUTTON_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  AMOUNT_INVALID: 'Please enter a valid amount',
  AMOUNT_MIN: 'Amount must be greater than 0',
  NAME_MIN: 'Name must be at least 2 characters',
  NAME_MAX: 'Name must be less than 50 characters',
  EMAIL_MAX: 'Email must be less than 100 characters',
  DESCRIPTION_MAX: 'Description must be less than 200 characters',
  WEIGHT_MIN: 'Weight must be at least 0.1',
  WEIGHT_MAX: 'Weight must be less than 100',
};

// Default values
export const DEFAULTS = {
  SPLIT_TYPE: SPLIT_TYPES.EQUAL,
  WEIGHT: 1,
  MIN_WEIGHT: 0.1,
  MAX_WEIGHT: 100,
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 999999.99,
};

// Persist config

// API endpoints (for future use)
export const API_ENDPOINTS = {
  EXPENSES: '/api/expenses',
  PEOPLE: '/api/people',
  BALANCES: '/api/balances',
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  FULL: 'MMMM dd, yyyy',
  TIME: 'h:mm a',
  DATETIME: 'MMM dd, yyyy h:mm a',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Animation durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints (for responsive design)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};
