const fs = require('fs');

const pkgPath = 'package.json';
let pkgInfo = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkgInfo.scripts.test = "vitest run"; 

fs.writeFileSync(pkgPath, JSON.stringify(pkgInfo, null, 2));

console.log('Fixed test script');
