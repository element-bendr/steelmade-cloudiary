# Chair Migration Guide: Moving to the Centralized Product Styling System

This document provides a step-by-step guide for migrating all chair pages to use the new centralized product styling system with the `ProductDetailLayout` component.

## Migration Overview

The migration process involves:

1. Understanding the current chair page implementation
2. Updating chair data files if necessary
3. Refactoring the chair page to use ProductDetailLayout
4. Testing the migrated page for visual and functional consistency

## Prerequisites

Before migrating a chair page, ensure you have:

1. Completed the implementation of the centralized styling system
2. Understood the `ProductDetailLayout` component and its props
3. Familiarized yourself with the productStyles constants system
4. Reviewed the chair data structure for compatibility

## Step-by-Step Migration Process

### 1. Chair Data Preparation

Ensure the chair data file includes all required fields:

```typescript
// Required fields for ProductDetailLayout
const chairData = {
  id: string;           // Unique identifier for the chair
  name: string;         // Display name of the chair
  description: string;  // Product description
  price: string;        // Formatted price string
  imageUrl: string;     // Default image URL
  
  // Optional fields
  category?: string;    // Product category
  variants?: Array<{    // Available variants
    id?: string;        // Variant ID
    variantId?: string; // Alternative variant ID
    name: string;       // Variant name
    imageUrl: string;   // Variant-specific image URL
  }>;
  features?: string[];  // Product features list
  gallery?: Array<{     // Additional product images
    url: string;        // Image URL
    alt: string;        // Alt text for accessibility
  }>;
};
```

If any required fields are missing or potentially undefined, add fallbacks:

```typescript
// Example of adding fallbacks to potentially undefined fields
<ProductDetailLayout
  product={{
    ...chairData,
    price: chairData.price || 'Price on request',
    imageUrl: chairData.imageUrl || '/images/placeholder.jpg',
  }}
/>
```

### 2. Chair Page Refactoring

Replace the existing chair page implementation with the centralized ProductDetailLayout:

#### Before Migration (Example)

```tsx
export default function ChairPage() {
  const [selectedVariant, setSelectedVariant] = useState(chairData.variants?.[0]);
  const [showContactForm, setShowContactForm] = useState(false);

  // Handle variant change
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <main>
      {/* Custom implementation with multiple components */}
      <div className="container">
        <div className="grid">
          {/* Image section */}
          {/* Product details */}
          {/* Variant selector */}
          {/* Features list */}
          {/* Contact button */}
        </div>
        
        {/* Contact form modal */}
      </div>
    </main>
  );
}
```

#### After Migration

```tsx
export default function ChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  // Optional: Add custom section if needed
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Special Features</h3>
        <p className="text-gray-600">
          This chair includes special features unique to this model.
        </p>
      </div>
    );
  };

  return (
    <ProductDetailLayout
      product={chairData}
      contactOptions={{
        onContactClick: () => setShowContactForm(true)
      }}
      renderCustomSection={renderCustomSection}
    />
  );
}
```

### 3. Chair-Specific Customizations

For chair-specific functionality that doesn't fit the standard pattern:

```tsx
export default function SpecializedChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSpecialFeatures, setShowSpecialFeatures] = useState(false);
  
  // Add chair-specific custom section
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Premium Materials</h3>
        <p className="text-gray-600">
          This chair is crafted with premium materials including...
        </p>
        <button 
          onClick={() => setShowSpecialFeatures(true)}
          className="mt-3 text-red-700 font-medium"
        >
          View Material Details
        </button>
      </div>
    );
  };
  
  return (
    <>
      <ProductDetailLayout
        product={chairData}
        contactOptions={{
          onContactClick: () => setShowContactForm(true)
        }}
        renderCustomSection={renderCustomSection}
      />
      
      {/* Chair-specific modal outside ProductDetailLayout */}
      {showSpecialFeatures && (
        <MaterialDetailsModal 
          onClose={() => setShowSpecialFeatures(false)}
        />
      )}
    </>
  );
}
```

### 4. Layout Customization

To customize the layout (e.g., image position):

```tsx
<ProductDetailLayout
  product={chairData}
  layoutOptions={{
    imagePosition: 'right', // Display image on the right side
    showMetaSection: true,  // Show additional metadata section
  }}
/>
```

### 5. Testing Checklist

After migration, verify:

- [ ] All product information displays correctly
- [ ] Variant selection works properly
- [ ] Product images load correctly
- [ ] Features are displayed in the standard grid format
- [ ] Contact button functions correctly
- [ ] Custom sections render as expected
- [ ] Responsive behavior matches the design specifications
- [ ] Accessibility features are preserved

## Migration Schedule

### Phase 1: Core Director Series
- [ ] Woodland Director Chair (already migrated as proof of concept)
- [ ] Tycoon Director Chair
- [ ] Ashley Director Chair
- [ ] Opera Director Chair

### Phase 2: Extended Director Series
- [ ] BigBoss Gold Director Chair
- [ ] Any other director series chairs

### Phase 3: Other Chair Categories
- [ ] Executive chairs
- [ ] Office chairs
- [ ] Specialty chairs

## Common Migration Issues and Solutions

### Type Errors with Product Data

**Issue**: TypeScript errors when passing product data to ProductDetailLayout.

**Solution**: Ensure all required fields are present and have the correct types. Add fallbacks for potentially undefined fields:

```tsx
<ProductDetailLayout
  product={{
    ...chairData,
    // Add fallbacks for required fields that might be undefined
    name: chairData.name || 'Chair Name',
    description: chairData.description || 'No description available',
    price: chairData.price || 'Price on request',
    imageUrl: chairData.imageUrl || '/images/placeholder.jpg',
  }}
/>
```

### Custom Functionality Not Working

**Issue**: Chair-specific functionality no longer works after migration.

**Solution**: Move chair-specific state and functions to the page component, and use renderCustomSection or children props to add custom UI elements.

### Visual Inconsistencies

**Issue**: The migrated chair page looks different from the original.

**Solution**: Use className prop to add custom styling, or adjust the productStyles constants in lib/styles/productStyles.ts if the issue affects multiple chairs.

## Benefits of Migration

- **Consistent User Experience**: All chair pages will have the same layout, interactions, and styling.
- **Improved Maintainability**: Changes to styling or layout can be made in one place.
- **Enhanced Developer Experience**: New chair pages can be created with minimal code.
- **Better Accessibility**: Standardized accessibility features across all products.
- **Streamlined Testing**: Simplified testing process with standardized components.

By following this guide, you can efficiently migrate all chair pages to the centralized product styling system, ensuring a consistent and maintainable codebase.