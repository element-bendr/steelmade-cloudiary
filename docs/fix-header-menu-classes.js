const fs = require('fs');
let content = fs.readFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/header.tsx', 'utf8');

// The absolute positioning was manually trying to center drop downs under the trigger instead of the nav list.
// We remove the class name entirely or simplify it, relying on Radix Viewport alignment.
content = content.replace(
  /className=\{cn\([\s\S]*?idx === 0[\s\S]*? \? "absolute left-0"[\s\S]*? : idx === mainNavigation\.length - 1[\s\S]*? \? "absolute right-0"[\s\S]*? : "absolute left-1\/2 -translate-x-1\/2"[\s\S]*?\)\}/,
  ""
);

fs.writeFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/header.tsx', content);
console.log('Removed absolute positioning logic from header mega menu');
