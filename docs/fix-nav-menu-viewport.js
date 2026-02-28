const fs = require('fs');

let content = fs.readFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/ui/navigation-menu.tsx', 'utf8');

// Add NavigationMenuViewport to the Root component
content = content.replace(
  /  >\n    {children}\n  <\/NavigationMenuPrimitive\.Root>/,
  `  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>`
);

// Fix NavigationMenuContent to not use 'absolute top-full', instead 'left-0 top-0 w-full md:absolute md:w-auto' which is standard for shadcn with viewport
content = content.replace(
  /"absolute top-full data-\[state=open\]:animate-in data-\[state=closed\]:animate-out data-\[state=closed\]:fade-out-0 data-\[state=open\]:fade-in-0 data-\[state=closed\]:zoom-out-95 data-\[state=open\]:zoom-in-95 z-\[60\] duration-200",/g,
  '"left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",'
);

fs.writeFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/ui/navigation-menu.tsx', content);
console.log('NavigationMenu fixed to use Viewport for perfectly aligned mega menus');
