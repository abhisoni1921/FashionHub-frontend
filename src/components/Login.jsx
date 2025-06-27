import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, X, User, Phone } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Login = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { login: loginContext, register: registerContext } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    }
  }, [isOpen]);

  const onAnimationEnd = () => {
    if (!isOpen) {
      setIsRendered(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        if (!agreedToTerms) {
          toast.error('You must agree to the terms.');
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match.');
          setLoading(false);
          return;
        }
        const res = await fetch('https://fashionhub-backend-production.up.railway.app/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            agreedToTerms: agreedToTerms
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        registerContext(data.user || { name: formData.name, email: formData.email, phone: formData.phone });
        toast.success('Registration successful! Please log in.');
        setIsSignUp(false);
        setFormData({ email: '', password: '', confirmPassword: '', name: '', phone: '' });
        setAgreedToTerms(false);
      } else {
        const res = await fetch('https://fashionhub-backend-production.up.railway.app/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Invalid email or password');
        loginContext(data.user || { email: formData.email });
        toast.success('Login successful!');
        setFormData({ email: '', password: '', confirmPassword: '', name: '', phone: '' });
        if (onClose) onClose();
        navigate('/');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isRendered) return null;

  return (
    <>
      <Toaster position="top-center" />
      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onTransitionEnd={onAnimationEnd}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className={`relative w-full max-w-md rounded-2xl shadow-lg transition-all duration-300 ease-in-out mx-2 sm:mx-auto ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} ${
          isDarkMode 
            ? 'bg-gray-900 border border-gray-800' 
            : 'bg-white border border-gray-200'
        }`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="p-6 sm:p-8 sm:pb-4 text-center">
            <div className="flex justify-center mb-2">
              <span className={`text-3xl font-extrabold tracking-tight ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              }`}>
                FashionHub
              </span>
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isSignUp 
                ? 'Sign up to unlock exclusive fashion deals and trends.' 
                : 'Sign in to your FashionHub account.'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-6">
            <div className="space-y-4">
              {isSignUp && (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 text-base sm:text-sm ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Enter your full name"
                        required
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Phone
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 text-base sm:text-sm ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Enter your phone number"
                        required
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 text-base sm:text-sm ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 text-base sm:text-sm ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {isSignUp && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 text-base sm:text-sm ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Confirm your password"
                      required
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
              )}
              {isSignUp && (
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms((prev) => !prev)}
                    className="mr-2 accent-blue-600"
                    required
                  />
                  <label htmlFor="terms" className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    I agree to the <a href="#" className="underline">Terms & Conditions</a>
                  </label>
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`w-full mt-5 py-3 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-lg shadow-lg group ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 focus:ring-cyan-500'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500'
              }`}
              disabled={loading}
            >
              {isSignUp ? 'Sign Up' : 'Login'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm">
              <button
                type="button"
                className={`mb-2 sm:mb-0 underline font-medium ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}
                onClick={() => setIsSignUp((prev) => !prev)}
                disabled={loading}
              >
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
              </button>
              {!isSignUp && (
                <button
                  type="button"
                  className={`underline font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  onClick={() => toast('Password reset is not implemented yet.', { icon: 'ℹ️' })}
                  disabled={loading}
                >
                  Forgot password?
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
