import React, { useState } from 'react';
import { ProductVariant } from '@/types/product-variants-unified';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
  className?: string;
}

/**
 * A standardized variant selector component using the unified type system
 */
export function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
  className = ''
}: VariantSelectorProps) {
  if (!variants.length) return null;
  
  return (
    <div className={className}>
      <h3 className="text-sm font-medium mb-3">Options</h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelectVariant(variant)}
            className={`px-3 py-2 text-sm border rounded-md transition-colors
              ${selectedVariant?.id === variant.id 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-background hover:bg-muted border-input'
              }`}
            aria-pressed={selectedVariant?.id === variant.id}
          >
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Hook for managing variant selection with the unified type system
 */
export function useVariantSelection(variants: ProductVariant[]) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants.length > 0 ? variants[0] : null
  );
  
  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };
  
  return {
    selectedVariant,
    setSelectedVariant,
    handleSelectVariant
  };
}