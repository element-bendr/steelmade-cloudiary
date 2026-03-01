const fs = require('fs');
let code = fs.readFileSync('components/templates/ConfigurableCard.tsx', 'utf8');

code = code.replace(
  /Object\.values\(\(item as ProductSeries\)\.products\)/g,
  `Object.values(((item as ProductSeries).products) || {})`
);

fs.writeFileSync('components/templates/ConfigurableCard.tsx', code);
