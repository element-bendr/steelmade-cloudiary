import type { Metadata } from "next";
import { productCategoryDisplayNames } from "@/lib/navigation"; // Changed import
import type { ProductCategory } from "@/types/collections";

interface SeoMetadata {
  title?: string;
  description?: string;
  image?: string;
  category?: ProductCategory;
  type?: "product" | "collection" | "page"; // User-defined types
  canonical?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  image,
  category, // This is a ProductType slug, e.g., "storage-solutions"
  type = "page", // Default to 'page'
  canonical,
  noIndex
}: SeoMetadata): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://steelmade.com";
  // Use productCategoryDisplayNames to get the display name from the category slug
  const categoryName = category ? productCategoryDisplayNames[category] : undefined; 
  const fullTitle = categoryName 
    ? `${title} - ${categoryName} | SteelMade`
    : `${title} | SteelMade`;

  // Map custom types to valid OpenGraph types
  let ogType: "website" | "article" = "website"; // Default OG type
  if (type === "product") {
    ogType = "article"; // Or a more specific product OG type if available/applicable
  } else if (type === "collection") {
    ogType = "website"; // Or 'object' or another suitable type
  }

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: ogType, // Use the mapped OpenGraph type
      images: image ? [{ url: image }] : undefined,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : baseUrl,
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow"
  };
}