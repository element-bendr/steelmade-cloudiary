const fs = require('fs');

let content = fs.readFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/header.tsx', 'utf8');

content = content.replace(
  /                      <NavigationMenuContent className=\{cn\(\n                        idx === 0\n                          \? "absolute left-0"\n                          : idx === mainNavigation\.length - 1\n                            \? "absolute right-0"\n                            : "absolute left-1\/2 -translate-x-1\/2"\n                      \)\}>/g,
  '                      <NavigationMenuContent>'
);

fs.writeFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/header.tsx', content);
console.log('Removed absolute positioning logic from header mega menu Content');
