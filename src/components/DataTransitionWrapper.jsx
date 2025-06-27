import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DataTransitionWrapper = ({ 
  children, 
  isLoading, 
  error, 
  loadingComponent, 
  errorComponent,
  className = "",
  staggerChildren = false,
  delay = 0
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: staggerChildren ? 0.1 : 0
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return loadingComponent || (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={className}
      >
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return errorComponent || (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={className}
      >
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">Error</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="data-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={className}
      >
        {staggerChildren ? (
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        ) : (
          children
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default DataTransitionWrapper; 