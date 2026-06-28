"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Zap, Brain, ArrowRight, Bookmark, Shuffle, Swords, Activity, Flame, Sparkles, ChevronDown } from 'lucide-react';
import { allLiveMatches, upcomingTableData, finishedTableData } from '@/lib/mockData';

// --- MOCK RANKING DATA ---
const getMatchCurations = (matchId: number, team1: string, status: string) => {
  const isUpcoming = status === 'upcoming';

  const baseCuration = {
    metrics: { 
       stakes: 85, openness: 70, intensity: 88, quality: 90, tempo: 75,
       fanTemp: 98, volatility: 92, starPower: 85,
       momentum: 65 // Team 1 has 65% momentum
    }
  };

  if (team1 === 'Arsenal' || team1 === 'Man City' || team1 === 'Liverpool') {
    return {
      label: 'Unmissable',
      icon: <Flame className="w-4 h-4 text-orange-500" />,
      color: 'from-orange-500/20 to-red-500/20',
      textColor: 'text-orange-500',
      whyWatch: "Huge stakes, intense rivalry, and massive title implications.",
      ...baseCuration,
      metrics: { ...baseCuration.metrics, stakes: 95, openness: 85, intensity: 92, quality: 95, fanTemp: 98, volatility: 90, starPower: 92, momentum: 75 }
    }
  } else if (team1 === 'Chelsea' || team1 === 'Man United' || team1 === 'Tottenham') {
    return {
      label: 'Chaos Guaranteed',
      icon: <Zap className="w-4 h-4 text-yellow-500" />,
      color: 'from-yellow-500/20 to-orange-500/20',
      textColor: 'text-yellow-500',
      whyWatch: "Two unpredictable teams known for high-scoring, chaotic games.",
      ...baseCuration,
      metrics: { ...baseCuration.metrics, stakes: 80, openness: 95, intensity: 85, quality: 80, fanTemp: 88, volatility: 95, starPower: 85, momentum: 40 }
    }
  } else if (team1 === 'Juventus' || team1 === 'Inter Milan' || team1 === 'Inter') {
    return {
      label: 'Tactical Chess Match',
      icon: <Brain className="w-4 h-4 text-purple-500" />,
      color: 'from-purple-500/20 to-blue-500/20',
      textColor: 'text-purple-400',
      whyWatch: "A battle of elite defensive systems. Expect a tight, disciplined match.",
      ...baseCuration,
      metrics: { ...baseCuration.metrics, stakes: 85, openness: 30, intensity: 75, quality: 88, fanTemp: 80, volatility: 40, starPower: 82, momentum: 55 }
    }
  } else {
    return {
      label: 'Sleeper Pick',
      icon: <Sparkles className="w-4 h-4 text-teal" />,
      color: 'from-teal/20 to-blue-500/20',
      textColor: 'text-teal',
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
   // Mock property to simulate an active stand for Chelsea games or specific matches
   const hasActiveStand = match.team1 === 'Chelsea' || match.team1 === 'Arsenal';

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
        <div className="flex-1 flex items-center justify-between min-w-0 pr-4">
           <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-6 flex-1 min-w-0">
              <div className="flex items-center gap-3 w-full md:w-[45%]">
                 <h3 className="text-sm md:text-base font-black uppercase tracking-wider truncate">{match.team1}</h3>
              </div>
              <div className="flex items-center gap-2 md:gap-4 shrink-0">
                 {isLive || isFinished ? (
                    <span className="text-lg md:text-2xl font-black font-mono tracking-tighter tabular-nums bg-black/40 px-3 py-1 rounded-md border border-white/5">
                       {match.score}
                    </span>
                 ) : (
                    <span className="text-xs font-black text-muted-foreground px-3 py-1 bg-black/20 rounded-md border border-white/5 font-mono">VS</span>
                 )}
              </div>
              <div className="flex items-center gap-3 w-full md:w-[45%] justify-end md:justify-start">
                 <h3 className="text-sm md:text-base font-black uppercase tracking-wider truncate text-right md:text-left">{match.team2}</h3>
              </div>
           </div>
        </div>

        {/* AI LABEL (replaces old triggers) */}
        <div className="hidden md:flex items-center justify-start gap-2 flex-wrap mb-2 md:mb-0 md:w-[150px] lg:w-[180px] shrink-0">
           <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-white/10 rounded-md shadow-sm">
              {curation.icon}
              <span className={`text-[9px] font-black uppercase tracking-widest ${curation.textColor}`}>{curation.label}</span>
           </div>
        </div>

        {/* WATCHABILITY SCORE (replaces VOL %) */}
        <div className="w-[50px] md:w-[80px] flex flex-col items-end shrink-0">
           <span className="text-[8px] md:text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Watchability</span>
           <span className="text-sm md:text-lg font-mono font-black tabular-nums text-foreground">{match.volatility}</span>
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
                          <MetricBar label="Openness" value={curation.metrics.openness} colorClass="bg-gradient-to-r from-blue-400 to-teal" />
                          <MetricBar label="Intensity" value={curation.metrics.intensity} colorClass="bg-gradient-to-r from-red-500 to-rose-400" />
                          <MetricBar label="Quality" value={curation.metrics.quality} colorClass="bg-gradient-to-r from-purple-500 to-blue-500" />
                          <div className="col-span-1 md:col-span-2">
                             <MetricBar label="Tempo" value={curation.metrics.tempo} colorClass="bg-gradient-to-r from-yellow-500 to-orange-500" />
                          </div>
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

                 {isLive && (
                    <div className="pt-3 border-t border-white/5">
                       <MomentumBar momentum={curation.metrics.momentum} />
                    </div>
                 )}
              </div>

              {/* NARRATIVE & ACTION PANEL */}
              <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
                 <div>
                    <h4 className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Live Context</h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-mono italic bg-black/20 p-3 rounded-lg border border-white/5">
                       "{curation.whyWatch}"
                    </p>
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


export default function DiscoverPage() {
  const supabase = createClient();
  const [liveMatches, setLiveMatches] = useState(allLiveMatches);
  const [upcomingMatches, setUpcomingMatches] = useState(upcomingTableData);

  const [expandedMatches, setExpandedMatches] = useState<Set<number>>(new Set());
  const [bookmarkedMatches, setBookmarkedMatches] = useState<Set<number>>(new Set());
  const [activeFilter, setActiveFilter] = useState("All"); 

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase.from('matches').select('*');
      if (!error && data) {
        const live = data.filter(m => m.status === 'live');
        const upcoming = data.filter(m => m.status === 'upcoming');
        if (live.length > 0) {
           // use mock for now
        }
        if (upcoming.length > 0) {
          setUpcomingMatches(upcoming);
        }
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
    ...upcomingMatches.map(m => ({ ...m, status: 'upcoming' }))
  ];

  let finalMatches = allCurrentMatches;
  if (activeFilter === "Bookmarks") {
     finalMatches = allCurrentMatches.filter(m => bookmarkedMatches.has(m.id));
  } else if (activeFilter === "Chaos & Goals") {
     finalMatches = allCurrentMatches.filter(m => getMatchCurations(m.id, m.team1, m.status).label === 'Chaos Guaranteed');
  } else if (activeFilter === "Tactical Battles") {
     finalMatches = allCurrentMatches.filter(m => getMatchCurations(m.id, m.team1, m.status).label === 'Tactical Chess Match');
  } else if (activeFilter === "Rivalries") {
     finalMatches = allCurrentMatches.filter(m => getMatchCurations(m.id, m.team1, m.status).label === 'Unmissable');
  }

  const heroMatch = finalMatches.find(m => m.status === 'live') || finalMatches[0];
  let heroCuration = null;
  if (heroMatch) {
     heroCuration = getMatchCurations(heroMatch.id, heroMatch.team1, heroMatch.status);
  }

  const watchabilityMatches = [
    { groupName: 'Live Matches', matches: finalMatches.filter(m => m.status === 'live').sort((a,b) => b.volatility - a.volatility) },
    { groupName: 'Upcoming Matches', matches: finalMatches.filter(m => m.status === 'upcoming').sort((a,b) => b.volatility - a.volatility) }
  ];

  return (
    <main className="min-h-screen bg-[#020202] text-foreground font-sans selection:bg-teal selection:text-black pb-32">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 pt-8">
        
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
                  
                  {/* Top Stats: AI Label & Watchability */}
                  <div className="flex items-start justify-between pb-5 border-b border-white/10">
                     <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">AI Classification</span>
                        <div className="flex items-center gap-2">
                           {heroCuration.icon}
                           <span className={`text-lg font-black uppercase tracking-widest ${heroCuration.textColor}`}>{heroCuration.label}</span>
                        </div>
                     </div>
                     <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Watchability</span>
                        <span className="text-4xl font-mono font-black tabular-nums text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{heroMatch.volatility}</span>
                     </div>
                  </div>

                  {/* The AI Metrics */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                     {heroMatch.status === 'live' || heroMatch.status === 'finished' ? (
                        <>
                           <MetricBar label="Stakes" value={heroCuration.metrics.stakes} colorClass="bg-gradient-to-r from-orange-500 to-red-500" />
                           <MetricBar label="Openness" value={heroCuration.metrics.openness} colorClass="bg-gradient-to-r from-blue-400 to-teal" />
                           <MetricBar label="Intensity" value={heroCuration.metrics.intensity} colorClass="bg-gradient-to-r from-red-500 to-rose-400" />
                           <MetricBar label="Quality" value={heroCuration.metrics.quality} colorClass="bg-gradient-to-r from-purple-500 to-blue-500" />
                           <div className="col-span-2">
                              <MetricBar label="Tempo" value={heroCuration.metrics.tempo} colorClass="bg-gradient-to-r from-yellow-500 to-orange-500" />
                           </div>
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
                  
                  {/* Narrative (Why Watch) */}
                  <div className="pt-4 border-t border-white/10">
                     <p className="text-[11px] text-gray-300 font-mono leading-relaxed italic bg-white/5 p-4 rounded-xl">
                        "{heroCuration.whyWatch}"
                     </p>
                  </div>

               </div>
            </div>
          </div>
        </section>
        )}

        {/* TERMINAL FEED LIST */}
        <section className="space-y-12">
          {watchabilityMatches.map((group) => (
            <div key={group.groupName} className="flex flex-col">
               <div className="flex items-center gap-4 mb-4 pl-2">
                 <div className={`w-1.5 h-6 rounded-full ${group.groupName === 'Live Matches' ? 'bg-coral shadow-[0_0_8px_rgba(255,107,107,0.6)]' : 'bg-teal shadow-[0_0_8px_rgba(0,229,255,0.6)]'}`}></div>
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
                   {group.matches.length === 0 && (
                     <div className="p-8 text-center bg-black/20">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">No matches currently in this category.</span>
                     </div>
                   )}
                 </div>
               </div>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
