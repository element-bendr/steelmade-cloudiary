#!/usr/bin/env node
/**
 * This script automates the migration of product data from the legacy system to the modular system.
 * It reads product data from the legacy product-utils.ts file and creates corresponding files
 * in the modular system directory structure.
 * 
 * Usage:
 * node scripts/migrate-products.js [category] [series]
 * 
 * Example:
 * node scripts/migrate-products.js chairs director-series
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const category = args[0];
const series = args[1];

if (!category) {
  console.error('Error: Category is required.');
  console.log('Usage: node scripts/migrate-products.js [category] [series]');
  process.exit(1);
}

// Define paths
const PROJECT_ROOT = path.resolve(__dirname, '..');
const LEGACY_DATA_PATH = path.join(PROJECT_ROOT, 'lib', 'utils', 'product-utils.ts');
const MODULAR_BASE_PATH = path.join(PROJECT_ROOT, 'lib', 'data', 'products');

// Ensure the modular base path exists
if (!fs.existsSync(MODULAR_BASE_PATH)) {
  console.error(`Error: Modular base path does not exist: ${MODULAR_BASE_PATH}`);
  process.exit(1);
}

// Read legacy data
console.log(`Reading legacy data from ${LEGACY_DATA_PATH}`);
const legacyData = fs.readFileSync(LEGACY_DATA_PATH, 'utf8');

// Function to extract product data from legacy system
function extractProductData(data, category, series) {
  // This is a simple extraction that assumes a standard format in product-utils.ts
  // A more robust implementation would use a proper TypeScript parser
  const regex = new RegExp(`"${category}":\\s*{[^}]*"${series}":\\s*{[^}]*?products:\\s*{([\\s\\S]*?)}[\\s\\S]*?}[\\s\\S]*?}`);
  const match = data.match(regex);
  
  if (!match || !match[1]) {
    console.error(`Could not find products for ${category}/${series} in legacy data.`);
    return null;
  }
  
  // Extract individual products
  const productsSection = match[1];
  const productIds = [];
  const productRegex = /"([^"]+)":\s*{/g;
  let productMatch;
  
  while ((productMatch = productRegex.exec(productsSection)) !== null) {
    productIds.push(productMatch[1]);
  }
  
  console.log(`Found ${productIds.length} products: ${productIds.join(', ')}`);
  return productIds;
}

// Function to extract a single product's data
function extractSingleProduct(data, productId) {
  const regex = new RegExp(`"${productId}":\\s*({[\\s\\S]*?}),\\s*"[^"]+"`);
  const lastProductRegex = new RegExp(`"${productId}":\\s*({[\\s\\S]*?})\\s*}`);
  
  let match = data.match(regex);
  if (!match || !match[1]) {
    // Try the last product pattern
    match = data.match(lastProductRegex);
  }
  
  if (!match || !match[1]) {
    console.error(`Could not extract data for product ${productId}`);
    return null;
  }
  
  return match[1];
}

// Function to convert legacy product data to modular format
function convertToModularFormat(productData, productId) {
  // This is a simple conversion that assumes the formats are similar
  // A more robust implementation would do proper parsing and transformation
  return `import { ExtendedProductData } from "@/lib/data/product-types";

export const ${productId.replace(/-/g, '')}: ExtendedProductData = ${productData};`;
}

// Function to create modular series file
function createSeriesFile(category, series, productIds) {
  const categoryPath = path.join(MODULAR_BASE_PATH, category);
  const seriesPath = path.join(categoryPath, `${series}.ts`);
  
  // Ensure category directory exists
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
    console.log(`Created directory: ${categoryPath}`);
  }
  
  // Create imports and product mappings
  const imports = productIds.map(id => `import { ${id.replace(/-/g, '')} } from './${series}/${id}';`).join('\n');
  const productMappings = productIds.map(id => `    '${id}': ${id.replace(/-/g, '')}`).join(',\n');
  
  const seriesContent = `import { ProductSeries } from '../../product-types';
${imports}

export const ${series.replace(/-/g, '')}: ProductSeries = {
  id: '${series}',
  name: '${series.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}',
  description: 'Our premium ${series.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} are designed for comfort and style.',
  products: {
${productMappings}
  }
};`;
  
  fs.writeFileSync(seriesPath, seriesContent);
  console.log(`Created series file: ${seriesPath}`);
}

// Function to create or update category index file
function updateCategoryIndex(category, seriesIds) {
  const categoryPath = path.join(MODULAR_BASE_PATH, category);
  const indexPath = path.join(categoryPath, 'index.ts');
  
  // Create imports and series mappings
  const imports = seriesIds.map(id => `import { ${id.replace(/-/g, '')} } from './${id}';`).join('\n');
  const seriesMappings = seriesIds.map(id => `  '${id}': ${id.replace(/-/g, '')}`).join(',\n');
  
  const indexContent = `import { ProductCategoryData } from '../../product-types';
${imports}

export const ${category.replace(/-/g, '')}: ProductCategoryData = {
${seriesMappings}
};`;
  
  fs.writeFileSync(indexPath, indexContent);
  console.log(`Created/updated category index: ${indexPath}`);
}

// Main execution
try {
  // Extract product IDs
  const productIds = extractProductData(legacyData, category, series);
  
  if (!productIds || productIds.length === 0) {
    console.error('No products found to migrate.');
    process.exit(1);
  }
  
  // Create series directory
  const seriesDir = path.join(MODULAR_BASE_PATH, category, series);
  if (!fs.existsSync(seriesDir)) {
    fs.mkdirSync(seriesDir, { recursive: true });
    console.log(`Created series directory: ${seriesDir}`);
  }
  
  // Process each product
  for (const productId of productIds) {
    console.log(`\nProcessing product: ${productId}`);
    
    // Extract product data
    const productData = extractSingleProduct(legacyData, productId);
    if (!productData) continue;
    
    // Convert to modular format
    const modularData = convertToModularFormat(productData, productId);
    
    // Write to file
    const productFilePath = path.join(seriesDir, `${productId}.ts`);
    fs.writeFileSync(productFilePath, modularData);
    console.log(`Created product file: ${productFilePath}`);
  }
  
  // Create series file
  createSeriesFile(category, series, productIds);
  
  // Update category index
  updateCategoryIndex(category, [series]);
  
  console.log('\nMigration completed successfully!');
} catch (error) {
  console.error('Error during migration:', error);
  process.exit(1);
}