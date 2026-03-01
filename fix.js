const fs = require('fs');

let content = fs.readFileSync('app/[categoryId]/page.tsx', 'utf8');

// Fix imports
content = content.replace(/import { getCategoryAsync } from "[^"]+";\n/g, '');
content = content.replace(/import { getCategory } from "[^"]+";\n/g, '');
content = content.replace(/import { getCategoryAsync, getAllCategories } from '\.\.\/\.\.\/lib\/data\/products\/categories';/g, 
  "import { getAllCategories } from '../../lib/data/products/categories';\nimport { getCategoryAsync } from '../../lib/data/products/categories-async';");

// Fix async async
content = content.replace(/getCategoryAsyncAsync/g, 'getCategoryAsync');

fs.writeFileSync('app/[categoryId]/page.tsx', content);

