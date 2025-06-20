"use client";

import React, { useState } from 'react';
import { ProductDetailLayout } from '@/components/products';

// Import the correct data file
import { operaDirectorChair } from '@/lib/data/products/chairs/director-series/opera-director-chair';

export default function OperaDirectorChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  // Add custom section specific to Opera chair
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Opera Premium Features</h3>
        <p className="text-gray-600">
          The Opera Director Chair is crafted with premium materials and unique design elements 
          that set it apart in our director series collection.
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-gray-600 pl-2">
          <li>Premium leather finish options</li>
          <li>Reinforced frame for enhanced stability</li>
          <li>Customizable nameplate option</li>
        </ul>
      </div>
    );
  };

  return (
    <ProductDetailLayout
      product={{
        ...operaDirectorChair,
        // No price needed as per requirements
        price: '',
        imageUrl: operaDirectorChair.imageUrl || '/images/chairs/placeholder.jpg',
      }}
      contactOptions={{
        onContactClick: () => setShowContactForm(true),
      }}
      renderCustomSection={renderCustomSection}
      // Apply consistent layout options
      layoutOptions={{
        imagePosition: 'left',
        showMetaSection: false,
      }}
    />
  );
}