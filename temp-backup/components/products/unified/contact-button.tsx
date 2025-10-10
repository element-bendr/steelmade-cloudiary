import React from 'react';
import { Button } from '@/components/ui/button';
import { ProductVariant, isLegacyVariant, adaptLegacyVariant } from '@/types/product-variants-unified';

interface ContactButtonProps {
  selectedVariant: ProductVariant | any | null;
  onContactClick: () => void;
  className?: string;
  buttonText?: string;
}

/**
 * A standardized contact button component with variant information
 * This component handles both standard and legacy variant formats
 */
export function ContactButton({
  selectedVariant,
  onContactClick,
  className = '',
  buttonText = 'Contact Us'
}: ContactButtonProps) {
  // Handle legacy variant format if present
  let variant: ProductVariant | null = null;
  
  if (selectedVariant) {
    if (isLegacyVariant(selectedVariant)) {
      // Convert legacy variant to standardized format
      variant = adaptLegacyVariant(selectedVariant);
    } else if ('id' in selectedVariant && 'name' in selectedVariant) {
      // Already in standardized format
      variant = selectedVariant;
    }
  }

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 ${className}`}>
      <Button
        onClick={onContactClick}
        className="w-full sm:w-auto"
        aria-label={variant ? `${buttonText} about ${variant.name}` : buttonText}
      >
        {buttonText}
      </Button>
      
      {variant && (
        <span 
          className="text-sm text-muted-foreground"
          aria-live="polite"
        >
          Selected: {variant.name}
        </span>
      )}
    </div>
  );
}