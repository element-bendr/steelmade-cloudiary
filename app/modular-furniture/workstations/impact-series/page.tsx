import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import impactSeries from '../../../../lib/data/products/modular-furniture/workstations/impact-series/index';

export default function ImpactSeriesPage() {
  return (
    <ProductDetailLayout
      product={impactSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
