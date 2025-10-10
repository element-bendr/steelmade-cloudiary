import { Suspense } from "react";
import { Metadata } from 'next';
import { getSeriesForCategory } from "@/lib/api/products-unified";
import ProductCategoryPageLayout from "@/components/products/ProductCategoryPageLayout";
import { Skeleton } from "@/components/ui/skeleton";
import type { SeriesMetadata, ProductCategory } from "@/types/collections";
import type { ProductSeries } from "@/lib/data/product-types";

// Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "School Furniture",
  description: "Equip educational spaces with our durable and functional school furniture. Designed for modern learning environments.",
  openGraph: {
    title: "School Furniture | SteelMade",
    description: "Durable and functional school furniture for modern learning environments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "School Furniture | SteelMade",
    description: "Durable and functional school furniture for modern learning environments.",
  },
  alternates: {
    canonical: "/school-furniture",
  },
};

export default async function SchoolFurniturePage() {
  // Use canonical, DRY, and type-safe fetcher for series data
  const rawSeriesData: Record<string, ProductSeries> = await getSeriesForCategory("school-furniture");

  // Map ProductSeries to SeriesMetadata for UI
  const mapProductSeriesToSeriesMetadata = (series: ProductSeries): SeriesMetadata => ({
    id: series.id,
    title: series.title ?? '',
    description: series.description ?? '',
    seoDescription: series.seoDescription ?? '',
    features: series.features ?? [],
    lastModified: series.lastModified ?? '',
    products: series.products ?? {},
    category: (series.category ?? 'school-furniture') as ProductCategory,
    imageUrl: series.imageUrl ?? '',
    coverImage: series.coverImage as any,
    images: series.images as any,
  });
  const seriesDataForUI: Record<string, SeriesMetadata> = Object.fromEntries(
    Object.entries(rawSeriesData).map(([key, value]) => [key, mapProductSeriesToSeriesMetadata(value)])
  );

  // Map SeriesMetadata back to ProductSeries for ProductCategoryPageLayout
  const mapSeriesMetadataToProductSeries = (series: SeriesMetadata): ProductSeries => ({
    id: series.id,
    title: series.title,
    description: series.description,
    seoDescription: series.seoDescription,
    category: typeof series.category === 'string' ? series.category : undefined,
    imageUrl: series.imageUrl,
    coverImage: series.coverImage as any,
    images: series.images as any,
    features: series.features,
    lastModified: typeof series.lastModified === 'string' ? series.lastModified : (series.lastModified instanceof Date ? series.lastModified.toISOString() : undefined),
    products: series.products,
  });
  const seriesData: Record<string, ProductSeries> = Object.fromEntries(
    Object.entries(seriesDataForUI).map(([key, value]) => [key, mapSeriesMetadataToProductSeries(value)])
  );

  const pageTitle = "School Furniture";
  const pageDescription = "Equip educational spaces with our durable and functional school furniture. Designed for modern learning environments.";
  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "School Furniture", item: "/school-furniture" }
  ];

  return (
    <Suspense fallback={
      <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[400px] rounded-xl" />
        ))}
      </div>
    }>
      <ProductCategoryPageLayout
        category="school-furniture"
        seriesData={seriesData}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbItems={breadcrumbItems}
      />
    </Suspense>
  );
}