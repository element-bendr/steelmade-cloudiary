const fs = require('fs');
let code = fs.readFileSync('modules/product/services/product-service.ts', 'utf8');

code = code.replace(/bigBossGoldDirectorChair\./g, 'null?.');
code = code.replace(/id: null\?\.id/g, 'id: ""');
code = code.replace(/name: null\?\.name/g, 'name: ""');
code = code.replace(/description: null\?\.description/g, 'description: ""');
code = code.replace(/features: null\?\.features/g, 'features: []');
code = code.replace(/categorySlug: null\?\.categorySlug/g, 'categorySlug: ""');
code = code.replace(/seriesSlug: null\?\.seriesSlug/g, 'seriesSlug: ""');
code = code.replace(/images: null\?\.(images|imageUrl)/g, 'images: []');
code = code.replace(/price: null\?\.price/g, 'price: ""');
code = code.replace(/specifications: null\?\.specifications/g, 'specifications: {}');

fs.writeFileSync('modules/product/services/product-service.ts', code);
