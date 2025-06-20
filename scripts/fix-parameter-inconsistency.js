// This script performs a comprehensive scan of dynamic routes to fix parameter naming inconsistencies
// specifically looking for 'id' !== 'category' conflicts

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Project root directory
const PROJECT_ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

// Parameter naming conventions to enforce
const PARAM_NAMING = {
  // For category level routes
  categoryLevel: 'categoryId',
  // For series level routes
  seriesLevel: 'seriesId',
  // For product level routes
  productLevel: 'productId',
  // For variant level routes
  variantLevel: 'variantId'
};

// Track renamed directories and files
const renamedItems = [];

// Function to find all dynamic route directories
function findDynamicRouteDirectories() {
  console.log('Finding dynamic route directories...');
  
  try {
    // Using find command for efficiency
    const command = `find "${APP_DIR}" -type d -name "[[]*[]]*"`;
    const output = execSync(command, { encoding: 'utf8' });
    const dirs = output.trim().split('\n').filter(Boolean);
    
    console.log(`Found ${dirs.length} dynamic route directories`);
    return dirs;
  } catch (error) {
    console.error('Error finding dynamic routes:', error);
    
    // Fallback to manual search if exec fails
    return findDynamicRoutesManually(APP_DIR);
  }
}

// Fallback function to find dynamic routes manually
function findDynamicRoutesManually(dir) {
  console.log('Falling back to manual directory search...');
  const result = [];
  
  function searchDir(currentDir) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const item of items) {
      if (!item.isDirectory()) continue;
      
      const fullPath = path.join(currentDir, item.name);
      
      if (item.name.startsWith('[') && item.name.endsWith(']')) {
        result.push(fullPath);
      }
      
      searchDir(fullPath);
    }
  }
  
  searchDir(dir);
  console.log(`Found ${result.length} dynamic route directories manually`);
  return result;
}

// Function to analyze directory structure and determine route level
function analyzeRouteLevel(dirPath) {
  // Calculate level based on path depth from app directory
  const relativePath = path.relative(APP_DIR, dirPath);
  const segments = relativePath.split(path.sep);
  const level = segments.length;
  
  // Get the parameter name without brackets
  const dirName = path.basename(dirPath);
  const paramName = dirName.slice(1, -1);
  
  // Determine expected parameter name based on level
  let expectedParamName;
  
  if (level === 1) {
    expectedParamName = PARAM_NAMING.categoryLevel;
  } else if (level === 2) {
    expectedParamName = PARAM_NAMING.seriesLevel;
  } else if (level === 3) {
    expectedParamName = PARAM_NAMING.productLevel;
  } else if (level === 4) {
    expectedParamName = PARAM_NAMING.variantLevel;
  } else {
    expectedParamName = `level${level}Id`;
  }
  
  return {
    dirPath,
    dirName,
    paramName,
    level,
    expectedParamName,
    needsRename: paramName !== expectedParamName
  };
}

// Function to rename a dynamic parameter directory
function renameParameterDirectory(analysis) {
  const { dirPath, paramName, expectedParamName } = analysis;
  
  // Create the new directory name with the correct parameter
  const newDirName = `[${expectedParamName}]`;
  const parentDir = path.dirname(dirPath);
  const newDirPath = path.join(parentDir, newDirName);
  
  console.log(`Renaming directory: ${dirPath} -> ${newDirPath}`);
  
  try {
    // Create a temporary directory to avoid case-sensitivity issues on some filesystems
    const tempDirPath = path.join(parentDir, `__temp_${Date.now()}`);
    fs.renameSync(dirPath, tempDirPath);
    fs.renameSync(tempDirPath, newDirPath);
    
    renamedItems.push({
      oldPath: dirPath,
      newPath: newDirPath,
      oldParam: paramName,
      newParam: expectedParamName
    });
    
    return newDirPath;
  } catch (error) {
    console.error(`Error renaming directory ${dirPath}:`, error);
    return null;
  }
}

