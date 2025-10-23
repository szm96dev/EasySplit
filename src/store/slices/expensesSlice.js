import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const newExpense = {
        id: uuidv4(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        settled: false,
      };
      state.expenses.push(newExpense);
    },
    updateExpense: (state, action) => {
      const { id, updates } = action.payload;
      const expense = state.expenses.find(exp => exp.id === id);
      if (expense) {
        Object.assign(expense, updates);
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
    },
    settleExpense: (state, action) => {
      const expense = state.expenses.find(exp => exp.id === action.payload);
      if (expense) {
        expense.settled = true;
        expense.settledAt = new Date().toISOString();
      }
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addExpense,
  updateExpense,
  deleteExpense,
  settleExpense,
  setExpenses,
  setLoading,
  setError,
} = expensesSlice.actions;

export default expensesSlice.reducer;
