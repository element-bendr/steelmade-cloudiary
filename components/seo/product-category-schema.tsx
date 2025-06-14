import { Product } from "@/types/products";

interface ProductCategorySchemaProps {
  category: string;
  description?: string;
  products?: Product[];
}

export function ProductCategorySchema({ 
  category,
  description,
  products = []
}: ProductCategorySchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} | Steelmade Office Furniture`,
    description: description || `Browse our collection of ${category.toLowerCase()} designed for modern workspaces.`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${category.toLowerCase()}`,
    hasPart: products.map((product) => ({
      "@type": "Product",
      name: product.title,
      description: product.description,
      image: product.images?.[0]?.url || "/images/products/placeholder-product.webp",
      offers: {
        "@type": "Offer",
        availability: product.inStock 
          ? "https://schema.org/InStock" 
          : "https://schema.org/OutOfStock",
        price: product.price || "0",
        priceCurrency: "USD"
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
