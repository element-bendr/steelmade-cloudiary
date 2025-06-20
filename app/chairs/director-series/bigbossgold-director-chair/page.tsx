'use client';

import React, { useState, useEffect } from 'react';
import { EnhancedProductDetailLayout } from '@/modules/ui/components';
import { Product } from '@/modules/product/types';
import { bigBossGoldDirectorChair } from '@/lib/data/products/chairs/director-series/bigbossgold-director-chair';

/**
 * Product detail page for BigBoss Gold Director Chair
 */
export default function BigBossGoldDirectorChairPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        
        // Convert the imported chair data to match the Product type
        const productData = {
          ...bigBossGoldDirectorChair,
          slug: 'bigbossgold-director-chair',
          categorySlug: 'chairs',
          seriesSlug: 'director-series',
          // Ensure images field is compatible with Product type
          images: bigBossGoldDirectorChair.images?.map(img => img.url) || [],
          // Convert variants to match expected format
          variants: bigBossGoldDirectorChair.variants?.map(variant => ({
            id: variant.variantId,
            variantId: variant.variantId,
            variantName: variant.variantName,
            name: variant.name,
            imageUrl: variant.imageUrl,
            images: [{ url: variant.imageUrl, alt: variant.name }]
          })) || []
        } as unknown as Product;
        
        console.log('Product loaded directly from import:', productData);
        setProduct(productData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error processing product:', error);
        setError(`Failed to load product details. Error: ${error instanceof Error ? error.message : String(error)}`);
        setIsLoading(false);
      }
    }
    
    loadProduct();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-red-700 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-6 bg-red-50 rounded-lg text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-6 bg-yellow-50 rounded-lg text-yellow-700">
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <p>Sorry, we couldn't find the BigBoss Gold Director Chair. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return <EnhancedProductDetailLayout product={product} />;
}