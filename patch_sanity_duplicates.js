const fs = require('fs');
let code = fs.readFileSync('lib/modules/product/sanity-repository.ts', 'utf8');

code = code.replace(/description: seriesDoc\.description,\n      description: seriesDoc\.description \|\| '',/g, "description: seriesDoc.description || '',");
code = code.replace(/description: doc\.description,\n            description: doc\.description \|\| '',/g, "description: doc.description || '',");
code = code.replace(/seriesDoc\.categoryId,\n      category:/g, 'seriesDoc.categoryId,');
code = code.replace(/doc\.categoryId,\n            category:/g, 'doc.categoryId,');

fs.writeFileSync('lib/modules/product/sanity-repository.ts', code);
