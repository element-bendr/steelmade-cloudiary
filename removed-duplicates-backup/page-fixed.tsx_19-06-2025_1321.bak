import { Metadata } from "next"
import { notFound } from "next/navigation"
import { default as ProductSeriesPage } from "@/components/products/ProductSeriesPage"
import { getSeriesById, getRelatedSeries, getAllSeries, getRevalidateTime, ProductData } from "@/lib/services/product-service"

interface StorageSeriesPageProps {
  params: {
    seriesId: string
  }
}

export async function generateMetadata({ params }: StorageSeriesPageProps): Promise<Metadata> {
  const series = await getSeriesById("storage-solutions", params.seriesId)
  if (!series) return {}

  const title = `${series.title} | Office Storage Solutions | SteelMade`
  const description = series.seoDescription

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
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
      publishedTime: new Date().toISOString(),
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
      canonical: `https://steelmade.com/storage/${params.seriesId}`,
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
  const [series, relatedSeries] = await Promise.all([
    getSeriesById("storage-solutions", params.seriesId),
    getRelatedSeries("storage-solutions", params.seriesId)
  ])

  if (!series) notFound()

  // Placeholder for actual products fetching logic
  const products: ProductData[] = [] // TODO: Implement actual data fetching for products in this series

  return (
    <ProductSeriesPage
      series={series}
      products={products} // Provide an empty array or fetched products
      category="storage-solutions"
      seriesId={params.seriesId}
    />
  )
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries("storage-solutions")
  return Object.keys(allSeries).map((seriesId) => ({
    seriesId,
  }))
}

export const revalidate = getRevalidateTime()
