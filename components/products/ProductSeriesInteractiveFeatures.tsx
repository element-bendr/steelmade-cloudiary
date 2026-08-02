"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ImageCarousel } from "@/components/ui/image-carousel"
import { SeriesMetadata } from "@/types/index"
import { getImageAsset } from "@/lib/utils/image-utils"
import { ImageAsset } from "@/types/image-types";

interface ProductSeriesInteractiveFeaturesProps {
  series: SeriesMetadata
  backLink: string
  backText: string
}

export function ProductSeriesInteractiveFeatures({
  series,
  backLink,
  backText
}: ProductSeriesInteractiveFeaturesProps) {
  const carouselImages = [
    getImageAsset(series.coverImage, series.title),
    ...(series.images?.map(img => getImageAsset(img, series.title)) || [])
  ].filter((img): img is ImageAsset => !!img);

  return (
    <>
      <div className="mb-8">
        <Link href={backLink} passHref legacyBehavior>
          <Button variant="ghost" className="mb-4 gap-2 text-foreground pl-0 hover:bg-transparent hover:text-accent">
            <ArrowLeft className="h-4 w-4" />
            {backText}
          </Button>
        </Link>
      </div>      
      <div className="order-2 lg:order-1">        
        <ImageCarousel 
          images={carouselImages}
          title={series.title}
          aspectRatio="4/3"
          quality={85}
        />
      </div>
      
      <div className="mt-8">
        <Link href="/contact" passHref legacyBehavior>
          <Button variant="default" className="gap-2">
            Request Quote
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        </Link>
      </div>
    </>
  )
}
