const fs = require('fs');
let code = fs.readFileSync('components/products/ProductSeriesPage.tsx', 'utf8');

const regex = /interface ProductSeriesPageProps \{[\s\S]*?seriesId: string\n\}/;

code = code.replace(
  regex,
  `interface ProductSeriesPageProps {\n  title?: string;\n  description?: string;\n  coverImage?: string;\n  features?: any[];\n  products: any[];\n  category: string;\n  seriesId: string;\n}`
);

fs.writeFileSync('components/products/ProductSeriesPage.tsx', code);
