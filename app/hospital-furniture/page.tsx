import { Metadata } from 'next';
import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { getAllSeries } from '../../lib/services/product-service';
import { getCategory } from '../../lib/data/products/categories';
import type { ProductSeries } from '../../lib/data/product-types';

export async function generateMetadata(): Promise<Metadata> {
  const category = getCategory('hospital-furniture');
  
  if (!category) {
    return {
      title: 'Hospital Furniture - SteelMade',
      description: 'Professional hospital furniture solutions',
    };
  }

  const seriesData = await getAllSeries('hospital-furniture');
  const seriesCount = Object.keys(seriesData || {}).length;
  
  return {
    title: `${category.name} - Medical & Healthcare Furniture | SteelMade`,
    description: `${category.description} Explore ${seriesCount} professional series designed for healthcare environments.`,
    keywords: ['hospital furniture', 'medical furniture', 'healthcare equipment', 'medical chairs', 'hospital beds', 'medical storage'],
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

export default async function HospitalFurniturePage() {
  const seriesData = await getAllSeries('hospital-furniture');
  const items = Object.values(seriesData || {}) as ProductSeries[];

  return <CategoryPageTemplate categoryId="hospital-furniture" items={items} />;
}