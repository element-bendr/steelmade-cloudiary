// This script identifies and fixes duplicate slug parameters in the same dynamic path
// It specifically looks for routes where the same parameter name appears multiple times

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Project root directory
const PROJECT_ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

// Function to find all routes in the application
function findAllRoutes() {
  console.log('Finding all routes in the application...');
  
  // Start with the app directory
  const routes = [];
  
  // Recursively explore directories to build route paths
  function exploreDirectory(dir, currentPath = []) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      if (!item.isDirectory()) continue;
      
      const fullPath = path.join(dir, item.name);
      
      // Check if it's a dynamic parameter directory
      const isDynamicDir = item.name.startsWith('[') && item.name.endsWith(']');
      
      // Add to current path
      const updatedPath = [...currentPath];
      if (isDynamicDir) {
        // Extract parameter name
        const paramName = item.name.slice(1, -1);
        updatedPath.push({ name: item.name, param: paramName, path: fullPath });
      } else {
        updatedPath.push({ name: item.name, path: fullPath });
      }
      
      // If it contains a page.tsx or route.ts, it's a valid route
      const hasPage = fs.existsSync(path.join(fullPath, 'page.tsx')) || 
                       fs.existsSync(path.join(fullPath, 'route.ts'));
      
      if (hasPage) {
        routes.push([...updatedPath]);
      }
      
      // Recurse into this directory
      exploreDirectory(fullPath, updatedPath);
    }
  }
  
  exploreDirectory(APP_DIR);
  
  console.log(`Found ${routes.length} routes in the application`);
  return routes;
}

// Function to identify routes with duplicate parameters
function findDuplicateParams(routes) {
  console.log('Looking for routes with duplicate parameters...');
  const duplicates = [];
  
  for (const route of routes) {
    // Extract parameter names from this route
    const params = route.filter(segment => segment.param).map(segment => segment.param);
    
    // Check for duplicates
    const seen = new Set();
    const duplicateParams = [];
    
    for (const param of params) {
      if (seen.has(param)) {
        duplicateParams.push(param);
      } else {
        seen.add(param);
      }
    }
    
    if (duplicateParams.length > 0) {
      duplicates.push({
        route,
        duplicateParams: [...new Set(duplicateParams)] // Unique duplicates
      });
    }
  }
  
  console.log(`Found ${duplicates.length} routes with duplicate parameters`);
  return duplicates;
}

// Function to generate a unique parameter name for a duplicate
function generateUniqueParamName(baseParam, position) {
  // If the parameter is already indexed (like seriesId1), remove the index
  const match = baseParam.match(/^(\w+)(\d+)$/);
  const baseName = match ? match[1] : baseParam;
  
  // Generate a new name based on the position
  return `${baseName}${position}`;
}

// Function to rename a parameter directory
function renameParamDir(dirInfo, newParamName) {
  const { path: dirPath, param: oldParamName } = dirInfo;
  const dirName = path.basename(dirPath);
  const parentDir = path.dirname(dirPath);
  const newDirName = `[${newParamName}]`;
  const newDirPath = path.join(parentDir, newDirName);
  
  console.log(`Renaming: ${dirPath} -> ${newDirPath}`);
  
  try {
    // Use a temporary name first to avoid case-sensitivity issues
    const tempDir = path.join(parentDir, `__temp_${Date.now()}`);
    fs.renameSync(dirPath, tempDir);
    fs.renameSync(tempDir, newDirPath);
    
    return {
      oldPath: dirPath,
      newPath: newDirPath,
      oldParam: oldParamName,
      newParam: newParamName
    };
  } catch (error) {
    console.error(`Error renaming directory: ${dirPath}`, error);
    return null;
  }
}

