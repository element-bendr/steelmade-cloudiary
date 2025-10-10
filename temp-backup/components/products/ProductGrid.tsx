"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/products/ProductCard"
import type { ProductData } from "@/types/products"

interface ProductGridProps {
  products: ProductData[]
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
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            href={`/${product.category}/${product.seriesId}/${product.id}`}
          />
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