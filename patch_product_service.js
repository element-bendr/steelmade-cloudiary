const fs = require('fs');
let code = fs.readFileSync('lib/services/product-service.ts', 'utf8');

code = code.replace(
  /Promise<ProductDataMap \| null>/g,
  `Promise<Record<string, ExtendedProductData> | null>`
);

fs.writeFileSync('lib/services/product-service.ts', code);
