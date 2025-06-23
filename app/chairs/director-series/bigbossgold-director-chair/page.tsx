/**
 * Refactored for canonical product type compliance, DRY, and clarity.
 * All transformation logic is type-safe and modular.
 * See architecture.md and memory.md for documentation.
 */

'use client';

import React from 'react';
import { EnhancedProductDetailLayout } from '@/modules/ui/components';
import { Product } from '@/modules/product/types';
import { bigBossGoldDirectorChair } from '@/lib/data/products/chairs/director-series/bigboss-gold-director-chair';

/**
 * Product detail page for BigBoss Gold Director Chair
 * Canonical, DRY, modular, and poetic.
 */
export default function BigBossGoldDirectorChairPage() {
  // Transform canonical product data to local Product type
  const product: Product = {
    ...bigBossGoldDirectorChair,
    slug: 'bigbossgold-director-chair',
    categorySlug: 'chairs',
    seriesSlug: 'director-series',
    images: bigBossGoldDirectorChair.images?.map(img => img.url) || [],
    variants: bigBossGoldDirectorChair.variants?.map(variant => ({
      id: variant.variantId,
      variantId: variant.variantId,
      variantName: variant.variantName,
      name: variant.name,
      imageUrl: variant.imageUrl,
      images: [variant.imageUrl] // images as string[]
    })) || []
  };

  return <EnhancedProductDetailLayout product={product} />;
}