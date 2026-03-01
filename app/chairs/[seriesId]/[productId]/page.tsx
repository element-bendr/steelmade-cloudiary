import React from 'react';
import { notFound } from "next/navigation";
import { getSeriesById } from "../../../../lib/utils/product-utils";
import { ProductDetailLayout } from '../../../../components/products';
import { client } from "../../../../lib/sanity.client";
import { productByIdQuery } from "../../../../lib/sanity.queries";

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 60 

export default async function ProductDetailRoute({ params }: { params: { seriesId: string; productId: string } }) {
  const { seriesId, productId } = params;
  const categoryId = "chairs";

  // Still getting static series details here temporarily until you migrate series over too
  const series = getSeriesById(categoryId, seriesId);

  if (!series) {
    notFound();
  }

  // Fetch product directly from Sanity CMS!
  const product = await client.fetch(productByIdQuery, { 
    category: categoryId, 
    seriesTitle: series.title,
    seriesId: seriesId,
    productId: productId
  });

  if (!product) {
    notFound();
  }

  // Convert array of string objects ({name: string, value: string}) back into Record for frontend component
  const parsedSpecs: Record<string, string> = {};
  if (product.specifications) {
     product.specifications.forEach((spec: any) => {
        parsedSpecs[spec.name] = spec.value;
     });
  }

  return (
    <ProductDetailLayout
      product={{
        ...product,
        specifications: parsedSpecs,
        imageUrl: product.imageUrl || '/images/chairs/placeholder.jpg',
        price: product.price ?? '',
        seriesId: seriesId, 
      }}
      layoutOptions={{ imagePosition: 'left', showMetaSection: false }}
    />
  );
}
