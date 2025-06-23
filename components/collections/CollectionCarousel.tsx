"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSwipeable } from "react-swipeable"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ViewMoreSlide } from "./ViewMoreSlide"
import type { ExtendedProductData } from '../../lib/data/product-types';
import type { ProductCategorySlug } from "@/types/product-categories"
import { useCarouselDrag } from "@/hooks/use-carousel-drag"

interface CollectionCarouselProps {
  title: string
  products: ExtendedProductData[]
  productCategory: ProductCategorySlug
  className?: string
}

export function CollectionCarousel({ 
  title, 
  products, 
  productCategory,
  className 
}: CollectionCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { dragProps } = useCarouselDrag({ ref: carouselRef, onScroll: setScrollPosition })
  
  const canScrollLeft = scrollPosition > 0
  const canScrollRight = carouselRef.current
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
    : false
  
  const scrollLeft = () => {
    if (!carouselRef.current) return
    const newPosition = Math.max(
      scrollPosition - carouselRef.current.clientWidth / 2,
      0
    )
    carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
    setScrollPosition(newPosition)
  }
  
  const scrollRight = () => {
    if (!carouselRef.current) return
    const newPosition = Math.min(
      scrollPosition + carouselRef.current.clientWidth / 2,
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    )
    carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
    setScrollPosition(newPosition)
  }

  if (!products.length) {
    return null
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        {...dragProps}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[260px] md:min-w-[300px] w-[260px] md:w-[300px] flex-shrink-0 snap-start"
          >
            <Link href={`/${productCategory}/${product.seriesId}/${product.id}`} className="group">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 260px, 300px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">No image</p>
                  </div>
                )}
              </div>
              <h3 className="font-medium">{product.name}</h3>
              {product.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {product.description}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
