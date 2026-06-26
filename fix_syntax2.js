const fs = require('fs');
let file = fs.readFileSync('src/app/(app)/match/[id]/page.tsx', 'utf8');

file = file.replace(/src=matchInfo\?\.logo1 \|\| "https:\/\/upload\.wikimedia\.org\/wikipedia\/en\/0\/0c\/Liverpool_FC\.svg"/g, 'src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"}');
file = file.replace(/src=matchInfo\?\.logo2 \|\| "https:\/\/upload\.wikimedia\.org\/wikipedia\/en\/e\/eb\/Manchester_City_FC_badge\.svg"/g, 'src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"}');

fs.writeFileSync('src/app/(app)/match/[id]/page.tsx', file);
