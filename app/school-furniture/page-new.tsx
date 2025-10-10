import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { getAllSeries } from '../../lib/services/product-service';
import type { ProductSeries } from '../../lib/data/product-types';

export default async function SchoolFurniturePage() {
  const seriesData = await getAllSeries('school-furniture');
  const items = Object.values(seriesData || {}) as ProductSeries[];

  return <CategoryPageTemplate categoryId="school-furniture" items={items} />;
}