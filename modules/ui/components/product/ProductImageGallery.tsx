import React, { useState } from 'react';
import Image from 'next/image';
import { ProductVariant } from '@modules/product/types';

interface ProductImageGalleryProps {
  productName: string;
  chairName: string;
  images: string[];
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
}

/**
 * ProductImageGallery component for displaying product images with thumbnail navigation
 * Includes default image selection, loading states, and error handling
 */
export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  productName,
  chairName,
  images,
  variants,
  selectedVariant,
  onVariantChange,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get the image URL based on selected variant or fallback to product images
  const getImageUrl = () => {
    if (selectedVariant?.images && selectedVariant.images.length > 0) {
      return selectedVariant.images[0];
    }
    
    if (images && images.length > 0) {
      return images[0];
    }
    
    // Default fallback image
    return `https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/${chairName}/default.jpg`;
  };

  const imageUrl = getImageUrl();

  // Reset states when image URL changes
  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [imageUrl]);

  return (
    <div className="relative w-full h-[500px] bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
      {/* Decorative rectangle in top-right corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-red-700/10 z-10" />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {!hasError ? (
        <Image
          src={imageUrl}
          alt={`${productName} - ${selectedVariant?.variantName || 'Main'}`}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
            console.error(`Failed to load image: ${imageUrl}`);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-gray-500">Image could not be loaded</p>
          <p className="text-sm text-gray-400">Please try again later</p>
        </div>
      )}
      
      {/* Variant thumbnails */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        {variants.map((variant) => (
          <button
            key={variant.variantId}
            onClick={() => onVariantChange(variant)}
            className={`relative w-16 h-16 border-2 rounded-md overflow-hidden transition-all ${
              selectedVariant?.variantId === variant.variantId
                ? 'border-red-600 shadow-md'
                : 'border-gray-200 hover:border-gray-400'
            }`}
            aria-label={`Select ${variant.variantName} variant`}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-xs text-red-700 font-medium">{variant.variantName}</span>
            </div>
            {variant.images && variant.images.length > 0 && (
              <Image
                src={variant.images[0]}
                alt={variant.variantName}
                fill
                className="object-cover"
                sizes="64px"
                onError={(e) => {
                  // Hide the image on error, showing the text fallback
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;