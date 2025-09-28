import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ProductCategoryPageLayout from '@/components/products/ProductCategoryPageLayout';
import { getAllSeries } from '@/lib/services/product-service';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Racking Systems | SteelMade',
  description: 'Explore SteelMade\'s industrial-grade racking systems. Robust solutions for warehouse and industrial storage needs, ensuring durability and optimal space utilization.',
  openGraph: {
    title: 'Racking Systems | SteelMade',
    description: 'Robust solutions for warehouse and industrial storage needs.',
    url: 'https://www.steelmade.co.za/racking-systems',
    images: [
      {
        url: '/images/og-racking-systems.webp',
        width: 1200,
        height: 630,
        alt: 'SteelMade Racking Systems',
      },
    ],
  },
  alternates: {
    canonical: '/racking-systems',
  },
};

const PageSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-8 w-1/4 mb-4" />
    <Skeleton className="h-16 w-1/2 mb-6 mx-auto" />
    <Skeleton className="h-6 w-3/4 mb-8 mx-auto" />
    <Skeleton className="h-10 w-full mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

const RackingSystemsPage = async () => {
  const category = 'racking-systems';
  const rawSeriesData = await getAllSeries(category);
  // Defensive mapping: convert ProductSeries to ProductSeries (not SeriesMetadata)
  // Ensure lastModified is always a string, not Date
  const mapProductSeries = (series: any): import("@/lib/data/product-types").ProductSeries => ({
    id: series.id,
    title: series.title ?? '',
    description: series.description ?? '',
    seoDescription: series.seoDescription ?? '',
    features: series.features ?? [],
    lastModified: typeof series.lastModified === 'string' ? series.lastModified : (series.lastModified ? new Date(series.lastModified).toISOString() : ''),
    products: series.products ?? {},
    category: series.category ?? category,
    imageUrl: series.imageUrl ?? '',
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
  const seriesData = Object.fromEntries(
    Object.entries(rawSeriesData).map(([key, value]) => [key, mapProductSeries(value)])
  );

  const pageTitle = 'Racking Systems';
  const pageDescription = "SteelMade offers industrial-strength racking solutions that optimize warehouse space and improve inventory management. Our range includes heavy-duty options designed for various load capacities and industrial applications.";
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Products', item: '/products' },
    { name: 'Racking Systems', item: '/racking-systems' },
  ];

  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductCategoryPageLayout
        category={category}
        seriesData={seriesData}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbItems={breadcrumbItems}
      />
    </Suspense>
  );
};

export default RackingSystemsPage;