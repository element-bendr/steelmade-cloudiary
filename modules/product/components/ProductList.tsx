'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/modules/product/types';
import { productService } from '@/modules/product/services';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  categorySlug: string;
  seriesSlug?: string;
  limit?: number;
  className?: string;
  onSelectProduct?: (product: Product) => void;
}

/**
 * ProductList component for displaying a grid of products
 * This is a client component that fetches and displays products
 */
export function ProductList({
  categorySlug,
  seriesSlug,
  limit = 12,
  className = '',
  onSelectProduct
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        
        let fetchedProducts: Product[];
        
        if (seriesSlug) {
          // Get products for a specific series
          fetchedProducts = await productService.getProductsBySeriesSlug(categorySlug, seriesSlug);
        } else {
          // Get all products in a category
          fetchedProducts = await productService.getProductsByCategorySlug(categorySlug);
        }
        
        // Apply the limit
        const limitedProducts = fetchedProducts.slice(0, limit);
        
        setProducts(limitedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [categorySlug, seriesSlug, limit]);
  
  // Handle product selection
  const handleProductClick = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };
  
  if (loading) {
    return (
      <div className={`grid place-items-center h-40 ${className}`}>
        <div className="animate-pulse text-gray-500">Loading products...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`bg-red-50 p-4 rounded-lg text-red-800 ${className}`}>
        <p>{error}</p>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className={`bg-gray-50 p-4 rounded-lg text-gray-700 ${className}`}>
        <p>No products found in this category.</p>
      </div>
    );
  }
  
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleProductClick}
        />
      ))}
    </div>
  );
}