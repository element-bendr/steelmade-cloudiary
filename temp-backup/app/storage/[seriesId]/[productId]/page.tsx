// filepath: e:\steelmadewebsite\app\storage\[seriesId]\[productId]\page.tsx
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    seriesId: string;
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // TODO: Fetch actual product data based on params.seriesId and params.productId
  // For now, we can simulate a notFound or return placeholder content.
  
  console.log(`Storage Product Page - Series ID: ${params.seriesId}, Product ID: ${params.productId}`);

  // Example: If product data isn't found for a real implementation
  // const product = await getProductDetails(params.category, params.seriesId, params.productId);
  // if (!product) {
  //   notFound();
  // }

  return (
    <div>
      <h1>Storage Product: {params.productId}</h1>
      <p>Series: {params.seriesId}</p>
      <p>Details for this product will be displayed here.</p>
      {/* Replace with actual product details layout */}
    </div>
  );
}

// Optional: Add generateMetadata function if needed
// export async function generateMetadata({ params }: ProductPageProps) {
//   // Fetch metadata based on params
//   return {
//     title: `Product ${params.productId} - Series ${params.seriesId}`,
//   };
// }
