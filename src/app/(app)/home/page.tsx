"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Zap, Brain, ArrowRight, Bookmark, Shuffle, Swords, Activity, Flame, Sparkles, ChevronDown, Filter } from 'lucide-react';
import { allLiveMatches, upcomingTableData, finishedTableData } from '@/lib/mockData';

// --- MOCK RANKING DATA ---
const getMatchCurations = (matchId: number, team1: string, status: string) => {
  const isUpcoming = status === 'upcoming';

  const baseCuration = {
    metrics: { 
       stakes: 85, openness: 70, intensity: 88, quality: 90, tempo: 75,
       fanTemp: 98, volatility: 92, starPower: 85,
       momentum: 65
    }
  };

  if (team1 === 'Arsenal' || team1 === 'Man City' || team1 === 'Liverpool') {
    return {
      whyWatch: "Huge stakes, intense rivalry, and massive title implications.",
      ...baseCuration,
      metrics: { ...baseCuration.metrics, stakes: 95, openness: 85, intensity: 92, quality: 95, fanTemp: 98, volatility: 90, starPower: 92, momentum: 75 }
    }
  } else if (team1 === 'Chelsea' || team1 === 'Man United' || team1 === 'Tottenham') {
    return {
      whyWatch: "Two unpredictable teams known for high-scoring, chaotic games.",
      ...baseCuration,
      metrics: { ...baseCuration.metrics, stakes: 80, openness: 95, intensity: 85, quality: 80, fanTemp: 88, volatility: 95, starPower: 85, momentum: 40 }
    }
  } else if (team1 === 'Juventus' || team1 === 'Inter Milan' || team1 === 'Inter') {
    return {
      whyWatch: "A battle of elite defensive systems. Expect a tight, disciplined match.",
      ...baseCuration,
      metrics: { ...baseCuration.metrics, stakes: 85, openness: 30, intensity: 75, quality: 88, fanTemp: 80, volatility: 40, starPower: 82, momentum: 55 }
    }
  } else {
    return {
      whyWatch: "Under-the-radar fixture featuring young talents and expansive attacking styles.",
      ...baseCuration,
      metrics: { ...baseCuration.metrics, stakes: 60, openness: 90, intensity: 80, quality: 75, fanTemp: 60, volatility: 85, starPower: 70, momentum: 50 }
    }
  }
};

const MetricBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
  <div className="flex flex-col gap-1 w-full mb-2">
    <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
    <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
      <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

const MomentumBar = ({ momentum }: { momentum: number }) => (
  <div className="w-full flex flex-col gap-2 mt-4 mb-2">
    <div className="flex justify-between text-[8px] font-mono uppercase tracking-widest text-muted-foreground">
      <span>Home Momentum</span>
      <span>Away</span>
    </div>
    <div className="h-2 w-full flex rounded-full overflow-hidden border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
      <div className="h-full bg-teal transition-all duration-1000" style={{ width: `${momentum}%` }} />
      <div className="h-full bg-coral transition-all duration-1000" style={{ width: `${100 - momentum}%` }} />
    </div>
  </div>
);

