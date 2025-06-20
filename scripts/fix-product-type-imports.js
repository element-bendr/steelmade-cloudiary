/**
 * This script finds and fixes type inconsistencies between 
 * the different product type definitions in the project.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');
const TYPES_TO_CHECK = [
  {
    path: path.join(PROJECT_ROOT, 'lib', 'types', 'product-types.ts'),
    namespace: '@/lib/types/product-types'
  },
  {
    path: path.join(PROJECT_ROOT, 'types', 'products.ts'),
    namespace: '@/types/products'
  }
];
const TARGET_TYPE = TYPES_TO_CHECK[1]; // Use the second type definition as the target

// Function to scan for files importing product types
function findFilesWithProductTypeImports() {
  const tsFiles = glob.sync(path.join(PROJECT_ROOT, '**/*.{ts,tsx}'), {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/coverage/**'
    ]
  });

  const filesWithImports = {};
  TYPES_TO_CHECK.forEach(typeInfo => {
    filesWithImports[typeInfo.namespace] = [];
  });

  // Scan each TypeScript file for imports
  tsFiles.forEach(filePath => {
    if (TYPES_TO_CHECK.some(t => t.path === filePath)) {
      return; // Skip the type definition files themselves
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    TYPES_TO_CHECK.forEach(typeInfo => {
      if (content.includes(`from '${typeInfo.namespace}'`)) {
        filesWithImports[typeInfo.namespace].push(filePath);
      }
    });
  });

  return filesWithImports;
}

// Function to update imports in a file
function updateImportsInFile(filePath, fromNamespace, toNamespace) {
  try {
    console.log(`Updating imports in ${path.relative(PROJECT_ROOT, filePath)}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(
      new RegExp(`from '${fromNamespace}'`, 'g'),
      `from '${toNamespace}'`
    );
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  console.log('Scanning for product type imports...');
  const filesWithImports = findFilesWithProductTypeImports();
  
  let totalFiles = 0;
  let updatedFiles = 0;
  
  // Update imports for each namespace except the target
  TYPES_TO_CHECK.forEach(typeInfo => {
    if (typeInfo.namespace === TARGET_TYPE.namespace) {
      return; // Skip the target namespace
    }
    
    const files = filesWithImports[typeInfo.namespace];
    totalFiles += files.length;
    
    console.log(`\nFound ${files.length} files importing from ${typeInfo.namespace}`);
    console.log(`Updating to use ${TARGET_TYPE.namespace} instead...`);
    
    files.forEach(filePath => {
      const updated = updateImportsInFile(filePath, typeInfo.namespace, TARGET_TYPE.namespace);
      if (updated) {
        updatedFiles++;
      }
    });
  });
  
  console.log(`\nSummary:`);
  console.log(`- Total files with product type imports: ${totalFiles}`);
  console.log(`- Files updated: ${updatedFiles}`);
  console.log(`- Target type namespace: ${TARGET_TYPE.namespace}`);
  
  if (updatedFiles > 0) {
    console.log(`\nNext steps:`);
    console.log(`1. Make sure the type definitions in ${TARGET_TYPE.namespace} are complete`);
    console.log(`2. Check if there are any type errors in the updated files`);
    console.log(`3. Consider consolidating to a single type definition file`);
  }
}

// Run the script
main();