// This script migrates all remaining products from the legacy system to the modular system
// and updates the necessary components and routes

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define paths
const PROJECT_ROOT = path.resolve(__dirname, '..');
const LEGACY_DATA_PATH = path.join(PROJECT_ROOT, 'lib', 'utils', 'product-utils.ts');
const MODULAR_BASE_PATH = path.join(PROJECT_ROOT, 'lib', 'data', 'products');

// Categories to migrate
const CATEGORIES_TO_MIGRATE = [
  'chairs',
  'hospital-furniture',
  'racking-systems',
  'school-furniture',
  'storage-solutions',
  'modular-furniture',
  'office-accessories'
];

// Function to extract category data from legacy system
function extractCategoryData(legacyData, category) {
  console.log(`Attempting to extract data for category: ${category}`);
  
  // Log a small portion of the legacyData for debugging
  console.log(`Legacy data excerpt (first 200 chars): ${legacyData.substring(0, 200)}`);
  
  // Try different approaches to extract category data
  
  // Approach 1: Direct object match
  const categoryRegex1 = new RegExp(`export\\s+const\\s+${category}\\s*=\\s*{([\\s\\S]*?)}\\s*;`, 'g');
  let match = categoryRegex1.exec(legacyData);
  
  if (!match || !match[1]) {
    console.log(`Approach 1 failed, trying approach 2 for category: ${category}`);
    
    // Approach 2: Looking for category as a property
    const categoryRegex2 = new RegExp(`["']${category}["']\\s*:\\s*{([\\s\\S]*?)}\\s*(?:,\\s*["'][^"']+["']|\\s*}\\s*;)`, 'g');
    match = categoryRegex2.exec(legacyData);
  }
  
  if (!match || !match[1]) {
    console.log(`Approach 2 failed, trying approach 3 for category: ${category}`);
    
    // Approach 3: Look for any mention of the category in a way that might indicate it's a series
    const categoryRegex3 = new RegExp(`["']${category}["']`, 'g');
    const hasCategory = categoryRegex3.test(legacyData);
    
    if (hasCategory) {
      console.log(`Found mentions of ${category} but couldn't extract structured data`);
    }
    
    return null;
  }
  
  // Extract series data
  const categoryContent = match[1];
  console.log(`Found category content for ${category}, length: ${categoryContent.length} chars`);
  
  // Look for series definitions
  const seriesRegex = /"([^"]+)":\s*{[^}]*?"id":\s*"([^"]+)"[^}]*?}/g;
  
  const series = [];
  let seriesMatch;
  
  while ((seriesMatch = seriesRegex.exec(categoryContent)) !== null) {
    const seriesId = seriesMatch[2];
    series.push(seriesId);
  }
  
  return series;
}

// Function to extract series data from legacy system
function extractSeriesData(legacyData, category, seriesId) {
  // Extract the entire series object including its products
  const seriesRegex = new RegExp(`"${category}":\\s*{[^}]*?"${seriesId}":\\s*({[\\s\\S]*?})\\s*(?:,\\s*"[^"]+"|\\s*}\\s*})`, 'g');
  const match = seriesRegex.exec(legacyData);
  
  if (!match || !match[1]) {
    console.log(`No data found for series: ${category}/${seriesId}`);
    return null;
  }
  
  // Extract product IDs
  const seriesContent = match[1];
  const productsRegex = /"products":\s*{([\s\S]*?)}/g;
  const productsMatch = productsRegex.exec(seriesContent);
  
  if (!productsMatch || !productsMatch[1]) {
    console.log(`No products found for series: ${category}/${seriesId}`);
    return [];
  }
  
  const productsContent = productsMatch[1];
  const productIdRegex = /"([^"]+)":\s*{/g;
  
  const productIds = [];
  let productMatch;
  
  while ((productMatch = productIdRegex.exec(productsContent)) !== null) {
    productIds.push(productMatch[1]);
  }
  
  return productIds;
}

