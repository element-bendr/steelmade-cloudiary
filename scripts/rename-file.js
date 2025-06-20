#!/usr/bin/env node

/**
 * Safe File Renamer
 * 
 * This script safely renames files and updates imports in the codebase.
 * It will:
 * 1. Check if the file exists
 * 2. Find all imports of the file
 * 3. Rename the file
 * 4. Update all imports
 * 5. Log the changes
 * 
 * Usage: node rename-file.js <old-path> <new-path>
 * Example: node rename-file.js lib/utils/stringUtils.ts lib/utils/string-utils.ts
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const childProcess = require('child_process');
const readline = require('readline');

const exec = util.promisify(childProcess.exec);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

// File extensions to scan for imports
const EXTENSIONS_TO_SCAN = ['.js', '.jsx', '.ts', '.tsx'];

// Directories to skip
const SKIP_DIRECTORIES = ['node_modules', '.git', 'dist', 'build', '.next', 'removed-duplicates-backup'];

// Convert a file path to an import path
function filePathToImportPath(filePath) {
  // Remove extension
  let importPath = filePath.replace(/\.[^/.]+$/, '');
  
  // Convert Windows backslashes to forward slashes
  importPath = importPath.replace(/\\/g, '/');
  
  return importPath;
}

// Find all imports of a file in the codebase
async function findImports(importToFind) {
  console.log(`Finding imports of: ${importToFind}`);
  
  const results = [];
  
  try {
    // Use the find-imports.js script if it exists
    const findImportsScript = path.join(__dirname, 'find-imports.js');
    
    if (fs.existsSync(findImportsScript)) {
      console.log(`Using find-imports.js script`);
      await exec(`node ${findImportsScript} ${importToFind}`);
      
      const reportPath = path.join(process.cwd(), `imports-of-${path.basename(importToFind)}.md`);
      
      if (fs.existsSync(reportPath)) {
        console.log(`Import report found at: ${reportPath}`);
        
        // Parse the report to get the imports
        const report = await readFile(reportPath, 'utf8');
        const fileMatches = report.matchAll(/### (.+)\n\n- Line (\d+): `(.+)`/g);
        
        for (const match of fileMatches) {
          const [_, file, line, lineContent] = match;
          results.push({ file, line, lineContent });
        }
      }
    } else {
      // Fall back to a simple grep-like approach
      console.log(`find-imports.js not found, using simple search`);
      
      const oldImportPath = filePathToImportPath(importToFind);
      
      // Walk the directory and check each file
      async function scanDir(dir) {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            if (!SKIP_DIRECTORIES.includes(entry.name)) {
              await scanDir(fullPath);
            }
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            
            if (EXTENSIONS_TO_SCAN.includes(ext)) {
              const content = await readFile(fullPath, 'utf8');
              
              if (content.includes(oldImportPath)) {
                // Found a potential import, check line by line
                const lines = content.split('\n');
                
                for (let i = 0; i < lines.length; i++) {
                  const line = lines[i];
                  
                  if (line.includes(oldImportPath) && line.includes('import')) {
                    results.push({
                      file: fullPath,
                      line: i + 1,
                      lineContent: line.trim()
                    });
                  }
                }
              }
            }
          }
        }
      }
      
      await scanDir('.');
    }
    
    console.log(`Found ${results.length} imports.`);
    return results;
  } catch (error) {
    console.error('Error finding imports:', error);
    return [];
  }
}

// Update imports in a file
async function updateImportsInFile(file, oldImportPath, newImportPath) {
  console.log(`Updating imports in: ${file}`);
  
  try {
    const content = await readFile(file, 'utf8');
    
    // Create a regex to find imports of the old path
    // This is a simplified version and might need adjustments for complex cases
    const importRegex = new RegExp(`(from\\s+['"](\\./|\\.\\./|/|@/)?)(${escapeRegExp(oldImportPath)})(['"])`, 'g');
    
    const updatedContent = content.replace(importRegex, (match, prefix, importPrefix, importPath, suffix) => {
      return `${prefix}${newImportPath}${suffix}`;
    });
    
    if (content !== updatedContent) {
      await writeFile(file, updatedContent);
      console.log(`  Updated imports in ${file}`);
      return true;
    } else {
      console.log(`  No imports needed updating in ${file}`);
      return false;
    }
  } catch (error) {
    console.error(`  Error updating imports in ${file}:`, error);
    return false;
  }
}

// Escape special characters in a string for use in a regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Rename a file and update all imports
async function renameFile(oldPath, newPath) {
  console.log(`===== Renaming ${oldPath} to ${newPath} =====`);
  
  // Check if files exist
  if (!fs.existsSync(oldPath)) {
    console.error(`Error: Source file does not exist: ${oldPath}`);
    return false;
  }
  
  if (fs.existsSync(newPath)) {
    console.error(`Error: Destination file already exists: ${newPath}`);
    return false;
  }
  
  // Create directory for new file if it doesn't exist
  const newDir = path.dirname(newPath);
  if (!fs.existsSync(newDir)) {
    console.log(`Creating directory: ${newDir}`);
    await mkdir(newDir, { recursive: true });
  }
  
  // Find all imports of the old file
  const oldImportPath = filePathToImportPath(oldPath);
  const newImportPath = filePathToImportPath(newPath);
  
  console.log(`Old import path: ${oldImportPath}`);
  console.log(`New import path: ${newImportPath}`);
  
  const imports = await findImports(oldPath);
  
  // Create backup directory if it doesn't exist
  const backupDir = './renamed-files-backup';
  if (!fs.existsSync(backupDir)) {
    await mkdir(backupDir);
  }
  
  // Backup the file before renaming
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `${path.basename(oldPath)}_${timestamp}.bak`);
  
  console.log(`Creating backup at: ${backupPath}`);
  await fs.promises.copyFile(oldPath, backupPath);
  
  // Rename the file
  console.log(`Renaming file...`);
  try {
    // Use git mv if it's a git repository
    try {
      await exec(`git mv "${oldPath}" "${newPath}"`);
      console.log(`Used 'git mv' to rename file (preserves history)`);
    } catch (error) {
      // Fall back to regular file system rename
      console.log(`Git move failed, using fs.rename instead`);
      await fs.promises.rename(oldPath, newPath);
    }
  } catch (error) {
    console.error(`Error renaming file:`, error);
    return false;
  }
  
  // Update all imports
  console.log(`Updating imports in ${imports.length} files...`);
  
  let updatedCount = 0;
  for (const importInfo of imports) {
    const updated = await updateImportsInFile(importInfo.file, oldImportPath, newImportPath);
    if (updated) updatedCount++;
  }
  
  console.log(`Updated imports in ${updatedCount} files.`);
  
  // Update the renamed files log
  await updateRenamedFilesLog(oldPath, newPath);
  
  console.log(`===== File rename complete =====`);
  console.log(`Next steps:`);
  console.log(`1. Run TypeScript compiler to verify no type errors`);
  console.log(`2. Test the application to ensure functionality is preserved`);
  console.log(`3. Check for any remaining references to the old file path`);
  
  return true;
}

// Update the renamed files log with the new file
async function updateRenamedFilesLog(oldPath, newPath) {
  const logFile = './docs/renamed-files-log.md';
  
  try {
    if (!fs.existsSync(logFile)) {
      console.warn(`Warning: Could not find renamed-files-log.md to update`);
      return;
    }
    
    console.log(`Updating renamed files log...`);
    
    const content = await readFile(logFile, 'utf8');
    const today = new Date().toISOString().split('T')[0];
    
    // Determine the file type section to update
    let section = 'Completed Renames';
    
    if (oldPath.includes('/components/') || /\.(jsx|tsx)$/.test(oldPath)) {
      section = 'Component Files';
    } else if (oldPath.includes('/utils/') || oldPath.includes('/lib/')) {
      section = 'Utility Files';
    } else if (oldPath.includes('/pages/') || oldPath.includes('/app/')) {
      section = 'Page Files';
    } else if (oldPath.includes('/api/')) {
      section = 'API Files';
    } else if (oldPath.includes('/docs/') || /\.(md|mdx)$/.test(oldPath)) {
      section = 'Documentation Files';
    }
    
    // Find the section in the content
    const sectionRegex = new RegExp(`## ${section}\\s*\\n\\n\\| Original File \\| New File \\| Rename Date \\| Notes \\|\\s*\\n\\|[-]+\\|[-]+\\|[-]+\\|[-]+\\|\\s*\\n\\| \\| \\| \\| \\|`);
    
    const updatedContent = content.replace(sectionRegex, 
      `## ${section}\n\n| Original File | New File | Rename Date | Notes |\n|---------------|----------|-------------|-------|\n| ${oldPath.replace(/\\/g, '/')} | ${newPath.replace(/\\/g, '/')} | ${today} | Renamed for file naming standardization |`
    );
    
    await writeFile(logFile, updatedContent);
    console.log(`Updated renamed files log in ${logFile}`);
  } catch (error) {
    console.error(`Error updating renamed files log:`, error);
  }
}

// Main function
async function main() {
  try {
    const oldPath = process.argv[2];
    const newPath = process.argv[3];
    
    if (!oldPath || !newPath) {
      console.error('Please provide both old and new file paths.');
      console.error('Usage: node rename-file.js <old-path> <new-path>');
      process.exit(1);
    }
    
    const success = await renameFile(oldPath, newPath);
    
    if (!success) {
      console.error('File rename failed.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();