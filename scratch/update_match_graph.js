const fs = require('fs');

const filePath = 'src/app/(app)/match/[id]/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const matchMomentumGraph = `
const MatchMomentumGraph = ({ data = [], homeColor = 'bg-[#FFD700]', awayColor = 'bg-white' }: { data?: number[], homeColor?: string, awayColor?: string }) => {
  const graphData = data.length > 0 ? data : [
     2, 5, -2, -5, -8, 10, 15, -2, -10, -25, 
     -15, -5, 5, 20, 45, 85, 90, 60, 40, 25, 
     10, -5, -15, -20, -35, -25, -10, -15, -30, -50,
     -40, -10, 10, 20, 15, 30, 40, 75, 20, 10
  ];

  return (
    <div className="w-full flex flex-col gap-1 py-2 mt-2">
      <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
        <span className="flex items-center gap-1.5"><div className={\`w-2 h-2 rounded-sm \${homeColor}\`}></div> Home</span>
        <span className="font-bold text-foreground tracking-widest drop-shadow-md">Match Momentum</span>
        <span className="flex items-center gap-1.5">Away <div className={\`w-2 h-2 rounded-sm \${awayColor}\`}></div></span>
      </div>
      
      <div className="relative w-full h-24 flex items-center border-x border-white/10 px-0.5 mb-2">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20 z-0"></div>
        <div className="absolute -bottom-4 left-0 text-[8px] font-mono text-muted-foreground">KO</div>
        <div className="absolute -bottom-4 right-0 text-[8px] font-mono text-muted-foreground">HT</div>

        <div className="w-full h-full flex items-center justify-between gap-[2px] z-10">
           {graphData.map((val, idx) => {
              const isHome = val > 0;
              const heightPct = Math.min(100, Math.abs(val));
              return (
                 <div key={idx} className="flex-1 h-full flex flex-col justify-center group cursor-crosshair">
                    <div className="flex-1 flex flex-col justify-end relative">
                       {isHome && <div className={\`w-full \${homeColor} rounded-t-[1px] opacity-90 group-hover:opacity-100 transition-all group-hover:shadow-[0_0_8px_currentColor]\`} style={{ height: \`\${heightPct}%\` }} />}
                    </div>
                    <div className="h-[1px] w-full shrink-0" />
                    <div className="flex-1 flex flex-col justify-start relative">
                       {!isHome && <div className={\`w-full \${awayColor} rounded-b-[1px] opacity-90 group-hover:opacity-100 transition-all group-hover:shadow-[0_0_8px_currentColor]\`} style={{ height: \`\${heightPct}%\` }} />}
                    </div>
                 </div>
              )
           })}
        </div>
      </div>
    </div>
  );
};

`;

content = content.replace('import { toast } from "sonner";', 'import { toast } from "sonner";\n' + matchMomentumGraph);

const oldStandsAction = `{/* Stands Actions */}
          <div className="mt-8 w-full max-w-lg mx-auto flex justify-center items-center">
             <Link href={\`/stands/\${matchId}\`} className="block w-full cursor-pointer hover:-translate-y-0.5 transition-transform">
               <div className="bg-gradient-to-r from-[#00E5FF]/10 to-[#121212]/90 backdrop-blur-xl border border-teal/20 rounded-full p-3 pl-4 flex items-center justify-between group shadow-xl">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                        <Mic className="w-5 h-5 text-black" fill="currentColor" />
                     </div>
                     <div className="flex flex-col justify-center text-left mr-4">
                        <h2 className="text-sm font-black tracking-widest uppercase text-foreground leading-tight mb-0.5">JOIN EXISTING STAND</h2>
                     </div>
                  </div>
               </div>
             </Link>
          </div>`;

const newStandsAction = `{/* Stands Actions */}
          <div className="mt-8 w-full max-w-lg mx-auto flex flex-col gap-6 items-center">
             <Link href={\`/stands/\${matchId}\`} className="block w-full cursor-pointer hover:-translate-y-0.5 transition-transform">
               <div className="bg-gradient-to-r from-[#00E5FF]/10 to-[#121212]/90 backdrop-blur-xl border border-teal/20 rounded-full p-3 pl-4 flex items-center justify-between group shadow-xl">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                        <Mic className="w-5 h-5 text-black" fill="currentColor" />
                     </div>
                     <div className="flex flex-col justify-center text-left mr-4">
                        <h2 className="text-sm font-black tracking-widest uppercase text-foreground leading-tight mb-0.5">JOIN EXISTING STAND</h2>
                     </div>
                  </div>
               </div>
             </Link>

             {(matchState === 'live' || matchState === 'postmatch') && (
                <div className="w-full mt-4 bg-black/40 p-6 rounded-[24px] border border-white/5 backdrop-blur-md shadow-2xl relative">
                   <MatchMomentumGraph homeColor="bg-teal" awayColor="bg-coral" />
                </div>
             )}
          </div>`;

content = content.replace(oldStandsAction, newStandsAction);

fs.writeFileSync(filePath, content);
console.log("Successfully updated match page");
