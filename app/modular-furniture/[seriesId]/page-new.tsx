// Simple, direct implementation for modular-furniture series pages
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface ModularFurnitureSeriesPageProps {
  params: {
    seriesId: string;
  };
}

export const revalidate = 3600;

// Direct data access without complex services
function getWorkstationsData() {
  try {
    // Import workstations data directly
    const { workstationsSeries } = require('@/lib/data/products/modular-furniture/workstations');
    return workstationsSeries;
  } catch (error) {
    console.error('Error loading workstations data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ModularFurnitureSeriesPageProps): Promise<Metadata> {
  if (params.seriesId === 'workstations') {
    return {
      title: 'Workstations | Modular Furniture | SteelMade',
      description: 'Explore our collection of modular workstations designed for modern offices.',
    };
  }
  
  return {
    title: 'Modular Furniture | SteelMade',
    description: 'Explore our modular furniture collection.',
  };
}

export default function ModularFurnitureSeriesPage({ params }: ModularFurnitureSeriesPageProps) {
  console.log('[ModularFurniture] Loading series:', params.seriesId);
  
  // Handle workstations specifically
  if (params.seriesId === 'workstations') {
    const workstationsData = getWorkstationsData();
    
    if (!workstationsData || !workstationsData.products) {
      console.log('[ModularFurniture] No workstations data found');
      return (
        <div className="min-h-screen py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Workstations</h1>
            <p>No workstation products found.</p>
            <Link href="/modular-furniture" className="text-blue-600 hover:underline mt-4 inline-block">
              ← Back to Modular Furniture
            </Link>
          </div>
        </div>
      );
    }

    const products = Object.values(workstationsData.products);
    console.log('[ModularFurniture] Found', products.length, 'workstation products');
    
    return (
      <div className="min-h-screen py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link href="/modular-furniture" className="text-blue-600 hover:underline mb-4 inline-block">
              ← Back to Modular Furniture
            </Link>
            <h1 className="text-4xl font-bold mb-4">{workstationsData.title}</h1>
            <p className="text-lg text-gray-600 mb-8">{workstationsData.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 relative bg-gray-100">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="p-4"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                    <Link 
                      href={`/modular-furniture/workstations/${product.id}`}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // For other series, show not found
  console.log('[ModularFurniture] Series not supported:', params.seriesId);
  notFound();
}

export function generateStaticParams() {
  return [
    { seriesId: 'workstations' }
  ];
}