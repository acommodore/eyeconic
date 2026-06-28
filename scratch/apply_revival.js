const fs = require('fs');

let content = fs.readFileSync('src/app/(app)/home/page.tsx', 'utf8');

// --- 1. TerminalRow Updates ---
const oldRowStart = `<div className={\`group flex flex-col transition-all duration-300 \${isExpanded ? 'bg-white/5 border-l-2 border-l-teal' : 'hover:bg-white/5 border-l-2 border-l-transparent'}\`}>
      <div 
        className="flex items-center p-4 cursor-pointer gap-4 md:gap-6"`;

const newRowStart = `<div className={\`group flex flex-col transition-all duration-500 mb-3 rounded-2xl relative overflow-hidden \${isExpanded ? 'bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(0,229,255,0.1)]' : 'bg-[#0a0a0a] border border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}\`}>
      {/* Ambient Glows based on team colors (using generic glow for now) */}
      <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div 
        className="relative z-10 flex items-center p-5 md:p-6 cursor-pointer gap-4 md:gap-6"`;

content = content.replace(oldRowStart, newRowStart);

// Expanded view background change for smoother slide
const oldExpandedStart = `{/* EXPANDED VIEW */}
      {isExpanded && (
        <div className="px-4 pb-5 pt-3 border-t border-white/5 bg-gradient-to-b from-black/20 to-black/40 shadow-inner">`;

const newExpandedStart = `{/* EXPANDED VIEW */}
      <div className={\`transition-all duration-500 ease-in-out overflow-hidden \${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}\`}>
        <div className="px-5 pb-6 pt-4 border-t border-white/5 bg-black/40 shadow-inner relative z-10">`;

content = content.replace(oldExpandedStart, newExpandedStart);
// Since we wrapped it in a div without condition, we need to replace the closing brace of isExpanded && ( ... )
// Currently it is: `        </div>\n      )}\n    </div>`
// We'll replace it:
content = content.replace(/<\/div>\n      \)}\n    <\/div>/, '        </div>\n      </div>\n    </div>');


// --- 2. NewsTicker Updates ---
const oldTicker = `<div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border flex items-center overflow-hidden py-1.5 shadow-2xl">
       <div className="flex whitespace-nowrap animate-ticker w-[200%]">`;

const newTicker = `<div className="w-full bg-[#111] border-y border-white/10 flex items-center overflow-hidden py-3 shadow-2xl">
       <div className="flex whitespace-nowrap animate-ticker w-[200%]">`;

content = content.replace(oldTicker, newTicker);

// increase ticker text size
content = content.replace(/text-\[10px\] font-mono tracking-widest uppercase text-teal px-8 hover:text-foreground hover:bg-black\/5 dark:bg-muted transition-colors rounded py-0\.5/g, 'text-xs font-mono tracking-widest uppercase text-teal/80 px-10 hover:text-white transition-colors py-1');


// --- 3. DiscoverPage Layout ---
// Look for where <main> starts
const mainStartRegex = /<main className="min-h-screen bg-\[#020202\] text-foreground font-sans selection:bg-teal selection:text-black pb-32 overflow-x-hidden">\n      \{\/\* Background pattern \*\/\}[\s\S]*?(?=<div className="relative z-10 w-full mb-8">)/;

