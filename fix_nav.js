const fs = require('fs');

// 1. Update layout.tsx
let layout = fs.readFileSync('src/app/(app)/layout.tsx', 'utf8');

// Update handleScroll to capture inner scrolling
layout = layout.replace(
  'const handleScroll = () => {',
  'const handleScroll = (e: Event) => {'
);
layout = layout.replace(
  'const currentScrollY = window.scrollY;',
  `const target = e.target as HTMLElement | Document;
        const currentScrollY = target === document ? window.scrollY : (target as HTMLElement).scrollTop;`
);

// Update event listener to use capture
layout = layout.replace(
  "window.addEventListener('scroll', handleScroll, { passive: true });",
  "window.addEventListener('scroll', handleScroll, { passive: true, capture: true });"
);

// Add CSS variables to root div
layout = layout.replace(
  '<div className={`${isStandRoom ? \'h-[100dvh] overflow-hidden\' : \'min-h-screen\'} bg-[#050505] text-white flex flex-col md:flex-row`}>',
  '<div \n      className={`${isStandRoom ? \'h-[100dvh] overflow-hidden\' : \'min-h-screen\'} bg-[#050505] text-white flex flex-col md:flex-row`}\n      style={{ \'--nav-height\': showNav ? \'80px\' : \'0px\' } as React.CSSProperties}\n    >'
);

// Fix main padding
layout = layout.replace(
  /<main className=\{`flex-1 flex flex-col relative \$\{isStandRoom \? '' : 'pb-20 md:pb-0'\} overflow-x-hidden transition-all duration-300`\}>/,
  '<main className={`flex-1 flex flex-col relative ${isStandRoom ? \'pb-0\' : \'pb-20 md:pb-0\'} overflow-x-hidden transition-all duration-300`}>'
);

// Re-add nav wrapper (remove !isStandRoom condition)
layout = layout.replace(
  '{!isStandRoom && (\n        <nav className={`md:hidden fixed bottom-0',
  '<nav className={`md:hidden fixed bottom-0'
);
layout = layout.replace(
  '        </nav>\n      )}',
  '        </nav>'
);

fs.writeFileSync('src/app/(app)/layout.tsx', layout);

// 2. Update stands/[id]/page.tsx
let stands = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

// The bottom container starts with: <div className="w-full flex-none bg-background pb-safe pt-2">
stands = stands.replace(
  '<div className="w-full flex-none bg-background pb-safe pt-2">',
  '<div className="w-full flex-none bg-background pt-2 transition-all duration-300" style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + var(--nav-height))` }}>'
);

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', stands);
