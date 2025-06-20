# Troubleshooting Guide: Client Component Module Resolution Issues

This guide provides solutions for common module resolution issues in Next.js client components, particularly related to the ProductService.

## Common Issues

### 1. "ProductService is not defined" Error

**Symptoms:**
- Loading spinners that never resolve
- Console error: "Failed to load product. Error: ProductService is not defined"
- Dynamic imports that appear to succeed but result in undefined values

**Root Causes:**
- Incorrect dynamic import paths
- Missing exports in the service module
- Accessing properties incorrectly after dynamic import
- Module initialization issues in client components

**Solutions:**

```typescript
// INCORRECT - May result in undefined ProductService
const ProductServiceModule = await import('@/modules/product/services/product-service');
const product = await ProductServiceModule.ProductService.getProductById(id);

// CORRECT - Check for undefined service
const ProductServiceModule = await import('@/modules/product/services/product-service');
if (!ProductServiceModule.ProductService) {
  throw new Error('ProductService not found in imported module');
}
const product = await ProductServiceModule.ProductService.getProductById(id);

// ALTERNATIVE - Destructure with explicit error handling
try {
  const { ProductService } = await import('@/modules/product/services/product-service');
  if (!ProductService) {
    throw new Error('ProductService is undefined after import');
  }
  const product = await ProductService.getProductById(id);
} catch (error) {
  console.error('Module import error:', error);
  // Handle error appropriately
}
```

### 2. Client/Server Component Mismatch

**Symptoms:**
- "Error: ReactServerComponentsError: You're importing a component that needs useState."
- "Error: ReactServerComponentsError: You're importing a component that needs useEffect."

**Root Causes:**
- Importing client components in server components without proper 'use client' directives
- Missing 'use client' directive at the top of client component files
- Mismatched module types between server and client

**Solutions:**

```typescript
// CORRECT - Client component with dynamic import of service
'use client';

import { useEffect, useState } from 'react';

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    async function loadProduct() {
      try {
        // Dynamic import in client component
        const { ProductService } = await import('@/modules/product/services/product-service');
        const data = await ProductService.getProductById('product-id');
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    }
    
    loadProduct();
  }, []);
  
  // Component rendering code
}
```

### 3. Module Duplication Issues

**Symptoms:**
- Inconsistent behavior between different instances of the same service
- Multiple versions of the same service running simultaneously
- Services not sharing state as expected

**Root Causes:**
- Multiple implementations of the same service
- Inconsistent singleton patterns
- Webpack bundling creating duplicate modules

**Solutions:**

```typescript
// CORRECT - Singleton pattern in service
// modules/product/services/product-service.ts

class ProductServiceClass {
  private static instance: ProductServiceClass;
  
  private constructor() {
    // Private constructor for singleton
  }
  
  public static getInstance(): ProductServiceClass {
    if (!ProductServiceClass.instance) {
      ProductServiceClass.instance = new ProductServiceClass();
    }
    return ProductServiceClass.instance;
  }
  
  // Service methods
}

// Export singleton instance
export const ProductService = ProductServiceClass.getInstance();
```

## Defensive Coding Practices

1. **Always check for undefined after dynamic imports:**
```typescript
const module = await import('@/path/to/module');
if (!module.ExportedThing) {
  throw new Error('Export not found in module');
}
```

2. **Add fallback data for critical UI components:**
```typescript
// Fallback product data in case the real data fails to load
const fallbackProduct = {
  id: 'fallback-product',
  name: 'Product Name',
  // ...other required properties
};

// In component:
const [product, setProduct] = useState(null);
const displayProduct = product || fallbackProduct;
```

3. **Implement proper loading and error states:**
```tsx
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

// In JSX:
{isLoading && <LoadingSpinner />}
{error && <ErrorMessage message={error} />}
{!isLoading && !error && product && <ProductDisplay product={product} />}
```

4. **Add detailed console logging:**
```typescript
console.log('About to import ProductService');
const module = await import('@/modules/product/services/product-service');
console.log('Import result:', module);
console.log('ProductService available:', !!module.ProductService);
```

## Testing Module Resolution

When troubleshooting module resolution issues, try these approaches:

1. **Console log the entire imported module:**
```typescript
const module = await import('@/path/to/module');
console.log('Full module:', module);
```

2. **Test with static imports in development:**
```typescript
// Development only - helps identify issues
import * as ProductServiceStaticImport from '@/modules/product/services/product-service';
console.log('Static import:', ProductServiceStaticImport);

// Then use dynamic import in actual code
const { ProductService } = await import('@/modules/product/services/product-service');
```

3. **Verify module path with temporary file:**
```typescript
// Create a simple test file at the path you're trying to import
// modules/product/services/product-service.ts
export const TEST_VALUE = 'If you see this, the import path is correct';

// In your component
const module = await import('@/modules/product/services/product-service');
console.log(module.TEST_VALUE);
```

By following these practices, you can avoid common module resolution issues and build more resilient client components.