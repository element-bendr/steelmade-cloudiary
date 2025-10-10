// This script specifically fixes the 'id' !== 'category' conflict
// by directly targeting and fixing routes with these parameter names

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Project root directory
const PROJECT_ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

// Map of incorrect parameter names to their correct versions
const PARAM_CORRECTIONS = {
  'id': 'categoryId',       // First level should be categoryId
  'category': 'categoryId', // First level should be categoryId
  'series': 'seriesId',     // Second level should be seriesId
  'product': 'productId',   // Third level should be productId
  'variant': 'variantId'    // Fourth level should be variantId
};

// Function to find specific dynamic route directories
function findSpecificDynamicRoutes() {
  console.log('Finding problematic dynamic route directories...');
  
  const problematicDirs = [];
  
  // Create search patterns for each incorrect parameter
  Object.keys(PARAM_CORRECTIONS).forEach(param => {
    try {
      const command = `find "${APP_DIR}" -type d -name "[${param}]"`;
      const output = execSync(command, { encoding: 'utf8' });
      
      if (output.trim()) {
        const dirs = output.trim().split('\n').filter(Boolean);
        problematicDirs.push(...dirs);
      }
    } catch (error) {
      // Ignore errors, as the command might not find any matches
    }
  });
  
  return problematicDirs;
}

// Function to analyze a directory and determine correct parameter name
function analyzeDirectory(dirPath) {
  // Get the current parameter name
  const dirName = path.basename(dirPath);
  const paramName = dirName.slice(1, -1); // Remove brackets
  
  // Calculate level based on path depth from app directory
  const relativePath = path.relative(APP_DIR, dirPath);
  const segments = relativePath.split(path.sep);
  const level = segments.length;
  
  // Get the correct parameter name based on the mapping or level
  let correctParamName = PARAM_CORRECTIONS[paramName];
  
  // If no direct mapping, determine by level
  if (!correctParamName) {
    if (level === 1) correctParamName = 'categoryId';
    else if (level === 2) correctParamName = 'seriesId';
    else if (level === 3) correctParamName = 'productId';
    else if (level === 4) correctParamName = 'variantId';
    else correctParamName = `level${level}Id`;
  }
  
  return {
    dirPath,
    currentName: paramName,
    correctName: correctParamName,
    level
  };
}

// Function to rename a directory
function renameDirectory(dirInfo) {
  const { dirPath, currentName, correctName } = dirInfo;
  
  // Create the new path
  const parentDir = path.dirname(dirPath);
  const newDirPath = path.join(parentDir, `[${correctName}]`);
  
  console.log(`Renaming: ${dirPath} -> ${newDirPath}`);
  
  try {
    // Create a temporary name first to avoid case-sensitivity issues
    const tempDir = path.join(parentDir, `__temp_${Date.now()}`);
    fs.renameSync(dirPath, tempDir);
    fs.renameSync(tempDir, newDirPath);
    
    return {
      oldPath: dirPath,
      newPath: newDirPath,
      oldParam: currentName,
      newParam: correctName
    };
  } catch (error) {
    console.error(`Error renaming directory: ${dirPath}`, error);
    return null;
  }
}

// Function to update parameter references in a file
function updateParameterReferencesInFile(filePath, oldParam, newParam) {
  console.log(`Updating references in: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
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
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error updating file: ${filePath}`, error);
    return false;
  }
}

// Function to find and update all files in a directory
function updateFilesInDirectory(dirPath, oldParam, newParam) {
  console.log(`Looking for files to update in: ${dirPath}`);
  
  try {
    const command = `find "${dirPath}" -type f -name "*.ts" -o -name "*.tsx"`;
    const output = execSync(command, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(Boolean);
    
    let updatedCount = 0;
    
    for (const file of files) {
      if (updateParameterReferencesInFile(file, oldParam, newParam)) {
        updatedCount++;
      }
    }
    
    console.log(`Updated ${updatedCount} files in ${dirPath}`);
    return updatedCount;
  } catch (error) {
    console.error(`Error finding files in ${dirPath}:`, error);
    return 0;
  }
}

// Main function
async function main() {
  console.log('Starting direct fix for id/category parameter inconsistency...');
  
  // Find problematic directories
  const problematicDirs = findSpecificDynamicRoutes();
  
  if (problematicDirs.length === 0) {
    console.log('No problematic directories found with [id] or [category]!');
    return;
  }
  
  console.log(`Found ${problematicDirs.length} problematic directories:`);
  problematicDirs.forEach(dir => console.log(`- ${dir}`));
  
  // Analyze each directory
  const dirInfos = problematicDirs.map(analyzeDirectory);
  
  console.log('\nAnalysis results:');
  dirInfos.forEach(info => {
    console.log(`- ${info.dirPath}: [${info.currentName}] should be [${info.correctName}]`);
  });
  
  // Rename directories and update files
  const renamedDirs = [];
  
  for (const dirInfo of dirInfos) {
    const result = renameDirectory(dirInfo);
    
    if (result) {
      renamedDirs.push(result);
      
      // Update files in the renamed directory
      updateFilesInDirectory(
        result.newPath, 
        result.oldParam,
        result.newParam
      );
    }
  }
  
  if (renamedDirs.length > 0) {
    console.log(`\nSuccessfully renamed ${renamedDirs.length} directories.`);
    console.log('Please restart your Next.js server to apply the changes.');
  } else {
    console.log('\nNo directories were renamed. Please check for errors above.');
  }
}

// Run the main function
main().catch(error => {
  console.error('Error during execution:', error);
});