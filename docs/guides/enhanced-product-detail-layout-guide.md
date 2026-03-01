# EnhancedProductDetailLayout Component Guide

This document provides implementation details and best practices for the `EnhancedProductDetailLayout` component, which is used to standardize product detail pages across all chair categories.

## Component Overview

The `EnhancedProductDetailLayout` component provides a consistent layout and user interface for product detail pages. It handles:

- Responsive layout (mobile-first)
- Product image gallery
- Variant selection
- Feature display
- Product information presentation

## Usage

```tsx
import { EnhancedProductDetailLayout } from '@/modules/ui/components';
import { Product } from '@/modules/product/types';

// In your component:
return <EnhancedProductDetailLayout 
  product={product}
  className="custom-class"
  hideFeatures={false}
  hideVariants={false}
  additionalContent={<CustomComponent />}
/>;
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `product` | `Product` | Yes | The product data to display |
| `className` | `string` | No | Additional CSS classes to apply to the root element |
| `hideFeatures` | `boolean` | No | When true, hides the features section |
| `hideVariants` | `boolean` | No | When true, hides the variant selector |
| `additionalContent` | `ReactNode` | No | Additional content to render after the main sections |

## Component Implementation

Here's how the component is implemented:

```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product, ProductVariant } from '@/modules/product/types';
import { ProductImageGallery, VariantSelector, ProductFeatureList } from '@/modules/ui/components';

interface EnhancedProductDetailLayoutProps {
  product: Product;
  className?: string;
  hideFeatures?: boolean;
  hideVariants?: boolean;
  additionalContent?: React.ReactNode;
}

