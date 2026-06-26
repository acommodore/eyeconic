const fs = require('fs');
let file = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

file = file.replace(/bg-\[\#050505\]/g, 'bg-background text-foreground');
file = file.replace(/bg-\[\#0a0a0a\]/g, 'bg-card text-card-foreground');
file = file.replace(/bg-\[\#0A0A0A\]/g, 'bg-card text-card-foreground');
file = file.replace(/bg-\[\#121212\]/g, 'bg-muted text-muted-foreground');
file = file.replace(/bg-\[\#111\]/g, 'bg-muted');

file = file.replace(/border-white\/5/g, 'border-border');
file = file.replace(/border-white\/10/g, 'border-border');
file = file.replace(/border-white\/20/g, 'border-border-strong');
file = file.replace(/text-white\/40/g, 'text-muted-foreground/40');
file = file.replace(/text-white\/60/g, 'text-muted-foreground');
file = file.replace(/text-white\/50/g, 'text-muted-foreground/50');
file = file.replace(/text-gray-400/g, 'text-muted-foreground');

file = file.replace(/text-white/g, 'text-foreground');
file = file.replace(/hover:bg-white\/5/g, 'hover:bg-muted/50');
file = file.replace(/hover:bg-white\/10/g, 'hover:bg-muted/80');
file = file.replace(/bg-white\/5/g, 'bg-muted');
file = file.replace(/bg-white\/10/g, 'bg-muted/80');
file = file.replace(/group-hover:text-white/g, 'group-hover:text-foreground');

// Fix action bar gradients
file = file.replace(/from-\[\#0A0A0A\]/g, 'from-background');
file = file.replace(/to-\[\#0A0A0A\]\/90/g, 'to-background/90');
file = file.replace(/bg-\[\#111111\]/g, 'bg-muted');

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', file);
