import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/optimized-image"
import type { ProductSeries } from "@/lib/data/product-types"
import type { ImageAsset } from "@/types/image-types" // Added import for ImageAsset
import { getImageUrl, getImageWidth, getImageHeight } from "@/lib/utils/image-utils"

interface SeriesCardStaticProps {
  series: ProductSeries
  className?: string
}

export function SeriesCardStatic({ series, className }: SeriesCardStaticProps) {
  // Ensure coverImage is treated as ImageAsset
  const coverImage = series.coverImage as ImageAsset;
  const title = series.title ?? series.id;
  const features = series.features ?? [];

  return (
    <div className={className}>
      <Card className="morphism-card group flex flex-col overflow-hidden">        
        <div className="relative aspect-video overflow-hidden rounded-t-lg before:absolute before:inset-0 before:bg-gradient-morphism before:opacity-0">
          <OptimizedImage
            src={getImageUrl(coverImage)} // Use the asserted coverImage
            alt={title}
            width={getImageWidth(coverImage)} // Use the asserted coverImage
            height={getImageHeight(coverImage)} // Use the asserted coverImage
            className="object-cover w-full h-full"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold text-text">{title}</CardTitle>
          <CardDescription className="text-text-muted leading-relaxed">{series.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <Badge 
                key={feature} 
                variant="secondary" 
                className="morphism-surface bg-white/50 text-text-muted"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