content = content.replace(mainStartRegex, `<main className="min-h-screen bg-[#000] text-foreground font-sans selection:bg-teal selection:text-black pb-32 overflow-x-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      {/* ABSOLUTE TOP HERO SECTION */}
      {heroMatch && heroCuration && (
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center border-b border-white/10 overflow-hidden bg-black pt-20 pb-16">
         {/* Cinematic Backgrounds */}
         <div className="absolute inset-0 bg-gradient-to-b from-teal/20 via-transparent to-black/90 mix-blend-screen pointer-events-none" />
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal/20 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen animate-pulse" />
         <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none opacity-30 mix-blend-screen" />
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay" />

         <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between">
            {/* Left Column (Teams, Score, Action) */}
            <div className="flex-1 flex flex-col w-full">
               <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-teal mb-8 md:mb-12 flex items-center gap-3 bg-teal/10 w-max px-5 py-2.5 rounded-full border border-teal/30 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse shadow-[0_0_10px_rgba(0,229,255,1)]"></span>
                  MATCH OF THE MOMENT
               </div>

               <div className="flex flex-col gap-8 md:gap-10 mb-12">
                  <div className="flex items-center gap-6 md:gap-8">
                     <div className="w-16 h-16 md:w-24 md:h-24 rounded-[2rem] bg-black/40 border border-white/20 flex items-center justify-center p-3 shadow-2xl backdrop-blur-md relative group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-white/5 rounded-[2rem] blur-xl" />
                        <img src={heroMatch.logo1} alt={heroMatch.team1} className={\`relative z-10 w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] \${heroMatch.logo1.includes('black') || heroMatch.team1 === 'Juventus' ? 'invert' : ''}\`} />
                     </div>
                     <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter truncate drop-shadow-2xl">{heroMatch.team1}</h2>
                     <span className="text-6xl sm:text-7xl md:text-[9rem] leading-none font-mono font-black tabular-nums ml-auto shrink-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-90">
                        {(heroMatch as any).score ? (heroMatch as any).score.split(' - ')[0] : ''}
                     </span>
                  </div>
                  <div className="flex items-center gap-6 md:gap-8">
                     <div className="w-16 h-16 md:w-24 md:h-24 rounded-[2rem] bg-black/40 border border-white/20 flex items-center justify-center p-3 shadow-2xl backdrop-blur-md relative group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-white/5 rounded-[2rem] blur-xl" />
                        <img src={heroMatch.logo2} alt={heroMatch.team2} className={\`relative z-10 w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] \${heroMatch.logo2.includes('black') || heroMatch.team2 === 'Juventus' ? 'invert' : ''}\`} />
                     </div>
                     <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter truncate drop-shadow-2xl">{heroMatch.team2}</h2>
                     <span className="text-6xl sm:text-7xl md:text-[9rem] leading-none font-mono font-black tabular-nums ml-auto shrink-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-90">
                        {(heroMatch as any).score ? (heroMatch as any).score.split(' - ')[1] : ''}
                     </span>
                  </div>
               </div>

               <div className="flex items-center gap-6">
                  <Link href={\`/match/\${heroMatch.id}\`} className="group inline-flex items-center justify-center gap-3 text-sm md:text-base font-mono font-black uppercase tracking-widest text-black bg-teal px-10 py-5 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,229,255,0.4)] w-max">
                     ENTER MATCH CENTRE <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
               </div>
            </div>

            {/* Right Column (Watchability Ring) */}
            <div className="w-full lg:w-[500px] shrink-0 flex flex-col items-center justify-center">
               <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_30px_rgba(0,229,255,0.5)]">
                     <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                     <circle cx="50%" cy="50%" r="45%" stroke="#00e5ff" strokeWidth="8" fill="none" strokeDasharray="283%" strokeDashoffset={\`\${283 - (283 * heroMatch.volatility) / 100}%\`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="flex flex-col items-center justify-center relative z-10">
                     <span className="text-6xl md:text-8xl font-mono font-black tabular-nums tracking-tighter drop-shadow-lg">{heroMatch.volatility}</span>
                     <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-teal mt-2 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-teal/20">
                        <Brain className="w-3 h-3" /> Watchability
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </section>
      )}

      `);


// Remove the old HERO SECTION which is right after EMOTIONAL FILTERS
const oldHeroRegex = /\{\/\* HERO SECTION \*\/\}[\s\S]*?(?=<\/div>\s*<\/main>)/;
content = content.replace(oldHeroRegex, '');


fs.writeFileSync('src/app/(app)/home/page.tsx', content);
console.log("Rewrote page.tsx for new design");
