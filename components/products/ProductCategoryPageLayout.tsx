'use client'

import type { SeriesMetadata, ProductCategory } from "@/types/collections"
import { SeriesGrid } from "@/components/products/SeriesGrid"
import { CategoryNav } from "@/components/collections/CategoryNav"
// Assuming BreadcrumbSchema and OrganizationSchema are distinct components or handled by structured-data.tsx
// If these paths are incorrect, they will need adjustment based on your actual SEO component structure.
import { BreadcrumbSchema, OrganizationSchema } from "@/components/seo/structured-data";

interface ProductCategoryPageLayoutProps {
  category: ProductCategory
  seriesData: Record<string, SeriesMetadata>
  pageTitle: string
  pageDescription: string
  breadcrumbItems: Array<{ name: string; item: string }>
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

      <CategoryNav currentCategory={category} />

      <section className="mt-8">
        <SeriesGrid seriesData={seriesData} productType={category} />
      </section>
    </main>
  )
}
