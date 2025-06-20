import React from 'react';
import Image from 'next/image';
import { productStyles } from '@/lib/styles/productStyles';

interface ChairImageDisplayProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export const ChairImageDisplay: React.FC<ChairImageDisplayProps> = ({
  imageUrl,
  alt,
  className = '',
}) => {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white/70 flex items-center justify-center ${className}`}
      style={{ maxHeight: 420 }}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={
          'object-contain w-full h-full max-w-full max-h-full p-8'
        }
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Ensure the decorator is always visible with consistent styling */}
      <div className={`${productStyles.components.image.decorator} absolute top-0 right-0 w-16 h-16 bg-red-700 opacity-20 z-10`}></div>
    </div>
  );
};

export default ChairImageDisplay;