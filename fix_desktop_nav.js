const fs = require('fs');

// 1. Update layout.tsx to use --mobile-nav-height
let layout = fs.readFileSync('src/app/(app)/layout.tsx', 'utf8');
layout = layout.replace(
  "style={{ '--nav-height': showNav ? '80px' : '0px' } as React.CSSProperties}",
  "style={{ '--mobile-nav-height': showNav ? '80px' : '0px' } as React.CSSProperties}"
);
fs.writeFileSync('src/app/(app)/layout.tsx', layout);

// 2. Append CSS variables to globals.css
let globals = fs.readFileSync('src/app/globals.css', 'utf8');
if (!globals.includes('--mobile-nav-height')) {
  globals += `\n
:root {
  --nav-height: var(--mobile-nav-height, 0px);
}

@media (min-width: 768px) {
  :root {
    --nav-height: 0px !important;
  }
}
`;
  fs.writeFileSync('src/app/globals.css', globals);
}
