# Chair Page Styling Standards

This document outlines the standardized styling approach for all chair pages in the SteelMade Cloudiary Chairs application, based on the Opera Director Chair implementation.

## Core Styling Requirements

All director series chair pages must follow these consistent styling requirements:

### 1. Component Usage

All chair pages must use the `ProductDetailLayout` component from `@/components/products`:

```tsx
import { ProductDetailLayout } from '@/components/products';
```

### 2. Price Display

As per current requirements, prices should not be displayed on chair pages:

```tsx
product={{
  ...chairData,
  // No price display
  price: '',
  imageUrl: chairData.imageUrl || '/images/chairs/placeholder.jpg',
}}
```

### 3. Layout Configuration

All chair pages should use consistent layout options:

```tsx
layoutOptions={{
  imagePosition: 'left',
  showMetaSection: false,
}}
```

### 4. Custom Section

Every chair page should include a custom section highlighting special features of the chair:

```tsx
const renderCustomSection = () => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">[Chair] Special Features</h3>
      <p className="text-gray-600">
        Description of the chair's unique characteristics...
      </p>
      <ul className="mt-3 space-y-1 list-disc list-inside text-gray-600 pl-2">
        <li>Feature one</li>
        <li>Feature two</li>
        <li>Feature three</li>
      </ul>
    </div>
  );
};
```

## Template Implementation

Here's a standardized template for all chair pages:

```tsx
"use client";

import React, { useState } from 'react';
import { ProductDetailLayout } from '@/components/products';
import { chairData } from '@/lib/data/products/chairs/chair-data-path';

export default function ChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  // Chair-specific custom section
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Chair-Specific Features</h3>
        <p className="text-gray-600">
          Description of the chair's unique characteristics...
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-gray-600 pl-2">
          <li>Feature one</li>
          <li>Feature two</li>
          <li>Feature three</li>
        </ul>
      </div>
    );
  };

  return (
    <ProductDetailLayout
      product={{
        ...chairData,
        price: '',
        imageUrl: chairData.imageUrl || '/images/chairs/placeholder.jpg',
      }}
      contactOptions={{
        onContactClick: () => setShowContactForm(true),
      }}
      layoutOptions={{
        imagePosition: 'left',
        showMetaSection: false,
      }}
      renderCustomSection={renderCustomSection}
    />
  );
}
```

## Chair-Specific Customizations

While maintaining the core styling requirements, each chair may have chair-specific customizations:

### Woodland Director Chair

- Features focus on outdoor usage and durability
- Weather-resistant materials emphasized

### Tycoon Director Chair

- Emphasis on exclusive benefits
- Warranty and support information included

### Ashley Director Chair

- Focus on elegance and practicality
- Multiple color options highlighted

### Opera Director Chair

- Premium materials and unique design elements
- Customization options featured

### BigBoss Gold Director Chair

- Luxury materials with amber accent styling
- Additional modal for material details

## Verification Checklist

When implementing or updating a chair page, verify the following:

- [ ] Uses ProductDetailLayout component
- [ ] Price is not displayed (empty string)
- [ ] Image positioned on the left side
- [ ] Custom section included with 3+ features
- [ ] Consistent border and spacing
- [ ] Chair-specific features highlighted
- [ ] Fallback image path provided
- [ ] Contact button functionality implemented

## Styling Guidelines

- Use standard spacing classes (mt-6, pt-6) for section margins
- Use standard color classes (text-gray-900, text-gray-600) for text
- Use standard border classes (border-t, border-gray-200) for separators
- Use list-disc and list-inside for feature lists
- Maintain consistent heading hierarchy (h3 for section titles)