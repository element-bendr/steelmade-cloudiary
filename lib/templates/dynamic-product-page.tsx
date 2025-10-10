import { getProduct, getSeries } from '@/lib/modules/product';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailPage from '@/components/products/ProductDetailPage';
import { ExtendedProductData, ProductSeries } from '@/lib/utils/product-utils';

// Adapter function to handle type compatibility between the new module and the ProductDetailPage component
function adaptProductData(product: any): ExtendedProductData {
  return {
    ...product,
    variants: product.variants || [],
  };
}

// Adapter function to handle type compatibility for series data
function adaptSeriesData(series: any): ProductSeries {
  return {
    ...series,
    products: Object.entries(series.products).reduce((acc, [key, value]) => {
      acc[key] = adaptProductData(value);
      return acc;
    }, {} as Record<string, ExtendedProductData>),
  };
}

interface ProductDetailPageProps {
  params: {
    productId: string;
    seriesId: string;
    categoryId: string;
  };
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  try {
    const { categoryId, seriesId, productId } = params;
    const product = await getProduct(categoryId as any, seriesId, productId);
    
    return {
      title: product.name,
      description: product.description,      openGraph: {
        title: product.name,
        description: product.description,
        type: 'article', // Using article as it's a valid OpenGraphType
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product Detail',
      description: 'View product details',
    };
  }
}

export default async function ProductPage({ params }: ProductDetailPageProps) {
  const { categoryId, seriesId, productId } = params;
  
  try {
    // Use our new Product module to fetch the product
    const product = await getProduct(categoryId as any, seriesId, productId);
    const series = await getSeries(categoryId as any, seriesId);
    
    if (!product || !series) {
      notFound();
    }
      // Adapt data to match the expected types for the ProductDetailPage component
    const adaptedProduct = adaptProductData(product);
    const adaptedSeries = adaptSeriesData(series);
    
    return <ProductDetailPage 
      product={adaptedProduct} 
      series={adaptedSeries} 
      category={categoryId as any}
    />;
  } catch (error) {
    console.error(`Error loading product: ${categoryId}/${seriesId}/${productId}`, error);
    notFound();
  }
}