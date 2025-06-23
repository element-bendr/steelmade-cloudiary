"use client";

import React, { useState } from 'react';
import { bigBossGoldDirectorChair } from '@/lib/data/products/chairs/director-series/bigboss-gold-director-chair';
import { ChairPageLayout } from '@/components/products/ChairPageLayout';

export default function BigBossGoldDirectorChairPage() {
  // Get the first variant's id as the default
  const defaultVariant = bigBossGoldDirectorChair.variants?.[0]?.variantId || '';
  const [selectedVariant, setSelectedVariant] = useState<string>(defaultVariant);

  // Map canonical data to Chair type, including defaultVariant as string
  const chair = {
    id: bigBossGoldDirectorChair.id,
    name: bigBossGoldDirectorChair.name,
    description: bigBossGoldDirectorChair.description,
    price: '', // Add price if available in canonical data
    imageUrl: bigBossGoldDirectorChair.imageUrl,
    category: bigBossGoldDirectorChair.category,
    features: bigBossGoldDirectorChair.features || [],
    variants: bigBossGoldDirectorChair.variants?.map(variant => ({
      id: variant.variantId,
      name: variant.variantName,
      imageUrl: variant.imageUrl,
    })) || [],
    defaultVariant
  };

  return (
    <ChairPageLayout
      chair={chair}
      selectedVariant={selectedVariant}
      onVariantChange={setSelectedVariant}
      breadcrumbs={[
        { name: 'Chairs', href: '/chairs' },
        { name: 'Director Series', href: '/chairs/director-series' },
        { name: bigBossGoldDirectorChair.name, href: '/chairs/director-series/bigboss-gold' }
      ]}
    />
  );
}