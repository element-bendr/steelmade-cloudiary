import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import elevateSeries from '../../../../lib/data/products/modular-furniture/workstations/elevate-series/index';

export default function ElevateSeriesPage() {
  return (
    <ProductDetailLayout
      product={elevateSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
