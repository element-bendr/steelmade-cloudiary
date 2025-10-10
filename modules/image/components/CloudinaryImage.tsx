'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { getCloudinaryImageWithTransform } from '@/modules/image/utils';

interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
  publicId: string;
  transformations?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'crop' | 'scale' | 'fit' | 'limit' | 'thumb';
    quality?: number;
  };
}

/**
 * CloudinaryImage component for displaying optimized images from Cloudinary
 */
export function CloudinaryImage({
  publicId,
  transformations,
  alt,
  ...rest
}: CloudinaryImageProps) {
  // Generate the Cloudinary URL with transformations
  const imageUrl = getCloudinaryImageWithTransform(publicId, transformations || {});
  
  return (
    <Image
      src={imageUrl}
      alt={alt || 'Image'}
      {...rest}
    />
  );
}

/**
 * Default export of CloudinaryImage component
 */
export default CloudinaryImage;