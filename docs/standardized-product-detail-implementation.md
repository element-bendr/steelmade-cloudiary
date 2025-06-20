# Standardized Product Detail Page Implementation

This document outlines the standardized approach to implementing product detail pages, specifically for the director series chairs. Following these guidelines ensures a consistent user experience across all product categories.

## Key Components

### EnhancedProductDetailLayout

The `EnhancedProductDetailLayout` component serves as the primary container for all product detail pages:

```tsx
<EnhancedProductDetailLayout 
  product={product}
  // Optional props for customization
  className="custom-class"
  hideFeatures={false}
  additionalContent={<CustomComponent />}
/>
```

This component handles:
- Responsive two-column layout (mobile-first approach)
- Image gallery with variant selection
- Product information display with proper hierarchy
- Feature list in grid layout
- Loading and error states

### ProductFeatureList

The `ProductFeatureList` component provides a standardized way to display product features:

```tsx
<ProductFeatureList 
  features={product.features}
  className="mt-6"
/>
```

Key characteristics:
- Grid layout with responsive columns (1 column on mobile, 2 on larger screens)
- Consistent spacing and typography
- Brand color accents for icons or bullets
- Proper semantic markup for accessibility

### VariantSelector

The `VariantSelector` component provides a unified interface for selecting product variants:

```tsx
<VariantSelector
  variants={product.variants}
  selectedVariant={selectedVariant}
  onVariantSelect={handleVariantChange}
  className="mb-6"
/>
```

Features:
- Clear visual feedback for selected variants
- Consistent styling across all product categories
- Responsive design for all screen sizes
- Proper keyboard navigation and ARIA attributes

## Standard Page Structure

Each product detail page should follow this implementation pattern:

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { EnhancedProductDetailLayout } from '@/modules/ui/components';
import { Product } from '@/modules/product/types';

export default function ProductDetailPage() {
  // State management
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data fetching
  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        
        // Import ProductService dynamically
        const ProductServiceModule = await import('@/modules/product/services/ProductService');
        
        // Validate service exists
        if (!ProductServiceModule.ProductService) {
          throw new Error('ProductService not found in imported module');
        }
        
        // Fetch product data
        const productData = await ProductServiceModule.ProductService.getProductBySlug('product-slug');
        
        // Validate product data
        if (!productData) {
          throw new Error('Product data not found');
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
  }, []);
  
  // Standard loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-red-700 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Standard error state
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
  
  // Product not found state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-6 bg-yellow-50 rounded-lg text-yellow-700">
          <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
          <p>Sorry, we couldn't find the requested product. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  // Standard product detail layout
  return <EnhancedProductDetailLayout product={product} />;
}
```

## Content Guidelines

### Features vs. Specifications

- **Features**: Focus on benefit-oriented descriptions that highlight what makes the product special
- **Specifications**: No longer displayed on the main product page to maintain a clean, focused UI

### Variant Naming

- Keep variant names concise and clear (e.g., "High Back" instead of "High Back Version")
- Use consistent naming patterns across product categories
- Ensure variant IDs match the image naming convention (e.g., "hb" for High Back)

## Image Guidelines

### Image Dimensions and Format

- Main product images should maintain a consistent aspect ratio (1:1 or 3:2 recommended)
- Thumbnail images should be square (1:1 aspect ratio)
- Use WebP format with JPEG fallback for optimal performance
- Implement responsive images with appropriate `sizes` attribute

### Cloudinary Integration

- Follow the established folder structure: `steelmade/[category]/[series]/[product]/[image-code]`
- Use consistent image naming: `ic-[code]-[variant].jpg`
- Leverage Cloudinary transformations for responsive images

## Error Handling

### Import Errors

When dynamically importing the ProductService:

```tsx
try {
  const ProductServiceModule = await import('@/modules/product/services/ProductService');
  
  if (!ProductServiceModule.ProductService) {
    throw new Error('ProductService not found in imported module');
  }
  
  // Use the service...
} catch (error) {
  console.error('Error importing ProductService:', error);
  // Handle error appropriately
}
```

### Data Validation

Always validate product data before using it:

```tsx
if (!product) {
  return <ProductNotFound />;
}

if (!product.variants || product.variants.length === 0) {
  console.warn('Product has no variants:', product.id);
  // Handle missing variants
}
```

## Performance Optimization

### Code Splitting

- Use dynamic imports for service modules to reduce initial load time
- Consider lazy-loading components that aren't immediately visible

### Image Optimization

- Use next/image or the CloudinaryImage component for automatic optimization
- Implement lazy loading for images below the fold
- Use appropriate image quality settings (75-85% typically sufficient)

## Accessibility Considerations

- Ensure proper color contrast (minimum 4.5:1 for text)
- Use semantic HTML elements throughout
- Implement proper focus management for interactive elements
- Add appropriate ARIA attributes for custom components
- Test with keyboard navigation and screen readers

## Testing Checklist

Before deploying any product detail page, verify:

1. **Visual Consistency**:
   - Layout matches other product pages
   - Typography follows design system
   - Spacing is consistent
   - Brand colors are applied correctly

2. **Functionality**:
   - Variant selection works properly
   - Images load correctly
   - Features display in proper grid layout
   - Responsive behavior works on all screen sizes

3. **Performance**:
   - Initial load time is acceptable
   - Images load efficiently
   - No layout shifts during loading
   - Smooth animations and transitions

4. **Error Handling**:
   - Graceful degradation on data fetch errors
   - User-friendly error messages
   - Fallback content when appropriate
   - Console errors are caught and handled

By following these guidelines, we ensure a consistent, high-quality user experience across all product detail pages while maintaining a modular, maintainable codebase.