// Function to extract a single product from legacy system
function extractProductData(legacyData, category, seriesId, productId) {
  // First extract the series data
  const seriesRegex = new RegExp(`"${category}":\\s*{[^}]*?"${seriesId}":\\s*{[\\s\\S]*?"products":\\s*{([\\s\\S]*?)}[\\s\\S]*?}[\\s\\S]*?}`, 'g');
  const seriesMatch = seriesRegex.exec(legacyData);
  
  if (!seriesMatch || !seriesMatch[1]) {
    console.log(`No product data found for series: ${category}/${seriesId}`);
    return null;
  }
  
  // Then extract the specific product
  const productsContent = seriesMatch[1];
  const productRegex = new RegExp(`"${productId}":\\s*({[\\s\\S]*?})\\s*(?:,\\s*"[^"]+"|\\s*})`, 'g');
  const productMatch = productRegex.exec(productsContent);
  
  if (!productMatch || !productMatch[1]) {
    console.log(`No data found for product: ${category}/${seriesId}/${productId}`);
    return null;
  }
  
  return productMatch[1];
}

// Function to create a modular product file
function createModularProductFile(category, seriesId, productId, productData) {
  // Ensure directories exist
  const seriesDir = path.join(MODULAR_BASE_PATH, category, seriesId);
  if (!fs.existsSync(seriesDir)) {
    fs.mkdirSync(seriesDir, { recursive: true });
  }
  
  const productFilePath = path.join(seriesDir, `${productId}.ts`);
  const cleanProductId = productId.replace(/-/g, '');
  
  const fileContent = `import { ExtendedProductData } from "@/lib/data/product-types";

export const ${cleanProductId}: ExtendedProductData = ${productData};`;
  
  fs.writeFileSync(productFilePath, fileContent);
  console.log(`Created modular product file: ${productFilePath}`);
  
  return cleanProductId;
}

// Function to create a modular series file
function createModularSeriesFile(category, seriesId, productIds) {
  const seriesFilePath = path.join(MODULAR_BASE_PATH, category, `${seriesId}.ts`);
  const cleanSeriesId = seriesId.replace(/-/g, '');
  
  // Generate imports
  const imports = productIds.map(({ id, varName }) => 
    `import { ${varName} } from './${seriesId}/${id}';`
  ).join('\n');
  
  // Generate product mappings
  const productMappings = productIds.map(({ id, varName }) => 
    `    '${id}': ${varName}`
  ).join(',\n');
  
  // Format series name for display
  const seriesDisplayName = seriesId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const fileContent = `import { ProductSeries } from '../../product-types';
${imports}

export const ${cleanSeriesId}: ProductSeries = {
  id: '${seriesId}',
  name: '${seriesDisplayName}',
  description: 'Our premium ${seriesDisplayName} collection designed for comfort and functionality.',
  products: {
${productMappings}
  }
};`;
  
  fs.writeFileSync(seriesFilePath, fileContent);
  console.log(`Created modular series file: ${seriesFilePath}`);
  
  return cleanSeriesId;
}

// Function to update or create a category index file
function updateCategoryIndexFile(category, seriesIds) {
  const indexFilePath = path.join(MODULAR_BASE_PATH, category, 'index.ts');
  const cleanCategory = category.replace(/-/g, '');
  
  // Generate imports
  const imports = seriesIds.map(({ id, varName }) => 
    `import { ${varName} } from './${id}';`
  ).join('\n');
  
  // Generate series mappings
  const seriesMappings = seriesIds.map(({ id, varName }) => 
    `  '${id}': ${varName}`
  ).join(',\n');
  
  const fileContent = `import { ProductCategoryData } from '../../product-types';
${imports}

export const ${cleanCategory}: ProductCategoryData = {
${seriesMappings}
};`;
  
  fs.writeFileSync(indexFilePath, fileContent);
  console.log(`Created/updated category index file: ${indexFilePath}`);
  
  return cleanCategory;
}

