import { Suspense } from "react"
import { SeriesCardInteractive } from "./SeriesCardInteractive"
import type { ProductSeries } from "@/lib/data/product-types"

interface SeriesGridProps {
  seriesData: Record<string, ProductSeries>
  productType: string
}

// Fix: ProductSeries.title is string | undefined, but SeriesCardInteractive expects string. Provide fallback.
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
            series={{ ...series, title: series.title ?? seriesId }}
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
