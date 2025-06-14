import { notFound } from 'next/navigation';
import { getProductDetails, getSeriesByCategoryAndId } from '@/lib/api/products';
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
  const product = await getProductDetails(params.productId, params.seriesId, 'storage-solutions');

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
  console.log('[ProductDetailPage] Received params:', params); // Log received params

  const [product, series] = await Promise.all([
    getProductDetails(params.productId, params.seriesId, 'storage-solutions'),
    getSeriesByCategoryAndId('storage-solutions', params.seriesId)
  ]);

  console.log('[ProductDetailPage] Fetched product:', product); // Log fetched product
  console.log('[ProductDetailPage] Fetched series:', series); // Log fetched series

  if (!product || !series) {
    console.error('[ProductDetailPage] Product or Series not found. Product:', product, 'Series:', series); // Log if not found
    notFound();
  }

  return (
    <ProductPageLayout product={product} category="storage-solutions" series={series} />
  );
}
