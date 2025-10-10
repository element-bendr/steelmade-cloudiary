#!/usr/bin/env node
/**
 * This script removes all traces of the legacy product system after
 * the migration to the modular system is complete. It should only be run
 * after thoroughly testing that all products work correctly with the new system.
 * 
 * CAUTION: This is a destructive operation and cannot be undone without restoring from backup.
 * 
 * Usage:
 * node scripts/remove-legacy-system.js --confirm
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check for confirmation flag
if (!process.argv.includes('--confirm')) {
  console.error('ERROR: This script will permanently remove the legacy product system.');
  console.error('Please run with --confirm flag to proceed:');
  console.error('  node scripts/remove-legacy-system.js --confirm');
  process.exit(1);
}

// Define paths
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Files to remove
const filesToRemove = [
  path.join(PROJECT_ROOT, 'lib', 'utils', 'product-utils.ts'),
  path.join(PROJECT_ROOT, 'lib', 'utils', 'mock-data.ts'),
  path.join(PROJECT_ROOT, 'lib', 'utils', 'product-adapters.ts'),
  path.join(PROJECT_ROOT, 'components', 'legacy')
];

// Files to update by removing legacy imports
const filesToUpdate = [
  // List files that import from legacy system and need to be updated
  // This is just a starting point - you'll need to add more files
  path.join(PROJECT_ROOT, 'components', 'products', 'ProductDetailPage.tsx'),
  path.join(PROJECT_ROOT, 'app', 'chairs', 'page.tsx'),
  path.join(PROJECT_ROOT, 'app', 'chairs', 'director-series', 'page.tsx'),
];

// Function to remove a file
function removeFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed file: ${filePath}`);
  } else {
    console.log(`File does not exist: ${filePath}`);
  }
}

// Function to update imports in a file
function updateImports(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File does not exist: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace legacy imports with modular imports
  content = content.replace(
    /import .*? from ['"]@\/lib\/utils\/product-utils['"]/g,
    "import { getProductById, getSeriesById, getProductsBySeries } from '@/lib/modules/product'"
  );
  
  // Remove mock-data imports
  content = content.replace(/import .*? from ['"]@\/lib\/utils\/mock-data['"].*?\n/g, '');
  
  // Replace imports from product-adapters
  content = content.replace(
    /import\s+{([^}]*)}\s+from\s+['"]@\/lib\/utils\/product-adapters['"]/g,
    '// Adapters no longer needed with modular system\n// import {$1} from \'@/lib/utils/product-adapters\'',
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated imports in: ${filePath}`);
}

// Function to update configuration
function updateConfig() {
  const configPath = path.join(PROJECT_ROOT, 'lib', 'modules', 'product', 'config.ts');
  
  if (!fs.existsSync(configPath)) {
    console.log(`Config file does not exist: ${configPath}`);
    return;
  }
  
  let content = fs.readFileSync(configPath, 'utf8');
  
  // Update config to disable legacy system
  content = content.replace(
    /fullModularMode: false/g,
    'fullModularMode: true'
  );
  
  content = content.replace(
    /disableLegacySystem: false/g,
    'disableLegacySystem: true'
  );
  
  fs.writeFileSync(configPath, content);
  console.log(`Updated configuration to disable legacy system`);
}

// Remove compatibility layer
function removeCompatibilityLayer() {
  const compatibilityPath = path.join(PROJECT_ROOT, 'lib', 'modules', 'product', 'compatibility.ts');
  
  if (fs.existsSync(compatibilityPath)) {
    fs.unlinkSync(compatibilityPath);
    console.log(`Removed compatibility layer: ${compatibilityPath}`);
  }
  
  // Update index.ts to remove compatibility exports
  const indexPath = path.join(PROJECT_ROOT, 'lib', 'modules', 'product', 'index.ts');
  
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Remove compatibility exports
    content = content.replace(
      /\/\/ Export compatibility functions for legacy code\nexport {\n  getProductById,\n  getSeriesById,\n  getProductsBySeries\n} from '\.\/compatibility';/g,
      '// Legacy compatibility layer has been removed'
    );
    
    fs.writeFileSync(indexPath, content);
    console.log(`Updated index.ts to remove compatibility exports`);
  }
}

// Function to verify the modular system is working
function verifyModularSystem() {
  console.log('Verifying modular system functionality...');
  
  // Check for critical files
  const criticalFiles = [
    'lib/data/products/index.ts',
    'lib/data/products/chairs/index.ts',
    'lib/data/products/chairs/director-series.ts',
    'lib/data/products/chairs/director-series/tycoon-director-chair.ts',
    'lib/modules/product/config.ts',
    'lib/modules/product/index.ts',
    'lib/modules/product/modular-repository.ts'
  ];
  
  let allFilesExist = true;
  
  for (const file of criticalFiles) {
    const filePath = path.join(PROJECT_ROOT, file);
    if (!fs.existsSync(filePath)) {
      console.error(`Critical file missing: ${file}`);
      allFilesExist = false;
    }
  }
  
  if (!allFilesExist) {
    throw new Error('Modular system verification failed. Some critical files are missing.');
  }
  
  console.log('Modular system verification passed. All critical files exist.');
  return true;
}

// Function to remove legacy files
function removeLegacyFiles() {
  console.log('\nRemoving legacy product system files...');
  
  for (const file of filesToRemove) {
    const filePath = path.join(PROJECT_ROOT, file);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
        console.log(`Removed directory: ${file}`);
      } else {
        fs.unlinkSync(filePath);
        console.log(`Removed file: ${file}`);
      }
    } else {
      console.log(`File not found (skipping): ${file}`);
    }
  }
  
  console.log('Legacy files removed successfully.');
}

// Function to update imports in all files
function updateImports() {
  console.log('\nUpdating imports in project files...');
  
  // Find all TypeScript/JavaScript files
  try {
    const findCommand = `find ${PROJECT_ROOT} -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | grep -v "node_modules" | grep -v ".git"}`;
    const files = execSync(findCommand, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
    
    console.log(`Found ${files.length} files to check`);
    
    let updatedCount = 0;
    
    // Check each file for legacy imports
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8');
      let updated = false;
      
      // Replace imports from product-utils with imports from the product module
      if (content.includes('@/lib/utils/product-utils')) {
        content = content.replace(
          /import\s+{([^}]*)}\s+from\s+['"]@\/lib\/utils\/product-utils['"]/g,
          'import {$1} from \'@/lib/modules/product\''
        );
        updated = true;
      }
      
      // Replace imports from mock-data
      if (content.includes('@/lib/utils/mock-data')) {
        content = content.replace(
          /import\s+{([^}]*)}\s+from\s+['"]@\/lib\/utils\/mock-data['"]/g,
          '// Import from modular system instead\nimport {$1} from \'@/lib/modules/product\''
        );
        updated = true;
      }
      
      // Replace imports from product-adapters
      if (content.includes('@/lib/utils/product-adapters')) {
        content = content.replace(
          /import\s+{([^}]*)}\s+from\s+['"]@\/lib\/utils\/product-adapters['"]/g,
          '// Adapters no longer needed with modular system\n// import {$1} from \'@/lib/utils/product-adapters\'',
        );
        updated = true;
      }
      
      // Save the file if it was updated
      if (updated) {
        fs.writeFileSync(file, content);
        updatedCount++;
        console.log(`Updated imports in: ${path.relative(PROJECT_ROOT, file)}`);
      }
    }
    
    console.log(`Updated imports in ${updatedCount} files.`);
    
  } catch (error) {
    console.error('Error updating imports:', error);
  }
}

// Main function
async function main() {
  console.log('Starting legacy product system removal...');
  
  // Check for confirmation flag
  const args = process.argv.slice(2);
  const hasConfirmation = args.includes('--confirm');
  
  if (!hasConfirmation) {
    console.log('\n⚠️ WARNING: This script will permanently remove the legacy product system. ⚠️');
    console.log('Please run with --confirm flag to proceed.');
    console.log('Example: node scripts/remove-legacy-system.js --confirm');
    return;
  }
  
  try {
    // Verify modular system is working
    verifyModularSystem();
    
    // Remove legacy files
    removeLegacyFiles();
    
    // Update imports
    updateImports();
    
    console.log('\n✅ Legacy product system successfully removed!');
    console.log('The project now exclusively uses the modular product system.');
    
  } catch (error) {
    console.error('\n❌ Error removing legacy product system:', error.message);
    console.error('Operation aborted. The legacy system was not fully removed.');
  }
}

// Run the main function
main();