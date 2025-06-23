'use client';

import { ProtectedCollectionsGrid } from '../../../../components/collections/protected-collections-grid';
import { SubCategoryCollection, SeriesMetadata, CollectionMetadata } from '../../../../types/collections';
import { ProductType } from '../../../../lib/data/product-types';
import { useEffect, useState } from 'react';
import { getAllSeries } from '../../../../lib/api/collections'; 
import type { ProductSeries } from '../../../../lib/data/product-types';
import type { ImageAsset } from '../../../../types/image-types';

interface CollectionsPageProps {
  params: { seriesId: string };
}

// Defensive, DRY mapping from ProductSeries to SeriesMetadata
function mapProductSeriesToSeriesMetadata(
  series: ProductSeries,
  category: string = 'storage-solutions'
): SeriesMetadata {
  const mapImage = (img: any): ImageAsset => ({
    url: img?.url || '',
    width: img?.width ?? 0,
    height: img?.height ?? 0,
    alt: img?.alt || ''
  });
  return {
    id: series.id,
    title: series.title ?? '',
    description: series.description ?? '',
    seoDescription: series.seoDescription ?? '',
    features: series.features ?? [],
    lastModified: series.lastModified ?? '',
    products: series.products ?? {},
    category: category as any,
    imageUrl: series.imageUrl ?? '',
    specifications: (series as any).specifications ?? undefined,
    tags: (series as any).tags ?? undefined,
    coverImage: mapImage(series.coverImage),
    images: Array.isArray(series.images) ? series.images.map(mapImage) : [],
  };
}

async function getCollectionsBySeriesId(
  seriesId: string,
  productType: ProductType 
): Promise<Record<string, SubCategoryCollection>> {
  console.log(`Fetching collections for seriesId: ${seriesId}, type: ${productType}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Change: getAllSeries returns ProductSeries, so map to SeriesMetadata
  const allSeriesRaw: Record<string, ProductSeries> = await getAllSeries(productType as any);
  const allSeriesForType: Record<string, SeriesMetadata> = Object.fromEntries(
    Object.entries(allSeriesRaw).map(([key, value]) => [key, mapProductSeriesToSeriesMetadata(value, productType)])
  );
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
