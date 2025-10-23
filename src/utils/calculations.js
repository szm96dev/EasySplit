import { CURRENCY } from '../constants';

// Utility functions for expense calculations

export const calculateEqualSplit = (amount, contributors) => {
  const numAmount = parseFloat(amount) || 0;
  const perPerson = numAmount / contributors.length;
  return contributors.map(personId => ({
    personId,
    amount: perPerson,
  }));
};

export const calculateWeightedSplit = (totalAmount, contributors, weights) => {
  const numTotalAmount = parseFloat(totalAmount) || 0;
  const totalWeight = contributors.reduce((sum, personId) => sum + (parseFloat(weights[personId]) || 1), 0);
  
  return contributors.map(personId => {
    const weight = parseFloat(weights[personId]) || 1;
    const amount = (weight / totalWeight) * numTotalAmount;
    return {
      personId,
      amount,
    };
  });
};

export const calculateBalances = (expenses, people) => {
  const balances = {};
  
  // Initialize balances
  people.forEach(person => {
    balances[person.id] = 0;
  });
  
  // Calculate balances from expenses
  expenses.forEach(expense => {
    if (!expense.settled && expense.splits) {
      expense.splits.forEach(split => {
        const amount = parseFloat(split.amount) || 0;
        balances[split.personId] = (balances[split.personId] || 0) + amount;
      });
    }
  });
  
  return balances;
};

export const getTotalBalance = (balances) => {
  return Object.values(balances).reduce((sum, balance) => {
    const numBalance = parseFloat(balance) || 0;
    return sum + numBalance;
  }, 0);
};

export const formatCurrency = (amount) => {
  const numAmount = parseFloat(amount) || 0;
  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: 'currency',
    currency: CURRENCY.DEFAULT,
  }).format(numAmount);
};
