# Chair Migration Visual Guide

This document provides visual examples of chair page transformations when migrating to the centralized product styling system.

## Before and After Migration

### Original Chair Page Implementation

The original chair page implementation typically included:

```tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { chairData } from '@/lib/data/products/chairs/chair-data';

export default function ChairPage() {
  const [selectedVariant, setSelectedVariant] = useState(chairData.variants?.[0]);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={selectedVariant?.imageUrl || chairData.imageUrl}
              alt={`${chairData.name} - ${selectedVariant?.name || ''}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-700 opacity-20"></div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{chairData.name}</h1>
            <p className="text-gray-600">{chairData.description}</p>
            <div className="text-xl font-semibold text-gray-900">{chairData.price}</div>

            {/* Variant Selector */}
            <div className="space-y-2">
              <h3 className="font-medium">Available Variants</h3>
              <div className="flex flex-wrap gap-3">
                {chairData.variants?.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedVariant?.id === variant.id
                        ? 'border-red-700 text-red-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-2">
              <h3 className="font-medium">Features</h3>
              <ul className="space-y-2">
                {chairData.features?.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-700 mt-0.5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Button */}
            <div className="space-y-2">
              <Button
                onClick={() => setShowContactForm(true)}
                className="w-full sm:w-auto"
              >
                Contact Sales
              </Button>
              <div className="text-red-700 font-medium">
                {selectedVariant && `Selected: ${selectedVariant.name}`}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (simplified) */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
              <h2 className="text-2xl font-bold">Contact Sales</h2>
              <p>
                Interested in the {chairData.name} {selectedVariant && `(${selectedVariant.name})`}?
                Fill out the form below and our sales team will get back to you.
              </p>
              <div className="space-y-4">
                {/* Form fields */}
                <div className="flex gap-2">
                  <Button type="submit">Send Message</Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowContactForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
```

### Migrated Chair Page Implementation

After migration to the centralized product styling system:

```tsx
"use client";

import React, { useState } from 'react';
import { chairData } from '@/lib/data/products/chairs/chair-data';
import { ProductDetailLayout } from '@/components/products';

export default function ChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  // Optional: Add chair-specific custom section if needed
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Chair-Specific Section</h3>
        <p className="text-gray-600">Custom content for this chair model...</p>
      </div>
    );
  };

  return (
    <ProductDetailLayout
      product={{
        ...chairData,
        // Add fallbacks for required fields that might be undefined
        price: chairData.price || 'Price on request',
        imageUrl: chairData.imageUrl || '/images/placeholder.jpg',
      }}
      contactOptions={{
        onContactClick: () => setShowContactForm(true),
      }}
      renderCustomSection={renderCustomSection} // Optional
    />
  );
}
```

## Visual Comparison

### Before Migration
- 📏 80-120 lines of code per chair page
- 🔄 Duplicated styling and structure across pages
- 🧩 Inconsistent implementation of common elements
- 🐛 More potential for bugs due to repetition
- 🔧 More maintenance effort for styling changes

### After Migration
- 📏 20-30 lines of code per chair page (75% reduction)
- 🎨 Consistent styling through centralized system
- 🧩 Standardized implementation of common elements
- 🐛 Reduced bug potential with centralized logic
- 🔧 Single point of change for styling updates

## Common Migration Patterns

### Pattern 1: Basic Chair Page

For simple chair pages with no special requirements:

```tsx
export default function BasicChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <ProductDetailLayout
      product={chairData}
      contactOptions={{
        onContactClick: () => setShowContactForm(true),
      }}
    />
  );
}
```

### Pattern 2: Chair Page with Custom Section

For chair pages that need additional custom content:

```tsx
export default function CustomizedChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Special Features</h3>
        <p className="text-gray-600">This chair includes special features...</p>
      </div>
    );
  };

  return (
    <ProductDetailLayout
      product={chairData}
      contactOptions={{
        onContactClick: () => setShowContactForm(true),
      }}
      renderCustomSection={renderCustomSection}
    />
  );
}
```

### Pattern 3: Chair Page with Custom Layout

For chair pages that need a custom layout configuration:

```tsx
export default function CustomLayoutChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <ProductDetailLayout
      product={chairData}
      contactOptions={{
        onContactClick: () => setShowContactForm(true),
      }}
      layoutOptions={{
        imagePosition: 'right', // Display image on the right side
        showMetaSection: true,  // Show additional metadata section
      }}
    />
  );
}
```

### Pattern 4: Chair Page with External Modals

For chair pages that need additional modals or external components:

```tsx
export default function ExternalModalChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSpecialFeatures, setShowSpecialFeatures] = useState(false);
  
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button 
          onClick={() => setShowSpecialFeatures(true)}
          className="text-red-700 font-medium"
        >
          View Special Features
        </button>
      </div>
    );
  };
  
  return (
    <>
      <ProductDetailLayout
        product={chairData}
        contactOptions={{
          onContactClick: () => setShowContactForm(true),
        }}
        renderCustomSection={renderCustomSection}
      />
      
      {/* External modal */}
      {showSpecialFeatures && (
        <SpecialFeaturesModal 
          onClose={() => setShowSpecialFeatures(false)}
        />
      )}
    </>
  );
}
```

## Migration Results

By migrating all chair pages to the centralized product styling system, we achieve:

1. **Code Reduction**: ~75% less code per chair page
2. **Styling Consistency**: Uniform appearance across all products
3. **Improved Maintainability**: Single point of change for styling updates
4. **Enhanced Developer Experience**: Simpler implementation of new chair pages
5. **Better Accessibility**: Standardized accessibility features
6. **Responsive Consistency**: Uniform responsive behavior across products

## Migration Timeline

| Chair Model | Scheduled Migration | Status |
|-------------|---------------------|--------|
| Woodland Director Chair | Week 1 | ✅ Completed |
| Tycoon Director Chair | Week 1 | 🔄 In Progress |
| Ashley Director Chair | Week 2 | ⏳ Scheduled |
| Opera Director Chair | Week 2 | ⏳ Scheduled |
| BigBoss Gold Director Chair | Week 3 | ⏳ Scheduled |