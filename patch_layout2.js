const fs = require('fs');
let code = fs.readFileSync('components/products/ProductDetailLayout.tsx', 'utf8');

code = code.replace(
  /const breadcrumbItems = \[/g,
  `const breadcrumbItems: Array<{name: string, href?: string}> = [`
);

fs.writeFileSync('components/products/ProductDetailLayout.tsx', code);
