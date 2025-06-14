'use client';

import { useEffect, useState } from 'react';
import { ProtectedCollectionsGrid } from "@/components/collections/protected-collections-grid";
import { SubCategoryCollection } from "@/types/collections";

interface PageProps {
  params: { seriesId: string };
}

export default function CollectionsPage({ params }: PageProps) {
  const { seriesId } = params;
  const [collections, setCollections] = useState<Record<string, SubCategoryCollection> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!seriesId) return;

    async function fetchCollectionsData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/desks/${seriesId}/collections`);
        if (!response.ok) {
          throw new Error(`Failed to fetch collections for series ${seriesId}. Status: ${response.status}`);
        }
        const data: Record<string, SubCategoryCollection> = await response.json();
        setCollections(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCollectionsData();
  }, [seriesId]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading collections...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!collections || Object.keys(collections).length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">No collections found for this series.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProtectedCollectionsGrid
        type="desks"
        collections={collections}
      />
    </div>
  );
}
