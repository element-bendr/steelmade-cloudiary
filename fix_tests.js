const fs = require('fs');

const pkgPath = 'package.json';
let pkgInfo = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkgInfo.scripts.test = "vitest run src __tests__"; // Just run tests in __tests__ for now

fs.writeFileSync(pkgPath, JSON.stringify(pkgInfo, null, 2));

console.log('Fixed test script');
