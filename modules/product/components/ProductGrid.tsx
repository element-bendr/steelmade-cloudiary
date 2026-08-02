'use client';

import React from 'react';
import { Product } from '@/modules/product/types';
import { GlassmorphicProductCard } from '@/modules/ui/components';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

/**
 * ProductGrid component for displaying a grid of products
 */
export function ProductGrid({ products, className = '' }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-gray-600 dark:bg-gray-900/20 dark:text-gray-400">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {products.map((product) => (
        <GlassmorphicProductCard
          key={product.id.toString()}
          product={product}
        />
      ))}
    </div>
  );
}