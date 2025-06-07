"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SubCategoryCollection } from "@/types/collections";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface CollectionCardProps {
  type: string;
  subCategory: string;
  collection: SubCategoryCollection;
  showProductCount?: boolean;
}

export function CollectionCard({ type, subCategory, collection, showProductCount = true }: CollectionCardProps) {
  const { title, description, coverImage } = collection.metadata;
  const productCount = Object.keys(collection.products || {}).length;

  return (
    <Link href={`/${type}/${subCategory}`}>
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg min-h-[450px] flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={coverImage?.url || "/images/collections/placeholder-collection.webp"}
            alt={title || "Collection image"}
            width={800}
            height={800}
            className="object-cover transition-transform group-hover:scale-105"
            priority={!!coverImage?.url} // Only prioritize actual cover images
          />
          {/* Price Range Badge - Only shown if price range exists */}
          {collection.priceRange?.min && collection.priceRange?.max && (
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-gray-900">
                {collection.priceRange.min} - {collection.priceRange.max}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="flex-none">
          <CardTitle className="line-clamp-2 text-xl">{title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          {description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {/* Features */}
          <div className="mt-4 flex flex-wrap gap-2 min-h-[32px]">
            {collection.features?.slice(0, 3).map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className="bg-primary/5 text-xs font-normal"
              >
                {feature}
              </Badge>
            ))}
            {collection.features && collection.features.length > 3 && (
              <Badge variant="outline" className="bg-primary/5 text-xs font-normal">
                +{collection.features.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>

        {showProductCount && (
          <CardFooter className="text-sm text-muted-foreground flex-none">
            <div className="flex items-center gap-2">
              {/* Products count */}
              {productCount === 1 ? '1 Product' : `${productCount} Products`}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
