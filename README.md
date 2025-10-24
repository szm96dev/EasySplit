# 💰 EasySplit

A modern, production-ready expense splitting application built with React and Redux. EasySplit provides a seamless expense management experience for any group - friends, colleagues, roommates, or family - with powerful calculations, balance tracking, and intuitive settlement management.

![React](https://img.shields.io/badge/React-61dafb?style=flat&logo=react) ![Redux](https://img.shields.io/badge/Redux-764abc?style=flat&logo=redux) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=flat&logo=tailwindcss) ![Formik](https://img.shields.io/badge/Formik-1f2937?style=flat&logo=formik) ![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat&logo=javascript)

## ✨ Features

### 💰 Expense Management
- **Smart Expense Tracking** - Add expenses with detailed descriptions and contributors
- **Flexible Splitting** - Equal or weighted expense splitting based on custom criteria
- **Real-time Calculations** - Instant balance updates and split calculations
- **Settlement System** - Mark expenses as settled to update balances
- **Expense History** - Complete expense tracking with timestamps and status
- **Bulk Operations** - Delete multiple expenses and manage settlements

### 👥 People Management
- **Group Members** - Add and manage friends, colleagues, and any group members
- **Contact Information** - Optional email addresses for each person
- **Balance Tracking** - Individual balance calculations for each person
- **Visual Indicators** - Clear display of who owes whom and how much
- **Member Management** - Edit or remove group members as needed

### 📊 Balance & Analytics
- **Real-time Balances** - Live balance calculations for all members
- **Settlement Tracking** - Visual indicators for settled vs unsettled expenses
- **Balance Overview** - Dashboard with total balances and expense summaries
- **Smart Calculations** - Automatic balance adjustments when expenses are settled
- **Data Validation** - Ensures balances add up correctly

### 🎨 User Experience
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Modern UI/UX** - Clean, minimalist design with perfect spacing
- **Smooth Animations** - Elegant transitions and hover effects
- **Professional Polish** - Production-ready interface design
- **Intuitive Navigation** - Easy-to-use interface with clear information hierarchy

## 🚀 Tech Stack

### Frontend Core
- **React** - Modern UI library with hooks and functional components
- **React Hooks** - useState, useEffect, useMemo, useCallback for state management
- **React Router DOM** - Client-side routing and navigation
- **React.memo** - Performance optimization for component re-renders

### State Management
- **Redux Toolkit** - Modern Redux with less boilerplate
- **Redux Persist** - Automatic state persistence to localStorage
- **Immutable Updates** - Proper state mutations and updates
- **Error Boundaries** - Graceful error handling and recovery

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Components** - Reusable UI component library
- **Responsive Design** - Mobile-first approach with breakpoint optimization
- **Dark Mode** - Theme system with localStorage persistence

### Form Management
- **Formik** - Form state management and validation
- **Yup** - Schema-based form validation
- **Custom Inputs** - Reusable form components with validation
- **Error Handling** - Comprehensive form error management

### Data Persistence
- **localStorage** - Browser storage for data persistence
- **Redux Persist** - Automatic state synchronization
- **Safe Storage** - Error handling for localStorage access
- **Data Integrity** - Proper state validation and recovery


## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── common/             # Reusable UI component library
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── NumberInput.jsx
│   │   ├── SelectInput.jsx
│   │   ├── CheckboxInput.jsx
│   │   ├── MultiSelectInput.jsx
│   │   ├── RadioInput.jsx
│   │   ├── Modal.jsx
│   │   ├── Layout.jsx
│   │   ├── Footer.jsx
│   │   ├── Loading.jsx
│   │   └── index.js
│   ├── ExpenseForm.jsx      # Expense creation form
│   ├── ExpenseList.jsx      # Expense management
│   ├── ExpenseModal.jsx     # Modal for expenses
│   ├── BalanceDisplay.jsx   # Balance calculations
│   ├── PeopleManager.jsx    # People management
│   ├── PeopleModal.jsx     # Modal for people
│   └── Navbar.jsx          # Navigation bar
│
├── pages/                  # Page components
│   ├── DashboardPage.jsx   # Main dashboard
│   ├── ExpensesPage.jsx    # Expense management page
│   └── PeoplePage.jsx      # People management page
│
├── store/                  # Redux store
│   ├── store.js            # Store configuration
│   └── slices/             # Redux slices
│       ├── expensesSlice.js
│       ├── peopleSlice.js
│       └── themeSlice.js
│
├── utils/                  # Utility functions
│   └── calculations.js     # Expense calculation logic
│
├── constants/              # Application constants
│   └── index.js            # Constants export
│
├── schemas/                # Validation schemas
│   └── index.js            # Yup validation schemas
│
├── App.js                  # Main application component
├── index.js                # Application entry point
└── index.css               # Global styles and Tailwind directives
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/szm96dev/EasySplit.git

# Navigate to project directory
cd EasySplit

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# The build folder will contain optimized static files
```

## 🎨 UI/UX Highlights

- **Professional Design** - Clean, modern interface with perfect spacing
- **Consistent Layout** - Uniform cards and components with equal heights
- **Smooth Animations** - Elegant hover effects and theme transitions
- **Responsive Layout** - Optimized for all device sizes
- **Dark Mode** - Eye-friendly dark theme with smooth transitions
- **Visual Hierarchy** - Clear information architecture and typography
- **Touch Friendly** - Optimized for mobile interactions
- **Loading States** - Professional loading indicators and empty states

## ⚡ Performance Optimizations

- **React.memo** - Prevents unnecessary component re-renders
- **useCallback** - Optimized event handlers and functions
- **useMemo** - Memoized expensive calculations and filtered data
- **Code Splitting** - Efficient bundle size and loading
- **Redux Persist** - Efficient data persistence
- **Fast Loading** - Optimized for quick startup
- **Efficient Styles** - Minimal and clean CSS with Tailwind
- **State Optimization** - Efficient state updates and re-renders

## 🎯 Key Features Explained

### Expense Management
- **Add Expenses** - Simple form with validation and error handling
- **Edit Expenses** - Modal-based editing with pre-populated data
- **Delete Expenses** - Safe deletion with confirmation dialogs
- **Settlement Tracking** - Mark expenses as settled to update balances

### Balance Calculations
- **Real-time Updates** - Balances update automatically when expenses change
- **Visual Indicators** - Clear display of who owes whom and how much
- **Balance Validation** - Ensures all balances add up correctly
- **Settlement Status** - Track which expenses have been settled

### People Management
- **Add Members** - Simple form to add household members
- **Edit Information** - Update member details and contact information
- **Remove Members** - Safe removal with data cleanup
- **Balance Tracking** - Individual balance calculations for each member

## 🎨 UI/UX Features

### Responsive Design
- **Mobile First** - Optimized for mobile devices
- **Flexible Grid** - Adapts to different screen sizes
- **Touch Friendly** - Large touch targets for mobile
- **Fast Loading** - Optimized images and code

### Animations
- **Smooth Transitions** - Hover effects and state changes
- **Loading Animations** - Spinners and skeleton screens
- **Fade Effects** - Smooth content transitions
- **Micro-interactions** - Button and card animations

### Theme System
- **Dark/Light Mode** - Toggle between themes
- **Persistent Themes** - Theme preference saved to localStorage
- **Smooth Transitions** - Elegant theme switching
- **System Preference** - Automatic theme detection

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Your app is live!

### Deploy to Vercel
1. Connect your GitHub repository
2. Deploy automatically on push

### Deploy to GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `build` folder to GitHub Pages
3. Your app is live!

## 🎓 Skills Demonstrated

This project showcases proficiency in:

- ✅ Modern React development with hooks
- ✅ Redux Toolkit for state management
- ✅ Redux Persist for data persistence
- ✅ Component architecture and reusability
- ✅ Tailwind CSS utility-first styling
- ✅ Responsive design and mobile optimization
- ✅ Performance optimization techniques
- ✅ Form handling with Formik and Yup
- ✅ Theme system implementation
- ✅ Professional UI/UX design
- ✅ Code organization and architecture
- ✅ Production-ready code practices

## 🎯 Production Ready

- ✅ **Clean Code** - Well-organized and maintainable
- ✅ **Performance** - Fast and optimized
- ✅ **Responsive** - Works perfectly on all device sizes
- ✅ **User Friendly** - Intuitive interface and smooth experience
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Accessibility** - WCAG compliant design
- ✅ **Data Persistence** - Reliable data storage and recovery
- ✅ **State Management** - Efficient Redux implementation

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode at `http://localhost:3000`

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
Ejects from Create React App (one-way operation)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**SiKaNDaR ZuBaIr MaYo**
- GitHub: [@szm96dev](https://github.com/szm96dev)
- LinkedIn: [Sikandar Zubair Mayo](https://www.linkedin.com/in/szm96dev/)
- Portfolio: [Sikandar Portfolio](https://szm96dev.github.io/)

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Built with ❤️ using React, Redux, and Tailwind CSS