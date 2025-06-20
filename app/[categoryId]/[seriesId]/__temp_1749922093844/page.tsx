import { Metadata } from 'next';
import { 
  ROUTE_PARAMS, 
  extractNestedSeriesParams,
  buildSeriesPath,
  buildCategoryPath
} from '@/lib/routes/route-config';
import Link from 'next/link';

/**
 * This component demonstrates the correct way to handle nested routes with similar parameters.
 * Note the use of seriesId1 as the parameter name to avoid duplicate parameter errors.
 */

interface NestedSeriesPageProps {
  params: {
    // Note: Using constants from route-config.ts ensures consistency
    [ROUTE_PARAMS.CATEGORY]: string;
    [ROUTE_PARAMS.SERIES]: string;
    [ROUTE_PARAMS.SERIES1]: string; // Use seriesId1, not seriesId to avoid duplicates
  };
}

export async function generateMetadata({
  params,
}: NestedSeriesPageProps): Promise<Metadata> {
  // Extract parameters using the utility function
  const { categoryId, seriesId, nestedSeriesId } = extractNestedSeriesParams(params);
  
  return {
    title: `${nestedSeriesId} in ${seriesId} - SteelMade Furniture`,
    description: `Browse the ${nestedSeriesId} sub-series within our ${seriesId} collection.`,
  };
}

export default function NestedSeriesPage({ params }: NestedSeriesPageProps) {
  // Extract parameters using the utility function
  const { categoryId, seriesId, nestedSeriesId } = extractNestedSeriesParams(params);
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href={buildCategoryPath(categoryId)} className="text-gray-700 hover:text-blue-600">
                  {categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ')}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href={buildSeriesPath(categoryId, seriesId)} className="text-gray-700 hover:text-blue-600">
                  {seriesId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">
                  {nestedSeriesId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">
        {nestedSeriesId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </h1>
      
      <div className="bg-blue-50 p-4 mb-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Route Parameter Structure Example</h2>
        <p className="mb-2">This page demonstrates correct nested route parameter naming:</p>
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
          {`URL: /${categoryId}/${seriesId}/${nestedSeriesId}
Parameter Names:
- categoryId: ${categoryId}
- seriesId: ${seriesId}
- seriesId1: ${nestedSeriesId} (Note: using seriesId1, not seriesId)`}
        </pre>
      </div>
      
      <div className="prose max-w-none">
        <p>
          This is a sub-series page that demonstrates how to handle nested routes with similar parameter types.
          Instead of using the same parameter name twice (which would cause a Next.js error), we use indexed
          parameter names like <code>seriesId1</code> for the nested parameter.
        </p>
        
        <h2>Why This Works</h2>
        <p>
          Next.js requires that each dynamic parameter in a single path must have a unique name.
          Using the same parameter name twice (like <code>[seriesId]</code> inside another <code>[seriesId]</code>)
          will cause the error:
        </p>
        
        <pre>
          Error: You cannot have the same slug name "seriesId" repeat within a single dynamic path
        </pre>
        
        <p>
          Our solution with <code>route-config.ts</code> provides consistent parameter naming and helper
          functions for extracting these parameters cleanly.
        </p>
        
        <h2>Nested Route Structure</h2>
        <pre>
{`app/
├── [categoryId]/
│   ├── [seriesId]/
│   │   ├── [seriesId1]/   # Using seriesId1, not seriesId
│   │   │   └── page.tsx   # This file`}
        </pre>
      </div>
    </div>
  );
}