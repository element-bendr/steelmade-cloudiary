import { Metadata } from 'next';
import { extractCategoryParams } from '../../lib/routes/route-config';
import { getCategory } from '../../lib/data/products/categories';
import { ProductGrid } from '../../components/products/ProductGrid';
import { ProductSeries } from '../../lib/data/product-types';
import type { ExtendedProductData } from '../../lib/data/product-types';

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryId } = extractCategoryParams(params);
  const category = getCategory(categoryId);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  
  return {
    title: `${category.name} - SteelMade Furniture`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = extractCategoryParams(params);
  const category = getCategory(categoryId);
  
  if (!category) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="bg-red-100 p-4 rounded-md">
          <h2 className="text-xl text-red-700">Category Not Found</h2>
          <p className="text-red-600">The category you are looking for could not be found.</p>
        </div>
      </div>
    );
  }
  
  // Extract all products from all series in this category
  const products = Object.values(category.series as Record<string, ProductSeries>).flatMap(series => 
    Object.values(series.products || {})
  ) as ExtendedProductData[];
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <p className="mb-8 text-lg text-gray-700">{category.description}</p>
      
      <ProductGrid products={products} />
    </div>
  );
}