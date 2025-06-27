import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex items-center justify-center w-10 h-10 rounded-full shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDarkMode ? 'bg-gray-800 hover:bg-yellow-800 focus:ring-blue-500' : 'bg-gray-400 hover:bg-gray-900 focus:ring-cyan-500'}`}
    >
      {isDarkMode ? (
        <Sun size={18} className="text-yellow-500 transition-transform duration-200 group-active:-rotate-12 group-active:scale-110" />
      ) : (
        <Moon size={18} className="text-cyan-100 transition-transform duration-200 group-active:rotate-12 group-active:scale-110" />
      )}
    </button>
  );
};

export default ThemeToggle;
