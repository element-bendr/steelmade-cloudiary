const fs = require('fs');
let code = fs.readFileSync('components/products/ProductSeriesPage.tsx', 'utf8');

code = code.replace(
  /interface ProductSeriesPageProps {\n  features\?: any\[\];\n  features\?: any\[\];\n  series: ProductSeries\n  products: ProductSeries\["products"\] extends Record<string, infer T> \? T\[\] : never\n  category: string\n  seriesId: string\n}/g,
  `interface ProductSeriesPageProps {\n  title: string;\n  description?: string;\n  coverImage?: string;\n  features?: any[];\n  products: any[];\n  category: string;\n  seriesId: string;\n}`
);

fs.writeFileSync('components/products/ProductSeriesPage.tsx', code);
