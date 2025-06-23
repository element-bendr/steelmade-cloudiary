import { Suspense } from "react";
import { Metadata } from "next";
import { getAllSeries } from "@/lib/services/product-service";
import ProductCategoryPageLayout from "@/components/products/ProductCategoryPageLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Desks",
  description: "Discover our premium range of desks, from ergonomic standing desks to classic executive designs. Built for productivity and style.",
  openGraph: {
    title: "Desks | SteelMade",
    description: "Discover our premium range of desks, built for productivity and style.",
    images: [
      {
        url: "/images/desks/collection-cover.jpg",
        width: 1200,
        height: 630,
        alt: "SteelMade Desk Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desks | SteelMade",
    description: "Discover our premium range of desks, built for productivity and style.",
    images: ["/images/desks/collection-cover.jpg"],
  },
  alternates: {
    canonical: "/desks",
  },
};

export default async function DesksPage() {
  const seriesData = await getAllSeries("desks");

  // Defensive mapping: convert ProductSeries to SeriesMetadata for all series
  const mapProductSeriesToSeriesMetadata = (series: any): import('@/types/collections').SeriesMetadata => ({
    id: series.id,
    title: series.title ?? '',
    description: series.description ?? '',
    seoDescription: series.seoDescription ?? '',
    features: series.features ?? [],
    lastModified: series.lastModified ?? '',
    products: series.products ?? {},
    category: series.category ?? 'desks',
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

  const pageTitle = "Desks";
  const pageDescription = "Discover our premium range of desks, from ergonomic standing desks to classic executive designs. Built for productivity and style.";
  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "Desks", item: "/desks" }
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
        category="desks"
        seriesData={mappedSeriesData}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbItems={breadcrumbItems}
      />
    </Suspense>
  );
}
