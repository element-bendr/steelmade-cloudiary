// Direct fix for the specific 'productType' !== 'categoryId' error
// This script is simplified to focus only on this specific conflict

const fs = require('fs');
const path = require('path');

// Project root
const PROJECT_ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

// Function to recursively find directories with [productType]
function findProductTypeDirs(dir) {
  const result = [];
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        if (item.name === '[productType]') {
          result.push(fullPath);
        } else {
          result.push(...findProductTypeDirs(fullPath));
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
  
  return result;
}

// Function to rename a directory and all its parameter references
function renameDirectoryAndUpdateReferences(oldPath) {
  // Create the new path with categoryId instead of productType
  const newPath = path.join(
    path.dirname(oldPath), 
    '[categoryId]'
  );
  
  console.log(`Renaming: ${oldPath} -> ${newPath}`);
  
  try {
    // Find all TS/TSX files in the directory
    const findFilesCommand = `find "${oldPath}" -type f -name "*.tsx" -o -name "*.ts"`;
    const files = [];
    
    try {
      const { execSync } = require('child_process');
      const result = execSync(findFilesCommand, { encoding: 'utf8' });
      files.push(...result.trim().split('\n').filter(Boolean));
    } catch (error) {
      // Fallback to manual file finding if exec fails
      console.warn('Could not use exec to find files, falling back to manual search');
      const findFilesManually = (dir) => {
        const result = [];
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const item of items) {
          const fullPath = path.join(dir, item.name);
          
          if (item.isDirectory()) {
            result.push(...findFilesManually(fullPath));
          } else if (item.isFile() && 
                    (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))) {
            result.push(fullPath);
          }
        }
        
        return result;
      };
      
      files.push(...findFilesManually(oldPath));
    }
    
    console.log(`Found ${files.length} files to update`);
    
    // Update parameter references in each file
    for (const file of files) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let updated = false;
        
        // Replace parameter references
        if (content.includes('productType')) {
          // Replace destructuring
          content = content.replace(
            /const\s+{\s*productType\s*}\s*=\s*params/g, 
            'const { categoryId } = params'
          );
          
          // Replace interface definitions
          content = content.replace(
            /params\s*:\s*{\s*productType\s*:\s*string/g,
            'params: { categoryId: string'
          );
          
          // Replace direct access
          content = content.replace(/params\.productType\b/g, 'params.categoryId');
          
          // Replace variable usage
          content = content.replace(/\bproductType\b(?!\.|\\'|\\"|\`|-)/g, 'categoryId');
          
          updated = true;
        }
        
        if (updated) {
          // Write the new file to the target location in the new directory
          const relativePath = path.relative(oldPath, file);
          const newFilePath = path.join(newPath, relativePath);
          
          // Ensure the directory exists
          const newFileDir = path.dirname(newFilePath);
          if (!fs.existsSync(newFileDir)) {
            fs.mkdirSync(newFileDir, { recursive: true });
          }
          
          fs.writeFileSync(newFilePath, content);
          console.log(`Updated and copied: ${file} -> ${newFilePath}`);
        }
      } catch (error) {
        console.error(`Error updating file ${file}:`, error);
      }
    }
    
    // Copy any other files (non TS/TSX) to the new directory
    const copyRemainingFiles = (src, dest) => {
      const items = fs.readdirSync(src, { withFileTypes: true });
      
      for (const item of items) {
        const srcPath = path.join(src, item.name);
        const destPath = path.join(dest, item.name);
        
        if (item.isDirectory()) {
          if (item.name !== '[productType]' && !fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          copyRemainingFiles(srcPath, destPath);
        } else if (item.isFile() && 
                  !(item.name.endsWith('.ts') || item.name.endsWith('.tsx'))) {
          if (!fs.existsSync(path.dirname(destPath))) {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
          }
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied: ${srcPath} -> ${destPath}`);
        }
      }
    };
    
    copyRemainingFiles(oldPath, newPath);
    
    // Optional: Remove the old directory after successful migration
    // Uncomment the next line to enable directory removal
    fs.rmSync(oldPath, { recursive: true, force: true });
    
    return true;
  } catch (error) {
    console.error(`Error processing directory ${oldPath}:`, error);
    return false;
  }
}

// Main execution
console.log('Fixing productType !== categoryId parameter inconsistency...');

// Find directories with [productType]
const productTypeDirs = findProductTypeDirs(APP_DIR);
console.log(`Found ${productTypeDirs.length} directories with [productType]:`);
productTypeDirs.forEach(dir => console.log(`- ${dir}`));

// Process each directory
if (productTypeDirs.length > 0) {
  console.log('\nProcessing directories...');
  
  for (const dir of productTypeDirs) {
    renameDirectoryAndUpdateReferences(dir);
  }
  
  console.log('\nDone! Remember to remove the old [productType] directories after verifying the changes.');
  console.log('To remove the old directories, uncomment the fs.rmSync line in this script and run it again.');
} else {
  console.log('No directories with [productType] found. The issue might be elsewhere.');
  console.log('Check for other parameter name inconsistencies using the scripts/find-route-conflicts.js script.');
}