import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const categoryImages = [
  {
    label: 'Men',
    src: 'https://templates.simplified.co/thumb/4b4eb011-8d15-4da1-902a-dc0c776cbd86.jpg?auto=format&fit=crop&w=600&q=80', // Men fashion
  },
  {
    label: 'Women',
    src: 'https://d1y41eupgbwbb2.cloudfront.net/images/blog/build-an-ecommerce-fashion-app-like-zara.webp?auto=format&fit=crop&w=600&q=80', // Women fashion
  },
  {
    label: 'Kid',
    src: 'https://www.juniorsfashionweek.com/wp-content/uploads/2021/10/JFW_for_kids_F.jpg?auto=format&fit=crop&w=600&q=80', // Kid fashion
  },
];

const Hero = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <section
      className={`relative w-full min-h-[70vh] flex flex-col justify-center items-center overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-pink-50 via-purple-100 to-blue-50'
      }`}
    >
      {/* Abstract/gradient background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40 ${
          isDarkMode ? 'bg-cyan-900' : 'bg-pink-300'
        }`}></div>
        <div className={`absolute top-1/2 right-0 w-80 h-80 rounded-full blur-2xl opacity-30 ${
          isDarkMode ? 'bg-blue-900' : 'bg-purple-300'
        }`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 pt-24 pb-12 sm:pt-32 sm:pb-20">
        <h1
          className={`text-4xl sm:text-6xl md:text-7xl font-extrabold text-center mb-6 tracking-tight leading-tight bg-clip-text text-transparent animate-fade-in-up ${
            isDarkMode
              ? 'bg-gradient-to-r from-white via-cyan-300 to-pink-200'
              : 'bg-gradient-to-r from-gray-900 via-pink-700 to-purple-700'
          }`}
          style={{ animationDelay: '0.1s', animationDuration: '0.8s' }}
        >
          Step into the Future of Fashion
        </h1>
        <p
          className={`max-w-2xl text-lg sm:text-2xl text-center mb-8 animate-fade-in-up ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
          style={{ animationDelay: '0.3s', animationDuration: '0.8s' }}
        >
          Discover the latest trends, curated collections, and exclusive pieces from the world's top designers. Elevate your style with FashionHub.
        </p>
        <button
          className={`px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-fade-in-up
            ${isDarkMode
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 focus:ring-cyan-500'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 focus:ring-pink-400'}
          `}
          style={{ animationDelay: '0.5s', animationDuration: '0.8s' }}
          onClick={() => navigate('/collection')}
        >
          Shop Now
        </button>
      </div>

      {/* Category Banner: Men, Women, Kid */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-center gap-8 pb-8 px-4">
        {categoryImages.map(({ label, src }) => (
          <div
            key={label}
            className="flex flex-col items-center w-full sm:w-1/3 max-w-xs group"
          >
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-900 transition-transform duration-300 group-hover:scale-105">
              <img
                src={src}
                alt={`${label} fashion`}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className={`mt-4 text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Custom keyframes for fade-in/slide-up */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </section>
  );
};

export default Hero;

