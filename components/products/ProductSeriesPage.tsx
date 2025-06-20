"use client"

import { CollectionCarousel } from "@/components/collections/CollectionCarousel"
import { ProductGrid } from "@/components/products/ProductGrid"
import { FeaturedProductsDisplay } from "@/components/products/FeaturedProductsDisplay"
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
  category,
  seriesId
}: ProductSeriesPageProps) {
  const featuredProducts = products.slice(0, 4);
  const remainingProducts = products.slice(4);

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-red-50 via-white to-yellow-50 flex flex-col items-center justify-center relative overflow-x-hidden">
      {/* Floating/animated decorative elements for poetic glassmorphism */}
      <div className="pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-200/40 via-white/0 to-yellow-100/30 rounded-full blur-3xl animate-float-slow z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-yellow-200/40 via-white/0 to-red-100/30 rounded-full blur-3xl animate-float-slower z-0" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-red-300/30 to-yellow-200/20 rounded-full blur-2xl animate-float-fast z-0" style={{transform:'translate(-50%,-50%)'}} />
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 space-y-16 relative z-10">
        {/* Series Title and Description */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-yellow-600 to-red-400 drop-shadow-lg mb-2 animate-fade-in">
            {series.title}
          </h1>
          <p className="mt-4 text-2xl text-gray-700 italic leading-relaxed max-w-2xl mx-auto animate-fade-in-slow">
            {series.description}
          </p>
        </div>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section className="rounded-3xl shadow-2xl bg-white/70 backdrop-blur-2xl border border-red-200 py-12 px-6 md:px-16 relative overflow-hidden animate-fade-in">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/30 via-white/0 to-yellow-100/30 pointer-events-none z-0" />
            <FeaturedProductsDisplay 
              products={featuredProducts} 
              title={`Featured ${series.title}`}
              category={category}
              seriesId={seriesId}
              className="z-10 relative"
            />
          </section>
        )}

        {/* Main Product Grid Section */}
        {remainingProducts.length > 0 && (
          <section className="rounded-3xl shadow-xl bg-white/60 backdrop-blur-lg border border-yellow-100 py-12 px-6 md:px-16 relative overflow-hidden animate-fade-in-slow">
            <h2 className="text-4xl font-bold tracking-tight mb-8 text-red-700 bg-clip-text bg-gradient-to-r from-red-700 via-yellow-600 to-red-400 text-transparent">
              All {series.title}
            </h2>
            <ProductGrid products={remainingProducts} />
            {/* Subtle floating accent */}
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-tr from-yellow-200/40 to-red-100/30 rounded-full blur-2xl animate-float-slower z-0" />
          </section>
        )}

        {series.features && series.features.length > 0 && (
          <div className="mt-20 backdrop-blur-2xl bg-white/70 rounded-3xl border border-white/20 shadow-2xl p-12 relative overflow-hidden animate-fade-in-slow">
            {/* Decorative elements for glassmorphism effect */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-500/10 rounded-full blur-3xl animate-float-fast"></div>
            <div className="absolute -bottom-14 -left-14 w-44 h-44 bg-yellow-500/10 rounded-full blur-2xl animate-float"></div>
            <h2 className="text-3xl font-bold mb-10 text-center relative z-10 text-red-700 bg-clip-text bg-gradient-to-r from-red-700 via-yellow-600 to-red-400 text-transparent">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {series.features.map((feature, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 mr-4">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-red-600 via-yellow-500 to-red-400 text-white font-bold text-2xl shadow-md group-hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium leading-relaxed text-lg">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Animations (add to global CSS or Tailwind config):
      .animate-float { animation: float 8s ease-in-out infinite alternate; }
      .animate-float-slow { animation: float 16s ease-in-out infinite alternate; }
      .animate-float-slower { animation: float 24s ease-in-out infinite alternate; }
      .animate-float-fast { animation: float 6s ease-in-out infinite alternate; }
      .animate-fade-in { animation: fadeIn 1.2s ease; }
      .animate-fade-in-slow { animation: fadeIn 2.2s ease; }
      @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-20px); } }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
      */}
    </div>
  )
}
