import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { getAllSeries, getRevalidateTime } from '@/lib/services/product-service';

export const revalidate = getRevalidateTime();

export default async function DesksPage() {
  const seriesData = await getAllSeries('desks');
  const items = Object.values(seriesData || {}) as any[];
  return <CategoryPageTemplate categoryId="desks" items={items} />;
}
