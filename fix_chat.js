const fs = require('fs');
let code = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

// Replace Mobile Chat Container
code = code.replace(
  /<div className="flex-1 min-h-0 overflow-y-auto space-y-4 px-3 pb-4 relative bg-gradient-to-b from-transparent via-\[#050505\] to-\[#0A0A0A\] pt-3" onScroll=\{handleChatScroll\}>\s*\{chatMessages\.map/g,
  `<div className="flex-1 min-h-0 overflow-y-auto flex flex-col relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A]" onScroll={handleChatScroll}>
          <div className="space-y-4 px-3 pb-4 mt-auto pt-16">
            {chatMessages.map`
);

code = code.replace(
  /<\/div>\s*\{\/\* Action Bar on mobile \*\/\}/g,
  `    </div>
        </div>
        {/* Action Bar on mobile */}`
);

// Replace Desktop Chat Container
code = code.replace(
  /<div className="flex-1 min-h-0 overflow-y-auto space-y-6 px-6 pb-6 relative bg-gradient-to-b from-transparent via-\[#050505\] to-\[#0A0A0A\]">\s*\{chatMessages\.map/g,
  `<div className="flex-1 min-h-0 overflow-y-auto flex flex-col relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A]">
            <div className="space-y-6 px-6 pb-6 mt-auto pt-16">
              {chatMessages.map`
);

code = code.replace(
  /<\/div>\s*<div className="p-4 border-t border-border bg-card/g,
  `    </div>
          </div>
          <div className="p-4 border-t border-border bg-card`
);

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', code);
