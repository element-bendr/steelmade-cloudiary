'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link'; // Ensure Link is imported
import { ProductType } from '@/types/products';
import type { SubCategoryCollection } from '@/types/collections';
import Image from 'next/image'; // Import next/image for cover images

interface CollectionsGridProps {
  collections: SubCategoryCollection[];
  productType: ProductType; // Made productType mandatory
}

export function CollectionsGrid({ collections, productType }: CollectionsGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCollections, setFilteredCollections] = useState(collections);

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setFilteredCollections(
        collections.filter(
          (collection) =>
            collection.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            collection.metadata?.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCollections(collections);
    }
  }, [debouncedSearchTerm, collections]);

  if (!filteredCollections || filteredCollections.length === 0) {
    return <p>No collections found.</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search collections..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCollections.map((collection) => {
          const imageAsset = collection.coverImage || collection.metadata?.coverImage;
          const productCount = collection.products ? Object.keys(collection.products).length : (collection.series?.reduce((acc, s) => acc + Object.keys(s.products).length, 0) ?? 0);

          return (
            <Link href={`/collections/${productType}/${collection.id}`} key={collection.id} className="block group border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                {imageAsset && imageAsset.url ? (
                  <Image 
                    src={imageAsset.url} 
                    alt={imageAsset.alt || collection.title || 'Collection image'} 
                    layout="fill" 
                    objectFit="cover" 
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 truncate group-hover:text-blue-600">{collection.title ?? 'Unnamed Collection'}</h3>
                <p className="text-sm text-gray-600 mb-2">{collection.metadata?.description ? collection.metadata.description.substring(0,50)+'...' : 'No description'}</p>
                <p className="text-xs text-gray-500">Products: {productCount}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Basic debounce hook (should be in a separate utility file ideally)
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
