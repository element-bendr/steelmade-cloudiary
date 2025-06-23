import { notFound } from 'next/navigation';
import { getProductDetails } from '@/lib/services/product-service';
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
  const product = await getProductDetails('hospital-furniture', params.seriesId, params.productId);

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
      images: product.images?.length ? product.images.map(img => ({ url: img.url, alt: img.alt })) : (product.imageUrl ? [{ url: product.imageUrl, alt: product.name }] : []),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, seriesRaw] = await Promise.all([
    getProductDetails('hospital-furniture', params.seriesId, params.productId),
    (await import('@/lib/services/product-service')).getSeriesById('hospital-furniture', params.seriesId)
  ]);

  if (!product || !seriesRaw) {
    notFound();
  }

  // Defensive mapping: ensure all required fields for SeriesMetadata are present and non-optional
  const toImageAsset = (img: any): import('@/types/image-types').ImageAsset => ({
    url: img?.url ?? '',
    width: typeof img?.width === 'number' ? img.width : 0,
    height: typeof img?.height === 'number' ? img.height : 0,
    alt: img?.alt ?? '',
  });
  const series = seriesRaw
    ? {
        id: seriesRaw.id,
        title: seriesRaw.title ?? '',
        description: seriesRaw.description ?? '',
        seoDescription: seriesRaw.seoDescription ?? '',
        features: seriesRaw.features ?? [],
        lastModified: seriesRaw.lastModified ?? '',
        products: seriesRaw.products ?? {},
        category: 'hospital-furniture' as import('@/types/collections').ProductCategory,
        imageUrl: seriesRaw.imageUrl ?? '',
        specifications: {},
        tags: [],
        coverImage: toImageAsset(seriesRaw.coverImage),
        images: Array.isArray(seriesRaw.images) ? seriesRaw.images.map(toImageAsset) : [],
      }
    : null;

  return (
    <ProductPageLayout product={product} category="hospital-furniture" series={series} />
  );
}
