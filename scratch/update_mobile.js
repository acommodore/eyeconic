const fs = require('fs');

// 1. Update match/[id]/page.tsx
let matchContent = fs.readFileSync('src/app/(app)/match/[id]/page.tsx', 'utf8');

// Remove SEASON CONTEXT block
const seasonContextRegex = /\{\/\* SEASON CONTEXT \*\/\}.*?(?=\{\/\* ACTION FEED \*\/\})/s;
matchContent = matchContent.replace(seasonContextRegex, '');

// Remove JOIN EXISTING STAND block
const joinStandRegex = /<Link href=\{`\/stands\/\$\{matchId\}`\} className="block w-full cursor-pointer hover:-translate-y-0\.5 transition-transform">.*?<\/Link>/s;
matchContent = matchContent.replace(joinStandRegex, '');

fs.writeFileSync('src/app/(app)/match/[id]/page.tsx', matchContent);


// 2. Update home/page.tsx
let homeContent = fs.readFileSync('src/app/(app)/home/page.tsx', 'utf8');

// Change AI PREDICTION to WATCHABILITY INDEX and fix styling in Hero
homeContent = homeContent.replace(
  /<Brain className="w-4 h-4 text-teal" \/> AI Prediction/g,
  '<Brain className="w-4 h-4 text-teal" /> Watchability Index'
);

// Update TerminalRow teams to use logos and abbreviations on mobile
// In TerminalRow, there's a block like:
/*
        {/* TEAMS & SCORE *\/}
        <div className="flex-1 flex items-center min-w-0 pr-4">
           <div className="flex items-center gap-4 w-full">
              <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-right w-1/2 truncate drop-shadow-sm">{match.team1}</h3>
              ...
              <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-left w-1/2 truncate drop-shadow-sm">{match.team2}</h3>
           </div>
        </div>
*/
const oldTeamsScore = `{/* TEAMS & SCORE */}
        <div className="flex-1 flex items-center min-w-0 pr-4">
           <div className="flex items-center gap-4 w-full">
              <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-right w-1/2 truncate drop-shadow-sm">{match.team1}</h3>
              {isLive || isFinished ? (
                 <span className="text-lg md:text-2xl font-black font-mono tracking-tighter tabular-nums bg-black/60 px-3 py-1 rounded-md border border-white/10 shrink-0 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] text-white">
                    {match.score}
                 </span>
              ) : (
                 <span className="text-xs font-black text-muted-foreground px-3 py-1 bg-black/40 rounded-md border border-white/5 font-mono shrink-0">VS</span>
              )}
              <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-left w-1/2 truncate drop-shadow-sm">{match.team2}</h3>
           </div>
        </div>`;

const newTeamsScore = `{/* TEAMS & SCORE */}
        <div className="flex-1 flex items-center min-w-0 pr-2 md:pr-4">
           <div className="flex items-center justify-between gap-2 w-full">
              {/* Home Team */}
              <div className="flex items-center justify-end w-[40%] gap-2 md:gap-3">
                 <h3 className="hidden md:block text-sm md:text-base font-black uppercase tracking-wider text-right truncate drop-shadow-sm">{match.team1}</h3>
                 <h3 className="md:hidden text-xs font-black uppercase tracking-wider text-right">{match.team1.substring(0,3)}</h3>
                 <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 flex items-center justify-center bg-white/5 rounded-full p-0.5 border border-white/10">
                    <img src={match.logo1} alt={match.team1} className={\`w-full h-full object-contain \${match.logo1.includes('black') || match.team1 === 'Juventus' ? 'invert' : ''}\`} />
                 </div>
              </div>

              {/* Score */}
              <div className="shrink-0 flex justify-center w-[20%]">
                 {isLive || isFinished ? (
                    <span className="text-sm md:text-2xl font-black font-mono tracking-tighter tabular-nums bg-black/60 px-2 md:px-3 py-1 rounded-md border border-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] text-white whitespace-nowrap">
                       {match.score}
                    </span>
                 ) : (
                    <span className="text-[10px] md:text-xs font-black text-muted-foreground px-2 md:px-3 py-1 bg-black/40 rounded-md border border-white/5 font-mono">VS</span>
                 )}
              </div>

              {/* Away Team */}
              <div className="flex items-center justify-start w-[40%] gap-2 md:gap-3">
                 <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 flex items-center justify-center bg-white/5 rounded-full p-0.5 border border-white/10">
                    <img src={match.logo2} alt={match.team2} className={\`w-full h-full object-contain \${match.logo2.includes('black') || match.team2 === 'Juventus' ? 'invert' : ''}\`} />
                 </div>
                 <h3 className="hidden md:block text-sm md:text-base font-black uppercase tracking-wider text-left truncate drop-shadow-sm">{match.team2}</h3>
                 <h3 className="md:hidden text-xs font-black uppercase tracking-wider text-left">{match.team2.substring(0,3)}</h3>
              </div>
           </div>
        </div>`;

homeContent = homeContent.replace(oldTeamsScore, newTeamsScore);

fs.writeFileSync('src/app/(app)/home/page.tsx', homeContent);
console.log('Update complete.');
