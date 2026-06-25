"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Zap, Brain, ArrowRight, Bookmark, Shuffle, Swords, Activity } from 'lucide-react';

// --- MOCK DATA ---

const allLiveMatches = [
  {
    id: 1,
    team1: "Liverpool",
    team2: "Man City",
    score: "1 - 2",
    time: "74'",
    logo1: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    logo2: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    league: "Premier League",
    pulseStatus: "Volatile",
    pulseEmoji: "⚡",
    pulseColor: "text-coral",
    insight: "Liverpool fans have grown frustrated with the midfield after repeated turnovers.",
    emotionalMvp: "De Bruyne",
    polarizingPlayer: "Mac Allister",
    fanMood: "Anxious",
    fanMoodEmoji: "😬",
    metrics: { chaos: 95, tactical: 80, rivalry: 90, surprise: 40 },
    bookmarked: true,
    agenda: "Midfield Capitulation / Tension Spiking",
    volatility: 95,
    triggers: ["[82' RED CARD]", "[VAR DISALLOWED GOAL]"]
  },
  {
    id: 2,
    team1: "Real Madrid",
    team2: "Barcelona",
    score: "2 - 2",
    time: "82'",
    logo1: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    logo2: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    league: "La Liga",
    pulseStatus: "Heating Up",
    pulseEmoji: "🔥",
    pulseColor: "text-coral",
    insight: "Fans are split on Vinicius despite his assist.",
    emotionalMvp: "Bellingham",
    polarizingPlayer: "Vinicius Jr",
    fanMood: "Electric",
    fanMoodEmoji: "🤩",
    metrics: { chaos: 85, tactical: 85, rivalry: 99, surprise: 30 },
    bookmarked: true,
    agenda: "Vinicius Backlash / Boiling Point",
    volatility: 88,
    triggers: ["[CROWD UNREST]"]
  },
  {
    id: 3,
    team1: "Arsenal",
    team2: "Bayern",
    score: "0 - 0",
    time: "45'",
    logo1: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    logo2: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_München_logo_%282017%29.svg",
    league: "Champions League",
    pulseStatus: "Tense",
    pulseEmoji: "😬",
    pulseColor: "text-blue-400",
    insight: "Nervous energy dominates the Emirates.",
    emotionalMvp: "Saliba",
    polarizingPlayer: "Havertz",
    fanMood: "Nervous",
    fanMoodEmoji: "😰",
    metrics: { chaos: 40, tactical: 95, rivalry: 70, surprise: 20 },
    bookmarked: false,
    agenda: "Tactical Stalemate / Nervous Energy",
    volatility: 42,
    triggers: ["[0 SHOTS ON TARGET]"]
  },
  {
    id: 7,
    team1: "Aston Villa",
    team2: "Ajax",
    score: "3 - 0",
    time: "60'",
    logo1: "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
    logo2: "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg",
    league: "Europa Conference League",
    pulseStatus: "Domination",
    pulseEmoji: "🔥",
    pulseColor: "text-green-400",
    insight: "Villa Park is rocking. Complete surprise demolition.",
    emotionalMvp: "Watkins",
    polarizingPlayer: "Henderson",
    fanMood: "Euphoric",
    fanMoodEmoji: "🎉",
    metrics: { chaos: 70, tactical: 60, rivalry: 40, surprise: 98 },
    bookmarked: false,
    agenda: "Total Demolition / Euphoria",
    volatility: 75,
    triggers: ["[HAT-TRICK HERO]"]
  }
];

const upcomingTableData = [
  { id: 4, team1: "Arsenal", team2: "Everton", time: "14:00", logo1: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", logo2: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg", league: "Premier League", mood: "Tactical Battle 🧠", hyped: true, volatility: 82, triggers: ["[MUST WIN]"] },
  { id: 5, team1: "Barcelona", team2: "Atletico", time: "16:30", logo1: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg", logo2: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg", league: "La Liga", mood: "High Tension 😬", hyped: true, volatility: 91, triggers: ["[TITLE DECIDER]"] },
  { id: 6, team1: "Man United", team2: "Liverpool", time: "19:00", logo1: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg", logo2: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg", league: "Premier League", mood: "Chaos ⚡", hyped: true, volatility: 98, triggers: ["[DERBY]"] },
  { id: 8, team1: "Chelsea", team2: "Newcastle", time: "20:00", logo1: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg", logo2: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg", league: "Premier League", mood: "Desperation 😰", hyped: false, volatility: 65, triggers: [] },
  { id: 9, team1: "Juventus", team2: "Milan", time: "21:00", logo1: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg", logo2: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg", league: "Serie A", mood: "Strategic ♟️", hyped: false, volatility: 55, triggers: [] },
];

