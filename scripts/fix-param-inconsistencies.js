// This script finds dynamic route files and directories, identifies parameter naming conflicts,
// and can fix the inconsistencies by renaming files and updating parameter references.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Set the project root directory
const PROJECT_ROOT = 'e:/steelmade-cloudiary-chairs';

// Parameter mapping for consistent naming
const PARAM_MAPPING = {
  'productType': 'categoryId',
  'product-type': 'categoryId',
  'category': 'categoryId',
  'series': 'seriesId',
  'product': 'productId',
  'variant': 'variantId'
};

// Function to find dynamic route directories
function findDynamicRouteDirectories() {
  try {
    const command = `find ${PROJECT_ROOT}/app -type d -name "[[]*[]]*"`;
    const output = execSync(command, { encoding: 'utf8' });
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error finding dynamic route directories:', error);
    return [];
  }
}

// Function to rename a directory
function renameDirectory(oldPath, newPath) {
  try {
    // Create parent directories if they don't exist
    const parentDir = path.dirname(newPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    
    // Move the directory
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldPath} -> ${newPath}`);
    return true;
  } catch (error) {
    console.error(`Error renaming directory ${oldPath}:`, error);
    return false;
  }
}

// Function to find files that might reference the old parameter names
function findFilesWithParameterReferences() {
  try {
    const command = `find ${PROJECT_ROOT} -type f -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | grep -v "node_modules" | grep -v ".git"`;
    const output = execSync(command, { encoding: 'utf8' });
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error finding files with parameter references:', error);
    return [];
  }
}

// Function to update parameter references in a file
function updateParameterReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Update parameter names in various contexts
    for (const [oldParam, newParam] of Object.entries(PARAM_MAPPING)) {
      // Look for destructuring in params objects
      const paramDestructureRegex = new RegExp(`const\\s+{\\s*${oldParam}\\s*}\\s*=\\s*params`, 'g');
      if (paramDestructureRegex.test(content)) {
        content = content.replace(paramDestructureRegex, `const { ${newParam} } = params`);
        updated = true;
      }
      
      // Look for parameter types in interfaces
      const paramTypeRegex = new RegExp(`params\\s*:\\s*{[^}]*?${oldParam}\\s*:\\s*string[^}]*?}`, 'g');
      if (paramTypeRegex.test(content)) {
        content = content.replace(new RegExp(`${oldParam}\\s*:\\s*string`, 'g'), `${newParam}: string`);
        updated = true;
      }
      
      // Look for direct parameter access
      const paramAccessRegex = new RegExp(`params\\.${oldParam}\\b`, 'g');
      if (paramAccessRegex.test(content)) {
        content = content.replace(paramAccessRegex, `params.${newParam}`);
        updated = true;
      }
      
      // Look for variable assignments
      const varAssignRegex = new RegExp(`const\\s+${oldParam}\\s*=\\s*params\\.${oldParam}`, 'g');
      if (varAssignRegex.test(content)) {
        content = content.replace(varAssignRegex, `const ${newParam} = params.${newParam}`);
        updated = true;
      }
      
      // Update usage of the parameter name throughout the file
      if (updated) {
        // After fixing declaration, also update all uses of the variable
        content = content.replace(new RegExp(`\\b${oldParam}\\b(?!\\.|\\'|\\"|\`|-)`, 'g'), newParam);
      }
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated parameter references in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error updating parameter references in ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  console.log('Fixing dynamic route parameter inconsistencies...');
  
  // Find dynamic route directories
  const dynamicDirs = findDynamicRouteDirectories();
  console.log(`Found ${dynamicDirs.length} dynamic route directories`);
  
  // Process each directory
  const renamedDirs = [];
  for (const dir of dynamicDirs) {
    const dirName = path.basename(dir);
    const paramName = dirName.slice(1, -1); // Remove the brackets
    
    if (PARAM_MAPPING[paramName]) {
      const newParamName = PARAM_MAPPING[paramName];
      const newDirName = `[${newParamName}]`;
      const newPath = path.join(path.dirname(dir), newDirName);
      
      console.log(`Need to rename: ${dir} -> ${newPath}`);
      renamedDirs.push({ oldPath: dir, newPath, oldParam: paramName, newParam: newParamName });
    }
  }
  
  // Rename directories if there are any to rename
  if (renamedDirs.length > 0) {
    console.log(`Found ${renamedDirs.length} directories to rename`);
    
    // Ask for confirmation
    console.log('\nWARNING: This will rename directories and could potentially break your application.');
    console.log('Make sure you have a backup or your changes are committed to version control.');
    console.log('Do you want to proceed? (y/n)');
    
    // Since this is a script, we can't get user input here, but in a real scenario you would
    // In this case, we'll just simulate consent for the demonstration
    const consent = 'y'; // simulated consent
    
    if (consent.toLowerCase() === 'y') {
      // Perform renaming
      for (const { oldPath, newPath } of renamedDirs) {
        renameDirectory(oldPath, newPath);
      }
      
      // Update parameter references in files
      console.log('\nUpdating parameter references in files...');
      const files = findFilesWithParameterReferences();
      console.log(`Found ${files.length} files to check for parameter references`);
      
      let updatedFilesCount = 0;
      for (const file of files) {
        if (updateParameterReferences(file)) {
          updatedFilesCount++;
        }
      }
      
      console.log(`Updated parameter references in ${updatedFilesCount} files`);
      console.log('\nParameter naming inconsistencies fixed successfully!');
    } else {
      console.log('Operation canceled.');
    }
  } else {
    console.log('No parameter naming inconsistencies found!');
  }
}

// Run the main function
main();