const TerminalRow = React.memo(({ match, isExpanded, onToggle, isLive = false, isFinished = false, isBookmarked = false, onToggleBookmark }: any) => {
   const curation = getMatchCurations(match.id, match.team1, match.status);
   const hasActiveStand = true;

   return (
    <div className={`group flex flex-col transition-all duration-300 ${isExpanded ? 'bg-white/5 border-l-2 border-l-teal' : 'hover:bg-white/5 border-l-2 border-l-transparent'}`}>
      <div 
        className="flex items-center p-4 cursor-pointer gap-4 md:gap-6"
        onClick={() => onToggle(match.id)}
      >
        {/* TIME / STATUS */}
        <div className="w-[40px] md:w-[60px] flex flex-col items-center justify-center shrink-0">
           {isLive ? (
              <>
                 <span className="text-[10px] font-mono text-coral animate-pulse">LIVE</span>
                 <span className="text-xs md:text-sm font-bold font-mono text-coral">{match.time}</span>
              </>
           ) : isFinished ? (
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">FT</span>
           ) : (
              <span className="text-[10px] md:text-xs font-mono text-muted-foreground">{match.time}</span>
           )}
        </div>

        {/* TEAMS & SCORE */}
        <div className="flex-1 flex items-center min-w-0 pr-4">
           <div className="flex items-center gap-4 w-full">
              <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-right w-1/2 truncate">{match.team1}</h3>
              {isLive || isFinished ? (
                 <span className="text-lg md:text-2xl font-black font-mono tracking-tighter tabular-nums bg-black/40 px-3 py-1 rounded-md border border-white/5 shrink-0">
                    {match.score}
                 </span>
              ) : (
                 <span className="text-xs font-black text-muted-foreground px-3 py-1 bg-black/20 rounded-md border border-white/5 font-mono shrink-0">VS</span>
              )}
              <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-left w-1/2 truncate">{match.team2}</h3>
           </div>
        </div>

        {/* SCORE */}
        <div className="w-[50px] md:w-[80px] flex flex-col items-end shrink-0">
           <span className="text-sm md:text-lg font-mono font-black tabular-nums text-foreground">{match.volatility}%</span>
        </div>

        {/* CHEVRON & BOOKMARK */}
        <div className="flex items-center gap-3 shrink-0">
           <button 
             onClick={(e) => { e.stopPropagation(); onToggleBookmark(match.id); }}
             className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-teal/20 text-teal' : 'hover:bg-white/10 text-muted-foreground'}`}
           >
             <Bookmark className="w-4 h-4" />
           </button>
           <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* EXPANDED VIEW */}
      {isExpanded && (
        <div className="px-4 pb-5 pt-3 border-t border-border bg-black/10 shadow-inner">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* AI METRICS PANEL */}
              <div className="col-span-1 md:col-span-2 bg-black/30 p-4 rounded-xl border border-white/5">
                 <h4 className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <Brain className="w-3 h-3 text-teal" /> AI Ranking Pipeline
                 </h4>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                    {/* Live/Finished vs Upcoming logic */}
                    {isLive || isFinished ? (
                       <>
                          <MetricBar label="Stakes" value={curation.metrics.stakes} colorClass="bg-gradient-to-r from-orange-500 to-red-500" />
                          <MetricBar label="Intensity" value={curation.metrics.intensity} colorClass="bg-gradient-to-r from-red-500 to-rose-400" />
                          <MetricBar label="Quality" value={curation.metrics.quality} colorClass="bg-gradient-to-r from-purple-500 to-blue-500" />
                          <MetricBar label="Tempo" value={curation.metrics.tempo} colorClass="bg-gradient-to-r from-yellow-500 to-orange-500" />
                       </>
                    ) : (
                       <>
                          <MetricBar label="Stakes" value={curation.metrics.stakes} colorClass="bg-gradient-to-r from-orange-500 to-red-500" />
                          <MetricBar label="Fan Temp" value={curation.metrics.fanTemp} colorClass="bg-gradient-to-r from-yellow-400 to-orange-500" />
                          <MetricBar label="Volatility" value={curation.metrics.volatility} colorClass="bg-gradient-to-r from-teal to-blue-400" />
                          <MetricBar label="Star Power" value={curation.metrics.starPower} colorClass="bg-gradient-to-r from-purple-500 to-indigo-500" />
                       </>
                    )}
                 </div>

                 {(isLive || isFinished) && (
                    <div className="pt-3 border-t border-white/5">
                       <MomentumBar momentum={curation.metrics.momentum} />
                    </div>
                 )}
              </div>

              {/* NARRATIVE & ACTION PANEL */}
              <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
                 <div>
                    <h4 className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Pre-Match Context</h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-mono italic bg-black/20 p-3 rounded-lg border border-white/5 mb-4">
                       "{curation.whyWatch}"
                    </p>
                    
                    {/* Hero and Villain from mockData */}
                    {match.emotionalMvp && match.polarizingPlayer && (
                       <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col items-center text-center">
                             <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">The Hero 🦸</span>
                             <span className="text-xs font-black uppercase text-teal">{match.emotionalMvp}</span>
                          </div>
                          <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col items-center text-center">
                             <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">The Villain 🦹</span>
                             <span className="text-xs font-black uppercase text-coral">{match.polarizingPlayer}</span>
                          </div>
                       </div>
                    )}
                 </div>

                 <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={`/match/${match.id}`} className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 text-[10px] font-black bg-white text-black px-6 py-3 rounded-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                       Match Centre <ArrowRight className="w-3 h-3" />
                    </Link>
                    
                    {hasActiveStand && (
                       <Link href={`/stands/${match.id}`} className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-emerald-500/30 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                          🟢 JOIN STAND
                       </Link>
                    )}
                 </div>
              </div>

           </div>
        </div>
      )}
    </div>
  );
});
TerminalRow.displayName = 'TerminalRow';


