'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '../../product/types';
import { getDirectorChairVariantImageUrl, getChairNameFromSlug } from '@/modules/image/utils';

interface GlassmorphicProductCardProps {
  product: Product;
  className?: string;
}

/**
 * GlassmorphicProductCard component for displaying products with a glassmorphic effect
 */
export function GlassmorphicProductCard({
  product,
  className = ''
}: GlassmorphicProductCardProps) {
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
      transition={{ duration: 0.3 }}
      className={`
        relative overflow-hidden rounded-xl backdrop-blur-md 
        bg-white/10 dark:bg-black/20 shadow-lg border border-white/20
        transition-all duration-300 hover:shadow-xl p-6
        ${className}
      `}
    >
      <Link href={`/chairs/director-series/${product.slug}`} className="block">
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {product.name}
        </h3>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300 line-clamp-2">
          {product.description}
        </p>
        
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {product.variants.slice(0, 3).map((variant) => (
              <span key={variant.id.toString()} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                {variant.variantName}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}