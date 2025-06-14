'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductImage } from '@/types/products'; // Assuming ProductImage is defined in types/products.ts
// If ProductImage is in image-types.ts, use: import type { ImageAsset as ProductImage } from '@/types/image-types';

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  // Moved useState to the top, before any conditional returns
  const [currentImage, setCurrentImage] = useState(images && images.length > 0 ? images[0] : null);

  if (!images || images.length === 0 || !currentImage) { // Added !currentImage check
    return (
      <div className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
        <p>No Image Available</p>
      </div>
    );
  }

  const handleThumbnailClick = (image: ProductImage) => {
    setCurrentImage(image);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[4/3] rounded-lg shadow-md overflow-hidden border border-gray-200">
        <Image
          src={currentImage.url}
          alt={currentImage.alt || productName}
          fill
          style={{ objectFit: 'contain' }} // Changed to 'contain' to show the whole image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(image)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors
                          ${image.url === currentImage.url ? 'border-blue-500' : 'border-transparent hover:border-gray-400'}`}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
