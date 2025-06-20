'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a simple Product type for the context
interface Product {
  id: string;
  name: string;
  slug: string;
}

// Define the shape of our context state
interface ProductContextState {
  selectedProduct: Product | null;
  selectedVariantId: string | null;
  isLoading: boolean;
  error: string | null;
  selectProduct: (product: Product) => void;
  selectVariant: (variantId: string) => void;
}

// Create the context with a default value
const ProductContext = createContext<ProductContextState | undefined>(undefined);

// Define props for our provider component
interface ProductContextProviderProps {
  children: ReactNode;
}

/**
 * Product context provider component
 */
export const ProductContextProvider: React.FC<ProductContextProviderProps> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to select a product
  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariantId(null); // Reset variant selection when product changes
  };

  // Function to select a variant
  const selectVariant = (variantId: string) => {
    setSelectedVariantId(variantId);
  };

  // Context value
  const contextValue: ProductContextState = {
    selectedProduct,
    selectedVariantId,
    isLoading,
    error,
    selectProduct,
    selectVariant
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

/**
 * Hook to use the product context
 */
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductContextProvider');
  }
  return context;
};

export default ProductContext;