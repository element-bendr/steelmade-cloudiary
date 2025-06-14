import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SeriesMetadata } from '@/types/index';
import { getImageUrl } from '@/lib/utils/image-utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SeriesGridProps {
  seriesData: Record<string, SeriesMetadata>;
  productType: string;
}

export const SeriesGrid: React.FC<SeriesGridProps> = ({ seriesData, productType }) => {
  if (!seriesData || Object.keys(seriesData).length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No series found for this product category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(seriesData).map(([seriesId, series]) => {
        const imageUrl = getImageUrl(series.coverImage);
        return (
          <Card key={seriesId} className="overflow-hidden group hover:shadow-lg transition-all duration-300">          
            <div className="relative h-52">
              <Image
                src={imageUrl || "/images/placeholder.jpg"} // Use placeholder if imageUrl is empty
                alt={series.title}
                fill
                className="object-cover group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardHeader>
              <CardTitle>{series.title}</CardTitle>
              <CardDescription className="line-clamp-2">{series.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {series.features && Array.isArray(series.features) && series.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="px-2 py-1 text-xs">
                    {feature}
                  </Badge>
                ))}
                {series.features && Array.isArray(series.features) && series.features.length > 3 && (
                  <Badge variant="secondary" className="px-2 py-1 text-xs">
                    +{series.features.length - 3} more
                  </Badge>
                )}
              </div>
              
              {/* Product count indicator */}
              {series.products && Object.keys(series.products).length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {Object.keys(series.products).length} product{Object.keys(series.products).length !== 1 ? 's' : ''} in this series
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Link href={`/${productType}/${seriesId}`} className="w-full">
                <Button className="w-full">Explore Series</Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};