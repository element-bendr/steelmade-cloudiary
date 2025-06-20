"use client";

import React, { useState } from 'react';
import { ProductDetailLayout } from '@/components/products';

// Import the correct data file
import { tycoondirectorchair as tycoonDirectorChair } from '@/lib/data/products/chairs/director-series/tycoon-director-chair';

/**
 * Product detail page for Tycoon Director Chair
 */
export default function TycoonDirectorChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  // Add custom section specific to Tycoon chair
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Tycoon Exclusive Benefits</h3>
        <p className="text-gray-600">
          The Tycoon Director Chair comes with exclusive benefits including extended warranty 
          and priority support. Contact our sales team for more details.
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-gray-600 pl-2">
          <li>Extended 5-year warranty</li>
          <li>Priority customer support</li>
          <li>Free delivery and setup</li>
        </ul>
      </div>
    );
  };

  return (
    <ProductDetailLayout
      product={{
        ...tycoonDirectorChair,
        // No price needed to match Opera chair
        price: '',
        imageUrl: tycoonDirectorChair.imageUrl || '/images/chairs/placeholder.jpg',
      }}
      contactOptions={{
        onContactClick: () => setShowContactForm(true),
      }}
      // Apply consistent layout options
      layoutOptions={{
        imagePosition: 'left',
        showMetaSection: false,
      }}
      renderCustomSection={renderCustomSection}
    />
  );
}