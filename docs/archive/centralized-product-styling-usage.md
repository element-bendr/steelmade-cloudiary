# Centralized Product Styling System Documentation

This document explains how to use the centralized product styling system that merges the EnhancedProductDetailLayout with modular chair components.

## Overview

The centralized product styling system provides a consistent, maintainable approach to styling product pages across the application. It combines:

1. A structured styling constants system
2. Enhanced reusable components with standardized styling
3. A unified ProductDetailLayout that orchestrates these components

## Key Components

### 1. ProductStyles Constants

Located in `lib/styles/productStyles.ts`, this file contains all styling constants organized by component and purpose:

```typescript
export const productStyles = {
  // Layout and spacing
  layout: { ... },
  
  // Typography
  typography: { ... },
  
  // Colors
  colors: { ... },
  
  // Components
  components: {
    image: { ... },
    variantSelector: { ... },
    featureList: { ... },
    contactButton: { ... },
    form: { ... },
  },
};
```

### 2. Enhanced Chair Components

All chair components have been updated to use the productStyles constants:

- `ChairImageDisplay`: For displaying product images with consistent styling
- `ChairVariantSelector`: For selecting product variants with uniform styling
- `ChairFeatureList`: For displaying product features in a consistent grid
- `ChairContactButton`: For contact functionality with standardized styling

### 3. ProductDetailLayout

A unified layout component that orchestrates all the chair components within a consistent structure.

## Usage Guide

### Basic Usage

To implement a product page with the centralized styling:

```tsx
import { ProductDetailLayout } from '@/components/products';
import { productData } from '@/lib/data/products/your-product';

export default function ProductPage() {
  return (
    <ProductDetailLayout
      product={productData}
      // Optional customization props
    />
  );
}
```

### Customization Options

The ProductDetailLayout component accepts several props for customization:

```tsx
<ProductDetailLayout
  product={productData}
  
  // Customize variant behavior
  variantOptions={{
    initialVariant: specificVariant, // Set a specific initial variant
    onVariantChange: (variant) => { /* Custom logic */ },
  }}
  
  // Customize contact functionality
  contactOptions={{
    onContactClick: () => { /* Custom logic */ },
    contactButtonText: 'Request a Quote',
  }}
  
  // Customize layout
  layoutOptions={{
    imagePosition: 'right', // 'left' (default) or 'right'
    showMetaSection: true,  // Show additional metadata section
  }}
  
  // Add custom sections
  renderCustomSection={() => (
    <div>
      {/* Custom content specific to this product */}
    </div>
  )}
  
  // Add custom className
  className="custom-page-class"
  
  // Add additional content as children
  children={<AdditionalContent />}
/>
```

### Extending for Product-Specific Needs

You can extend the base functionality for product-specific needs:

```tsx
export default function SpecialProductPage() {
  // Add product-specific state
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);
  
  // Create product-specific custom section
  const renderCustomSection = () => (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Special Offer</h3>
      <p className="text-gray-600">
        Limited time discount available on this product.
      </p>
      <button 
        onClick={() => setShowSpecialOffer(true)}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md"
      >
        View Special Offer
      </button>
    </div>
  );
  
  return (
    <>
      <ProductDetailLayout
        product={specialProduct}
        renderCustomSection={renderCustomSection}
      />
      
      {/* Product-specific modal */}
      {showSpecialOffer && (
        <SpecialOfferModal 
          onClose={() => setShowSpecialOffer(false)} 
        />
      )}
    </>
  );
}
```

## Styling Guidelines

1. **Use productStyles Constants**: Always use the centralized styling constants instead of hardcoding Tailwind classes.
2. **Maintain Spacing Consistency**: Follow the established spacing hierarchy in the productStyles.
3. **Follow Typography Patterns**: Use the defined typography styles for consistent text presentation.
4. **Respect Color System**: Use the defined color variables rather than direct color classes.
5. **Accessibility First**: Maintain the accessibility attributes in the components.

## Adding New Components

When adding new components to the system:

1. Define consistent styling in the productStyles constants
2. Create the component using these styling constants
3. Add to the appropriate component library
4. Document the component's usage

## Troubleshooting

### Type Errors

If you encounter type errors when passing product data:

```tsx
// Ensure your product data includes all required fields
<ProductDetailLayout
  product={{
    ...yourProduct,
    // Add fallbacks for potentially undefined required fields
    price: yourProduct.price || 'Price on request',
    imageUrl: yourProduct.imageUrl || '/images/placeholder.jpg',
  }}
/>
```

### Custom Styling

To override specific styling without modifying the core components:

```tsx
<ProductDetailLayout
  product={productData}
  className="custom-container"
  // Use renderCustomSection for more extensive customizations
/>
```

## Best Practices

1. **Component Composition**: Use the ProductDetailLayout as a composition system, adding custom sections as needed
2. **State Management**: Handle product-specific state in the page component, passing only what's needed to ProductDetailLayout
3. **Error Handling**: Add proper error boundaries around the ProductDetailLayout for robustness
4. **Performance**: Memoize expensive renderCustomSection functions if they involve complex calculations

## Migration Guide

To migrate existing product pages to the centralized system:

1. Replace manual layouts with ProductDetailLayout
2. Move product-specific logic to the page component
3. Implement custom sections for product-specific content
4. Test thoroughly for visual and functional consistency

By following these guidelines, you'll maintain a consistent, maintainable approach to product styling across the application.