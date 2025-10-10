// This script validates and ensures that all route components correctly use our route parameter conventions

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Project root directory
const PROJECT_ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

// Standard parameter names
const STANDARD_PARAMS = {
  categoryLevel: 'categoryId',
  seriesLevel: 'seriesId',
  productLevel: 'productId',
  variantLevel: 'variantId'
};

// File patterns to update
const FILE_PATTERNS = [
  'page.tsx',
  'route.ts',
  'layout.tsx',
  'loading.tsx',
  'error.tsx'
];

// Imports to add
const ROUTE_CONFIG_IMPORT = `import { ROUTE_PARAMS, extractCategoryParams } from '@/lib/routes/route-config';`;
const ROUTE_CONFIG_SERIES_IMPORT = `import { ROUTE_PARAMS, extractSeriesParams } from '@/lib/routes/route-config';`;
const ROUTE_CONFIG_PRODUCT_IMPORT = `import { ROUTE_PARAMS, extractProductParams } from '@/lib/routes/route-config';`;
const ROUTE_CONFIG_VARIANT_IMPORT = `import { ROUTE_PARAMS, extractVariantParams } from '@/lib/routes/route-config';`;

// Function to find all route component files
function findRouteFiles() {
  console.log('Finding route component files...');
  
  const result = [];
  
  // Find all dynamic route directories
  try {
    const command = `find "${APP_DIR}" -type d -name "[[]*[]]*"`;
    const output = execSync(command, { encoding: 'utf8' });
    const dynamicDirs = output.trim().split('\n').filter(Boolean);
    
    // For each directory, check for route component files
    for (const dir of dynamicDirs) {
      for (const pattern of FILE_PATTERNS) {
        const filePath = path.join(dir, pattern);
        if (fs.existsSync(filePath)) {
          // Determine the route level
          const relativePath = path.relative(APP_DIR, dir);
          const segments = relativePath.split(path.sep);
          const level = segments.length;
          
          result.push({
            filePath,
            level,
            dirPath: dir,
            pattern,
            fileName: path.basename(filePath)
          });
        }
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error finding route files:', error);
    return [];
  }
}

// Function to analyze a file for parameter usage
function analyzeFile(fileInfo) {
  const { filePath, level } = fileInfo;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file already uses route-config
    const usesRouteConfig = content.includes('@/lib/routes/route-config');
    
    // Determine expected parameter names for this level
    const expectedParams = [];
    if (level >= 1) expectedParams.push(STANDARD_PARAMS.categoryLevel);
    if (level >= 2) expectedParams.push(STANDARD_PARAMS.seriesLevel);
    if (level >= 3) expectedParams.push(STANDARD_PARAMS.productLevel);
    if (level >= 4) expectedParams.push(STANDARD_PARAMS.variantLevel);
    
    // Check for parameter usage
    const paramMatches = {
      correct: [],
      incorrect: []
    };
    
    // Common parameter usage patterns
    const paramPatterns = [
      // Destructuring: const { paramName } = params;
      /const\s*{\s*([^}]+)\s*}\s*=\s*params/g,
      // Type definitions: params: { paramName: string }
      /params\s*:\s*{\s*([^}]+)\s*}/g,
      // Direct access: params.paramName
      /params\.(\w+)/g
    ];
    
    // Extract all parameter names used in the file
    const usedParams = new Set();
    for (const pattern of paramPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        // Extract parameter names from the match
        const paramText = match[1];
        const params = paramText.split(',').map(p => p.trim().split(':')[0].trim());
        
        for (const param of params) {
          if (param && !param.includes('...')) {
            usedParams.add(param);
          }
        }
      }
    }
    
    // Check each used parameter against expected parameters
    for (const param of usedParams) {
      // Skip common non-parameter variables
      if (['searchParams', 'children', 'error', 'reset'].includes(param)) continue;
      
      // Check if it's in our expected parameters
      const isCorrect = expectedParams.includes(param);
      
      if (isCorrect) {
        paramMatches.correct.push(param);
      } else {
        // Find the expected parameter for this one
        const index = ['id', 'category', 'categoryId'].includes(param) ? 0 :
                      ['series', 'seriesId'].includes(param) ? 1 :
                      ['product', 'productId'].includes(param) ? 2 :
                      ['variant', 'variantId'].includes(param) ? 3 : -1;
        
        if (index >= 0 && index < expectedParams.length) {
          paramMatches.incorrect.push({
            used: param,
            expected: expectedParams[index]
          });
        } else {
          paramMatches.incorrect.push({
            used: param,
            expected: 'unknown'
          });
        }
      }
    }
    
    return {
      ...fileInfo,
      usesRouteConfig,
      paramMatches,
      expectedParams,
      content
    };
  } catch (error) {
    console.error(`Error analyzing file ${filePath}:`, error);
    return { ...fileInfo, error: error.message };
  }
}

