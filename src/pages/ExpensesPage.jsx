import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, settleExpense } from '../store/slices/expensesSlice';
import { formatCurrency } from '../utils/calculations';
import { FILTER_OPTIONS } from '../constants';
import ExpenseModal from '../components/ExpenseModal';
import { Button } from '../components/common';
import {
  CurrencyDollarIcon,
  PencilIcon,
  CheckIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector(state => state.expenses);
  const { people } = useSelector(state => state.people);
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      if (filter === FILTER_OPTIONS.SETTLED) return expense.settled;
      if (filter === FILTER_OPTIONS.UNSETTLED) return !expense.settled;
      return true;
    });
  }, [expenses, filter]);

  const getPersonName = useCallback((personId) => {
    const person = people.find(p => p.id === personId);
    return person ? person.name : 'Unknown';
  }, [people]);

  const handleAddExpense = useCallback(() => {
    setEditingExpense(null);
    setIsModalOpen(true);
  }, []);

  const handleEditExpense = useCallback((expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  }, []);

  const handleDeleteExpense = useCallback((expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpense(expenseId));
    }
  }, [dispatch]);

  const handleSettleExpense = useCallback((expenseId) => {
    dispatch(settleExpense(expenseId));
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary dark:text-dark-text-primary">
              Expenses
            </h1>
        <p className="text-sm sm:text-base text-text-secondary dark:text-dark-text-secondary mt-2">
          Manage and track all your group expenses
        </p>
          </div>
          <Button onClick={handleAddExpense} variant="primary" size="lg" className="w-full sm:w-auto">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => setFilter(FILTER_OPTIONS.ALL)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${filter === FILTER_OPTIONS.ALL
                ? 'bg-brand-primary text-white'
                : 'bg-bg-secondary dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary'
              }`}
          >
            All ({expenses.length})
          </button>
          <button
            onClick={() => setFilter(FILTER_OPTIONS.UNSETTLED)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${filter === FILTER_OPTIONS.UNSETTLED
                ? 'bg-brand-primary text-white'
                : 'bg-bg-secondary dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary'
              }`}
          >
            Unsettled ({expenses.filter(e => !e.settled).length})
          </button>
          <button
            onClick={() => setFilter(FILTER_OPTIONS.SETTLED)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${filter === FILTER_OPTIONS.SETTLED
                ? 'bg-brand-primary text-white'
                : 'bg-bg-secondary dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary'
              }`}
          >
            Settled ({expenses.filter(e => e.settled).length})
          </button>
        </div>
      </div>

      {/* Expenses List */}
      {filteredExpenses.length === 0 ? (
        <div className="card p-6 sm:p-8 text-center">
          <CurrencyDollarIcon className="w-12 h-12 sm:w-16 sm:h-16 text-text-tertiary dark:text-dark-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
            {filter === 'all' ? 'No expenses yet' : `No ${filter} expenses`}
          </h3>
                 <p className="text-sm sm:text-base text-text-secondary dark:text-dark-text-secondary mb-4 sm:mb-6">
                   {filter === 'all'
                     ? 'Start by adding your first expense to track group costs.'
                     : `No ${filter} expenses found. Try adjusting your filter.`
                   }
          </p>
          {filter === 'all' && (
            <Button onClick={handleAddExpense} variant="primary" className="w-full sm:w-auto">
              <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Add Your First Expense
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-6">
          {filteredExpenses.map(expense => (
            <div
              key={expense.id}
              className={`card p-4 sm:p-6 ${expense.settled
                  ? 'border-status-success bg-status-success/10 dark:bg-dark-status-success/20 dark:border-dark-status-success'
                  : 'border-border-primary dark:border-dark-border-primary'
                }`}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3 gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                      {expense.description}
                    </h3>
                    {expense.settled && (
                      <span className="px-2 sm:px-3 py-1 bg-status-success/20 dark:bg-dark-status-success/20 text-status-success dark:text-dark-status-success text-xs sm:text-sm rounded-full w-fit">
                        Settled
                      </span>
                    )}
                  </div>

                  <div className="text-xl sm:text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-3 sm:mb-4">
                    {formatCurrency(expense.amount)}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                        Split Type:
                      </span>
                      <span className="ml-2 text-sm sm:text-base text-text-primary dark:text-dark-text-primary">
                        {expense.splitType === 'equal' ? 'Equal' : 'Weighted'}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                        Contributors:
                      </span>
                      <span className="ml-2 text-sm sm:text-base text-text-primary dark:text-dark-text-primary">
                        {expense.contributors.map(personId => getPersonName(personId)).join(', ')}
                      </span>
                    </div>
                  </div>

                  {expense.splits && (
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-xs sm:text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                        Individual Splits:
                      </h4>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {expense.splits.map((split, index) => (
                          <div key={index} className="flex justify-between text-xs sm:text-sm">
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

                  <div className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                    Created: {new Date(expense.createdAt).toLocaleDateString()} at{' '}
                    {new Date(expense.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                <div className="flex flex-row gap-2 lg:ml-6">
                  <Button
                    onClick={() => handleEditExpense(expense)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <PencilIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Edit
                  </Button>
                  {!expense.settled && (
                    <Button
                      onClick={() => handleSettleExpense(expense.id)}
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Settle
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteExpense(expense.id)}
                    variant="danger"
                    size="sm"
                    className="flex-1"
                  >
                    <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expense Modal */}

      {isModalOpen && (
        <ExpenseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingExpense(null);
          }}
          expense={editingExpense}
        />
      )}
    </div>
  );
};

export default React.memo(ExpensesPage);
