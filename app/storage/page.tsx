import { Metadata } from 'next';
import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { getAllSeries } from '../../lib/services/product-service';
import { getCategory } from '../../lib/data/products/categories';
import type { ProductSeries } from '../../lib/data/product-types';

export async function generateMetadata(): Promise<Metadata> {
  const category = getCategory('storage');
  
  if (!category) {
    return {
      title: 'Storage Solutions - SteelMade',
      description: 'Professional storage and organization solutions',
    };
  }

  const seriesData = await getAllSeries('storage-solutions');
  const seriesCount = Object.keys(seriesData || {}).length;
  
  return {
    title: `${category.name} - Professional Storage Solutions | SteelMade`,
    description: `${category.description} Explore ${seriesCount} series of durable, versatile storage systems for any space.`,
    keywords: ['storage solutions', 'office storage', 'industrial storage', 'modular storage', 'storage cabinets', 'shelving systems'],
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

export default async function StoragePage() {
  const seriesData = await getAllSeries('storage-solutions');
  const items = Object.values(seriesData || {}) as ProductSeries[];

  return <CategoryPageTemplate categoryId="storage" items={items} />;
}