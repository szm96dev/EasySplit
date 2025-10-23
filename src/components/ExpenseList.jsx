import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { settleExpense, deleteExpense } from '../store/slices/expensesSlice';
import { formatCurrency } from '../utils/calculations';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector(state => state.expenses);
  const { people } = useSelector(state => state.people);
  const [filter, setFilter] = useState('all'); // 'all', 'settled', 'unsettled'

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      if (filter === 'settled') return expense.settled;
      if (filter === 'unsettled') return !expense.settled;
      return true;
    });
  }, [expenses, filter]);

  const handleSettleExpense = useCallback((expenseId) => {
    dispatch(settleExpense(expenseId));
  }, [dispatch]);

  const handleDeleteExpense = useCallback((expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpense(expenseId));
    }
  }, [dispatch]);

  const getPersonName = useCallback((personId) => {
    const person = people.find(p => p.id === personId);
    return person ? person.name : 'Unknown';
  }, [people]);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
          Expenses
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-brand-primary text-white'
                : 'bg-bg-secondary dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unsettled')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'unsettled'
                ? 'bg-brand-primary text-white'
                : 'bg-bg-secondary dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary'
            }`}
          >
            Unsettled
          </button>
          <button
            onClick={() => setFilter('settled')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'settled'
                ? 'bg-brand-primary text-white'
                : 'bg-bg-secondary dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary'
            }`}
          >
            Settled
          </button>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-secondary dark:text-dark-text-secondary">
            {filter === 'all' 
              ? 'No expenses yet. Add your first expense above!'
              : `No ${filter} expenses.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExpenses.map(expense => (
            <div
              key={expense.id}
              className={`border rounded-lg p-4 ${
                expense.settled
                  ? 'border-status-success bg-status-success/10 dark:bg-dark-status-success/20 dark:border-dark-status-success'
                  : 'border-border-primary dark:border-dark-border-primary'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                      {expense.description}
                    </h3>
                    {expense.settled && (
                      <span className="px-2 py-1 bg-status-success/20 dark:bg-dark-status-success/20 text-status-success dark:text-dark-status-success text-xs rounded-full">
                        Settled
                      </span>
                    )}
                  </div>
                  
                  <div className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                    {formatCurrency(expense.amount)}
                  </div>
                  
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
                    <span className="font-medium">Split:</span> {expense.splitType === 'equal' ? 'Equal' : 'Weighted'}
                  </div>
                  
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    <span className="font-medium">Contributors:</span>{' '}
                    {expense.contributors.map(personId => getPersonName(personId)).join(', ')}
                  </div>
                  
                  {expense.splits && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium text-text-secondary dark:text-dark-text-secondary">Splits:</span>
                      <div className="mt-1 space-y-1">
                        {expense.splits.map((split, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-text-secondary dark:text-dark-text-secondary">
                              {getPersonName(split.personId)}:
                            </span>
                            <span className="font-medium text-text-primary dark:text-dark-text-primary">
                              {formatCurrency(split.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-2">
                    {new Date(expense.createdAt).toLocaleDateString()} at{' '}
                    {new Date(expense.createdAt).toLocaleTimeString()}
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  {!expense.settled && (
                    <button
                      onClick={() => handleSettleExpense(expense.id)}
                      className="px-3 py-1 bg-status-success hover:bg-status-success/80 text-white text-sm rounded-md transition-colors"
                    >
                      Settle
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="px-3 py-1 bg-status-error hover:bg-status-error/80 text-white text-sm rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(ExpenseList);
