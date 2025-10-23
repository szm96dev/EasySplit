import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency, getTotalBalance, calculateBalances } from '../utils/calculations';

const BalanceDisplay = () => {
  const { people } = useSelector(state => state.people);
  const { expenses } = useSelector(state => state.expenses);

  // Calculate current balances from unsettled expenses
  const currentBalances = useMemo(() => {
    return calculateBalances(expenses, people);
  }, [expenses, people]);

  const totalBalance = useMemo(() => {
    return getTotalBalance(currentBalances);
  }, [currentBalances]);

  const sortedBalances = useMemo(() => {
    return Object.entries(currentBalances)
      .map(([personId, balance]) => ({
        personId,
        balance,
        name: people.find(p => p.id === personId)?.name || 'Unknown',
      }))
      .slice() // Create a copy of the array
      .sort((a, b) => b.balance - a.balance);
  }, [currentBalances, people]);

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-4">
        Current Balances
      </h2>
      
      {people.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-secondary dark:text-dark-text-secondary">
            Add people to see balances
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedBalances.map(({ personId, balance, name }) => (
            <div
              key={personId}
              className={`p-3 rounded-lg border ${
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
  );
};

export default React.memo(BalanceDisplay);
