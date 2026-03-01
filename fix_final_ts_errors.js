const fs = require('fs');

// Fix 1: Page.tsx imageUrl mappings
const pagePath = 'app/collections/[seriesId]/[productId]/page.tsx';
let pageCode = fs.readFileSync(pagePath, 'utf8');

pageCode = pageCode.replace(
  /imageUrl: data\.imageUrl \|\| '',/g,
  "imageUrl: (data as any).image || (data as any).imageUrl || '',"
);

fs.writeFileSync(pagePath, pageCode);


// Fix 2 & 3: Sanity Repository ProductSeries interface overlaps & mapping
const sanityRepoPath = 'lib/modules/product/sanity-repository.ts';
let repoCode = fs.readFileSync(sanityRepoPath, 'utf8');

// The first coverImage on line 46-ish
repoCode = repoCode.replace(
  /coverImage: { url: '', alt: seriesDoc\.title }, \/\/ Need to map if needed/g,
  "// Removed invalid keys mapped to ProductSeries"
);

// The second duplicate block at ~line 68
repoCode = repoCode.replace(
  /        description: sDoc\.description,\n        description: sDoc\.description \|\| '',\n        category: sDoc\.categoryId,\n        coverImage: { url: '', alt: sDoc\.title },/g,
  "        description: sDoc.description || '',\n        image: '', // Needs Sanity mapping if coverImage was intended"
);

// Map the required specification object into the return mapped literal ~line 80
repoCode = repoCode.replace(
  /      features: doc\.features \|\| \[\],\n      \/\/ mapping remaining legacy properties if any/g,
  "      features: doc.features || [],\n      specifications: {},\n      // mapping remaining legacy properties if any"
);

fs.writeFileSync(sanityRepoPath, repoCode);

console.log('Final TS strict-mode fixes applied.');
