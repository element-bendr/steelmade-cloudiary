import { Suspense } from "react";
import { Metadata } from 'next';
import { getSeriesForCategory } from "@/lib/api/products";
import ProductCategoryPageLayout from "@/components/products/ProductCategoryPageLayout";
import { Skeleton } from "@/components/ui/skeleton";

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
  const seriesData = await getSeriesForCategory("school-furniture");

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