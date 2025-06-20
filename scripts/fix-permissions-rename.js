// This script renames directories with graceful error handling for Windows permission issues
// It uses a different approach that's more compatible with Windows file locking behavior

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Project root directory
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Directories that need to be renamed
const DIRECTORIES_TO_RENAME = [
  {
    path: path.join(PROJECT_ROOT, 'app', 'api', 'products', '[productId]', '[seriesId]'),
    oldName: '[seriesId]',
    newName: '[variantId]',
    oldParam: 'seriesId',
    newParam: 'variantId'
  },
  {
    path: path.join(PROJECT_ROOT, 'app', 'api', '[seriesId]', '[seriesId1]'),
    oldName: '[seriesId1]',
    newName: '[productId]',
    oldParam: 'seriesId1',
    newParam: 'productId'
  },
  {
    path: path.join(PROJECT_ROOT, 'app', 'collections', '[seriesId]', '[collectionId]'),
    oldName: '[collectionId]',
    newName: '[productId]',
    oldParam: 'collectionId',
    newParam: 'productId'
  },
  {
    path: path.join(PROJECT_ROOT, 'app', '[categoryId]', '[seriesId]', '[seriesId1]'),
    oldName: '[seriesId1]',
    newName: '[productId]',
    oldParam: 'seriesId1',
    newParam: 'productId'
  }
];

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
    
    // Pattern 4: Route config parameter access
    // Example: ROUTE_PARAMS.SERIES1
    if (oldParam === 'seriesId1') {
      const routeParamPattern = /ROUTE_PARAMS\.SERIES1/g;
      content = content.replace(routeParamPattern, () => {
        updated = true;
        return 'ROUTE_PARAMS.PRODUCT';
      });
    }
    
    // Pattern 5: Variable references (be careful with this one)
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
    
    // Pattern 6: Extract function name changes
    if (oldParam === 'seriesId1' && newParam === 'productId') {
      content = content.replace(/extractNestedSeriesParams/g, 'extractProductParams');
      content = content.replace(/nestedSeriesId/g, 'productId');
      updated = true;
    }
    
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

