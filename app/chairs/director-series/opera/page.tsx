"use client";

import React, { useState } from 'react';
import operaDirectorChair from '@/lib/data/products/chairs/director-series/opera/index';
import { ChairPageLayout } from '@/components/products/ChairPageLayout';

export default function OperaDirectorChairPage() {
  const [selectedVariant, setSelectedVariant] = useState(operaDirectorChair.variants?.[0]?.variantId ?? '');
  
  return (
    <ChairPageLayout
      chair={{
        ...operaDirectorChair,
        images: operaDirectorChair.images?.map(img => typeof img === 'string' ? img : img.url),
        variants: operaDirectorChair.variants?.map(v => ({
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
        { name: operaDirectorChair.name, href: '/chairs/director-series/opera' }
      ]}
    />
  );
}