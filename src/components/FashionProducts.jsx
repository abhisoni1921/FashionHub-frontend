import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Heart, ShoppingCart, Star, Eye, Loader2, ArrowUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import DataTransitionWrapper from './DataTransitionWrapper';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, type: 'spring', stiffness: 60 }
  })
};

// Skeleton Card for loading fallback
const SkeletonCard = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="relative group glass rounded-lg overflow-hidden shadow-xl mx-auto animate-pulse bg-gradient-to-br from-gray-100 to-gray-200 min-h-[340px]"
  >
    <div className="h-48 w-full bg-gray-200 rounded-xl mb-4" />
    <div className="px-5 pb-5">
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
      <div className="h-6 w-2/3 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-3" />
      <div className="h-10 w-full bg-gray-300 rounded" />
    </div>
  </motion.div>
);

// Lazy load ProductCard
const ProductCard = lazy(() => import('./ProductCard'));

const FashionProducts = () => {
  const { isDarkMode } = useTheme();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://fashionhub-backend-production.up.railway.app/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.slice(0, 8));
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Scroll to top button logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom loading component
  const LoadingComponent = () => (
    <section id="products" className={`py-20 relative overflow-x-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b]' : ''}`}
      aria-busy="true" aria-live="polite">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 flex flex-col items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className={`w-10 h-10 animate-spin mb-6 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
        >
          Loading products...
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl"
        >
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </motion.div>
      </div>
    </section>
  );

  // Custom error component
  const ErrorComponent = () => (
    <section id="products" className={`py-20 relative overflow-x-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b]' : ''}`}
      aria-live="polite">
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
      <section id="products" className={`py-20 relative overflow-x-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b]' : ''}`}
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
              <span className={`bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-white to-cyan-400' 
                  : 'bg-gradient-to-r from-gray-900 to-blue-600'
              }`}>
                Future Fashion
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover cutting-edge fashion items powered by autonomous technology and smart materials
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
              <Suspense fallback={<SkeletonCard />}>
                {products.map((product, i) => (
                  <motion.div
                    key={product._id}
                    variants={cardVariants}
                    custom={i}
                  >
                    <ProductCard
                      product={product}
                      index={i}
                      isDarkMode={isDarkMode}
                      addToCart={addToCart}
                    />
                  </motion.div>
                ))}
              </Suspense>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/collection">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border ${isDarkMode ? 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400' : 'border-blue-500/50 text-blue-600 hover:bg-blue-500/10 hover:border-blue-500'}`}>
                View All Products
              </motion.button>
            </Link>
          </motion.div>
          {/* Scroll to Top Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-lg transition-all border-2 border-white"
            aria-label="Scroll to top"
          >
            <ArrowUp size={22} />
          </motion.button>
        </div>
        {/* Keyframes for animated gradient button */}
        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </section>
    </DataTransitionWrapper>
  );
};

export default FashionProducts;

