# ProductService Implementation Guide

This guide provides best practices for implementing and using the ProductService in our application.

## Service Implementation Pattern

### Singleton Implementation

The ProductService should follow the singleton pattern to ensure consistency across the application:

```typescript
// modules/product/services/product-service.ts

/**
 * ProductService class providing access to product data
 * This is a client-side service for managing product data
 */
class ProductServiceImpl {
  // Private constructor to prevent direct instantiation
  private constructor() {
    console.log('ProductService instance created');
  }
  
  // Singleton instance
  private static instance: ProductServiceImpl | null = null;
  
  /**
   * Get the singleton instance of ProductService
   */
  public static getInstance(): ProductServiceImpl {
    if (!ProductServiceImpl.instance) {
      ProductServiceImpl.instance = new ProductServiceImpl();
    }
    return ProductServiceImpl.instance;
  }
  
  /**
   * Get a product by its ID
   */
  async getProductById(productId: string): Promise<Product | null> {
    try {
      console.log(`ProductService.getProductById called with ID: ${productId}`);
      
      // Implementation details...
      
      return productData;
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  }
  
  // Additional methods...
}

// Export a singleton instance of the ProductService
export const ProductService = ProductServiceImpl.getInstance();
```

### Alternative: Object Literal Pattern

For simpler services, an object literal pattern can be used:

```typescript
// modules/product/services/product-service.ts

/**
 * ProductService providing access to product data
 */
export const ProductService = {
  /**
   * Get a product by its ID
   */
  getProductById: async (productId: string): Promise<Product | null> => {
    try {
      console.log(`ProductService.getProductById called with ID: ${productId}`);
      
      // Implementation details...
      
      return productData;
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  },
  
  // Additional methods...
};
```

## Using ProductService in Client Components

### Dynamic Import Pattern

In client components, use dynamic imports with proper error handling:

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/modules/product/types';

export default function ProductPage({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        
        // Import ProductService dynamically
        const ProductServiceModule = await import('@/modules/product/services/product-service');
        
        // Check if ProductService exists in the imported module
        if (!ProductServiceModule.ProductService) {
          throw new Error('ProductService not found in imported module');
        }
        
        // Get product data
        const productData = await ProductServiceModule.ProductService.getProductById(productId);
        
        // Check if product exists
        if (!productData) {
          throw new Error(`Product not found: ${productId}`);
        }
        
        setProduct(productData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading product:', error);
        setError(`Failed to load product details. Error: ${error instanceof Error ? error.message : String(error)}`);
        setIsLoading(false);
      }
    }
    
    loadProduct();
  }, [productId]);
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-red-700 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-6 bg-red-50 rounded-lg text-red-600">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  // Render product
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-6 bg-yellow-50 rounded-lg text-yellow-700">
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <p>Sorry, we couldn't find the requested product.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      {/* Rest of the component */}
    </div>
  );
}
```

### Alternative: Destructuring Pattern

An alternative approach using destructuring:

```tsx
useEffect(() => {
  async function loadProduct() {
    try {
      setIsLoading(true);
      
      // Destructure ProductService from dynamic import
      const { ProductService } = await import('@/modules/product/services/product-service');
      
      // Check if ProductService exists
      if (!ProductService) {
        throw new Error('ProductService is undefined after import');
      }
      
      // Get product data
      const productData = await ProductService.getProductById(productId);
      
      // Process product data...
      
    } catch (error) {
      // Handle error...
    }
  }
  
  loadProduct();
}, [productId]);
```

## Using ProductService in Server Components

In server components, use static imports:

```tsx
// This is a server component (no 'use client' directive)
import { ProductService } from '@/modules/product/services/product-service';
import { notFound } from 'next/navigation';

export default async function ProductServerPage({ params }: { params: { productId: string } }) {
  const { productId } = params;
  
  try {
    const product = await ProductService.getProductById(productId);
    
    if (!product) {
      notFound();
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
        {/* Rest of the component */}
      </div>
    );
  } catch (error) {
    console.error('Error in ProductServerPage:', error);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-6 bg-red-50 rounded-lg text-red-600">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>Failed to load product. Please try again later.</p>
        </div>
      </div>
    );
  }
}
```

## Common Patterns

### Conditional Rendering with Loading and Error States

```tsx
return (
  <div className="container mx-auto px-4 py-8">
    {isLoading && (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-red-700 rounded-full animate-spin"></div>
      </div>
    )}
    
    {error && (
      <div className="p-6 bg-red-50 rounded-lg text-red-600">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    )}
    
    {!isLoading && !error && product && (
      <div>
        <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
        {/* Product details */}
      </div>
    )}
  </div>
);
```

### Fallback Data Pattern

```tsx
// Fallback product data in case the real data fails to load
const fallbackProduct: Product = {
  id: 'fallback-product',
  slug: 'fallback-product',
  name: 'Product',
  description: 'Product description',
  categorySlug: 'chairs',
  seriesSlug: 'director-series',
  images: ['fallback-image'],
  variants: [
    {
      id: 'variant-1',
      variantId: 'default',
      variantName: 'Default',
      isAvailable: true,
      images: [],
      specifications: {}
    }
  ],
  specifications: {},
  featured: false
};

// In component:
const displayProduct = product || fallbackProduct;
```

## Best Practices

1. **Always Check for Undefined**:
   ```typescript
   const module = await import('@/modules/product/services/product-service');
   if (!module.ProductService) {
     throw new Error('ProductService not found in imported module');
   }
   ```

2. **Use Try-Catch for Error Handling**:
   ```typescript
   try {
     // Code that might fail
   } catch (error) {
     console.error('Error:', error);
     // Handle the error
   }
   ```

3. **Provide Detailed Error Messages**:
   ```typescript
   setError(`Failed to load product. Error: ${error instanceof Error ? error.message : String(error)}`);
   ```

4. **Add Console Logging for Debugging**:
   ```typescript
   console.log('About to import ProductService');
   const module = await import('@/modules/product/services/product-service');
   console.log('Import result:', module);
   console.log('ProductService available:', !!module.ProductService);
   ```

5. **Implement Proper Loading and Error States**:
   ```tsx
   if (isLoading) {
     return <LoadingSpinner />;
   }
   
   if (error) {
     return <ErrorMessage message={error} />;
   }
   ```

## Troubleshooting

### Common Issues and Solutions

1. **"ProductService is not defined" Error**:
   - Verify the import path is correct
   - Check that ProductService is properly exported
   - Make sure dynamic import is handled correctly
   - Add console logs to trace the issue

2. **"Cannot read properties of undefined" Error**:
   - Add checks for undefined after dynamic imports
   - Use optional chaining when accessing properties
   - Implement fallback data for missing properties

3. **Page Never Finishes Loading**:
   - Check for unhandled promises
   - Verify setIsLoading(false) is called in all code paths
   - Add timeout handling for long-running operations

## Conclusion

By following these patterns and best practices, you can ensure that the ProductService is implemented and used correctly throughout the application, avoiding common pitfalls and providing a consistent user experience.