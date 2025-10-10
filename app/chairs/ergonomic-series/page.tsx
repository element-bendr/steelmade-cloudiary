export const metadata = {
  title: "Ergonomic Series | SteelMade Office Chairs",
  description: "Science-backed ergonomic designs that promote comfort and wellness during extended periods of sitting.",
};

import React from 'react';
import { ergonomicSeries } from '@/lib/data/products/chairs/ergonomic-series';
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

export default function ErgonomicSeriesPage() {
  const chairs = Object.values(ergonomicSeries.products).map(toChair);
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Ergonomic Series Chairs</h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Discover our science-backed Ergonomic Series chairs, designed for comfort, wellness, and productivity during extended periods of sitting.
      </p>
      <ChairGridWithViewMore chairs={chairs} basePath="/chairs/ergonomic-series" />
    </div>
  );
}