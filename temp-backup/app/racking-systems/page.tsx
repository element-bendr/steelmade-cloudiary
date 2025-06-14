import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ProductCategoryPageLayout from '@/components/products/ProductCategoryPageLayout';
import { getSeriesForCategory } from '@/lib/api/products';
import { Skeleton } from '@/components/ui/skeleton'; // Corrected import

export const metadata: Metadata = {
  title: 'Racking Systems | SteelMade',
  description: 'Explore SteelMade\'s industrial-grade racking systems. Robust solutions for warehouse and industrial storage needs, ensuring durability and optimal space utilization.',
  openGraph: {
    title: 'Racking Systems | SteelMade',
    description: 'Robust solutions for warehouse and industrial storage needs.',
    url: 'https://www.steelmade.co.za/racking-systems',
    images: [
      {
        url: '/images/og-racking-systems.webp', // Replace with actual OG image URL
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

// A simple skeleton for the page content while loading
const PageSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-8 w-1/4 mb-4" /> {/* Breadcrumb skeleton */}
    <Skeleton className="h-16 w-1/2 mb-6 mx-auto" /> {/* Title skeleton */}
    <Skeleton className="h-6 w-3/4 mb-8 mx-auto" /> {/* Description skeleton */}
    <Skeleton className="h-10 w-full mb-8" /> {/* CategoryNav skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

const RackingSystemsPage = async () => {
  const category = 'racking-systems';
  const seriesData = await getSeriesForCategory(category);

  const pageTitle = 'Racking Systems';
  const pageDescription = "SteelMade offers industrial-strength racking solutions that optimize warehouse space and improve inventory management. Our range includes heavy-duty options designed for various load capacities and industrial applications.";
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Products', item: '/products' },
    { name: 'Racking Systems', item: '/racking-systems' }, // Corrected: item should be the URL
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