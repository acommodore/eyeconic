"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Flame, Zap, Brain, Crosshair, ArrowRight, Star, ChevronRight, Activity, Clock, Calendar as CalendarIcon, Bookmark, Shuffle, ShieldAlert, Swords } from 'lucide-react';

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
  { id: 4, team1: "Arsenal", team2: "Everton", time: "14:00", mood: "Tactical Battle 🧠", hyped: true, volatility: 82, triggers: ["[MUST WIN]"] },
  { id: 5, team1: "Barcelona", team2: "Atletico", time: "16:30", mood: "High Tension 😬", hyped: true, volatility: 91, triggers: ["[TITLE DECIDER]"] },
  { id: 6, team1: "Man United", team2: "Liverpool", time: "19:00", mood: "Chaos ⚡", hyped: true, volatility: 98, triggers: ["[DERBY]"] },
  { id: 8, team1: "Chelsea", team2: "Newcastle", time: "20:00", mood: "Desperation 😰", hyped: false, volatility: 65, triggers: [] },
  { id: 9, team1: "Juventus", team2: "Milan", time: "21:00", mood: "Strategic ♟️", hyped: false, volatility: 55, triggers: [] },
];

const finishedTableData = [
  { id: 10, team1: "Dortmund", team2: "PSG", score: "1 - 1", mood: "Relief 😮‍💨", hyped: true, volatility: 88, triggers: ["[LATE EQUALIZER]"] },
  { id: 11, team1: "Inter", team2: "Roma", score: "2 - 0", mood: "Clinical 🎯", hyped: false, volatility: 45, triggers: [] },
];

const upcomingPulses = [
  { id: 4, match: "Arsenal vs Everton", mood: "Tactical Battle", emoji: "🧠" },
  { id: 5, match: "Barcelona vs Atletico Madrid", mood: "High Tension", emoji: "😬" },
  { id: 6, match: "Man United vs Liverpool", mood: "Chaos", emoji: "⚡" },
];

const tickerItems = [
  "📈 ARS Fans: +15% Optimism (Saka sub)",
  "📉 MUN Fans: -30% Patience (Ten Hag)",
  "⚠️ RMA Fans: Tension Spiking (0-0 80')",
  "🔥 LIV Fans: Roaring (+45% Momentum)",
  "🧊 CHE Fans: Complete silence at Stamford Bridge",
  "📈 JUV Fans: Tactical approval rising (+12%)",
];

const marketMovers = {
  surging: [
    { team: "Aston Villa", change: "+45%", reason: "Total Domination" },
    { team: "Arsenal", change: "+15%", reason: "Attacking Sustained" },
  ],
  crashing: [
    { team: "Man United", change: "-30%", reason: "Defensive Chaos" },
    { team: "Chelsea", change: "-18%", reason: "Frustration Spiking" },
  ]
};

