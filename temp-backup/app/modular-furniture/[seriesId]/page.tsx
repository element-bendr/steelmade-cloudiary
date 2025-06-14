// app/modular-furniture/[seriesId]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductSeriesPage from "@/components/products/ProductSeriesPage";
import { getSeriesById, getAllSeries, getRevalidateTime, getSeriesProducts } from "@/lib/services/product-service";
import { getImageUrl } from "@/lib/utils/image-utils";

interface ModularFurnitureSeriesPageProps {
  params: {
    seriesId: string;
  };
}

export const revalidate = getRevalidateTime();

export async function generateMetadata({ params }: ModularFurnitureSeriesPageProps): Promise<Metadata> {
  const series = await getSeriesById("modular-furniture", params.seriesId);
  if (!series) return {};

  const title = `${series.title} | Modular Furniture | SteelMade`;
  const description = series.seoDescription;
  const imageUrl = getImageUrl(series.coverImage);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://steelmade.com/modular-furniture/${params.seriesId}`,
    },
  };
}

export default async function ModularFurnitureSeriesPage({ params }: ModularFurnitureSeriesPageProps) {
  const series = await getSeriesById("modular-furniture", params.seriesId);

  if (!series) {
    notFound();
  }

  const products = await getSeriesProducts("modular-furniture", params.seriesId);
  const productList = products ? Object.values(products) : [];

  return (
    <ProductSeriesPage
      series={series}
      products={productList}
      category="modular-furniture"
      seriesId={params.seriesId}
    />
  );
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries("modular-furniture");
  return Object.keys(allSeries).map((seriesId) => ({
    seriesId,
  }));
}
