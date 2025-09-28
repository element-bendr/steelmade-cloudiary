import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { chairs } from '../../lib/data/products/chairs';
import type { ProductSeries } from '../../lib/data/product-types';

export default function ChairsPage() {
  const items = Object.values(chairs || {}) as ProductSeries[];
  return <CategoryPageTemplate categoryId="chairs" items={items} />;
}
