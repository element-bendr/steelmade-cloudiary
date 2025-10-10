import CategoryPageTemplate from '../../../components/templates/CategoryPageTemplate';
import { getAllSeries, getRevalidateTime } from '@/lib/services/product-service';

export const revalidate = getRevalidateTime();

export default async function WorkstationsPage() {
  // Get modular-furniture data and extract workstations
  const modularData = await getAllSeries('modular-furniture');
  if (!modularData || !modularData.workstations) {
    return <div>Workstations not found.</div>;
  }

  // Extract the workstations series data - workstations is already a ProductSeries
  const workstationsData = modularData.workstations;
  
  // Extract individual products from the workstations series
  const products = Object.values(workstationsData.products || {});
  
  // Convert products to the format expected by CategoryPageTemplate
  // Each product needs to be treated as a "series" with its own id for routing
  const items = products.map(product => ({
    id: product.id,
    title: product.name,
    description: product.description,
    seoDescription: product.description || `Discover the ${product.name} - premium workstation for modern workspaces.`,
    coverImage: {
      url: product.imageUrl,
      alt: product.name,
      width: 800,
      height: 600
    },
    products: { [product.id]: product }
  }));
  
  return <CategoryPageTemplate categoryId="modular-furniture/workstations" items={items} />;
}
