import { notFound } from 'next/navigation';
import { getProductDetails } from '@/lib/api/products';
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
  const product = await getProductDetails(params.productId, params.seriesId, 'desks');

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
        ? product.images.map((img: { url: string; alt: string }) => ({ url: img.url, alt: img.alt }))
        : (product.imageUrl ? [{ url: product.imageUrl, alt: product.name }] : []),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductDetails(params.productId, params.seriesId, 'desks');

  // TODO: Replace the following with a real series fetch if needed
  const series = null; // or fetch from a canonical source if available

  if (!product) {
    notFound();
  }

  return (
    <ProductPageLayout product={product} category="desks" series={series} />
  );
}
