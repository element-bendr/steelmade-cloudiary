export const metadata = {
  title: "Visitor Series | SteelMade Office Chairs",
  description: "Chairs designed to welcome guests with comfort and style.",
};

import React from 'react';
import { visitorSeries } from '@/lib/data/products/chairs/visitor-series';
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

export default function VisitorSeriesPage() {
  const chairs = Object.values(visitorSeries.products).map(toChair);
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Visitor Series Chairs</h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Discover our poetic Visitor Series chairs, designed to welcome every guest with comfort and style.
      </p>
      <ChairGridWithViewMore chairs={chairs} basePath="/chairs/visitor-series" />
    </div>
  );
}
