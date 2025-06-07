import type { ProductData, ProductImage } from "@/types/products";
import type { ProductCategory, SeriesMetadata } from "@/types/collections";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/ui/Breadcrumbs"; // Corrected import for Breadcrumbs
import ProductImageGallery from "@/components/products/ProductImageGallery"; // Corrected import for ProductImageGallery
import ProductInformation from "@/components/products/ProductInformation"; // Corrected import for ProductInformation
import { getCategoryUrl, getProductUrl } from "@/lib/navigation"; // Assuming getProductUrl is also in navigation

interface ProductPageLayoutProps {
  product: ProductData;
  category: ProductCategory;
  series: SeriesMetadata | null; // Series might not always be available or needed directly if product has all info
  // breadcrumbItems: BreadcrumbItem[]; // Alternative: pass pre-built breadcrumbs
}

export default function ProductPageLayout({ product, category, series }: ProductPageLayoutProps) {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
    { name: category.charAt(0).toUpperCase() + category.slice(1), href: getCategoryUrl(category) },
  ];

  if (series) {
    breadcrumbItems.push({ name: series.title, href: getCategoryUrl(category, product.seriesId) });
  }
  
  breadcrumbItems.push({ name: product.name, href: getProductUrl(category, product.seriesId, product.id) });

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <ProductImageGallery images={product.images || []} productName={product.name} />
        <ProductInformation product={product} />
      </div>
      {/* You can add more sections here, like related products, specifications, etc. */}
    </main>
  );
}
