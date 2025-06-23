import { Suspense } from "react";
import { Metadata } from 'next';
import { getAllSeries } from "@/lib/services/product-service";
import ProductCategoryPageLayout from "@/components/products/ProductCategoryPageLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hospital Furniture",
  description: "Specialized furniture solutions for healthcare environments. Durable, hygienic, and designed for patient and staff comfort.",
  openGraph: {
    title: "Hospital Furniture | SteelMade",
    description: "Durable, hygienic furniture for healthcare environments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital Furniture | SteelMade",
    description: "Durable, hygienic furniture for healthcare environments.",
  },
  alternates: {
    canonical: "/hospital-furniture",
  },
};

export default async function HospitalFurniturePage() {
  const seriesData = await getAllSeries("hospital-furniture");

  // Defensive mapping: convert ProductSeries to SeriesMetadata for all series
  const mapProductSeriesToSeriesMetadata = (series: any): import('@/types/collections').SeriesMetadata => ({
    id: series.id,
    title: series.title ?? '',
    description: series.description ?? '',
    seoDescription: series.seoDescription ?? '',
    features: series.features ?? [],
    lastModified: series.lastModified ?? '',
    products: series.products ?? {},
    category: series.category ?? 'hospital-furniture',
    imageUrl: series.imageUrl ?? '',
    specifications: series.specifications ?? {},
    tags: series.tags ?? [],
    coverImage: {
      url: series.coverImage?.url ?? '',
      width: series.coverImage?.width ?? 0,
      height: series.coverImage?.height ?? 0,
      alt: series.coverImage?.alt ?? '',
    },
    images: Array.isArray(series.images)
      ? series.images.map((img: any) => ({
          url: img.url ?? '',
          width: img.width ?? 0,
          height: img.height ?? 0,
          alt: img.alt ?? '',
        }))
      : [],
  });

  const mappedSeriesData = Object.fromEntries(
    Object.entries(seriesData).map(([key, value]) => [
      key,
      {
        ...value,
        lastModified:
          value.lastModified &&
          typeof value.lastModified === 'object' &&
          Object.prototype.toString.call(value.lastModified) === '[object Date]'
            ? (value.lastModified as Date).toISOString()
            : value.lastModified ?? undefined,
      },
    ])
  );

  const pageTitle = "Hospital Furniture";
  const pageDescription = "Specialized furniture solutions for healthcare environments. Durable, hygienic, and designed for patient and staff comfort.";
  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "Hospital Furniture", item: "/hospital-furniture" }
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
        category="hospital-furniture"
        seriesData={mappedSeriesData}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbItems={breadcrumbItems}
      />
    </Suspense>
  );
}