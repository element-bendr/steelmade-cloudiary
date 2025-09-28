import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import curveSeries from '../../../../lib/data/products/modular-furniture/workstations/curve-series/index';

export default function CurveSeriesPage() {
  return (
    <ProductDetailLayout
      product={{
        ...curveSeries,
        seriesId: 'workstations' // Override to fix breadcrumb navigation
      }}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
