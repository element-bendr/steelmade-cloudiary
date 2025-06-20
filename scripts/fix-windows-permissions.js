// This script checks for and fixes Windows file permission issues
// for Next.js applications with dynamic routes

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Project root directory
const PROJECT_ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

/**
 * Check if a file or directory has permission issues
 */
function checkPermissions(filePath) {
  try {
    // Try to access the file to check permissions
    fs.accessSync(filePath, fs.constants.W_OK);
    return { hasIssue: false };
  } catch (error) {
    return { 
      hasIssue: true, 
      error: error.message 
    };
  }
}

/**
 * Find all dynamic route directories in the app folder
 */
function findDynamicRouteDirectories() {
  const result = [];
  
  function scanDir(dir) {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        if (!item.isDirectory()) continue;
        
        const fullPath = path.join(dir, item.name);
        
        // Check if this is a dynamic route directory
        if (item.name.startsWith('[') && item.name.endsWith(']')) {
          result.push(fullPath);
        }
        
        // Recursively scan subdirectories
        scanDir(fullPath);
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error.message);
    }
  }
  
  scanDir(APP_DIR);
  return result;
}

/**
 * Try to fix permissions on a file or directory using icacls (Windows)
 */
function fixPermissionsWindows(filePath) {
  return new Promise((resolve, reject) => {
    const command = `icacls "${filePath}" /grant:r "${process.env.USERNAME}:(OI)(CI)F" /T`;
    
    console.log(`Running: ${command}`);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`icacls failed: ${stderr}`);
        return reject(error);
      }
      
      console.log(`icacls output: ${stdout}`);
      return resolve(true);
    });
  });
}

/**
 * Find processes that might be locking a file
 */
function findLockingProcesses(filePath) {
  return new Promise((resolve, reject) => {
    if (process.platform !== 'win32') {
      return resolve([]);
    }
    
    // On Windows, use handle.exe (Sysinternals) if available
    const command = `handle "${filePath}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // handle.exe might not be installed or in PATH
        console.log(`Could not use handle.exe: ${error.message}`);
        return resolve([]);
      }
      
      // Parse output to find PIDs
      const pidRegex = /pid: (\d+)/g;
      const pids = [];
      let match;
      
      while ((match = pidRegex.exec(stdout)) !== null) {
        pids.push(match[1]);
      }
      
      return resolve(pids);
    });
  });
}

/**
 * Try to copy a directory when renaming fails
 */
async function copyDirectoryContents(source, target) {
  console.log(`Copying directory: ${source} -> ${target}`);
  
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  try {
    // Read source directory
    const items = fs.readdirSync(source, { withFileTypes: true });
    
    // Process each item
    for (const item of items) {
      const sourcePath = path.join(source, item.name);
      const targetPath = path.join(target, item.name);
      
      if (item.isDirectory()) {
        // Recursively copy subdirectory
        await copyDirectoryContents(sourcePath, targetPath);
      } else {
        // Copy file
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error copying directory: ${error.message}`);
    return false;
  }
}

/**
 * Main function to check and fix permission issues
 */
async function main() {
  console.log('Checking for permission issues in dynamic route directories...');
  
  // Find all dynamic route directories
  const dynamicDirs = findDynamicRouteDirectories();
  console.log(`Found ${dynamicDirs.length} dynamic route directories`);
  
  const directoriesWithIssues = [];
  
  // Check permissions for each directory
  for (const dir of dynamicDirs) {
    const permissionCheck = checkPermissions(dir);
    
    if (permissionCheck.hasIssue) {
      directoriesWithIssues.push({
        path: dir,
        error: permissionCheck.error
      });
      console.log(`Permission issue found: ${dir}`);
    }
  }
  
  if (directoriesWithIssues.length === 0) {
    console.log('No permission issues found!');
    return;
  }
  
  console.log(`\nFound ${directoriesWithIssues.length} directories with permission issues`);
  
  // Attempt to fix each directory
  for (const dirInfo of directoriesWithIssues) {
    console.log(`\nAttempting to fix: ${dirInfo.path}`);
    
    // Check for locking processes
    const lockingPids = await findLockingProcesses(dirInfo.path);
    
    if (lockingPids.length > 0) {
      console.log(`Warning: Directory might be locked by processes: ${lockingPids.join(', ')}`);
      console.log('You might need to close these processes (such as VS Code or Node.js servers)');
    }
    
    // Try to fix permissions (Windows)
    if (process.platform === 'win32') {
      try {
        await fixPermissionsWindows(dirInfo.path);
        console.log('Successfully updated permissions');
      } catch (error) {
        console.error(`Could not update permissions: ${error.message}`);
      }
    }
    
    // Try to work around the issue by using a different directory name
    const dirName = path.basename(dirInfo.path);
    const parentDir = path.dirname(dirInfo.path);
    
    // Create a plan for renaming
    if (dirName.startsWith('[') && dirName.endsWith(']')) {
      // This is a dynamic parameter directory
      const paramName = dirName.slice(1, -1);
      
      // Suggested new name (we'll add "_fixed" suffix)
      const suggestedNewName = `[${paramName}_fixed]`;
      const newPath = path.join(parentDir, suggestedNewName);
      
      console.log(`Suggested rename: ${dirName} -> ${suggestedNewName}`);
      
      // Try to copy instead of rename
      const copied = await copyDirectoryContents(dirInfo.path, newPath);
      
      if (copied) {
        console.log(`Successfully copied directory contents to ${newPath}`);
        console.log(`Important: You'll need to update your code to use "${paramName}_fixed" instead of "${paramName}"`);
        console.log(`After testing that the new directory works, you can manually delete the old one`);
      } else {
        console.error(`Could not copy directory contents`);
      }
    }
  }
  
  console.log('\n=== Next Steps ===');
  console.log('1. Restart your development environment (VS Code, etc.)');
  console.log('2. Use the "fix-permissions-rename.js" script to automatically update parameter names');
  console.log('3. If issues persist, close all applications and try again');
}

// Run the main function
main().catch(error => {
  console.error('Error during execution:', error);
});