"use client"

import { ProductCard } from "./ProductCard"
import type { ExtendedProductData } from '../../lib/data/product-types';
import { cn } from "../../lib/utils"
import Link from "next/link"
import Image from "next/image"

interface FeaturedProductsDisplayProps {
  products: ExtendedProductData[]
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
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-center text-neutral-900">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} href={`/${category}/${seriesId}/${product.id}`} className="group">
            <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform group-hover:scale-[1.03] group-hover:shadow-2xl">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.imageUrl || '/images/placeholder-product.webp'}
                  alt={product.name}
                  fill
                  className="object-contain w-full h-full max-w-full max-h-full"
                  style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                />
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent-light opacity-20 rounded-bl-2xl"></div>
              </div>
              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-accent-dark group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted">
                  {product.description && product.description.length > 60
                    ? `${product.description.substring(0, 60)}...`
                    : product.description}
                </p>
                <button
                  className="mt-3 px-4 py-2 rounded-lg bg-accent-light text-white font-semibold shadow-md hover:bg-accent-dark transition-colors backdrop-blur-sm border border-accent-light/30"
                  type="button"
                  tabIndex={-1}
                  aria-label={`View details for ${product.name}`}
                  style={{ pointerEvents: 'none' }}
                >
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
