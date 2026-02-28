"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { ProductData } from '../../types/product';
import type { ProductSeries, ExtendedProductData } from '../../lib/data/product-types';

/**
 * Universal configurable card component for displaying products and series.
 * 
 * This component replaces multiple legacy card components (ChairCard, ProductCard, 
 * SeriesCardStatic, etc.) with a single, flexible implementation that adapts to 
 * different content types and variants.
 * 
 * Features:
 * - Supports both ProductSeries and ProductData display
 * - Configurable variants for different use cases
 * - Consistent styling with hover effects and animations
 * - Optimized Next.js Image loading
 * - Accessible with proper ARIA labels
 * 
 * @example
 * ```tsx
 * <ConfigurableCard 
 *   item={productSeries} 
 *   variant="series"
 *   categoryId="chairs"
 *   index={0}
 * />
 * ```
 */
interface Props {
  /** 
   * The item to display - can be either a ProductSeries or individual ProductData.
   * The component automatically adapts its display based on the item type.
   */
  item: ProductSeries | ProductData;
  /** 
   * Display variant - determines how the card is styled and what information is shown.
   * - 'series': For displaying product series (default)
   * - 'product': For displaying individual products
   */
  variant?: 'series' | 'product';
  /** 
   * Category identifier used for routing and theming context.
   * Determines the URL structure for the card's link.
   */
  categoryId: string;
  /** 
   * Optional index for staggered animations.
   * Used to create a cascading animation effect when multiple cards are displayed.
   */
  index?: number;
}

/**
 * ConfigurableCard component - Universal card for products and series display.
 * 
 * @param props - Component props
 * @param props.item - The ProductSeries or ProductData to display
 * @param props.variant - Display variant ('series' or 'product')
 * @param props.categoryId - Category identifier for routing
 * @param props.index - Index for staggered animations
 * @returns JSX element with card layout and content
 */
export default function ConfigurableCard({ item, variant = 'series', categoryId, index = 0 }: Props) {
  const title = (item as ProductSeries)?.title || (item as ProductData)?.name || item?.id || 'Item';
  const description = (item as ProductSeries)?.description || (item as ProductData)?.description || '';
  const firstProduct: ExtendedProductData | undefined = (item as ProductSeries)?.products ? Object.values((item as ProductSeries).products)[0] : undefined;

  return (
    <Link
      href={`/${categoryId}/${item.id}`}
      className={`bg-white border border-transparent hover:border-neutral-200 flex flex-col items-center p-6 group transition-all duration-300 relative min-h-[420px] animate-fadeinup hover:shadow-minimal`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
      aria-label={`View ${title}`}
    >
      <div className="w-full h-64 mb-8 rounded-sm overflow-hidden bg-neutral-50 flex items-center justify-center p-4">
        {firstProduct?.imageUrl ? (
          // Use Next Image for optimized loading; fall back to fill layout if size unknown
          <div className="w-full h-full relative">
            <Image
              src={firstProduct.imageUrl}
              alt={title}
              sizes="(max-width: 1024px) 50vw, 33vw"
              fill
              style={{ objectFit: 'contain' }}
              className="object-contain w-full h-full"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">No image</div>
        )}
      </div>
      <div className="w-full text-left">
        <h3 className="text-xl font-serif text-neutral-900 mb-2 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-sm text-neutral-500 mb-6 line-clamp-2 min-h-[2.5em] font-light">{description}</p>
        <span className="inline-block mt-auto text-sm tracking-wide uppercase font-medium text-neutral-900 group-hover:text-accent transition-colors border-b border-transparent group-hover:border-accent pb-1">Explore Collection</span>
      </div>
    </Link>
  );
}
