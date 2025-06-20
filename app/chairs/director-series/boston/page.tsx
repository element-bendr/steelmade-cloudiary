"use client";

import React, { useState } from 'react';
import bostonDirectorChair from '@/lib/data/products/chairs/director-series/boston';
import { ChairPageLayout } from '@/components/products/ChairPageLayout';

export default function BostonDirectorChairPage() {
  const [selectedVariant, setSelectedVariant] = useState(bostonDirectorChair.defaultVariant);
  
  return (
    <ChairPageLayout
      chair={bostonDirectorChair}
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