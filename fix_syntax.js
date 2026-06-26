const fs = require('fs');
let file = fs.readFileSync('src/app/(app)/match/[id]/page.tsx', 'utf8');

file = file.replace(/{matchInfo\?\.logo1 \|\| {matchInfo\?\.logo1 \|\| "https:\/\/upload\.wikimedia\.org\/wikipedia\/en\/0\/0c\/Liverpool_FC\.svg"}}/g, 'matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"');
file = file.replace(/{matchInfo\?\.logo2 \|\| {matchInfo\?\.logo2 \|\| "https:\/\/upload\.wikimedia\.org\/wikipedia\/en\/e\/eb\/Manchester_City_FC_badge\.svg"}}/g, 'matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"');

file = file.replace(/src="{matchInfo\?\.logo1/g, 'src={matchInfo?.logo1');
file = file.replace(/src="{matchInfo\?\.logo2/g, 'src={matchInfo?.logo2');
file = file.replace(/\.svg"}"/g, '.svg"}');

fs.writeFileSync('src/app/(app)/match/[id]/page.tsx', file);