const tickerItems = [
    "📈 ARS Fans: +15% Optimism (Saka sub)",
    "📉 MUN Fans: -30% Patience (Ten Hag)",
    "⚠️ RMA Fans: Tension Spiking (0-0 80')",
    "🔥 LIV Fans: Roaring (+45% Momentum)",
    "🧊 CHE Fans: Complete silence at Stamford Bridge",
    "📈 JUV Fans: Tactical approval rising (+12%)",
];

const NewsTicker = () => (
    <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border flex items-center overflow-hidden py-1.5 shadow-2xl">
       <div className="flex whitespace-nowrap animate-ticker w-[200%]">
          <div className="flex justify-around min-w-[50%] shrink-0">
             {tickerItems.map((item, idx) => (
               <button key={`ticker-1-${idx}`} className="text-[10px] font-mono tracking-widest uppercase text-teal px-8 hover:text-foreground hover:bg-black/5 dark:bg-muted transition-colors rounded py-0.5 cursor-pointer">
                 {item}
               </button>
             ))}
          </div>
          <div className="flex justify-around min-w-[50%] shrink-0">
             {tickerItems.map((item, idx) => (
               <button key={`ticker-2-${idx}`} className="text-[10px] font-mono tracking-widest uppercase text-teal px-8 hover:text-foreground hover:bg-black/5 dark:bg-muted transition-colors rounded py-0.5 cursor-pointer">
                 {item}
               </button>
             ))}
          </div>
       </div>
    </div>
);

