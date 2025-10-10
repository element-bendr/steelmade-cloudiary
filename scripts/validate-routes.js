/**
 * This script performs a comprehensive validation of the application's route structure
 * to detect potential issues before they cause Next.js build errors.
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // You may need to install this: npm install chalk

// Project root directory
const PROJECT_ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

// Regex patterns for route segments
const DYNAMIC_SEGMENT_REGEX = /^\[([^\]]+)\]$/;
const CATCH_ALL_REGEX = /^\[\.\.\.([^\]]+)\]$/;
const OPTIONAL_CATCH_ALL_REGEX = /^\[\[\.\.\.([^\]]+)\]\]$/;

// Standard parameter names we recommend
const STANDARD_PARAMS = {
  1: 'categoryId',
  2: 'seriesId',
  3: 'productId',
  4: 'variantId',
  5: 'subVariantId'
};

// Tracking for validation
const validationResults = {
  routes: [],
  dynamicSegments: [],
  issues: {
    inconsistentNaming: [],
    duplicateParams: [],
    invalidFolderNames: [],
    missingPages: [],
    nonStandardNames: []
  }
};

// Utility for consistent logging
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  let coloredMessage;
  
  switch (type) {
    case 'error':
      coloredMessage = chalk.red(message);
      break;
    case 'warning':
      coloredMessage = chalk.yellow(message);
      break;
    case 'success':
      coloredMessage = chalk.green(message);
      break;
    default:
      coloredMessage = chalk.white(message);
  }
  
  console.log(`[${timestamp}] ${coloredMessage}`);
}

// Function to recursively scan for routes
function scanRoutes(dir, currentPath = [], level = 0) {
  // Skip node_modules and hidden directories
  if (dir.includes('node_modules') || path.basename(dir).startsWith('.')) {
    return;
  }
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    // Check if this is a valid route (has page.js/ts/tsx or route.js/ts)
    const hasPage = items.some(item => 
      !item.isDirectory() && 
      (item.name === 'page.js' || item.name === 'page.tsx' || item.name === 'page.ts' || 
       item.name === 'route.js' || item.name === 'route.ts')
    );
    
    if (hasPage) {
      // This is a valid route endpoint
      validationResults.routes.push({
        path: currentPath.join('/'),
        dir,
        level
      });
    }
    
    // Process directories for deeper routes
    for (const item of items) {
      if (!item.isDirectory()) continue;
      
      const fullPath = path.join(dir, item.name);
      const newPathSegment = item.name;
      
      // Check if this is a dynamic segment
      const dynamicMatch = newPathSegment.match(DYNAMIC_SEGMENT_REGEX);
      const catchAllMatch = newPathSegment.match(CATCH_ALL_REGEX);
      const optionalCatchAllMatch = newPathSegment.match(OPTIONAL_CATCH_ALL_REGEX);
      
      if (dynamicMatch || catchAllMatch || optionalCatchAllMatch) {
        let paramName;
        let segmentType;
        
        if (dynamicMatch) {
          paramName = dynamicMatch[1];
          segmentType = 'dynamic';
        } else if (catchAllMatch) {
          paramName = catchAllMatch[1];
          segmentType = 'catch-all';
        } else if (optionalCatchAllMatch) {
          paramName = optionalCatchAllMatch[1];
          segmentType = 'optional-catch-all';
        }
        
        // Validate folder naming
        if (!/^[a-zA-Z0-9_]+$/.test(paramName)) {
          validationResults.issues.invalidFolderNames.push({
            path: [...currentPath, newPathSegment].join('/'),
            paramName,
            reason: 'Parameter name contains invalid characters'
          });
        }
        
        // Check for recommended naming
        const standardName = STANDARD_PARAMS[level + 1];
        if (standardName && paramName !== standardName && 
            !paramName.startsWith(standardName) && // Allow seriesId1, etc.
            !paramName.endsWith('Id')) {
          validationResults.issues.nonStandardNames.push({
            path: [...currentPath, newPathSegment].join('/'),
            paramName,
            recommendedName: standardName,
            level: level + 1
          });
        }
        
        // Track this dynamic segment for further validation
        validationResults.dynamicSegments.push({
          path: [...currentPath, newPathSegment].join('/'),
          paramName,
          segmentType,
          level: level + 1,
          dir: fullPath
        });
      }
      
      // Recurse to deeper levels
      scanRoutes(fullPath, [...currentPath, newPathSegment], level + 1);
    }
  } catch (error) {
    log(`Error scanning directory ${dir}: ${error.message}`, 'error');
  }
}

// Function to validate dynamic segments
function validateDynamicSegments() {
  const { dynamicSegments } = validationResults;
  
  // Group segments by level to check for inconsistent naming
  const segmentsByLevel = {};
  dynamicSegments.forEach(segment => {
    if (!segmentsByLevel[segment.level]) {
      segmentsByLevel[segment.level] = [];
    }
    segmentsByLevel[segment.level].push(segment);
  });
  
  // Check for inconsistent naming at the same level
  Object.entries(segmentsByLevel).forEach(([level, segments]) => {
    const paramNames = new Set(segments.map(s => s.paramName));
    
    if (paramNames.size > 1) {
      // There are inconsistent parameter names at this level
      validationResults.issues.inconsistentNaming.push({
        level: parseInt(level, 10),
        paramNames: Array.from(paramNames)
      });
    }
  });
  
  // Check for duplicate parameters in the same path
  // Group segments by path prefix
  const segmentsByPathPrefix = {};
  dynamicSegments.forEach(segment => {
    const pathParts = segment.path.split('/');
    const parentPath = pathParts.slice(0, -1).join('/');
    
    if (!segmentsByPathPrefix[parentPath]) {
      segmentsByPathPrefix[parentPath] = [];
    }
    segmentsByPathPrefix[parentPath].push(segment);
  });
  
  // Check each path for duplicate parameter names
  Object.entries(segmentsByPathPrefix).forEach(([parentPath, segments]) => {
    const pathSegments = segments.filter(s => s.path.startsWith(parentPath + '/'));
    const paramCounts = {};
    
    pathSegments.forEach(segment => {
      if (!paramCounts[segment.paramName]) {
        paramCounts[segment.paramName] = [];
      }
      paramCounts[segment.paramName].push(segment);
    });
    
    // Find duplicates
    Object.entries(paramCounts).forEach(([paramName, occurrences]) => {
      if (occurrences.length > 1) {
        validationResults.issues.duplicateParams.push({
          paramName,
          occurrences: occurrences.map(o => o.path)
        });
      }
    });
  });
  
  // Check for missing page files
  dynamicSegments.forEach(segment => {
    const hasPage = fs.existsSync(path.join(segment.dir, 'page.js')) || 
                   fs.existsSync(path.join(segment.dir, 'page.tsx')) ||
                   fs.existsSync(path.join(segment.dir, 'page.ts'));
    const hasRoute = fs.existsSync(path.join(segment.dir, 'route.js')) ||
                    fs.existsSync(path.join(segment.dir, 'route.ts'));
    
    if (!hasPage && !hasRoute) {
      validationResults.issues.missingPages.push({
        path: segment.path,
        paramName: segment.paramName
      });
    }
  });
}

// Function to print validation results
function printValidationResults() {
  const { routes, issues } = validationResults;
  
  log('\n=== Route Structure Validation Results ===\n', 'info');
  
  log(`Found ${routes.length} routes in the application`, 'info');
  
  // Print issues if any
  const hasIssues = Object.values(issues).some(arr => arr.length > 0);
  
  if (!hasIssues) {
    log('\n✅ No issues found! Your route structure looks good.', 'success');
    return;
  }
  
  log('\n=== Issues Found ===\n', 'warning');
  
  // Inconsistent naming
  if (issues.inconsistentNaming.length > 0) {
    log('\n❌ Inconsistent Parameter Naming:', 'error');
    issues.inconsistentNaming.forEach(issue => {
      log(`  Level ${issue.level}: Found different parameter names: ${issue.paramNames.join(', ')}`, 'error');
      log(`  Fix: Use a consistent parameter name at this level (recommended: ${STANDARD_PARAMS[issue.level]})`, 'info');
    });
  }
  
  // Duplicate parameters
  if (issues.duplicateParams.length > 0) {
    log('\n❌ Duplicate Parameters in Paths:', 'error');
    issues.duplicateParams.forEach(issue => {
      log(`  Parameter '${issue.paramName}' appears multiple times in:`, 'error');
      issue.occurrences.forEach(path => log(`    - ${path}`, 'error'));
      log(`  Fix: Use indexed parameters (${issue.paramName}1, ${issue.paramName}2, etc.)`, 'info');
    });
  }
  
  // Invalid folder names
  if (issues.invalidFolderNames.length > 0) {
    log('\n❌ Invalid Folder Names:', 'error');
    issues.invalidFolderNames.forEach(issue => {
      log(`  ${issue.path}: '${issue.paramName}' - ${issue.reason}`, 'error');
      log(`  Fix: Use only alphanumeric characters and underscores in parameter names`, 'info');
    });
  }
  
  // Missing pages
  if (issues.missingPages.length > 0) {
    log('\n⚠️ Dynamic Segments Without Page Files:', 'warning');
    issues.missingPages.forEach(issue => {
      log(`  ${issue.path}: No page.js/tsx or route.js/ts file found`, 'warning');
      log(`  Consider adding a page file or removing this directory if not needed`, 'info');
    });
  }
  
  // Non-standard names
  if (issues.nonStandardNames.length > 0) {
    log('\n⚠️ Non-Standard Parameter Names:', 'warning');
    issues.nonStandardNames.forEach(issue => {
      log(`  ${issue.path}: Using '${issue.paramName}' instead of recommended '${issue.recommendedName}'`, 'warning');
      log(`  Consider renaming for consistency`, 'info');
    });
  }
  
  log('\n=== Recommendations ===\n', 'info');
  
  if (issues.inconsistentNaming.length > 0 || issues.duplicateParams.length > 0) {
    log('Run our automated fix scripts:', 'info');
    log('  node scripts/fix-parameter-inconsistency.js  # For inconsistent naming', 'info');
    log('  node scripts/fix-duplicate-params.js         # For duplicate parameters', 'info');
  }
  
  log('\nRefer to docs/dynamic-route-conventions.md for best practices', 'info');
}

// Main function
async function main() {
  log('Starting route structure validation...', 'info');
  
  // Scan for routes
  scanRoutes(APP_DIR);
  
  // Validate dynamic segments
  validateDynamicSegments();
  
  // Print results
  printValidationResults();
}

// Run the main function
main().catch(error => {
  log(`Error during validation: ${error.message}`, 'error');
  console.error(error);
});