import React from 'react';
import { useCart } from '../contexts/CartContext';
import { X, Minus, Plus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [loginRequired, setLoginRequired] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center text-2xl ${isDarkMode ? 'text-slate-400 bg-[#0f172a]' : 'text-slate-500 bg-gray-100'}`}>
        <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" className="w-32 h-32 mb-6 opacity-70" />
        Your cart is empty.
      </div>
    );
  }

  return (
    <section className={`min-h-screen py-20 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-gray-100'} transition-colors`}>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h1 className={`text-3xl font-bold mb-10 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 mb-8 md:mb-0`}>
            {cartItems.map((item) => (
              <div key={item.id} className={`flex items-center gap-4 border-b py-6 last:border-b-0 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}> 
                <img src={item.image} alt={item.name} className={`w-20 h-20 rounded-xl object-cover border ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`} />
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.name}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>₹{item.price.toFixed(2)}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Qty:</span>
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg px-2 py-1">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                        className={`p-1 rounded-full transition-all border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-gray-300 text-slate-600 hover:bg-gray-200'} ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className={`px-2 text-base font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => increaseQuantity(item.id)}
                        className={`p-1 rounded-full transition-all border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-gray-300 text-slate-600 hover:bg-gray-200'} hover:scale-110`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className={`p-2 rounded-full transition ${isDarkMode ? 'hover:bg-red-900' : 'hover:bg-red-100'}`}>
                  <X className="text-red-500" size={20} />
                </button>
              </div>
            ))}
            <button onClick={clearCart} className={`mt-8 w-full py-2 rounded-lg font-semibold transition ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}>Clear Cart</button>
          </div>
          {/* Summary */}
          <div className={`w-full md:w-80 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-2xl shadow-xl p-6 md:p-8 h-fit sticky top-28 self-start`}>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Order Summary</h2>
            <div className="flex justify-between mb-4 text-base">
              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Subtotal</span>
              <span className={`${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6 text-base">
              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Shipping</span>
              <span className={`${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>₹0.00</span>
            </div>
            <div className={`flex justify-between text-lg font-bold border-t pt-4 mb-6 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Total</span>
              <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>₹{total.toFixed(2)}</span>
            </div>
            <button
              className={`w-full py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${isDarkMode ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500'}`}
              onClick={() => {
                if (!user) {
                  setLoginRequired(true);
                  return;
                }
                // Proceed to payment/next step if logged in
              }}
            >
              Checkout
            </button>
            {loginRequired && (
              <div className="mt-3 text-center text-red-400 font-semibold animate-pulse">Login is required</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart; 