'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface EnhancedProductFeaturesProps {
  features?: string[];
}

/**
 * EnhancedProductFeatures component for displaying product features
 * with consistent styling and grid layout
 */
export function EnhancedProductFeatures({ features = [] }: EnhancedProductFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Key Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Check className="h-5 w-5 text-red-700 dark:text-red-500" />
            </div>
            <span className="ml-2 text-gray-700 dark:text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Default export for EnhancedProductFeatures component
 */
export default EnhancedProductFeatures;