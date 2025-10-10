"use client"

import { ProductCard } from "@/components/products/ProductCard"
import type { ProductData } from "@/types/products"
import { cn } from "@/lib/utils"

interface FeaturedProductsDisplayProps {
  products: ProductData[]
  title?: string
  className?: string
  category: string
  seriesId: string
}

export function FeaturedProductsDisplay({ 
  products, 
  title, 
  className, 
  category,
  seriesId
}: FeaturedProductsDisplayProps) {
  if (!products || products.length === 0) {
    return null // Or some placeholder for no products
  }

  return (
    <section className={cn("py-8", className)}>
      {title && (
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-center">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            href={`/${category}/${seriesId}/${product.id}`}
          />
        ))}
      </div>
    </section>
  )
}