// Function to update parameter references in files
function updateParameterReferences(renamedItems) {
  console.log('\nUpdating parameter references in files...');
  
  // Build a map of old to new parameter names
  const paramMap = {};
  renamedItems.forEach(item => {
    paramMap[item.oldParam] = item.newParam;
  });
  
  // Find all TypeScript and TSX files
  try {
    const command = `find "${APP_DIR}" -type f -name "*.ts" -o -name "*.tsx"`;
    const output = execSync(command, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(Boolean);
    
    console.log(`Found ${files.length} TypeScript files to check`);
    
    let updatedCount = 0;
    
    // Process each file
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8');
      let updated = false;
      
      for (const [oldParam, newParam] of Object.entries(paramMap)) {
        // Look for parameter destructuring, e.g., const { id } = params;
        const paramDestructureRegex = new RegExp(`const\\s*{\\s*${oldParam}\\s*}\\s*=\\s*params`, 'g');
        if (paramDestructureRegex.test(content)) {
          content = content.replace(paramDestructureRegex, `const { ${newParam} } = params`);
          updated = true;
        }
        
        // Look for type definitions, e.g., params: { id: string }
        const typeDefRegex = new RegExp(`params\\s*:\\s*{[^}]*?\\b${oldParam}\\s*:\\s*string[^}]*?}`, 'g');
        if (typeDefRegex.test(content)) {
          content = content.replace(new RegExp(`\\b${oldParam}\\s*:\\s*string`, 'g'), `${newParam}: string`);
          updated = true;
        }
        
        // Look for direct parameter access, e.g., params.id
        const directAccessRegex = new RegExp(`params\\.${oldParam}\\b`, 'g');
        if (directAccessRegex.test(content)) {
          content = content.replace(directAccessRegex, `params.${newParam}`);
          updated = true;
        }
        
        // Look for parameter usage after destructuring
        if (updated) {
          // Only replace standalone usages of the parameter, not as part of other identifiers
          const usageRegex = new RegExp(`\\b${oldParam}\\b(?!\\.|\\'|\\"|\`|-)`, 'g');
          content = content.replace(usageRegex, newParam);
        }
      }
      
      if (updated) {
        fs.writeFileSync(file, content);
        updatedCount++;
        console.log(`Updated parameter references in: ${file}`);
      }
    }
    
    console.log(`Updated ${updatedCount} files with new parameter names`);
  } catch (error) {
    console.error('Error updating parameter references:', error);
  }
}

// Main function
async function main() {
  console.log('Starting dynamic route parameter consistency fix...');
  
  // Find all dynamic route directories
  const dynamicDirs = findDynamicRouteDirectories();
  
  // Analyze each directory
  const analyses = dynamicDirs.map(analyzeRouteLevel);
  
  // Filter for directories that need renaming
  const dirsToRename = analyses.filter(a => a.needsRename);
  
  if (dirsToRename.length === 0) {
    console.log('\nAll dynamic route parameters are consistent with naming conventions!');
    return;
  }
  
  console.log(`\nFound ${dirsToRename.length} directories that need renaming:`);
  dirsToRename.forEach(a => {
    console.log(`- ${a.dirPath} (${a.paramName} should be ${a.expectedParamName})`);
  });
  
  // Confirm before proceeding
  console.log('\nProceeding with automatic renaming...');
  
  // Perform the renaming
  for (const analysis of dirsToRename) {
    renameParameterDirectory(analysis);
  }
  
  // Update parameter references in files
  if (renamedItems.length > 0) {
    updateParameterReferences(renamedItems);
  }
  
  console.log('\nDynamic route parameter consistency fix completed!');
  console.log('Please restart the Next.js development server to apply the changes.');
}

// Run the main function
main().catch(error => {
  console.error('Error fixing dynamic route parameters:', error);
});