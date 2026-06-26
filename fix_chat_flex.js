const fs = require('fs');
let file = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

file = file.replace(/<div className="flex-1 min-h-0 overflow-y-auto \\[&::-webkit-scrollbar\\]:hidden \\[-ms-overflow-style:none\\] \\[scrollbar-width:none\\] flex flex-col relative bg-gradient-to-b from-transparent via-\\[#050505\\] to-\\[#0A0A0A\\]" onScroll={handleChatScroll}>/g, '<div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col-reverse relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A]" onScroll={handleChatScroll}>');

file = file.replace(/<div className="flex-1 min-h-0 overflow-y-auto \\[&::-webkit-scrollbar\\]:hidden \\[-ms-overflow-style:none\\] \\[scrollbar-width:none\\] flex flex-col relative bg-gradient-to-b from-transparent via-\\[#050505\\] to-\\[#0A0A0A\\]">/g, '<div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col-reverse relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A]">');

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', file);
