'use client'

import type { ProductSeries } from '../../lib/data/product-types';
import { SeriesGrid } from './SeriesGrid';
import { CategoryNav } from '../collections/CategoryNav';
import { BreadcrumbSchema, OrganizationSchema } from '../seo/structured-data';

interface ProductCategoryPageLayoutProps {
  category: string;
  seriesData: Record<string, ProductSeries>;
  pageTitle: string;
  pageDescription: string;
  breadcrumbItems: Array<{ name: string; item: string }>;
}

export default function ProductCategoryPageLayout({
  category,
  seriesData,
  pageTitle,
  pageDescription,
  breadcrumbItems,
}: ProductCategoryPageLayoutProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* 
        The original app/chairs/page.tsx uses BreadcrumbSchema and WebsiteSchema.
        If these are default exports from structured-data.tsx and are the same component,
        the usage might need to be adjusted, or the component itself is versatile.
        For now, we follow the pattern observed.
      */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema />
      
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          {pageTitle}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          {pageDescription}
        </p>
      </div>

      <CategoryNav currentCategory={category as import('../../lib/data/product-types').ProductType} />

      <section className="mt-8">
        <SeriesGrid seriesData={seriesData} productType={category} />
      </section>
    </main>
  )
}
