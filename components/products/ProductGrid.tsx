"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ExtendedProductData } from '../../lib/data/product-types';
import Link from "next/link"
import Image from "next/image"

interface ProductGridProps {
  products: ExtendedProductData[]
  productsPerPage?: number
}

export function ProductGrid({ products, productsPerPage = 8 }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(products.length / productsPerPage)
  
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = products.slice(startIndex, endIndex)
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          No products are currently available in this collection.
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product: ExtendedProductData) => (
          <div key={product.id} className="rounded-lg overflow-hidden transition-shadow hover:border hover:border-accent bg-white">
            <Link href={`/${product.category}/${product.seriesId}/${product.id}`}> 
              <div className="group">
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100 flex items-center justify-center">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-accent transition-colors mb-1">{product.name}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-2">{product.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <Button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          
          <div className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          
          <Button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            variant="outline"
            className="flex items-center gap-2"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}