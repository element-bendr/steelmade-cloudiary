"use client"

import Link from "next/link"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { ArrowRight } from "lucide-react"
import type { RelatedCollection } from "@/types/collections"

interface RelatedCollectionsProps {
  collections: RelatedCollection[];
}

export function RelatedCollections({ collections }: RelatedCollectionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {collections.map((collection) => (
        <Card key={`${collection.category}-${collection.id}`} className="group overflow-hidden">
          <CardHeader className="p-0 overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden">
              <OptimizedImage
                src={collection.imageUrl || `/images/collections/${collection.category}/placeholder.webp`}
                alt={collection.title}
                width={400}
                height={300}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                {collection.category.charAt(0).toUpperCase() + collection.category.slice(1)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">{collection.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{collection.description}</p>
            <p className="text-sm text-muted-foreground mt-2">{collection.productCount} products</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/collections/${collection.category}/${collection.id}`} className="w-full">
              <Button variant="outline" className="w-full gap-2">
                View Collection
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}