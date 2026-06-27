"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Zap, Brain, ArrowRight, Bookmark, Shuffle, Swords, Activity } from 'lucide-react';

// --- MOCK DATA ---

import { allLiveMatches, upcomingTableData, finishedTableData } from '@/lib/mockData';





const tickerItems = [
  "📈 ARS Fans: +15% Optimism (Saka sub)",
  "📉 MUN Fans: -30% Patience (Ten Hag)",
  "⚠️ RMA Fans: Tension Spiking (0-0 80')",
  "🔥 LIV Fans: Roaring (+45% Momentum)",
  "🧊 CHE Fans: Complete silence at Stamford Bridge",
  "📈 JUV Fans: Tactical approval rising (+12%)",
];

const getVolatilityColor = (volatility: number) => {
  if (volatility >= 90) return 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]';
  if (volatility >= 70) return 'text-coral drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]';
  return 'text-teal drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]';
};

const getShortName = (name: string) => {
  const map: Record<string, string> = {
    'Chelsea': 'CHE',
    'Man City': 'MCI',
    'Man United': 'MUN',
    'Arsenal': 'ARS',
    'Liverpool': 'LIV',
    'Tottenham': 'TOT',
    'Barcelona': 'FCB',
    'Real Madrid': 'RMA',
    'Everton': 'EVE',
    'Newcastle': 'NEW',
    'Inter Milan': 'INT',
    'Inter': 'INT',
    'Milan': 'MIL',
    'Dortmund': 'BVB',
    'PSG': 'PSG',
    'Bayern': 'FCB',
    'Juventus': 'JUV',
  };
  return map[name] || name.substring(0, 3).toUpperCase();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TerminalRow = ({ match, isExpanded, onToggle, isLive = false, isFinished = false }: { match: any, isExpanded: boolean, onToggle: (id: number) => void, isLive?: boolean, isFinished?: boolean }) => {
  return (
    <div className={`border-b border-border bg-card/40 backdrop-blur-sm hover:bg-white/[0.04] transition-colors overflow-hidden ${isExpanded ? 'bg-white/[0.04]' : ''}`}>
      <div 
        className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer gap-4 md:gap-6"
        onClick={() => onToggle(match.id)}
      >
        <div className="flex items-center gap-4 md:gap-6 w-full">
           <div className="w-12 shrink-0 flex flex-col items-center justify-center">
              {isLive ? (
                 <span className="text-[10px] font-mono text-coral animate-pulse font-bold">{match.time}</span>
              ) : isFinished ? (
                 <span className="text-[10px] font-mono text-muted-foreground font-bold">FT</span>
              ) : (
                 <span className="text-[10px] font-mono text-muted-foreground font-bold">{match.time}</span>
              )}
           </div>

           <div className="flex-1 min-w-0 w-full md:w-auto flex flex-col md:flex-row md:items-center md:justify-between">
              
              <div className="flex items-center justify-start gap-2 flex-wrap mb-2 md:mb-0 md:w-[150px] lg:w-[200px] shrink-0">
                 {match.triggers?.map((t: string, i: number) => (
                    <span key={i} className="text-[9px] font-mono uppercase text-coral bg-coral/5 border border-coral/30 px-1.5 py-0.5 rounded tracking-widest">[{t.replace(/[\[\]]/g, '')}]</span>
                 ))}
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 min-w-0 flex-1">
                 <div className="flex items-center gap-2 justify-end min-w-0">
                    <span className="text-sm font-bold text-foreground uppercase tracking-wider text-right truncate hidden md:block">{match.team1}</span>
                    <span className="text-sm font-bold text-foreground uppercase tracking-wider text-right truncate md:hidden">{getShortName(match.team1)}</span>
                    {match.logo1 && (
                       /* eslint-disable-next-line @next/next/no-img-element */
                       <img src={match.logo1} alt={match.team1} className={`w-5 h-5 object-contain shrink-0 ${match.logo1.includes('black') || match.team1 === 'Juventus' ? 'invert' : ''}`} />
                    )}
                 </div>

                 <div className="flex items-center justify-center min-w-[48px] px-2 shrink-0">
                    {isLive || isFinished ? (
                       <span className="text-lg font-mono font-black text-foreground tabular-nums whitespace-nowrap">{match.score || "0 - 0"}</span>
                    ) : (
                       <span className="text-sm font-mono text-gray-600 font-bold">VS</span>
                    )}
                 </div>

                 <div className="flex items-center gap-2 justify-start min-w-0">
                    {match.logo2 && (
                       /* eslint-disable-next-line @next/next/no-img-element */
                       <img src={match.logo2} alt={match.team2} className={`w-5 h-5 object-contain shrink-0 ${match.logo2.includes('black') || match.team2 === 'Juventus' ? 'invert' : ''}`} />
                    )}
                    <span className="text-sm font-bold text-foreground uppercase tracking-wider text-left truncate hidden md:block">{match.team2}</span>
                    <span className="text-sm font-bold text-foreground uppercase tracking-wider text-left truncate md:hidden">{getShortName(match.team2)}</span>
                 </div>
              </div>
              
              {/* Dummy spacing block to keep teams centered horizontally */}
              <div className="hidden md:block md:w-[150px] lg:w-[200px] shrink-0"></div>
           </div>

           <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <div className="flex items-center gap-2">
                 <span className={`font-mono text-lg font-black tabular-nums ${getVolatilityColor(match.volatility)}`}>
                    {match.volatility}%
                 </span>
                 <span className="text-[9px] uppercase tracking-widest text-muted-foreground hidden sm:block">VOL</span>
              </div>
              
              <Link href={`/match/${match.id}`} onClick={(e) => e.stopPropagation()} className="group hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-black/5 dark:bg-muted hover:bg-black/10 dark:bg-muted/80 transition-colors border border-border">
                 <ArrowRight className="w-4 h-4 text-teal group-hover:translate-x-0.5 transition-transform" />
              </Link>
           </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-5 pt-3 border-t border-border bg-black/5 dark:bg-black/40 shadow-inner">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                 <h4 className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Live Context</h4>
                 <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                    {match.insight || (isFinished ? "Post-match fallout and analysis ongoing." : isLive ? "Awaiting significant narrative developments..." : "Pre-match buildup is intensifying...")}
                 </p>
                 <Link href={`/match/${match.id}`} className="mt-4 md:hidden inline-flex items-center gap-2 text-[10px] font-mono text-teal uppercase tracking-widest">
                    Enter Match Centre <ArrowRight className="w-3 h-3" />
                 </Link>
              </div>

              {(match.emotionalMvp || match.polarizingPlayer) && (
                 <div className="col-span-1">
                    <h4 className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Key Actors</h4>
                    <div className="flex flex-col gap-2">
                       {match.emotionalMvp && (
                          <div className="flex items-center justify-between pb-1 border-b border-border">
                             <span className="text-[10px] font-mono uppercase tracking-widest text-teal">Hero</span>
                             <span className="text-xs font-bold text-foreground uppercase">{match.emotionalMvp}</span>
                          </div>
                       )}
                       {match.polarizingPlayer && (
                          <div className="flex items-center justify-between pb-1 border-b border-border">
                             <span className="text-[10px] font-mono uppercase tracking-widest text-coral">Villain</span>
                             <span className="text-xs font-bold text-foreground uppercase">{match.polarizingPlayer}</span>
                          </div>
                       )}
                    </div>
                 </div>
              )}

              <div className="col-span-1">
                 <h4 className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Audience State</h4>
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between pb-1 border-b border-border">
                       <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Dominant Emotion</span>
                       <div className="flex items-center gap-1.5 text-xs font-bold text-foreground uppercase">
                          <span>{match.fanMoodEmoji || "🔥"}</span>
                          <span>{match.fanMood || match.mood || "Electric"}</span>
                       </div>
                    </div>
                    {match.agenda && (
                       <div className="flex items-center justify-between pb-1 border-b border-border">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Active Agenda</span>
                          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-foreground truncate max-w-[120px]">{match.agenda}</span>
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default function DiscoverPage() {
  const supabase = createClient();
  const [liveMatches, setLiveMatches] = useState(allLiveMatches);
  const [upcomingMatches, setUpcomingMatches] = useState(upcomingTableData);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase.from('matches').select('*');
      if (!error && data) {
        const live = data.filter(m => m.status === 'live');
        const upcoming = data.filter(m => m.status === 'upcoming');
        if (live.length > 0) {
          // Map to match frontend schema
          const mappedLive = live.map(m => ({
            id: m.id,
            team1: m.team1,
            team2: m.team2,
            score: `${m.score1} - ${m.score2}`,
            time: m.current_minute || "0'",
            logo1: m.logo1,
            logo2: m.logo2,
            league: m.league,
            pulseStatus: m.volatility > 90 ? "Volatile" : "Heating Up",
            pulseEmoji: m.mood?.includes('⚡') ? "⚡" : "🔥",
            pulseColor: "text-coral",
            insight: "Real-time insights arriving...",
            emotionalMvp: "Loading...",
            polarizingPlayer: "Loading...",
            fanMood: m.mood?.replace(/[^ws]/gi, '').trim() || "Tense",
            fanMoodEmoji: m.mood?.match(/[�-�][�-�]/)?.[0] || "😬",
            metrics: { chaos: m.volatility, tactical: 80, rivalry: 90, surprise: 40 },
            bookmarked: true,
            agenda: "Live updates active",
            volatility: m.volatility,
            triggers: m.triggers || []
          }));
            // setLiveMatches(mappedLive); // commented out to show mock data
            // We can still use the upcoming matches from backend if needed
          }
        if (upcoming.length > 0) {
          setUpcomingMatches(upcoming);
        }
      }
    };
    
    fetchMatches();

    const channel = supabase.channel('realtime:matches')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'matches' }, (payload) => {
        setLiveMatches(prev => prev.map(m => {
          if (m.id === payload.new.id) {
            return {
              ...m,
              score: `${payload.new.score1} - ${payload.new.score2}`,
              time: payload.new.current_minute || m.time,
              volatility: payload.new.volatility || m.volatility
            };
          }
          return m;
        }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);
  const [activeFilter, setActiveFilter] = useState("Chaos"); // Chaos, Tactical, Rivalries, Surprise Me, Bookmarks
  const [sortMode, setSortMode] = useState<'watchability' | 'league'>('watchability');
  const [expandedMatches, setExpandedMatches] = useState<Set<number>>(new Set());

  const toggleMatch = (id: number) => {
    const next = new Set(expandedMatches);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedMatches(next);
  };

  // Sorting logic for Live Matches based on Active Filter
  const sortedLiveMatches = [...liveMatches].sort((a, b) => {
    if (activeFilter === "Bookmarks") return (b.bookmarked ? 1 : 0) - (a.bookmarked ? 1 : 0);
    if (activeFilter === "Chaos") return b.metrics.chaos - a.metrics.chaos;
    if (activeFilter === "Tactical") return b.metrics.tactical - a.metrics.tactical;
    if (activeFilter === "Rivalries") return b.metrics.rivalry - a.metrics.rivalry;
    if (activeFilter === "Surprise Me") return b.metrics.surprise - a.metrics.surprise;
    return 0;
  });

  const heroMatch = sortedLiveMatches[0];
  const remainingLiveMatches = sortedLiveMatches.slice(1);

  const [activeDate, setActiveDate] = useState("14");

  // Calendar Days
  const days = [
    { label: "Mon", date: "12" },
    { label: "Tue", date: "13" },
    { label: "Wed", date: "14" },
    { label: "Thu", date: "15" },
    { label: "Fri", date: "16" },
    { label: "Sat", date: "17" },
    { label: "Sun", date: "18" },
  ];

  const filters = [
    { name: "Chaos", icon: Zap },
    { name: "Tactical", icon: Brain },
    { name: "Rivalries", icon: Swords },
    { name: "Surprise Me", icon: Shuffle },
    { name: "Bookmarks", icon: Bookmark },
  ];

  // Tag matches with status
  const allCurrentMatches = [
    ...remainingLiveMatches.map(m => ({ ...m, status: 'live' })),
    ...upcomingMatches.map(m => ({ ...m, status: 'upcoming' })),
    ...finishedTableData.map(m => ({ ...m, status: 'finished' }))
  ];

  // Group by League
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupedMatches: Record<string, any[]> = allCurrentMatches.reduce((acc, match) => {
    const league = match.league || "Other Competitions";
    if (!acc[league]) acc[league] = [];
    acc[league].push(match);
    return acc;
  }, {} as Record<string, any[]>);

  // Group by Watchability (Status > Volatility)
  const watchabilityMatches = [
    {
      groupName: "Live Matches",
      matches: allCurrentMatches.filter(m => m.status === 'live').sort((a, b) => b.volatility - a.volatility)
    },
    {
      groupName: "Upcoming Matches",
      matches: allCurrentMatches.filter(m => m.status === 'upcoming').sort((a, b) => b.volatility - a.volatility)
    },
    {
      groupName: "Finished Matches",
      matches: allCurrentMatches.filter(m => m.status === 'finished').sort((a, b) => b.volatility - a.volatility)
    }
  ].filter(group => group.matches.length > 0);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-teal selection:text-black pb-32 overflow-x-hidden relative">
      
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal/20 blur-[120px]"></div>
         <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[100px]"></div>
         <div className="absolute top-[40%] right-[-20%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[150px]"></div>
      </div>

      {/* 0. TERMINAL TICKER TAPE */}
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 pt-8">
        
        {/* CALENDAR & THEME HEADER */}
        <header className="mb-8 flex flex-row items-center justify-between gap-4">
           <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0 flex-1">
              {days.map(day => {
                const isActive = day.date === activeDate;
                return (
                  <button key={day.date} onClick={() => setActiveDate(day.date)} className={`flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-xl border shrink-0 ${isActive ? 'bg-black/5 dark:bg-black/5 dark:bg-muted border-teal text-teal shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-transparent border-black/10 dark:border-border text-muted-foreground dark:text-muted-foreground hover:border-black/20 dark:hover:border-border-strong'} cursor-pointer transition-all`}>
                    <span className="text-[10px] font-mono uppercase tracking-widest">{day.label}</span>
                    <span className={`text-lg font-mono font-black tabular-nums ${isActive ? 'text-black dark:text-foreground drop-shadow-md' : ''}`}>{day.date}</span>
                  </button>
                );
              })}
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

        {/* 1. HERO SECTION (Ranked #1 by Filter) */}
        {heroMatch && (
        <section className="mb-16">
          <div className="relative rounded-[40px] border border-border bg-card/60 backdrop-blur-md overflow-hidden group shadow-2xl">
            {/* Subtle Image background for Hero */}
            <div 
               className="absolute inset-0 bg-cover bg-center opacity-[0.03] mix-blend-screen group-hover:opacity-[0.06] transition-opacity duration-1000" 
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen group-hover:bg-teal/20 transition-colors duration-1000"></div>
            
            <div className="absolute top-8 right-8 z-20 hidden md:block">
              <img src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg" alt="Premier League" className="h-10 md:h-12 w-auto drop-shadow-md filter brightness-0 invert opacity-50" />
            </div>

            <div className="relative z-10 p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
               <div className="flex-1 flex flex-col justify-center w-full">
                  {/* Match of the Day indicator */}
                  <div className="text-[10px] font-mono uppercase tracking-widest text-teal mb-6 flex items-center gap-2 bg-teal/10 w-max px-3 py-1.5 rounded-full border border-teal/20">
                     <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]"></span>
                     MATCH OF THE MOMENT
                  </div>

                  {/* Scoreline */}
                  <div className="flex flex-col gap-4 mb-8">
                     <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={heroMatch.logo1} alt={heroMatch.team1} className={`w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg shrink-0 ${heroMatch.logo1.includes('black') || heroMatch.team1 === 'Juventus' ? 'invert' : ''}`} />
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-foreground drop-shadow-md truncate hidden md:block">{heroMatch.team1}</h2>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-foreground drop-shadow-md truncate md:hidden">{getShortName(heroMatch.team1)}</h2>
                        <span className="text-5xl md:text-6xl font-mono font-black text-foreground tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ml-auto shrink-0">
                           {heroMatch.score ? heroMatch.score.split(' - ')[0] : ''}
                        </span>
                     </div>
                     <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={heroMatch.logo2} alt={heroMatch.team2} className={`w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg shrink-0 ${heroMatch.logo2.includes('black') || heroMatch.team2 === 'Juventus' ? 'invert' : ''}`} />
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-foreground drop-shadow-md truncate hidden md:block">{heroMatch.team2}</h2>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-foreground drop-shadow-md truncate md:hidden">{getShortName(heroMatch.team2)}</h2>
                        <span className="text-5xl md:text-6xl font-mono font-black text-foreground tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ml-auto shrink-0">
                           {heroMatch.score ? heroMatch.score.split(' - ')[1] : ''}
                        </span>
                     </div>
                  </div>

                  {/* Pulse & Time inline */}
                  <div className="flex items-center gap-6 mb-10">
                     <span className="text-lg font-mono text-coral animate-pulse font-bold tabular-nums drop-shadow-[0_0_8px_rgba(255,107,107,0.6)]">{heroMatch.time}</span>
                     <div className="w-px h-6 bg-white/20"></div>
                     <div className={`flex items-center gap-3 text-sm font-mono uppercase tracking-widest ${getVolatilityColor(heroMatch.volatility)} bg-black/5 dark:bg-muted px-4 py-2 rounded-full border border-border`}>
                        <span className="text-xl">{heroMatch.pulseEmoji}</span>
                        <span>{heroMatch.pulseStatus}</span>
                     </div>
                  </div>

                  {/* Action link inline */}
                  <Link href={`/match/${heroMatch.id}`} className="group inline-flex items-center justify-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-black bg-teal px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] w-max">
                     ENTER MATCH CENTRE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>

               <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6 bg-[#000000]/40 p-6 rounded-3xl border border-border backdrop-blur-xl">
                  {/* Narrative (Unboxed, separated by fine lines) */}
                  <div className="pb-5 border-b border-border">
                     <h3 className="text-[9px] font-mono uppercase tracking-widest text-teal mb-3 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Live Context
                     </h3>
                     <p className="text-sm text-gray-200 font-mono leading-relaxed">&quot;{heroMatch.insight}&quot;</p>
                  </div>
                  
                  {/* Key Data */}
                  <div className="flex items-start justify-between">
                     <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Volatility Index</span>
                        <span className={`text-5xl font-mono font-black tabular-nums ${getVolatilityColor(heroMatch.volatility)}`}>{heroMatch.volatility}%</span>
                     </div>
                     <div className="flex flex-col items-end gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Active Triggers</span>
                        <div className="flex flex-col gap-1.5 items-end">
                           {heroMatch.triggers?.map((t, i) => (
                              <span key={i} className="text-[10px] font-mono text-coral bg-coral/10 border border-coral/30 px-2.5 py-1 rounded-md uppercase tracking-widest">{t}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>
        )}

        {/* 2. TERMINAL FEED SORTING CONTROLS */}
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-xl font-black uppercase tracking-widest text-foreground drop-shadow-md hidden md:block">Terminal Feed</h2>
           
           <div className="flex bg-card rounded-full p-1 border border-border w-full md:w-auto">
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

        {/* 3. TERMINAL FEED LIST */}
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
                           />
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
             ))
          ) : (
             watchabilityMatches.map((group) => (
               <div key={group.groupName} className="flex flex-col">
                  {/* Group Header */}
                  <div className="flex items-center gap-4 mb-4 pl-2">
                    <div className={`w-1.5 h-6 rounded-full ${group.groupName === 'Live Matches' ? 'bg-coral shadow-[0_0_8px_rgba(255,107,107,0.6)]' : 'bg-teal shadow-[0_0_8px_rgba(0,229,255,0.6)]'}`}></div>
                    <h2 className="text-lg font-black uppercase tracking-widest text-foreground drop-shadow-md">{group.groupName}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                  </div>

                  {/* Group Container */}
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
                           />
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
             ))
          )}

          {allCurrentMatches.length === 0 && (
            <div className="p-16 text-center bg-card/50 rounded-2xl border border-border backdrop-blur-md">
              <span className="text-muted-foreground text-sm font-mono tracking-widest uppercase">No matches found matching this criteria.</span>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
