import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, type: 'spring', stiffness: 60 }
  })
};

const ProductCard = ({ product, index, isDarkMode, addToCart }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === (product.id || product._id));
  return (
    <Link to={`/product/${product._id}`} className="block">
      <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
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
            loading="lazy"
            className={`w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 rounded-xl ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl" />}
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
          <button
            className={`w-full py-2.5 px-3 rounded-lg font-semibold flex items-center justify-center space-x-2 neon shadow-lg transition-all duration-300 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm ${isInCart ? 'opacity-80 cursor-not-allowed' : ''} ${isDarkMode ? (isInCart ? 'bg-cyan-800 text-white' : 'bg-gradient-to-r from-cyan-600 via-cyan-400 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500') : 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white hover:from-pink-600 hover:to-cyan-500'}`}
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradientMove 3s ease infinite'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isInCart) {
                addToCart({ ...product, id: product._id });
              }
            }}
            disabled={isInCart}
          >
            <ShoppingCart className="transition-transform duration-300" size={18} />
            <span>{isInCart ? 'Added' : 'Add to Cart'}</span>
          </button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
