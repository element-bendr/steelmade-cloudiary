"use client";

import React, { useState } from 'react';
import { woodlandDirectorChair } from '@/lib/data/products/chairs/director-series/woodland-director-chair';
import { ProductDetailLayout } from '@/components/products';

export default function WoodlandDirectorChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  // Add custom section for Woodland chair to match other chairs
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Woodland Special Features</h3>
        <p className="text-gray-600">
          The Woodland Director Chair is designed for outdoor settings with
          weather-resistant materials and comfortable seating.
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-gray-600 pl-2">
          <li>Weather-resistant canvas</li>
          <li>Foldable design for easy transport</li>
          <li>Reinforced joints for durability</li>
        </ul>
      </div>
    );
  };

  return (
    <ProductDetailLayout
      product={{
        ...woodlandDirectorChair,
        // No price needed to match Opera chair
        price: '',
        imageUrl: woodlandDirectorChair.imageUrl || '/images/chairs/placeholder.jpg',
      }}
      contactOptions={{
        onContactClick: () => setShowContactForm(true)
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