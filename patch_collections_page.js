const fs = require('fs');
let code = fs.readFileSync('app/collections/[seriesId]/[productId]/page.tsx', 'utf8');

code = code.replace(/\{series\.imageUrl &&/g, '{false &&');
code = code.replace(/<Image\s+src={series\.imageUrl}/g, '<Image src=""');

fs.writeFileSync('app/collections/[seriesId]/[productId]/page.tsx', code);