export const EnhancedProductDetailLayout: React.FC<EnhancedProductDetailLayoutProps> = ({
  product,
  className = '',
  hideFeatures = false,
  hideVariants = false,
  additionalContent
}) => {
  // State for selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  // Handle variant selection
  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      {/* Breadcrumb navigation */}
      <nav className="mb-6 text-sm">
        <ol className="flex flex-wrap items-center text-gray-500 dark:text-gray-400">
          <li className="flex items-center">
            <a href="/" className="hover:text-red-700 dark:hover:text-red-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <a href="/chairs" className="hover:text-red-700 dark:hover:text-red-400 transition-colors">Chairs</a>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <a href="/chairs/director-series" className="hover:text-red-700 dark:hover:text-red-400 transition-colors">Director Series</a>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-900 dark:text-white font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Page title */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{product.name}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">{product.description}</p>

      {/* Two-column layout for product details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product image gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
        >
          <ProductImageGallery 
            images={selectedVariant?.images || product.images}
            productName={product.name}
          />
        </motion.div>

        {/* Product information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          {/* Variant selector */}
          {!hideVariants && product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Options</h2>
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantSelect={handleVariantChange}
              />
            </div>
          )}

          {/* Features section */}
          {!hideFeatures && product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Features</h2>
              <ProductFeatureList features={product.features} />
            </div>
          )}

          {/* Call to action */}
          <div className="mt-auto pt-6">
            <button className="w-full sm:w-auto px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </div>

      {/* Additional content */}
      {additionalContent}

      {/* Related products section placeholder */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder for related products */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
```

## Subcomponents

### ProductFeatureList

The ProductFeatureList component renders features in a grid layout:

```tsx
interface ProductFeatureListProps {
  features: string[];
  className?: string;
}

export const ProductFeatureList: React.FC<ProductFeatureListProps> = ({ 
  features,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className="flex items-start">
          <svg 
            className="w-5 h-5 text-red-700 mt-0.5 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="ml-2 text-gray-700 dark:text-gray-300">{feature}</span>
        </div>
      ))}
    </div>
  );
};
```

### VariantSelector

The VariantSelector component allows users to select product variants:

```tsx
interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantSelect: (variant: ProductVariant) => void;
  className?: string;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantSelect,
  className = ''
}) => {
  return (
    <div className={`space-x-3 ${className}`}>
      {variants.map((variant) => (
        <button
          key={variant.variantId}
          onClick={() => onVariantSelect(variant)}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedVariant?.variantId === variant.variantId
              ? 'bg-red-700 text-white'
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
          }`}
          aria-pressed={selectedVariant?.variantId === variant.variantId}
        >
          {variant.variantName}
        </button>
      ))}
    </div>
  );
};
```

### ProductImageGallery

The ProductImageGallery component displays product images:

```tsx
interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  className = ''
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  return (
    <div className={`${className}`}>
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={selectedImage}
          alt={`${productName} product image`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnail gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mt-4 px-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-square overflow-hidden rounded-md ${
                selectedImage === image
                  ? 'ring-2 ring-red-700'
                  : 'hover:ring-1 hover:ring-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

## Integration with Product Data

To use this component with your product data, ensure your data follows this structure:

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  seriesSlug: string;
  images: string[];
  variants: ProductVariant[];
  features: string[];
  featured?: boolean;
}

interface ProductVariant {
  id: string;
  variantId: string;
  variantName: string;
  images: string[];
}
```

## Customization

### Custom Styling

You can customize the component's appearance by:

1. Passing a custom className:
```tsx
<EnhancedProductDetailLayout 
  product={product}
  className="my-custom-class"
/>
```

2. Overriding specific styles with Tailwind utility classes:
```css
/* In your CSS file */
.product-detail-custom .feature-item {
  @apply bg-blue-50 dark:bg-blue-900/20;
}
```

### Custom Content

To add custom content sections:

```tsx
<EnhancedProductDetailLayout 
  product={product}
  additionalContent={
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Custom Section</h2>
      <p>Your custom content goes here...</p>
    </div>
  }
/>
```

## Best Practices

1. **Data Validation**:
   Always validate your product data before passing it to the component:
   ```tsx
   if (!product) {
     return <ProductNotFound />;
   }
   
   if (!product.features || product.features.length === 0) {
     console.warn('Product has no features:', product.id);
   }
   ```

2. **Accessibility**:
   - Ensure all interactive elements have proper focus states
   - Add appropriate ARIA attributes for custom components
   - Test with keyboard navigation
   - Ensure sufficient color contrast

3. **Performance**:
   - Optimize images before displaying them
   - Use appropriate image sizes for different viewports
   - Consider lazy loading for related products
   - Monitor component render performance

4. **Responsive Design**:
   - Test on multiple device sizes
   - Ensure proper stacking order on mobile
   - Adjust typography for readability on small screens
   - Use appropriate touch target sizes for mobile

## Troubleshooting

### Common Issues

1. **Images Not Displaying**:
   - Check image paths are correct
   - Verify Cloudinary URL structure
   - Ensure images are publicly accessible
   - Add fallback for missing images

2. **Variant Selection Not Working**:
   - Verify variants array has correct structure
   - Check variantId is unique across variants
   - Ensure handleVariantChange is properly implemented
   - Verify state updates correctly

3. **Layout Breaks on Mobile**:
   - Check responsive classes are applied correctly
   - Test on actual devices, not just browser emulation
   - Verify flex/grid layout behavior
   - Check for overflowing content

4. **Missing Features**:
   - Ensure product.features is an array
   - Add fallback for empty features array
   - Check for correct data typing

## Examples

### Basic Usage

```tsx
function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  
  // Fetch product data...
  
  if (!product) {
    return <LoadingSpinner />;
  }
  
  return <EnhancedProductDetailLayout product={product} />;
}
```

### With Custom Content

```tsx
function ProductPageWithReviews() {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState([]);
  
  // Fetch product data and reviews...
  
  if (!product) {
    return <LoadingSpinner />;
  }
  
  return (
    <EnhancedProductDetailLayout 
      product={product}
      additionalContent={
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          {reviews.length > 0 ? (
            <ReviewList reviews={reviews} />
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      }
    />
  );
}
```

By following this guide, you'll ensure consistent implementation of the EnhancedProductDetailLayout component across all product detail pages.