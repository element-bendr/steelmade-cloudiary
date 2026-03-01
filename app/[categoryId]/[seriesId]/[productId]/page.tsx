import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import { SanityProductService } from '../../../../lib/services/sanity-product-service';

interface ProductPageProps {
  params: {
    categoryId: string;
    seriesId: string;
    productId: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { categoryId, seriesId, productId } = params;

  if (categoryId === 'images' || categoryId.includes('.')) return {};

  const category = await SanityProductService.getCategoryWithProducts(categoryId);
  const series = category?.series[seriesId];
  const product = series?.products[productId];

  if (!product) {
    return {
      title: 'Product Not Found - SteelMade Furniture',
    };
  }

  return {
    title: `${product.name} - ${series?.title} | SteelMade`,
    description: product.description || `Premium ${product.name} from our ${series?.title} series.`,
    openGraph: {
      title: `${product.name} | SteelMade Furniture`,
      description: product.description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { categoryId, seriesId, productId } = params;
  
  if (categoryId === 'images' || categoryId.includes('.')) {
    notFound();
  }

  const category = await SanityProductService.getCategoryWithProducts(categoryId);

  const series = category.series[seriesId];

  const product = series.products[productId];

  return (
    <ProductDetailLayout 
      product={product as any} 
      seriesId={seriesId}
      categoryId={categoryId}
    />
  );
}

export const revalidate = 3600;