// Function to fix a file with incorrect parameter usage
function fixFile(fileAnalysis) {
  const { filePath, level, paramMatches, content, usesRouteConfig } = fileAnalysis;
  
  if (paramMatches.incorrect.length === 0 && usesRouteConfig) {
    console.log(`File already uses correct parameters: ${filePath}`);
    return { fixed: false };
  }
  
  console.log(`Fixing file: ${filePath}`);
  
  let newContent = content;
  
  // Add import for route-config if not present
  if (!usesRouteConfig) {
    // Determine which import to add based on the level
    let importStatement;
    if (level === 1) {
      importStatement = ROUTE_CONFIG_IMPORT;
    } else if (level === 2) {
      importStatement = ROUTE_CONFIG_SERIES_IMPORT;
    } else if (level === 3) {
      importStatement = ROUTE_CONFIG_PRODUCT_IMPORT;
    } else if (level >= 4) {
      importStatement = ROUTE_CONFIG_VARIANT_IMPORT;
    }
    
    // Add import after other imports or at the top
    if (newContent.includes('import ')) {
      // Find the last import statement
      const lastImportIndex = newContent.lastIndexOf('import ');
      const importEndIndex = newContent.indexOf(';', lastImportIndex) + 1;
      
      // Insert after the last import
      newContent = 
        newContent.substring(0, importEndIndex) + 
        '\n' + importStatement + '\n' + 
        newContent.substring(importEndIndex);
    } else {
      // No imports, add at the top
      newContent = importStatement + '\n\n' + newContent;
    }
  }
  
  // Replace incorrect parameter names
  for (const { used, expected } of paramMatches.incorrect) {
    // Replace in parameter destructuring
    const paramDestructureRegex = new RegExp(`const\\s*{\\s*${used}\\s*}\\s*=\\s*params`, 'g');
    newContent = newContent.replace(paramDestructureRegex, `const { ${expected} } = params`);
    
    // Replace in type definitions
    const typeDefRegex = new RegExp(`params\\s*:\\s*{[^}]*?\\b${used}\\s*:\\s*string[^}]*?}`, 'g');
    if (typeDefRegex.test(newContent)) {
      newContent = newContent.replace(new RegExp(`\\b${used}\\s*:\\s*string`, 'g'), `${expected}: string`);
    }
    
    // Replace direct parameter access
    const directAccessRegex = new RegExp(`params\\.${used}\\b`, 'g');
    newContent = newContent.replace(directAccessRegex, `params.${expected}`);
    
    // Replace standalone usages (be careful with this)
    const usageRegex = new RegExp(`\\b${used}\\b(?!\\.|\\'|\\"|\`|-)`, 'g');
    newContent = newContent.replace(usageRegex, expected);
    
    // Update interface definitions for params
    if (level === 1) {
      const interfaceParamsRegex = /interface\s+\w+Props\s*{\s*params\s*:\s*{[^}]*?}/g;
      newContent = newContent.replace(interfaceParamsRegex, (match) => {
        if (match.includes(used) && !match.includes(expected)) {
          return match.replace(used, expected);
        }
        return match;
      });
      
      // Replace with ROUTE_PARAMS constant
      const bracketParamRegex = new RegExp(`\\[['"]?${expected}['"]?\\]`, 'g');
      newContent = newContent.replace(bracketParamRegex, `[ROUTE_PARAMS.CATEGORY]`);
    }
  }
  
  // Update params interface to use ROUTE_PARAMS constants
  if (!usesRouteConfig) {
    // For category level
    if (level === 1) {
      const paramsInterface = /params\s*:\s*{\s*categoryId\s*:\s*string\s*}/g;
      newContent = newContent.replace(paramsInterface, 
        `params: {\n    [ROUTE_PARAMS.CATEGORY]: string\n  }`);
    }
    
    // For series level
    if (level === 2) {
      const paramsInterface = /params\s*:\s*{\s*categoryId\s*:\s*string\s*,\s*seriesId\s*:\s*string\s*}/g;
      newContent = newContent.replace(paramsInterface, 
        `params: {\n    [ROUTE_PARAMS.CATEGORY]: string,\n    [ROUTE_PARAMS.SERIES]: string\n  }`);
    }
    
    // For product level
    if (level === 3) {
      const paramsInterface = /params\s*:\s*{\s*categoryId\s*:\s*string\s*,\s*seriesId\s*:\s*string\s*,\s*productId\s*:\s*string\s*}/g;
      newContent = newContent.replace(paramsInterface, 
        `params: {\n    [ROUTE_PARAMS.CATEGORY]: string,\n    [ROUTE_PARAMS.SERIES]: string,\n    [ROUTE_PARAMS.PRODUCT]: string\n  }`);
    }
  }
  
  // Add extract function if not present
  if (!usesRouteConfig && (level === 1 || level === 2 || level === 3)) {
    // Look for places where params are destructured
    const destructureRegex = /const\s*{\s*[^}]+\s*}\s*=\s*params/g;
    const match = destructureRegex.exec(newContent);
    
    if (match) {
      let extractFunction;
      if (level === 1) {
        extractFunction = 'extractCategoryParams';
      } else if (level === 2) {
        extractFunction = 'extractSeriesParams';
      } else if (level === 3) {
        extractFunction = 'extractProductParams';
      }
      
      // Replace with extract function
      newContent = newContent.replace(match[0], `const { ${fileAnalysis.expectedParams.join(', ')} } = ${extractFunction}(params)`);
    }
  }
  
  // Write the updated content
  fs.writeFileSync(filePath, newContent);
  
  return { 
    fixed: newContent !== content,
    newContent
  };
}

