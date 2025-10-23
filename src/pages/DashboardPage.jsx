import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency, getTotalBalance, calculateBalances } from '../utils/calculations';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import { 
  CurrencyDollarIcon, 
  ClockIcon, 
  UsersIcon, 
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const { people } = useSelector(state => state.people);
  const { expenses } = useSelector(state => state.expenses);

  // Calculate current balances from unsettled expenses
  const currentBalances = useMemo(() => {
    return calculateBalances(expenses, people);
  }, [expenses, people]);

  const sortedBalances = useMemo(() => {
    return Object.entries(currentBalances)
      .map(([personId, balance]) => ({
        personId,
        balance,
        name: people.find(p => p.id === personId)?.name || 'Unknown'
      }))
      .slice() // Create a copy of the array
      .sort((a, b) => b.balance - a.balance);
  }, [currentBalances, people]);

  const totalBalance = useMemo(() => {
    return getTotalBalance(currentBalances);
  }, [currentBalances]);

  const unsettledExpenses = useMemo(() => {
    return expenses.filter(expense => !expense.settled);
  }, [expenses]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-text-secondary dark:text-dark-text-secondary">
          Overview of your shared expenses and balances
        </p>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="card p-4 sm:p-6 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                Total Expenses
              </p>
              <p className="text-xl sm:text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                {expenses.length}
              </p>
            </div>
            <CurrencyDollarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-brand-primary" />
          </div>
        </div>

        <div className="card p-4 sm:p-6 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                Unsettled
              </p>
              <p className="text-xl sm:text-2xl font-bold text-status-warning dark:text-dark-status-warning">
                {unsettledExpenses.length}
              </p>
            </div>
            <ClockIcon className="w-6 h-6 sm:w-8 sm:h-8 text-status-warning" />
          </div>
        </div>

        <div className="card p-4 sm:p-6 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                Group Members
              </p>
              <p className="text-xl sm:text-2xl font-bold text-text-primary dark:text-dark-text-primary">
                {people.length}
              </p>
            </div>
            <UsersIcon className="w-6 h-6 sm:w-8 sm:h-8 text-brand-primary" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Current Balances */}
        <div className="card p-4 sm:p-6 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              Current Balances
            </h2>
            <Link to="/people">
                     <Button variant="outline" size="sm" className="w-full sm:w-auto">
                       Manage Members
                     </Button>
            </Link>
          </div>

          {people.length === 0 ? (
            <div className="text-center py-8">
              <UserGroupIcon className="w-16 h-16 text-text-tertiary dark:text-dark-text-tertiary mx-auto mb-4" />
                     <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                       No group members added yet
                     </p>
                     <Link to="/people">
                       <Button variant="primary">
                         Add Members
                       </Button>
                     </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedBalances.map(({ personId, balance, name }) => (
                <div
                  key={personId}
                  className={`p-4 rounded-lg border ${
                    balance > 0
                      ? 'border-status-error bg-status-error/10 dark:bg-dark-status-error/20 dark:border-dark-status-error'
                      : balance < 0
                      ? 'border-status-success bg-status-success/10 dark:bg-dark-status-success/20 dark:border-dark-status-success'
                      : 'border-border-primary dark:border-dark-border-primary bg-bg-secondary dark:bg-dark-bg-secondary'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-text-primary dark:text-dark-text-primary">
                      {name}
                    </span>
                    <span
                      className={`font-semibold ${
                        balance > 0
                          ? 'text-status-error dark:text-dark-status-error'
                          : balance < 0
                          ? 'text-status-success dark:text-dark-status-success'
                          : 'text-text-secondary dark:text-dark-text-secondary'
                      }`}
                    >
                      {balance > 0 ? '+' : ''}{formatCurrency(balance)}
                    </span>
                  </div>
                  <div className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-1">
                    {balance > 0 ? 'Owes' : balance < 0 ? 'Is owed' : 'Even'}
                  </div>
                </div>
              ))}

              <div className="border-t border-border-primary dark:border-dark-border-primary pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-text-primary dark:text-dark-text-primary">
                    Total Balance:
                  </span>
                  <span
                    className={`font-bold ${
                      Math.abs(totalBalance) < 0.01
                        ? 'text-text-secondary dark:text-dark-text-secondary'
                        : 'text-status-error dark:text-dark-status-error'
                    }`}
                  >
                    {formatCurrency(totalBalance)}
                  </span>
                </div>
                {Math.abs(totalBalance) < 0.01 ? (
                  <div className="text-xs text-status-success dark:text-dark-status-success mt-1">
                    ✓ All balances are settled
                  </div>
                ) : (
                  <div className="text-xs text-status-error dark:text-dark-status-error mt-1">
                    ⚠ Balances don't add up to zero
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Recent Expenses */}
        <div className="card p-6 flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
              Recent Expenses
            </h2>
            <Link to="/expenses">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          {expenses.length === 0 ? (
            <div className="text-center py-8">
              <CurrencyDollarIcon className="w-16 h-16 text-text-tertiary dark:text-dark-text-tertiary mx-auto mb-4" />
              <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                No expenses yet
              </p>
              <Link to="/expenses">
                <Button variant="primary">
                  Add Expense
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {expenses
                .slice() // Create a copy of the array
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map(expense => (
                  <div
                    key={expense.id}
                    className={`p-4 rounded-lg border ${
                      expense.settled
                        ? 'border-status-success bg-status-success/10 dark:bg-dark-status-success/20 dark:border-dark-status-success'
                        : 'border-border-primary dark:border-dark-border-primary'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                          {expense.description}
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                          {formatCurrency(expense.amount)} • {expense.splitType === 'equal' ? 'Equal' : 'Weighted'} split
                        </p>
                        <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
                          {new Date(expense.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {expense.settled && (
                        <span className="px-2 py-1 bg-status-success/20 dark:bg-dark-status-success/20 text-status-success dark:text-dark-status-success text-xs rounded-full">
                          Settled
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-6">
          Quick Actions
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/expenses" className="flex-1">
            <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <CurrencyDollarIcon className="w-8 h-8 text-brand-primary" />
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                    Add Expense
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Track a new shared expense
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/people" className="flex-1">
            <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <UserGroupIcon className="w-8 h-8 text-brand-primary" />
                <div>
                         <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                           Manage Members
                         </h3>
                         <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                           Add or edit group members
                         </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/expenses" className="flex-1">
            <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <ChartBarIcon className="w-8 h-8 text-brand-primary" />
                <div>
                  <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                    View All Expenses
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    See complete expense history
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardPage);
