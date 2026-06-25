const fs = require('fs');
let c = fs.readFileSync('src/app/(app)/stands/page.tsx', 'utf8');
c = c.replace(/bg-\[#020202\]/g, 'bg-background')
     .replace(/bg-\[#050505\]/g, 'bg-background')
     .replace(/#00E5FF/g, 'teal')
     .replace(/#FF3B00/g, 'coral')
     .replace(/#FF7F50/g, 'coral')
     .replace(/text-white/g, 'text-foreground')
     .replace(/border-white\/5/g, 'border-border')
     .replace(/border-white\/10/g, 'border-border')
     .replace(/bg-white\/5/g, 'bg-black/5 dark:bg-white/5')
     .replace(/bg-white\/10/g, 'bg-black/10 dark:bg-white/10')
     .replace(/text-gray-400/g, 'text-muted-foreground')
     .replace(/text-gray-500/g, 'text-muted-foreground/80')
     .replace(/bg-black/g, 'bg-card text-card-foreground');
fs.writeFileSync('src/app/(app)/stands/page.tsx', c);
