#!/usr/bin/env node

/**
 * File Naming Linter
 * 
 * This script checks if files in the project follow the established naming conventions.
 * It reports any files that don't adhere to the standards defined in the file-consolidation-best-practices.md.
 * 
 * Usage: node lint-file-names.js [directory]
 * Default directory is the current directory.
 */

const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

// Directories to skip
const SKIP_DIRECTORIES = ['node_modules', '.git', 'dist', 'build', '.next', 'removed-duplicates-backup'];

// Naming convention rules
const NAMING_RULES = [
  {
    type: 'React Component',
    pattern: /^[A-Z][a-zA-Z0-9]*\.(tsx|jsx)$/,
    locations: ['components', 'ui'],
    examples: ['Button.tsx', 'ProductCard.jsx'],
    exceptions: ['index.tsx', 'index.jsx']
  },
  {
    type: 'Next.js Page',
    pattern: /^(page|layout|loading|error|not-found)\.(tsx|jsx)$/,
    locations: ['app'],
    examples: ['page.tsx', 'layout.tsx', 'loading.tsx'],
    exceptions: []
  },
  {
    type: 'Dynamic Route',
    pattern: /^\[[a-zA-Z0-9_-]+\]\.(tsx|jsx)$|^\[[a-zA-Z0-9_-]+\]\/page\.(tsx|jsx)$/,
    locations: ['app', 'pages'],
    examples: ['[productId].tsx', '[category]/page.tsx'],
    exceptions: []
  },
  {
    type: 'Utility File',
    pattern: /^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*\.(ts|js)$/,
    locations: ['lib', 'utils'],
    examples: ['string-utils.ts', 'date-helpers.js'],
    exceptions: ['index.ts', 'index.js']
  },
  {
    type: 'Hook',
    pattern: /^use[A-Z][a-zA-Z0-9]*\.(ts|tsx)$/,
    locations: ['hooks'],
    examples: ['useProduct.ts', 'useCart.tsx'],
    exceptions: ['index.ts']
  },
  {
    type: 'Test File',
    pattern: /^[a-zA-Z0-9_-]+\.(test|spec)\.(ts|tsx|js|jsx)$/,
    locations: ['__tests__', 'tests'],
    examples: ['Button.test.tsx', 'product-utils.spec.ts'],
    exceptions: []
  },
  {
    type: 'API Route',
    pattern: /^route\.(ts|js)$/,
    locations: ['api'],
    examples: ['route.ts'],
    exceptions: []
  },
  {
    type: 'Configuration File',
    pattern: /^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*\.(config|rc)\.(js|ts|json)$|^\.[a-zA-Z0-9_-]+rc(\.json)?$/,
    locations: ['.'],
    examples: ['tailwind.config.js', 'jest.config.js', '.eslintrc.json'],
    exceptions: []
  },
  {
    type: 'Documentation',
    pattern: /^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*\.(md|mdx)$/,
    locations: ['docs'],
    examples: ['api-documentation.md', 'style-guide.mdx'],
    exceptions: ['README.md', 'CHANGELOG.md', 'LICENSE.md']
  }
];

