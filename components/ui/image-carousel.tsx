"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { OptimizedImage } from "./optimized-image"
import { useCarouselDrag } from "@/hooks/use-carousel-drag"
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0]) // Preload first image

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1
      // Preload next image
      if (!loadedIndices.includes(nextIndex)) {
        setLoadedIndices(prev => [...prev, nextIndex])
      }
      return nextIndex
    })
  }, [images.length, loadedIndices])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const prevIdx = prevIndex === 0 ? images.length - 1 : prevIndex - 1
      // Preload previous image
      if (!loadedIndices.includes(prevIdx)) {
        setLoadedIndices(prev => [...prev, prevIdx])
      }
      return prevIdx
    })
  }, [images.length, loadedIndices])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Drag handlers
  const { isDragging, handlers } = useCarouselDrag({
    onDragLeft: prevSlide,
    onDragRight: nextSlide
  })

  // Preload adjacent images
  useEffect(() => {
    const preloadIndices = [
      currentIndex,
      (currentIndex + 1) % images.length,
      (currentIndex - 1 + images.length) % images.length
    ].filter(idx => !loadedIndices.includes(idx))

    if (preloadIndices.length > 0) {
      setLoadedIndices(prev => [...prev, ...preloadIndices])
    }
  }, [currentIndex, images.length, loadedIndices])

  return (
    <div className={cn("relative select-none", className)}>
      <div 
        className={cn(
          "relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5",
          "backdrop-blur-sm border border-white/20 shadow-xl transition-all duration-300",
          "hover:shadow-2xl hover:border-white/30 hover:from-white/20 hover:to-white/10",
          isDragging && "cursor-grabbing"
        )}
        {...handlers(containerRef)} // Pass the ref to the handlers function
      >      {images.map((image, index) => (
          <div
            key={image.url}
            className={cn(
              "absolute h-full w-full transform transition-transform duration-300 ease-out",
              index === currentIndex ? "translate-x-0" : index < currentIndex ? "-translate-x-full" : "translate-x-full"
            )}
            style={{ aspectRatio }}
          >
            <OptimizedImage
              src={image.url}
              alt={`${title} - Image ${index + 1}`}
              className="object-cover"
              priority={index === 0}
              quality={quality}
              sizes="(min-width: 1024px) 50vw, 100vw"
              aspectRatio={aspectRatio}
              width={image.width}
              height={image.height}
            />
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/30 text-white px-4 py-2 transition-opacity">
              <p className="text-sm font-medium">
                Image {index + 1} of {images.length}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full backdrop-blur-md bg-white/30 border border-white/30 p-2 text-white shadow-lg transition-all hover:bg-white/40 hover:scale-110 active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-red-500" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full backdrop-blur-md bg-white/30 border border-white/30 p-2 text-white shadow-lg transition-all hover:bg-white/40 hover:scale-110 active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-red-500" />
        </button>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="backdrop-blur-sm bg-white/20 border border-white/20 rounded-full px-4 py-2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex 
                ? "bg-red-500 shadow-lg" 
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
        </div>
      </div>
    </div>
  )
}
