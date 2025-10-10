import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import eliteSeries from '../../../../lib/data/products/modular-furniture/workstations/elite-series/index';

export default function EliteSeriesPage() {
  return (
    <ProductDetailLayout
      product={{
        ...eliteSeries,
        seriesId: 'workstations' // Override to fix breadcrumb navigation
      }}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
