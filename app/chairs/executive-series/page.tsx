import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductSeriesPage from "@/components/products/ProductSeriesPage";
import { productCatalog } from "@/lib/data/product-catalog";
import { ProductData } from "@/types/products";

export const metadata: Metadata = {
  title: "Executive Series | SteelMade Office Chairs",
  description: "Premium executive seating designed for comfort and prestige in corporate environments.",
};

export default function ExecutiveSeriesPage() {
  const category = "chairs";
  const seriesId = "executive-series";
  
  // Get the series data from our catalog
  const series = productCatalog.chairs?.[seriesId];
  
  if (!series) {
    notFound();
  }
  
  // Get products for this series
  const products = Object.values(series.products) as ProductData[];
  
  return (
    <ProductSeriesPage
      category={category}
      seriesId={seriesId}
      series={series}
      products={products}
    />
  );
}