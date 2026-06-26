const fs = require('fs');
let file = fs.readFileSync('src/app/(app)/layout.tsx', 'utf8');

file = file.replace(/bg-\[\#050505\] text-white/g, 'bg-background text-foreground');
file = file.replace(/bg-\[\#0a0a0a\]/g, 'bg-card text-card-foreground');
file = file.replace(/border-white\/5/g, 'border-border');
file = file.replace(/border-white\/10/g, 'border-border');
file = file.replace(/bg-\[\#121212\]/g, 'bg-muted');
file = file.replace(/bg-white\/5 hover:bg-white\/10/g, 'bg-muted hover:bg-muted/80');
file = file.replace(/text-gray-400 hover:text-white/g, 'text-muted-foreground hover:text-foreground');
file = file.replace(/hover:bg-white\/5/g, 'hover:bg-muted/80');
file = file.replace(/group-hover:border-white/g, 'group-hover:border-foreground');

fs.writeFileSync('src/app/(app)/layout.tsx', file);
