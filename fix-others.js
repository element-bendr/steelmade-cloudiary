const fs = require('fs');

const files = [
  'app/hospital-furniture/page.tsx', 
  'app/racking-systems/page.tsx', 
  'app/storage/page.tsx', 
  'app/school-furniture/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import { getCategory } from '\.\.\/\.\.\/lib\/data\/products\/categories';/g, 
    "import { getCategoryAsync } from '../../lib/data/products/categories-async';");
  content = content.replace(/await getCategory\(/g, 'await getCategoryAsync(');
  fs.writeFileSync(file, content);
});
