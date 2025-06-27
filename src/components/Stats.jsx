import React from 'react';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Stats = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    {
      icon: Users,
      value: '2M+',
      label: 'Happy Customers',
      description: 'Trust our fashion expertise'
    },
    {
      icon: TrendingUp,
      value: '15K+',
      label: 'Products',
      description: 'Unique fashion items'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Support',
      description: 'Always here to help'
    },
    {
      icon: Award,
      value: '100+',
      label: 'Brands',
      description: 'Premium partnerships'
    }
  ];

  return (
    <section id="stats" className={`py-16 relative overflow-x-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0c1b] via-[#23243a] to-[#0a0c1b]' : ''}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}>
                  <IconComponent className="text-white" size={28} />
                </div>
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xl font-semibold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.label}
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
