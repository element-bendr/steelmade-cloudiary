"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { fetchImage } from "@/lib/utils/fetch-retry";
import { ImageAsset } from "@/types/image-types";
import { getImageUrl } from "@/lib/utils/image-utils";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string | ImageAsset;
  fallbackSrc?: string;
  aspectRatio?: string;
}

const DEFAULT_DIMENSIONS = {
  width: 800,
  height: 600
};

export function OptimizedImage({ 
  src, 
  fallbackSrc = "/images/collections/placeholder-collection.webp",
  showLoadingState = true,
  alt,
  aspectRatio,
  className = "",
  ...props 
}: OptimizedImageProps & { showLoadingState?: boolean; className?: string }) {
  const imageUrl = getImageUrl(src);
  const isLocalImage = imageUrl.startsWith('/');
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [localRetryCount, setLocalRetryCount] = useState(0);

  // Debug log
  console.log('Attempting to load image:', { imageUrl, imageSrc, isLocalImage });

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleImageError = async () => {
    console.error('Image failed to load:', { imageUrl, imageSrc, isLocalImage });
    
    if (isLocalImage) {
      if (localRetryCount < 2) { // Limit local retries
        setLocalRetryCount(prev => prev + 1);
        const newSrc = `${imageUrl}?v=${Date.now()}`;
        console.log(`Retrying local image (attempt ${localRetryCount + 1}):`, newSrc);
        setImageSrc(newSrc);
        return;
      } else {
        console.warn('Local image failed after multiple retries, using fallback:', { imageUrl });
      }
    } else {
      try {
        // Only use fetch retry mechanism for remote images
        const response = await fetchImage(imageUrl);
        if (response.ok) {
          const newSrc = `${imageUrl}?retry=${Date.now()}`;
          console.log('Retrying remote image with:', newSrc);
          setImageSrc(newSrc);
          // Reset loading state for the new attempt if it was a remote image that failed initially
          // and is now being retried.
          setIsLoading(true); 
          setError(false);
          return;
        }
        console.error('Fetch response not ok:', response.status, response.statusText);
      } catch (err) {
        console.error("Error fetching image:", { error: err, url: imageUrl });
      }
    }

    // If all retries fail or for non-retryable local errors, show fallback
    setError(true);
    setImageSrc(fallbackSrc);
    setIsLoading(false);
  };

  const combinedClassName = twMerge(`
    transition-all duration-300 ease-in-out
    ${isLoading ? "opacity-0" : "opacity-100"}
    ${error ? "bg-gray-100" : ""}
    ${className}
  `);

  return (
    <div className="relative overflow-hidden">
      {showLoadingState && isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300" />
      )}
      <Image
        src={imageSrc}
        alt={alt}
        className={combinedClassName}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    </div>
  );
}
