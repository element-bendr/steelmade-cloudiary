import { Metadata } from "next"
import { notFound } from "next/navigation"
import { default as ProductSeriesPage } from "@/components/products/ProductSeriesPage"
import { getSeriesById, getRelatedSeries, getAllSeries, getRevalidateTime } from "@/lib/services/product-service"
import { getImageUrl } from "@/lib/utils/image-utils"
import type { ExtendedProductData } from '@/lib/data/product-types';

interface DeskSeriesPageProps {
  params: {
    seriesId: string
  }
}

export async function generateMetadata({ params }: DeskSeriesPageProps): Promise<Metadata> {
  const series = await getSeriesById("desks", params.seriesId)
  if (!series) return {}

  const title = `${series.title} | Office Desks | SteelMade`
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
      canonical: `https://steelmade.com/desks/${params.seriesId}`,
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

export default async function DeskSeriesPage({ params }: DeskSeriesPageProps) {
  const series = await getSeriesById("desks", params.seriesId)

  if (!series) notFound()

  const products: ExtendedProductData[] = []

  return (
    <ProductSeriesPage
      series={series}
      category="desks"
      seriesId={params.seriesId}
      products={products}
    />
  )
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries("desks")
  return Object.keys(allSeries).map((seriesId) => ({
    seriesId,
  }))
}

export const revalidate = getRevalidateTime()
