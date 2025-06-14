import { Metadata } from "next"
import { notFound } from "next/navigation"
import { default as ProductSeriesPage } from "@/components/products/ProductSeriesPage"
import { getSeriesById, getRelatedSeries, getAllSeries, getRevalidateTime } from "@/lib/services/product-service"
import type { ProductData } from "@/types/products"; // Added import for ProductData

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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article", // Changed from "product" to "article" as Next.js Metadata doesn't support "product" type
      images: [
        {
          url: series.coverImage.url,
          width: series.coverImage.width,
          height: series.coverImage.height,
          alt: series.title,
        }
      ],
      locale: "en_US",
      siteName: "SteelMade Office Furniture",
      publishedTime: new Date().toISOString(), // Added since we're using article type
      authors: ["SteelMade"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [series.coverImage.url],
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
  const [series] = await Promise.all([
    getSeriesById("chairs", params.seriesId)
  ])

  if (!series) notFound()

  // TODO: Fetch actual products for the series
  const products: ProductData[] = []; // Placeholder for products

  return (
    <ProductSeriesPage
      series={series}
      category="chairs" // Changed from productType to category
      seriesId={params.seriesId} // Added seriesId
      products={products} // Added products array
    />
  )
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries("chairs")
  return Object.keys(allSeries).map((seriesId) => ({
    seriesId,
  }))
}

export const revalidate = getRevalidateTime()
