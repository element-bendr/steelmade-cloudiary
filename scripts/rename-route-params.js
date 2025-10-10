// This script automatically renames dynamic route parameters in all affected files
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define the project root
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Define parameter renaming mapping
const PARAM_RENAME_MAP = {
  'productType': 'categoryId',
  'category': 'categoryId',
  'series': 'seriesId',
  'product': 'productId',
  'variant': 'variantId'
};

// Find all files with dynamic route segments in folder names
const findDynamicRouteFolders = () => {
  const folders = glob.sync('app/**/[[]*[]]*', {
    cwd: PROJECT_ROOT,
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    cwd: PROJECT_ROOT
  });
  
  return folders.filter(folder => fs.statSync(folder).isDirectory());
};

// Find all potential code files that might reference the parameters
const findCodeFiles = () => {
  return glob.sync('app/**/*.{js,jsx,ts,tsx}', {
    cwd: PROJECT_ROOT,
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
  });
};

// Rename a dynamic segment folder
const renameDynamicFolder = (folderPath) => {
  const dirName = path.basename(folderPath);
  const paramName = dirName.slice(1, -1); // Extract name from [name]
  
  if (PARAM_RENAME_MAP[paramName]) {
    const newDirName = `[${PARAM_RENAME_MAP[paramName]}]`;
    const newPath = path.join(path.dirname(folderPath), newDirName);
    
    console.log(`Renaming folder: ${dirName} -> ${newDirName}`);
    console.log(`  ${folderPath} -> ${newPath}`);
    
    // Uncomment to actually perform the rename
    // fs.renameSync(folderPath, newPath);
    
    return {
      oldPath: folderPath,
      newPath,
      oldParam: paramName,
      newParam: PARAM_RENAME_MAP[paramName]
    };
  }
  
  return null;
};

// Update parameter references in a code file
const updateParamReferences = (filePath, renamedParams) => {
  if (!fs.existsSync(filePath)) return null;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  // Check for parameter usage in params object destructuring
  for (const [oldParam, newParam] of Object.entries(PARAM_RENAME_MAP)) {
    // Match cases like { params: { productType } } or { params: { productType: string } }
    const regex1 = new RegExp(`params\\s*:\\s*{[^}]*?\\b${oldParam}\\b[^}]*?}`, 'g');
    if (regex1.test(content)) {
      console.log(`Updating param references in ${filePath}: ${oldParam} -> ${newParam}`);
      content = content.replace(new RegExp(`\\b${oldParam}\\b(?!:)`, 'g'), newParam);
      content = content.replace(new RegExp(`\\b${oldParam}\\s*:`, 'g'), `${newParam}:`);
      updated = true;
    }
    
    // Match cases like params.productType
    const regex2 = new RegExp(`params\\.${oldParam}\\b`, 'g');
    if (regex2.test(content)) {
      console.log(`Updating params.${oldParam} references in ${filePath}`);
      content = content.replace(regex2, `params.${newParam}`);
      updated = true;
    }
  }
  
  if (updated) {
    // Uncomment to actually update the file
    // fs.writeFileSync(filePath, content);
    return {
      filePath,
      updated: true
    };
  }
  
  return null;
};

// Main execution
try {
  console.log('Analyzing and preparing to rename dynamic route parameters...');
  
  // Find folders with dynamic segments
  const dynamicFolders = findDynamicRouteFolders();
  console.log(`Found ${dynamicFolders.length} folders with dynamic route segments`);
  
  // Find all code files that might reference the parameters
  const codeFiles = findCodeFiles();
  console.log(`Found ${codeFiles.length} code files to check for parameter references`);
  
  // Analyze which folders need to be renamed
  const foldersToRename = [];
  dynamicFolders.forEach(folder => {
    const result = renameDynamicFolder(folder);
    if (result) {
      foldersToRename.push(result);
    }
  });
  
  console.log(`\nFound ${foldersToRename.length} folders to rename:`);
  foldersToRename.forEach(item => {
    console.log(`- ${path.basename(item.oldPath)} -> ${path.basename(item.newPath)}`);
  });
  
  // Find files that need parameter references updated
  console.log('\nFiles that need parameter references updated:');
  const filesToUpdate = [];
  codeFiles.forEach(file => {
    const result = updateParamReferences(file, PARAM_RENAME_MAP);
    if (result) {
      filesToUpdate.push(result);
    }
  });
  
  console.log(`\nFound ${filesToUpdate.length} files with parameter references to update`);
  
  console.log('\n-------------------------------------------------------------');
  console.log('IMPORTANT: This script is in analysis mode and will not make changes.');
  console.log('To actually perform the updates:');
  console.log('1. Review the output above');
  console.log('2. Uncomment the fs.renameSync() and fs.writeFileSync() calls');
  console.log('3. Run the script again');
  console.log('-------------------------------------------------------------');
  
} catch (error) {
  console.error('Error:', error);
}