const fs = require('fs');
let code = fs.readFileSync('lib/data/portfolio-data.ts', 'utf8');

code = code.replace(
  /export const portfolioSeries: Series\[\] = getPortfolioSeries\(\);/g,
  `export const portfolioSeries: Series[] = [];`
);

fs.writeFileSync('lib/data/portfolio-data.ts', code);
