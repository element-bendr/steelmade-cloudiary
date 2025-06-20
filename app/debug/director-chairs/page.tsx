import React from 'react';
import Link from 'next/link';
import { directorSeries } from '@/lib/data/products/chairs/director-series';

export default function DirectorChairsPage() {
  const products = Object.values(directorSeries.products);
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Director Series Chairs</h1>
      <p className="mb-8 text-lg text-gray-700">Browse our collection of premium director chairs.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mt-4">
              <Link 
                href={`/chairs/director-series/${product.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
        <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Debug Links</h2>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            <Link href="/chairs/director-series" className="text-blue-600 hover:underline">
              View Director Series Page
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/chairs/director-series/tycoon-director-chair" className="text-blue-600 hover:underline">
              Direct Link to Tycoon Director Chair
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/chairs/director-series/classic-director-chair" className="text-blue-600 hover:underline">
              Direct Link to Classic Director Chair
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/chairs/director-series/ashley-director-chair" className="text-blue-600 hover:underline">
              Direct Link to Ashley Director Chair
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}