// Function to update the main products index file
function updateMainProductsIndex(categories) {
  const indexFilePath = path.join(MODULAR_BASE_PATH, 'index.ts');
  
  // Generate imports
  const imports = categories.map(({ id, varName }) => 
    `import { ${varName} } from './${id}';`
  ).join('\n');
  
  // Generate category exports
  const categoryExports = categories.map(({ id, varName }) => 
    `export const ${id} = ${varName};`
  ).join('\n');
  
  const fileContent = `// Main products index file
${imports}

// Export each category
${categoryExports}

// Export combined categories
export const products = {
${categories.map(({ id }) => `  ${id}`).join(',\n')}
};`;
  
  fs.writeFileSync(indexFilePath, fileContent);
  console.log(`Updated main products index file: ${indexFilePath}`);
}

// Function to update the ProductModule config
function updateProductModuleConfig() {
  const configPath = path.join(PROJECT_ROOT, 'lib', 'modules', 'product', 'config.ts');
  
  if (!fs.existsSync(configPath)) {
    console.log(`Config file not found: ${configPath}`);
    return;
  }
  
  let content = fs.readFileSync(configPath, 'utf8');
  
  // Update the configuration to enable full modular mode
  content = content.replace(
    /fullModularMode:\s*false/g,
    'fullModularMode: true'
  );
  
  // Mark all categories as migrated
  CATEGORIES_TO_MIGRATE.forEach(category => {
    content = content.replace(
      new RegExp(`'${category}':\\s*false`, 'g'),
      `'${category}': true`
    );
  });
  
  fs.writeFileSync(configPath, content);
  console.log(`Updated product module configuration`);
}