export default function DiscoverPage() {
  const [activeFilter, setActiveFilter] = useState("Chaos"); // Chaos, Tactical, Rivalries, Surprise Me, Bookmarks
  const [activeTab, setActiveTab] = useState("Hyped"); // Hyped, All Matches
  const [isMoodIndexOpen, setIsMoodIndexOpen] = useState(false);

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

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-teal selection:text-black pb-32 overflow-x-hidden">
      
      {/* 0. TERMINAL TICKER TAPE */}
      <div className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-teal/30 flex items-center overflow-hidden py-1.5 shadow-[0_4px_20px_rgba(0,229,255,0.1)]">
         <div className="flex whitespace-nowrap animate-ticker w-[200%]">
            {/* First sequence */}
             <div className="flex justify-around min-w-[50%] shrink-0">
               {tickerItems.map((item, idx) => (
                 <button key={`ticker-1-${idx}`} className="text-[10px] font-bold tracking-widest uppercase text-teal px-8 hover:text-white hover:bg-white/5 transition-colors rounded py-0.5 cursor-pointer">
                   {item}
                 </button>
               ))}
            </div>
            {/* Duplicated sequence for infinite scroll */}
            <div className="flex justify-around min-w-[50%] shrink-0">
               {tickerItems.map((item, idx) => (
                 <button key={`ticker-2-${idx}`} className="text-[10px] font-bold tracking-widest uppercase text-teal px-8 hover:text-white hover:bg-white/5 transition-colors rounded py-0.5 cursor-pointer">
                   {item}
                 </button>
               ))}
            </div>
         </div>
      </div>

      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
         <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-teal/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-[#14B8A6]/5 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-20" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 pt-8">
        
        {/* CALENDAR HEADER */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">


           <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
              {days.map(day => {
                const isActive = day.date === activeDate;
                return (
                  <div key={day.date} onClick={() => setActiveDate(day.date)} className={`flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-xl border ${isActive ? 'bg-teal/10 border-teal/50 text-teal' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'} cursor-pointer transition-colors`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{day.label}</span>
                    <span className={`text-lg font-black ${isActive ? 'text-white' : ''}`}>{day.date}</span>
                  </div>
                );
              })}
           </div>
        </header>

        {/* EMOTIONAL FILTERS */}
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar mb-10 border-b border-white/5 pb-6">
           {filters.map(f => {
             const Icon = f.icon;
             const isActive = activeFilter === f.name;
             return (
               <button 
                 key={f.name}
                 onClick={() => setActiveFilter(f.name)}
                 className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? 'bg-teal text-black border-teal shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'}`}
               >
                 <Icon className="w-3.5 h-3.5" /> {f.name}
               </button>
             )
           })}
        </div>

        {/* 1. HERO SECTION (Ranked #1 by Filter) */}
        {heroMatch && (
        <section className="mb-12">
          <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl group">
             {/* Deep glow background */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-50 pointer-events-none" />
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay transition-transform duration-[2s] group-hover:scale-105" />
             
             <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-teal">Match of the Day</span>
             </div>

             <div className="relative z-10 p-6 md:p-12 pt-20 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-stretch">
                
                {/* Scoreboard Column */}
                <div className="flex-1 flex flex-col justify-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 w-full max-w-lg shadow-xl relative">
                   {heroMatch.bookmarked && <Bookmark className="absolute top-4 right-4 w-5 h-5 text-teal" fill="currentColor" />}
                   
                   {/* Live Match Pulse / Volatility (Dominant) */}
                   <div className="flex flex-col items-center mb-6 w-full">
                      <span className="text-5xl mb-2">{heroMatch.pulseEmoji}</span>
                      <h2 className={`text-3xl md:text-4xl font-black tracking-widest uppercase text-center ${heroMatch.pulseColor}`}>
                         {heroMatch.pulseStatus}
                      </h2>
                      <div className="bg-teal/10 text-teal text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded mt-3">
                         {heroMatch.volatility}% Volatility Index
                      </div>
                   </div>

                   {/* Scoreboard (Secondary) */}
                   <div className="flex items-center justify-between w-full mb-4">
                      <div className="flex flex-col items-center gap-2 w-1/3">
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{heroMatch.team1}</span>
                      </div>
                      <div className="flex flex-col items-center w-1/3">
                         <span className="text-3xl font-black text-white font-mono tracking-tighter text-center">{heroMatch.score}</span>
                         <span className="text-[10px] font-bold text-coral animate-pulse uppercase mt-1">{heroMatch.time}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 w-1/3">
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{heroMatch.team2}</span>
                      </div>
                   </div>

                   {/* Active Agenda */}
                   <div className="bg-white/5 border border-white/10 rounded p-2 text-center mb-6 w-full">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Active Agenda</span>
                      <span className="text-xs text-white font-bold">{heroMatch.agenda}</span>
                   </div>

                   <Link href={`/match/${heroMatch.id}`} className="w-full mt-auto">
                      <button className="w-full bg-teal text-black hover:bg-white transition-colors py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2">
                        MATCH CENTRE <ArrowRight className="w-4 h-4" />
                      </button>
                   </Link>
                </div>

                {/* Emotional Insight & Dense Sub-Cards */}
                <div className="flex-1 flex flex-col justify-center w-full gap-6">
                   
                   {/* Narrative Quote */}
                   <div className="flex-1">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Live Narrative</h3>
                      <div className="bg-[#121212]/80 backdrop-blur-md border border-teal/20 border-l-4 border-l-[#00E5FF] rounded-xl p-6 shadow-lg h-full flex items-center">
                         <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium">&quot;{heroMatch.insight}&quot;</p>
                      </div>
                   </div>

                   {/* High Density Column Primitives */}
                   <div className="grid grid-cols-2 gap-4">
                      {/* Fan Mood & Triggers */}
                      <div className="bg-[#121212]/80 border border-white/5 rounded-xl p-4">
                         <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Audience State</h4>
                         <div className="flex items-center gap-3 mb-4">
                            <span className="text-xl">{heroMatch.fanMoodEmoji}</span>
                            <span className="text-sm font-black text-white">{heroMatch.fanMood}</span>
                         </div>
                         <div className="flex flex-col gap-1">
                            {heroMatch.triggers?.map((t, i) => (
                               <span key={i} className="text-[10px] font-black text-coral bg-coral/10 px-2 py-1 rounded w-max tracking-widest">{t}</span>
                            ))}
                         </div>
                      </div>

                      {/* MVP & Polarizing */}
                      <div className="bg-[#121212]/80 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                         <div>
                            <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Star className="w-3 h-3 text-teal" /> Hero</h4>
                            <span className="text-sm font-black text-white">{heroMatch.emotionalMvp}</span>
                         </div>
                         <div className="mt-4 pt-4 border-t border-white/5">
                            <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Zap className="w-3 h-3 text-coral" /> Villain</h4>
                            <span className="text-sm font-black text-white">{heroMatch.polarizingPlayer}</span>
                         </div>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </section>
        )}

        {/* 2. REMAINING LIVE MATCHES */}
        {remainingLiveMatches.length > 0 && (
        <section className="mb-16">
           <div className="flex items-center gap-2 mb-6 px-2">
              <Activity className="w-5 h-5 text-[#14B8A6]" />
              <h3 className="text-sm font-black tracking-widest uppercase text-gray-400">More Live Pulses</h3>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {remainingLiveMatches.map((match, idx) => (
                 <div key={match.id} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-5 shadow-xl hover:border-white/10 transition-colors flex flex-col group relative">
                    {match.bookmarked && <Bookmark className="absolute top-4 right-4 w-4 h-4 text-teal" fill="currentColor" />}
                    
                    {/* Header Row: Pulse & Mood */}
                    <div className="flex justify-between items-start mb-4 pr-6">
                       <div className="flex flex-col gap-1">
                          <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${match.pulseColor}`}>
                             {match.pulseEmoji} {match.pulseStatus} <span className="bg-white/10 text-white px-1.5 py-0.5 rounded ml-1">{match.volatility}%</span>
                          </div>
                          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest line-clamp-1">{match.agenda}</span>
                       </div>
                       <div className="flex flex-col items-end gap-1">
                          <div className="text-[10px] font-black text-coral bg-coral/10 px-2 py-0.5 rounded animate-pulse">{match.time}</div>
                          <div className="flex items-center gap-1 text-[9px] font-bold uppercase text-gray-400">
                             {match.fanMoodEmoji} {match.fanMood}
                          </div>
                       </div>
                    </div>

                    {/* Score Row */}
                    <div className="flex items-center justify-between mb-4 bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="flex flex-col items-center gap-1 w-1/3">
                        <img src={match.logo1} className="w-8 h-8 object-contain" />
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">{match.team1}</span>
                      </div>
                      <span className="text-xl font-black text-white font-mono w-1/3 text-center">{match.score}</span>
                      <div className="flex flex-col items-center gap-1 w-1/3">
                        <img src={match.logo2} className="w-8 h-8 object-contain" />
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">{match.team2}</span>
                      </div>
                    </div>

                    {/* Dense Data Columns */}
                    <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                       <div className="bg-[#121212] rounded-lg p-2.5 border border-white/5">
                          <h4 className="text-[8px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Key Actors</h4>
                          <div className="flex flex-col gap-1 text-[9px] font-bold text-white">
                             <div className="flex justify-between">
                                <span className="text-teal">Hero:</span> {match.emotionalMvp}
                             </div>
                             <div className="flex justify-between">
                                <span className="text-coral">Villain:</span> {match.polarizingPlayer}
                             </div>
                          </div>
                       </div>
                       <div className="bg-[#121212] rounded-lg p-2.5 border border-white/5 flex flex-col justify-center">
                          <h4 className="text-[8px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Live Context</h4>
                          <div className="flex flex-wrap gap-1">
                             {match.triggers?.slice(0, 2).map((t, i) => (
                               <span key={i} className="text-[8px] font-black text-coral bg-coral/10 px-1 py-0.5 rounded tracking-widest">{t}</span>
                             ))}
                             {(!match.triggers || match.triggers.length === 0) && (
                               <span className="text-[8px] font-black text-gray-500 tracking-widest">[NO ALERTS]</span>
                             )}
                          </div>
                       </div>
                    </div>

                    <Link href={`/match/${match.id}`} className="mt-auto">
                      <button className="w-full bg-white/5 hover:bg-white/10 text-white transition-colors py-2.5 rounded-lg font-black uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 border border-white/5">
                        MATCH CENTRE →
                      </button>
                    </Link>
                 </div>
              ))}
           </div>
        </section>
        )}

        {/* BOTTOM SECTION: MATCH DIRECTORY */}
        <div className="grid grid-cols-1 gap-8 relative">
           
           {/* LEFT: MATCH DIRECTORY (Takes full width now) */}
           <section className="col-span-1">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                 <div className="flex items-center gap-6">
                    {['Hyped', 'All Matches'].map(tab => (
                       <button 
                         key={tab} 
                         onClick={() => setActiveTab(tab)}
                         className={`text-sm font-black uppercase tracking-widest transition-colors relative ${activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-gray-300'}`}
                       >
                         {tab}
                         {activeTab === tab && (
                           <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-teal shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                         )}
                       </button>
                    ))}
                 </div>
                 
                 <button 
                    onClick={() => setIsMoodIndexOpen(!isMoodIndexOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
                 >
                    <Activity className="w-3.5 h-3.5 text-teal" />
                    {isMoodIndexOpen ? 'Hide Mood Index' : 'View Mood Index'}
                 </button>
              </div>

              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden relative">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-white/5 bg-white/5">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Match</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Volatility Index</th>
                          <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-gray-500">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm font-medium">
                       {/* UPCOMING MATCHES */}
                       {upcomingTableData.filter(m => activeTab === 'All Matches' || m.hyped).map(m => (
                          <tr key={m.id} className="hover:bg-white/5 transition-colors group h-20">
                             <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400">{m.time}</span>
                             </td>
                             <td className="px-6 py-4">
                                <div className="text-white font-bold mb-1">{m.team1} vs {m.team2}</div>
                                {m.triggers?.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    {m.triggers.map((t, i) => (
                                       <span key={i} className="text-[9px] font-black uppercase text-coral bg-coral/10 px-1.5 py-0.5 rounded tracking-widest">{t}</span>
                                    ))}
                                  </div>
                                )}
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                   <span className="text-teal font-black text-xs">{m.volatility}%</span>
                                   <span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">{m.mood}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <Link href={`/match/${m.id}`}>
                                   <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white/10 text-white rounded text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/20">ENTER PRE-MATCH</button>
                                </Link>
                             </td>
                          </tr>
                       ))}
                       
                       {/* FINISHED MATCHES */}
                       {finishedTableData.filter(m => activeTab === 'All Matches' || m.hyped).map(m => (
                          <tr key={m.id} className="hover:bg-white/5 transition-colors group opacity-60 hover:opacity-100 h-20">
                             <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-black uppercase tracking-widest text-gray-500">FT</span>
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-3 text-white font-bold mb-1">
                                   <span>{m.team1}</span>
                                   <span className="font-mono text-gray-500">{m.score}</span>
                                   <span>{m.team2}</span>
                                </div>
                                {m.triggers?.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    {m.triggers.map((t, i) => (
                                       <span key={i} className="text-[9px] font-black uppercase text-coral bg-coral/10 px-1.5 py-0.5 rounded tracking-widest">{t}</span>
                                    ))}
                                  </div>
                                )}
                             </td>
                             <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                   <span className="text-[#FF3B00] font-black text-xs">{m.volatility}%</span>
                                   <span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">{m.mood}</span>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <Link href={`/match/${m.id}`}>
                                   <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white/10 border border-[#D32F2F]/30 text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white rounded text-[10px] font-black uppercase tracking-widest transition-all">VIEW AUTOPSY →</button>
                                </Link>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
                 {upcomingTableData.filter(m => activeTab === 'All Matches' || m.hyped).length === 0 && finishedTableData.filter(m => activeTab === 'All Matches' || m.hyped).length === 0 && (
                   <div className="p-12 text-center text-gray-500 text-sm font-bold tracking-widest uppercase">
                     No matches found for this filter.
                   </div>
                 )}

                 {/* SLIDE OUT MOOD INDEX */}
                 <div className={`absolute top-0 right-0 bottom-0 w-80 bg-[#0A0A0A] border-l border-white/10 p-6 shadow-2xl transition-transform duration-500 z-30 ${isMoodIndexOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-sm font-black tracking-widest uppercase text-white flex items-center gap-2">
                          <Activity className="w-4 h-4 text-teal" /> Mood Index
                       </h3>
                       <button onClick={() => setIsMoodIndexOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                          &times;
                       </button>
                    </div>

                    <div className="flex flex-col gap-8">
                       {/* Top Gainers */}
                       <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-4 flex items-center gap-2">
                             <Zap className="w-3 h-3" /> Surging Momentum
                          </h4>
                          <div className="flex flex-col gap-4">
                             {marketMovers.surging.map((item, idx) => (
                               <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                  <div>
                                     <div className="text-sm font-bold text-white mb-1">{item.team}</div>
                                     <div className="text-[10px] text-gray-500 uppercase tracking-widest">{item.reason}</div>
                                  </div>
                                  <div className="text-sm font-black text-green-400 bg-green-400/10 px-2 py-1 rounded">
                                     {item.change}
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>

                       {/* Top Losers */}
                       <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-coral mb-4 flex items-center gap-2">
                             <Flame className="w-3 h-3" /> Crashing Sentiment
                          </h4>
                          <div className="flex flex-col gap-4">
                             {marketMovers.crashing.map((item, idx) => (
                               <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                  <div>
                                     <div className="text-sm font-bold text-white mb-1">{item.team}</div>
                                     <div className="text-[10px] text-gray-500 uppercase tracking-widest">{item.reason}</div>
                                  </div>
                                  <div className="text-sm font-black text-coral bg-coral/10 px-2 py-1 rounded">
                                     {item.change}
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>

              </div>
           </section>

        </div>
      </div>
    </main>
  );
}
