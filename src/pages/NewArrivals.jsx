import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const NewArrivals = () => {
  const { isDarkMode } = useTheme();
  return (
    <section className={`min-h-screen py-20 transition-colors ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b] text-white' : 'bg-gradient-to-b from-white via-blue-50 to-white text-slate-900'}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h1 className={`text-4xl md:text-6xl font-bold mb-10 text-center ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>New Arrivals</h1>
        <div className={`rounded-2xl shadow-xl p-8 text-center ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <p className={`text-xl mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Discover the latest trends and newest products in our collection. Stay tuned for fresh arrivals!</p>
          {/* New arrivals products grid can go here */}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals; 