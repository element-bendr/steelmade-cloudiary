import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import impressSeries from '../../../../lib/data/products/modular-furniture/workstations/impress-series/index';

export default function ImpressSeriesPage() {
  return (
    <ProductDetailLayout
      product={impressSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
