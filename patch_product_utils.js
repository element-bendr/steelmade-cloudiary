const fs = require('fs');
let code = fs.readFileSync('lib/utils/product-utils.ts', 'utf8');

code = code.replace(/import { productCatalog } from '..\/data\/product-catalog';/, 'import { categoryMap as productCatalog } from "../data/products/categories";');
code = code.replace(/import type { ProductData, ProductSeries, ProductCategoryData, ExtendedProductData, ProductVariant } from '..\/data\/product-types';/, 'import type { ProductData, ProductSeries, ProductCategoryData, ExtendedProductData } from "../data/product-types";');

fs.writeFileSync('lib/utils/product-utils.ts', code);
