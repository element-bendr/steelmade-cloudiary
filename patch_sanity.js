const fs = require('fs');
let code = fs.readFileSync('lib/modules/product/sanity-repository.ts', 'utf8');

code = code.replace(/seoDescription/g, 'description');
code = code.replace(/seriesId/g, 'series');

fs.writeFileSync('lib/modules/product/sanity-repository.ts', code);
