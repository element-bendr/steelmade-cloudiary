import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import neoSeries from '../../../../lib/data/products/modular-furniture/workstations/neo-series/index';

export default function NeoSeriesPage() {
  return (
    <ProductDetailLayout
      product={{
        ...neoSeries,
        seriesId: 'workstations' // Override to fix breadcrumb navigation
      }}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