const finishedTableData = [
  { id: 10, team1: "Dortmund", team2: "PSG", score: "1 - 1", logo1: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg", logo2: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg", league: "Champions League", mood: "Relief 😮‍💨", hyped: true, volatility: 88, triggers: ["[LATE EQUALIZER]"] },
  { id: 11, team1: "Inter", team2: "Roma", score: "2 - 0", logo1: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg", logo2: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg", league: "Serie A", mood: "Clinical 🎯", hyped: false, volatility: 45, triggers: [] },
];

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TerminalRow = ({ match, isExpanded, onToggle, isLive = false, isFinished = false }: { match: any, isExpanded: boolean, onToggle: (id: number) => void, isLive?: boolean, isFinished?: boolean }) => {
  return (
    <div className={`border-b border-white/5 bg-[#0A0A0A]/40 backdrop-blur-sm hover:bg-white/[0.04] transition-colors overflow-hidden ${isExpanded ? 'bg-white/[0.04]' : ''}`}>
      <div 
        className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer gap-4 md:gap-6"
        onClick={() => onToggle(match.id)}
      >
        <div className="flex items-center gap-4 md:gap-6 w-full">
           <div className="w-12 shrink-0 flex flex-col items-center justify-center">
              {isLive ? (
                 <span className="text-[10px] font-mono text-coral animate-pulse font-bold">{match.time}</span>
              ) : isFinished ? (
                 <span className="text-[10px] font-mono text-gray-500 font-bold">FT</span>
              ) : (
                 <span className="text-[10px] font-mono text-gray-400 font-bold">{match.time}</span>
              )}
           </div>

           <div className="flex-1 min-w-0 w-full md:w-auto">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 min-w-0">
                 <div className="flex items-center gap-2 justify-end min-w-0">
                    <span className="text-sm font-bold text-white uppercase tracking-wider text-right truncate">{match.team1}</span>
                    {match.logo1 && (
                       /* eslint-disable-next-line @next/next/no-img-element */
                       <img src={match.logo1} alt={match.team1} className="w-5 h-5 object-contain shrink-0" />
                    )}
                 </div>

                 <div className="flex items-center justify-center min-w-[48px] px-2 shrink-0">
                    {isLive || isFinished ? (
                       <span className="text-lg font-mono font-black text-white tabular-nums whitespace-nowrap">{match.score || "0 - 0"}</span>
                    ) : (
                       <span className="text-sm font-mono text-gray-600 font-bold">VS</span>
                    )}
                 </div>

                 <div className="flex items-center gap-2 justify-start min-w-0">
                    {match.logo2 && (
                       /* eslint-disable-next-line @next/next/no-img-element */
                       <img src={match.logo2} alt={match.team2} className="w-5 h-5 object-contain shrink-0" />
                    )}
                    <span className="text-sm font-bold text-white uppercase tracking-wider text-left truncate">{match.team2}</span>
                 </div>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap mt-2 md:mt-0 md:ml-4">
                 {match.triggers?.map((t: string, i: number) => (
                    <span key={i} className="text-[9px] font-mono uppercase text-coral bg-coral/5 border border-coral/30 px-1.5 py-0.5 rounded tracking-widest">{t}</span>
                 ))}
              </div>
           </div>

           <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <div className="flex items-center gap-2">
                 <span className={`font-mono text-lg font-black tabular-nums ${getVolatilityColor(match.volatility)}`}>
                    {match.volatility}%
                 </span>
                 <span className="text-[9px] uppercase tracking-widest text-gray-500 hidden sm:block">VOL</span>
              </div>
              
              <Link href={`/match/${match.id}`} onClick={(e) => e.stopPropagation()} className="group hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                 <ArrowRight className="w-4 h-4 text-teal group-hover:translate-x-0.5 transition-transform" />
              </Link>
           </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-5 pt-3 border-t border-white/5 bg-black/40 shadow-inner">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                 <h4 className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-2">Live Context</h4>
                 <p className="text-xs text-gray-300 leading-relaxed font-mono">
                    {match.insight || match.mood || "Awaiting significant narrative developments..."}
                 </p>
                 <Link href={`/match/${match.id}`} className="mt-4 md:hidden inline-flex items-center gap-2 text-[10px] font-mono text-teal uppercase tracking-widest">
                    Enter Match Centre <ArrowRight className="w-3 h-3" />
                 </Link>
              </div>

              {(match.emotionalMvp || match.polarizingPlayer) && (
                 <div className="col-span-1">
                    <h4 className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-2">Key Actors</h4>
                    <div className="flex flex-col gap-2">
                       {match.emotionalMvp && (
                          <div className="flex items-center justify-between pb-1 border-b border-white/5">
                             <span className="text-[10px] font-mono uppercase tracking-widest text-teal">Hero</span>
                             <span className="text-xs font-bold text-white uppercase">{match.emotionalMvp}</span>
                          </div>
                       )}
                       {match.polarizingPlayer && (
                          <div className="flex items-center justify-between pb-1 border-b border-white/5">
                             <span className="text-[10px] font-mono uppercase tracking-widest text-coral">Villain</span>
                             <span className="text-xs font-bold text-white uppercase">{match.polarizingPlayer}</span>
                          </div>
                       )}
                    </div>
                 </div>
              )}

              <div className="col-span-1">
                 <h4 className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-2">Audience State</h4>
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between pb-1 border-b border-white/5">
                       <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Dominant Emotion</span>
                       <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase">
                          <span>{match.fanMoodEmoji || "🔥"}</span>
                          <span>{match.fanMood || match.mood || "Electric"}</span>
                       </div>
                    </div>
                    {match.agenda && (
                       <div className="flex items-center justify-between pb-1 border-b border-white/5">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Active Agenda</span>
                          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-white truncate max-w-[120px]">{match.agenda}</span>
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
  const [activeFilter, setActiveFilter] = useState("Chaos"); // Chaos, Tactical, Rivalries, Surprise Me, Bookmarks
  const [expandedMatches, setExpandedMatches] = useState<Set<number>>(new Set());

  const toggleMatch = (id: number) => {
    const next = new Set(expandedMatches);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedMatches(next);
  };

  // Sorting logic for Live Matches based on Active Filter
  const sortedLiveMatches = [...allLiveMatches].sort((a, b) => {
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

  // Group all matches (except hero) by League
  // We'll tag them with their match status so we know how to render the time/score
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupedMatches: Record<string, any[]> = [
    ...remainingLiveMatches.map(m => ({ ...m, status: 'live' })),
    ...upcomingTableData.map(m => ({ ...m, status: 'upcoming' })),
    ...finishedTableData.map(m => ({ ...m, status: 'finished' }))
  ].reduce((acc, match) => {
    const league = match.league || "Other Competitions";
    if (!acc[league]) acc[league] = [];
    acc[league].push(match);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-teal selection:text-black pb-32 overflow-x-hidden relative">
      
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal/20 blur-[120px]"></div>
         <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[100px]"></div>
         <div className="absolute top-[40%] right-[-20%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[150px]"></div>
      </div>

      {/* 0. TERMINAL TICKER TAPE */}
      <div className="sticky top-0 z-50 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 flex items-center overflow-hidden py-1.5 shadow-2xl">
         <div className="flex whitespace-nowrap animate-ticker w-[200%]">
            <div className="flex justify-around min-w-[50%] shrink-0">
               {tickerItems.map((item, idx) => (
                 <button key={`ticker-1-${idx}`} className="text-[10px] font-mono tracking-widest uppercase text-teal px-8 hover:text-white hover:bg-white/5 transition-colors rounded py-0.5 cursor-pointer">
                   {item}
                 </button>
               ))}
            </div>
            <div className="flex justify-around min-w-[50%] shrink-0">
               {tickerItems.map((item, idx) => (
                 <button key={`ticker-2-${idx}`} className="text-[10px] font-mono tracking-widest uppercase text-teal px-8 hover:text-white hover:bg-white/5 transition-colors rounded py-0.5 cursor-pointer">
                   {item}
                 </button>
               ))}
            </div>
         </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 pt-8">
        
        {/* CALENDAR HEADER */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
              {days.map(day => {
                const isActive = day.date === activeDate;
                return (
                  <div key={day.date} onClick={() => setActiveDate(day.date)} className={`flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-xl border ${isActive ? 'bg-white/5 border-teal text-teal shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-transparent border-white/5 text-gray-400 hover:border-white/20'} cursor-pointer transition-all`}>
                    <span className="text-[10px] font-mono uppercase tracking-widest">{day.label}</span>
                    <span className={`text-lg font-mono font-black tabular-nums ${isActive ? 'text-white drop-shadow-md' : ''}`}>{day.date}</span>
                  </div>
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
                 className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-all ${isActive ? 'bg-teal/10 text-teal border-teal/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-[#0A0A0A] border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'}`}
               >
                 <Icon className="w-3.5 h-3.5" /> {f.name}
               </button>
             )
           })}
        </div>

        {/* 1. HERO SECTION (Ranked #1 by Filter) */}
        {heroMatch && (
        <section className="mb-16">
          <div className="relative rounded-[40px] border border-white/5 bg-[#0A0A0A]/60 backdrop-blur-md overflow-hidden group shadow-2xl">
            {/* Subtle Image background for Hero */}
            <div 
               className="absolute inset-0 bg-cover bg-center opacity-[0.03] mix-blend-screen group-hover:opacity-[0.06] transition-opacity duration-1000" 
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen group-hover:bg-teal/20 transition-colors duration-1000"></div>
            
            <div className="relative z-10 p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
               <div className="flex-1 flex flex-col justify-center w-full">
                  {/* Match of the Day indicator */}
                  <div className="text-[10px] font-mono uppercase tracking-widest text-teal mb-6 flex items-center gap-2 bg-teal/10 w-max px-3 py-1.5 rounded-full border border-teal/20">
                     <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]"></span>
                     HERO SPOTLIGHT // {heroMatch.league}
                  </div>

                  {/* Scoreline */}
                  <div className="flex flex-col gap-4 mb-8">
                     <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={heroMatch.logo1} alt={heroMatch.team1} className="w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg shrink-0" />
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white drop-shadow-md truncate">{heroMatch.team1}</h2>
                        <span className="text-5xl md:text-6xl font-mono font-black text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ml-auto shrink-0">
                           {heroMatch.score ? heroMatch.score.split(' - ')[0] : ''}
                        </span>
                     </div>
                     <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={heroMatch.logo2} alt={heroMatch.team2} className="w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-lg shrink-0" />
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white drop-shadow-md truncate">{heroMatch.team2}</h2>
                        <span className="text-5xl md:text-6xl font-mono font-black text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ml-auto shrink-0">
                           {heroMatch.score ? heroMatch.score.split(' - ')[1] : ''}
                        </span>
                     </div>
                  </div>

                  {/* Pulse & Time inline */}
                  <div className="flex items-center gap-6 mb-10">
                     <span className="text-lg font-mono text-coral animate-pulse font-bold tabular-nums drop-shadow-[0_0_8px_rgba(255,107,107,0.6)]">{heroMatch.time}</span>
                     <div className="w-px h-6 bg-white/20"></div>
                     <div className={`flex items-center gap-3 text-sm font-mono uppercase tracking-widest ${getVolatilityColor(heroMatch.volatility)} bg-white/5 px-4 py-2 rounded-full border border-white/5`}>
                        <span className="text-xl">{heroMatch.pulseEmoji}</span>
                        <span>{heroMatch.pulseStatus}</span>
                     </div>
                  </div>

                  {/* Action link inline */}
                  <Link href={`/match/${heroMatch.id}`} className="group inline-flex items-center justify-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-black bg-teal px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] w-max">
                     ENTER MATCH CENTRE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>

               <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6 bg-[#000000]/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
                  {/* Narrative (Unboxed, separated by fine lines) */}
                  <div className="pb-5 border-b border-white/10">
                     <h3 className="text-[9px] font-mono uppercase tracking-widest text-teal mb-3 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Live Context
                     </h3>
                     <p className="text-sm text-gray-200 font-mono leading-relaxed">&quot;{heroMatch.insight}&quot;</p>
                  </div>
                  
                  {/* Key Data */}
                  <div className="flex items-start justify-between">
                     <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">Volatility Index</span>
                        <span className={`text-5xl font-mono font-black tabular-nums ${getVolatilityColor(heroMatch.volatility)}`}>{heroMatch.volatility}%</span>
                     </div>
                     <div className="flex flex-col items-end gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">Active Triggers</span>
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

        {/* 2. TERMINAL FEED GROUPED BY LEAGUE */}
        <section className="space-y-12">
          {Object.entries(groupedMatches).map(([league, matches]) => (
            <div key={league} className="flex flex-col">
               {/* League Header */}
               <div className="flex items-center gap-4 mb-4 pl-2">
                 <div className="w-1.5 h-6 bg-teal rounded-full shadow-[0_0_8px_rgba(0,229,255,0.6)]"></div>
                 <h2 className="text-lg font-black uppercase tracking-widest text-white drop-shadow-md">{league}</h2>
                 <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
               </div>

               {/* League Container */}
               <div className="bg-[#0A0A0A]/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
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
                        />
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          ))}

          {Object.keys(groupedMatches).length === 0 && (
            <div className="p-16 text-center bg-[#0A0A0A]/50 rounded-2xl border border-white/5 backdrop-blur-md">
              <span className="text-gray-500 text-sm font-mono tracking-widest uppercase">No matches found matching this criteria.</span>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