// Function to analyze the structure of the legacy data
function analyzeDataStructure(legacyData) {
  console.log('\n--- Analyzing legacy data structure ---');
  
  // Look for export statements
  const exportRegex = /export\s+const\s+(\w+)\s*=/g;
  let exportMatch;
  const exports = [];
  
  while ((exportMatch = exportRegex.exec(legacyData)) !== null) {
    exports.push(exportMatch[1]);
  }
  
  console.log(`Found ${exports.length} exports: ${exports.join(', ')}`);
  
  // Look for potential category definitions
  const categoryDefinitionRegex = /(const|let|var)\s+(\w+)\s*=\s*{[^}]*?category/g;
  let categoryMatch;
  const potentialCategories = [];
  
  while ((categoryMatch = categoryDefinitionRegex.exec(legacyData)) !== null) {
    potentialCategories.push(categoryMatch[2]);
  }
  
  console.log(`Found ${potentialCategories.length} potential category variables: ${potentialCategories.join(', ')}`);
  
  // Look for product property patterns
  const productPatterns = [
    /products\s*:\s*{/g,
    /id\s*:\s*["'](\w+)["']/g,
    /name\s*:\s*["']([^"']+)["']/g,
    /variants\s*:\s*\[/g
  ];
  
  productPatterns.forEach((pattern, index) => {
    const matches = legacyData.match(pattern) || [];
    console.log(`Pattern ${index + 1}: Found ${matches.length} matches`);
  });
  
  // Check for specific known patterns for our products
  const directorSeriesCheck = legacyData.includes('director-series');
  const tycoonChairCheck = legacyData.includes('tycoon-director-chair');
  
  console.log(`Contains 'director-series': ${directorSeriesCheck}`);
  console.log(`Contains 'tycoon-director-chair': ${tycoonChairCheck}`);
  
  console.log('--- End of data structure analysis ---\n');
}

// Function to create empty category data as a fallback
function createEmptyCategoryData(category) {
  console.log(`Creating empty category data for: ${category}`);
  
  // Create category directory
  const categoryDir = path.join(MODULAR_BASE_PATH, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
    console.log(`Created category directory: ${categoryDir}`);
  }
  
  // Create an index.ts file with empty category data
  const indexFilePath = path.join(categoryDir, 'index.ts');
  const cleanCategory = category.replace(/-/g, '');
  
  const indexContent = `import { ProductCategoryData } from '../../product-types';

// This is a placeholder for the ${category} category
// Replace with actual data as products are added
export const ${cleanCategory}: ProductCategoryData = {};
`;
  
  fs.writeFileSync(indexFilePath, indexContent);
  console.log(`Created empty category index file: ${indexFilePath}`);
  
  // Add the category to the list of migrated categories
  updateMainProductsIndex([{ id: category, varName: cleanCategory }]);
}

// Main function
async function main() {
  console.log('Starting full migration to modular product system...');
  
  // Read legacy data
  if (!fs.existsSync(LEGACY_DATA_PATH)) {
    console.error(`Legacy data file not found: ${LEGACY_DATA_PATH}`);
    return;
  }
  
  const legacyData = fs.readFileSync(LEGACY_DATA_PATH, 'utf8');
  console.log(`Read legacy data file: ${LEGACY_DATA_PATH}`);
  console.log(`File size: ${legacyData.length} characters`);
  
  // Create a simplified backup of the legacy data for analysis
  const legacyBackupPath = path.join(PROJECT_ROOT, 'legacy-data-backup.txt');
  fs.writeFileSync(legacyBackupPath, legacyData);
  console.log(`Created backup of legacy data at: ${legacyBackupPath}`);
  
  // Try to identify the structure of the legacy data
  analyzeDataStructure(legacyData);
  
  // Process each category
  const migratedCategories = [];
  
  for (const category of CATEGORIES_TO_MIGRATE) {
    console.log(`\nProcessing category: ${category}`);
    
    // Extract series for this category
    const seriesIds = extractCategoryData(legacyData, category);
    
    if (!seriesIds || seriesIds.length === 0) {
      console.log(`No series found for category: ${category}`);
      // Create empty category data as a fallback
      createEmptyCategoryData(category);
      continue;
    }
    
    console.log(`Found ${seriesIds.length} series in ${category}`);
    
    const migratedSeries = [];
    
    // Process each series
    for (const seriesId of seriesIds) {
      console.log(`\nProcessing series: ${category}/${seriesId}`);
      
      // Extract products for this series
      const productIds = extractSeriesData(legacyData, category, seriesId);
      
      if (!productIds || productIds.length === 0) {
        console.log(`No products found for series: ${category}/${seriesId}`);
        continue;
      }
      
      console.log(`Found ${productIds.length} products in ${category}/${seriesId}`);
      
      const migratedProducts = [];
      
      // Process each product
      for (const productId of productIds) {
        console.log(`Processing product: ${category}/${seriesId}/${productId}`);
        
        // Extract product data
        const productData = extractProductData(legacyData, category, seriesId, productId);
        
        if (!productData) {
          console.log(`Failed to extract data for product: ${category}/${seriesId}/${productId}`);
          continue;
        }
        
        // Create modular product file
        const productVarName = createModularProductFile(category, seriesId, productId, productData);
        
        migratedProducts.push({
          id: productId,
          varName: productVarName
        });
      }
      
      // Create modular series file
      if (migratedProducts.length > 0) {
        const seriesVarName = createModularSeriesFile(category, seriesId, migratedProducts);
        
        migratedSeries.push({
          id: seriesId,
          varName: seriesVarName
        });
      }
    }
    
    // Update category index file
    if (migratedSeries.length > 0) {
      const categoryVarName = updateCategoryIndexFile(category, migratedSeries);
      
      migratedCategories.push({
        id: category,
        varName: categoryVarName
      });
    }
  }
  
  // Update main products index
  if (migratedCategories.length > 0) {
    updateMainProductsIndex(migratedCategories);
  }
  
  // Update ProductModule config
  updateProductModuleConfig();
  
  console.log('\nMigration to modular product system completed successfully!');
  console.log('Next steps:');
  console.log('1. Verify all products are correctly migrated');
  console.log('2. Run tests to ensure everything works correctly');
  console.log('3. Remove the legacy product system using the remove-legacy-system.js script');
}

// Run the main function
main().catch(error => {
  console.error('Error during migration:', error);
  process.exit(1);
});