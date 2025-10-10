#!/usr/bin/env node

/**
 * File Duplication Finder
 * 
 * This script scans the project directory and identifies potential duplicate files
 * based on naming patterns like *-new.ts, *-fixed.ts, etc.
 * 
 * Usage: node find-duplicate-files.js [directory]
 * Default directory is the current directory.
 */

const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

// Patterns that indicate potential duplicate files
const DUPLICATE_PATTERNS = [
  /-new\.[jt]sx?$/,      // -new.js, -new.jsx, -new.ts, -new.tsx
  /-fixed\.[jt]sx?$/,    // -fixed.js, -fixed.jsx, -fixed.ts, -fixed.tsx
  /-clean\.[jt]sx?$/,    // -clean.js, -clean.jsx, -clean.ts, -clean.tsx
  /-enhanced\.[jt]sx?$/, // -enhanced.js, -enhanced.jsx, -enhanced.ts, -enhanced.tsx
  /\.bak$/,              // .bak files
  /\.backup$/,           // .backup files
  /\.old$/,              // .old files
  /\.orig$/              // .orig files
];

// File extensions to scan
const EXTENSIONS_TO_SCAN = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.html'];

// Directories to skip
const SKIP_DIRECTORIES = ['node_modules', '.git', 'dist', 'build', '.next'];

/**
 * Check if a file might be a duplicate based on naming patterns
 */
function isPotentialDuplicate(filename) {
  return DUPLICATE_PATTERNS.some(pattern => pattern.test(filename));
}

/**
 * Find the original file for a potential duplicate
 */
function findOriginalFile(duplicatePath) {
  const dir = path.dirname(duplicatePath);
  const filename = path.basename(duplicatePath);
  
  // Try various patterns to find the original
  for (const pattern of DUPLICATE_PATTERNS) {
    const match = filename.match(pattern);
    if (match) {
      const baseName = filename.replace(pattern, '');
      const ext = path.extname(duplicatePath);
      const originalName = baseName + ext;
      const originalPath = path.join(dir, originalName);
      
      if (fs.existsSync(originalPath)) {
        return originalPath;
      }
    }
  }
  
  return null;
}

/**
 * Recursively scan a directory for potential duplicate files
 */
async function scanDirectory(dir, results = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!SKIP_DIRECTORIES.includes(entry.name)) {
        await scanDirectory(fullPath, results);
      }
    } else if (entry.isFile()) {
      const extension = path.extname(entry.name).toLowerCase();
      
      if (EXTENSIONS_TO_SCAN.includes(extension) && isPotentialDuplicate(entry.name)) {
        const originalFile = findOriginalFile(fullPath);
        results.push({
          duplicate: fullPath,
          original: originalFile,
          status: originalFile ? 'Found original' : 'No original found'
        });
      }
    }
  }
  
  return results;
}

/**
 * Generate a markdown report of potential duplicate files
 */
function generateMarkdownReport(results) {
  let markdown = '# Potential Duplicate Files Report\n\n';
  
  if (results.length === 0) {
    markdown += 'No potential duplicate files found.\n';
    return markdown;
  }
  
  markdown += '## Files to Review\n\n';
  markdown += '| Potential Duplicate | Original File | Status |\n';
  markdown += '|---------------------|---------------|--------|\n';
  
  for (const result of results) {
    const duplicate = result.duplicate.replace(/\\/g, '/');
    const original = result.original ? result.original.replace(/\\/g, '/') : 'Not found';
    markdown += `| \`${duplicate}\` | \`${original}\` | ${result.status} |\n`;
  }
  
  markdown += '\n## Recommended Actions\n\n';
  markdown += '1. Review each potential duplicate file\n';
  markdown += '2. Compare with the original to identify differences\n';
  markdown += '3. Incorporate any needed changes into the original file\n';
  markdown += '4. Mark duplicate files for removal\n';
  markdown += '5. Update any imports to reference the original file\n';
  
  return markdown;
}

/**
 * Main function
 */
async function main() {
  try {
    const directory = process.argv[2] || '.';
    console.log(`Scanning directory: ${directory}`);
    
    const results = await scanDirectory(directory);
    console.log(`Found ${results.length} potential duplicate files.`);
    
    const report = generateMarkdownReport(results);
    const reportPath = path.join(directory, 'duplicate-files-report.md');
    fs.writeFileSync(reportPath, report);
    
    console.log(`Report generated at: ${reportPath}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();