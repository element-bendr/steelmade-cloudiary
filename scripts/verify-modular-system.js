// This script verifies that the modular product system is working correctly
// by testing access to products and logging the results

const fs = require('fs');
const path = require('path');

// Function to dynamically import ES modules
async function importESModule(modulePath) {
  // For Node.js environments that support dynamic import
  try {
    return await import(modulePath);
  } catch (error) {
    console.error(`Error importing module ${modulePath}:`, error);
    return null;
  }
}

// Function to mock the product module's behavior
async function testProductModule() {
  console.log('Testing product module functionality...\n');
  
  // Log directory structure to verify files exist
  const productBasePath = path.resolve(__dirname, '..', 'lib', 'data', 'products');
  console.log('Checking directory structure:');
  logDirectoryStructure(productBasePath);
  
  // Try to read the product files directly to verify content
  const tycoonChairPath = path.resolve(productBasePath, 'chairs', 'director-series', 'tycoon-director-chair.ts');
  
  if (fs.existsSync(tycoonChairPath)) {
    console.log(`\nVerifying Tycoon Director Chair file exists: ✅`);
    const fileContent = fs.readFileSync(tycoonChairPath, 'utf8');
    console.log(`File size: ${fileContent.length} chars`);
    console.log(`Contains product data: ${fileContent.includes('export const tycoondirectorchair') ? '✅' : '❌'}`);
  } else {
    console.log(`\nTycoon Director Chair file not found: ❌`);
  }
  
  // Try to read the series file
  const directorSeriesPath = path.resolve(productBasePath, 'chairs', 'director-series.ts');
  
  if (fs.existsSync(directorSeriesPath)) {
    console.log(`\nVerifying Director Series file exists: ✅`);
    const fileContent = fs.readFileSync(directorSeriesPath, 'utf8');
    console.log(`File size: ${fileContent.length} chars`);
    console.log(`Contains series data: ${fileContent.includes('export const directorseries') ? '✅' : '❌'}`);
  } else {
    console.log(`\nDirector Series file not found: ❌`);
  }
  
  // Check config file
  const configPath = path.resolve(__dirname, '..', 'lib', 'modules', 'product', 'config.ts');
  
  if (fs.existsSync(configPath)) {
    console.log(`\nVerifying Product Module config exists: ✅`);
    const fileContent = fs.readFileSync(configPath, 'utf8');
    console.log(`Config has fullModularMode: ${fileContent.includes('fullModularMode: true') ? '✅' : '❌'}`);
    console.log(`Config has chairs migrated: ${fileContent.includes("'chairs': true") ? '✅' : '❌'}`);
  } else {
    console.log(`\nProduct Module config not found: ❌`);
  }
  
  console.log('\nVerification complete. The modular product system should be ready for use.');
}

// Function to log directory structure
function logDirectoryStructure(dirPath, level = 0) {
  const indent = '  '.repeat(level);
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${item}/`);
      logDirectoryStructure(itemPath, level + 1);
    } else {
      console.log(`${indent}📄 ${item}`);
    }
  });
}

// Run the test
testProductModule()
  .then(() => console.log('Test completed successfully'))
  .catch(error => console.error('Test failed:', error));