import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import rockSeries from '../../../../lib/data/products/modular-furniture/workstations/rock-series/index';

export default function RockSeriesPage() {
  return (
    <ProductDetailLayout
      product={rockSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
