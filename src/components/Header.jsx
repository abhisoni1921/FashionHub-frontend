import React, { useState, useEffect } from 'react';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const Header = ({ onLoginClick }) => {
  const { isDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { cartItems } = useCart();
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, e) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToElement(href);
      setIsMenuOpen(false);
    } else if (href === '/') {
      e.preventDefault();
      navigate('/');
      // Smooth scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/collection' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Sale', href: '/sale' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-black/90 backdrop-blur-md border-b border-cyan-500/20' 
            : 'bg-white/90 backdrop-blur-md border-b border-blue-500/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`text-2xl font-bold cursor-pointer ${
              isDarkMode 
                ? 'bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
            }`}
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
          >
            FashionHub
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`relative transition-colors duration-300 group ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-cyan-400' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.name}
                <motion.span 
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  }`}
                  whileHover={{ width: '100%' }}
                />
              </motion.a>
            ))}
          </div>
          
          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/cart')}
              className={`relative p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/50'}`}
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu((v) => !v)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/50'
                  }`}
                >
                  <User size={20} />
                  <span>{user.name || user.email}</span>
                </motion.button>
                
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl z-50 border transition-all duration-200 ${
                        isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className={`px-5 py-4 border-b text-sm font-semibold ${isDarkMode ? 'border-gray-800 text-cyan-400' : 'border-gray-200 text-blue-600'}`}>
                        Profile
                      </div>
                      <div className={`px-5 py-3 text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        { user.email}
                        {/* <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div> */}
                      </div>
                      <div className={`py-1 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                        <button className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-100 text-gray-700'}`}>My Orders</button>
                        <button className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-100 text-gray-700'}`}>Account Settings</button>
                        <button className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-800 text-gray-200' : 'hover:bg-gray-100 text-gray-700'}`}>Help Center</button>
                      </div>
                      <div className={`py-1 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                        <button
                          onClick={() => { logout(); setShowProfileMenu(false); navigate('/'); }}
                          className={`w-full text-left px-5 py-3 text-sm font-semibold transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-800 text-red-400' : 'hover:bg-gray-100 text-red-600'}`}
                        >
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLoginClick}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/50'
                }`}
              >
                <User size={20} />
                <span>Login</span>
              </motion.button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            {/* Mobile Cart Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/cart')}
              className={`relative p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/50'}`}
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-cyan-400' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-md border-b overflow-hidden ${
                isDarkMode 
                  ? 'bg-black/95 border-cyan-500/20' 
                  : 'bg-white/95 border-blue-500/20'
              }`}
            >
              <div className="px-6 py-4 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`block transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-cyan-400' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
                {/* Mobile Cart Link in Menu */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1, duration: 0.3 }}
                  onClick={() => {
                    navigate('/cart');
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-cyan-400' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow">
                      {cartItems.length}
                    </span>
                  )}
                </motion.button>
                {/* Show user info and logout if logged in, else show login */}
                {user ? (
                  <div className="space-y-2 pt-2 border-t border-gray-700">
                    <div className={`flex items-center gap-2 text-base font-semibold ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'}`}>
                      <User size={20} />
                      <span>{user.name || user.email}</span>
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} pl-7`}>{user.email}</div>
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}
                      className={`w-full text-left px-0 py-2 text-sm font-semibold transition-colors duration-200 ${isDarkMode ? 'hover:text-red-400' : 'hover:text-red-600'} mt-2`}
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length) * 0.1, duration: 0.3 }}
                    onClick={() => {
                      onLoginClick();
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-cyan-400' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <User size={20} />
                    <span>Login</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;