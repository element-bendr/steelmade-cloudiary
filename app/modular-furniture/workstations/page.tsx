import React from 'react';
import Link from 'next/link';
import workstationsSeries from '../../../lib/data/products/modular-furniture/workstations/index';

export default function WorkstationsPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{workstationsSeries.title}</h1>
      <p className="mb-6">{workstationsSeries.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(workstationsSeries.products).map(product => {
          console.log('Product ID:', product.id, typeof product.id);
          return (
            <Link key={product.id} href={`/modular-furniture/workstations/${String(product.id)}`}
              className="border rounded-lg p-4 shadow block hover:shadow-lg transition-shadow duration-200">
              <img
                src={product.imageUrl}
                alt={product.name}
                width={product.images?.[0]?.width || 400}
                height={product.images?.[0]?.height || 300}
                className="mb-4 w-full h-auto object-cover rounded"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="mb-2">{product.description}</p>
              <ul className="mb-2 list-disc pl-5">
                {product.features?.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
