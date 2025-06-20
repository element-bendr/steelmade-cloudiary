# Director Series UI Component Guide

This guide outlines the UI components and patterns used for the director series chair pages, ensuring consistency across all product variants.

## Styling Principles

### Brand Colors

```css
:root {
  /* Primary brand colors */
  --color-primary: #B91C1C; /* SteelMade red */
  --color-primary-light: #DC2626;
  --color-primary-dark: #991B1B;
  
  /* Neutral colors */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
}
```

### Typography

```css
:root {
  /* Font families */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-serif: 'Georgia', serif;
  
  /* Font sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
}
```

### Spacing

The spacing system follows Tailwind's scale:

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
}
```

## Key Components

### DirectorSeriesGrid

Used on the director series overview page to display all chairs in the series.

```tsx
<DirectorSeriesGrid 
  products={directorSeriesProducts}
  onProductSelect={handleProductSelect}
  className="mt-8"
/>
```

Styling:
- Grid layout with responsive columns (1-3 depending on screen size)
- Consistent card styling with glassmorphism effect
- Hover animations for interactive feedback
- Brand color accents for interactive elements

### ProductFeatureList

Displays product features in a consistent grid layout.

```tsx
<ProductFeatureList 
  features={product.features}
  className="mt-6"
/>
```

**Styling Implementation:**
```tsx
// CORRECT implementation with grid layout
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
  {product.features.map((feature, index) => (
    <div key={index} className="flex items-start">
      <svg className="w-5 h-5 text-red-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="ml-2 text-gray-700 dark:text-gray-300">{feature}</span>
    </div>
  ))}
</div>
```

**INCORRECT implementation (avoid vertical list):**
```tsx
// AVOID this vertical list implementation
<ul className="mt-6 space-y-2">
  {product.features.map((feature, index) => (
    <li key={index} className="flex items-start">
      <svg className="w-5 h-5 text-red-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="ml-2 text-gray-700 dark:text-gray-300">{feature}</span>
    </li>
  ))}
</ul>
```

### VariantSelector

Provides a unified interface for selecting product variants.

```tsx
<VariantSelector
  variants={product.variants}
  selectedVariant={selectedVariant}
  onVariantSelect={handleVariantChange}
  className="mb-6"
/>
```

Styling:
- Consistent button styling with proper states (active, hover, focus)
- Clear visual indication of selected variant
- Proper spacing between options
- Responsive design for all screen sizes

### ProductImageGallery

Displays product images with thumbnail navigation.

```tsx
<ProductImageGallery
  images={selectedVariant?.images || product.images}
  productName={product.name}
  className="mb-6"
/>
```

Styling:
- Consistent image container proportions
- Thumbnail grid with proper spacing
- Active thumbnail indicator
- Smooth animations for image transitions

## Page Structure

### Director Series Overview Page

```tsx
<div className="container mx-auto px-4 py-8">
  {/* Page header */}
  <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
    Director Series Chairs
  </h1>
  
  {/* Page description */}
  <p className="mb-8 text-gray-700 dark:text-gray-300 max-w-3xl">
    Our Director Series chairs combine premium materials with ergonomic design,
    perfect for professional environments that demand both style and comfort.
  </p>
  
  {/* Product grid */}
  <DirectorSeriesGrid products={products} />
</div>
```

### Individual Chair Detail Page

```tsx
<div className="container mx-auto px-4 py-8">
  {/* Product header */}
  <header className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
    <p className="mt-2 text-gray-700 dark:text-gray-300">{product.description}</p>
  </header>
  
  {/* Two-column layout for desktop */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Product images */}
    <div>
      <ProductImageGallery 
        images={selectedVariant?.images || product.images}
        productName={product.name}
      />
    </div>
    
    {/* Product details */}
    <div>
      {/* Variant selector */}
      <VariantSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onVariantSelect={handleVariantChange}
        className="mb-6"
      />
      
      {/* Features section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Features</h2>
        <ProductFeatureList features={product.features} />
      </div>
      
      {/* Call to action */}
      <div className="mt-8">
        <button className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors">
          Contact Sales
        </button>
      </div>
    </div>
  </div>
</div>
```

## Loading and Error States

### Loading State

```tsx
<div className="flex items-center justify-center min-h-[400px]">
  <div className="w-12 h-12 border-4 border-gray-300 border-t-red-700 rounded-full animate-spin"></div>
</div>
```

### Error State

```tsx
<div className="container mx-auto px-4 py-8">
  <div className="p-6 bg-red-50 rounded-lg text-red-600 dark:bg-red-900/20 dark:text-red-400">
    <h2 className="text-xl font-bold mb-2">Error</h2>
    <p>{errorMessage}</p>
  </div>
</div>
```

### Product Not Found State

```tsx
<div className="container mx-auto px-4 py-8">
  <div className="p-6 bg-yellow-50 rounded-lg text-yellow-700">
    <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
    <p>Sorry, we couldn't find the requested product. Please try again later.</p>
  </div>
</div>
```

## Responsive Design Guidelines

### Breakpoints

Follow these standard breakpoints:

```css
/* Small (mobile) */
@media (min-width: 640px) { /* sm */ }

/* Medium (tablet) */
@media (min-width: 768px) { /* md */ }

/* Large (laptop) */
@media (min-width: 1024px) { /* lg */ }

/* Extra Large (desktop) */
@media (min-width: 1280px) { /* xl */ }

/* 2XL (large desktop) */
@media (min-width: 1536px) { /* 2xl */ }
```

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
  {/* Grid items */}
</div>
```

### Responsive Typography

Use responsive font sizes for headings:

```css
h1 {
  font-size: 1.875rem; /* Base size */
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.25rem; /* Medium screens */
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: 3rem; /* Large screens */
  }
}
```

## Implementation Checklist

When implementing a new chair page, ensure:

1. **Correct Component Usage**:
   - Using EnhancedProductDetailLayout for consistency
   - Feature list displays in grid format (grid-cols-1 sm:grid-cols-2)
   - Variant selector matches design system
   - Loading and error states are properly implemented

2. **ProductService Import**:
   - Using standardized import path: '@/modules/product/services/ProductService'
   - Implementing proper error handling for imports
   - Checking for undefined service after import
   - Using try/catch blocks for async operations

3. **Product Data Structure**:
   - Features array is populated with benefit-oriented descriptions
   - Variants have proper IDs that match image naming convention
   - Images follow the established Cloudinary pattern
   - Product slug matches the URL route

4. **Responsive Design**:
   - Page displays correctly on mobile devices
   - Two-column layout applies only on larger screens
   - Typography is readable on all devices
   - Touch targets are appropriate for mobile usage

By following this guide, you'll ensure consistent implementation across all director series chair pages, providing a cohesive user experience that aligns with SteelMade's brand identity.