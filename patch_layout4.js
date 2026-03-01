const fs = require('fs');
let code = fs.readFileSync('components/products/ProductDetailLayout.tsx', 'utf8');

code = code.replace(
  /className\?: string;\n  children\?: React\.ReactNode;\n}/,
  `className?: string;\n  children?: React.ReactNode;\n  categoryId?: string;\n  seriesId?: string;\n}`
);

fs.writeFileSync('components/products/ProductDetailLayout.tsx', code);
