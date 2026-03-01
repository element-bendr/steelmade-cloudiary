const fs = require('fs');
let code = fs.readFileSync('app/collections/[seriesId]/[productId]/page.tsx', 'utf8');

code = code.replace(/images: series\.imageUrl \? \[{ url: series\.imageUrl }\] : undefined/g, 'images: []');
code = code.replace(/\{series\.imageUrl && \(/g, '{false && (');

fs.writeFileSync('app/collections/[seriesId]/[productId]/page.tsx', code);
