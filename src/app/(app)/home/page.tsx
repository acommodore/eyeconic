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
  <div className="flex flex-col gap-1 w-full mb-3">
    <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold text-foreground drop-shadow-md">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
      <div className={`h-full rounded-full ${colorClass} shadow-[0_0_10px_currentColor] opacity-80`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

const MatchMomentumGraph = ({ data = [], homeColor = 'bg-[#FFD700]', awayColor = 'bg-white' }: { data?: number[], homeColor?: string, awayColor?: string }) => {
  const graphData = data.length > 0 ? data : [
     2, 5, -2, -5, -8, 10, 15, -2, -10, -25, 
     -15, -5, 5, 20, 45, 85, 90, 60, 40, 25, 
     10, -5, -15, -20, -35, -25, -10, -15, -30, -50,
     -40, -10, 10, 20, 15, 30, 40, 75, 20, 10
  ];

  return (
    <div className="w-full flex flex-col gap-1 py-2">
      <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
        <span className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-sm ${homeColor}`}></div> Home</span>
        <span className="font-bold text-foreground tracking-widest drop-shadow-md">Momentum</span>
        <span className="flex items-center gap-1.5">Away <div className={`w-2 h-2 rounded-sm ${awayColor}`}></div></span>
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
                       {isHome && <div className={`w-full ${homeColor} rounded-t-[1px] opacity-90 group-hover:opacity-100 transition-all group-hover:shadow-[0_0_8px_currentColor]`} style={{ height: `${heightPct}%` }} />}
                    </div>
                    <div className="h-[1px] w-full shrink-0" />
                    <div className="flex-1 flex flex-col justify-start relative">
                       {!isHome && <div className={`w-full ${awayColor} rounded-b-[1px] opacity-90 group-hover:opacity-100 transition-all group-hover:shadow-[0_0_8px_currentColor]`} style={{ height: `${heightPct}%` }} />}
                    </div>
                 </div>
              )
           })}
        </div>
      </div>
    </div>
  );
};


const TerminalRow = React.memo(({ match, isExpanded, onToggle, isLive = false, isFinished = false, isBookmarked = false, onToggleBookmark }: any) => {
   const curation = getMatchCurations(match.id, match.team1, match.status);
   const hasActiveStand = true;

   const contextLabel = isLive ? "Live Context" : isFinished ? "Post-Match Insight" : "Pre-Match Context";
   const contextText = (isLive || isFinished) && match.insight ? match.insight : curation.whyWatch;

   return (
    <div className={`group flex flex-col transition-all duration-500 mb-2 rounded-2xl relative overflow-hidden ${isExpanded ? 'bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(0,229,255,0.1)]' : 'bg-black/20 border border-transparent hover:border-white/5 hover:bg-white/[0.03]'}`}>
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div 
        className="relative z-10 flex items-center p-5 md:p-6 cursor-pointer gap-4 md:gap-6"
        onClick={() => onToggle(match.id)}
      >
        {/* TIME / STATUS */}
        <div className="w-[65px] md:w-[80px] flex flex-col items-center justify-center shrink-0">
           {isLive ? (
              <span className="text-xs md:text-sm font-bold font-mono text-coral animate-pulse drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]">{match.time}</span>
           ) : isFinished ? (
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">FT</span>
           ) : (
              <span className="text-[10px] md:text-xs font-mono text-muted-foreground">{match.time}</span>
           )}
        </div>

        {/* TEAMS & SCORE */}
        <div className="flex-1 flex items-center min-w-0 pr-2 md:pr-4">
           <div className="flex items-center justify-between gap-2 w-full">
              {/* Home Team */}
              <div className="flex items-center justify-end w-[40%] gap-2 md:gap-3">
                 <h3 className="hidden md:block text-sm md:text-base font-black uppercase tracking-wider text-right truncate drop-shadow-sm">{match.team1}</h3>
                 <h3 className="md:hidden text-xs font-black uppercase tracking-wider text-right">{match.team1.substring(0,3)}</h3>
                 <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 flex items-center justify-center bg-white/5 rounded-full p-0.5 border border-white/10">
                    <img src={match.logo1} alt={match.team1} className={`w-full h-full object-contain ${match.logo1.includes('black') || match.team1 === 'Juventus' ? 'invert' : ''}`} />
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
                    <img src={match.logo2} alt={match.team2} className={`w-full h-full object-contain ${match.logo2.includes('black') || match.team2 === 'Juventus' ? 'invert' : ''}`} />
                 </div>
                 <h3 className="hidden md:block text-sm md:text-base font-black uppercase tracking-wider text-left truncate drop-shadow-sm">{match.team2}</h3>
                 <h3 className="md:hidden text-xs font-black uppercase tracking-wider text-left">{match.team2.substring(0,3)}</h3>
              </div>
           </div>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="w-[65px] md:w-[80px] flex items-center justify-end gap-2 shrink-0">
           <span className="text-xs md:text-base font-mono font-black tabular-nums text-foreground drop-shadow-md">{match.volatility}%</span>
           <button 
             onClick={(e) => { e.stopPropagation(); onToggleBookmark(match.id); }}
             className={`hidden md:flex p-1.5 rounded-full transition-all duration-300 ${isBookmarked ? 'bg-teal/20 text-teal shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'hover:bg-white/10 text-muted-foreground'}`}
           >
             <Bookmark className="w-3.5 h-3.5 shrink-0" fill={isBookmarked ? "currentColor" : "none"} />
           </button>
           <ChevronDown className={`shrink-0 w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* EXPANDED VIEW */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-6 pt-4 border-t border-white/5 bg-black/40 shadow-inner relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* AI METRICS PANEL */}
              <div className="col-span-1 md:col-span-2 bg-black/40 p-5 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-purple-500/5 pointer-events-none" />
                 
                 <h4 className="relative z-10 text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-5 flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-teal" /> AI Ranking Pipeline
                 </h4>
                 
                 <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-4">
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
                    <div className="relative z-10 pt-4 border-t border-white/5 mt-4">
                       <MatchMomentumGraph homeColor="bg-teal" awayColor="bg-coral" />
                    </div>
                 )}
              </div>

              {/* NARRATIVE & ACTION PANEL */}
              <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
                 <div>
                    <h4 className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2">{contextLabel}</h4>
                    <p className="text-xs text-gray-200 leading-relaxed font-mono italic bg-black/40 p-4 rounded-xl border border-white/5 mb-5 shadow-inner">
                       "{contextText}"
                    </p>
                    
                    {/* Hero and Villain from mockData */}
                    {match.emotionalMvp && (
                       <div className={`grid ${isFinished ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mb-5`}>
                          <div className="bg-gradient-to-br from-black/40 to-black/20 p-4 rounded-xl border border-white/5 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
                             <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                                {isFinished ? "Match MVP 🏆" : "MVP Watch 🌟"}
                             </span>
                             <span className="text-xs font-black uppercase text-teal drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">{match.emotionalMvp}</span>
                          </div>
                          
                          {!isFinished && match.polarizingPlayer && (
                             <div className="bg-gradient-to-br from-black/40 to-black/20 p-4 rounded-xl border border-white/5 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-coral/30 to-transparent" />
                                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5">Fraud Watch 🚨</span>
                                <span className="text-xs font-black uppercase text-coral drop-shadow-[0_0_8px_rgba(255,107,107,0.4)]">{match.polarizingPlayer}</span>
                             </div>
                          )}
                       </div>
                    )}
                 </div>

                 <div className="mt-4 flex flex-wrap gap-3">
                    <Link href={`/match/${match.id}`} className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 text-[10px] font-black bg-white text-black px-6 py-3.5 rounded-xl uppercase tracking-widest hover:bg-gray-200 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                       Match Centre <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button 
                       onClick={(e) => { e.stopPropagation(); onToggleBookmark(match.id); }}
                       className={`md:hidden flex-none inline-flex items-center justify-center gap-2 text-[10px] font-black px-6 py-3.5 rounded-xl uppercase tracking-widest transition-all ${isBookmarked ? 'bg-teal/20 text-teal border border-teal/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                    >
                       <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                    
                    {hasActiveStand && (
                       <Link href={`/stands/${match.id}`} className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-3.5 rounded-xl uppercase tracking-widest hover:bg-emerald-500/30 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          JOIN STAND
                       </Link>
                    )}
                 </div>
              </div>

           </div>
        </div>
      </div>
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
    <div className="w-full bg-[#111] border-y border-white/10 flex items-center overflow-hidden py-3 shadow-2xl">
       <div className="flex whitespace-nowrap animate-ticker w-[200%]">
          <div className="flex justify-around min-w-[50%] shrink-0">
             {tickerItems.map((item, idx) => (
               <button key={`ticker-1-${idx}`} className="text-xs font-mono tracking-widest uppercase text-teal/80 px-10 hover:text-white transition-colors py-1 cursor-pointer">
                 {item}
               </button>
             ))}
          </div>
          <div className="flex justify-around min-w-[50%] shrink-0">
             {tickerItems.map((item, idx) => (
               <button key={`ticker-2-${idx}`} className="text-xs font-mono tracking-widest uppercase text-teal/80 px-10 hover:text-white transition-colors py-1 cursor-pointer">
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
    <main className="min-h-screen bg-[#000] text-foreground font-sans selection:bg-teal selection:text-black pb-32 overflow-x-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      {/* ABSOLUTE TOP HERO SECTION */}
      {heroMatch && heroCuration && (
      <section className="relative w-full min-h-0 py-10 md:py-16 md:min-h-[70vh] flex flex-col justify-center border-b border-white/10 overflow-hidden bg-black pt-16 md:pt-20">
         {/* Cinematic Backgrounds */}
         <div className="absolute inset-0 bg-gradient-to-b from-teal/20 via-transparent to-black/90 mix-blend-screen pointer-events-none" />
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal/20 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen animate-pulse" />
         <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none opacity-30 mix-blend-screen" />
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay" />

         <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-10 lg:gap-24 items-center justify-between">
            {/* Left Column (Teams, Score, Action) */}
            <div className="flex-1 flex flex-col w-full">
               <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-teal mb-6 md:mb-12 flex items-center gap-3 bg-teal/10 w-max px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-teal/30 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-teal animate-pulse shadow-[0_0_10px_rgba(0,229,255,1)]"></span>
                  MATCH OF THE MOMENT
               </div>

               <div className="flex flex-col gap-5 md:gap-10 mb-8 md:mb-12">
                  <div className="flex items-center gap-4 md:gap-8 group">
                     <div className="w-12 h-12 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] bg-black/40 border border-white/20 flex items-center justify-center p-2 md:p-3 shadow-2xl backdrop-blur-md relative group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] blur-xl" />
                        <img src={heroMatch.logo1} alt={heroMatch.team1} className={`relative z-10 w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] ${heroMatch.logo1.includes('black') || heroMatch.team1 === 'Juventus' ? 'invert' : ''}`} />
                     </div>
                     <h2 className="text-3xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter truncate drop-shadow-2xl">{heroMatch.team1}</h2>
                     <span className="text-5xl sm:text-6xl md:text-[9rem] leading-none font-mono font-black tabular-nums ml-auto shrink-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-90">
                        {(heroMatch as any).score ? (heroMatch as any).score.split(' - ')[0] : ''}
                     </span>
                  </div>
                  <div className="flex items-center gap-4 md:gap-8 group">
                     <div className="w-12 h-12 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] bg-black/40 border border-white/20 flex items-center justify-center p-2 md:p-3 shadow-2xl backdrop-blur-md relative group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] blur-xl" />
                        <img src={heroMatch.logo2} alt={heroMatch.team2} className={`relative z-10 w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] ${heroMatch.logo2.includes('black') || heroMatch.team2 === 'Juventus' ? 'invert' : ''}`} />
                     </div>
                     <h2 className="text-3xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter truncate drop-shadow-2xl">{heroMatch.team2}</h2>
                     <span className="text-5xl sm:text-6xl md:text-[9rem] leading-none font-mono font-black tabular-nums ml-auto shrink-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-90">
                        {(heroMatch as any).score ? (heroMatch as any).score.split(' - ')[1] : ''}
                     </span>
                  </div>
               </div>

               <div className="flex items-center gap-6">
                  <Link href={`/match/${heroMatch.id}`} className="group inline-flex items-center justify-center gap-2 md:gap-3 text-xs md:text-base font-mono font-black uppercase tracking-widest text-black bg-teal px-6 py-4 md:px-10 md:py-5 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,229,255,0.4)] w-max">
                     ENTER MATCH CENTRE <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
               </div>
            </div>

            {/* Right Column (Watchability Ring) */}
            <div className="w-full lg:w-[500px] shrink-0 flex flex-col items-center justify-center mt-8 lg:mt-0">
               <div className="relative w-40 h-40 md:w-80 md:h-80 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_30px_rgba(0,229,255,0.5)]">
                     <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.05)" strokeWidth="6" className="md:stroke-[8px]" fill="none" />
                     <circle cx="50%" cy="50%" r="45%" stroke="#00e5ff" strokeWidth="6" className="md:stroke-[8px] transition-all duration-1000 ease-out" fill="none" strokeDasharray="283%" strokeDashoffset={`${283 - (283 * heroMatch.volatility) / 100}%`} strokeLinecap="round" />
                  </svg>
                  <div className="flex flex-col items-center justify-center relative z-10">
                     <span className="text-4xl md:text-8xl font-mono font-black tabular-nums tracking-tighter drop-shadow-lg">{heroMatch.volatility}</span>
                     <span className="text-[8px] md:text-xs font-mono uppercase tracking-widest text-teal mt-1 md:mt-2 flex items-center gap-1 md:gap-2 bg-black/40 px-2 md:px-3 py-1 rounded-full border border-teal/20">
                        <Brain className="w-2.5 h-2.5 md:w-3 md:h-3" /> Watchability
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </section>
      )}

      <div className="relative z-10 w-full mb-12 md:mb-16">
        <NewsTicker />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* HEADER */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 drop-shadow-lg">Terminal Feed</h1>
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
                 className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-all ${isActive ? 'bg-teal/10 text-teal border-teal/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-card border-border text-muted-foreground hover:border-white/30 hover:bg-black/20 dark:bg-muted'}`}
               >
                 <Icon className="w-3.5 h-3.5" /> {f.name}
               </button>
             )
           })}
        </div>


        {/* TERMINAL FEED SORTING CONTROLS */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 w-full md:w-auto ml-auto shadow-lg">
             <button 
               onClick={() => setSortMode('watchability')}
               className={`flex-1 md:flex-none px-8 py-2.5 flex items-center justify-center gap-2.5 rounded-full text-[10px] md:text-xs font-black tracking-widest transition-all ${sortMode === 'watchability' ? 'bg-teal text-black shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}>
                <Activity className="w-3.5 h-3.5" />
                WATCHABILITY
             </button>
             <button 
               onClick={() => setSortMode('league')}
               className={`flex-1 md:flex-none px-8 py-2.5 flex items-center justify-center gap-2.5 rounded-full text-[10px] md:text-xs font-black tracking-widest transition-all ${sortMode === 'league' ? 'bg-teal text-black shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}>
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
                  <div className="flex items-center gap-4 mb-5 pl-2">
                    <div className="w-1.5 h-6 bg-teal rounded-full shadow-[0_0_12px_rgba(0,229,255,0.8)]"></div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-foreground drop-shadow-lg">{league}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>

                  {/* League Container */}
                  <div className="bg-black/30 backdrop-blur-xl rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="flex flex-col">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {matches.map((match: any, index: number) => (
                        <div key={match.id} className={index !== matches.length - 1 ? "border-b border-white/5" : ""}>
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
                  <div className="flex items-center gap-4 mb-5 pl-2">
                    <div className={`w-1.5 h-6 rounded-full ${group.groupName === 'Live Matches' ? 'bg-coral shadow-[0_0_12px_rgba(255,107,107,0.8)]' : group.groupName === 'Finished Matches' ? 'bg-zinc-500 shadow-[0_0_12px_rgba(161,161,170,0.5)]' : 'bg-teal shadow-[0_0_12px_rgba(0,229,255,0.8)]'}`}></div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-foreground drop-shadow-lg">{group.groupName}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>

                  <div className="bg-black/30 backdrop-blur-xl rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="flex flex-col">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {group.matches.map((match: any, index: number) => (
                        <div key={match.id} className={index !== group.matches.length - 1 ? "border-b border-white/5" : ""}>
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
