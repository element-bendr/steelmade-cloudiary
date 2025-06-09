"use client"

import { useProducts } from "@/hooks/use-products"
import { CollectionCarousel } from "./CollectionCarousel"
import { ProductGrid } from "@/components/products/ProductGrid"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { SeriesMetadata } from "@/types/collections"
import type { ProductData } from "@/types/products"
import { ProductCategorySlug, getCategoryDisplayName } from "@/types/product-categories"

interface CollectionDetailProps {
  series: SeriesMetadata
  seriesId: string
  category: ProductCategorySlug
  initialProducts?: ProductData[]
}

export function CollectionDetail({ 
  series, 
  seriesId,
  category,
  initialProducts = []
}: CollectionDetailProps) {
  const { products, isLoading, error, refetch } = useProducts(
    category, 
    seriesId,
    initialProducts
  )
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel')
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <div>{error}</div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-fit flex items-center gap-2" 
            onClick={() => refetch()}
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  
  if (isLoading && initialProducts.length === 0) {
    return <Skeleton className="h-[400px] w-full" />
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        {series.imageUrl && (
          <div className="relative aspect-video w-full md:w-1/3 rounded-lg overflow-hidden">
            <Image
              src={series.imageUrl}
              alt={series.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="md:flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h5 className="text-sm font-medium text-muted-foreground">
              {getCategoryDisplayName(category)}
            </h5>
          </div>
          <h1 className="text-3xl font-bold mb-3">{series.title}</h1>
          <p className="text-muted-foreground mb-4">{series.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/${category}/${seriesId}/configure`}>
                Configure
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/contact?collection=${seriesId}`}>
                Request Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {viewMode === 'carousel' ? (
        <CollectionCarousel 
          title="Featured Products" 
          products={products} 
          productCategory={category} 
        />
      ) : (
        <ProductGrid products={products} />
      )}
      
      {series.features && series.features.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            {series.features.map((feature, index) => (
              <li key={index} className="text-muted-foreground">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {series.specifications && Object.keys(series.specifications).length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {Object.entries(series.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <dt className="font-medium">{key}</dt>
                <dd className="text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}