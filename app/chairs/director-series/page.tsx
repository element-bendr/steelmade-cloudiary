"use client";

import React from 'react';
import { directorSeries } from '@/lib/data/products/chairs/director-series';
import { ChairGridWithViewMore } from '@/components/ui/ChairGridWithViewMore';

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
    defaultVariant,
    images: (data.images || []).map((img: any) => img.url)
  };
}

export default function DirectorSeriesPage() {
  const chairs = Object.values(directorSeries.products).map(toChair);
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Director Series Chairs</h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Discover our premium Director Series chairs, designed for professionals who demand the best in comfort and style.
        Each chair is crafted with attention to detail and built to last.
      </p>
      <ChairGridWithViewMore chairs={chairs} basePath="/chairs/director-series" />
    </div>
  );
}