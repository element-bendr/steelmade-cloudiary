import { Metadata } from 'next';
import { 
  ROUTE_PARAMS, 
  extractSeriesParams, 
  buildProductPath 
} from '@/lib/routes/route-config';
import { getProductsBySeries } from '@/lib/modules/product';
import Link from 'next/link';
import Image from 'next/image';

/**
 * This component demonstrates proper parameter naming and extraction
 * using our route conventions and utilities for series pages.
 */

interface SeriesPageProps {
  params: {
    // Note: Using constants from route-config.ts ensures consistency
    [ROUTE_PARAMS.CATEGORY]: string;
    [ROUTE_PARAMS.SERIES]: string;
  };
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  // Extract parameters using the utility function
  const { categoryId, seriesId } = extractSeriesParams(params);
  
  const formattedSeriesName = seriesId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${formattedSeriesName} - SteelMade Furniture`,
    description: `Explore our ${formattedSeriesName} collection in the ${categoryId.replace('-', ' ')} category.`,
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  // Extract parameters using the utility function
  const { categoryId, seriesId } = extractSeriesParams(params);
  
  try {
    // Fetch products data using the extracted parameters
    const products = await getProductsBySeries(seriesId, categoryId as any);
    
    const formattedSeriesName = seriesId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    if (!products.length) {
      return (
        <div className="container mx-auto py-12 px-4">
          <Link href={`/${categoryId}`} className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to {categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ')}
          </Link>
          
          <h1 className="text-3xl font-bold mb-8">{formattedSeriesName}</h1>
          <p>No products found in this series.</p>
        </div>
      );
    }
    
    return (
      <div className="container mx-auto py-12 px-4">
        <Link href={`/${categoryId}`} className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to {categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ')}
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">{formattedSeriesName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 relative">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <Link 
                  href={buildProductPath(categoryId, seriesId, product.id)}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="container mx-auto py-12 px-4">
        <Link href={`/${categoryId}`} className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to {categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ')}
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">
          {seriesId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h1>
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }
}