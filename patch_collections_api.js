const fs = require('fs');

// Patch collections.ts
let code1 = fs.readFileSync('lib/api/collections.ts', 'utf8');
code1 = code1.replace(/COLLECTIONS_DATA\[category\]/g, '(COLLECTIONS_DATA as any)[category]');
code1 = code1.replace(/COLLECTIONS_DATA\[cat\]/g, '(COLLECTIONS_DATA as any)[cat]');
fs.writeFileSync('lib/api/collections.ts', code1);

// Patch products.ts
let code2 = fs.readFileSync('lib/api/products.ts', 'utf8');
code2 = code2.replace(/COLLECTIONS_DATA\[category\]/g, '(COLLECTIONS_DATA as any)[category]');
code2 = code2.replace(/COLLECTIONS_DATA\[cat\]/g, '(COLLECTIONS_DATA as any)[cat]');
fs.writeFileSync('lib/api/products.ts', code2);

// Patch collections-service.ts
let code3 = fs.readFileSync('lib/services/collections-service.ts', 'utf8');
code3 = code3.replace(/collections\[category]/g, '(collections as any)[category]');
fs.writeFileSync('lib/services/collections-service.ts', code3);

