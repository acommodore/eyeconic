const fs = require('fs');

let stands = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

stands = stands.replace(
  '<div className="flex-none xl:flex-1 overflow-y-auto hide-scrollbar flex flex-col relative z-10 bg-background xl:p-8">',
  '<div className="flex-none xl:flex-1 overflow-y-auto hide-scrollbar flex flex-col relative z-10 bg-background xl:p-8" onScroll={handleChatScroll}>'
);

stands = stands.replace(
  '<div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 px-4 md:px-6 pb-4 md:pb-6 relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A]" onScroll={handleChatScroll}>',
  '<div className="flex-none space-y-4 md:space-y-6 px-4 md:px-6 pb-4 md:pb-6 relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A] min-h-0">'
);

stands = stands.replace(
  '{/* Action Bar */}\n        <div className="p-2 md:p-4 border-t border-border bg-card text-card-foreground/80 backdrop-blur-xl space-y-2 md:space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] relative z-30">',
  '{/* Action Bar */}\n        <div className="p-2 md:p-4 border-t border-border bg-card text-card-foreground/80 backdrop-blur-xl space-y-2 md:space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] sticky bottom-0 z-50 mt-auto" style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + var(--nav-height))` }}>'
);

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', stands);
