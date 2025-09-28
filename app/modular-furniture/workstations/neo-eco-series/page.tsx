import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import neoEcoSeries from '../../../../lib/data/products/modular-furniture/workstations/neo-eco-series/index';

export default function NeoEcoSeriesPage() {
  return (
    <ProductDetailLayout
      product={{
        ...neoEcoSeries,
        seriesId: 'workstations' // Override to fix breadcrumb navigation
      }}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
