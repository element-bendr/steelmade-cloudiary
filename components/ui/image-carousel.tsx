"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { OptimizedImage } from "./optimized-image"
import { ImageAsset } from "@/types/image-types"

interface ImageCarouselProps {
  images: ImageAsset[]
  title: string
  className?: string
  aspectRatio?: string
  quality?: number
}

export function ImageCarousel({ 
  images, 
  title, 
  className,
  aspectRatio = "4/3",
  quality = 85
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * index
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
    setCurrentIndex(index)
  }, [])

  const nextSlide = useCallback(() => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    scrollToIndex(nextIndex)
  }, [currentIndex, images.length, scrollToIndex])

  const prevSlide = useCallback(() => {
    const prevIdx = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    scrollToIndex(prevIdx)
  }, [currentIndex, images.length, scrollToIndex])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft
      const width = container.clientWidth
      const newIndex = Math.round(scrollPosition / width)
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  return (
    <div className={cn("relative select-none", className)}>
      <div 
        ref={scrollContainerRef}
        className={cn(
          "relative flex w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar border border-border bg-card rounded-[2px]",
        )}
        style={{ aspectRatio }}
      >
        {images.map((image, index) => (
          <div
            key={image.url}
            className="w-full h-full shrink-0 snap-center relative flex items-center justify-center p-8 bg-muted"
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <OptimizedImage
                src={image.url}
                alt={`${title} - Image ${index + 1}`}
                className="object-contain max-h-full max-w-full p-4"
                priority={index === 0}
                quality={quality}
                sizes="(min-width: 1024px) 50vw, 100vw"
                aspectRatio={aspectRatio}
                width={image.width}
                height={image.height}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-[2px] bg-background border border-border p-2 text-foreground shadow-sm transition-all hover:bg-muted hover:text-accent active:scale-95"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-[2px] bg-background border border-border p-2 text-foreground shadow-sm transition-all hover:bg-muted hover:text-accent active:scale-95"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground w-full">
         <span>{currentIndex + 1} / {images.length}</span>
         <div className="flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "h-1.5 transition-all rounded-[1px]",
                index === currentIndex 
                  ? "w-6 bg-foreground" 
                  : "w-2 bg-border hover:bg-muted-foreground"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
