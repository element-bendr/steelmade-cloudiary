'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/modules/product/types';
import { OptimizedCloudinaryImage } from '@/modules/image';

interface ProductCardProps {
  product: Product;
  className?: string;
  onClick?: (product: Product) => void;
}

/**
 * ProductCard component for displaying a product in a card layout
 * This is a client component that renders a product card with an image and basic information
 */
export function ProductCard({ product, className = '', onClick }: ProductCardProps) {
  // Get the main image or use a fallback
  const mainImage = product.imageIds && product.imageIds.length > 0
    ? product.imageIds[0]
    : null;
  
  // Handle click event
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md ${className}`}
      onClick={handleClick}
    >
      <div className="aspect-square relative overflow-hidden">
        {mainImage ? (
          <OptimizedCloudinaryImage
            publicId={mainImage}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            transformation={{ crop: 'fill', gravity: 'center' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        
        {product.variants && product.variants.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.variants.slice(0, 3).map((variant) => (
              <span key={variant.variantId} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                {variant.variantName}
              </span>
            ))}
            {product.variants.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                +{product.variants.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="mt-3 flex items-center justify-between">
          <Link
            href={`/${product.categorySlug}/${product.seriesSlug}/${product.slug}`}
            className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
          >
            View Details
          </Link>
          
          {!product.isAvailable && (
            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}