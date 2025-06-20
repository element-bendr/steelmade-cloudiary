import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChairCard } from "@/components/products/ChairCard";
import { productCatalog } from "@/lib/data/product-catalog";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Executive Series | SteelMade Office Chairs",
  description: "Premium executive seating designed for comfort and prestige in corporate environments.",
};

// Collect all executive series chairs from the modular catalog
const executiveSeries = productCatalog.chairs?.["executive-series"];
const chairs = executiveSeries ? Object.values(executiveSeries.products) : [];

export default function ExecutiveSeriesPage() {
  if (!executiveSeries) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Chairs", href: "/chairs" },
    { name: "Executive Series", href: "/chairs/executive-series" },
  ];

  return (
    <div className="container mx-auto py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Executive Series Chairs</h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Discover our premium Executive Series chairs, designed for leaders who demand the highest standards of comfort and prestige. Each chair is a statement of excellence and refined taste.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chairs.map((chair: any) => (
          <ChairCard key={chair.id} chair={chair} basePath="/chairs/executive-series" />
        ))}
      </div>
    </div>
  );
}