import { notFound } from 'next/navigation';
import { getProductDetails, getSeriesByCategoryAndId } from '@/lib/api/products';
import type { Metadata, ResolvingMetadata } from 'next';
import ProductPageLayout from '@/components/products/ProductPageLayout';
import { getImageUrl } from '@/lib/utils/image-utils';

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
  const product = await getProductDetails(params.productId, params.seriesId, 'hospital-furniture');

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  // Defensive mapping for coverImage to ImageAsset
  const coverImage = product.coverImage
    ? {
        url: product.coverImage.url,
        alt: product.coverImage.alt,
        width: product.coverImage.width ?? 0,
        height: product.coverImage.height ?? 0,
      }
    : undefined;

  return {
    title: `${product.name} - SteelMade`,
    description: product.description,
    openGraph: {
      title: `${product.name} - SteelMade`,
      description: product.description,
      images: product.images?.length
        ? product.images.map((img: { url: string; alt: string }) => ({ url: img.url, alt: img.alt }))
        : (product.imageUrl ? [{ url: product.imageUrl, alt: product.name }] : coverImage ? [coverImage] : []),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, series] = await Promise.all([
    getProductDetails(params.productId, params.seriesId, 'hospital-furniture'),
    getSeriesByCategoryAndId('hospital-furniture', params.seriesId)
  ]);

  if (!product || !series) {
    notFound();
  }

  return (
    <ProductPageLayout product={product} category="hospital-furniture" series={series} />
  );
}
