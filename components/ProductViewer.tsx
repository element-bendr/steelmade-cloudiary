'use client'

import { useEffect } from 'react';
import { useStateStore } from '@/lib/utils/use-state-store';
import { productStore, productStoreActions } from '@/lib/utils/state-store';

interface ProductViewerProps {
  productId: string;
  children: React.ReactNode;
}

/**
 * Product viewer component that uses our custom state store
 */
export default function ProductViewer({ productId, children }: ProductViewerProps) {
  // Use our custom hook
  const [productState, setProductState] = useStateStore(productStore);
  
  // Select product when component mounts or productId changes
  useEffect(() => {
    productStoreActions.selectProduct(productId);
  }, [productId]);
  
  return (
    <div className="product-viewer">
      {/* Show loading state */}
      {productState.isLoading && (
        <div className="loading-indicator">Loading...</div>
      )}
      
      {/* Show error state */}
      {productState.error && (
        <div className="error-message">{productState.error}</div>
      )}
      
      {/* Render children */}
      {!productState.isLoading && !productState.error && children}
    </div>
  );
}