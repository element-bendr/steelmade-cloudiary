import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SanityProductService } from '../../lib/services/sanity-product-service';
import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

// Generate static params for known categories to enable SSR/ISG
export async function generateStaticParams() {
  const categories = await SanityProductService.getAllCategoryPaths();
  
  if (!categories) return [];
  
  return categories.map((c: any) => ({
    categoryId: c.categoryId,
  }));
}

// Enhanced metadata generation with better SEO
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const categoryId = params.categoryId;
  
  // Skip invalid/system queries
  if (categoryId === 'images' || categoryId.includes('.')) {
    return { title: 'Not Found' };
  }
  
  const category = await SanityProductService.getCategoryWithProducts(categoryId);
  
  if (!category) {
    return {
      title: 'Category Not Found - SteelMade Furniture',
      description: 'The requested furniture category could not be found.',
    };
  }

  const seriesCount = category.series ? Object.keys(category.series).length : 0;
  
  let productCount = 0;
  if (category.series) {
    // If it's an array as per the mapping
    if (Array.isArray(category.series)) {
      productCount = category.series.reduce(
        (total: number, series: any) => total + (series.products ? (Array.isArray(series.products) ? series.products.length : Object.keys(series.products).length) : 0),
        0
      );
    } else {
      // If it's an object/record
      productCount = Object.values(category.series).reduce(
        (total: number, series: any) => total + (series.products ? Object.keys(series.products).length : 0),
        0
      );
    }
  }
  
  return {
    title: `${category.name} - Premium Furniture Collection | SteelMade`,
    description: `${category.description || ''} Browse ${seriesCount} series with ${productCount} products in our ${category.name.toLowerCase()} collection.`,
    openGraph: {
      title: `${category.name} - SteelMade Furniture`,
      description: category.description || '',
      images: category.imageUrl ? [{ url: category.imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - SteelMade Furniture`,
      description: category.description || '',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = params.categoryId;
  
  // Filter out static asset requests that shouldn't be handled by product routes
  if (categoryId === 'images' || categoryId.includes('.')) {
    notFound();
  }
  
  const category = await SanityProductService.getCategoryWithProducts(categoryId);
  
  // Use Next.js notFound() for better SEO and user experience
  if (!category) {
    notFound();
  }
  
  let items = [];
  
  if (category.series) {
    // Check if it's an object or an array and map accordingly
    items = Array.isArray(category.series) ? category.series : Object.values(category.series);
  }

  return <CategoryPageTemplate categoryId={categoryId} items={items as any} />;
}

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour
