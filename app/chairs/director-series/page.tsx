import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductSeriesPage from "@/components/products/ProductSeriesPage";
import { productCatalog } from "@/lib/data/product-catalog";
import { ProductData } from "@/types/products";

export const metadata: Metadata = {
  title: "Director Series | SteelMade Office Chairs",
  description: "Professional director chairs offering versatile and durable seating solutions for film sets and productions.",
};

export default function DirectorSeriesPage() {
  const category = "chairs";
  const seriesId = "director-series";
  
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