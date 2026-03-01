const fs = require('fs');

let content = fs.readFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/lib/slideshow/slide-generator.ts', 'utf8');

// The classic.png is returning a 404 from Cloudinary. Let's look for a valid visitor chair or use an executive chair as fallback that looks nice for the homepage.
// I will replace it with the Milano director chair which we verified we had a good image of earlier, or the visitor regency if that exists.
// From earlier data context, we can use the 'boston' or 'milano' or any valid 200 OK image. We can use the trident image or similar.

const regex = /'https:\/\/res\.cloudinary\.com\/dqde19mfs\/image\/upload\/q_auto,f_auto\/v1752129755\/steelmade\/chairs\/visitor-series\/classic\.png'/g;
// Use the flamingo ergonomic chair as visitor fallback since it has a 200 OK
content = content.replace(
  regex,
  "'https://res.cloudinary.com/dqde19mfs/image/upload/q_auto,f_auto/v1748785770/steelmade/chairs/director-series/milano/ic-336-hb.jpg'"
);

fs.writeFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/lib/slideshow/slide-generator.ts', content);
console.log('Fixed the 404 image link for the last slide');
