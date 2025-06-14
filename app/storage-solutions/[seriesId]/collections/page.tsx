'use client';

import { ProtectedCollectionsGrid } from "@/components/collections/protected-collections-grid";
import { SubCategoryCollection, SeriesMetadata, CollectionMetadata } from "@/types/collections"; 
import { ProductType } from "@/types/products"; 
import { useEffect, useState } from "react";
import { getAllSeries } from "@/lib/api/collections"; 

interface CollectionsPageProps {
  params: { seriesId: string };
}

async function getCollectionsBySeriesId(
  seriesId: string,
  productType: ProductType 
): Promise<Record<string, SubCategoryCollection>> {
  console.log(`Fetching collections for seriesId: ${seriesId}, type: ${productType}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allSeriesForType: Record<string, SeriesMetadata> = await getAllSeries(productType as any); 

  const collections: Record<string, SubCategoryCollection> = {};
  for (const key in allSeriesForType) {
    if (Object.prototype.hasOwnProperty.call(allSeriesForType, key)) {
        const seriesItem = allSeriesForType[key];
        // Constructing CollectionMetadata for the required metadata property
        const metadata: CollectionMetadata = {
            title: seriesItem.title,
            description: seriesItem.description,
            seoDescription: seriesItem.seoDescription,
            features: seriesItem.features,
            lastModified: seriesItem.lastModified,
            coverImage: seriesItem.coverImage,
            images: seriesItem.images,
        };
        collections[key] = {
            id: seriesItem.id,
            title: seriesItem.title, 
            description: seriesItem.description,
            coverImage: seriesItem.coverImage, 
            // slug is not a property of SubCategoryCollection, removed.
            metadata: metadata // Assign the constructed metadata
            // Other optional fields like products, series, priceRange, etc., are not populated in this mock
        };
    }
  }
  return collections;
}

export default function CollectionsPage({ params }: CollectionsPageProps) {
  const [collectionsData, setCollectionsData] = useState<Record<string, SubCategoryCollection> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.seriesId) {
      setLoading(true);
      // Explicitly cast the string literal to ProductType to satisfy the parameter type
      getCollectionsBySeriesId(params.seriesId, 'storage-solutions' as ProductType) 
        .then((data: Record<string, SubCategoryCollection>) => {
          setCollectionsData(data);
          setLoading(false);
        })
        .catch((err: Error) => {
          console.error("Failed to fetch collections:", err);
          setError("Failed to load collections. " + err.message);
          setLoading(false);
        });
    }
  }, [params.seriesId]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading collections...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  if (!collectionsData || Object.keys(collectionsData).length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">No collections found for this series.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProtectedCollectionsGrid
        // Explicitly cast the string literal to ProductType for the prop
        type={"storage-solutions" as ProductType}
        collections={collectionsData}
      />
    </div>
  );
}
