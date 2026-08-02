"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductCategory } from "@/types/collections"

interface ViewMoreSlideProps {
  collectionId: string
  productCategory: ProductCategory
  isVisible: boolean
  className?: string
}

export function ViewMoreSlide({ 
  collectionId, 
  productCategory,
  isVisible, 
  className 
}: ViewMoreSlideProps) {
  return (
    <div
      className={cn(
        "absolute h-full w-full p-6 transform transition-transform duration-300 ease-out",
        isVisible ? "translate-x-0" : "translate-x-full",
        "bg-gradient-to-br from-accent/10 to-accent/30",
        className
      )}
    >
      <Link 
        href={`/collections/${productCategory}/${collectionId}`}
        className="h-full w-full flex flex-col items-center justify-center"
      >
        <div className="text-center p-8 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 shadow-sm">
          <h3 className="text-2xl font-bold mb-4">View Full Collection</h3>
          <p className="mb-6 text-muted-foreground">
            Explore all products in this {productCategory} series
          </p>
          <Button className="gap-2">
            View Collection 
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Link>
    </div>
  )
}