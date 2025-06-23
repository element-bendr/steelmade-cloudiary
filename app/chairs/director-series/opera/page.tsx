"use client";

import React, { useState } from 'react';
import operaDirectorChair from '@/lib/data/products/chairs/director-series/opera';
import { ChairPageLayout } from '@/components/products/ChairPageLayout';

export default function OperaDirectorChairPage() {
  const [selectedVariant, setSelectedVariant] = useState(operaDirectorChair.defaultVariant ?? (operaDirectorChair.variants?.[0]?.id ?? ''));
  
  return (
    <ChairPageLayout
      chair={operaDirectorChair}
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