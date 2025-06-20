"use client";

import React, { useState } from 'react';
import { ProductDetailLayout } from '@/components/products';

// Fix import name to match the actual export in the data file
import { bigbossgoldDirectorChair } from '@/lib/data/products/chairs/director-series/bigboss-gold-director-chair';

export default function BigBossGoldDirectorChairPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  
  // Add custom section specific to BigBoss Gold chair highlighting premium materials
  const renderCustomSection = () => {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Luxury Materials</h3>
        <p className="text-gray-600">
          The BigBoss Gold Director Chair represents the pinnacle of our director series, 
          featuring exclusive materials and craftsmanship.
        </p>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
          <h4 className="font-medium text-amber-800">Gold Edition Highlights</h4>
          <ul className="mt-2 space-y-1 list-disc list-inside text-amber-700 pl-2">
            <li>24K gold-plated hardware accents</li>
            <li>Premium Italian leather upholstery</li>
            <li>Handcrafted wooden armrests</li>
            <li>Custom engraving available</li>
          </ul>
          <button 
            onClick={() => setShowMaterialsModal(true)}
            className="mt-3 text-amber-800 font-medium hover:text-amber-900 transition-colors"
          >
            View Material Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <ProductDetailLayout
        product={{
          ...bigbossgoldDirectorChair,
          // Remove price to match Opera chair styling
          price: '',
          imageUrl: bigbossgoldDirectorChair.imageUrl || '/images/chairs/placeholder.jpg',
        }}
        contactOptions={{
          onContactClick: () => setShowContactForm(true),
        }}
        renderCustomSection={renderCustomSection}
      />
      
      {/* Materials Modal - outside of ProductDetailLayout */}
      {showMaterialsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full space-y-4">
            <h2 className="text-2xl font-bold text-amber-800">Luxury Materials</h2>
            <p className="text-gray-600">
              The BigBoss Gold Director Chair uses only the finest materials sourced from around the world.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="border border-amber-100 rounded-lg p-4 bg-amber-50">
                <h3 className="font-medium text-amber-800">Italian Leather</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Premium full-grain leather from Italian tanneries, known for its durability and luxurious feel.
                </p>
              </div>
              <div className="border border-amber-100 rounded-lg p-4 bg-amber-50">
                <h3 className="font-medium text-amber-800">24K Gold Plating</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Genuine 24K gold plating on all metal hardware, providing a stunning visual accent.
                </p>
              </div>
              <div className="border border-amber-100 rounded-lg p-4 bg-amber-50">
                <h3 className="font-medium text-amber-800">Hardwood Frame</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Solid hardwood frame constructed from sustainably harvested oak for strength and longevity.
                </p>
              </div>
              <div className="border border-amber-100 rounded-lg p-4 bg-amber-50">
                <h3 className="font-medium text-amber-800">Custom Engraving</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Personalized laser engraving available on the chair back and armrests.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowMaterialsModal(false)}
              className="mt-4 px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}