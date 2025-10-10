// This script updates route parameters in TypeScript files without renaming directories
// It's useful when you can't rename directories due to permission issues

const fs = require('fs');
const path = require('path');

// Project root directory
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Parameter mapping to apply (oldParam -> newParam)
const PARAM_MAPPING = [
  {
    directory: path.join(PROJECT_ROOT, 'app', 'api', 'products', '[productId]', '[seriesId]'),
    oldParam: 'seriesId',
    newParam: 'variantId',
    routeParam: {
      old: 'ROUTE_PARAMS.SERIES',
      new: 'ROUTE_PARAMS.VARIANT'
    }
  },
  {
    directory: path.join(PROJECT_ROOT, 'app', 'api', '[seriesId]', '[seriesId1]'),
    oldParam: 'seriesId1',
    newParam: 'productId',
    routeParam: {
      old: 'ROUTE_PARAMS.SERIES1',
      new: 'ROUTE_PARAMS.PRODUCT'
    }
  },
  {
    directory: path.join(PROJECT_ROOT, 'app', 'collections', '[seriesId]', '[collectionId]'),
    oldParam: 'collectionId',
    newParam: 'productId',
    routeParam: {
      old: null, // Only if used
      new: 'ROUTE_PARAMS.PRODUCT'
    }
  },
  {
    directory: path.join(PROJECT_ROOT, 'app', '[categoryId]', '[seriesId]', '[seriesId1]'),
    oldParam: 'seriesId1',
    newParam: 'productId',
    routeParam: {
      old: 'ROUTE_PARAMS.SERIES1',
      new: 'ROUTE_PARAMS.PRODUCT'
    }
  }
];

// Additional changes to apply
const FUNCTION_REPLACEMENTS = [
  {
    old: 'extractNestedSeriesParams',
    new: 'extractProductParams'
  },
  {
    old: 'buildNestedSeriesPath',
    new: 'buildProductPath'
  },
  {
    old: 'NestedSeriesParams',
    new: 'ProductParams'
  },
  {
    old: 'nestedSeriesId',
    new: 'productId'
  }
];

// Function to find all TypeScript/JavaScript files in a directory
function findTsFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory doesn't exist: ${dir}`);
    return [];
  }
  
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

// Function to update parameter references in a file
function updateFile(filePath, mapping) {
  try {
    console.log(`Checking file: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  File doesn't exist, skipping`);
      return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Pattern 1: Parameter destructuring
    // Example: const { seriesId1 } = params;
    const destructuringPattern = new RegExp(`({[^}]*?)\\b${mapping.oldParam}\\b([^}]*})`, 'g');
    if (destructuringPattern.test(content)) {
      content = content.replace(destructuringPattern, (match, pre, post) => {
        updated = true;
        console.log(`  Updated destructuring: ${mapping.oldParam} -> ${mapping.newParam}`);
        return `${pre}${mapping.newParam}${post}`;
      });
    }
    
    // Pattern 2: Direct parameter access
    // Example: params.seriesId1
    const directAccessPattern = new RegExp(`\\bparams\\.${mapping.oldParam}\\b`, 'g');
    if (directAccessPattern.test(content)) {
      content = content.replace(directAccessPattern, () => {
        updated = true;
        console.log(`  Updated direct access: params.${mapping.oldParam} -> params.${mapping.newParam}`);
        return `params.${mapping.newParam}`;
      });
    }
    
    // Pattern 3: Type definitions
    // Example: params: { seriesId1: string }
    const typeDefPattern = new RegExp(`({[^}]*?)\\b${mapping.oldParam}\\s*:\\s*([^,}]+)([^}]*})`, 'g');
    if (typeDefPattern.test(content)) {
      content = content.replace(typeDefPattern, (match, pre, type, post) => {
        updated = true;
        console.log(`  Updated type definition: ${mapping.oldParam} -> ${mapping.newParam}`);
        return `${pre}${mapping.newParam}: ${type}${post}`;
      });
    }
    
    // Pattern 4: Route params constant
    if (mapping.routeParam.old && mapping.routeParam.new) {
      const routeParamPattern = new RegExp(mapping.routeParam.old.replace('.', '\\.'), 'g');
      if (routeParamPattern.test(content)) {
        content = content.replace(routeParamPattern, () => {
          updated = true;
          console.log(`  Updated route param: ${mapping.routeParam.old} -> ${mapping.routeParam.new}`);
          return mapping.routeParam.new;
        });
      }
    }
    
    // Pattern 5: Interface definitions
    // Example: [ROUTE_PARAMS.SERIES1]: string
    if (mapping.routeParam.old) {
      const routeParamBracketPattern = new RegExp(`\\[${mapping.routeParam.old.replace('.', '\\.')}\\]\\s*:\\s*string`, 'g');
      if (routeParamBracketPattern.test(content)) {
        content = content.replace(routeParamBracketPattern, () => {
          updated = true;
          console.log(`  Updated interface definition: [${mapping.routeParam.old}] -> [${mapping.routeParam.new}]`);
          return `[${mapping.routeParam.new}]: string`;
        });
      }
    }
    
    // Additional replacements for helper functions
    for (const replacement of FUNCTION_REPLACEMENTS) {
      const funcPattern = new RegExp(`\\b${replacement.old}\\b`, 'g');
      if (funcPattern.test(content)) {
        content = content.replace(funcPattern, () => {
          updated = true;
          console.log(`  Updated function/variable: ${replacement.old} -> ${replacement.new}`);
          return replacement.new;
        });
      }
    }
    
    // Write changes if the file was updated
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`  Updated file: ${filePath}`);
      return true;
    } else {
      console.log(`  No changes needed in file`);
      return false;
    }
  } catch (error) {
    console.error(`Error updating file ${filePath}:`, error);
    return false;
  }
}

// Update all TypeScript files in a directory with a parameter mapping
function updateDirectory(mapping) {
  console.log(`\nProcessing directory: ${mapping.directory}`);
  
  // Check if directory exists
  if (!fs.existsSync(mapping.directory)) {
    console.log(`Directory doesn't exist: ${mapping.directory}`);
    return { updated: 0, total: 0 };
  }
  
  // Find all TypeScript files
  const files = findTsFiles(mapping.directory);
  console.log(`Found ${files.length} TypeScript/JavaScript files`);
  
  // Update each file
  let updatedCount = 0;
  for (const file of files) {
    if (updateFile(file, mapping)) {
      updatedCount++;
    }
  }
  
  return { updated: updatedCount, total: files.length };
}

// Main function
async function main() {
  console.log('Starting parameter name updates without directory renaming...');
  
  let totalUpdated = 0;
  let totalFiles = 0;
  
  // Process each mapping
  for (const mapping of PARAM_MAPPING) {
    const result = updateDirectory(mapping);
    totalUpdated += result.updated;
    totalFiles += result.total;
  }
  
  console.log('\n=== Summary ===');
  console.log(`Updated ${totalUpdated} out of ${totalFiles} files`);
  
  console.log('\nNote: This script updated parameter names in the code without renaming folders.');
  console.log('This approach allows your code to work correctly even with the old directory names.');
  console.log('It is recommended to eventually rename the directories to match the parameter names.');
}

// Run the main function
main().catch(error => {
  console.error('Error during execution:', error);
});