// Check if a file follows the naming conventions
function checkFileName(filePath, fileName) {
  const fileDir = path.dirname(filePath);
  const issues = [];

  // Check for temporary/duplicate indicators in the name
  if (/-new\.|\.new\.|\.bak|\.backup|-fixed\.|-clean\.|-enhanced\./.test(fileName)) {
    issues.push({
      type: 'Temporary File',
      issue: `File name contains temporary indicators (-new, .bak, -fixed, etc.)`,
      recommendation: `Rename to remove temporary indicators or consolidate with the canonical version`
    });
  }
  
  // Check for version numbers in the name
  if (/-v\d+\.|-version\d+\./.test(fileName)) {
    issues.push({
      type: 'Versioned File',
      issue: `File name contains version numbers`,
      recommendation: `Use git for versioning instead of including version numbers in file names`
    });
  }

  // Check against naming rules
  let matchedAnyRule = false;
  
  for (const rule of NAMING_RULES) {
    // Check if file is in a location where this rule applies
    const isInRelevantLocation = rule.locations.some(loc => 
      fileDir.includes(`/${loc}/`) || fileDir.endsWith(`/${loc}`)
    );
    
    if (isInRelevantLocation) {
      // Check if file matches the pattern or is an exception
      const matchesPattern = rule.pattern.test(fileName);
      const isException = rule.exceptions.includes(fileName);
      
      if (matchesPattern || isException) {
        matchedAnyRule = true;
        break;
      } else {
        issues.push({
          type: rule.type,
          issue: `File does not follow ${rule.type} naming convention`,
          recommendation: `Rename to match pattern like: ${rule.examples.join(', ')}`
        });
      }
    }
  }
  
  // If file didn't match any specific rule locations, check for general patterns
  if (!matchedAnyRule && issues.length === 0) {
    // General file naming checks
    if (!/^[a-zA-Z0-9_.-]+\.[a-zA-Z0-9_.-]+$/.test(fileName)) {
      issues.push({
        type: 'General',
        issue: `File name contains unusual characters`,
        recommendation: `Use alphanumeric characters, hyphens, underscores, and periods only`
      });
    }
  }
  
  return issues;
}

// Recursively scan a directory for files with naming issues
async function scanDirectory(dir, results = []) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!SKIP_DIRECTORIES.includes(entry.name)) {
          await scanDirectory(fullPath, results);
        }
      } else if (entry.isFile()) {
        const issues = checkFileName(fullPath, entry.name);
        
        if (issues.length > 0) {
          results.push({
            file: fullPath,
            issues
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
  
  return results;
}

// Generate a markdown report of files with naming issues
function generateMarkdownReport(results) {
  let markdown = '# File Naming Convention Issues\n\n';
  
  if (results.length === 0) {
    markdown += 'No file naming issues found. All files follow the conventions!\n';
    return markdown;
  }
  
  markdown += `Found ${results.length} files with naming convention issues:\n\n`;
  
  // Group by issue type
  const issueTypes = {};
  
  for (const result of results) {
    for (const issue of result.issues) {
      if (!issueTypes[issue.type]) {
        issueTypes[issue.type] = [];
      }
      issueTypes[issue.type].push({
        file: result.file,
        issue: issue.issue,
        recommendation: issue.recommendation
      });
    }
  }
  
  // Generate report by issue type
  for (const [type, issues] of Object.entries(issueTypes)) {
    markdown += `## ${type} Issues\n\n`;
    markdown += '| File | Issue | Recommendation |\n';
    markdown += '|------|-------|----------------|\n';
    
    for (const issue of issues) {
      const relativeFile = issue.file.replace(/\\/g, '/');
      markdown += `| \`${relativeFile}\` | ${issue.issue} | ${issue.recommendation} |\n`;
    }
    
    markdown += '\n';
  }
  
  markdown += '## How to Fix\n\n';
  markdown += '1. Rename files to follow the conventions outlined in file-consolidation-best-practices.md\n';
  markdown += '2. Update any imports that reference these files\n';
  markdown += '3. Run this linter again to verify the issues are resolved\n';
  markdown += '4. For temporary files, consider consolidating with the canonical version\n\n';
  
  markdown += '## Reference\n\n';
  markdown += 'See file-consolidation-best-practices.md for comprehensive naming conventions.\n';
  
  return markdown;
}

// Main function
async function main() {
  try {
    const directory = process.argv[2] || '.';
    console.log(`Scanning directory: ${directory}`);
    
    const results = await scanDirectory(directory);
    console.log(`Found ${results.length} files with naming convention issues.`);
    
    const report = generateMarkdownReport(results);
    const reportPath = path.join(directory, 'file-naming-issues.md');
    fs.writeFileSync(reportPath, report);
    
    console.log(`Report generated at: ${reportPath}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();