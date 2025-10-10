#!/usr/bin/env node

/**
 * Import Finder
 * 
 * This script finds all import statements in the codebase that reference specific files.
 * 
 * Usage: node find-imports.js <filepath>
 * Example: node find-imports.js lib/data/products/chairs/director-series/index-fixed.ts
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const readline = require('readline');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

// File extensions to scan
const EXTENSIONS_TO_SCAN = ['.js', '.jsx', '.ts', '.tsx'];

// Directories to skip
const SKIP_DIRECTORIES = ['node_modules', '.git', 'dist', 'build', '.next'];

/**
 * Convert a file path to an import path
 */
function filePathToImportPath(filePath) {
  // Remove extension
  let importPath = filePath.replace(/\.[^/.]+$/, '');
  
  // Convert Windows backslashes to forward slashes
  importPath = importPath.replace(/\\/g, '/');
  
  return importPath;
}

/**
 * Check if a file imports the specified file
 */
async function checkFileForImport(filePath, importToFind) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const importStatements = [];
  let lineNumber = 0;

  for await (const line of rl) {
    lineNumber++;
    
    // Look for import statements
    // Simple regex to match import statements (might need refinement for complex cases)
    const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+[^\s;]+|[^\s;,]+)\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(line)) !== null) {
      const importPath = match[1];
      
      // Check if this import matches what we're looking for
      if (importPath.includes(importToFind)) {
        importStatements.push({
          file: filePath,
          line: lineNumber,
          lineContent: line.trim(),
          importPath
        });
      }
    }
  }

  return importStatements;
}

/**
 * Recursively scan a directory for files that import the specified file
 */
async function scanDirectory(dir, importToFind, results = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!SKIP_DIRECTORIES.includes(entry.name)) {
        await scanDirectory(fullPath, importToFind, results);
      }
    } else if (entry.isFile()) {
      const extension = path.extname(entry.name).toLowerCase();
      
      if (EXTENSIONS_TO_SCAN.includes(extension)) {
        const imports = await checkFileForImport(fullPath, importToFind);
        if (imports.length > 0) {
          results.push(...imports);
        }
      }
    }
  }
  
  return results;
}

/**
 * Generate a markdown report of files that import the specified file
 */
function generateMarkdownReport(importToFind, results) {
  let markdown = `# Import Scan Results for "${importToFind}"\n\n`;
  
  if (results.length === 0) {
    markdown += 'No imports found.\n';
    return markdown;
  }
  
  markdown += `## Files that import "${importToFind}"\n\n`;
  
  // Group by file
  const fileGroups = {};
  
  for (const result of results) {
    if (!fileGroups[result.file]) {
      fileGroups[result.file] = [];
    }
    fileGroups[result.file].push(result);
  }
  
  for (const [file, imports] of Object.entries(fileGroups)) {
    const relativeFile = file.replace(/\\/g, '/');
    markdown += `### ${relativeFile}\n\n`;
    
    for (const imp of imports) {
      markdown += `- Line ${imp.line}: \`${imp.lineContent}\`\n`;
    }
    
    markdown += '\n';
  }
  
  markdown += '## Recommended Actions\n\n';
  markdown += '1. Update each import to reference the canonical file\n';
  markdown += '2. Test each file after updating imports\n';
  markdown += '3. Verify the application builds and runs correctly\n';
  
  return markdown;
}

/**
 * Main function
 */
async function main() {
  try {
    const fileToFind = process.argv[2];
    
    if (!fileToFind) {
      console.error('Please provide a file path to find imports for.');
      console.error('Usage: node find-imports.js <filepath>');
      process.exit(1);
    }
    
    const importToFind = filePathToImportPath(fileToFind);
    console.log(`Scanning for imports of: ${importToFind}`);
    
    const results = await scanDirectory('.', importToFind);
    console.log(`Found ${results.length} imports.`);
    
    const report = generateMarkdownReport(importToFind, results);
    const reportPath = path.join('.', `imports-of-${path.basename(fileToFind)}.md`);
    fs.writeFileSync(reportPath, report);
    
    console.log(`Report generated at: ${reportPath}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();