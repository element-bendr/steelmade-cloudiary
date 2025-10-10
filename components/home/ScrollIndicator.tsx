'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HOMEPAGE_THEME } from '../../lib/styles/homepage-theme';

export default function ScrollIndicator() {
  const scrollToContent = () => {
    const firstSection = document.querySelector('section:nth-of-type(2)');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
      onClick={scrollToContent}
    >
      <div className="flex flex-col items-center text-white opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-sm mb-2 font-medium">Explore More</span>
        <div className="w-6 h-10 border-2 border-white rounded-full p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white rounded-full mx-auto"
          />
        </div>
      </div>
    </motion.div>
  );
}