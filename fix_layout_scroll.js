const fs = require('fs');

let layout = fs.readFileSync('src/app/(app)/layout.tsx', 'utf8');

layout = layout.replace(
  /<main className=\{\`flex-1 flex flex-col relative \$\{isStandRoom \? 'pb-0' : 'pb-20 md:pb-0'\} overflow-x-hidden transition-all duration-300\`\}>/,
  "<main className={`flex-1 flex flex-col relative min-h-0 ${isStandRoom ? 'pb-0' : 'pb-20 md:pb-0'} overflow-x-hidden transition-all duration-300`}>"
);

fs.writeFileSync('src/app/(app)/layout.tsx', layout);
