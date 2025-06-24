"use client";

import React, { useState } from 'react';
import { ProductDetailLayout } from '@/components/products';

// Import the correct data file
import ashleyDirectorChair from '@/lib/data/products/chairs/director-series/ashley-director-chair/index';

export default function AshleyDirectorChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  // Add custom section for Ashley chair to match other chairs
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Ashley Exclusive Features</h3>
        <p className="text-gray-600">
          The Ashley Director Chair combines elegant design with practical functionality,
          making it perfect for both professional and casual settings.
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-gray-600 pl-2">
          <li>Ergonomic armrest design</li>
          <li>Multiple color options available</li>
          <li>Lightweight yet durable construction</li>
        </ul>
      </div>
    );
  };

  return (
    <ProductDetailLayout
      product={{
        ...ashleyDirectorChair,
        // No price needed to match Opera chair
        price: '',
        imageUrl: ashleyDirectorChair.imageUrl || '/images/chairs/placeholder.jpg',
      }}
      contactOptions={{
        onContactClick: () => setShowContactForm(true),
      }}
      // Match image position with Opera chair (left instead of right)
      layoutOptions={{
        imagePosition: 'left',
        showMetaSection: false,
      }}
      renderCustomSection={renderCustomSection}
    />
  );
}