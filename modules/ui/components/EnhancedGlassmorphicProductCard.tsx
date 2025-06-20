'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '../../product/types';
import { getDirectorChairVariantImageUrl, getChairNameFromSlug } from '@/modules/image/utils';
import { BRAND_COLORS } from '../utils';

interface GlassmorphicProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Enhanced GlassmorphicProductCard component for displaying products with a premium 
 * glassmorphism effect and brand styling
 */
export function EnhancedGlassmorphicProductCard({
  product,
  className = ''
}: GlassmorphicProductCardProps) {
  // Get the main image for display
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : '';
  
  // Determine if this is a director series chair
  const isDirectorSeries = product.seriesSlug === 'director-series';
  
  // Use appropriate image source
  const imageUrl = isDirectorSeries 
    ? getDirectorChairVariantImageUrl(getChairNameFromSlug(product.slug), 'hb')
    : mainImage;
  
  return (
    <motion.div
      whileHover={{ 
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      className={`
        relative overflow-hidden rounded-xl backdrop-blur-md 
        bg-white/10 dark:bg-black/20 shadow-lg border border-white/20
        transition-all duration-300 h-full
        ${className}
      `}
    >
      <Link href={`/chairs/director-series/${product.slug}`} className="block h-full">
        <div className="flex flex-col h-full">
          {/* Image container with gradient overlay */}
          <div className="relative w-full h-64 overflow-hidden">
            {imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain transform transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            
            {/* Premium badge for featured products */}
            {product.featured && (
              <div className="absolute top-4 right-4 bg-[#B91C1C] text-white text-xs px-2 py-1 rounded-full font-medium">
                Premium
              </div>
            )}
          </div>
          
          {/* Content area */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#B91C1C] transition-colors duration-300">
              {product.name}
            </h3>
            
            <p className="mb-4 text-gray-700 dark:text-gray-300 line-clamp-2 flex-grow">
              {product.description}
            </p>
            
            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {product.variants.slice(0, 3).map((variant) => (
                  <span 
                    key={variant.id.toString()} 
                    className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-gray-800 dark:text-white border border-white/30 shadow-sm"
                  >
                    {variant.variantName}
                  </span>
                ))}
              </div>
            )}
            
            {/* View details button */}
            <div className="mt-4 pt-4 border-t border-gray-200/20">
              <span className="text-[#B91C1C] font-medium text-sm flex items-center">
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}