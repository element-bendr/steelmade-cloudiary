import { notFound } from 'next/navigation';
import { getProductById, getSeriesById } from '@/lib/services/product-service';
import type { Metadata, ResolvingMetadata } from 'next';
import ProductPageLayout from '@/components/products/ProductPageLayout';

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
  const product = await getProductById('racking-systems', params.seriesId, params.productId);

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
      images: product.images?.length ? product.images.map(img => ({ url: img.url, alt: img.alt })) : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, series] = await Promise.all([
    getProductById('racking-systems', params.seriesId, params.productId),
    getSeriesById('racking-systems', params.seriesId)
  ]);

  if (!product || !series) {
    notFound();
  }

  // Defensive mapping: convert ProductSeries to SeriesMetadata
  const mapProductSeriesToSeriesMetadata = (series: any): import('@/types/collections').SeriesMetadata => ({
    id: series.id,
    title: series.title ?? '',
    description: series.description ?? '',
    seoDescription: series.seoDescription ?? '',
    features: series.features ?? [],
    lastModified: series.lastModified ?? '',
    products: series.products ?? {},
    category: series.category ?? 'racking-systems',
    imageUrl: series.imageUrl ?? '',
    specifications: series.specifications ?? {},
    tags: series.tags ?? [],
    coverImage: {
      url: series.coverImage?.url ?? '',
      width: series.coverImage?.width ?? 0,
      height: series.coverImage?.height ?? 0,
      alt: series.coverImage?.alt ?? '',
    },
    images: Array.isArray(series.images)
      ? series.images.map((img: any) => ({
          url: img.url ?? '',
          width: img.width ?? 0,
          height: img.height ?? 0,
          alt: img.alt ?? '',
        }))
      : [],
  });

  // Map SeriesMetadata to ProductSeries for compatibility
  const mapSeriesMetadataToProductSeries = (series: import('@/types/collections').SeriesMetadata): import('@/lib/data/product-types').ProductSeries => ({
    id: series.id,
    title: series.title,
    description: series.description,
    seoDescription: series.seoDescription,
    category: typeof series.category === 'string' ? series.category : undefined,
    imageUrl: series.imageUrl,
    coverImage: series.coverImage,
    images: series.images,
    features: series.features,
    lastModified: typeof series.lastModified === 'string' ? series.lastModified : (series.lastModified instanceof Date ? series.lastModified.toISOString() : undefined),
    products: series.products,
  });

  const mappedSeries = mapProductSeriesToSeriesMetadata(series);

  return (
    <ProductPageLayout product={product} category="racking-systems" series={mapSeriesMetadataToProductSeries(mappedSeries)} />
  );
}
