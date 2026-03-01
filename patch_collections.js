const fs = require('fs');

// Patch ProductGrid
let gridCode = fs.readFileSync('components/products/ProductGrid.tsx', 'utf8');
gridCode = gridCode.replace(
  /interface ProductGridProps {\n  products: ExtendedProductData\[\]\n  productsPerPage\?: number\n}/,
  `interface ProductGridProps {\n  products: ExtendedProductData[];\n  productsPerPage?: number;\n  category?: string;\n  seriesId?: string;\n}`
);
fs.writeFileSync('components/products/ProductGrid.tsx', gridCode);

// Patch CollectionCarousel
let carouselCode = fs.readFileSync('components/collections/CollectionCarousel.tsx', 'utf8');
carouselCode = carouselCode.replace(
  /\.seriesId/g,
  `.series`
);
fs.writeFileSync('components/collections/CollectionCarousel.tsx', carouselCode);

