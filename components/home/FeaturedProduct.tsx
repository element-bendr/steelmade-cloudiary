import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { SanityProductService } from '@/lib/services/sanity-product-service';

export default async function FeaturedProduct() {
  const featuredProduct = await SanityProductService.getProductBySlug("ashley-director-chair");
  
  if (!featuredProduct) return null;
  
  const imageUrl = featuredProduct.coverImage?.asset?.url || 
    "https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">Featured Product</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={imageUrl}
                alt={featuredProduct.title || 'Ashley Director Chair'}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-700 opacity-20"></div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-bold text-black">{featuredProduct.title}</h3>
            <p className="text-gray-600">{featuredProduct.description}</p>
            {featuredProduct.price && <p className="text-xl font-semibold text-black">${featuredProduct.price}</p>}
            <div className="flex gap-4">
              <Button asChild>
                <Link href={`/chairs/director-series/${featuredProduct.slug?.current || 'ashley-director-chair'}`}>
                  View Details
                </Link>
              </Button>
              <Button variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
