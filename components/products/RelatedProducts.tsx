"use client"

import { ProductGrid } from "./ProductGrid"
import { Skeleton } from "@/components/ui/skeleton"
import { useProducts } from "@/hooks/use-products"
import type { ProductData } from "@/types/products"
import type { ProductCategory } from "@/types/collections"

interface RelatedProductsProps {
  currentProductId: string
  category: ProductCategory
  seriesId: string
}

export function RelatedProducts({
  currentProductId,
  category,
  seriesId
}: RelatedProductsProps) {
  const { products, isLoading, error } = useProducts(category, seriesId)
  
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4)

  if (error || relatedProducts.length === 0) return null

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold">Related Products</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={relatedProducts} />
      )}
    </section>
  )
}