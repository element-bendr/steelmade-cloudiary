'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/modules/product/types';
import { getDirectorChairVariantImageUrl, getChairNameFromSlug } from '@/modules/image/utils';

interface PremiumDirectorSeriesGridProps {
  products: Product[];
  title?: string;
  description?: string;
  className?: string;
}

/**
 * PremiumDirectorSeriesGrid - An enhanced grid component for displaying
 * director series products with premium styling and animations
 */
export function PremiumDirectorSeriesGrid({
  products,
  title = 'Director Series Chairs',
  description = 'Our Director Series chairs combine premium materials with ergonomic design, perfect for professional environments that demand both style and comfort.',
  className = '',
}: PremiumDirectorSeriesGridProps) {
  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h1>
      
      <p className="mb-8 text-gray-700 dark:text-gray-300 max-w-3xl">
        {description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const chairName = getChairNameFromSlug(product.slug);
          const defaultVariant = product.variants && product.variants.length > 0 
            ? product.variants[0] 
            : null;
          
          const imageUrl = defaultVariant 
            ? getDirectorChairVariantImageUrl(chairName, defaultVariant.variantId)
            : product.images && product.images.length > 0 
              ? product.images[0] 
              : '';
          
          return (
            <Link 
              href={`/chairs/director-series/${product.slug}`} 
              key={product.id}
              className="block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all duration-150">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants && product.variants.map((variant) => (
                      <span key={variant.variantId} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                        {variant.variantName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Default export for PremiumDirectorSeriesGrid component
 */
export default PremiumDirectorSeriesGrid;