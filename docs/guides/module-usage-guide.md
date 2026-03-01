# Module Usage Guide

This guide explains how to use the modular architecture in your application.

## Core Module

The Core module provides foundational types and validation utilities.

```typescript
import { validate, safeParse, StringSchema } from '@/modules/core';

// Validate data
const result = validate(StringSchema, data);
if (result.success) {
  // Use validated data
  console.log(result.data);
} else {
  // Handle validation error
  console.error(result.errors);
}

// Safe parsing (returns null instead of throwing)
const parsed = safeParse(StringSchema, data);
```

## Utility Module

The Utility module provides helper functions and alternative state management.

```typescript
import { safeObjectEntries, createStore, useStateStore } from '@/modules/utility';

// Safe data processing
const entries = safeObjectEntries(data); // Won't throw on null/undefined

// State management
const store = createStore({ count: 0 });

// In a React component
function Counter() {
  const [state, setState] = useStateStore(store);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
}
```

## Image Module

The Image module provides image handling utilities and components.

```typescript
import { OptimizedCloudinaryImage, CloudinaryService } from '@/modules/image';

// In a React component
function ProductImage({ publicId }) {
  return (
    <OptimizedCloudinaryImage
      publicId={publicId}
      alt="Product Image"
      width={500}
      height={500}
      transformation={{ 
        format: 'webp',
        quality: 80
      }}
    />
  );
}

// Using the CloudinaryService directly
const cloudinaryService = new CloudinaryService();
const imageUrl = cloudinaryService.buildUrl('product-image', {
  width: 500,
  height: 500,
  format: 'webp'
});
```

## Product Module

The Product module provides product data management and services.

```typescript
import { ProductService, findDefaultVariant } from '@/modules/product';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

// In an async function
async function fetchProduct(slug) {
  const result = await ProductService.getProductBySlug(slug)();
  
  return pipe(
    result,
    E.fold(
      (error) => {
        console.error('Error fetching product:', error);
        return null;
      },
      (productOption) => {
        if (productOption._tag === 'None') {
          console.log('Product not found');
          return null;
        }
        return productOption.value;
      }
    )
  );
}

// Using utility functions
const defaultVariant = findDefaultVariant(product);
```

## UI Module

The UI module provides reusable UI components.

```typescript
import { Button, Card, ProductCard, ProductList } from '@/modules/ui';

// In a React component
function ProductPage() {
  const handleSelectProduct = (product) => {
    console.log('Selected product:', product);
  };
  
  return (
    <div>
      <h1>Products</h1>
      
      <Button
        label="View All Products"
        variant="primary"
        onClick={() => console.log('Button clicked')}
      />
      
      <ProductList
        categorySlug="chairs"
        seriesSlug="director-series"
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}
```

## Error Handling

The modular architecture uses a consistent error handling approach with fp-ts:

```typescript
import { ProductService } from '@/modules/product';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

// Handling synchronous operations with Either
const validateResult = pipe(
  data,
  validateProduct,
  E.fold(
    (error) => {
      console.error('Validation error:', error);
      return null;
    },
    (validatedData) => {
      console.log('Valid data:', validatedData);
      return validatedData;
    }
  )
);

// Handling asynchronous operations with TaskEither
const fetchProducts = async () => {
  const result = await ProductService.getAllProducts()();
  
  return pipe(
    result,
    E.fold(
      (error) => {
        console.error('Error fetching products:', error);
        return [];
      },
      (products) => {
        console.log('Products:', products);
        return products;
      }
    )
  );
};
```

## Server vs. Client Components

When creating components:

1. Add `'use client'` directive at the top of client component files
2. Keep data fetching in server components where possible
3. Pass data to client components via props
4. Use the state management utilities for client-side state