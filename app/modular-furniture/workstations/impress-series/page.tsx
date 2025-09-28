import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import impressSeries from '../../../../lib/data/products/modular-furniture/workstations/impress-series/index';

export default function ImpressSeriesPage() {
  return (
    <ProductDetailLayout
      product={{
        ...impressSeries,
        seriesId: 'workstations' // Override to fix breadcrumb navigation
      }}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
