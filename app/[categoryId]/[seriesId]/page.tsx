import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductSeriesPage from '../../../components/products/ProductSeriesPage';
import { SanityProductService, MappedProduct } from '../../../lib/services/sanity-product-service';

interface SeriesPageProps {
  params: {
    categoryId: string;
    seriesId: string;
  };
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { categoryId, seriesId } = params;
  
  if (categoryId === 'images' || categoryId.includes('.')) return {};

  const category = await SanityProductService.getCategoryWithProducts(categoryId);
  
  if (!category || !category.series[seriesId]) {
    return {
      title: 'Series Not Found - SteelMade Furniture',
    };
  }

  const series = category.series[seriesId];
  return {
    title: `${series.title} Series ${category.name} | SteelMade`,
    description: `Explore our premium ${series.title.toLowerCase()} series ${category.name.toLowerCase()}.`,
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { categoryId, seriesId } = params;
  
  if (categoryId === 'images' || categoryId.includes('.')) {
    notFound();
  }

  const category = await SanityProductService.getCategoryWithProducts(categoryId);

  if (!category || !category.series[seriesId]) {
    notFound();
  }

  const series = category.series[seriesId];
  // Filter products explicitly tied to this series and map them
  const seriesProducts = Object.values(series.products);
  
  return (
    <ProductSeriesPage seriesId={seriesId}
      category={categoryId}
      title={series.title}
      description={series.description || `Premium ${category.name} in our ${series.title} series`}
      products={seriesProducts}
      coverImage={seriesProducts[0]?.imageUrl}
    />
  );
}

export const revalidate = 3600;
