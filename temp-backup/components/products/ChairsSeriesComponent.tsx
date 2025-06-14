import { getSeriesForCategory } from "@/lib/api/products";
import ProductCategoryPageLayout from "@/components/products/ProductCategoryPageLayout";
import { BreadcrumbItem } from "@/components/ui/Breadcrumbs";

export default async function ChairsSeriesComponent() {
  // This data fetch will be streamed
  const seriesData = await getSeriesForCategory("chairs");
  
  const pageTitle = "Chairs";
  const pageDescription = "Explore our diverse collection of high-quality chairs, designed for comfort, style, and durability. Find the perfect seating solution for your home or office.";
    // Using the format required by ProductCategoryPageLayout
  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "Chairs", item: "/chairs" }
  ];
  return (
    <ProductCategoryPageLayout
      category="chairs"
      seriesData={seriesData}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
