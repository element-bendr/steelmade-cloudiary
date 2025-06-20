"use client";

import React, { useState } from 'react';
import bigbossGoldDirectorChair from '@/lib/data/products/chairs/director-series/bigboss-gold';
import { ChairPageLayout } from '@/components/products/ChairPageLayout';

export default function BigBossGoldDirectorChairPage() {
  const [selectedVariant, setSelectedVariant] = useState(bigbossGoldDirectorChair.defaultVariant);
  
  return (
    <ChairPageLayout
      chair={bigbossGoldDirectorChair}
      selectedVariant={selectedVariant}
      onVariantChange={setSelectedVariant}
      breadcrumbs={[
        { name: 'Chairs', href: '/chairs' },
        { name: 'Director Series', href: '/chairs/director-series' },
        { name: bigbossGoldDirectorChair.name, href: '/chairs/director-series/bigboss-gold' }
      ]}
    />
  );
}