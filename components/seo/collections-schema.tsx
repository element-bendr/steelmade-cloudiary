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
      Object.entries(subCategories).map(([seriesId, series], index) => {
        // Safely access nested properties with fallbacks
        const title = series?.metadata?.title || seriesId;
        const description = series?.metadata?.description || '';
        const imageUrl = series?.metadata?.coverImage?.url || '/images/collections/placeholder-collection.webp';
        const minPrice = series?.priceRange?.min?.replace('$', '') || '0';
        const maxPrice = series?.priceRange?.max?.replace('$', '') || '0';

        return {
          "@type": "Product",
          "position": index + 1,
          "name": title,
          "description": description,
          "image": imageUrl,
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": minPrice,
            "highPrice": maxPrice,
            "priceCurrency": "USD"
          }
        };
      })
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
