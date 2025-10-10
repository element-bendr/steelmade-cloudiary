'use client';

import React, { useState, useEffect } from 'react';
import { Product, ProductService } from '../../product';
import { ProductCard } from './ProductCard';
import { UIComponentProps } from '../types';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

interface ProductListProps extends UIComponentProps {
  categorySlug?: string;
  seriesSlug?: string;
  onSelectProduct?: (product: Product) => void;
  emptyMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
}

/**
 * ProductList component
 * 
 * A component for displaying a list of products with filtering and pagination
 */
export const ProductList: React.FC<ProductListProps> = ({
  categorySlug,
  seriesSlug,
  onSelectProduct,
  emptyMessage = 'No products found',
  errorMessage = 'Error loading products',
  loadingMessage = 'Loading products...',
  className = '',
  id,
  testId,
  style,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      // Determine which fetch method to use based on the provided slugs
      const productsTask = categorySlug && seriesSlug
        ? ProductService.getProductsBySeriesSlug(categorySlug, seriesSlug)
        : categorySlug
          ? ProductService.getProductsByCategorySlug(categorySlug)
          : ProductService.getAllProducts();
      
      // Execute the task and handle the result
      const result = await productsTask();
      
      pipe(
        result,
        E.fold(
          (err) => {
            setError(err.message);
            setProducts([]);
            setLoading(false);
          },
          (fetchedProducts) => {
            setProducts(fetchedProducts);
            setLoading(false);
          }
        )
      );
    };
    
    fetchProducts();
  }, [categorySlug, seriesSlug]);
  
  if (loading) {
    return (
      <div
        id={id}
        data-testid={testId}
        className={`product-list-loading ${className}`}
        style={style}
      >
        <p className="text-center text-gray-500 py-8">{loadingMessage}</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div
        id={id}
        data-testid={testId}
        className={`product-list-error ${className}`}
        style={style}
      >
        <p className="text-center text-red-500 py-8">{errorMessage}: {error}</p>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div
        id={id}
        data-testid={testId}
        className={`product-list-empty ${className}`}
        style={style}
      >
        <p className="text-center text-gray-500 py-8">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div
      id={id}
      data-testid={testId}
      className={`product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      style={style}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
};