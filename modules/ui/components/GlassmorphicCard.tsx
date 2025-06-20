'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CardProps } from '../types';
import { OptimizedCloudinaryImage } from '@/modules/image/components';

/**
 * GlassmorphicCard component for displaying content with a glassmorphic effect
 */
export function GlassmorphicCard({
  className = '',
  title,
  description,
  imageSrc,
  imageAlt = '',
  href,
  variant = 'default',
  id,
  testId
}: CardProps) {
  // Base classes for card
  const cardClasses = `
    relative overflow-hidden rounded-xl backdrop-blur-md 
    bg-white/10 dark:bg-black/20 shadow-lg border border-white/20
    transition-all duration-300 hover:shadow-xl
    ${variant === 'featured' ? 'md:col-span-2' : ''}
    ${variant === 'compact' ? 'p-4' : 'p-6'}
    ${className}
  `;
  
  // Card content
  const cardContent = (
    <>
      {imageSrc && (
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
          <OptimizedCloudinaryImage
            publicId={imageSrc}
            alt={imageAlt || (title || '')}
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      {title && (
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-gray-700 dark:text-gray-300">
          {description}
        </p>
      )}
    </>
  );
  
  // Render with or without link
  return href ? (
    <Link href={href} className={cardClasses} id={id} data-testid={testId}>
      {cardContent}
    </Link>
  ) : (
    <div className={cardClasses} id={id} data-testid={testId}>
      {cardContent}
    </div>
  );
}