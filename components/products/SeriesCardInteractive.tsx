"use client"

import Link from "next/link"
import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SeriesCardStatic } from "./SeriesCardStatic"
import type { ProductSeries } from "@/lib/data/product-types"

interface SeriesCardInteractiveProps {
  series: ProductSeries
  productType: string
  seriesId: string
  className?: string
  style?: React.CSSProperties
}

// Fix: ProductSeries.title is string | undefined, but SeriesCardStatic expects string. Provide fallback.
export function SeriesCardInteractive({ 
  series, 
  productType, 
  seriesId,
  className,
  style
}: SeriesCardInteractiveProps) {
  const safeSeries = { ...series, title: series.title ?? series.id };
  return (
    <div 
      className={className}
      style={style}
    >
      <div className="group transition-all duration-300 hover:shadow-morphism-lg">
        <SeriesCardStatic series={safeSeries} />
        <CardFooter className="bg-white">
          <Link href={`/${productType}/${seriesId}`} className="w-full">
            <Button className="morphism-button w-full gap-2 transition-all duration-300 hover:shadow-morphism-lg hover:bg-accent-light">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </div>
    </div>
  )
}
