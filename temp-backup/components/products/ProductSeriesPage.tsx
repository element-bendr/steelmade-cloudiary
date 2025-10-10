"use client"

import { CollectionCarousel } from "@/components/collections/CollectionCarousel" // Keep for now, might remove later
import { ProductGrid } from "@/components/products/ProductGrid"
import { FeaturedProductsDisplay } from "@/components/products/FeaturedProductsDisplay" // Import the new component
import type { SeriesMetadata, ProductCategory } from "@/types/collections"
import type { ProductData } from "@/types/products"

interface ProductSeriesPageProps {
  series: SeriesMetadata
  products: ProductData[]
  category: ProductCategory
  seriesId: string
}

export default function ProductSeriesPage({ 
  series, 
  products,
  category, // Keep category if needed by other parts or for future use
  seriesId // Keep seriesId if needed
}: ProductSeriesPageProps) {
  // Determine featured products - e.g., first 4 products or based on a flag
  // For now, let's assume the first 4 are featured. This can be made more sophisticated.
  const featuredProducts = products.slice(0, 4);
  const remainingProducts = products.slice(4);

  return (
    <div className="container py-12 space-y-12"> {/* Increased spacing */}
      {/* Series Title and Description */}
      <div className="text-center mb-8"> {/* Centered title and description */}
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{series.title}</h1>
        <p className="mt-4 text-xl text-muted-foreground">{series.description}</p>
      </div>
      
      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <FeaturedProductsDisplay 
          products={featuredProducts} 
          title={`Featured ${series.title}`}
          category={category} // Pass category
          seriesId={seriesId} // Pass seriesId
        />
      )}
      
      {/* Main Product Grid Section */}
      {remainingProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            All {series.title}
          </h2>
          <ProductGrid products={remainingProducts} />
        </section>
      )}

      {series.features && series.features.length > 0 && (
        <div className="mt-16 backdrop-blur-md bg-white/60 rounded-xl border border-white/20 shadow-lg p-8 relative overflow-hidden">
          {/* Decorative elements for glassmorphism effect */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-14 -left-14 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl"></div>
          
          <h2 className="text-2xl font-bold mb-8 text-center relative z-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {series.features.map((feature, index) => (
              <div key={index} className="flex items-start group">
                <div className="flex-shrink-0 mr-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-red-600 text-white font-bold text-xl shadow-sm group-hover:scale-110 transition-transform">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {feature}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* {series.specifications && Object.keys(series.specifications).length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {Object.entries(series.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <dt className="font-medium">{key}</dt>
                <dd className="text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )} */}
    </div>
  )
}
