import { Metadata } from "next"
import { notFound } from "next/navigation"
import { default as ProductSeriesPage } from "../../../components/products/ProductSeriesPage"
import { getSeriesById, getAllSeries } from "../../../lib/services/product-service"
import { getImageUrl } from "../../../lib/utils/image-utils"
import { client } from "../../../lib/sanity.client"
import { productsBySeriesQuery } from "../../../lib/sanity.queries"

// Route segment config for performance optimization
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 60 // Revalidate every minute to sync with Sanity

interface ChairSeriesPageProps {
  params: {
    seriesId: string
  }
}

export async function generateMetadata({ params }: ChairSeriesPageProps): Promise<Metadata> {
  const series = await getSeriesById("chairs", params.seriesId)
  if (!series) return {}

  const title = `${series.title} | Office Chairs | SteelMade`
  const description = series.description
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
  }
}

export default async function ChairSeriesPage({ params }: ChairSeriesPageProps) {
  const series = await getSeriesById("chairs", params.seriesId)
  
  if (!series) {
    notFound()
  }

  // Swap out logical static pull for Sanity pull!
  const productList = await client.fetch(productsBySeriesQuery, { 
    category: 'chairs', 
    seriesTitle: series.title,
    seriesId: params.seriesId 
  });

  return (
    <ProductSeriesPage
      series={series}
      products={productList} // Pass the Sanity products!
      category="chairs" // Pass the category
      seriesId={params.seriesId} // Pass the seriesId
    />
  )
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries("chairs")
  return Object.keys(allSeries).map((seriesId) => ({
    seriesId,
  }))
}
