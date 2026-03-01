import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { SanityProductService } from '@/lib/services/sanity-product-service';

export default async function FeaturedProduct() {
  const featuredProduct = await SanityProductService.getProductBySlug("ashley-director-chair");
  
  if (!featuredProduct) return null;
  
  const imageUrl = featuredProduct.imageUrl || 
    "https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg";
    
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Side */}
          <div className="md:w-1/2 w-full">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-red-700 text-white text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded shadow-sm">
                  Trending Series
                </span>
              </div>
              <Image
                src={imageUrl}
                alt={featuredProduct.name || 'Featured Product'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>
          
          {/* Content Side */}
          <div className="md:w-1/2 w-full space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                {featuredProduct.name}
              </h2>
              <div className="h-1 w-20 bg-red-700 mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {featuredProduct.description}
              </p>
            </div>
            
            {featuredProduct.features && featuredProduct.features.length > 0 && (
              <ul className="space-y-3 py-2">
                {featuredProduct.features.slice(0, 3).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-red-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-gray-900 hover:bg-black text-white px-8">
                <Link href={`/${featuredProduct.category || 'chairs'}/${(featuredProduct.series || 'director-series').toLowerCase().replace(/\s+/g, '-')}/${featuredProduct.id || 'ashley-director-chair'}`}>
                  View Details
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
