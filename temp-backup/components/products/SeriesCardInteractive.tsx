"use client"

import Link from "next/link"
import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SeriesCardStatic } from "./SeriesCardStatic"
import type { SeriesMetadata } from "@/types/collections"

interface SeriesCardInteractiveProps {
  series: SeriesMetadata
  productType: string
  seriesId: string
  className?: string
  style?: React.CSSProperties
}

export function SeriesCardInteractive({ 
  series, 
  productType, 
  seriesId,
  className,
  style
}: SeriesCardInteractiveProps) {
  return (
    <div 
      className={className}
      style={style}
    >
      <div className="group transition-all duration-300 hover:shadow-morphism-lg">
        <SeriesCardStatic series={series} />
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
