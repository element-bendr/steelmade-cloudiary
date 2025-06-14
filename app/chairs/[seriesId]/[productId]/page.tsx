import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getSeriesById } from "@/lib/utils/product-utils";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

// Import the component directly now that we've created it
import ProductDetailPage from "@/components/products/ProductDetailPage";

type ProductDetailPageProps = {
  params: {
    seriesId: string;
    productId: string;
  };
};

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { seriesId, productId } = params;
  const categoryId = "chairs"; // Hardcoded for this route
  
  const product = getProductById(categoryId, seriesId, productId);
  
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
  const { seriesId, productId } = params;
  const categoryId = "chairs"; // Hardcoded for this route
  
  console.log('Attempting to fetch product:', { categoryId, seriesId, productId }); // Add debug logging
  
  // Get the product and series data
  const product = getProductById(categoryId, seriesId, productId);
  const series = getSeriesById(categoryId, seriesId);
  
  if (!product || !series) {
    console.error('Product or series not found:', {
      categoryId,
      seriesId,
      productId,
      productFound: !!product,
      seriesFound: !!series
    });
    notFound();
  }
  
  console.log('Product found:', product.name); // Confirm product was found
  
  return (
    <ErrorBoundary fallback={<div className="container py-16">Something went wrong loading this product. Please try again later.</div>}>
      <ProductDetailPage 
        product={product} 
        series={series}
        category={categoryId}
      />
    </ErrorBoundary>
  );
}
