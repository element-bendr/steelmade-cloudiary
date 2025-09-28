import { Metadata } from 'next';
import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { getAllSeries } from '../../lib/services/product-service';
import { getCategory } from '../../lib/data/products/categories';
import type { ProductSeries } from '../../lib/data/product-types';

export async function generateMetadata(): Promise<Metadata> {
  const category = getCategory('racking-systems');
  
  if (!category) {
    return {
      title: 'Racking Systems - SteelMade',
      description: 'Industrial storage and racking solutions',
    };
  }

  const seriesData = await getAllSeries('racking-systems');
  const seriesCount = Object.keys(seriesData || {}).length;
  
  return {
    title: `${category.name} - Industrial Storage Solutions | SteelMade`,
    description: `${category.description} Browse ${seriesCount} series of heavy-duty racking and storage systems for industrial use.`,
    keywords: ['racking systems', 'industrial storage', 'warehouse racking', 'storage solutions', 'heavy duty shelving', 'commercial storage'],
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

export default async function RackingSystemsPage() {
  const seriesData = await getAllSeries('racking-systems');
  const items = Object.values(seriesData || {}) as ProductSeries[];

  return <CategoryPageTemplate categoryId="racking-systems" items={items} />;
}