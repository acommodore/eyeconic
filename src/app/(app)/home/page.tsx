"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Zap, Brain, ArrowRight, Bookmark, Shuffle, Swords, Activity, Flame, Sparkles, ChevronDown, Filter, MessageSquare } from 'lucide-react';
import { matchService } from '@/services/matchService';
import { Match } from '@/types/match';

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

const MetricDial = ({ label, value, colorHex }: { label: string, value: number, colorHex: string }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-1 md:p-1.5 bg-black/20 rounded-2xl border border-white/5 shadow-inner">
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-md">
          <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
          <circle 
            cx="50" cy="50" r={radius} 
            stroke={colorHex} 
            strokeWidth="8" 
            fill="none" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round" 
            className="transition-all duration-1000 ease-out" 
          />
        </svg>
        <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-white relative z-10 tabular-nums drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{value}</span>
      </div>
      <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase font-mono tracking-widest text-muted-foreground mt-1 md:mt-2 text-center truncate w-full px-1">{label}</span>
    </div>
  );
};

const MatchMomentumGraph = ({ data = [], homeColor = 'bg-[#FFD700]', awayColor = 'bg-white', heightClass = 'h-16', team1Logo, team2Logo }: { data?: number[], homeColor?: string, awayColor?: string, heightClass?: string, team1Logo?: string, team2Logo?: string }) => {
  const graphData = data.length > 0 ? data : [
     2, 5, -2, -5, -8, 10, 15, -2, -10, -25, 
     -15, -5, 5, 20, 45, 85, 90, 60, 40, 25, 
     10, -5, -15, -20, -35, -25, -10, -15, -30, -50,
     -40, -10, 10, 20, 15, 30, 40, 75, 20, 10
  ];

  return (
    <div className="w-full flex flex-col gap-1 py-1">
      <div className="flex justify-between items-center text-[7px] md:text-[8px] font-mono text-muted-foreground uppercase tracking-widest mb-1 px-1">
        <span className="flex items-center gap-1">
          {team1Logo ? <img src={team1Logo} className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain invert" /> : <div className={`w-1.5 h-1.5 rounded-sm ${homeColor}`}></div>}
        </span>
        <span className="font-bold text-foreground tracking-widest drop-shadow-md">Momentum</span>
        <span className="flex items-center gap-1">
          {team2Logo ? <img src={team2Logo} className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain invert" /> : <div className={`w-1.5 h-1.5 rounded-sm ${awayColor}`}></div>}
        </span>
      </div>
      
      <div className={`relative w-full ${heightClass} flex items-center border-x border-white/10 px-0.5 mb-1`}>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20 z-0"></div>
        <div className="absolute -bottom-3 left-0 text-[6px] md:text-[7px] font-mono text-muted-foreground">KO</div>
        <div className="absolute -bottom-3 right-0 text-[6px] md:text-[7px] font-mono text-muted-foreground">HT</div>

        <div className="w-full h-full flex items-center justify-between gap-[1px] z-10">
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
   const isUpcoming = match.status === 'upcoming';
   
   let isStartingSoon = false;
   if (isUpcoming && match.time && match.time.includes(':')) {
       const [hours, minutes] = match.time.split(':').map(Number);
       const now = new Date();
       const matchDate = new Date();
       matchDate.setHours(hours, minutes, 0, 0);
       const diffInMins = (matchDate.getTime() - now.getTime()) / 60000;
       isStartingSoon = (diffInMins > 0 && diffInMins <= 75) || match.id === 4; // Adding ID 4 fallback so it shows in demo
   }

   const contextLabel = isLive ? "Live Context" : isFinished ? "Post-Match Insight" : "Pre-Match Context";
   const contextText = (isLive || isFinished) && match.insight ? match.insight : curation.whyWatch;

   return (
    <div className={`group flex flex-col transition-all duration-500 rounded-2xl relative overflow-hidden ${isExpanded ? 'bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(117, 251, 217,0.1)]' : 'bg-black/10 dark:bg-black/20 border border-transparent hover:border-black/5 dark:hover:border-white/5 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-[0.99]'}`}>
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <button 
        type="button"
        className="relative w-full text-left z-10 flex items-center py-3 px-4 md:py-4 md:px-6 cursor-pointer gap-4 md:gap-6"
        onClick={() => onToggle(match.id)}
      >
        {/* TIME / STATUS */}
        <div className="w-[65px] md:w-[80px] flex flex-col items-center justify-center shrink-0">
           {isLive ? (
              <span className="text-xs md:text-sm font-bold font-mono text-coral animate-pulse drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]">
                 <span className="inline-block w-1.5 h-1.5 bg-coral rounded-full mr-1.5 relative top-[-1px] shadow-[0_0_8px_rgba(255,127,80,0.8)]"></span>
                 {match.time}
              </span>
           ) : isFinished ? (
              <span className="text-[10px] font-mono text-foreground/70 font-bold uppercase tracking-widest">FT</span>
           ) : (
              <span className="text-[10px] md:text-xs font-mono font-bold text-foreground/70">{match.time}</span>
           )}
        </div>

        {/* TEAMS & SCORE */}
        <div className="flex-1 flex items-center min-w-0 pr-2 md:pr-4">
           <div className="flex items-center justify-between gap-2 w-full">
              {/* Home Team */}
              <div className="flex items-center justify-end w-[40%] gap-2 md:gap-3">
                 <h3 className="hidden md:block text-sm md:text-base font-black uppercase tracking-wider text-right truncate text-foreground drop-shadow-md">{match.team1}</h3>
                 <h3 className="md:hidden text-[13px] font-black uppercase tracking-wider text-right text-foreground drop-shadow-md">{match.team1.substring(0,3)}</h3>
                 <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-full p-0.5 border border-border">
                    <img src={match.logo1} alt={match.team1} className={`w-full h-full object-contain ${match.logo1.includes('black') || match.team1 === 'Juventus' ? 'dark:invert' : ''}`} />
                 </div>
              </div>

              {/* Score */}
              <div className="shrink-0 flex justify-center w-[20%]">
                 {isLive || isFinished ? (
                    <span className="text-sm md:text-2xl font-black font-mono tracking-tighter tabular-nums bg-black/10 dark:bg-black/60 px-2 md:px-3 py-1 rounded-md border border-border text-foreground whitespace-nowrap">
                       {match.score}
                    </span>
                 ) : (
                    <span className="text-[10px] md:text-xs font-black text-muted-foreground px-2 md:px-3 py-1 bg-black/5 dark:bg-black/40 rounded-md border border-border font-mono">VS</span>
                 )}
              </div>

              {/* Away Team */}
              <div className="flex items-center justify-start w-[40%] gap-2 md:gap-3">
                 <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-full p-0.5 border border-border">
                    <img src={match.logo2} alt={match.team2} className={`w-full h-full object-contain ${match.logo2.includes('black') || match.team2 === 'Juventus' ? 'dark:invert' : ''}`} />
                 </div>
                 <h3 className="hidden md:block text-sm md:text-base font-black uppercase tracking-wider text-left truncate text-foreground drop-shadow-md">{match.team2}</h3>
                 <h3 className="md:hidden text-[13px] font-black uppercase tracking-wider text-left text-foreground drop-shadow-md">{match.team2.substring(0,3)}</h3>
              </div>
           </div>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="w-[65px] md:w-[80px] flex items-center justify-end gap-1.5 shrink-0">
           <Flame className="w-3 h-3 md:w-3.5 md:h-3.5 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
           <span className="text-xs md:text-base font-mono font-black tabular-nums text-foreground drop-shadow-md">{match.volatility}%</span>
           <ChevronDown className={`shrink-0 w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* EXPANDED VIEW */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-3 border-t border-white/5 bg-black/40 shadow-inner relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              
              {/* AI METRICS PANEL */}
              <div className="col-span-1 md:col-span-2 bg-black/40 p-3 md:p-4 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#75fbd9]/5 to-purple-500/5 pointer-events-none" />
                 
                 <h4 className="relative z-10 text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-[#75fbd9]" /> AI Ranking Pipeline
                 </h4>
                 
                 <div className="relative z-10 grid grid-cols-4 gap-2 mb-3">
                    {/* Live/Finished vs Upcoming logic */}
                    {isLive || isFinished ? (
                       <>
                          <MetricDial label="Stakes" value={curation.metrics.stakes} colorHex="#f97316" />
                          <MetricDial label="Intensity" value={curation.metrics.intensity} colorHex="#ef4444" />
                          <MetricDial label="Quality" value={curation.metrics.quality} colorHex="#a855f7" />
                          <MetricDial label="Tempo" value={curation.metrics.tempo} colorHex="#eab308" />
                       </>
                    ) : (
                       <>
                          <MetricDial label="Stakes" value={curation.metrics.stakes} colorHex="#f97316" />
                          <MetricDial label="Fan Temp" value={curation.metrics.fanTemp} colorHex="#facc15" />
                          <MetricDial label="Volatility" value={curation.metrics.volatility} colorHex="#75fbd9" />
                          <MetricDial label="Star Power" value={curation.metrics.starPower} colorHex="#a855f7" />
                       </>
                    )}
                 </div>

                 {(isLive || isFinished) && (
                    <div className="relative z-10 pt-2 border-t border-white/5 mt-2">
                       <MatchMomentumGraph homeColor="bg-[#75fbd9]" awayColor="bg-coral" heightClass="h-10" team1Logo={match.logo1} team2Logo={match.logo2} />
                    </div>
                 )}
              </div>

              {/* NARRATIVE & ACTION PANEL */}
              <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
                 <div>
                    <h4 className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5">{contextLabel}</h4>
                    <p className="text-[10px] md:text-xs text-gray-200 leading-relaxed font-mono italic bg-black/40 p-3 md:p-4 rounded-2xl border border-white/5 mb-3 shadow-inner">
                       "{contextText}"
                    </p>
                    
                    {/* Hero and Villain from mockData */}
                    {match.emotionalMvp && (
                       <div className={`grid ${isFinished ? 'grid-cols-1' : 'grid-cols-2'} gap-3 mb-3`}>
                          <div className="bg-gradient-to-br from-black/40 to-black/20 p-2 md:p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
                             <span className="text-[8px] md:text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                                {isFinished ? "Match MVP 🏆" : "MVP Watch 🌟"}
                             </span>
                             <span className="text-[10px] md:text-xs font-black uppercase text-[#75fbd9] drop-shadow-[0_0_8px_rgba(117, 251, 217,0.4)]">{match.emotionalMvp}</span>
                          </div>
                          
                          {!isFinished && match.polarizingPlayer && (
                             <div className="bg-gradient-to-br from-black/40 to-black/20 p-2 md:p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-coral/30 to-transparent" />
                                <span className="text-[8px] md:text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Fraud Watch 🚨</span>
                                <span className="text-[10px] md:text-xs font-black uppercase text-coral drop-shadow-[0_0_8px_rgba(255,107,107,0.4)]">{match.polarizingPlayer}</span>
                             </div>
                          )}
                       </div>
                    )}
                 </div>

                 <div className="mt-2 md:mt-3 flex flex-wrap gap-2 md:gap-3">
                    <Link href={`/match/${match.id}`} className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 text-[9px] font-black bg-[#75fbd9] text-black px-3 py-3 rounded-2xl uppercase tracking-widest hover:bg-white hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(117, 251, 217,0.3)]">
                       MATCH CENTRE <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button 
                       onClick={(e) => { e.stopPropagation(); onToggleBookmark(match.id); }}
                       className={`flex-none inline-flex items-center justify-center text-[10px] font-black p-3.5 rounded-2xl uppercase tracking-widest transition-all ${isBookmarked ? 'bg-[#75fbd9]/20 text-[#75fbd9] border border-[#75fbd9]/30 shadow-[0_0_20px_rgba(117, 251, 217,0.15)]' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                    >
                       <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                    
                    {(isFinished || isStartingSoon) && (
                       <Link href={`/stands/${match.id}`} className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 text-[9px] font-black bg-coral text-black border border-coral/50 px-3 py-3 rounded-2xl uppercase tracking-widest hover:brightness-110 hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(255,127,80,0.4)]">
                          <MessageSquare className="w-3 h-3" /> JOIN STAND
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
    <div className="w-full bg-[#111] border-y border-white/10 flex items-center overflow-hidden py-1.5 shadow-2xl"><div className="flex whitespace-nowrap animate-ticker w-[200%]">
          <div className="flex justify-around min-w-[50%] shrink-0">
             {tickerItems.map((item, idx) => (
               <button key={`ticker-1-${idx}`} className="text-xs font-mono tracking-widest uppercase text-[#75fbd9]/80 px-10 hover:text-white transition-colors py-1 cursor-pointer">
                 {item}
               </button>
             ))}
          </div>
          <div className="flex justify-around min-w-[50%] shrink-0">
             {tickerItems.map((item, idx) => (
               <button key={`ticker-2-${idx}`} className="text-xs font-mono tracking-widest uppercase text-[#75fbd9]/80 px-10 hover:text-white transition-colors py-1 cursor-pointer">
                 {item}
               </button>
             ))}
          </div>
       </div>
    </div>
);

export default function DiscoverPage() {
  const supabase = createClient();
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [expandedMatches, setExpandedMatches] = useState<Set<number>>(new Set());
  const [bookmarkedMatches, setBookmarkedMatches] = useState<Set<number>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  
  const [sortMode, setSortMode] = useState<'watchability' | 'league'>('watchability');
  const [activeFilter, setActiveFilter] = useState("All"); 

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupName)) next.delete(groupName);
      else next.add(groupName);
      return next;
    });
  };

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const live = await matchService.getLiveMatches();
        const upcoming = await matchService.getUpcomingMatches();
        const finished = await matchService.getFinishedMatches();
        setLiveMatches(live);
        setUpcomingMatches(upcoming);
        setFinishedMatches(finished);
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

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
    { groupName: 'Live Matches', matches: finalMatches.filter(m => m.status === 'live').sort((a,b) => (b.volatility || 0) - (a.volatility || 0)) },
    { groupName: 'Upcoming Matches', matches: finalMatches.filter(m => m.status === 'upcoming').sort((a,b) => (b.volatility || 0) - (a.volatility || 0)) },
    { groupName: 'Finished Matches', matches: finalMatches.filter(m => m.status === 'finished').sort((a,b) => (b.volatility || 0) - (a.volatility || 0)) }
  ];

  const groupedMatches = finalMatches.reduce((acc, match) => {
     if (!acc[match.league]) acc[match.league] = [];
     acc[match.league].push(match);
     return acc;
  }, {} as Record<string, typeof allCurrentMatches>);

  return (
    <main className="min-h-screen bg-[#000] text-foreground font-sans selection:bg-[#75fbd9] selection:text-black pb-32 overflow-x-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      {/* ABSOLUTE TOP HERO SECTION */}
      {heroMatch && heroCuration && (
      <section className="relative w-full pt-2 pb-2 md:pt-6 md:pb-6 border-b border-white/10 bg-black overflow-hidden">
         {/* Cinematic Backgrounds */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#75fbd9]/10 via-transparent to-black/90 mix-blend-screen pointer-events-none" />
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#75fbd9]/20 rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-screen animate-pulse" />
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay" />

         <div className="relative z-10 w-full max-w-[1200px] mx-auto px-2 md:px-8">
            
            {/* The Compact Glassmorphic Hero Card */}
            <div className="w-full bg-gradient-to-br from-white/[0.03] to-black/60 border border-white/10 rounded-2xl md:rounded-2xl p-3 md:p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col gap-4 lg:gap-6">
               {/* Internal glowing elements */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
               
               {/* Top row: Tag & Watchability */}
               <div className="flex items-center justify-between">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-[#75fbd9] flex items-center gap-2 bg-[#75fbd9]/10 px-3 py-1.5 rounded-2xl border border-[#75fbd9]/30 shadow-[0_0_15px_rgba(117, 251, 217,0.2)]">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#75fbd9] animate-pulse shadow-[0_0_10px_rgba(117, 251, 217,1)]"></span>
                     MATCH OF THE MOMENT
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-2xl border border-[#75fbd9]/20 shadow-inner">
                     <Brain className="w-3 h-3 text-[#75fbd9]" />
                     <span className="text-[10px] md:text-xs font-mono font-black text-[#75fbd9] tracking-widest">{heroMatch.volatility}%</span>
                  </div>
               </div>

               {/* Middle row: Horizontal Matchup */}
               <div className="flex items-center justify-center gap-4 md:gap-12 w-full my-2">
                  {/* Team 1 */}
                  <div className="flex flex-col items-center gap-2 md:gap-3">
                     <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center relative group">
                        <img src={heroMatch.logo1} className={`relative z-10 w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] ${heroMatch.logo1.includes('black') || heroMatch.team1 === 'Juventus' ? 'invert' : ''}`} />
                     </div>
                     <h2 className="text-sm md:text-xl font-black uppercase tracking-tighter text-center max-w-[100px] md:max-w-[160px] leading-tight">{heroMatch.team1}</h2>
                  </div>
                  
                  {/* Score */}
                  <div className="flex flex-col items-center justify-center">
                     <div className="text-4xl md:text-6xl font-mono font-black tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] tabular-nums px-4 py-2 bg-black/40 rounded-2xl border border-white/5">
                        {(heroMatch as any).score ? (heroMatch as any).score.replace(' - ', '-') : 'VS'}
                     </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex flex-col items-center gap-2 md:gap-3">
                     <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center relative group">
                        <img src={heroMatch.logo2} className={`relative z-10 w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] ${heroMatch.logo2.includes('black') || heroMatch.team2 === 'Juventus' ? 'invert' : ''}`} />
                     </div>
                     <h2 className="text-sm md:text-xl font-black uppercase tracking-tighter text-center max-w-[100px] md:max-w-[160px] leading-tight">{heroMatch.team2}</h2>
                  </div>
               </div>

               {/* Bottom row: Action & Metrics */}
               <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-4 border-t border-white/5">
                  <Link href={`/match/${heroMatch.id}`} className="group inline-flex items-center justify-center gap-2 text-[10px] md:text-xs font-mono font-black uppercase tracking-widest text-black bg-[#75fbd9] px-8 py-4 rounded-2xl hover:bg-white transition-all duration-300 w-full lg:w-max shadow-[0_0_25px_rgba(117, 251, 217,0.4)] hover:shadow-[0_0_35px_rgba(117, 251, 217,0.6)] hover:scale-105 shrink-0">
                     MATCH CENTRE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="w-full lg:w-auto flex flex-row items-center gap-3 lg:gap-4 justify-start lg:justify-end flex-1 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
                     {/* 1. Momentum Graph */}
                     <div className="w-32 md:w-48 shrink-0">
                        <MatchMomentumGraph homeColor="bg-[#75fbd9]" awayColor="bg-coral" heightClass="h-8" team1Logo={heroMatch.logo1} team2Logo={heroMatch.logo2} />
                     </div>
                     
                     <div className="w-px h-8 bg-white/10 shrink-0 mx-1" />

                     {/* 2. 4 Radial Dials */}
                     <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                        <MetricDial label="Stakes" value={heroCuration.metrics.stakes} colorHex="#f97316" />
                        <MetricDial label="Tempo" value={heroCuration.metrics.tempo} colorHex="#eab308" />
                        <MetricDial label="Intensity" value={heroCuration.metrics.intensity} colorHex="#ef4444" />
                        <MetricDial label="Quality" value={heroCuration.metrics.quality} colorHex="#a855f7" />
                     </div>

                     {((heroMatch as any).emotionalMvp || (heroMatch as any).polarizingPlayer) && (
                        <>
                           <div className="w-px h-8 bg-white/10 shrink-0 mx-1" />
                           {/* 3. MVP and Fraud Watch */}
                           <div className="flex items-center gap-2 shrink-0 h-full">
                              {(heroMatch as any).emotionalMvp && (
                                 <div className="flex flex-col items-center justify-center bg-[#75fbd9]/10 rounded-2xl px-3 py-1.5 border border-[#75fbd9]/20 h-full min-h-[48px]">
                                    <span className="text-[7px] md:text-[8px] text-[#75fbd9]/70 uppercase tracking-widest mb-0.5">MVP Watch</span>
                                    <span className="text-[9px] md:text-xs font-black text-[#75fbd9] truncate max-w-[80px]">{(heroMatch as any).emotionalMvp}</span>
                                 </div>
                              )}
                              {(heroMatch as any).polarizingPlayer && (
                                 <div className="flex flex-col items-center justify-center bg-coral/10 rounded-2xl px-3 py-1.5 border border-coral/20 h-full min-h-[48px]">
                                    <span className="text-[7px] md:text-[8px] text-coral/70 uppercase tracking-widest mb-0.5">Fraud Watch</span>
                                    <span className="text-[9px] md:text-xs font-black text-coral truncate max-w-[80px]">{(heroMatch as any).polarizingPlayer}</span>
                                 </div>
                              )}
                           </div>
                        </>
                     )}
                  </div>
               </div>

            </div>
         </div>
      </section>
      )}

      <div className="relative z-10 w-full mb-2 md:mb-4">
        <NewsTicker />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-2 md:px-8">
        
        {/* FILTERS AND SORTING ROW */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-4">
           {/* EMOTIONAL FILTERS */}
           <div className="relative w-full lg:w-auto">
             <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2 pr-8">
                {filters.map(f => {
                  const Icon = f.icon;
                  const isActive = activeFilter === f.name;
                  return (
                    <button 
                      key={f.name}
                      onClick={() => setActiveFilter(f.name)}
                      className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-[10px] font-mono uppercase tracking-widest transition-all ${isActive ? 'bg-[#75fbd9]/10 text-[#75fbd9] border-[#75fbd9]/50 shadow-[0_0_15px_rgba(117, 251, 217,0.2)]' : 'bg-card border-border text-muted-foreground hover:border-white/30 hover:bg-black/20 dark:bg-muted'}`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {f.name}
                    </button>
                  )
                })}
             </div>
             {/* Fade overlay */}
             <div className="absolute top-0 right-0 bottom-2 w-12 bg-gradient-to-l from-[#020202] via-[#020202]/80 to-transparent pointer-events-none lg:hidden"></div>
           </div>

           {/* TERMINAL FEED SORTING CONTROLS */}
           <div className="flex items-center shrink-0 pb-2 w-full lg:w-auto">
              <div className="flex w-full bg-black/40 backdrop-blur-md rounded-2xl p-1 border border-white/10 shadow-lg">
                <button 
                  onClick={() => setSortMode('watchability')}
                  className={`flex-1 px-4 lg:px-6 py-2.5 lg:py-2 flex items-center justify-center gap-2 rounded-2xl text-[10px] font-black tracking-widest transition-all ${sortMode === 'watchability' ? 'bg-[#75fbd9] text-[#0a192f] shadow-[0_0_20px_rgba(117, 251, 217,0.4)] scale-[1.02] lg:scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}>
                   <Activity className="w-3.5 h-3.5" />
                   WATCHABILITY
                </button>
                <button 
                  onClick={() => setSortMode('league')}
                  className={`flex-1 px-4 lg:px-6 py-2.5 lg:py-2 flex items-center justify-center gap-2 rounded-2xl text-[10px] font-black tracking-widest transition-all ${sortMode === 'league' ? 'bg-[#75fbd9] text-[#0a192f] shadow-[0_0_20px_rgba(117, 251, 217,0.4)] scale-[1.02] lg:scale-105' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}>
                   <Swords className="w-3.5 h-3.5" />
                   LEAGUE
                </button>
              </div>
           </div>
        </div>

        {/* TERMINAL FEED LIST */}
        <section className="space-y-2">
          {sortMode === 'league' ? (
             Object.entries(groupedMatches).map(([league, matches]) => (
               <div key={league} className="flex flex-col">
                  {/* League Header */}
                  <button onClick={() => toggleGroup(league)} className="flex items-center gap-4 mb-2 pl-2 w-full text-left group">
                    <div className="w-1.5 h-6 bg-[#75fbd9] rounded-full shadow-[0_0_12px_rgba(117, 251, 217,0.8)]"></div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-foreground drop-shadow-lg group-hover:text-[#75fbd9] transition-colors">{league}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${collapsedGroups.has(league) ? 'rotate-180' : ''}`} />
                  </button>

                  {/* League Container */}
                  <div className={`transition-all duration-500 overflow-hidden ${collapsedGroups.has(league) ? 'max-h-0 opacity-0' : 'max-h-[5000px] opacity-100'}`}>
                    <div className="bg-black/5 dark:bg-black/30 backdrop-blur-xl rounded-2xl border border-border overflow-hidden shadow-2xl">
                      <div className="flex flex-col">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {matches.map((match: any, index: number) => (
                        <div key={match.id} className="mb-2">
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
               </div>
             ))
          ) : (
             watchabilityMatches.map((group) => {
               if (group.matches.length === 0) return null;
               return (
               <div key={group.groupName} className="flex flex-col">
                  <button onClick={() => toggleGroup(group.groupName)} className="flex items-center gap-4 mb-2 pl-2 w-full text-left group">
                    <div className={`w-1.5 h-6 rounded-full ${group.groupName === 'Live Matches' ? 'bg-coral shadow-[0_0_12px_rgba(255,107,107,0.8)]' : group.groupName === 'Finished Matches' ? 'bg-zinc-500 shadow-[0_0_12px_rgba(161,161,170,0.5)]' : 'bg-[#75fbd9] shadow-[0_0_12px_rgba(117, 251, 217,0.8)]'}`}></div>
                    <h2 className={`text-xl font-black uppercase tracking-widest text-foreground drop-shadow-lg transition-colors ${group.groupName === 'Live Matches' ? 'group-hover:text-coral' : group.groupName === 'Finished Matches' ? 'group-hover:text-zinc-500' : 'group-hover:text-[#75fbd9]'}`}>{group.groupName}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${collapsedGroups.has(group.groupName) ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`transition-all duration-500 overflow-hidden ${collapsedGroups.has(group.groupName) ? 'max-h-0 opacity-0' : 'max-h-[5000px] opacity-100'}`}>
                    <div className="bg-black/5 dark:bg-black/30 backdrop-blur-xl rounded-2xl border border-border overflow-hidden shadow-2xl">
                      <div className="flex flex-col">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {group.matches.map((match: any, index: number) => (
                        <div key={match.id} className="mb-2">
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
               </div>
             )})
          )}
        </section>

      </div>
    </main>
  );
}



