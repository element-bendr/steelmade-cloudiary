const fs = require('fs');
let code = fs.readFileSync('lib/services/collections-service.ts', 'utf8');
code = code.replace(/import { collections } from "@\/lib\/data\/collections-data";/, "import { categoryMap as collections } from \"@/lib/data/products/categories\";");
code = code.replace(/Record<ProductType, Record<string, SeriesWithProducts>>/, "Record<string, Record<string, SeriesWithProducts>>");
fs.writeFileSync('lib/services/collections-service.ts', code);
