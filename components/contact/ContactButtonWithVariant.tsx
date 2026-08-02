import React from 'react';
import { ProductVariant } from '@modules/product/types';

interface ContactButtonWithVariantProps {
  selectedVariant: ProductVariant | null;
  onContactClick: () => void;
  className?: string;
}

/**
 * ContactButtonWithVariant component
 * Shows a contact button with the selected variant name
 */
export const ContactButtonWithVariant: React.FC<ContactButtonWithVariantProps> = ({
  selectedVariant,
  onContactClick,
  className = '',
}) => {
  const variantName = selectedVariant?.variantName;
  const buttonLabel = `Contact for Inquiry${variantName ? ` - ${variantName}` : ''}`;

  return (
    <div className={`${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <button
          onClick={onContactClick}
          className="bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-md shadow-sm transition-colors w-full sm:w-auto"
          aria-label={buttonLabel}
        >
          Contact for Inquiry
        </button>
        
        {variantName && (
          <span 
            className="text-gray-500 text-sm"
            aria-live="polite"
          >
            Selected: <span className="font-medium">{variantName}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ContactButtonWithVariant;