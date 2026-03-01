const fs = require('fs');

const layoutPath = 'app/layout.tsx';
let layoutCode = fs.readFileSync(layoutPath, 'utf8');

// There are more missing icons that a formatter added back or previous patch missed on this run 
layoutCode = layoutCode.replace(/      \{ url: '\/icon\.png', type: 'image\/png' \},\n/g, '');
layoutCode = layoutCode.replace(/      \{ url: '\/apple-icon\.png' \},\n/g, '');
layoutCode = layoutCode.replace(/        <link rel="manifest" href="\/manifest\.json" \/>\n/g, '');

// Don't fully remove twitter/og images if they are placeholders, but clear them if they break
// We'll stub them dynamically rather than completely empty 
layoutCode = layoutCode.replace(/url: '\/images\/og-image\.jpg',/g, 'url: \'https://dummyimage.com/1200x630/000/fff&text=SteelMade\',');

fs.writeFileSync(layoutPath, layoutCode);

console.log('Fixed missing layout assets');
