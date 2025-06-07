import { Suspense } from "react";
import { Metadata } from "next";
import { getSeriesForCategory } from "@/lib/api/products";
import ProductCategoryPageLayout from "@/components/products/ProductCategoryPageLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Storage Solutions",
  description: "Optimize your space with our versatile and durable steel storage solutions. From cabinets to shelving, find the perfect fit for your needs.",
  openGraph: {
    title: "Storage Solutions | SteelMade",
    description: "Optimize your space with our versatile and durable steel storage solutions.",
    images: [
      {
        url: "/images/storage-solutions/collection-cover.jpg",
        width: 1200,
        height: 630,
        alt: "SteelMade Storage Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Storage Solutions | SteelMade",
    description: "Optimize your space with our versatile and durable steel storage solutions.",
    images: ["/images/storage-solutions/collection-cover.jpg"],
  },
  alternates: {
    canonical: "/storage-solutions",
  },
};

export default async function StoragePage() {
  const seriesData = await getSeriesForCategory("storage-solutions");

  const pageTitle = "Storage Solutions";
  const pageDescription = "Optimize your space with our versatile and durable steel storage solutions. From cabinets to shelving, find the perfect fit for your needs.";
  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "Storage Solutions", item: "/storage-solutions" }
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
        category="storage-solutions"
        seriesData={seriesData}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbItems={breadcrumbItems}
      />
    </Suspense>
  );
}
