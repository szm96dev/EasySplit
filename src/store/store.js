import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import expensesReducer from './slices/expensesSlice';
import peopleReducer from './slices/peopleSlice';
import themeReducer from './slices/themeSlice';

// Safe storage wrapper
const safeStorage = {
  getItem: (key) => {
    try {
      return storage.getItem(key);
    } catch (error) {
      console.warn('localStorage access denied, using memory storage');
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      return storage.setItem(key, value);
    } catch (error) {
      console.warn('localStorage access denied, data not persisted');
    }
  },
  removeItem: (key) => {
    try {
      return storage.removeItem(key);
    } catch (error) {
      console.warn('localStorage access denied, cannot remove item');
    }
  },
};

const persistConfig = {
  key: 'root',
  storage: safeStorage,
  whitelist: ['expenses', 'people', 'theme'], // Only persist these reducers
};

const rootReducer = combineReducers({
  expenses: expensesReducer,
  people: peopleReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
