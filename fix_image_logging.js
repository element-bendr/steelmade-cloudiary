const fs = require('fs');

const codePath = 'components/ui/optimized-image.tsx';
let sourceCode = fs.readFileSync(codePath, 'utf8');

// Use replacement to remove console.log statements from the render cycle
sourceCode = sourceCode.replace(/console\.log\('Attempting to load image:'.*?\);\n/g, '');
sourceCode = sourceCode.replace(/console\.log\(`Retrying local image \(attempt \$\{localRetryCount \+ 1\}\):`, newSrc\);\n/g, '');
sourceCode = sourceCode.replace(/console\.log\('Retrying remote image with:', newSrc\);\n/g, '');

fs.writeFileSync(codePath, sourceCode);
console.log('Cleaned image logs');
