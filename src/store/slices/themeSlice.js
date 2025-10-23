import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const savedTheme = localStorage.getItem('persist:root');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        const theme = JSON.parse(parsed.theme);
        return theme.isDarkMode;
      } catch (e) {
        // Fallback to system preference
      }
    }
  } catch (error) {
    // Fallback to system preference
    console.warn('localStorage access denied, using system preference');
  }
  
  // Fallback to system preference
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    // If even system preference fails, default to light mode
    return false;
  }
};

const initialState = {
  isDarkMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
