const fs = require('fs');
let content = fs.readFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/ui/navigation-menu.tsx', 'utf8');

content = content.replace(
  /"origin-top relative mt-1\.5 h-\[var\(--radix-navigation-menu-viewport-height\)\] w-\[var\(--radix-navigation-menu-viewport-width\)\] overflow-hidden rounded-lg border bg-popover\/95 backdrop-blur-sm shadow-lg data-\[state=open\]:animate-in data-\[state=closed\]:animate-out data-\[state=closed\]:zoom-out-95 data-\[state=open\]:zoom-in-95 duration-200",/g,
  '"origin-top relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] overflow-hidden rounded-[2px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",'
);

fs.writeFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/ui/navigation-menu.tsx', content);
console.log("Viewport styles updated.");
