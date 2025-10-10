import React from 'react';
import { productStyles } from '@/lib/styles/productStyles';

interface VariantSelectorProps {
  variants: Array<{
    variantId?: string;
    id?: string;
    name: string;
    imageUrl: string;
  }>;
  selectedVariant: {
    variantId?: string;
    id?: string;
    name: string;
    imageUrl: string;
  };
  onVariantChange: (variant: any) => void;
  className?: string;
}

export const ChairVariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantChange,
  className = '',
}) => {
  // Use variantId if available, fall back to id
  const getVariantIdentifier = (variant: any) => {
    return variant.variantId || variant.id;
  };
  
  const selectedId = getVariantIdentifier(selectedVariant);

  return (
    <div className={`${productStyles.components.variantSelector.container} ${className}`}>
      <h3 className={productStyles.typography.sectionHeading}>Available Variants</h3>
      <div className={productStyles.components.variantSelector.buttonsContainer}>
        {variants.map((variant) => {
          const variantId = getVariantIdentifier(variant);
          return (
            <button
              key={variantId}
              onClick={() => onVariantChange(variant)}
              className={`${productStyles.components.variantSelector.button.base} ${
                selectedId === variantId
                  ? productStyles.components.variantSelector.button.selected
                  : productStyles.components.variantSelector.button.unselected
              }`}
              aria-label={`Select ${variant.name} variant`}
            >
              {variant.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChairVariantSelector;