import { ProductCategory } from './categories';
import { client } from '@/lib/sanity/client';
import { getAllSeriesInCategory } from '@/lib/modules/product';
import { ProductCategorySlug } from '@/types/product-categories';

export async function getCategoryAsync(categoryId: string): Promise<ProductCategory | undefined> {
  const categoryDoc = await client.fetch(`*[_type == "category" && slug.current == $categoryId || id == $categoryId][0]`, { categoryId });
  
  // For categories not yet in Sanity (like tables, modular-furniture), 
  // we fallback to the local static synchronous function if possible.
  if (!categoryDoc) {
    const { getCategory } = await import('./categories');
    return getCategory(categoryId);
  }

  const series = await getAllSeriesInCategory(categoryId as ProductCategorySlug);
  
  return {
    id: categoryDoc.id || categoryId,
    name: categoryDoc.name || categoryDoc.title,
    description: categoryDoc.description,
    imageUrl: categoryDoc.imageUrl || '',
    series: series,
  };
}
