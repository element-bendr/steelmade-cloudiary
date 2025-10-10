import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { getAllSeries, getRevalidateTime } from '@/lib/services/product-service';

export const revalidate = getRevalidateTime();

export default async function StorageSolutionsPage() {
  const seriesData = await getAllSeries('storage-solutions');
  const items = Object.values(seriesData || {}) as any[];
  return <CategoryPageTemplate categoryId="storage-solutions" items={items} />;
}
