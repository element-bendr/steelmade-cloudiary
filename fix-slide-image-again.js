const fs = require('fs');

let content = fs.readFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/lib/slideshow/slide-generator.ts', 'utf8');

// Replace the fallback arrays using the broken classic.png image with the valid Regency visitor image
const oldUrl = /'https:\/\/res\.cloudinary\.com\/dqde19mfs\/image\/upload\/q_auto,f_auto\/v1748785770\/steelmade\/chairs\/director-series\/milano\/ic-336-hb\.jpg'/g;
const newUrl = "'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1752131212/steelmade/chairs/visitor-series/regency/ic-152.png'";

content = content.replace(oldUrl, newUrl);

// Also update the original classic.png just in case I missed any other occurrences
const origUrl = /'https:\/\/res\.cloudinary\.com\/dqde19mfs\/image\/upload\/q_auto,f_auto\/v1752129755\/steelmade\/chairs\/visitor-series\/classic\.png'/g;
content = content.replace(origUrl, newUrl);

fs.writeFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/lib/slideshow/slide-generator.ts', content);
console.log('Fixed the image reference to a valid Visitor chair (Regency)');
