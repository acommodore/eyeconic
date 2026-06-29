const fs = require('fs');
let content = fs.readFileSync('src/app/(app)/match/[id]/page.tsx', 'utf8');

// 1. Remove the SEASON CONTEXT block
content = content.replace(/\{\/\* SEASON CONTEXT \*\/\}.*?\n\s+\)\}/s, '');

// 2. Add SEASON CONTEXT to the tabs
content = content.replace(
  "{['LINEUP', 'H2H', 'KEY BATTLES'].map((tab) => (",
  "<div className=\"flex items-center gap-4 mb-4 pl-2\">\n            <div className=\"w-1 h-6 rounded-full bg-teal shadow-[0_0_12px_rgba(0,229,255,0.8)]\"></div>\n            <h2 className=\"text-sm font-black uppercase tracking-widest text-foreground drop-shadow-lg\">Match Intel</h2>\n          </div>\n          <div className=\"flex gap-3 overflow-x-auto pb-6 hover-scrollbar hide-scrollbar-mobile\">\n          {['LINEUP', 'H2H', 'SEASON CONTEXT', 'KEY BATTLES'].map((tab) => ("
);

// We also need to add the closing div for the tab container we wrapped inside the new section above
content = content.replace(
  "              {tab}\n            </button>\n          ))}\n        </div>\n      )}",
  "              {tab}\n            </button>\n          ))}\n        </div>\n        </div>\n      )}"
);

// 3. Add the SeasonContextTab render
content = content.replace(
  "{prematchTab === 'H2H' && <H2HTab matchInfo={matchInfo} />}",
  "{prematchTab === 'H2H' && <H2HTab matchInfo={matchInfo} />}\n                {prematchTab === 'SEASON CONTEXT' && <SeasonContextTab matchInfo={matchInfo} />}"
);

// 4. Update LINEUP CONFIDENCE header
content = content.replace(
  "<h3 className=\"text-[10px] font-black tracking-widest text-gray-500 mb-6 uppercase\">LINEUP CONFIDENCE</h3>",
  "<h3 className=\"text-sm font-black uppercase tracking-widest text-foreground drop-shadow-lg mb-6\">Lineup Confidence</h3>"
);

// 5. Add SeasonContextTab component definition right above LineupTab
const seasonContextTabCode = `
function SeasonContextTab({ matchInfo }: { matchInfo: any }) {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl backdrop-blur-md">
      <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-4 md:gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-[9px] font-mono uppercase tracking-widest text-teal mb-1">League Position</span>
          <div className="text-sm font-black flex items-center gap-2 text-foreground">
            <span>4th</span>
            <span className="text-muted-foreground text-[10px]">vs</span>
            <span>7th</span>
          </div>
        </div>
        <div className="w-px h-8 bg-white/10 hidden md:block"></div>
        <div className="flex flex-col items-center md:items-start text-right md:text-left">
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Gap</span>
          <span className="text-sm font-black text-foreground">5 pts</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center w-full md:w-auto py-4 md:py-0 border-y border-white/5 md:border-y-0">
        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Recent Form</span>
        <div className="flex items-center justify-center gap-1 md:gap-2 text-[10px] font-black uppercase">
          <span className="text-teal drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">W</span>-
          <span className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">D</span>-
          <span className="text-teal drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">W</span>-
          <span className="text-coral drop-shadow-[0_0_8px_rgba(255,127,80,0.5)]">L</span>-
          <span className="text-teal drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">W</span>
          <span className="text-muted-foreground mx-2 text-[9px] font-mono">vs</span>
          <span className="text-coral drop-shadow-[0_0_8px_rgba(255,127,80,0.5)]">L</span>-
          <span className="text-teal drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">W</span>-
          <span className="text-coral drop-shadow-[0_0_8px_rgba(255,127,80,0.5)]">L</span>-
          <span className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">D</span>-
          <span className="text-teal drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">W</span>
        </div>
      </div>
      
      <div className="flex w-full md:w-auto items-center justify-center md:justify-end">
        <div className="flex flex-col items-center md:items-end">
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Last Meeting</span>
          <span className="text-xs font-black text-foreground">{matchInfo?.team1 || 'Team A'} won <span className="text-teal">(2-1)</span></span>
        </div>
      </div>
    </div>
  );
}
`;

content = content.replace("function LineupTab", seasonContextTabCode + "\nfunction LineupTab");

fs.writeFileSync('src/app/(app)/match/[id]/page.tsx', content);
