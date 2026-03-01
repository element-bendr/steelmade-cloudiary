const fs = require('fs');
let code = fs.readFileSync('lib/data/portfolio-data.ts', 'utf8');

code = code.replace(
  /import { getPortfolioSeries } from "\.\/product-catalog";/g,
  `import { getPortfolioSeries } from "./product-helpers";`
);

fs.writeFileSync('lib/data/portfolio-data.ts', code);
