import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import hexaSeries from '../../../../lib/data/products/modular-furniture/workstations/hexa-series/index';

export default function HexaSeriesPage() {
  return (
    <ProductDetailLayout
      product={hexaSeries}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
