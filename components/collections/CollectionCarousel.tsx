"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSwipeable } from "react-swipeable"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ViewMoreSlide } from "./ViewMoreSlide"
import type { ProductData } from "@/types/products"
import type { ProductCategory } from "@/types/collections"

interface CollectionCarouselProps {
  title: string
  products: ProductData[]
  productCategory: ProductCategory
  className?: string
}

export function CollectionCarousel({ 
  title, 
  products, 
  productCategory,
  className 
}: CollectionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  })
  
  const nextSlide = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const maxIndex = products.length > 4 ? 4 : products.length - 1
    setCurrentIndex(current => current >= maxIndex ? 0 : current + 1)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 300) // Match transition duration
  }
  
  const prevSlide = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const maxIndex = products.length > 4 ? 4 : products.length - 1
    setCurrentIndex(current => current <= 0 ? maxIndex : current - 1)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 300) // Match transition duration
  }
  
  // Reset index when products change
  useEffect(() => {
    setCurrentIndex(0)
  }, [products])
  
  // Get collection ID from the first product
  const collectionId = products[0]?.seriesId || "designer-series"
  
  return (
    <div className={cn("relative select-none", className)}>
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-background shadow-sm">
        <div 
          {...swipeHandlers} // Spread all handlers, including the ref from useSwipeable
          className="relative h-full w-full" 
        >
          {/* Render products */}
          {products.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "absolute h-full w-full p-6 transform transition-transform duration-300 ease-out",
                index === currentIndex ? "translate-x-0" : index < currentIndex ? "-translate-x-full" : "translate-x-full"
              )}
            >
              <Link 
                href={`/${product.category}/${product.seriesId}/${product.id}`}
                className="group flex h-full flex-col"
              >
                <div className="relative flex-grow">
                  <div className="absolute inset-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={product.imageUrl || "/images/chairs/designer-series/placeholder.jpg"} // Updated primary fallback
                      alt={product.name || "Product image"}
                      fill
                      priority={index === 0}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        // Fallback to a different placeholder if the primary fails
                        e.currentTarget.srcset = '/images/placeholder-alt.png'; // Ensure this alt placeholder exists
                        e.currentTarget.src = '/images/placeholder-alt.png';
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-col">
                  <h4 className="text-lg font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <p className="mt-2 text-lg font-semibold">
                    {product.price ? `$${Number(product.price).toFixed(2)}` : "Contact for Price"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
          
          {/* Add View More slide that appears as the 5th slide */}
          {products.length > 4 && (
            <ViewMoreSlide 
              collectionId={collectionId}
              productCategory={productCategory}
              isVisible={currentIndex === 4}
            />
          )}
        </div>
        
        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background focus:outline-none"
          aria-label="Previous product"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background focus:outline-none"
          aria-label="Next product"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Dots pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: products.length > 4 ? 5 : products.length }).map((_, i) => (
          <Button
            key={i}
            variant={i === currentIndex ? "default" : "outline"}
            size="icon"
            className="h-8 w-8 rounded-full data-[current=true]:bg-primary data-[current=true]:text-primary-foreground"
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            data-current={i === currentIndex}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
