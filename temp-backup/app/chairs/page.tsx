import { Metadata } from "next";
import Link from "next/link";
import { productCatalog } from "@/lib/data/product-catalog";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Office Chairs | SteelMade Furniture",
  description: "Explore our complete collection of ergonomic office chairs including executive, task, and director chairs designed for comfort and style.",
};

export default function ChairsPage() {
  // Get all series in the chairs category
  const seriesCollection = Object.values(productCatalog.chairs || {});
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Office Chairs</h1>
      <p className="text-lg mb-8">
        Our office chairs combine ergonomic design with durability and style. 
        From executive chairs to task seating, find the perfect chair for your workspace.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seriesCollection.map((series) => (
          <div key={series.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <Link href={`/chairs/${series.id}`}>
              <div className="aspect-video relative">
                {series.imageUrl && (
                  <Image 
                    src={series.imageUrl}
                    alt={series.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{series.title}</h2>
                <p className="mt-2 text-gray-600">{series.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
