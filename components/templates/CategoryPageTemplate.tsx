"use client";

import { useCategoryTheme } from '../../hooks/useCategoryTheme';
import ConfigurableCard from './ConfigurableCard';
import CategoryErrorBoundary from './CategoryErrorBoundary';
import { Slideshow } from '../common/Slideshow';
import { getSlides } from '../../lib/slideshow/slide-generator';
import type { ProductSeries } from '../../lib/data/product-types';

/**
 * Universal template component for all product category pages.
 * 
 * This template provides a consistent layout and theming system across all product categories,
 * eliminating code duplication and ensuring uniform user experience.
 * 
 * Features:
 * - Automatic category-specific theming via useCategoryTheme hook
 * - Responsive grid layout for product series
 * - Consistent styling and animations across all categories
 * - SSR-friendly CSS variable injection
 * 
 * @example
 * ```tsx
 * <CategoryPageTemplate 
 *   categoryId="chairs" 
 *   items={chairSeries} 
 * />
 * ```
 */
interface Props {
  /** 
   * Category identifier used for theming and routing (e.g., 'chairs', 'desks', 'storage-solutions').
   * This determines the visual theme and URL structure for the category page.
   */
  categoryId: string;
  /** 
   * Array of ProductSeries to display in the category grid.
   * Each series will be rendered as a ConfigurableCard component.
   */
  items: ProductSeries[];
}

/**
 * CategoryPageTemplate component - Universal template for all product category pages.
 * 
 * @param props - Component props
 * @param props.categoryId - Category identifier for theming and routing
 * @param props.items - Array of ProductSeries to display
 * @returns JSX element with themed category page layout
 */
export default function CategoryPageTemplate({ categoryId, items }: Props) {
  const { theme, cssVarsString } = useCategoryTheme(categoryId);
  const slides = getSlides(categoryId);

  return (
    <CategoryErrorBoundary categoryId={categoryId}>
      <main style={{ background: 'var(--sm-bg)' }} data-theme={categoryId}>
        {/* Category Slideshow */}
        <Slideshow 
          slides={slides}
          height="60vh"
          autoPlay={true}
          interval={5000}
          showNavigation={true}
          showIndicators={true}
          showPlayPause={true}
          className="mb-8"
        />
        
        {/* SSR-friendly injection point: cssVarsString is available for server-side rendering */}
        <div className="min-h-screen w-full flex flex-col items-center justify-start py-16 px-4" style={{ background: theme.background }}>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-2">{(categoryId || '').replace(/[-_]/g, ' ').toUpperCase()}</h1>
            <p className="text-lg text-neutral-500 mb-10 max-w-2xl mx-auto font-medium">Explore our curated collections.</p>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 w-full max-w-7xl mx-auto">
              {items.map((it, i) => (
                <CategoryErrorBoundary key={`card-${it.id}`} categoryId={`${categoryId}-card`}>
                  <ConfigurableCard key={it.id} item={it} categoryId={categoryId} index={i} />
                </CategoryErrorBoundary>
              ))}
            </section>
          </div>
        </div>
      </main>
    </CategoryErrorBoundary>
  );
}
