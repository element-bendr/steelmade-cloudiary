import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import curveSeries from '../../../../lib/data/products/modular-furniture/workstations/curve-series/index';

export default function CurveSeriesPage() {
  return (
    <ProductDetailLayout
      product={curveSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
