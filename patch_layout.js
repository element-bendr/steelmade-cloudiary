const fs = require('fs');
let code = fs.readFileSync('components/products/ProductDetailLayout.tsx', 'utf8');

// Add missing categoryId and seriesId to the interface
code = code.replace(
  /children\?: React\.ReactNode;\n\}/g,
  `children?: React.ReactNode;\n  categoryId?: string;\n  seriesId?: string;\n}`
);

// Fix the typescript error regarding `c` implicit any
code = code.replace(
  /\(c\) => c\.toUpperCase\(\)/g,
  `(c: string) => c.toUpperCase()`
);

fs.writeFileSync('components/products/ProductDetailLayout.tsx', code);
