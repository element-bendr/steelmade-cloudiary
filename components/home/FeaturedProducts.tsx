import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cloudinaryUrl } from '@/lib/cloudinary';

export default function FeaturedProducts() {
  // Sample featured products
  const featuredProducts = [
    {
      id: 'tycoon-director-chair',
      name: 'Tycoon Director Chair',
      description: 'Our premium director chair designed for comfort and style.',
      imageUrl: cloudinaryUrl('v1749458143/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg'),
      category: 'chairs',
      series: 'director-series',
    },
    {
      id: 'executive-chair',
      name: 'Executive Office Chair',
      description: 'Ergonomic design for maximum comfort during long working hours.',
      imageUrl: cloudinaryUrl('v1749458143/steelmade/chairs/director-series/director/ic-02-hb.jpg'),
      category: 'chairs',
      series: 'director-series',
    },
    {
      id: 'conference-table',
      name: 'Conference Table',
      description: 'Premium conference table for your business meetings.',
      imageUrl: cloudinaryUrl('v1749458143/steelmade/chairs/director-series/classic/ic-03-hb.jpg'),
      category: 'chairs',
      series: 'director-series',
    },
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our most popular furniture pieces, crafted with precision and designed for comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative h-64 rounded-t-lg overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                {product.id === 'tycoon-director-chair' && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    NEW
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <Link
                  href={`/${product.category}/${product.series}/${product.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}