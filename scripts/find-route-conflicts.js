// This script finds all dynamic route files in the project and reports on parameter naming inconsistencies
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define the project root
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Define expected parameter names (based on our conventions)
const EXPECTED_PARAMS = {
  categoryId: ['categoryId'], // Allow only 'categoryId' for category level
  seriesId: ['seriesId'],     // Allow only 'seriesId' for series level
  productId: ['productId'],   // Allow only 'productId' for product level
  variantId: ['variantId']    // Allow only 'variantId' for variant level
};

// Find all files in app directory with dynamic segments ([...])
const findDynamicRouteFiles = () => {
  const files = glob.sync('app/**/[[]*[]]*/**/*.{js,jsx,ts,tsx}', {
    cwd: PROJECT_ROOT,
    absolute: true
  });
  
  return files;
};

// Analyze a file path to extract dynamic segments
const analyzePath = (filePath) => {
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  const pathSegments = relativePath.split(path.sep);
  
  const dynamicSegments = pathSegments
    .filter(segment => segment.startsWith('[') && segment.endsWith(']'))
    .map(segment => {
      // Extract parameter name from [paramName]
      const paramName = segment.slice(1, -1);
      return {
        segment,
        paramName,
        level: pathSegments.indexOf(segment)
      };
    });
  
  return {
    filePath,
    relativePath,
    dynamicSegments
  };
};

// Find conflicts in dynamic segments
const findConflicts = (routeFiles) => {
  const analyzeResults = routeFiles.map(analyzePath);
  const levelMap = {};
  const conflicts = [];
  
  // Group parameters by their position in the URL path
  analyzeResults.forEach(result => {
    result.dynamicSegments.forEach(segment => {
      if (!levelMap[segment.level]) {
        levelMap[segment.level] = new Set();
      }
      levelMap[segment.level].add(segment.paramName);
    });
  });
  
  // Look for levels with multiple different parameter names
  Object.entries(levelMap).forEach(([level, params]) => {
    if (params.size > 1) {
      conflicts.push({
        level: parseInt(level),
        params: Array.from(params),
        files: analyzeResults
          .filter(result => result.dynamicSegments.some(seg => seg.level === parseInt(level)))
          .map(result => result.relativePath)
      });
    }
  });
  
  return conflicts;
};

// Main execution
try {
  console.log('Analyzing dynamic routes for parameter naming conflicts...');
  
  const routeFiles = findDynamicRouteFiles();
  console.log(`Found ${routeFiles.length} files with dynamic route segments`);
  
  const conflicts = findConflicts(routeFiles);
  
  if (conflicts.length === 0) {
    console.log('No parameter naming conflicts found!');
  } else {
    console.log(`Found ${conflicts.length} parameter naming conflicts:`);
    conflicts.forEach(conflict => {
      console.log(`\nConflict at level ${conflict.level}:`);
      console.log(`- Parameter names: ${conflict.params.join(', ')}`);
      console.log('- Affected files:');
      conflict.files.forEach(file => console.log(`  ${file}`));
    });
    
    console.log('\nTo fix these conflicts:');
    console.log('1. Choose a single parameter name for each URL position');
    console.log('2. Rename all conflicting parameters to the chosen name');
    console.log('3. Update all references to these parameters in the code');
  }
  
  // Detailed analysis of all dynamic routes
  console.log('\nDetailed analysis of all dynamic routes:');
  routeFiles.forEach(file => {
    const analysis = analyzePath(file);
    console.log(`\nFile: ${analysis.relativePath}`);
    analysis.dynamicSegments.forEach(segment => {
      console.log(`- Level ${segment.level}: ${segment.paramName}`);
    });
  });
  
} catch (error) {
  console.error('Error analyzing dynamic routes:', error);
}