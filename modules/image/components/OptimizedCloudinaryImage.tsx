'use client';

import React from 'react';
import Image from 'next/image';
import { CloudinaryService } from '../services/cloudinary-service';
import { ImageTransformation } from '../types';

// Initialize the Cloudinary service
const cloudinaryService = new CloudinaryService();

interface OptimizedCloudinaryImageProps {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  transformation?: Partial<ImageTransformation>;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

/**
 * OptimizedCloudinaryImage component for displaying Cloudinary images
 * This is a client component that uses Next.js Image with Cloudinary URLs
 */
export const OptimizedCloudinaryImage: React.FC<OptimizedCloudinaryImageProps> = ({
  publicId,
  alt,
  width,
  height,
  transformation = {},
  className = '',
  priority = false,
  sizes,
  fill = false
}) => {
  const imageUrl = cloudinaryService.buildUrl(publicId, transformation);
  const placeholderUrl = cloudinaryService.getPlaceholderDataUrl();
  
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      placeholder="blur"
      blurDataURL={placeholderUrl}
      sizes={sizes}
      fill={fill}
    />
  );
};

export default OptimizedCloudinaryImage;