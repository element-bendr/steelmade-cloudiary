// app/modular-furniture/page.tsx
import CategoryPageTemplate from '../../components/templates/CategoryPageTemplate';
import { getCategoryData, getRevalidateTime } from '@/lib/services/product-service';

export const revalidate = getRevalidateTime();

export default async function ModularFurniturePage() {
  const categoryData = await getCategoryData('modular-furniture');
  if (!categoryData) return <div>Category not found.</div>;

  const items = (categoryData.series || []) as any[];
  return <CategoryPageTemplate categoryId="modular-furniture" items={items} />;
}
