import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  people: [],
  balances: {},
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    addPerson: (state, action) => {
      const newPerson = {
        id: uuidv4(),
        name: action.payload.name,
        email: action.payload.email || '',
        createdAt: new Date().toISOString(),
      };
      state.people.push(newPerson);
      state.balances[newPerson.id] = 0;
    },
    updatePerson: (state, action) => {
      const { id, updates } = action.payload;
      const person = state.people.find(p => p.id === id);
      if (person) {
        Object.assign(person, updates);
      }
    },
    deletePerson: (state, action) => {
      state.people = state.people.filter(p => p.id !== action.payload);
      delete state.balances[action.payload];
    },
    updateBalance: (state, action) => {
      const { personId, amount } = action.payload;
      state.balances[personId] = (state.balances[personId] || 0) + amount;
    },
    setBalances: (state, action) => {
      state.balances = action.payload;
    },
    setPeople: (state, action) => {
      state.people = action.payload;
    },
    resetBalances: (state) => {
      state.balances = {};
      state.people.forEach(person => {
        state.balances[person.id] = 0;
      });
    },
  },
});

export const {
  addPerson,
  updatePerson,
  deletePerson,
  updateBalance,
  setBalances,
  setPeople,
  resetBalances,
} = peopleSlice.actions;

export default peopleSlice.reducer;
