const fs = require('fs');
let code = fs.readFileSync('lib/navigation.ts', 'utf8');

// The keys in productCategoryDisplayNames must exactly match ProductType strings in product-types.ts
code = code.replace(
  /export const productCategoryDisplayNames: Record<ProductType, string> = {\n  "chairs": "Chairs",\n  "tables": "Tables",\n  "accessories": "Accessories",\n  "desks": "Desks",\n  "storage": "Storage",\n  "lighting": "Lighting",\n  "hospital-furniture": "Hospital Furniture",\n  "racking-systems": "Racking Systems",\n};/g,
  `export const productCategoryDisplayNames: Record<string, string> = {
  "chairs": "Chairs",
  "tables": "Tables",
  "accessories": "Accessories",
  "desks": "Desks",
  "storage": "Storage",
  "lighting": "Lighting",
  "hospital-furniture": "Hospital Furniture",
  "racking-systems": "Racking Systems",
  "storage-solutions": "Storage Solutions",
  "modular-furniture": "Modular Furniture",
};`
);

code = code.replace(
  /export const productCategoryFromDisplay: Record<ProductType, string> = {\n  "chairs": "Chairs",\n  "tables": "Tables",\n  "accessories": "Accessories",\n  "desks": "Desks",\n  "storage": "Storage",\n  "lighting": "Lighting",\n  "hospital-furniture": "Hospital Furniture",\n  "racking-systems": "Racking Systems",\n};/g,
  `export const productCategoryFromDisplay: Record<string, string> = {
  "chairs": "Chairs",
  "tables": "Tables",
  "accessories": "Accessories",
  "desks": "Desks",
  "storage": "Storage",
  "lighting": "Lighting",
  "hospital-furniture": "Hospital Furniture",
  "racking-systems": "Racking Systems",
  "storage-solutions": "Storage Solutions",
  "modular-furniture": "Modular Furniture",
};`
);

// We need to just change Record<ProductType, string> to Record<string, string> all over this file
code = code.replace(/Record<ProductType, string>/g, 'Record<string, string>');

fs.writeFileSync('lib/navigation.ts', code);
