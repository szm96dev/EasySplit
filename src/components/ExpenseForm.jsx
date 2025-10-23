import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense } from '../store/slices/expensesSlice';
import { updateBalance } from '../store/slices/peopleSlice';
import { calculateEqualSplit, calculateWeightedSplit } from '../utils/calculations';
import { expenseSchema } from '../schemas';
import { SPLIT_TYPES } from '../constants';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { people } = useSelector(state => state.people);
  const [showWeightInputs, setShowWeightInputs] = useState(false);
  const [weights, setWeights] = useState({});

  const initialValues = {
    amount: '',
    description: '',
    contributors: [],
    splitType: 'equal',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      let splits;
      
      if (values.splitType === SPLIT_TYPES.EQUAL) {
        splits = calculateEqualSplit(values.amount, values.contributors);
      } else {
        // For weighted splits, use the weights from state
        const contributorWeights = values.contributors.reduce((acc, personId) => {
          acc[personId] = weights[personId] || 1;
          return acc;
        }, {});
        splits = calculateWeightedSplit(values.amount, values.contributors, contributorWeights);
      }

      const newExpense = {
        amount: parseFloat(values.amount),
        description: values.description,
        contributors: values.contributors,
        splits,
        splitType: values.splitType,
        weights: values.splitType === SPLIT_TYPES.WEIGHTED ? weights : {},
      };

      dispatch(addExpense(newExpense));

      // Update balances
      splits.forEach(split => {
        dispatch(updateBalance({
          personId: split.personId,
          amount: split.amount,
        }));
      });

      resetForm();
      setWeights({});
      setShowWeightInputs(false);
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSplitTypeChange = (value, setFieldValue) => {
    setFieldValue('splitType', value);
    setShowWeightInputs(value === SPLIT_TYPES.WEIGHTED);
  };

  const handleWeightChange = (personId, weight) => {
    setWeights(prev => ({
      ...prev,
      [personId]: parseFloat(weight) || 1,
    }));
  };

  if (people.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Add New Expense
        </h2>
        <div className="text-center py-8">
          <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
            You need to add people first before creating expenses.
          </p>
          <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
            Go to the "Manage People" section to add group members.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-4">
        Add New Expense
      </h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={expenseSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1">
                Amount ($)
              </label>
              <Field
                type="number"
                name="amount"
                step="0.01"
                className="input"
                placeholder="0.00"
              />
              <ErrorMessage name="amount" component="div" className="text-status-error dark:text-dark-status-error text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1">
                Description
              </label>
              <Field
                type="text"
                name="description"
                className="input"
                placeholder="What was this expense for?"
              />
              <ErrorMessage name="description" component="div" className="text-status-error dark:text-dark-status-error text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1">
                Contributors
              </label>
              <div className="space-y-2">
                {people.map(person => (
                  <label key={person.id} className="flex items-center">
                    <Field
                      type="checkbox"
                      name="contributors"
                      value={person.id}
                      className="mr-2"
                    />
                    <span className="text-text-primary dark:text-dark-text-primary">{person.name}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage name="contributors" component="div" className="text-status-error dark:text-dark-status-error text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1">
                Split Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="splitType"
                    value={SPLIT_TYPES.EQUAL}
                    className="mr-2"
                    onChange={() => handleSplitTypeChange(SPLIT_TYPES.EQUAL, setFieldValue)}
                  />
                  <span className="text-text-primary dark:text-dark-text-primary">Equal Split</span>
                </label>
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="splitType"
                    value={SPLIT_TYPES.WEIGHTED}
                    className="mr-2"
                    onChange={() => handleSplitTypeChange(SPLIT_TYPES.WEIGHTED, setFieldValue)}
                  />
                  <span className="text-text-primary dark:text-dark-text-primary">Weighted Split</span>
                </label>
              </div>
            </div>

            {showWeightInputs && (
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1">
                  Weights
                </label>
                <div className="space-y-2">
                  {values.contributors.map(personId => {
                    const person = people.find(p => p.id === personId);
                    return (
                      <div key={personId} className="flex items-center space-x-2">
                        <span className="text-sm text-text-primary dark:text-dark-text-primary w-20">
                          {person?.name}:
                        </span>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={weights[personId] || 1}
                          onChange={(e) => handleWeightChange(personId, e.target.value)}
                          className="w-20 px-2 py-1 border border-border-primary dark:border-dark-border-primary rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-dark-interactive-primary bg-bg-primary dark:bg-dark-bg-primary text-text-primary dark:text-dark-text-primary"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? 'Adding...' : 'Add Expense'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ExpenseForm;