export default function DiscoverPage() {
  const supabase = createClient();
  const [liveMatches, setLiveMatches] = useState(allLiveMatches);
  const [upcomingMatches, setUpcomingMatches] = useState(upcomingTableData);
  const [finishedMatches, setFinishedMatches] = useState(finishedTableData);

  const [expandedMatches, setExpandedMatches] = useState<Set<number>>(new Set());
  const [bookmarkedMatches, setBookmarkedMatches] = useState<Set<number>>(new Set());
  
  const [sortMode, setSortMode] = useState<'watchability' | 'league'>('watchability');
  const [activeFilter, setActiveFilter] = useState("All"); 

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase.from('matches').select('*');
      if (!error && data) {
        // mock data is used directly for now since supabase matches might be stale or differently formatted
      }
    };
    fetchMatches();
  }, [supabase]);

  const toggleMatch = (id: number) => {
    setExpandedMatches(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedMatches(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filters = [
    { name: "All", icon: Sparkles },
    { name: "Chaos & Goals", icon: Zap },
    { name: "Tactical Battles", icon: Brain },
    { name: "Rivalries", icon: Swords },
    { name: "Bookmarks", icon: Bookmark },
  ];

  const allCurrentMatches = [
    ...liveMatches.map(m => ({ ...m, status: 'live' })),
    ...upcomingMatches.map(m => ({ ...m, status: 'upcoming' })),
    ...finishedMatches.map(m => ({ ...m, status: 'finished' }))
  ];

  let finalMatches = allCurrentMatches;

  // Apply emotional filter
  if (activeFilter === "Bookmarks") {
     finalMatches = finalMatches.filter(m => bookmarkedMatches.has(m.id));
  } else if (activeFilter === "Chaos & Goals") {
     finalMatches = finalMatches.filter(m => getMatchCurations(m.id, m.team1, m.status).metrics.volatility > 85);
  } else if (activeFilter === "Tactical Battles") {
     finalMatches = finalMatches.filter(m => getMatchCurations(m.id, m.team1, m.status).metrics.quality > 85);
  } else if (activeFilter === "Rivalries") {
     finalMatches = finalMatches.filter(m => getMatchCurations(m.id, m.team1, m.status).metrics.stakes > 90);
  }

  const heroMatch = finalMatches.find(m => m.status === 'live') || finalMatches[0];
  let heroCuration = null;
  if (heroMatch) {
     heroCuration = getMatchCurations(heroMatch.id, heroMatch.team1, heroMatch.status);
  }

  const watchabilityMatches = [
    { groupName: 'Live Matches', matches: finalMatches.filter(m => m.status === 'live').sort((a,b) => b.volatility - a.volatility) },
    { groupName: 'Upcoming Matches', matches: finalMatches.filter(m => m.status === 'upcoming').sort((a,b) => b.volatility - a.volatility) },
    { groupName: 'Finished Matches', matches: finalMatches.filter(m => m.status === 'finished').sort((a,b) => b.volatility - a.volatility) }
  ];

  const groupedMatches = finalMatches.reduce((acc, match) => {
     if (!acc[match.league]) acc[match.league] = [];
     acc[match.league].push(match);
     return acc;
  }, {} as Record<string, typeof allCurrentMatches>);

  return (
    <main className="min-h-screen bg-[#020202] text-foreground font-sans selection:bg-teal selection:text-black pb-32 overflow-x-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <div className="relative z-10 w-full mb-8">
        <NewsTicker />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* HEADER */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2">Terminal Feed</h1>
              <p className="text-sm text-muted-foreground font-mono">Real-time match data & AI Watchability Index.</p>
           </div>
        </header>

        {/* EMOTIONAL FILTERS */}
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar mb-10 pb-2">
           {filters.map(f => {
             const Icon = f.icon;
             const isActive = activeFilter === f.name;
             return (
               <button 
                 key={f.name}
                 onClick={() => setActiveFilter(f.name)}
                 className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-all ${isActive ? 'bg-teal/10 text-teal border-teal/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-card border-border text-muted-foreground hover:border-white/30 hover:bg-black/5 dark:bg-muted'}`}
               >
                 <Icon className="w-3.5 h-3.5" /> {f.name}
               </button>
             )
           })}
        </div>

        {/* HERO SECTION */}
        {heroMatch && heroCuration && (
        <section className="mb-16">
          <div className="relative rounded-[40px] border border-white/10 bg-black/60 backdrop-blur-md overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-purple-500/5 pointer-events-none mix-blend-screen" />
            
            <div className="relative z-10 p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
               
               {/* Left Column (Teams, Score, Momentum) */}
               <div className="flex-1 flex flex-col justify-center w-full">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-teal mb-6 flex items-center gap-2 bg-teal/10 w-max px-3 py-1.5 rounded-full border border-teal/20">
                     <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]"></span>
                     MATCH OF THE MOMENT
                  </div>

                  <div className="flex flex-col gap-4 mb-8">
                     <div className="flex items-center gap-4">
                        <img src={heroMatch.logo1} alt={heroMatch.team1} className={`w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg shrink-0 ${heroMatch.logo1.includes('black') || heroMatch.team1 === 'Juventus' ? 'invert' : ''}`} />
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-wider truncate">{heroMatch.team1}</h2>
                        <span className="text-5xl md:text-6xl font-mono font-black tabular-nums ml-auto shrink-0 drop-shadow-md">
                           {(heroMatch as any).score ? (heroMatch as any).score.split(' - ')[0] : ''}
                        </span>
                     </div>
                     <div className="flex items-center gap-4">
                        <img src={heroMatch.logo2} alt={heroMatch.team2} className={`w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg shrink-0 ${heroMatch.logo2.includes('black') || heroMatch.team2 === 'Juventus' ? 'invert' : ''}`} />
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-wider truncate">{heroMatch.team2}</h2>
                        <span className="text-5xl md:text-6xl font-mono font-black tabular-nums ml-auto shrink-0 drop-shadow-md">
                           {(heroMatch as any).score ? (heroMatch as any).score.split(' - ')[1] : ''}
                        </span>
                     </div>
                  </div>

                  {/* Momentum Bar for Live matches */}
                  {heroMatch.status === 'live' && (
                     <div className="mb-10 w-full max-w-md">
                        <MomentumBar momentum={heroCuration.metrics.momentum} />
                     </div>
                  )}

                  <div className="flex items-center gap-6 mt-auto">
                     <Link href={`/match/${heroMatch.id}`} className="group inline-flex items-center justify-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-black bg-teal px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] w-max">
                        ENTER MATCH CENTRE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
               </div>

               {/* Right Column (AI Panel) */}
               <div className="w-full lg:w-[450px] shrink-0 flex flex-col gap-6 bg-black/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
                  
                  {/* Top Stats: AI Label removed, just Watchability Score */}
                  <div className="flex items-center justify-between pb-5 border-b border-white/10">
                     <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Brain className="w-4 h-4" /> AI Prediction
                     </span>
                     <span className="text-5xl font-mono font-black tabular-nums text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{heroMatch.volatility}%</span>
                  </div>

                  {/* The AI Metrics */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                     {heroMatch.status === 'live' || heroMatch.status === 'finished' ? (
                        <>
                           <MetricBar label="Stakes" value={heroCuration.metrics.stakes} colorClass="bg-gradient-to-r from-orange-500 to-red-500" />
                           <MetricBar label="Intensity" value={heroCuration.metrics.intensity} colorClass="bg-gradient-to-r from-red-500 to-rose-400" />
                           <MetricBar label="Quality" value={heroCuration.metrics.quality} colorClass="bg-gradient-to-r from-purple-500 to-blue-500" />
                           <MetricBar label="Tempo" value={heroCuration.metrics.tempo} colorClass="bg-gradient-to-r from-yellow-500 to-orange-500" />
                        </>
                     ) : (
                        <>
                           <MetricBar label="Stakes" value={heroCuration.metrics.stakes} colorClass="bg-gradient-to-r from-orange-500 to-red-500" />
                           <MetricBar label="Fan Temp" value={heroCuration.metrics.fanTemp} colorClass="bg-gradient-to-r from-yellow-400 to-orange-500" />
                           <MetricBar label="Volatility" value={heroCuration.metrics.volatility} colorClass="bg-gradient-to-r from-teal to-blue-400" />
                           <MetricBar label="Star Power" value={heroCuration.metrics.starPower} colorClass="bg-gradient-to-r from-purple-500 to-indigo-500" />
                        </>
                     )}
                  </div>
                  
               </div>
            </div>
          </div>
        </section>
        )}

        {/* 2. TERMINAL FEED SORTING CONTROLS */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex bg-card rounded-full p-1 border border-border w-full md:w-auto ml-auto">
             <button 
               onClick={() => setSortMode('watchability')}
               className={`flex-1 md:flex-none px-6 py-2 flex items-center justify-center gap-2 rounded-full text-[10px] md:text-xs font-black tracking-widest transition-all ${sortMode === 'watchability' ? 'bg-teal text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'text-muted-foreground hover:text-foreground'}`}>
                <Activity className="w-3.5 h-3.5" />
                WATCHABILITY
             </button>
             <button 
               onClick={() => setSortMode('league')}
               className={`flex-1 md:flex-none px-6 py-2 flex items-center justify-center gap-2 rounded-full text-[10px] md:text-xs font-black tracking-widest transition-all ${sortMode === 'league' ? 'bg-teal text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'text-muted-foreground hover:text-foreground'}`}>
                <Swords className="w-3.5 h-3.5" />
                LEAGUE
             </button>
           </div>
        </div>

        {/* TERMINAL FEED LIST */}
        <section className="space-y-12">
          {sortMode === 'league' ? (
             Object.entries(groupedMatches).map(([league, matches]) => (
               <div key={league} className="flex flex-col">
                  {/* League Header */}
                  <div className="flex items-center gap-4 mb-4 pl-2">
                    <div className="w-1.5 h-6 bg-teal rounded-full shadow-[0_0_8px_rgba(0,229,255,0.6)]"></div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-foreground drop-shadow-md">{league}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                  </div>

                  {/* League Container */}
                  <div className="bg-card/50 backdrop-blur-md rounded-2xl border border-border overflow-hidden shadow-2xl">
                    <div className="flex flex-col">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {matches.map((match: any, index: number) => (
                        <div key={match.id} className={index !== matches.length - 1 ? "border-b border-border" : ""}>
                           <TerminalRow 
                            match={match} 
                            isExpanded={expandedMatches.has(match.id)} 
                            onToggle={toggleMatch} 
                            isLive={match.status === 'live'} 
                            isFinished={match.status === 'finished'} 
                            isBookmarked={bookmarkedMatches.has(match.id)}
                            onToggleBookmark={toggleBookmark}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
             ))
          ) : (
             watchabilityMatches.map((group) => {
               if (group.matches.length === 0) return null;
               return (
               <div key={group.groupName} className="flex flex-col">
                  <div className="flex items-center gap-4 mb-4 pl-2">
                    <div className={`w-1.5 h-6 rounded-full ${group.groupName === 'Live Matches' ? 'bg-coral shadow-[0_0_8px_rgba(255,107,107,0.6)]' : group.groupName === 'Finished Matches' ? 'bg-zinc-600' : 'bg-teal shadow-[0_0_8px_rgba(0,229,255,0.6)]'}`}></div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-foreground drop-shadow-md">{group.groupName}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                  </div>

                  <div className="bg-card/50 backdrop-blur-md rounded-2xl border border-border overflow-hidden shadow-2xl">
                    <div className="flex flex-col">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {group.matches.map((match: any, index: number) => (
                        <div key={match.id} className={index !== group.matches.length - 1 ? "border-b border-border" : ""}>
                           <TerminalRow 
                            match={match} 
                            isExpanded={expandedMatches.has(match.id)} 
                            onToggle={toggleMatch} 
                            isLive={match.status === 'live'} 
                            isFinished={match.status === 'finished'} 
                            isBookmarked={bookmarkedMatches.has(match.id)}
                            onToggleBookmark={toggleBookmark}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
             )})
          )}
        </section>

      </div>
    </main>
  );
}
