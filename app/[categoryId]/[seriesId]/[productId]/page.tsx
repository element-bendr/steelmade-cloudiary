import { Metadata } from "next";
import { 
  ROUTE_PARAMS, 
  extractProductParams,
  buildSeriesPath
} from '../../../../lib/routes/route-config';
import { getProductById } from '../../../../lib/api/products';
import Link from 'next/link';
import Image from 'next/image';

/**
 * This component demonstrates proper parameter naming and extraction
 * using our route conventions and utilities for product pages.
 */

interface ProductPageProps {
  params: {
    // Note: Using constants from route-config.ts ensures consistency
    [ROUTE_PARAMS.CATEGORY]: string;
    [ROUTE_PARAMS.SERIES]: string;
    [ROUTE_PARAMS.PRODUCT]: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  // Extract parameters using the utility function
  const { categoryId, seriesId, productId } = extractProductParams(params);
  
  try {
    const product = await getProductById(categoryId as any, seriesId, productId);
    if (!product) {
      return {
        title: 'Product Not Found - SteelMade Furniture',
        description: 'The requested product could not be found.',
      };
    }
    return {
      title: `${product.name} - SteelMade Furniture`,
      description: product.description,
    };
  } catch (error) {
    return {
      title: 'Product Not Found - SteelMade Furniture',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Extract parameters using the utility function
  const { categoryId, seriesId, productId } = extractProductParams(params);
  
  try {
    // Fetch product data using the extracted parameters
    const product = await getProductById(categoryId as any, seriesId, productId);
    if (!product) {
      return (
        <div className="container mx-auto py-12 px-4">
          <div className="bg-red-100 p-4 rounded-md">
            <h2 className="text-xl text-red-700">Product Not Found</h2>
            <p className="text-red-600">The product you are looking for could not be found.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="container mx-auto py-12 px-4">
        <Link href={buildSeriesPath(categoryId, seriesId)} className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to {seriesId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              {product.imageUrl && (
                <Image 
                  src={product.imageUrl}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              )}
            </div>
            
            {/* Additional images gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {product.images.map((image: { url: string; alt?: string }, index: number) => (
                  <Image
                    key={index}
                    src={image.url}
                    alt={image.alt || `${product.name} - Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain rounded"
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Key Features</h2>
                <ul className="list-disc pl-6 mt-4">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Key Features</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center rounded-full bg-red-700 text-white h-5 w-5 min-w-[1.25rem] text-xs mr-3 mt-0.5">{index + 1}</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Variants</h2>
                <ul className="list-disc pl-6">
                  {product.variants.map((variant: any, index: number) => (
                    <li key={index} className="text-gray-700">{variant.variantName || variant.name}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Call to Action */}
            <div className="mt-8 space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium">
                Contact for Pricing
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-md font-medium">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return (
      <div className="container mx-auto py-12 px-4">
        <Link href={buildSeriesPath(categoryId, seriesId)} className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Series
        </Link>
        
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you&apos;re looking for could not be found.</p>
          <Link 
            href={buildSeriesPath(categoryId, seriesId)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Browse Other Products
          </Link>
        </div>
      </div>
    );
  }
}