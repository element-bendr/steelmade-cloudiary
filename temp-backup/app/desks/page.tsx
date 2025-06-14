import { Suspense } from "react";
import { Metadata } from "next";
import { getSeriesForCategory } from "@/lib/api/products";
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
  const seriesData = await getSeriesForCategory("desks");

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
        seriesData={seriesData}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        breadcrumbItems={breadcrumbItems}
      />
    </Suspense>
  );
}
