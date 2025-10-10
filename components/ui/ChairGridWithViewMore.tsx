"use client";

import React, { useState } from 'react';
import { ChairCard } from '@/components/products/ChairCard';

interface ChairGridWithViewMoreProps {
  chairs: any[];
  basePath: string;
  initialCount?: number;
  increment?: number;
}

/**
 * Poetic, DRY, and modular grid for displaying chairs with a "View More" button.
 * Declarative, functional, and production-ready for all chair series pages.
 */
export const ChairGridWithViewMore: React.FC<ChairGridWithViewMoreProps> = ({
  chairs,
  basePath,
  initialCount = 6,
  increment = 6,
}) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const visibleChairs = chairs.slice(0, visibleCount);
  const hasMore = visibleCount < chairs.length;

  const handleViewMore = () => setVisibleCount((c) => Math.min(c + increment, chairs.length));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleChairs.map((chair) => (
          <ChairCard key={chair.id} chair={chair} basePath={basePath} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-3 rounded-lg bg-accent-light text-white font-semibold shadow-md hover:bg-accent-dark transition-colors backdrop-blur-sm border border-accent-light/30 text-lg"
            onClick={handleViewMore}
            aria-label="View more chairs"
          >
            View More
          </button>
        </div>
      )}
    </>
  );
};
