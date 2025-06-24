"use client";

import React, { useState } from 'react';
import bostonDirectorChair from '@/lib/data/products/chairs/director-series/boston/index';
import { ChairPageLayout } from '@/components/products/ChairPageLayout';

export default function BostonDirectorChairPage() {
  const [selectedVariant, setSelectedVariant] = useState(bostonDirectorChair.variants?.[0]?.variantId ?? '');
  
  return (
    <ChairPageLayout
      chair={{
        ...bostonDirectorChair,
        images: bostonDirectorChair.images?.map(img => typeof img === 'string' ? img : img.url),
        variants: bostonDirectorChair.variants?.map(v => ({
          id: v.variantId,
          name: v.variantName,
          imageUrl: v.imageUrl
        })),
      }}
      selectedVariant={selectedVariant}
      onVariantChange={setSelectedVariant}
      breadcrumbs={[
        { name: 'Chairs', href: '/chairs' },
        { name: 'Director Series', href: '/chairs/director-series' },
        { name: bostonDirectorChair.name, href: '/chairs/director-series/boston' }
      ]}
    />
  );
}