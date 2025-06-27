import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  const footerLinks = [
    {
      title: 'Shop',
      links: ['New Arrivals', 'Best Sellers', 'Sale', 'Collections']
    },
    {
      title: 'Help',
      links: ['Shipping', 'Returns', 'Size Guide', 'FAQs']
    },
    {
      title: 'About',
      links: ['Our Story', 'Careers', 'Press', 'Contact']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility']
    }
  ];

  return (
    <footer className={`relative py-12 bg-transparent overflow-x-hidden ${isDarkMode ? 'bg-gradient-to-t from-[#0a0c1b] via-[#23243a] to-[#0a0c1b]' : ''}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className={`text-3xl font-bold mb-4 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              FashionHub
            </div>
            <p className={`mb-6 leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover the latest fashion trends and express your unique style with our curated 
              collection of designer clothing and accessories.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-400 hover:text-cyan-400 hover:bg-gray-700' 
                        : 'bg-gray-200 text-gray-600 hover:text-blue-600 hover:bg-gray-300'
                    }`}
                    aria-label={social.label}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className={`font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className={`transition-colors duration-300 ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-cyan-400' 
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className={`border-t pt-8 flex flex-col md:flex-row items-center justify-between ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className={`text-sm mb-4 md:mb-0 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © 2024 FashionHub. All rights reserved. Elevating style with premium fashion.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className={`transition-colors duration-300 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-cyan-400' 
                : 'text-gray-600 hover:text-blue-600'
            }`}>
              Track Order
            </a>
            <a href="#" className={`transition-colors duration-300 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-cyan-400' 
                : 'text-gray-600 hover:text-blue-600'
            }`}>
              Customer Service
            </a>
            <a href="#" className={`transition-colors duration-300 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-cyan-400' 
                : 'text-gray-600 hover:text-blue-600'
            }`}>
              Store Locator
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
