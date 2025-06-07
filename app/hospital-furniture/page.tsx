import { Suspense } from "react";
import { Metadata } from 'next';
import { getSeriesForCategory } from "@/lib/api/products";
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
  // The category key in MOCK_SERIES is 'hospital'
  const seriesData = await getSeriesForCategory("hospital-furniture");

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
        seriesData={seriesData}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbItems={breadcrumbItems}
      />
    </Suspense>
  );
}