const fs = require('fs');
let content = fs.readFileSync('src/app/(app)/home/page.tsx', 'utf8');

// 1. Replace the row header container and left side (TIME / STATUS)
const oldLeftControls = `{/* TIME / STATUS */}
        <div className="w-[40px] md:w-[60px] flex flex-col items-center justify-center shrink-0">
           {isLive ? (
              <>
                 <span className="text-[10px] font-mono text-coral animate-pulse drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]">LIVE</span>
                 <span className="text-xs md:text-sm font-bold font-mono text-coral">{match.time}</span>
              </>
           ) : isFinished ? (
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">FT</span>
           ) : (
              <span className="text-[10px] md:text-xs font-mono text-muted-foreground">{match.time}</span>
           )}
        </div>`;

const newLeftControls = `{/* TIME / STATUS */}
        <div className="w-[60px] md:w-[80px] flex flex-col items-center justify-center shrink-0">
           {isLive ? (
              <span className="text-xs md:text-sm font-bold font-mono text-coral animate-pulse drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]">{match.time}</span>
           ) : isFinished ? (
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">FT</span>
           ) : (
              <span className="text-[10px] md:text-xs font-mono text-muted-foreground">{match.time}</span>
           )}
        </div>`;

content = content.replace(oldLeftControls, newLeftControls);

// 2. Replace the Right Controls
const oldRightControlsRegex = /\{\/\* SCORE \*\/\}[\s\S]*?(?=<\/div>\s*<\/div>\s*\{\/\* EXPANDED VIEW \*\/)/;
const newRightControls = `{/* RIGHT CONTROLS */}
        <div className="w-[60px] md:w-[80px] flex items-center justify-end gap-2 shrink-0">
           <span className="text-xs md:text-base font-mono font-black tabular-nums text-foreground drop-shadow-md">{match.volatility}%</span>
           <button 
             onClick={(e) => { e.stopPropagation(); onToggleBookmark(match.id); }}
             className={\`hidden md:flex p-1.5 rounded-full transition-all duration-300 \${isBookmarked ? 'bg-teal/20 text-teal shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'hover:bg-white/10 text-muted-foreground'}\`}
           >
             <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? "currentColor" : "none"} />
           </button>
           <ChevronDown className={\`w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground transition-transform duration-300 \${isExpanded ? 'rotate-180' : ''}\`} />
        </div>`;
content = content.replace(oldRightControlsRegex, newRightControls + "\n        </div>");

// 3. Add Mobile Bookmark button inside Expanded View
const oldMatchCentreButton = `<div className="mt-4 flex flex-wrap gap-3">
                    <Link href={\`/match/\${match.id}\`} className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 text-[10px] font-black bg-white text-black px-6 py-3.5 rounded-xl uppercase tracking-widest hover:bg-gray-200 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                       Match Centre <ArrowRight className="w-3 h-3" />
                    </Link>`;

const newMatchCentreButton = `<div className="mt-4 flex flex-wrap gap-3">
                    <Link href={\`/match/\${match.id}\`} className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 text-[10px] font-black bg-white text-black px-6 py-3.5 rounded-xl uppercase tracking-widest hover:bg-gray-200 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                       Match Centre <ArrowRight className="w-3 h-3" />
                    </Link>
                    
                    <button 
                       onClick={(e) => { e.stopPropagation(); onToggleBookmark(match.id); }}
                       className={\`md:hidden flex-none inline-flex items-center justify-center gap-2 text-[10px] font-black px-6 py-3.5 rounded-xl uppercase tracking-widest transition-all \${isBookmarked ? 'bg-teal/20 text-teal border border-teal/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}\`}
                    >
                       <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? "currentColor" : "none"} />
                    </button>`;
content = content.replace(oldMatchCentreButton, newMatchCentreButton);

fs.writeFileSync('src/app/(app)/home/page.tsx', content);
console.log('Update complete');
