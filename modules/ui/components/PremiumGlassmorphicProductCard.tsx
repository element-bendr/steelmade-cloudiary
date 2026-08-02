'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/modules/product/types';
import { getDirectorChairVariantImageUrl, getChairNameFromSlug } from '@/modules/image/utils';
import { BRAND_COLORS, SHADOWS, TRANSITIONS, BORDER_RADIUS } from '@/modules/ui/utils';

interface PremiumGlassmorphicProductCardProps {
  product: Product;
  className?: string;
}

/**
 * PremiumGlassmorphicProductCard - An enhanced version of the product card with premium styling
 * that aligns with the SteelMade brand identity
 */
export function PremiumGlassmorphicProductCard({
  product,
  className = ''
}: PremiumGlassmorphicProductCardProps) {
  // Get the main image for display
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : '';
  
  // Determine if this is a director series chair
  const isDirectorSeries = product.seriesSlug === 'director-series';
  
  // For director series, use Cloudinary URLs from first variant
  const imageUrl = isDirectorSeries 
    ? getDirectorChairVariantImageUrl(getChairNameFromSlug(product.slug), 'hb')
    : mainImage;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -8,
        boxShadow: SHADOWS['card-hover'],
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      className={`
        group relative overflow-hidden rounded-xl backdrop-blur-md
        bg-white/10 dark:bg-black/20 border border-white/20
        shadow-lg transition-all duration-300
        dark:hover:border-white/30
        ${className}
      `}
    >
      <Link href={`/chairs/director-series/${product.slug}`} className="block h-full">
        <div className="flex flex-col h-full">
          {/* Red accent corner decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/80 to-red-700/80 transform rotate-45 translate-x-12 -translate-y-12 z-0"></div>
          
          {/* Product image with gradient overlay */}
          <div className="relative w-full h-64 overflow-hidden">
            {imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
                
                {/* Premium badge for featured products */}
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-800 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md z-10">
                    Premium
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          
          {/* Product information with premium styling */}
          <div className="p-6 flex flex-col flex-grow relative z-10">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#B91C1C] transition-colors duration-300">
              {product.name}
            </h3>
            
            <p className="mb-6 text-gray-700 dark:text-gray-300 line-clamp-2 flex-grow">
              {product.description}
            </p>
            
            {/* Variants with enhanced styling */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-auto">
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  Available Variants
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <span 
                      key={variant.id.toString()} 
                      className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full 
                      text-gray-700 dark:text-gray-200 border border-white/30 shadow-sm
                      transition-all duration-300 hover:bg-white/30 hover:border-white/40"
                    >
                      {variant.variantName}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* View details button with brand styling */}
            <div className="mt-6 pt-4 border-t border-gray-200/20">
              <span className="flex items-center justify-between text-[#B91C1C] font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                <span>View Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}