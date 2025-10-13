// app/modular-furniture/[seriesId]/[productId]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageLayout from "@/components/products/ProductPageLayout";
import { getProductDetails, getSeriesById, getRevalidateTime, getAllProductsInCategory } from "@/lib/services/product-service";
import { getImageUrl } from "@/lib/utils/image-utils";
import type { SeriesMetadata, ProductCategory } from "@/types/collections";
import type { ExtendedProductData } from "@/lib/data/product-types";

interface ModularFurnitureProductPageProps {
  params: {
    seriesId: string;
    productId: string;
  };
}

export const revalidate = getRevalidateTime();

export async function generateMetadata({ params }: ModularFurnitureProductPageProps): Promise<Metadata> {
  const { productId, seriesId } = params;
  const product = await getProductDetails("modular-furniture", seriesId, productId);

  if (!product) {
    return notFound();
  }

  // Fetch real series metadata for richer metadata and breadcrumb accuracy
  const series = await getSeriesById('modular-furniture', seriesId)

  if (!series) {
    // If series is missing, still render product metadata but mark as not found for page-level routing
    return notFound();
  }

  const mainImage = product.imageUrl ? getImageUrl(product.imageUrl) : "/images/placeholder/product-fallback.jpg";

  return {
    title: `${product.name} | Modular Furniture | Steelmade`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [mainImage],
      type: "article",
    },
    alternates: {
      canonical: `/modular-furniture/${seriesId}/${productId}`,
    },
  };
}

export default async function ProductPage({ params }: ModularFurnitureProductPageProps) {
  const { productId, seriesId } = params;
  const product = await getProductDetails("modular-furniture", seriesId, productId);

  if (!product) {
    notFound();
  }

  const series = await getSeriesById('modular-furniture', seriesId);
  if (!series) {
    // If the series doesn't exist, treat the page as not found to avoid stale product pages
    notFound();
  }

  return (
    <ProductPageLayout
      product={product}
      category={"modular-furniture" as ProductCategory}
      series={series}
    />
  );
}

export async function generateStaticParams() {
  const products = await getAllProductsInCategory("modular-furniture");
  return products.map((product) => ({
    seriesId: product.seriesId,
    productId: product.id,
  }));
}