// Function to find all TypeScript/JavaScript files in a directory
function findTsFiles(dir) {
  const result = [];
  
  function findFiles(currentDir) {
    try {
      const items = fs.readdirSync(currentDir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item.name);
        
        if (item.isDirectory()) {
          findFiles(fullPath);
        } else if (item.isFile() && 
                  (item.name.endsWith('.ts') || 
                   item.name.endsWith('.tsx') || 
                   item.name.endsWith('.js') || 
                   item.name.endsWith('.jsx'))) {
          result.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${currentDir}:`, error);
    }
  }
  
  findFiles(dir);
  return result;
}

// Function to update all files within a directory
function updateFilesInDirectory(dirPath, oldParam, newParam) {
  try {
    const files = findTsFiles(dirPath);
    console.log(`Found ${files.length} files to check in ${dirPath}`);
    
    let updatedCount = 0;
    for (const file of files) {
      if (updateParamReferencesInFile(file, oldParam, newParam)) {
        updatedCount++;
      }
    }
    
    console.log(`Updated ${updatedCount} files in ${dirPath}`);
    return updatedCount;
  } catch (error) {
    console.error(`Error updating files in directory ${dirPath}:`, error);
    return 0;
  }
}

// Function to rename a directory using a more Windows-friendly approach
function renameDirUsingCopy(dirInfo) {
  return new Promise((resolve, reject) => {
    const { path: dirPath, oldName, newName, oldParam, newParam } = dirInfo;
    
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      console.log(`Directory does not exist: ${dirPath}`);
      return resolve(null);
    }
    
    const parentDir = path.dirname(dirPath);
    const newDirPath = path.join(parentDir, newName);
    
    console.log(`Renaming: ${dirPath} -> ${newDirPath}`);
    
    // Check if target directory already exists
    if (fs.existsSync(newDirPath)) {
      console.log(`Target directory already exists: ${newDirPath}`);
      
      // Update files in the existing directory
      updateFilesInDirectory(newDirPath, oldParam, newParam);
      return resolve({
        oldPath: dirPath,
        newPath: newDirPath,
        oldParam,
        newParam,
        status: 'target_exists'
      });
    }
    
    // Try to use fs.renameSync first, which is faster
    try {
      fs.renameSync(dirPath, newDirPath);
      console.log(`Successfully renamed directory using fs.renameSync`);
      
      // Update files in the renamed directory
      updateFilesInDirectory(newDirPath, oldParam, newParam);
      
      return resolve({
        oldPath: dirPath,
        newPath: newDirPath,
        oldParam,
        newParam,
        status: 'renamed'
      });
    } catch (error) {
      console.error(`fs.renameSync failed: ${error.message}`);
      console.log(`Attempting to use robocopy (Windows) or cp (Unix) as fallback...`);
      
      // Different commands for Windows and Unix
      let command;
      if (process.platform === 'win32') {
        // Windows - use robocopy
        command = `robocopy "${dirPath}" "${newDirPath}" /E /MOVE`;
      } else {
        // Unix-like - use cp and rm
        command = `cp -r "${dirPath}" "${newDirPath}" && rm -rf "${dirPath}"`;
      }
      
      exec(command, (error, stdout, stderr) => {
        if (error && (process.platform !== 'win32' || error.code !== 1)) {
          // On Windows, robocopy returns 1 if files were copied successfully
          console.error(`Command execution failed: ${stderr}`);
          
          // Try one more approach - create new directory and manually copy files
          try {
            console.log(`Trying manual file-by-file copy approach...`);
            
            // Create new directory
            fs.mkdirSync(newDirPath, { recursive: true });
            
            // Function to recursively copy directory contents
            function copyDir(src, dest) {
              const entries = fs.readdirSync(src, { withFileTypes: true });
              
              for (const entry of entries) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);
                
                if (entry.isDirectory()) {
                  // Create destination directory
                  fs.mkdirSync(destPath, { recursive: true });
                  // Copy contents recursively
                  copyDir(srcPath, destPath);
                } else {
                  // Copy file
                  fs.copyFileSync(srcPath, destPath);
                }
              }
            }
            
            // Copy all files and directories
            copyDir(dirPath, newDirPath);
            
            // Update files in the new directory
            updateFilesInDirectory(newDirPath, oldParam, newParam);
            
            console.log(`Manual copy successful. Original directory will be left in place.`);
            return resolve({
              oldPath: dirPath,
              newPath: newDirPath,
              oldParam,
              newParam,
              status: 'copied'
            });
          } catch (copyError) {
            console.error(`Manual copy failed: ${copyError.message}`);
            return reject(copyError);
          }
        } else {
          console.log(`Command executed successfully`);
          
          // Update files in the new directory
          updateFilesInDirectory(newDirPath, oldParam, newParam);
          
          return resolve({
            oldPath: dirPath,
            newPath: newDirPath,
            oldParam,
            newParam,
            status: 'command_success'
          });
        }
      });
    }
  });
}

// Main function
async function main() {
  console.log('Starting directory renaming with Windows-friendly approach...');
  
  const results = [];
  
  for (const dirInfo of DIRECTORIES_TO_RENAME) {
    try {
      console.log(`\nProcessing: ${dirInfo.path}`);
      const result = await renameDirUsingCopy(dirInfo);
      if (result) {
        results.push(result);
      }
    } catch (error) {
      console.error(`Error processing ${dirInfo.path}: ${error.message}`);
    }
  }
  
  console.log('\n=== Summary ===');
  console.log(`Processed ${DIRECTORIES_TO_RENAME.length} directories`);
  console.log(`Successfully renamed/copied: ${results.length}`);
  
  if (results.length > 0) {
    console.log('\nSuccessful operations:');
    results.forEach(result => {
      console.log(`- ${result.oldPath} -> ${result.newPath} (${result.status})`);
    });
    
    console.log('\nPlease restart your Next.js server to apply the changes.');
  }
}

// Run the main function
main().catch(error => {
  console.error('Error during execution:', error);
});