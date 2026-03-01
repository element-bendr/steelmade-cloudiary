const fs = require('fs');

let content = fs.readFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/common/Slideshow.tsx', 'utf8');

// The image is currently spanning the full block and creating a massive white rectangle overlapping the text container
// We need to change the CSS grid so the text is on the left 40% and the image is on the right 60%, removing all absolute overlaps

content = content.replace(
  /<div className="relative w-full h-full overflow-hidden bg-zinc-50 border-b border-red-500">[\s\S]*?{isActive && \(/,
  `<div className="relative w-full h-full overflow-hidden bg-zinc-950 border-b border-red-900/30 flex flex-col md:flex-row">
        
        {/* Left Side: Architectural Typography Grid (40%) */}
        <div className="relative w-full md:w-5/12 h-[50%] md:h-full flex items-center px-6 md:px-16 lg:px-24 bg-zinc-950 z-10">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              {isActive && (`
);

// Close out the left side and open the right side for the image
content = content.replace(
  /<\/AnimatePresence>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
  `           </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Cinematic Ken Burns Image (60%) */}
        <div className="relative w-full md:w-7/12 h-[50%] md:h-full overflow-hidden bg-white">
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ 
              scale: isActive ? 1 : 1.1, 
            }}
            transition={{ 
              scale: { duration: 6, ease: "easeOut" }
            }}
          >
            <Image 
              src={slide.backgroundImage} 
              alt={slide.title}
              fill
              priority={isFirst}
              className="object-contain p-8 md:p-16 lg:p-24"
              sizes="(max-width: 768px) 100vw, 60vw"
              quality={90}
            />
          </motion.div>
        </div>
        
      </div>
    </div>`
);

// Reverting text back to white/gray for the dark left panel
content = content.replace(/text-zinc-900 leading-\[1\.1\] font-medium tracking-tight/g, 'text-zinc-50 leading-[1.1] font-medium tracking-tight');
content = content.replace(/text-zinc-600 max-w-xl leading-relaxed font-light/g, 'text-zinc-400 max-w-xl leading-relaxed font-light');

// And changing the floating navigation buttons to match the new dark aesthetics layout
content = content.replace(/bg-white\/80 backdrop-blur-md border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-sm transition-all duration-300 hover:bg-black\/50 rounded-\[2px\]/g, 
  'bg-zinc-900/50 backdrop-blur-md border border-zinc-700/50 flex items-center justify-center text-zinc-100 shadow-sm transition-all duration-300 hover:bg-red-700 rounded-[2px]');

fs.writeFileSync('/mnt/shared/projects/node/steelmade-cloudiary-chairs/components/common/Slideshow.tsx', content);
console.log('Layout updated successfully!');
