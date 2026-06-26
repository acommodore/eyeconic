const fs = require('fs');

let c = fs.readFileSync('src/app/(app)/match/[id]/page.tsx', 'utf8');

if (!c.includes('import StartStandButton')) {
  c = c.replace(/import PlayerSummaryModal/, 'import StartStandButton from "@/components/stands/StartStandButton";\nimport PlayerSummaryModal');
}

// Replace the Join Stands block
const oldJoinStands = `{/* Join Stands Action (Hidden during live match) */}
          {matchState !== 'live' && (
            <div className="mt-8 w-full max-w-md mx-auto">
               <Link href="/stands/2" className="block w-full cursor-pointer hover:-translate-y-0.5 transition-transform">
                 <div className="bg-gradient-to-r from-[#00E5FF]/10 to-[#121212]/90 backdrop-blur-xl border border-teal/20 rounded-full p-3 pl-4 flex items-center justify-between group shadow-xl">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                          <Mic className="w-5 h-5 text-black" fill="currentColor" />
                       </div>
                       <div className="flex flex-col justify-center text-left">
                          <h2 className="text-sm font-black tracking-widest uppercase text-white leading-tight mb-0.5">JOIN THE DISCUSSION</h2>
                          <p className="text-[10px] text-teal font-medium tracking-wide">12.4K active in the stands</p>
                       </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-1">
                       <ChevronRight className="w-4 h-4 text-teal" />
                    </div>
                 </div>
               </Link>
            </div>
          )}`;

const newJoinStands = `{/* Stands Actions */}
          <div className="mt-8 w-full max-w-lg mx-auto flex flex-col md:flex-row gap-4 justify-center items-center">
             <StartStandButton matchId={params.id} />
             <Link href="/stands/2" className="block w-full md:w-auto cursor-pointer hover:-translate-y-0.5 transition-transform">
               <div className="bg-gradient-to-r from-[#00E5FF]/10 to-[#121212]/90 backdrop-blur-xl border border-teal/20 rounded-full p-3 pl-4 flex items-center justify-between group shadow-xl">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                        <Mic className="w-5 h-5 text-black" fill="currentColor" />
                     </div>
                     <div className="flex flex-col justify-center text-left mr-4">
                        <h2 className="text-sm font-black tracking-widest uppercase text-white leading-tight mb-0.5">JOIN EXISTING STAND</h2>
                     </div>
                  </div>
               </div>
             </Link>
          </div>`;

c = c.replace(oldJoinStands, newJoinStands);

fs.writeFileSync('src/app/(app)/match/[id]/page.tsx', c);
