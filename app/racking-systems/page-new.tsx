import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { getAllSeries } from '../../lib/services/product-service';
import type { ProductSeries } from '../../lib/data/product-types';

export default async function RackingSystemsPage() {
  const seriesData = await getAllSeries('racking-systems');
  const items = Object.values(seriesData || {}) as ProductSeries[];

  return <CategoryPageTemplate categoryId="racking-systems" items={items} />;
}