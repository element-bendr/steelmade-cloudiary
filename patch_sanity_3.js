const fs = require('fs');
let code = fs.readFileSync('lib/modules/product/sanity-repository.ts', 'utf8');

code = code.replace(/seoDescription/g, 'description');
code = code.replace(/category: category,\r?\n\s*category: category/g, 'category: category');

// Fix the missing specifications property
code = code.replace(
  /const product: ExtendedProductData = {\r?\n\s*id: sanityProduct\.id,\r?\n\s*name/g,
  `const product: ExtendedProductData = {\n        id: sanityProduct.id,\n        specifications: {},\n        name`
);

fs.writeFileSync('lib/modules/product/sanity-repository.ts', code);
