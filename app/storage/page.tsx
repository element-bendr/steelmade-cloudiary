// filepath: e:\steelmadewebsite\app\storage\page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllSeries } from '@/lib/services/product-service'; // Corrected function import
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/utils/image-utils';
import type { ProductCategory } from '@/types/collections'; // Import ProductCategory

export default async function StoragePage() {
  // Fetch all series for storage-solutions.
  const seriesData = await getAllSeries('storage-solutions' as ProductCategory);
  
  // Convert the record of series to an array for mapping
  const seriesList = seriesData ? Object.values(seriesData) : [];

  // Placeholder data if seriesList is empty (can be removed if API always returns data or if a loading state is preferred)
  if (seriesList.length === 0) {
    seriesList.push(...[
      {
        id: 'modular-storage-series',
        title: 'Modular Storage',
        description: 'Versatile and configurable storage units.',
        coverImage: { url: '/images/stock/storage-solution-1.webp', alt: 'Modular Storage System', width: 800, height: 600 },
        images: [],
        category: 'storage-solutions' as ProductCategory, // Assert type
        features: [],
        lastModified: new Date(),
        products: {},
        seoDescription: '',
      },
      {
        id: 'heavy-duty-racking',
        title: 'Heavy-Duty Racking',
        description: 'Robust racking for industrial use.',
        coverImage: { url: '/images/stock/racking-system-2.webp', alt: 'Heavy Duty Racking', width: 800, height: 600 },
        images: [],
        category: 'storage-solutions' as ProductCategory, // Assert type
        features: [],
        lastModified: new Date(),
        products: {},
        seoDescription: '',
      },
      {
        id: 'office-cabinets',
        title: 'Office Cabinets',
        description: 'Secure and stylish office cabinets.',
        coverImage: { url: '/images/stock/office-cabinet-1.webp', alt: 'Office Cabinet', width: 800, height: 600 },
        images: [],
        category: 'storage-solutions' as ProductCategory, // Assert type
        features: [],
        lastModified: new Date(),
        products: {},
        seoDescription: '',
      },
      {
        id: 'no-image-series',
        title: 'Future Storage Line',
        description: 'Exciting new products coming soon.',
        coverImage: { url: '/images/placeholder.jpg', alt: 'Placeholder Image', width: 800, height: 600 }, // Provide a placeholder ImageAsset
        images: [],
        category: 'storage-solutions' as ProductCategory, // Assert type
        features: [],
        lastModified: new Date(),
        products: {},
        seoDescription: '',
      },
      {
        id: "storage-placeholder-1",
        title: "Placeholder Storage Series 1",
        description: "This is a placeholder description for a storage series.",
        coverImage: {
          url: "/images/placeholder.jpg",
          alt: "Placeholder Image",
          width: 800,
          height: 600,
        },
        images: [],
        category: "storage-solutions" as ProductCategory,
        features: [],
        lastModified: new Date(),
        products: {},
        seoDescription: "SEO description for placeholder storage series 1.",
      },
      {
        id: "storage-placeholder-2",
        title: "Placeholder Storage Series 2",
        description: "Another placeholder for a different storage series.",
        coverImage: {
          url: "/images/placeholder.jpg",
          alt: "Placeholder Image 2",
          width: 800,
          height: 600,
        },
        images: [],
        category: "storage-solutions" as ProductCategory,
        features: [],
        lastModified: new Date(),
        products: {},
        seoDescription: "SEO description for placeholder storage series 2.",
      },
      {
        id: "heavy-duty-shelving",
        title: "Heavy-Duty Shelving",
        description: "Robust shelving units for industrial and commercial storage.",
        coverImage: {
          url: "/images/stock/storage-placeholder-1.webp",
          alt: "Heavy-duty shelving unit",
          width: 800,
          height: 600,
        },
        images: [],
        category: "storage-solutions" as ProductCategory, // Corrected category value and type assertion
        features: [],
        lastModified: new Date(),
        products: {},
        seoDescription: "Durable heavy-duty shelving for all your storage needs.",
      },
      {
        id: "modular-cabinets",
        title: "Modular Cabinets",
        description: "Versatile and configurable cabinet systems.",
        coverImage: {
          url: "/images/stock/storage-placeholder-2.webp",
          alt: "Modular cabinet system",
          width: 800,
          height: 600,
        },
        images: [],
        category: "storage-solutions" as ProductCategory, // Corrected category value and type assertion
        features: [],
        lastModified: new Date(),
        products: {},
        seoDescription: "Customizable modular cabinets for efficient organization.",
      },
    ]);
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Storage Solutions</h1>
      <p className="mb-12 text-lg text-center text-muted-foreground">
        Browse our wide range of storage solutions, from modular systems to heavy-duty racking.
      </p>

      {seriesList && seriesList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {seriesList.map((series) => {
            const imageUrl = getImageUrl(series.coverImage) || "/images/placeholder.jpg"; // Handle fallback outside
            return (
              <Card key={series.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative h-52">
                  <Image
                    src={imageUrl} // Use the potentially fallback URL
                    alt={series.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">{series.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{series.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/storage-solutions/${series.id}`}>View Series</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No storage series available at the moment. Please check back later.</p>
      )}
    </div>
  );
}
