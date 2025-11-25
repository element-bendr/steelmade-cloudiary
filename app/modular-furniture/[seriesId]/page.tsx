// app/modular-furniture/[seriesId]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductSeriesPage from '@/components/products/ProductSeriesPage'
import { getSeriesById, getAllSeries, getRevalidateTime, getSeriesProducts } from '@/lib/services/product-service'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = getRevalidateTime()

interface ModularFurnitureSeriesPageProps {
  params: {
    seriesId: string
  }
}

export async function generateMetadata({ params }: ModularFurnitureSeriesPageProps): Promise<Metadata> {
  const series = await getSeriesById('modular-furniture', params.seriesId)
  if (!series) return {}

  const title = `${series.title} | Modular Furniture | SteelMade`
  const description = series.description

  return {
    title,
    description,
    alternates: {
      canonical: `https://steelmade.com/modular-furniture/${params.seriesId}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function ModularFurnitureSeriesPage({ params }: ModularFurnitureSeriesPageProps) {
  const series = await getSeriesById('modular-furniture', params.seriesId)
  if (!series) return notFound()

  const seriesProducts = await getSeriesProducts('modular-furniture', params.seriesId)
  // Annotate products with category and seriesId so client components
  // (which build URLs using `product.category` and `product.seriesId`) have the fields they expect.
  const productList = seriesProducts
    ? Object.values(seriesProducts).map((p) => ({ ...(p as any), category: 'modular-furniture', seriesId: params.seriesId }))
    : []

  return (
    <ProductSeriesPage
      series={series}
      products={productList}
      category="modular-furniture"
      seriesId={params.seriesId}
    />
  )
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries('modular-furniture')
  return Object.keys(allSeries || {}).map((seriesId) => ({ seriesId }))
}
