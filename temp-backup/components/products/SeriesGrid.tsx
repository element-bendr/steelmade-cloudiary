import { Suspense } from "react"
import { SeriesCardInteractive } from "./SeriesCardInteractive"
import type { SeriesMetadata } from "@/types/collections"

interface SeriesGridProps {
  seriesData: Record<string, SeriesMetadata>
  productType: string
}

export function SeriesGrid({ seriesData, productType }: SeriesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(seriesData).map(([seriesId, series], index) => (
        <Suspense 
          key={seriesId}
          fallback={
            <div className="h-[400px] animate-pulse bg-gray-200 rounded-xl" />
          }
        >
          <SeriesCardInteractive
            series={series}
            productType={productType}
            seriesId={seriesId}
            className="animate-morphism-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          />
        </Suspense>
      ))}
    </div>
  )
}
