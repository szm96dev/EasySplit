import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(state => state.theme);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-bg-primary/95 dark:bg-dark-bg-primary/95 backdrop-blur-md shadow-xl border-b border-border-primary dark:border-dark-border-primary' 
        : 'bg-bg-primary/80 dark:bg-dark-bg-primary/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
        
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-300">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                     <span className="text-white text-lg sm:text-xl lg:text-2xl">💰</span>
              </div>
              <span className={`font-bold text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent transition-all duration-300 ${scrolled ? 'text-lg sm:text-xl lg:text-2xl' : 'text-xl sm:text-2xl lg:text-3xl'}`}>
                EasySplit
              </span>
            </Link>
          </div>
          
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/'
                      ? 'bg-brand-primary text-white'
                      : 'text-text-primary dark:text-dark-text-primary hover:text-brand-primary dark:hover:text-dark-interactive-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/expenses"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/expenses'
                      ? 'bg-brand-primary text-white'
                      : 'text-text-primary dark:text-dark-text-primary hover:text-brand-primary dark:hover:text-dark-interactive-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary'
                  }`}
                >
                  Expenses
                </Link>
                <Link
                  to="/people"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/people'
                      ? 'bg-brand-primary text-white'
                      : 'text-text-primary dark:text-dark-text-primary hover:text-brand-primary dark:hover:text-dark-interactive-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary'
                  }`}
                >
                  People
                </Link>
              </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 sm:p-3 text-text-primary dark:text-dark-text-primary hover:text-brand-primary dark:hover:text-dark-interactive-primary transition-all duration-300 hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary rounded-xl"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-primary dark:text-dark-text-primary hover:text-brand-primary dark:hover:text-dark-interactive-primary transition-all duration-300 hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary rounded-xl"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-primary dark:border-dark-border-primary bg-bg-primary dark:bg-dark-bg-primary">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-brand-primary text-white'
                    : 'text-text-primary dark:text-dark-text-primary hover:text-brand-primary dark:hover:text-dark-interactive-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/expenses"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/expenses'
                    ? 'bg-brand-primary text-white'
                    : 'text-text-primary dark:text-dark-text-primary hover:text-brand-primary dark:hover:text-dark-interactive-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary'
                }`}
              >
                Expenses
              </Link>
              <Link
                to="/people"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/people'
                    ? 'bg-brand-primary text-white'
                    : 'text-text-primary dark:text-dark-text-primary hover:text-brand-primary dark:hover:text-dark-interactive-primary hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary'
                }`}
              >
                People
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
