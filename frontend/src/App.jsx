import { useState, Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Bookings = lazy(() => import('./pages/Bookings'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or use system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply dark mode class to document
    document.documentElement.classList.toggle('dark', darkMode);
    
    // Save preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Add meta tag for theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = darkMode ? '#1f2937' : '#ffffff';
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = darkMode ? '#1f2937' : '#ffffff';
      document.head.appendChild(meta);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
