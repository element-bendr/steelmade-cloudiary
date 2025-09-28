"use client";

import React from 'react';
import { notFound } from "next/navigation";
import { getProductById, getSeriesById } from "../../../../lib/utils/product-utils";
import { ProductDetailLayout } from '../../../../components/products';

export default function ProductDetailRoute({ params }: { params: { seriesId: string; productId: string } }) {
  const { seriesId, productId } = params;
  const categoryId = "chairs";

  const product = getProductById(categoryId, seriesId, productId);
  const series = getSeriesById(categoryId, seriesId);

  if (!product || !series) {
    notFound();
  }

  return (
    <ProductDetailLayout
      product={{
        ...product,
        imageUrl: product.imageUrl || '/images/chairs/placeholder.jpg',
        price: (product as any).price ?? '',
        seriesId: seriesId, // Always include seriesId for breadcrumb logic
      }}
      // Optionally pass series/category for conditional logic (e.g., hide price for executive)
      layoutOptions={{ imagePosition: 'left', showMetaSection: false }}
    />
  );
}
