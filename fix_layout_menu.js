const fs = require('fs');

let layout = fs.readFileSync('src/app/(app)/layout.tsx', 'utf8');

// 1. Conditionally remove pb-20 from main
layout = layout.replace(
  '<main className="flex-1 flex flex-col relative pb-20 md:pb-0 overflow-x-hidden transition-all duration-300">',
  '<main className={`flex-1 flex flex-col relative ${isStandRoom ? \'\' : \'pb-20 md:pb-0\'} overflow-x-hidden transition-all duration-300`}>'
);

// 2. Conditionally hide Mobile Bottom Navigation
layout = layout.replace(
  '<nav className={`md:hidden fixed bottom-0',
  '{!isStandRoom && (\n        <nav className={`md:hidden fixed bottom-0'
);

layout = layout.replace(
  '        </nav>\n\n      <OnboardingModal />',
  '        </nav>\n      )}\n\n      <OnboardingModal />'
);

fs.writeFileSync('src/app/(app)/layout.tsx', layout);
