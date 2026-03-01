const fs = require('fs');
let code = fs.readFileSync('modules/product/services/product-service.ts', 'utf8');

code = code.replace(
  /'bigboss-gold-director-chair': \{[\s\S]*?featured: true\n  \}/g,
  `'bigboss-gold-director-chair': undefined as any`
);

fs.writeFileSync('modules/product/services/product-service.ts', code);
