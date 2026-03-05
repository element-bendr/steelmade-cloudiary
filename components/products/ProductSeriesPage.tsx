"use client"

import { CollectionCarousel } from "../collections/CollectionCarousel"
import { ProductGrid } from "./ProductGrid"
import { FeaturedProductsDisplay } from "./FeaturedProductsDisplay"
import { Slideshow } from "../common/Slideshow"
// Removed legacy type import
import type { SlideData } from "../common/Slideshow"

interface ProductSeriesPageProps {
  title?: string;
  description?: string;
  coverImage?: string;
  features?: any[];
  products: any[];
  category: string;
  seriesId: string;
}

export default function ProductSeriesPage({ 
  title,
  features,
  description, 
  coverImage, 
  products, 
  category, 
  seriesId 
}: ProductSeriesPageProps) {
  // Prefer variant-enabled products in featured cards so listing pages visibly surface variants.
  const variantFirst = [...products].sort((a, b) => {
    const aHasVariants = Array.isArray(a?.variants) && a.variants.length > 0 ? 1 : 0;
    const bHasVariants = Array.isArray(b?.variants) && b.variants.length > 0 ? 1 : 0;
    return bHasVariants - aHasVariants;
  });

  // Prepare featured slice: first 4 from variant-prioritized list, full list remains unchanged.
  const featured = variantFirst.slice(0, 4);
  const allProducts = products;

  // Generate slides for this specific series
  const seriesSlides: SlideData[] = [
    {
      id: `${seriesId}-hero`,
      title: title || 'Premium Collection',
      subtitle: `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`,
      description: description || `Discover our premium ${(title || 'furniture').toLowerCase()} collection`,
      backgroundImage: coverImage || '/images/placeholder/series-hero.jpg',
      ctaText: `Explore ${title || 'Collection'}`,
      ctaLink: `/${category}/${seriesId}`,
      overlay: 'gradient' as const
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-white">
      {/* Series Slideshow */}
      <Slideshow 
        slides={seriesSlides}
        height="50vh"
        autoPlay={false}
        showNavigation={false}
        showIndicators={false}
        showPlayPause={false}
        className="mb-8"
      />
      
      <div className="py-16 flex flex-col items-center justify-center relative overflow-x-hidden">
        {/* Removed floating/animated decorative elements and gradients for minimalism */}
        <div className="w-full max-w-7xl mx-auto px-4 space-y-16 relative z-10">
        {/* Series Title and Description */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 mb-2 animate-fade-in">
            {title}
          </h1>
          <p className="mt-4 text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto animate-fade-in-slow">
            {description}
          </p>
        </div>

        {/* Featured Section (first 4 products) */}
        {featured.length > 0 && (
          <FeaturedProductsDisplay products={featured} title={`Featured ${title}`} category={category} seriesId={seriesId} className="z-10 relative" />
        )}

        {/* All Products Section (full list) */}
        <section className="py-12 px-0 md:px-0 relative animate-fade-in-slow">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-neutral-900">
            All {title}
          </h2>
          <ProductGrid products={allProducts} category={category} seriesId={seriesId} />
        </section>

        {features && features.length > 0 && (
          <div className="mt-20 rounded-3xl border border-neutral-100 shadow p-12 relative overflow-hidden animate-fade-in-slow bg-white">
            <h2 className="text-2xl font-bold mb-10 text-center relative z-10 text-neutral-900">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 mr-4">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-neutral-200 text-neutral-700 font-bold text-xl shadow-sm group-hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-neutral-800 font-medium leading-relaxed text-base">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
