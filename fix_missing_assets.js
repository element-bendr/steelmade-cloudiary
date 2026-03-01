const fs = require('fs');

// Patch App Layout
const layoutPath = 'app/layout.tsx';
let layoutCode = fs.readFileSync(layoutPath, 'utf8');

// Remove missing layout items (manifest, openGraph images, icons, logo)
layoutCode = layoutCode.replace(/      \{ url: '\/icon\.png', type: 'image\/png' \},\n/g, '');
layoutCode = layoutCode.replace(/      \{ url: '\/apple-icon\.png' \}\n/g, '');
layoutCode = layoutCode.replace(/        <link rel="manifest" href="\/manifest\.json" \/>\n/g, '');

// Don't fully remove twitter/og images if they are placeholders, but clear them if they break
// Oh let's replace `/images/twitter-image.jpg` with a dummy that works or delete the array elements.
// To be safe, just delete the elements so Next.js doesn't fetch them:
layoutCode = layoutCode.replace(/images: \['\/images\/[a-z-]+\.jpg'\],/g, 'images: [],');
layoutCode = layoutCode.replace(/logo="https:\/\/steelmade\.com\/logo\.png"/g, 'logo="https://steelmade.com"'); // Fake it

fs.writeFileSync(layoutPath, layoutCode);

// Patch Critical Scripts
const scriptsPath = 'components/performance/critical-scripts.tsx';
let scriptCode = fs.readFileSync(scriptsPath, 'utf8');

scriptCode = scriptCode.replace(
  /<link rel="preload" href="\/fonts\.css" as="style" id="__sm-fonts-css" \/>/g,
  '{/* Removed missing fonts.css preloader /*}'
);

scriptCode = scriptCode.replace(
  /var l = document.getElementById\('__sm-fonts-css'\);[\s\S]*?\}\)/g,
  "// No op"
);

fs.writeFileSync(scriptsPath, scriptCode);
console.log('Fixed missing assets');
