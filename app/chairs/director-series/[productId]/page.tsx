'use client';

import React, { useState, useEffect } from 'react';
import { getDirectorChair } from '@/lib/data/products/chairs/director-series/registerDirectorChair';
import { ChairPageLayout } from '@/components/products/ChairPageLayout';

interface DirectorChairDetailPageProps {
  params: {
    productId: string;
  };
}

export default function DirectorChairDetailPage({ params }: DirectorChairDetailPageProps) {
  const { productId } = params;
  const [chair, setChair] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChair = async () => {
      setLoading(true);
      try {
        const chairData = await getDirectorChair(productId);
        if (!chairData) {
          setError('Product not found');
          setChair(null);
        } else {
          setChair(chairData);
          setSelectedVariant(chairData.defaultVariant || chairData.variants?.[0]?.id || null);
          setError(null);
        }
      } catch (err) {
        setError('Failed to load product. ' + (err instanceof Error ? err.message : String(err)));
        setChair(null);
      } finally {
        setLoading(false);
      }
    };
    fetchChair();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-accent-light rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !chair) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 p-6 rounded-2xl text-red-700 shadow-lg backdrop-blur-lg border border-red-200/30">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error || 'Product not found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <ChairPageLayout
      chair={chair}
      selectedVariant={selectedVariant || ''}
      onVariantChange={setSelectedVariant}
      breadcrumbs={[
        { name: 'Chairs', href: '/chairs' },
        { name: 'Director Series', href: '/chairs/director-series' },
        { name: chair.name, href: `/chairs/director-series/${chair.id}` }
      ]}
    />
  );
}