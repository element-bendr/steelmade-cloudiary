const fs = require('fs');

// 1. App Collections Page
let code1 = fs.readFileSync('app/collections/[seriesId]/[productId]/page.tsx', 'utf8');
code1 = code1.replace(/series\.imageUrl/g, '((series as any).imageUrl || "")');
fs.writeFileSync('app/collections/[seriesId]/[productId]/page.tsx', code1);

// 2. Sanity Repository
let code2 = fs.readFileSync('lib/modules/product/sanity-repository.ts', 'utf8');
// remove dupes and category property from ProductSeries map
code2 = code2.replace(/category: seriesDoc\.categoryId,/g, '// category: seriesDoc.categoryId,');
code2 = code2.replace(/category: doc\.categoryId,/g, '// category: doc.categoryId,');
code2 = code2.replace(/description: doc\.description \|\| '',\n\s*description: doc\.description \|\| '',/g, "description: doc.description || '',");
// add specifications
code2 = code2.replace(/const product: ExtendedProductData = {/g, 'const product: ExtendedProductData = {\n      specifications: {},');
fs.writeFileSync('lib/modules/product/sanity-repository.ts', code2);

// 3. Product Service
let code3 = fs.readFileSync('lib/services/product-service.ts', 'utf8');
code3 = code3.replace(/Promise<Record<string, ExtendedProductData> \| null>/g, 'Promise<Record<string, ExtendedProductData> | ExtendedProductData[] | null>');
fs.writeFileSync('lib/services/product-service.ts', code3);