// Main function
async function main() {
  console.log('Starting route parameter validation and standardization...');
  
  // Find all route files
  const routeFiles = findRouteFiles();
  console.log(`Found ${routeFiles.length} route component files`);
  
  // Analyze each file
  const analyses = routeFiles.map(analyzeFile);
  
  // Find files with incorrect parameter usage
  const filesToFix = analyses.filter(a => a.paramMatches && a.paramMatches.incorrect.length > 0);
  const filesAlreadyCorrect = analyses.filter(a => a.paramMatches && a.paramMatches.incorrect.length === 0);
  
  console.log(`\n${filesToFix.length} files need parameter fixes`);
  console.log(`${filesAlreadyCorrect.length} files already use correct parameters`);
  
  if (filesToFix.length === 0) {
    console.log('\nAll route components are using consistent parameter names!');
    return;
  }
  
  console.log('\nFiles that need fixes:');
  filesToFix.forEach(a => {
    console.log(`\n- ${a.filePath} (Level ${a.level}):`);
    a.paramMatches.incorrect.forEach(p => {
      console.log(`  - '${p.used}' should be '${p.expected}'`);
    });
  });
  
  // Fix the files
  console.log('\nFixing files...');
  
  let fixedCount = 0;
  for (const analysis of filesToFix) {
    const result = fixFile(analysis);
    if (result.fixed) {
      fixedCount++;
    }
  }
  
  console.log(`\nFixed ${fixedCount} files with incorrect parameter usage`);
  console.log('Please restart your Next.js server to apply the changes.');
}

// Run the main function
main().catch(error => {
  console.error('Error during execution:', error);
});