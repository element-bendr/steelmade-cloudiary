import { Metadata } from "next"
import { notFound } from "next/navigation"
import { default as ProductSeriesPage } from "@/components/products/ProductSeriesPage"
import { getSeriesById, getAllSeries, getRevalidateTime, getSeriesProducts } from "@/lib/services/product-service"
import { getImageUrl } from "@/lib/utils/image-utils"

// Route segment config for performance optimization
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 3600 // Revalidate at most every hour

interface ChairSeriesPageProps {
  params: {
    seriesId: string
  }
}

export async function generateMetadata({ params }: ChairSeriesPageProps): Promise<Metadata> {
  const series = await getSeriesById("chairs", params.seriesId)
  if (!series) return {}

  const title = `${series.title} | Office Chairs | SteelMade`
  const description = series.seoDescription
  const imageUrl = getImageUrl(series.coverImage)

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
      canonical: `https://steelmade.com/chairs/${params.seriesId}`,
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

export default async function ChairSeriesPage({ params }: ChairSeriesPageProps) {
  console.log("[ChairSeriesPage] params.seriesId:", params.seriesId); // Log received seriesId
  const series = await getSeriesById("chairs", params.seriesId)
  
  if (!series) {
    console.error("[ChairSeriesPage] Series not found for id:", params.seriesId); // Log if series is not found
    notFound()
  }

  const seriesProducts = await getSeriesProducts("chairs", params.seriesId)

  // Ensure products is an array, even if it's null or undefined
  const productList = seriesProducts ? Object.values(seriesProducts) : [];

  return (
    <ProductSeriesPage
      series={series}
      products={productList} // Pass the fetched products
      category="chairs" // Pass the category
      seriesId={params.seriesId} // Pass the seriesId
    />
  )
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries("chairs")
  console.log("All series in generateStaticParams:", allSeries); // Added for debugging
  return Object.keys(allSeries).map((seriesId) => ({
    seriesId,
  }))
}
