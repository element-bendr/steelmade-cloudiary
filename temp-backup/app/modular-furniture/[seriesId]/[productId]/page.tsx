// app/modular-furniture/[seriesId]/[productId]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageLayout from "@/components/products/ProductPageLayout";
import { getProductDetails, getRevalidateTime, getAllProductsInCategory } from "@/lib/services/product-service";
import { getImageUrl } from "@/lib/utils/image-utils";
import type { SeriesMetadata, ProductCategory } from "@/types/collections"; // Added import
import type { ProductData } from "@/types/products"; // Added import

interface ModularFurnitureProductPageProps {
  params: {
    seriesId: string;
    productId: string;
  };
}

export const revalidate = getRevalidateTime();

export async function generateMetadata({ params }: ModularFurnitureProductPageProps): Promise<Metadata> {
  const { productId, seriesId } = params;
  const product = await getProductDetails("modular-furniture", seriesId, productId);

  if (!product) {
    return notFound();
  }

  const mainImage = product.imageUrl ? getImageUrl(product.imageUrl) : "/images/placeholder/product-fallback.jpg";

  return {
    title: `${product.name} | Modular Furniture | Steelmade`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [mainImage],
      type: "article",
    },
    alternates: {
      canonical: `/modular-furniture/${seriesId}/${productId}`,
    },
  };
}

export default async function ProductPage({ params }: ModularFurnitureProductPageProps) {
  const { productId, seriesId } = params;
  const product = await getProductDetails("modular-furniture", seriesId, productId);

  if (!product) {
    notFound();
  }

  // TODO: Replace with actual series data fetching for SeriesMetadata
  const MOCK_SERIES_DATA: SeriesMetadata = {
    id: seriesId,
    title: seriesId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Example
    description: `Details about ${seriesId.replace(/-/g, ' ')} series.`, // Example
    seoDescription: `SEO description for ${seriesId.replace(/-/g, ' ')}.`, // Example
    features: ["Feature 1", "Feature 2"], // Example
    lastModified: new Date().toISOString(), // Example
    products: {}, // Example - normally populated with products of this series
    category: "Modular Furniture" as ProductCategory,
    coverImage: { url: "/images/placeholder/series-hero-modular-office.jpg", alt: "Modular Office Series", width: 1200, height: 800 }, // Added width and height
    images: [{ url: "/images/placeholder/series-thumb-modular-office.jpg", alt: "Modular Office Thumbnail", width: 400, height: 300 }], // Added width and height
    // Add other required fields for SeriesMetadata if any, e.g. imageUrl, specifications, tags
  };

  return (
    <ProductPageLayout
      product={product}
      category={"modular-furniture" as ProductCategory}
      series={MOCK_SERIES_DATA}
    />
  );
}

export async function generateStaticParams() {
  const products = await getAllProductsInCategory("modular-furniture");
  return products.map((product) => ({
    seriesId: product.seriesId,
    productId: product.id,
  }));
}
