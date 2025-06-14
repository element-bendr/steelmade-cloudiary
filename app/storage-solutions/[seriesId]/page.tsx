import { Metadata } from "next"
import { notFound } from "next/navigation"
import { default as ProductSeriesPage } from "@/components/products/ProductSeriesPage"
import { getSeriesById, getRelatedSeries, getAllSeries, getRevalidateTime, getSeriesProducts } from "@/lib/services/product-service"
import { getImageUrl } from "@/lib/utils/image-utils"

interface StorageSeriesPageProps {
  params: {
    seriesId: string
  }
}

export async function generateMetadata({ params }: StorageSeriesPageProps): Promise<Metadata> {
  const series = await getSeriesById("storage-solutions", params.seriesId) // Updated category
  if (!series) return {}

  const title = `${series.title} | Office Storage | SteelMade`
  const description = series.seoDescription
  const imageUrl = getImageUrl(series.coverImage)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: series.title,
        }
      ],
      locale: "en_US",
      siteName: "SteelMade Office Furniture",
      publishedTime: new Date().toISOString(),
      authors: ["SteelMade"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@steelmade",
      site: "@steelmade",
    },
    alternates: {
      canonical: `https://steelmade.com/storage-solutions/${params.seriesId}`, // Updated path
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    }
  }
}

export default async function StorageSeriesPage({ params }: StorageSeriesPageProps) {
  const series = await getSeriesById("storage-solutions", params.seriesId); // Updated category
  // const [series, relatedSeries] = await Promise.all([
  //   getSeriesById("storage-solutions", params.seriesId), // Updated category
  //   getRelatedSeries("storage-solutions", params.seriesId) // Updated category
  // ]);

  if (!series) notFound();

  const products = await getSeriesProducts("storage-solutions", params.seriesId); // Updated category
  const productList = products ? Object.values(products) : [];

  return (
    <ProductSeriesPage
      series={series}
      products={productList} // Pass the fetched products
      category="storage-solutions" // Updated category
      seriesId={params.seriesId} // Pass the seriesId
      // backLink="/storage-solutions" // Updated path
      // backText="Back to Storage Solutions"
      // relatedSeriesData={relatedSeries}
    />
  );
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries("storage-solutions") // Updated category
  return Object.keys(allSeries).map((seriesId) => ({
    seriesId,
  }))
}

export const revalidate = getRevalidateTime()
