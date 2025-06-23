import { notFound } from 'next/navigation';
import { getProductById, getSeriesById } from '@/lib/services/product-service';
import type { Metadata, ResolvingMetadata } from 'next';
import ProductPageLayout from '@/components/products/ProductPageLayout';
import type { ProductType, ExtendedProductData, ProductSeries, ProductImage } from '@/lib/data/product-types';
import type { SeriesMetadata, ProductCategory } from '@/types/collections';
import type { ImageAsset } from '@/types/image-types';

/**
 * Defensive, DRY mapping from ProductSeries to SeriesMetadata for school-furniture.
 * Ensures all required fields are present and types are compatible.
 */
function mapProductSeriesToSeriesMetadata(
  series: ProductSeries,
  category: ProductCategory = 'school-furniture'
): SeriesMetadata {
  // Helper to map ProductImage to ImageAsset with fallbacks
  const mapImage = (img: ProductImage | undefined): ImageAsset => ({
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
    category, // always 'school-furniture' for this page
    imageUrl: series.imageUrl ?? '',
    specifications: (series as any).specifications ?? undefined,
    tags: (series as any).tags ?? undefined,
    coverImage: mapImage(series.coverImage),
    images: Array.isArray(series.images)
      ? series.images.map(mapImage)
      : [],
  };
}

type ProductDetailPageProps = {
  params: {
    seriesId: string;
    productId: string;
  };
};

export async function generateMetadata(
  { params }: ProductDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductById('school-furniture', params.seriesId, params.productId);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} - SteelMade`,
    description: product.description,
    openGraph: {
      title: `${product.name} - SteelMade`,
      description: product.description,
      images: product.images?.length
        ? product.images.map(img => ({ url: img.url, alt: img.alt }))
        : (product.imageUrl ? [{ url: product.imageUrl, alt: product.name }] : []),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, seriesRaw] = await Promise.all([
    getProductById('school-furniture', params.seriesId, params.productId),
    getSeriesById('school-furniture', params.seriesId)
  ]);

  if (!product || !seriesRaw) {
    notFound();
  }

  // Defensive mapping to SeriesMetadata
  const series = mapProductSeriesToSeriesMetadata(seriesRaw, 'school-furniture');

  // Map SeriesMetadata to ProductSeries for compatibility
  const mapSeriesMetadataToProductSeries = (series: SeriesMetadata): ProductSeries => ({
    id: series.id,
    title: series.title,
    description: series.description,
    seoDescription: series.seoDescription,
    category: typeof series.category === 'string' ? series.category : undefined,
    imageUrl: series.imageUrl,
    coverImage: series.coverImage as any, // ImageAsset to ProductImage (fields are compatible)
    images: series.images as any, // ImageAsset[] to ProductImage[]
    features: series.features,
    lastModified: typeof series.lastModified === 'string' ? series.lastModified : (series.lastModified instanceof Date ? series.lastModified.toISOString() : undefined),
    products: series.products,
  });

  return (
    <ProductPageLayout product={product} category="school-furniture" series={mapSeriesMetadataToProductSeries(series)} />
  );
}
