// app/modular-furniture/page.tsx
import { Metadata } from "next";
import ProductCategoryPageLayout from "@/components/products/ProductCategoryPageLayout";
import { getCategoryData, getRevalidateTime } from "@/lib/services/product-service";
import { getImageUrl } from "@/lib/utils/image-utils";

export const revalidate = getRevalidateTime();

export async function generateMetadata(): Promise<Metadata> {
  const category = await getCategoryData("modular-furniture");
  if (!category) return {};

  const title = category.title || "Modular Furniture | SteelMade";
  const description = category.seoDescription || "Explore our versatile modular furniture solutions.";
  const imageUrl = category.coverImage ? getImageUrl(category.coverImage) : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `https://steelmade.com/modular-furniture`,
    },
  };
}

export default async function ModularFurniturePage() {
  const categoryData = await getCategoryData("modular-furniture");

  if (!categoryData) {
    return <div>Modular furniture category not found.</div>;
  }

  const seriesData = (categoryData.series || []).reduce((acc: Record<string, import("@/types/collections").SeriesMetadata>, series: import("@/types/collections").SeriesMetadata) => {
    acc[series.id] = { ...series, features: series.features || [] }; // Ensure features is an array
    return acc;
  }, {} as Record<string, import("@/types/collections").SeriesMetadata>);

  const pageTitle = categoryData.title || "Modular Furniture";
  const pageDescription = categoryData.seoDescription || "Explore our versatile modular furniture solutions.";
  const breadcrumbItems = [
    { name: "Home", item: "https://steelmade.com" },
    { name: pageTitle, item: `https://steelmade.com/modular-furniture` },
  ];

  return (
    <ProductCategoryPageLayout
      category={categoryData}
      seriesData={seriesData}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
