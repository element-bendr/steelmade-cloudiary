import React from 'react';
import { Button } from "@/components/ui/button";
import { productStyles } from '@/lib/styles/productStyles';

interface ChairContactButtonProps {
  onClick: () => void;
  selectedVariant?: {
    name: string;
  } | null;
  productName: string;
  className?: string;
}

export const ChairContactButton: React.FC<ChairContactButtonProps> = ({
  onClick,
  selectedVariant,
  productName,
  className = '',
}) => {
  return (
    <div className={`${productStyles.components.contactButton.container} ${className}`}>
      <Button
        onClick={onClick}
        className={productStyles.components.contactButton.button}
        aria-label={selectedVariant ? `Contact sales about ${productName} (${selectedVariant.name})` : `Contact sales about ${productName}`}
      >
        Contact Sales
      </Button>
      {selectedVariant && (
        <div className={productStyles.components.contactButton.variantText} aria-live="polite">
          Selected: {selectedVariant.name}
        </div>
      )}
    </div>
  );
};

export default ChairContactButton;