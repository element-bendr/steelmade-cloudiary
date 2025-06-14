import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductData } from '@/types/index';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductsGridProps {
  products: Record<string, ProductData>;
  productType: string;
  seriesId: string;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  productType, 
  seriesId 
}) => {
  if (!products || Object.keys(products).length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No products found in this series.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(products).map(([productId, product]) => {
        const imageUrl = product.images && product.images.length > 0 && product.images[0] ? product.images[0].url : "/images/placeholder.jpg";
        const imageAlt = product.images && product.images.length > 0 && product.images[0] && product.images[0].alt ? product.images[0].alt : product.name;

        return (
        <div key={productId} className="rounded-xl overflow-hidden border group hover:shadow-lg transition-all duration-300">
          <div className="relative h-64">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {product.features && product.features.slice(0, 3).map((feature, idx) => (
                <Badge key={idx} variant="secondary" className="px-2 py-1 text-xs">
                  {feature}
                </Badge>
              ))}
              {product.features && product.features.length > 3 && (
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  +{product.features.length - 3} more
                </Badge>
              )}
            </div>
            
            {product.price && (
              <div className="font-bold text-lg mb-4">{product.price}</div>
            )}
            
            <Link href={`/${productType}/${seriesId}/${productId}`}>
              <Button className="w-full">View Details</Button>
            </Link>
          </div>
        </div>
        );
      })}
    </div>
  );
};