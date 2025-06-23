// app/modular-furniture/[seriesId]/[productId]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageLayout from "@/components/products/ProductPageLayout";
import { getProductDetails, getRevalidateTime, getAllProductsInCategory } from "@/lib/services/product-service";
import { getImageUrl } from "@/lib/utils/image-utils";
import type { SeriesMetadata, ProductCategory } from "@/types/collections";
import type { ExtendedProductData } from "@/lib/data/product-types";

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
    lastModified: new Date().toISOString(), // Always string for compatibility
    products: {}, // Example - normally populated with products of this series
    category: "Modular Furniture" as ProductCategory,
    coverImage: { url: "/images/placeholder/series-hero-modular-office.jpg", alt: "Modular Office Series", width: 1200, height: 800 }, // Added width and height
    images: [{ url: "/images/placeholder/series-thumb-modular-office.jpg", alt: "Modular Office Thumbnail", width: 400, height: 300 }], // Added width and height
    // Add other required fields for SeriesMetadata if any, e.g. imageUrl, specifications, tags
  };

  // Map SeriesMetadata to ProductSeries for compatibility
  const mapSeriesMetadataToProductSeries = (series: SeriesMetadata): import("@/lib/data/product-types").ProductSeries => ({
    id: series.id,
    title: series.title,
    description: series.description,
    seoDescription: series.seoDescription,
    category: typeof series.category === 'string' ? series.category : undefined,
    imageUrl: series.imageUrl,
    coverImage: series.coverImage,
    images: series.images,
    features: series.features,
    lastModified: typeof series.lastModified === 'string' ? series.lastModified : (series.lastModified instanceof Date ? series.lastModified.toISOString() : undefined),
    products: series.products,
  });

  return (
    <ProductPageLayout
      product={product}
      category={"modular-furniture" as ProductCategory}
      series={mapSeriesMetadataToProductSeries(MOCK_SERIES_DATA)}
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
