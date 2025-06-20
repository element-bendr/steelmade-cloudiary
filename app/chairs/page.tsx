import { getAllSeriesInCategory } from '@/lib/modules/product';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Chairs - SteelMade Furniture',
  description: 'Browse our premium chairs collection including director chairs, office chairs, and more.',
};

export default async function ChairsPage() {
  try {
    // Use our new Product module to fetch all chair series
    const allSeries = await getAllSeriesInCategory('chairs');
    
    if (!Object.keys(allSeries).length) {
      return (
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8">Chairs</h1>
          <p>No chair series found.</p>
        </div>
      );
    }
    
    return (
      <div className="container mx-auto py-12 px-4">
        <Breadcrumbs items={[
          { name: 'Home', href: '/' },
          { name: 'Chairs', href: '/chairs' },
        ]} />
        <h1 className="text-3xl font-bold mb-8">Chairs</h1>
        <p className="mb-8">Explore our premium chair collections designed for comfort and style.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(allSeries).map(([id, series]) => (
            <div 
              key={id} 
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{(series as any).name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{series.description}</p>
                <Link
                  href={`/chairs/${id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Series
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading chair series:', error);
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Chairs</h1>
        <p>Error loading chair series. Please try again later.</p>
      </div>
    );
  }
}
