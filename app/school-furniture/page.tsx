import { Metadata } from 'next';
import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { getAllSeries } from '../../lib/services/product-service';
import { getCategoryAsync } from '../../lib/data/products/categories-async';
import type { ProductSeries } from '../../lib/data/product-types';

export async function generateMetadata(): Promise<Metadata> {
  const category = await getCategoryAsync('school-furniture');
  
  if (!category) {
    return {
      title: 'School Furniture - SteelMade',
      description: 'Educational furniture solutions for schools and institutions',
    };
  }

  const seriesData = await getAllSeries('school-furniture');
  const seriesCount = Object.keys(seriesData || {}).length;
  
  return {
    title: `${category.name} - Educational Furniture Solutions | SteelMade`,
    description: `${category.description} Discover ${seriesCount} series of durable, ergonomic furniture for educational environments.`,
    keywords: ['school furniture', 'educational furniture', 'classroom furniture', 'student desks', 'school chairs', 'educational equipment'],
    openGraph: {
      title: `${category.name} - SteelMade Furniture`,
      description: category.description,
      type: 'website',
      images: category.imageUrl ? [{ 
        url: category.imageUrl,
        width: 1200,
        height: 630,
        alt: `${category.name} collection`
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - SteelMade Furniture`,
      description: category.description,
    },
  };
}

export default async function SchoolFurniturePage() {
  const seriesData = await getAllSeries('school-furniture');
  const items = Object.values(seriesData || {}) as ProductSeries[];

  return <CategoryPageTemplate categoryId="school-furniture" items={items} />;
}