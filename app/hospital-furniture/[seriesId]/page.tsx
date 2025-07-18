import { Metadata } from "next"
import { notFound } from "next/navigation"
import { default as ProductSeriesPage } from "@/components/products/ProductSeriesPage"
import { getSeriesById, getAllSeries, getRevalidateTime, getSeriesProducts } from "@/lib/services/product-service"
import { getImageUrl } from "@/lib/utils/image-utils"

interface HospitalFurnitureSeriesPageProps {
  params: {
    seriesId: string
  }
}

export async function generateMetadata({ params }: HospitalFurnitureSeriesPageProps): Promise<Metadata> {
  const series = await getSeriesById("hospital-furniture", params.seriesId)
  if (!series) return {}

  const title = `${series.title} | Hospital Furniture | SteelMade`
  const description = series.seoDescription
  // Defensive mapping: convert ProductImage to ImageAsset for getImageUrl
  const imageUrl = getImageUrl(
    series.coverImage
      ? {
          url: series.coverImage.url,
          alt: series.coverImage.alt,
          width: series.coverImage.width ?? 0,
          height: series.coverImage.height ?? 0,
        }
      : undefined
  )

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [imageUrl],
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
      canonical: `https://steelmade.com/hospital-furniture/${params.seriesId}`,
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

export default async function HospitalFurnitureSeriesPage({ params }: HospitalFurnitureSeriesPageProps) {
  console.log("[HospitalFurnitureSeriesPage] params.seriesId:", params.seriesId); // Log received seriesId
  const series = await getSeriesById("hospital-furniture", params.seriesId)
  
  if (!series) {
    console.error("[HospitalFurnitureSeriesPage] Series not found for id:", params.seriesId); // Log if series is not found
    notFound()
  }

  const products = await getSeriesProducts("hospital-furniture", params.seriesId)

  // Ensure products is an array, even if it's null or undefined
  const productList = products ? Object.values(products) : [];

  return (
    <ProductSeriesPage
      series={series}
      products={productList} // Pass the fetched products
      category="hospital-furniture" // Pass the category
      seriesId={params.seriesId} // Pass the seriesId
    />
  )
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries("hospital-furniture")
  console.log("All series in generateStaticParams:", allSeries); // Added for debugging
  return Object.keys(allSeries).map((seriesId) => ({
    seriesId,
  }))
}

export const revalidate = getRevalidateTime()
