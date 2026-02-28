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
      className={`relative aspect-[4/3] md:aspect-square overflow-x-auto snap-x snap-mandatory overflow-hidden rounded-sm bg-neutral-50 flex items-center justify-center hide-scrollbar ${className}`}
      style={{ maxHeight: 600 }}
    >
      <div className="w-full h-full shrink-0 snap-center relative">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className={
            'object-contain w-full h-full max-w-full max-h-full p-4 md:p-8'
          }
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default ChairImageDisplay;