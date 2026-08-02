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
    if (!series || typeof series !== "object") return acc;
    acc[category] = Object.entries(series).reduce((seriesAcc, [seriesId, seriesData]) => {
      const data = seriesData as Record<string, unknown>;
      seriesAcc[seriesId] = {
        ...data,
        metadata: {
          // Add required metadata property
          title: (data.title as string) || seriesId,
          description: (data.description as string) || "",
        },
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
