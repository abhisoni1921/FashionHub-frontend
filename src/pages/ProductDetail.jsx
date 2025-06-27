import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Loader2, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataTransitionWrapper from '../components/DataTransitionWrapper';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { addToCart, cartItems } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product with ID:', id);
        
        // Test API connectivity first
        try {
          const testResponse = await fetch('https://fashionhub-backend-production.up.railway.app/api/products');
          console.log('API connectivity test status:', testResponse.status);
          if (!testResponse.ok) {
            throw new Error(`API server not responding: ${testResponse.status}`);
          }
        } catch (err) {
          console.error('API connectivity test failed:', err);
          setError('Cannot connect to API server. Please ensure the server is running on https://fashionhub-backend-production.up.railway.app');
          setLoading(false);
          return;
        }
        
        // Try different API endpoint patterns
        let response;
        let data;
        
        // First try: /api/products/:id
        try {
          response = await fetch(`https://fashionhub-backend-production.up.railway.app/api/products/${id}`);
          console.log('Response status (pattern 1):', response.status);
          
          if (response.ok) {
            data = await response.json();
            console.log('Product data received:', data);
            setProduct(data);
            return;
          }
        } catch (err) {
          console.log('Pattern 1 failed:', err.message);
        }
        
        // Second try: /api/product/:id
        try {
          response = await fetch(`https://fashionhub-backend-production.up.railway.app/api/product/${id}`);
          console.log('Response status (pattern 2):', response.status);
          
          if (response.ok) {
            data = await response.json();
            console.log('Product data received:', data);
            setProduct(data);
            return;
          }
        } catch (err) {
          console.log('Pattern 2 failed:', err.message);
        }
        
        // Third try: Get all products and find by ID
        try {
          response = await fetch('https://fashionhub-backend-production.up.railway.app/api/products');
          console.log('Response status (pattern 3):', response.status);
          
          if (response.ok) {
            const allProducts = await response.json();
            const foundProduct = allProducts.find(p => p._id === id);
            
            if (foundProduct) {
              console.log('Product found in all products:', foundProduct);
              setProduct(foundProduct);
              return;
            } else {
              throw new Error('Product not found in the list');
            }
          }
        } catch (err) {
          console.log('Pattern 3 failed:', err.message);
        }
        
        // If all patterns fail
        throw new Error('Product not found. Please check the API endpoint.');
        
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(`Failed to load product details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Custom loading component
  const LoadingComponent = () => (
    <section className={`min-h-screen py-20 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-gray-100'} transition-colors`}>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
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
              Loading product details...
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Custom error component
  const ErrorComponent = () => (
    <section className={`min-h-screen py-20 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-gray-100'} transition-colors`}>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className={`mb-8 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'} hover:underline text-sm`}
        >
          &larr; Back to Collection
        </motion.button>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-center py-20 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-2xl shadow-2xl border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
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

  // Helper: get available sizes
  const availableSizes = product?.sizes && product.sizes.length > 0
    ? product.sizes
    : ['S', 'M', 'L', 'XL'];
  // Check if this product+size is already in cart
  const isInCart = product && selectedSize && cartItems.some(item => item.id === (product.id || product._id) && item.size === selectedSize);

  return (
    <DataTransitionWrapper
      isLoading={loading}
      error={error}
      loadingComponent={<LoadingComponent />}
      errorComponent={<ErrorComponent />}
    >
      <section className={`min-h-screen py-20 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-gray-100'} transition-colors`}>
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(-1)}
            className={`mb-8 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'} hover:underline text-sm`}
          >
            &larr; Back to Collection
          </motion.button> */}
          
          {product && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row gap-10 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-2xl rounded-2xl p-0 md:p-12 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} transition-all min-h-[70vh]`}
            >
              {/* Product Image */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className={`flex-1 flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'} rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-8 min-h-[400px]`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-xl shadow-2xl w-full max-w-md h-auto object-cover border-4 border-transparent hover:border-cyan-400 transition-all duration-300"
                />
              </motion.div>
              
              {/* Product Details */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex-1 flex flex-col justify-between p-4 md:p-8"
              >
                <div>
                  <button
                    onClick={() => navigate(-1)}
                    className={`flex items-center gap-2 mb-6 text-sm font-medium ${isDarkMode ? 'text-cyan-400 hover:text-white' : 'text-blue-600 hover:text-blue-800'} transition`}
                  >
                    <ArrowLeft size={18} /> Back to Collection
                  </button>
                  <h1 className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{product.name}</h1>
                  <div className={`flex flex-wrap items-center gap-3 text-base mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className="text-cyan-600 font-medium">{product.category}</span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star size={18} className="fill-current" />
                      {product.rating} ({product.reviews})
                    </span>
                    {product.isNew && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 text-white animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {product.description || 'Experience the future of fashion with this cutting-edge product.'}
                  </p>
                  
                  {/* Price Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`text-4xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                        ₹{product.price}
                      </span>
                      <span className="text-2xl line-through text-gray-500">
                        ₹{product.originalPrice}
                      </span>
                      <span className="px-3 py-1 text-base font-semibold rounded-full bg-green-100 text-green-800">
                        Save ₹{(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Color Options */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-8">
                      <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Available Colors</h3>
                      <div className="flex gap-2">
                        {product.colors.map((color, index) => (
                          <button
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform duration-200"
                            style={{ backgroundColor: color }}
                            title={`Color ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Size Selection */}
                  <div className="mb-8">
                    <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Select Size <span className="text-red-500">*</span></h3>
                    <div className="flex gap-3 flex-wrap">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => { setSelectedSize(size); setSizeError(''); }}
                          className={`px-5 py-2 rounded-lg border font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${selectedSize === size ? (isDarkMode ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-blue-600 text-white border-blue-600') : (isDarkMode ? 'bg-slate-800 text-slate-200 border-slate-600 hover:bg-slate-700' : 'bg-white text-slate-700 border-gray-300 hover:bg-gray-100')}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {sizeError && <div className="text-red-500 text-sm mt-2">{sizeError}</div>}
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <motion.button
                    whileHover={{ scale: selectedSize && !isInCart ? 1.02 : 1 }}
                    whileTap={{ scale: selectedSize && !isInCart ? 0.98 : 1 }}
                    onClick={() => {
                      if (!selectedSize) {
                        setSizeError('Please select a size.');
                        return;
                      }
                      if (!isInCart) {
                        addToCart({ ...product, id: product._id, size: selectedSize });
                        setAdded(true);
                        setTimeout(() => setAdded(false), 2000);
                      }
                    }}
                    className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                      isInCart
                        ? 'bg-green-600 cursor-not-allowed opacity-70'
                        : selectedSize
                          ? 'bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500'
                          : 'bg-gray-400 cursor-not-allowed opacity-60'
                    }`}
                    disabled={!selectedSize || isInCart}
                  >
                    {isInCart ? 'Added to Cart' : added ? 'Added!' : 'Add to Cart'}
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </DataTransitionWrapper>
  );
};

export default ProductDetail;
