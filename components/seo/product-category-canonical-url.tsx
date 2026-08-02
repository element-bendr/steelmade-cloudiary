interface ProductCategoryCanonicalUrlProps {
  category: string;
  subcategory?: string;
}

export function ProductCategoryCanonicalUrl({ 
  category,
  subcategory
}: ProductCategoryCanonicalUrlProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const path = subcategory 
    ? `/products/${category.toLowerCase()}/${subcategory.toLowerCase()}`
    : `/products/${category.toLowerCase()}`;

  return (
    <link
      rel="canonical"
      href={`${baseUrl}${path}`}
    />
  );
}

// Re-export as default for easier imports in route files
export default ProductCategoryCanonicalUrl;
