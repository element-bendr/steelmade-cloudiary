"use client";

// Import individual chair data files
import ashleyDirectorChair from '@/lib/data/products/chairs/director-series/ashley-director-chair/index';
import operaDirectorChair from '@/lib/data/products/chairs/director-series/opera-director-chair/index';
import tycoonDirectorChair from '@/lib/data/products/chairs/director-series/tycoon-director-chair/index';
import bigBossGoldDirectorChair from '@/lib/data/products/chairs/director-series/bigboss-gold-director-chair/index';
import woodlandDirectorChair from '@/lib/data/products/chairs/director-series/woodland-director-chair/index';
import bostonDirectorChair from '@/lib/data/products/chairs/director-series/boston/index';
import grandezzaDirectorChair from '@/lib/data/products/chairs/director-series/grandezza/index';
import kotakDirectorChair from '@/lib/data/products/chairs/director-series/kotak/index';
import milanoDirectorChair from '@/lib/data/products/chairs/director-series/milano/index';
import monarchDirectorChair from '@/lib/data/products/chairs/director-series/monarch/index';
import nissanDirectorChair from '@/lib/data/products/chairs/director-series/nissan/index';
import parkerDirectorChair from '@/lib/data/products/chairs/director-series/parker/index';
import tridentDirectorChair from '@/lib/data/products/chairs/director-series/trident/index';

import React from 'react';
import { ChairCard } from '@/components/products/ChairCard';

// Helper to map ExtendedProductData to Chair type
function toChair(data: any): any {
  const defaultVariant = data.variants?.[0]?.variantId || '';
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price || '',
    imageUrl: data.imageUrl,
    category: data.category || '',
    features: data.features || [],
    variants: (data.variants || []).map((variant: any) => ({
      id: variant.variantId,
      name: variant.variantName,
      imageUrl: variant.imageUrl,
    })),
    defaultVariant
  };
}

// Collect all chairs into an array
const chairs = [
  toChair(ashleyDirectorChair),
  toChair(operaDirectorChair),
  toChair(tycoonDirectorChair),
  toChair(bigBossGoldDirectorChair),
  toChair(woodlandDirectorChair),
  toChair(bostonDirectorChair),
  toChair(grandezzaDirectorChair),
  toChair(kotakDirectorChair),
  toChair(milanoDirectorChair),
  toChair(monarchDirectorChair),
  toChair(nissanDirectorChair),
  toChair(parkerDirectorChair),
  toChair(tridentDirectorChair)
];

export default function DirectorSeriesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Director Series Chairs</h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Discover our premium Director Series chairs, designed for professionals who demand the best in comfort and style.
        Each chair is crafted with attention to detail and built to last.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chairs.map((chair) => (
          <ChairCard key={chair.id} chair={chair} />
        ))}
      </div>
    </div>
  );
}