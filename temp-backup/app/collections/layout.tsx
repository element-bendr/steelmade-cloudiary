import { collections } from "@/lib/data/collections-data";
import CollectionsSchema from "@/components/seo/collections-schema";
import { CollectionsCanonicalUrl } from "./canonical-url";
import { metadata } from "./metadata";
import { CategoryCollections } from "@/types/collections";

export { metadata };

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Adapt the product catalog to match the CategoryCollections type
  const adaptedCollections = Object.entries(collections).reduce((acc, [category, series]) => {
    acc[category] = Object.entries(series).reduce((seriesAcc, [seriesId, seriesData]) => {
      seriesAcc[seriesId] = {
        ...seriesData,
        metadata: { 
          // Add required metadata property
          title: seriesData.title || seriesId,
          description: seriesData.description || '',
        }
      };
      return seriesAcc;
    }, {} as Record<string, any>);
    return acc;
  }, {} as CategoryCollections);

  return (
    <>
      <CollectionsSchema collections={adaptedCollections} />
      <CollectionsCanonicalUrl />
      {children}
    </>
  );
}
