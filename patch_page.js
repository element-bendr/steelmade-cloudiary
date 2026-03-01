const fs = require('fs');
let code = fs.readFileSync('app/[categoryId]/[seriesId]/[productId]/page.tsx', 'utf8');

code = code.replace(
  /const series = category\.series\[seriesId\];/g,
  `if (!category) {\n    notFound();\n  }\n  const series = category.series[seriesId];\n\n  if (!series) {\n    notFound();\n  }`
);

fs.writeFileSync('app/[categoryId]/[seriesId]/[productId]/page.tsx', code);