// Function to update references to the renamed parameter in a file
function updateParamReferencesInFile(filePath, oldParam, newParam) {
  try {
    if (!fs.existsSync(filePath)) return false;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Pattern 1: Destructuring in function params or assignments
    // Example: const { seriesId } = params;
    const destructuringPattern = new RegExp(`({[^}]*?)\\b${oldParam}\\b([^}]*})`, 'g');
    content = content.replace(destructuringPattern, (match, pre, post) => {
      updated = true;
      return `${pre}${newParam}${post}`;
    });
    
    // Pattern 2: Object property references
    // Example: params.seriesId
    const propertyPattern = new RegExp(`\\bparams\\.${oldParam}\\b`, 'g');
    content = content.replace(propertyPattern, () => {
      updated = true;
      return `params.${newParam}`;
    });
    
    // Pattern 3: Object property in TypeScript interfaces
    // Example: params: { seriesId: string }
    const interfacePattern = new RegExp(`({[^}]*?)\\b${oldParam}\\s*:\\s*([^,}]+)([^}]*})`, 'g');
    content = content.replace(interfacePattern, (match, pre, type, post) => {
      updated = true;
      return `${pre}${newParam}: ${type}${post}`;
    });
    
    // Pattern 4: Variable references (be careful with this one)
    // Example: const productUrl = `/${categoryId}/${seriesId}/${productId}`;
    // Only replace if it's a standalone identifier
    const variablePattern = new RegExp(`\\b${oldParam}\\b(?!\\s*:)`, 'g');
    
    // Check each match to ensure it's not part of another word or a property name
    let match;
    let tempContent = content;
    
    while ((match = variablePattern.exec(content)) !== null) {
      const pos = match.index;
      const fullWord = match[0];
      
      // Check if it's a standalone identifier or part of a larger expression
      const before = content.charAt(pos - 1);
      const after = content.charAt(pos + fullWord.length);
      
      // Skip if it's part of a property access or a larger identifier
      if (before === '.' || after === ':') continue;
      
      // Replace this specific occurrence
      tempContent = 
        tempContent.substring(0, pos) + 
        newParam + 
        tempContent.substring(pos + fullWord.length);
      
      updated = true;
    }
    content = tempContent;
    
    // Write changes if the file was updated
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated references in: ${filePath}`);
    }
    
    return updated;
  } catch (error) {
    console.error(`Error updating references in file ${filePath}:`, error);
    return false;
  }
}

// Function to update all files in a directory tree
function updateParamReferencesInDirectory(dirPath, oldParam, newParam) {
  try {
    const tsFiles = [];
    
    // Find all TypeScript files
    function findTsFiles(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          findTsFiles(fullPath);
        } else if (
          item.isFile() && 
          (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))
        ) {
          tsFiles.push(fullPath);
        }
      }
    }
    
    findTsFiles(dirPath);
    console.log(`Found ${tsFiles.length} TypeScript files to check in ${dirPath}`);
    
    let updatedCount = 0;
    for (const file of tsFiles) {
      if (updateParamReferencesInFile(file, oldParam, newParam)) {
        updatedCount++;
      }
    }
    
    console.log(`Updated ${updatedCount} files in ${dirPath}`);
    return updatedCount;
    
  } catch (error) {
    console.error(`Error updating references in directory ${dirPath}:`, error);
    return 0;
  }
}

// Function to fix routes with duplicate parameters
function fixDuplicateParams(duplicateRoutes) {
  console.log('\nFixing routes with duplicate parameters...');
  
  const fixed = [];
  
  for (const { route, duplicateParams } of duplicateRoutes) {
    console.log(`\nFixing route: /${route.map(s => s.name).join('/')}`);
    console.log(`Duplicate parameters: ${duplicateParams.join(', ')}`);
    
    // For each duplicate parameter, rename all but the first occurrence
    for (const duplicateParam of duplicateParams) {
      // Find all segments with this parameter
      const segments = route.filter(segment => segment.param === duplicateParam);
      
      console.log(`Found ${segments.length} occurrences of '${duplicateParam}'`);
      
      // Skip the first one, rename others
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        const newParamName = generateUniqueParamName(duplicateParam, i);
        
        console.log(`Renaming occurrence #${i+1} from '${duplicateParam}' to '${newParamName}'`);
        
        // Rename the directory
        const result = renameParamDir(segment, newParamName);
        
        if (result) {
          // Update references in files
          updateParamReferencesInDirectory(result.newPath, duplicateParam, newParamName);
          
          fixed.push(result);
        }
      }
    }
  }
  
  return fixed;
}

// Main function
async function main() {
  console.log('Starting duplicate parameter detection and fix...');
  
  // Find all routes
  const routes = findAllRoutes();
  
  // Find routes with duplicate parameters
  const duplicateRoutes = findDuplicateParams(routes);
  
  if (duplicateRoutes.length === 0) {
    console.log('\nNo routes with duplicate parameters found!');
    return;
  }
  
  // Print the duplicate routes
  console.log('\nRoutes with duplicate parameters:');
  duplicateRoutes.forEach(({ route, duplicateParams }) => {
    console.log(`- /${route.map(s => s.name).join('/')}`);
    console.log(`  Duplicate parameters: ${duplicateParams.join(', ')}`);
  });
  
  // Fix the duplicate parameters
  const fixedResults = fixDuplicateParams(duplicateRoutes);
  
  if (fixedResults.length > 0) {
    console.log(`\nSuccessfully fixed ${fixedResults.length} duplicate parameters`);
    console.log('Please restart your Next.js server to apply the changes.');
    
    // Print summary of changes
    console.log('\nSummary of changes:');
    fixedResults.forEach(({ oldPath, newPath, oldParam, newParam }) => {
      console.log(`- Renamed '${oldParam}' to '${newParam}' in ${path.relative(PROJECT_ROOT, oldPath)}`);
    });
  } else {
    console.log('\nNo duplicate parameters were fixed. Please check for errors above.');
  }
}

// Run the main function
main().catch(error => {
  console.error('Error fixing duplicate parameters:', error);
});