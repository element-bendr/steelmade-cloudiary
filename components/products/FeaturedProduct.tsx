import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FeaturedProductProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  series: string;
}

export default function FeaturedProduct({ 
  id, 
  name, 
  description, 
  imageUrl, 
  category, 
  series 
}: FeaturedProductProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          NEW
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <Link
          href={`/${category}/${series}/${id}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}