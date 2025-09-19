
import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import marvelWorkstation from '../../../../lib/data/products/modular-furniture/workstations/marvel-workstation/index';

export default function MarvelWorkstationPage() {
  return (
    <ProductDetailLayout
      product={marvelWorkstation}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
