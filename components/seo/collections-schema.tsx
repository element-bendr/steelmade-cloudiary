import { CategoryCollections, ProductCategories } from "@/types/collections";

export function generateCollectionSchema(collections: CategoryCollections) {
  // Filter out non-ProductCategories properties before iterating
  const validCategories = Object.entries(collections).filter(
    ([key, value]) => typeof value === 'object' && value !== null && !Array.isArray(value) && key !== 'title' && key !== 'description' && key !== 'subCategories'
  ) as [string, ProductCategories][];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": validCategories.flatMap(([category, subCategories]) =>
      Object.entries(subCategories).map(([seriesId, series], index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": series.metadata.title,
        "description": series.metadata.description,
        "image": series.metadata.coverImage.url,
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": series.priceRange?.min?.replace("$", "") || "0",
          "highPrice": series.priceRange?.max?.replace("$", "") || "0",
          "priceCurrency": "USD"
        }
      }))
    )
  };
}

export default function CollectionsSchema({ collections }: { collections: CategoryCollections }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateCollectionSchema(collections))
      }}
    />
  );
}
