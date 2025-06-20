import React from 'react';
import { ProductVariant } from '@modules/product/types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
  className?: string;
}

/**
 * VariantSelector component for selecting product variants
 * Uses brand red color for text and provides clear visual feedback
 */
export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantChange,
  className = '',
}) => {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-2">Available Variants</h3>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <button
            key={variant.variantId}
            onClick={() => onVariantChange(variant)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              selectedVariant?.variantId === variant.variantId
                ? 'bg-red-700 text-white'
                : 'bg-gray-100 text-red-700 hover:bg-gray-200'
            }`}
            aria-pressed={selectedVariant?.variantId === variant.variantId}
          >
            {variant.variantName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;