import { Link, useLocation } from 'react-router-dom';
import { FiMoon, FiSun, FiMenu, FiX, FiCalendar } from 'react-icons/fi';
import { useState } from 'react';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: null },
    { name: 'About', path: '/about', icon: null },
    { name: 'Bookings', path: '/bookings', icon: <FiCalendar className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: null },
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-md">
      <div className="container-booking py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            aria-label="Assentech Home"
          >
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110">
              A
            </div>
            <div>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                Assentech
              </span>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Hall Booking System
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link flex items-center gap-2 ${
                  isActivePath(item.path) ? 'nav-link-active' : ''
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="nav-link p-2 rounded-lg"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-slate-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-neutral-600" />
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-slate-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-neutral-600" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <FiX className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              ) : (
                <FiMenu className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 animate-slide-down">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link justify-start ${
                    isActivePath(item.path) ? 'nav-link-active' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
