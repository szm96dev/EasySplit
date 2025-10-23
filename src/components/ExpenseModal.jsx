import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { addExpense, updateExpense } from '../store/slices/expensesSlice';
import { updateBalance } from '../store/slices/peopleSlice';
import { calculateEqualSplit, calculateWeightedSplit } from '../utils/calculations';
import { expenseSchema } from '../schemas';
import { SPLIT_TYPES } from '../constants';
import { v4 as uuidv4 } from 'uuid';
import { Modal, FormInput, MultiSelectInput, RadioInput } from './common';

const ExpenseModal = ({ isOpen, onClose, expense = null }) => {
  const dispatch = useDispatch();
  const { people } = useSelector(state => state.people);
  const [weights, setWeights] = useState({});
  const [showWeightInputs, setShowWeightInputs] = useState(false);

  const isEditing = !!expense;

  const initialValues = useMemo(() => ({
    amount: expense?.amount || '',
    description: expense?.description || '',
    contributors: expense?.contributors || [],
    splitType: expense?.splitType || SPLIT_TYPES.EQUAL,
    weights: expense?.weights || {}
  }), [expense]);

  // Use the imported validation schema
  const validationSchema = expenseSchema;

  useEffect(() => {
    if (isOpen && expense) {
      setWeights(expense.weights || {});
      setShowWeightInputs(expense.splitType === SPLIT_TYPES.WEIGHTED);
    }
  }, [isOpen, expense]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { amount, description, contributors, splitType } = values;
    
    let splits;
    if (splitType === SPLIT_TYPES.EQUAL) {
      splits = calculateEqualSplit(amount, contributors);
    } else {
      splits = calculateWeightedSplit(amount, contributors, weights);
    }

    const expenseData = {
      id: expense?.id || uuidv4(),
      amount: parseFloat(amount),
      description,
      contributors,
      splitType,
      splits,
      weights: splitType === 'weighted' ? weights : {},
      settled: expense?.settled || false,
      createdAt: expense?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isEditing) {
      // First, reverse the old expense's impact on balances
      if (expense.splits) {
        expense.splits.forEach(split => {
          dispatch(updateBalance({
            personId: split.personId,
            amount: -split.amount // Reverse the old amount
          }));
        });
      }

      // Update the expense
      dispatch(updateExpense({
        id: expense.id,
        updates: {
          amount: parseFloat(amount),
          description,
          contributors,
          splitType,
          splits,
          weights: splitType === SPLIT_TYPES.WEIGHTED ? weights : {},
          updatedAt: new Date().toISOString()
        }
      }));

      // Apply the new expense's impact on balances
      splits.forEach(split => {
        dispatch(updateBalance({
          personId: split.personId,
          amount: split.amount
        }));
      });
    } else {
      dispatch(addExpense(expenseData));
      
      // Update balances for new expense
      splits.forEach(split => {
        dispatch(updateBalance({
          personId: split.personId,
          amount: split.amount
        }));
      });
    }

    setSubmitting(false);
    resetForm();
    onClose();
  };

  const handleSplitTypeChange = useCallback((splitType, setFieldValue) => {
    setFieldValue('splitType', splitType);
    setShowWeightInputs(splitType === SPLIT_TYPES.WEIGHTED);
    
    if (splitType === SPLIT_TYPES.WEIGHTED) {
      // Initialize weights for selected contributors
      const newWeights = {};
      initialValues.contributors.forEach(personId => {
        newWeights[personId] = weights[personId] || 1;
      });
      setWeights(newWeights);
    }
  }, [initialValues.contributors, weights]);

  const handleWeightChange = useCallback((personId, value) => {
    const newWeights = { ...weights, [personId]: parseFloat(value) || 1 };
    setWeights(newWeights);
  }, [weights]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Expense' : 'Add New Expense'}
      size="lg"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            <FormInput
              name="amount"
              type="number"
              label="Amount ($)"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />

            <FormInput
              name="description"
              type="text"
              label="Description"
              placeholder="What was this expense for?"
              required
            />

            <MultiSelectInput
              name="contributors"
              label="Contributors"
              options={people.map(person => ({
                value: person.id,
                label: person.name
              }))}
              required
            />

            <RadioInput
              name="splitType"
              label="Split Type"
              options={[
                { value: SPLIT_TYPES.EQUAL, label: 'Equal Split' },
                { value: SPLIT_TYPES.WEIGHTED, label: 'Weighted Split' }
              ]}
              onChange={(e) => handleSplitTypeChange(e.target.value, setFieldValue)}
              required
            />

            {showWeightInputs && (
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Weights
                </label>
                <div className="space-y-2">
                  {values.contributors.map(personId => {
                    const person = people.find(p => p.id === personId);
                    return (
                      <div key={personId} className="flex items-center space-x-3">
                        <span className="text-sm text-text-primary dark:text-dark-text-primary w-24">
                          {person?.name}:
                        </span>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={weights[personId] || 1}
                          onChange={(e) => handleWeightChange(personId, e.target.value)}
                          className="w-20 px-3 py-1 border border-border-primary dark:border-dark-border-primary rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-dark-interactive-primary bg-bg-primary dark:bg-dark-bg-primary text-text-primary dark:text-dark-text-primary"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1"
              >
                {isSubmitting ? 'Saving...' : (isEditing ? 'Update Expense' : 'Add Expense')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default React.memo(ExpenseModal);
