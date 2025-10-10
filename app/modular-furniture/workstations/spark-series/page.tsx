import ProductDetailLayout from '../../../../components/products/ProductDetailLayout';
import sparkSeries from '../../../../lib/data/products/modular-furniture/workstations/spark-series/index';

export default function SparkSeriesPage() {
  return (
    <ProductDetailLayout
      product={{
        ...sparkSeries,
        seriesId: 'workstations' // Override to fix breadcrumb navigation
      }}
      layoutOptions={{ imagePosition: 'left' }}
    />
  );
}
