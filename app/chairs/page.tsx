'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { chairs } from "@/lib/data/products/chairs";
import { cn } from "@/lib/utils";
import type { ProductSeries, ExtendedProductData } from "@/lib/data/product-types";

const glassCard =
  "bg-white/60 backdrop-blur-md border border-neutral-200 shadow-lg rounded-xl transition-transform hover:scale-[1.03] hover:shadow-xl";
const headingClass =
  "text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-2";
const subheadingClass =
  "text-lg text-neutral-500 mb-10 max-w-2xl mx-auto font-medium";
const gridClass =
  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 w-full max-w-7xl mx-auto"; // gap increased

export default function ChairsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <main className={cn(
      "min-h-screen w-full flex flex-col items-center justify-start py-16 px-4 bg-neutral-50"
    )}>
      <div className="w-full flex flex-col items-center">
        <h1 className={headingClass}>Chairs</h1>
        <p className={subheadingClass}>
          Discover our curated collections of chairs—where comfort, design, and craftsmanship meet. Explore Director, Executive, and more.
        </p>
        <section className={gridClass}>
          {Object.values(chairs).map((series, i) => {
            const s = series as ProductSeries & { title?: string; name?: string };
            let title = s.title || s.name || s.id;
            if (title.toLowerCase().replace(/[-_ ]/g, "") === "executiveseries") {
              title = "Executive Series";
            }
            const description = s.description || "";
            const firstProduct = Object.values(s.products)[0] as ExtendedProductData | undefined;
            return (
              <Link
                key={s.id}
                href={`/chairs/${s.id}`}
                className={cn(
                  glassCard,
                  "flex flex-col items-center p-12 group transition-all duration-300 relative border-l-8 border-l-accent/30 hover:border-l-accent/60 min-h-[480px]",
                  mounted ? `animate-fadeinup opacity-100` : "opacity-0",
                )}
                style={{
                  animationDelay: `${i * 80}ms`,
                  animationFillMode: "forwards"
                }}
                aria-label={`View ${title}`}
              >
                <div className="w-56 h-56 mb-10 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center border border-neutral-100">
                  {firstProduct?.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={firstProduct.imageUrl}
                      alt={title}
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  )}
                </div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-1 group-hover:text-accent transition-colors">
                  {title}
                </h2>
                <p className="text-lg text-neutral-500 text-center mb-3 line-clamp-2 min-h-[2.5em]">
                  {description}
                </p>
                <span className="inline-block mt-auto px-7 py-3 rounded-md bg-neutral-900 text-white font-medium shadow-sm hover:bg-accent hover:text-white transition">
                  Explore
                </span>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}

// Add animation to globals.css:
// @keyframes fadeinup { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
// .animate-fadeinup { animation: fadeinup 0.7s cubic-bezier(0.22,0.61,0.36,1) both; }
