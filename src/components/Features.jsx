import React from 'react';
import { ShoppingBag, Truck, RefreshCcw, Heart, Crown, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Features = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: ShoppingBag,
      title: 'Express Shopping',
      description: 'Quick and easy shopping experience with smart filters and personalized recommendations for your style.',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50 with our premium delivery partners ensuring your fashion arrives on time.',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: RefreshCcw,
      title: 'Easy Returns',
      description: '30-day hassle-free returns with our no-questions-asked policy and free return shipping.',
      gradient: 'from-purple-600 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Curated Collections',
      description: 'Hand-picked fashion selections from top designers and trending styles updated weekly.',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      icon: Crown,
      title: 'Premium Quality',
      description: 'Carefully selected high-quality materials and craftsmanship from renowned fashion brands.',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Safe and secure payment processing with buyer protection and privacy guarantee.',
      gradient: 'from-orange-500 to-cyan-400'
    }
  ];

  return (
    <section id="features" className={`py-20 relative overflow-x-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b]' : ''}`}>
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* ...svg stars... */}
      </div>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={`bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white to-cyan-400' 
                : 'bg-gradient-to-r from-gray-900 to-blue-600'
            }`}>
              Why Shop With Us
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience premium fashion shopping with features designed for style-conscious shoppers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/50' 
                    : 'bg-white border border-gray-200 hover:border-blue-500/50 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10' 
                    : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                }`}></div>

                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white" size={28} />
                </div>

                <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-white group-hover:text-cyan-400' 
                    : 'text-gray-900 group-hover:text-blue-600'
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>

                <div className={`absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'
                }`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
