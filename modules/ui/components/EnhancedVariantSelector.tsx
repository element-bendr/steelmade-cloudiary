'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProductVariant } from '@/modules/product/types';

/**
 * Props for the EnhancedVariantSelector component
 */
interface EnhancedVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onChange: (variant: ProductVariant) => void;
}

/**
 * EnhancedVariantSelector component for selecting product variants
 * with improved visual styling and brand colors
 */
export function EnhancedVariantSelector({
  variants,
  selectedVariant,
  onChange
}: EnhancedVariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <motion.button
          key={variant.variantId}
          onClick={() => onChange(variant)}
          whileTap={{ scale: 0.97 }}
          className={`px-4 py-2 rounded-md transition-all ${
            selectedVariant?.variantId === variant.variantId
              ? 'bg-red-700 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-red-700 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {variant.variantName}
        </motion.button>
      ))}
    </div>
  );
}

/**
 * Default export for EnhancedVariantSelector component
 */
export default EnhancedVariantSelector;