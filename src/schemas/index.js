import * as Yup from 'yup';
import { 
  VALIDATION_MESSAGES, 
  DEFAULTS, 
  SPLIT_TYPES 
} from '../constants';

// Person validation schema
export const personSchema = Yup.object({
  name: Yup
    .string()
    .min(2, VALIDATION_MESSAGES.NAME_MIN)
    .max(50, VALIDATION_MESSAGES.NAME_MAX)
    .required(VALIDATION_MESSAGES.REQUIRED)
    .trim(),
  email: Yup
    .string()
    .email(VALIDATION_MESSAGES.EMAIL_INVALID)
    .max(100, VALIDATION_MESSAGES.EMAIL_MAX)
    .nullable()
    .transform((value) => value === '' ? null : value),
});

// Expense validation schema
export const expenseSchema = Yup.object({
  amount: Yup
    .number()
    .min(DEFAULTS.MIN_AMOUNT, VALIDATION_MESSAGES.AMOUNT_MIN)
    .max(DEFAULTS.MAX_AMOUNT, VALIDATION_MESSAGES.AMOUNT_INVALID)
    .required(VALIDATION_MESSAGES.REQUIRED)
    .positive(VALIDATION_MESSAGES.AMOUNT_MIN),
  description: Yup
    .string()
    .max(200, VALIDATION_MESSAGES.DESCRIPTION_MAX)
    .required(VALIDATION_MESSAGES.REQUIRED)
    .trim(),
  contributors: Yup
    .array()
    .of(Yup.string())
    .min(1, 'At least one contributor is required')
    .required(VALIDATION_MESSAGES.REQUIRED),
  splitType: Yup
    .string()
    .oneOf([SPLIT_TYPES.EQUAL, SPLIT_TYPES.WEIGHTED], 'Invalid split type')
    .required(VALIDATION_MESSAGES.REQUIRED),
  weights: Yup
    .object()
    .when('splitType', {
      is: SPLIT_TYPES.WEIGHTED,
      then: (schema) => schema.required('Weights are required for weighted split'),
      otherwise: (schema) => schema.optional(),
    }),
});

// Weight validation schema (for individual weights)
export const weightSchema = Yup
  .number()
  .min(DEFAULTS.MIN_WEIGHT, VALIDATION_MESSAGES.WEIGHT_MIN)
  .max(DEFAULTS.MAX_WEIGHT, VALIDATION_MESSAGES.WEIGHT_MAX)
  .required(VALIDATION_MESSAGES.REQUIRED);

// Search/filter validation schema
export const searchSchema = Yup.object({
  query: Yup
    .string()
    .max(100, 'Search query must be less than 100 characters')
    .trim(),
  filter: Yup
    .string()
    .oneOf(['all', 'settled', 'unsettled'], 'Invalid filter option'),
  sortBy: Yup
    .string()
    .oneOf(['date', 'amount', 'description'], 'Invalid sort option'),
  sortOrder: Yup
    .string()
    .oneOf(['asc', 'desc'], 'Invalid sort order'),
});

// Settings validation schema (for future use)
export const settingsSchema = Yup.object({
  currency: Yup
    .string()
    .oneOf(['USD', 'EUR', 'GBP', 'CAD'], 'Invalid currency')
    .required(VALIDATION_MESSAGES.REQUIRED),
  dateFormat: Yup
    .string()
    .oneOf(['MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd'], 'Invalid date format')
    .required(VALIDATION_MESSAGES.REQUIRED),
  theme: Yup
    .string()
    .oneOf(['light', 'dark', 'auto'], 'Invalid theme')
    .required(VALIDATION_MESSAGES.REQUIRED),
});

// Export validation schemas
export const validationSchemas = {
  person: personSchema,
  expense: expenseSchema,
  weight: weightSchema,
  search: searchSchema,
  settings: settingsSchema,
};

// Helper functions for validation
export const validatePerson = (data) => {
  return personSchema.validate(data, { abortEarly: false });
};

export const validateExpense = (data) => {
  return expenseSchema.validate(data, { abortEarly: false });
};

export const validateWeight = (value) => {
  return weightSchema.validate(value);
};

// Custom validation functions
export const validateWeights = (weights, contributors) => {
  const errors = {};
  
  contributors.forEach(personId => {
    const weight = weights[personId];
    if (!weight || weight < DEFAULTS.MIN_WEIGHT) {
      errors[personId] = VALIDATION_MESSAGES.WEIGHT_MIN;
    } else if (weight > DEFAULTS.MAX_WEIGHT) {
      errors[personId] = VALIDATION_MESSAGES.WEIGHT_MAX;
    }
  });
  
  return Object.keys(errors).length === 0 ? null : errors;
};

export const validateContributors = (contributors, people) => {
  if (!contributors || contributors.length === 0) {
    return 'At least one contributor is required';
  }
  
  const validPersonIds = people.map(p => p.id);
  const invalidIds = contributors.filter(id => !validPersonIds.includes(id));
  
  if (invalidIds.length > 0) {
    return 'Some selected contributors are no longer valid';
  }
  
  return null;
};

// Form validation helpers
export const getFieldError = (errors, fieldName) => {
  return errors[fieldName] || null;
};

export const hasFieldError = (errors, fieldName) => {
  return !!errors[fieldName];
};

export const getFormErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
