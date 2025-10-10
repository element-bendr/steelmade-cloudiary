import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getSeriesById } from "@/lib/utils/product-utils";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import ProductDetailPage from "@/components/products/ProductDetailPage";

type ProductDetailPageProps = {
  params: {
    productType: string;
    seriesId: string;
    productId: string;
  };
};

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productType, seriesId, productId } = params;
  
  const product = getProductById(productType, seriesId, productId);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  
  return {
    title: `${product.name} | SteelMade Furniture`,
    description: product.description,
  };
}

export default function ProductDetailRoute({ params }: ProductDetailPageProps) {
  const { productType, seriesId, productId } = params;
  
  // Get the product and series data
  const product = getProductById(productType, seriesId, productId);
  const series = getSeriesById(productType, seriesId);
  
  // If product or series doesn't exist, show 404
  if (!product || !series) {
    console.error(`Product not found: ${productType}/${seriesId}/${productId}`);
    notFound();
  }
  
  return (
    <ErrorBoundary fallback={<div className="container py-16">Something went wrong loading this product. Please try again later.</div>}>
      <ProductDetailPage 
        product={product} 
        series={series}
        category={productType}
      />
    </ErrorBoundary>
  );
}