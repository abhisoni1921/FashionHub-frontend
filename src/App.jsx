import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FashionProducts from './components/FashionProducts';
import Features from './components/Features';
import Stats from './components/Stats';
import Footer from './components/Footer';
import Login from './components/Login';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';
import AdminApp from './admin/AdminApp';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import Sale from './pages/Sale';
import NewArrivals from './pages/NewArrivals';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    // Enhanced smooth scrolling for anchor links and navigation
    const handleSmoothScroll = (e) => {
      const target = e.target;
      
      // Handle anchor links
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
      
      // Handle navigation links that might have data-scroll attributes
      if (target.hasAttribute('data-scroll')) {
        e.preventDefault();
        const targetId = target.getAttribute('data-scroll');
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Handle programmatic smooth scrolling
    const handleProgrammaticScroll = (e) => {
      if (e.detail && e.detail.scrollTo) {
        const { target, options = {} } = e.detail;
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: options.block || 'start',
            inline: options.inline || 'nearest'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    document.addEventListener('smoothScroll', handleProgrammaticScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      document.removeEventListener('smoothScroll', handleProgrammaticScroll);
    };
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/admin/*" element={<AdminApp />} />
              <Route
                path="/*"
                element={
                  <div className="overflow-x-hidden">
                    <Header onLoginClick={() => setIsLoginOpen(true)} />
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <>
                            <Hero />
                            <FashionProducts />
                            <Features />
                            <Stats />
                            <Footer />
                          </>
                        }
                      />
                      <Route path="collection" element={<Collection />} />
                      <Route path="product/:id" element={<ProductDetail />} />
                      <Route path="cart" element={<Cart />} />
                      <Route path="sale" element={<Sale />} />
                      <Route path="new-arrivals" element={<NewArrivals />} />
                      <Route path="contact" element={<Contact />} />
                    </Routes>
                    <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                  </div>
                }
              />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
