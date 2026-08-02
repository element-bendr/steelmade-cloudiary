"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ExtendedProductData } from '../../lib/data/product-types';
import Link from "next/link"
import Image from "next/image"
import { QuickVariantChips } from "./QuickVariantChips";

interface ProductGridProps {
  products: ExtendedProductData[]
  productsPerPage?: number;
  category?: string;
  seriesId?: string;
}

export function ProductGrid({ products, productsPerPage = 8, category, seriesId }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const restorePaginationTopRef = useRef<number | null>(null);
  const totalPages = Math.ceil(products.length / productsPerPage)
  
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = products.slice(startIndex, endIndex)
  
  useLayoutEffect(() => {
    if (restorePaginationTopRef.current === null) return;
    if (!paginationRef.current) {
      restorePaginationTopRef.current = null;
      return;
    }
    const currentTop = paginationRef.current.getBoundingClientRect().top;
    const delta = restorePaginationTopRef.current - currentTop;
    if (Math.abs(delta) > 1) {
      window.scrollBy({ top: delta, behavior: "auto" });
    }
    restorePaginationTopRef.current = null;
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      restorePaginationTopRef.current = paginationRef.current?.getBoundingClientRect().top ?? null;
      setCurrentPage(currentPage + 1)
    }
  }
  
  const prevPage = () => {
    if (currentPage > 1) {
      restorePaginationTopRef.current = paginationRef.current?.getBoundingClientRect().top ?? null;
      setCurrentPage(currentPage - 1)
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
    <div className="space-y-8" data-testid="product-grid">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="product-grid-cards">
        {currentProducts.map((product: any) => (
          <div
            key={product.id}
            className="rounded-lg overflow-hidden transition-shadow hover:border hover:border-accent bg-white"
            data-testid="product-card"
            data-product-name={product.name}
            data-product-id={product.id}
          >
            <Link href={`/${category || product.category}/${seriesId || product.seriesId}/${product.id}`}> 
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
                  <QuickVariantChips variants={product.variants} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8" data-testid="product-grid-pagination" ref={paginationRef}>
          <Button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            variant="outline"
            className="flex items-center gap-2"
            data-testid="product-grid-prev"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          
          <div className="text-muted-foreground" data-testid="product-grid-page-status">
            Page {currentPage} of {totalPages}
          </div>
          
          <Button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            variant="outline"
            className="flex items-center gap-2"
            data-testid="product-grid-next"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
