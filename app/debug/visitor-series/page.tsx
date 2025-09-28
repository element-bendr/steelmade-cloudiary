'use client';

import React from 'react';
import { getSeriesById } from '../../../lib/utils/product-utils';
import { visitorSeries } from '../../../lib/data/products/chairs/visitor-series';

export default function VisitorSeriesDebugPage() {
  // Direct import test
  const directSeries = visitorSeries;
  
  // Utils test
  const utilSeries = getSeriesById("chairs", "visitor-series");
  
  const directProducts = directSeries.products ? Object.values(directSeries.products) : [];
  const utilProducts = utilSeries?.products ? Object.values(utilSeries.products) : [];
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Visitor Series Debug</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Direct Import</h2>
          <p><strong>Series ID:</strong> {directSeries.id}</p>
          <p><strong>Title:</strong> {directSeries.title}</p>
          <p><strong>Product Count:</strong> {directProducts.length}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Products:</h3>
            <ul className="list-disc list-inside">
              {directProducts.map((product: any) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Utils Function</h2>
          {utilSeries ? (
            <>
              <p><strong>Series ID:</strong> {utilSeries.id}</p>
              <p><strong>Title:</strong> {utilSeries.title}</p>
              <p><strong>Product Count:</strong> {utilProducts.length}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Products:</h3>
                <ul className="list-disc list-inside">
                  {utilProducts.map((product: any) => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-red-600">Series not found via utils!</p>
          )}
        </div>
      </div>
    </div>
  );
}