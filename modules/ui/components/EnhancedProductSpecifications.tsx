'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_COLORS } from '../utils';

interface EnhancedProductSpecificationsProps {
  specifications: Record<string, string | number | boolean> | undefined;
  className?: string;
}

/**
 * EnhancedProductSpecifications component for displaying product specifications
 * with improved visual design and animations
 */
export function EnhancedProductSpecifications({
  specifications,
  className = '',
}: EnhancedProductSpecificationsProps) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  // Format specification keys for better display
  const formatKey = (key: string): string => {
    return key
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Format specification values for better display
  const formatValue = (value: string | number | boolean): string => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return String(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-6 ${className}`}
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Specifications
      </h3>
      
      <div className="bg-white/5 backdrop-blur-sm dark:bg-gray-800/30 rounded-lg p-4">
        <dl className="grid grid-cols-1 gap-3">
          {Object.entries(specifications).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="grid grid-cols-2 gap-2 p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
            >
              <dt className="font-medium text-gray-600 dark:text-gray-400 flex items-center">
                <div className="w-2 h-2 bg-[#B91C1C] rounded-full mr-2"></div>
                {formatKey(key)}
              </dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">
                {formatValue(value)}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </motion.div>
  );
}

/**
 * Default export for EnhancedProductSpecifications component
 */
export default EnhancedProductSpecifications;