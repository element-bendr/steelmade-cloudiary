# Adding New Director Series Chairs

This guide explains how to add new chairs to the Director Series using the standardized factory pattern.

## Overview

The Director Series chairs use a consistent factory pattern that ensures uniform data structure, styling, and functionality. This approach simplifies the process of adding new chairs while maintaining consistency across the product line.

## Prerequisites

Before adding a new chair, ensure you have:

1. Chair details (name, description, features)
2. Images for each variant (high-back, mid-back)
3. Cloudinary image codes for each variant

## Step-by-Step Guide

### 1. Create the Chair Data File

Create a new file in `lib/data/products/chairs/director-series/` with the chair's name (e.g., `executive.ts`):

```typescript
import { createDirectorChair } from '@/lib/factories/chairFactory';
import { registerDirectorChair } from './index';

/**
 * Executive Director Chair data
 */
const executiveDirectorChair = createDirectorChair({
  id: 'executive',
  name: 'Executive Director Chair',
  description: 'The Executive Director Chair combines premium materials with exceptional comfort for professional settings.',
  variants: [
    {
      id: 'high-back',
      name: 'High Back',
      imageCode: 'ic-150-hb'  // Cloudinary image code
    },
    {
      id: 'mid-back',
      name: 'Mid Back',
      imageCode: 'ic-151-mb'  // Cloudinary image code
    }
  ],
  features: [
    'Premium aluminum construction',
    'Ergonomic design for extended comfort',
    'Weather-resistant materials',
    'Foldable for easy storage',
    'Professional appearance',
    'Available in high-back and mid-back variants'
  ],
  defaultVariant: 'high-back'  // Which variant to show by default
});

// Register this chair with the director series
registerDirectorChair(executiveDirectorChair);

export default executiveDirectorChair;
```

### 2. Add Chair Import to Index File

Update the `lib/data/products/chairs/director-series/index.ts` file to import your new chair:

```typescript
// Existing imports...

// Add your new chair import
import './executive';
```

### 3. Create the Chair Detail Page

Create a new folder and page file in `app/chairs/director-series/executive/page.tsx`:

```typescript
"use client";

import React, { useState } from 'react';
import executiveDirectorChair from '@/lib/data/products/chairs/director-series/executive';
import { ChairPageLayout } from '@/components/products/ChairPageLayout';

export default function ExecutiveDirectorChairPage() {
  const [selectedVariant, setSelectedVariant] = useState(executiveDirectorChair.defaultVariant);
  
  return (
    <ChairPageLayout
      chair={executiveDirectorChair}
      selectedVariant={selectedVariant}
      onVariantChange={setSelectedVariant}
      breadcrumbs={[
        { name: 'Chairs', href: '/chairs' },
        { name: 'Director Series', href: '/chairs/director-series' },
        { name: executiveDirectorChair.name, href: '/chairs/director-series/executive' }
      ]}
    />
  );
}
```

### 4. Add Chair to Director Series Page

Update the array of chairs in `app/chairs/director-series/page.tsx`:

```typescript
// Import your new chair
import executiveDirectorChair from '@/lib/data/products/chairs/director-series/executive';

// Add to the chairs array
const chairs = [
  ashleyDirectorChair,
  operaDirectorChair,
  tycoonDirectorChair,
  bigbossGoldDirectorChair,
  woodlandDirectorChair,
  bostonDirectorChair,
  executiveDirectorChair  // Add your new chair here
];
```

### 5. Verify Implementation

1. Make sure the application builds without errors
2. Check that the new chair appears on the Director Series page
3. Test the chair detail page to ensure variants work correctly
4. Verify that the chair follows the same styling as other chairs

## Cloudinary Image Guidelines

- Upload images to the `steelmade/chairs/director-series/{chair-name}/` path
- Use a consistent naming convention for image codes:
  - Format: `ic-{number}-{variant}`
  - Example: `ic-150-hb` for high-back variant
- Ensure images have the same dimensions and aspect ratio as other chair images

## Troubleshooting

If your chair doesn't appear:
- Check that it's properly registered via `registerDirectorChair`
- Verify the import in the index.ts file
- Ensure the chair is added to the array in the director series page

If images don't display:
- Verify the Cloudinary image codes are correct
- Check that the images are uploaded to the right path
- Ensure the chair ID matches the folder name in Cloudinary