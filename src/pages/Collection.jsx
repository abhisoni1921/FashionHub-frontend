import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Eye, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DataTransitionWrapper from '../components/DataTransitionWrapper';

const Collection = () => {
  const { isDarkMode } = useTheme();
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:5000/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Custom loading component
  const LoadingComponent = () => (
    <section className={`min-h-screen py-20 relative overflow-x-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b]' : 'bg-gradient-to-b from-white via-blue-50 to-white'}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Loader2 className={`w-8 h-8 animate-spin mx-auto mb-4 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Loading products...
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Custom error component
  const ErrorComponent = () => (
    <section className={`min-h-screen py-20 relative overflow-x-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b]' : 'bg-gradient-to-b from-white via-blue-50 to-white'}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <p className={`text-xl mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Error</p>
          <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className={`px-6 py-2 rounded-lg font-semibold ${isDarkMode ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    </section>
  );

  return (
    <DataTransitionWrapper
      isLoading={loading}
      error={error}
      loadingComponent={<LoadingComponent />}
      errorComponent={<ErrorComponent />}
    >
      <section className={`min-h-screen py-20 relative overflow-x-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b]' : 'bg-gradient-to-b from-white via-blue-50 to-white'}`}
        style={{ scrollBehavior: 'smooth' }}>
        {/* Cosmic floating dots overlay */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <svg width="100%" height="100%" className="absolute inset-0" style={{ filter: 'blur(2px)' }}>
            <circle cx="15%" cy="20%" r="3" fill="#a259ff" opacity="0.18">
              <animate attributeName="cy" values="20%;25%;20%" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="80%" cy="60%" r="2.5" fill="#00f0ff" opacity="0.13">
              <animate attributeName="cy" values="60%;65%;60%" dur="7s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="80%" r="2" fill="#ff4ecd" opacity="0.15">
              <animate attributeName="cy" values="80%;75%;80%" dur="8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className={`bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-white to-cyan-400' : 'bg-gradient-to-r from-gray-900 to-blue-600'}`}>
                All Collections
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Explore our full range of futuristic fashion products, crafted for the next generation.
            </p>
          </motion.div>
          <div className="w-full flex justify-center">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              {products.map((product, index) => {
                const isInCart = cartItems.some(item => item.id === (product.id || product._id));
                console.log('Product in collection:', product.name, 'ID:', product._id);
                return (
                  <motion.div
                    key={product._id}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1, duration: 0.6, ease: "easeOut" }
                      }
                    }}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className="block"
                      onClick={() => console.log('Navigating to product:', product._id)}
                    >
                      <div
                        className={`relative group glass rounded-2xl overflow-hidden shadow-2xl transition-all duration-400 mx-auto border-2 ${isDarkMode ? 'bg-gradient-to-br from-[#232946] via-[#1a2236] to-[#232946] border-cyan-700 hover:border-cyan-400' : 'bg-gradient-to-br from-white via-blue-50 to-white border-gray-200 hover:border-blue-400'} hover:scale-[1.025]`}
                        style={{
                          boxShadow: isDarkMode
                            ? '0 6px 32px 0 rgba(0,255,255,0.13), 0 0 24px 2px #06b6d455 inset'
                            : '0 4px 32px 0 rgba(0,0,0,0.10), 0 0 24px 2px #a259ff33 inset',
                          position: 'relative',
                          maxWidth: 320,
                          minWidth: 280,
                          width: '100%',
                          padding: 0
                        }}
                      >
                        <div className="relative overflow-hidden z-10 p-5">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 rounded-xl"
                          />
                          {/* Floating action icons */}
                          <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300 shadow-lg">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300 shadow-lg">
                              <Heart size={18} />
                            </button>
                          </div>
                          {/* Neon badge */}
                          <div className="absolute top-3 left-3 flex flex-col space-y-1 z-20">
                            {product.isNew && (
                              <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full neon bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white shadow-md animate-pulse">
                                NEW
                              </span>
                            )}
                            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-md neon">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </span>
                          </div>
                        </div>
                        <div className="px-5 pb-5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-cyan-400 tracking-wide">
                              {product.category}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="text-yellow-400 fill-current" size={14} />
                              <span className="text-xs text-gray-300">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                          <h3 className={`text-lg font-bold mb-2 heading ${isDarkMode ? 'text-white drop-shadow-[0_2px_8px_#06b6d4cc]' : ''}`} style={{ textShadow: isDarkMode ? '0 2px 12px #06b6d4cc' : '0 2px 12px #a259ff44' }}>
                            {product.name}
                          </h3>
                          <div className="flex items-center space-x-2 mb-3">
                            {product.colors.map((color, index) => (
                              <button
                                key={index}
                                className="w-5 h-5 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform duration-200"
                                style={{ backgroundColor: color }}
                              ></button>
                            ))}
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className={`text-xl font-bold neon ${isDarkMode ? 'text-cyan-300' : ''}`} style={{ color: isDarkMode ? '' : 'var(--color-neon-pink)' }}>
                                ₹{product.price}
                              </span>
                              <span className="text-base line-through text-slate-500">
                                ₹{product.originalPrice}
                              </span>
                            </div>
                            <span className={`text-sm font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Save ₹{(product.originalPrice - product.price).toFixed(2)}</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isInCart) {
                                addToCart({ ...product, id: product._id });
                              }
                            }}
                            className={`w-full py-2.5 px-3 rounded-lg font-semibold flex items-center justify-center space-x-2 neon shadow-lg transition-all duration-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm ${isInCart ? 'opacity-80 cursor-not-allowed' : ''} ${isDarkMode ? (isInCart ? 'bg-cyan-800 text-white' : 'bg-gradient-to-r from-cyan-600 via-cyan-400 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500') : 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white hover:from-pink-600 hover:to-cyan-500'}`}
                            disabled={isInCart}
                          >
                            {isInCart ? 'Added' : 'Add to Cart'}
                          </motion.button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </DataTransitionWrapper>
  );
};

export default Collection;