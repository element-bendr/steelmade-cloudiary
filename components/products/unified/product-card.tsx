import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ProductCategorySlug,
  getCategoryDisplayName
} from '@/types/product-categories-unified';
import { ProductVariant } from '@/types/product-variants-unified';

/**
 * Product data interface using unified type system
 */
interface UnifiedProductData {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  category: ProductCategorySlug;
  seriesId: string;
  price?: {
    value: number;
    currency: string;
    formattedValue: string;
  };
  variants?: ProductVariant[];
  features?: string[];
  specifications?: Record<string, string>;
  inStock?: boolean;
}

interface ProductCardProps {
  product: UnifiedProductData;
  className?: string;
  showCategory?: boolean;
  showDescription?: boolean;
}

/**
 * A standardized product card component using the unified type system
 */
export function ProductCard({
  product,
  className = '',
  showCategory = false,
  showDescription = true
}: ProductCardProps) {
  // Construct the product URL
  const productUrl = `/${product.category}/${product.seriesId}/${product.id}`;
  
  return (
    <div className={`group flex flex-col h-full ${className}`}>
      <Link href={productUrl} className="block flex-grow">
        {/* Product image */}
        <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          
          {/* "Out of stock" badge */}
          {product.inStock === false && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
              Out of stock
            </div>
          )}
        </div>
        
        {/* Product info */}
        <div>
          {showCategory && (
            <p className="text-xs text-muted-foreground mb-1">
              {getCategoryDisplayName(product.category)}
            </p>
          )}
          
          <h3 className="font-medium line-clamp-1 group-hover:underline">
            {product.name}
          </h3>
          
          {showDescription && product.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          )}
          
          {/* Price display */}
          {product.price?.formattedValue && (
            <p className="mt-2 font-medium">
              {product.price.formattedValue}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

export type { UnifiedProductData };