const fs = require('fs');
const path = require('path');

// Define file paths
const sourcePath = path.join(__dirname, 'app', 'chairs', 'director-series', 'page.tsx.new');
const destPath = path.join(__dirname, 'app', 'chairs', 'director-series', 'page.tsx');

// Read the new file
fs.readFile(sourcePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading source file:', err);
    return;
  }
  
  // Write the contents to the destination file
  fs.writeFile(destPath, data, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to destination file:', err);
      return;
    }
    
    console.log('Successfully replaced page.tsx with new implementation');
    
    // Optionally remove the .new file
    fs.unlink(sourcePath, (err) => {
      if (err) {
        console.error('Error removing temporary file:', err);
        return;
      }
      console.log('Temporary file removed');
    });
  });
});