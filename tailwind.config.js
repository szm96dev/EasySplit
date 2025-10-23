/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors - Bluish theme (simple and clean)
        brand: {
          primary: '#1976d2', // Material Blue
          secondary: '#42a5f5', // Light Blue
          accent: '#64b5f6', // Accent Blue
        },
        // Background Colors
        bg: {
          primary: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#f1f5f9',
          card: '#ffffff',
          overlay: 'rgba(0, 0, 0, 0.1)',
        },
        // Text Colors
        text: {
          primary: '#212121',
          secondary: '#878787',
          tertiary: '#bdbdbd',
          inverse: '#ffffff',
          accent: '#1976d2',
        },
        // Border Colors
        border: {
          primary: '#e0e0e0',
          secondary: '#c0c0c0',
          accent: '#1976d2',
        },
        // Status Colors
        status: {
          success: '#388e3c',
          warning: '#f57c00',
          error: '#d32f2f',
          info: '#1976d2',
        },
        // Interactive Colors
        interactive: {
          primary: '#1976d2',
          'primary-hover': '#1565c0',
          secondary: '#878787',
          'secondary-hover': '#616161',
        },
        // Dark Theme Colors
        dark: {
          bg: {
            primary: '#121212',
            secondary: '#1e1e1e',
            tertiary: '#2d2d2d',
            card: '#1e1e1e',
            overlay: 'rgba(0, 0, 0, 0.5)',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
            tertiary: '#808080',
            inverse: '#121212',
            accent: '#64b5f6',
          },
          border: {
            primary: '#333333',
            secondary: '#404040',
            accent: '#64b5f6',
          },
          status: {
            success: '#4caf50',
            warning: '#ff9800',
            error: '#f44336',
            info: '#2196f3',
          },
          interactive: {
            primary: '#64b5f6',
            'primary-hover': '#42a5f5',
            secondary: '#b3b3b3',
            'secondary-hover': '#e0e0e0',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'lg': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
