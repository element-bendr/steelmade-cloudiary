import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getSeriesById, getAllSeries } from "@/lib/api/collections"
import { getProductsByCategoryAndSeries } from "@/lib/api/products"
import { CollectionDetail } from "@/components/collections/CollectionDetail"
import { CollectionNav } from "@/components/collections/CollectionNav"
import { RelatedCollections } from "@/components/collections/RelatedCollections"
import { Skeleton } from "@/components/ui/skeleton"
import type { ProductCategory } from "@/types/collections"

interface CollectionPageProps {
  params: {
    category: ProductCategory;
    collectionId: string;
  }
}

export async function generateMetadata(
  { params }: CollectionPageProps
): Promise<Metadata> {
  const series = await getSeriesById(params.category, params.collectionId)
  
  if (!series) {
    return {
      title: "Collection Not Found | SteelMade",
      description: "The requested collection could not be found"
    }
  }
  
  return {
    title: `${series.title} Collection | SteelMade ${params.category}`,
    description: series.description,
    openGraph: {
      title: `${series.title} Collection | SteelMade ${params.category}`,
      description: series.description,
      type: "website",
      images: series.imageUrl ? [{ url: series.imageUrl }] : undefined
    }
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const series = await getSeriesById(params.category, params.collectionId)
  
  if (!series) {
    notFound()
  }
  
  const products = await getProductsByCategoryAndSeries(params.category, params.collectionId)
    // Get related collections from same category
  const allSeries = await getAllSeries(params.category)
  const sameCategoryCollections = Object.entries(allSeries)
    .filter(([id]) => id !== params.collectionId)
    .slice(0, 2)
    .map(([collectionId, data]) => ({ 
      id: collectionId, 
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || '',
      category: params.category,
      productCount: 8 // Placeholder count, would come from actual data
    }))
  
  // Get collections from other categories
  const otherCategories = ['chairs', 'desks', 'storage', 'school', 'hospital']
    .filter(cat => cat !== params.category) as ProductCategory[]
  
  // Get one collection from each of 2 random other categories
  const randomCategories = otherCategories
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    const otherCategoryCollections = await Promise.all(
    randomCategories.map(async (category) => {
      const categorySeries = await getAllSeries(category)
      const randomSeriesEntry = Object.entries(categorySeries)[0]
      if (!randomSeriesEntry) return null
      
      const [collectionId, data] = randomSeriesEntry
      return { 
        id: collectionId, 
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl || '',
        category,
        productCount: 8 // Placeholder count
      }
    })
  ).then(results => results.filter(Boolean) as any[])
  
  // Combine related collections
  const relatedCollections = [...sameCategoryCollections, ...otherCategoryCollections]

  return (
    <>
      <CollectionNav currentCategory={params.category} />
      <main className="container py-12">
        <Suspense fallback={<Skeleton className="h-[500px]" />}>
          <CollectionDetail 
            series={series}
            seriesId={params.collectionId}
            category={params.category}
            initialProducts={products}
          />
        </Suspense>
        
        {relatedCollections.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Collections</h2>
            <Suspense fallback={<Skeleton className="h-[300px]" />}>
              <RelatedCollections collections={relatedCollections} />
            </Suspense>
          </section>
        )}
      </main>
    </>
  )
}