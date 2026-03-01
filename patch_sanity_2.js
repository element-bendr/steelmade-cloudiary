const fs = require('fs');
let code = fs.readFileSync('lib/modules/product/sanity-repository.ts', 'utf8');

code = code.replace(/seoDescription: series.description/g, 'description: series.description');
code = code.replace(/category: category/g, ''); // Object literal may only specify known properties, and 'category' does not exist in type 'ProductSeries'

code = code.replace(/const product: ExtendedProductData = {[\s\S]*?id: sanityProduct.id,/g,
  `const product: ExtendedProductData = {
      id: sanityProduct.id,
      specifications: {},`
);

fs.writeFileSync('lib/modules/product/sanity-repository.ts', code);
