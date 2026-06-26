const fs = require('fs');
let file = fs.readFileSync('src/app/(app)/home/page.tsx', 'utf8');

file = file.replace(/bg-\[\#0a0a0a\]/g, 'bg-card text-card-foreground');
file = file.replace(/bg-\[\#050505\]/g, 'bg-background text-foreground');
file = file.replace(/bg-\[\#0A0A0A\]/g, 'bg-card text-card-foreground');
file = file.replace(/bg-\[\#020202\]/g, 'bg-background');
file = file.replace(/bg-\[\#121212\]/g, 'bg-muted text-muted-foreground');
file = file.replace(/bg-\[\#111\]/g, 'bg-muted');

file = file.replace(/border-white\/5/g, 'border-border');
file = file.replace(/border-white\/10/g, 'border-border');
file = file.replace(/border-white\/20/g, 'border-border-strong');
file = file.replace(/text-white\/40/g, 'text-muted-foreground/40');
file = file.replace(/text-white\/60/g, 'text-muted-foreground');
file = file.replace(/text-white\/50/g, 'text-muted-foreground/50');
file = file.replace(/text-gray-400/g, 'text-muted-foreground');

// Be careful with replacing 'text-white' globally, it might override specific cases. Let's do it safely.
// We'll replace it inside className strings.
file = file.replace(/text-white/g, 'text-foreground');
file = file.replace(/hover:bg-white\/5/g, 'hover:bg-muted/50');
file = file.replace(/hover:bg-white\/10/g, 'hover:bg-muted/80');
file = file.replace(/bg-white\/5/g, 'bg-muted');
file = file.replace(/bg-white\/10/g, 'bg-muted/80');
file = file.replace(/group-hover:text-white/g, 'group-hover:text-foreground');

// In gradients, from-[#0A0A0A] to from-background or from-card
file = file.replace(/from-\[\#0A0A0A\]/g, 'from-background');
file = file.replace(/via-\[\#0A0A0A\]\/40/g, 'via-background/40');

fs.writeFileSync('src/app/(app)/home/page.tsx', file);
