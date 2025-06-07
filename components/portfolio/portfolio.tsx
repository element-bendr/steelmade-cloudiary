"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { SeriesCard } from "./series-card";
import { ProductCard } from "./product-card";
import { portfolioSeries } from "@/lib/data/portfolio-data";
import { PortfolioProps } from "./types";

export function Portfolio({ className, series = portfolioSeries }: PortfolioProps) {
  // Memoize featured products to avoid recalculation on re-renders
  const featuredProducts = useMemo(() => {
    return series
      .flatMap(s => s.products)
      .slice(0, 4);
  }, [series]);

  return (
    <div className={cn("p-8", className)}>
      {/* Series Grid Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          Our Portfolio
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {series.map((seriesItem) => (
            <SeriesCard 
              key={seriesItem.id} 
              series={seriesItem}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section>
        <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          Featured Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Portfolio;
