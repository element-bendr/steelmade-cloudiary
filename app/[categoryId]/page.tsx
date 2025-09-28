import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { extractCategoryParams } from '../../lib/routes/route-config';
import { getCategory, getAllCategories } from '../../lib/data/products/categories';
import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { ProductSeries } from '../../lib/data/product-types';

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

// Generate static params for known categories to enable ISG
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

// Enhanced metadata generation with better SEO
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryId } = extractCategoryParams(params);
  const category = getCategory(categoryId);
  
  if (!category) {
    return {
      title: 'Category Not Found - SteelMade Furniture',
      description: 'The requested furniture category could not be found.',
    };
  }

  const seriesCount = Object.keys(category.series).length;
  const productCount = Object.values(category.series).reduce(
    (total, series) => total + Object.keys(series.products || {}).length,
    0
  );
  
  return {
    title: `${category.name} - Premium Furniture Collection | SteelMade`,
    description: `${category.description} Browse ${seriesCount} series with ${productCount} products in our ${category.name.toLowerCase()} collection.`,
    openGraph: {
      title: `${category.name} - SteelMade Furniture`,
      description: category.description,
      images: category.imageUrl ? [{ url: category.imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - SteelMade Furniture`,
      description: category.description,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = extractCategoryParams(params);
  
  // Filter out static asset requests that shouldn't be handled by product routes
  if (categoryId === 'images' || categoryId.includes('.')) {
    notFound();
  }
  
  const category = getCategory(categoryId);
  
  // Use Next.js notFound() for better SEO and user experience
  if (!category) {
    notFound();
  }
  
  // Convert series to items format expected by CategoryPageTemplate
  const items = Object.values(category.series as Record<string, ProductSeries>)
    .filter(series => series); // Filter out invalid series

  return <CategoryPageTemplate categoryId={categoryId} items={items} />;
}

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour