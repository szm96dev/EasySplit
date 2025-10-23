import React, { useEffect, Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store, persistor } from './store/store';
import { useSelector } from 'react-redux';
import { Layout } from './components/common';
import Loading from './components/common/Loading';

// Lazy load pages
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const ExpensesPage = lazy(() => import('./pages/ExpensesPage.jsx'));
const PeoplePage = lazy(() => import('./pages/PeoplePage.jsx'));

function AppContent() {
  const { isDarkMode } = useSelector(state => state.theme);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Layout>
      <div className="pt-16 sm:pt-20">
        <Suspense fallback={<Loading message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/people" element={<PeoplePage />} />
          </Routes>
        </Suspense>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading message="Loading app..." />} persistor={persistor}>
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
