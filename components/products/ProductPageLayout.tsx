import type { ExtendedProductData, ProductImage, ProductSeries } from '../../lib/data/product-types';
import Breadcrumbs, { type BreadcrumbItem } from '../ui/Breadcrumbs';
import ProductImageGallery from './ProductImageGallery';
import ProductInformation from './ProductInformation';
import { getCategoryUrl, getProductUrl } from '../../lib/navigation';

interface ProductPageLayoutProps {
  product: ExtendedProductData;
  category: string;
  series: ProductSeries | null;
  // breadcrumbItems: BreadcrumbItem[]; // Alternative: pass pre-built breadcrumbs
}

export default function ProductPageLayout({ product, category, series }: ProductPageLayoutProps) {
  // Ensure category is a ProductType
  const categorySlug = category as import('../../lib/data/product-types').ProductType;
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
    { name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1), href: getCategoryUrl(categorySlug) },
  ];

  if (series) {
    breadcrumbItems.push({ name: series.title || '', href: getCategoryUrl(categorySlug, product.seriesId) });
  }
  
  breadcrumbItems.push({ name: product.name, href: getProductUrl(categorySlug, product.seriesId, product.id) });

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
