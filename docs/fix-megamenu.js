const fs = require('fs');

let content = fs.readFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/header.tsx', 'utf8');

// Fix NavigationMenuTrigger
content = content.replace(
  /"px-3 py-2 text-sm font-medium",\s*"dark:text-white",/g,
  '"px-3 py-2 text-sm font-medium",\n                          "text-zinc-900 dark:text-zinc-100",'
);

// Fix normal non-dropdown links on desktop
content = content.replace(
  /"block px-4 py-2 text-sm font-medium",\s*"rounded-md transition-colors duration-200",\s*"hover:bg-accent\/30",\s*"focus:bg-accent\/40",\s*"dark:text-white"/g,
  `"block px-4 py-2 text-sm font-medium",
                          "rounded-md transition-colors duration-200",
                          "hover:bg-accent/30",
                          "focus:bg-accent/40",
                          "text-zinc-900 dark:text-zinc-100"`
);

// Fix drop down background and text
content = content.replace(
  /className="w-\[600px\] max-w-\[90vw\] p-6 mt-2 shadow-sm border border-border rounded-\[2px\] bg-popover"/g,
  `className="w-[600px] max-w-[90vw] p-6 mt-2 shadow-xl border border-zinc-200 dark:border-zinc-800 rounded-[2px] bg-white dark:bg-zinc-950"`
);

content = content.replace(
  /<p className="text-sm text-muted-foreground mb-4">/g,
  `<p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">`
);

content = content.replace(
  /<h3 className="font-medium text-foreground mb-3">/g,
  `<h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3">`
);

content = content.replace(
  /"text-foreground",/g,
  `"text-zinc-700 dark:text-zinc-300",`
);

content = content.replace(
  /<h4 className="text-sm font-medium group-hover:text-accent-foreground">/g,
  `<h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-accent-foreground">`
);

fs.writeFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/header.tsx', content);
console.log('Header megamenu text and background colors explicitly set to fix light mode.');
