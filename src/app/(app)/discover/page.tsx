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
    bookmarked: true
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
    bookmarked: true
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
    bookmarked: false
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
    bookmarked: false
  }
];

const upcomingTableData = [
  { id: 4, team1: "Arsenal", team2: "Everton", time: "14:00", mood: "Tactical Battle 🧠", hyped: true },
  { id: 5, team1: "Barcelona", team2: "Atletico", time: "16:30", mood: "High Tension 😬", hyped: true },
  { id: 6, team1: "Man United", team2: "Liverpool", time: "19:00", mood: "Chaos ⚡", hyped: true },
  { id: 8, team1: "Chelsea", team2: "Newcastle", time: "20:00", mood: "Desperation 😰", hyped: false },
  { id: 9, team1: "Juventus", team2: "Milan", time: "21:00", mood: "Strategic ♟️", hyped: false },
];

const finishedTableData = [
  { id: 10, team1: "Dortmund", team2: "PSG", score: "1 - 1", mood: "Relief 😮‍💨", hyped: true },
  { id: 11, team1: "Inter", team2: "Roma", score: "2 - 0", mood: "Clinical 🎯", hyped: false },
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

  // Calendar Days
  const days = [
    { label: "Mon", date: "12" },
    { label: "Tue", date: "13" },
    { label: "Wed", date: "14", active: true },
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
      <div className="sticky top-0 z-50 w-full h-8 bg-black/80 backdrop-blur-md border-b border-teal/30 flex items-center overflow-hidden">
         <div className="flex whitespace-nowrap animate-ticker w-[200%]">
            {/* First sequence */}
            <div className="flex justify-around min-w-[50%] shrink-0">
               {tickerItems.map((item, idx) => (
                 <span key={`ticker-1-${idx}`} className="text-[10px] font-bold tracking-widest uppercase text-teal px-8">
                   {item}
                 </span>
               ))}
            </div>
            {/* Duplicated sequence for infinite scroll */}
            <div className="flex justify-around min-w-[50%] shrink-0">
               {tickerItems.map((item, idx) => (
                 <span key={`ticker-2-${idx}`} className="text-[10px] font-bold tracking-widest uppercase text-teal px-8">
                   {item}
                 </span>
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
              {days.map(day => (
                <div key={day.date} className={`flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-xl border ${day.active ? 'bg-teal/10 border-teal/50 text-teal' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'} cursor-pointer transition-colors`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{day.label}</span>
                  <span className={`text-lg font-black ${day.active ? 'text-white' : ''}`}>{day.date}</span>
                </div>
              ))}
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
                <div className="flex-1 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 w-full max-w-lg shadow-xl relative">
                   {heroMatch.bookmarked && <Bookmark className="absolute top-4 right-4 w-5 h-5 text-teal" fill="currentColor" />}
                   
                   <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-8">
                      <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                      <span className="text-xs font-black tracking-widest uppercase text-white">{heroMatch.time}</span>
                   </div>

                   <div className="flex items-center justify-between w-full mb-8">
                      <div className="flex flex-col items-center gap-3 w-1/3">
                         <img src={heroMatch.logo1} className="w-16 h-16 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                         <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{heroMatch.team1}</span>
                      </div>
                      <span className="text-4xl md:text-6xl font-black text-white font-mono tracking-tighter w-1/3 text-center whitespace-nowrap">{heroMatch.score}</span>
                      <div className="flex flex-col items-center gap-3 w-1/3">
                         <img src={heroMatch.logo2} className="w-16 h-16 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                         <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{heroMatch.team2}</span>
                      </div>
                   </div>

                   <Link href={`/match/${heroMatch.id}`} className="w-full mt-4">
                      <button className="w-full bg-teal text-black hover:bg-white transition-colors py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2">
                        Match Centre <ArrowRight className="w-4 h-4" />
                      </button>
                   </Link>
                </div>

                {/* Emotional Insight Column */}
                <div className="flex-1 flex flex-col justify-center w-full">
                   <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{heroMatch.pulseEmoji}</span>
                      <h2 className="text-lg md:text-xl font-black tracking-widest uppercase text-white">Live Match Pulse: <span className={heroMatch.pulseColor}>{heroMatch.pulseStatus}</span></h2>
                   </div>
                   
                   <div className="bg-[#121212]/80 backdrop-blur-md border border-teal/20 border-l-4 border-l-[#00E5FF] rounded-2xl p-6 mb-8 shadow-lg">
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium">"{heroMatch.insight}"</p>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-black/50 border border-white/5 rounded-2xl p-4 flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"><Star className="w-3 h-3 text-coral" /> MVP</span>
                        <span className="text-sm font-black text-white">{heroMatch.emotionalMvp}</span>
                      </div>
                      <div className="bg-black/50 border border-white/5 rounded-2xl p-4 flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"><Zap className="w-3 h-3 text-coral" /> Most Polarizing</span>
                        <span className="text-sm font-black text-white">{heroMatch.polarizingPlayer}</span>
                      </div>
                      <div className="bg-black/50 border border-white/5 rounded-2xl p-4 flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"><Activity className="w-3 h-3 text-purple-400" /> Fan Mood</span>
                        <span className="text-sm font-black text-white flex items-center gap-2">{heroMatch.fanMoodEmoji} {heroMatch.fanMood}</span>
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
                <div key={match.id} className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-6 shadow-xl hover:border-white/10 transition-colors flex flex-col group relative">
                   {match.bookmarked && <Bookmark className="absolute top-6 right-6 w-4 h-4 text-teal" fill="currentColor" />}
                   <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-[10px] font-black text-gray-500">#{idx + 2}</div>
                   
                   <div className="flex justify-between items-center mb-6 pl-4">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest ${match.pulseColor}`}>
                         {match.pulseEmoji} {match.pulseStatus}
                      </div>
                      <div className="text-[10px] font-black text-coral bg-coral/10 px-2 py-1 rounded animate-pulse mr-8">{match.time}</div>
                   </div>

                   <div className="flex items-center justify-between mb-8 px-4">
                     <div className="flex flex-col items-center gap-2">
                       <img src={match.logo1} className="w-10 h-10 object-contain" />
                     </div>
                     <span className="text-xl font-black text-white font-mono">{match.score}</span>
                     <div className="flex flex-col items-center gap-2">
                       <img src={match.logo2} className="w-10 h-10 object-contain" />
                     </div>
                   </div>

                   <div className="bg-[#121212] rounded-2xl p-4 border border-white/5 mb-6 flex-1">
                     <p className="text-xs text-gray-400 italic mb-3 line-clamp-2">"{match.insight}"</p>
                     <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                       <Star className="w-3 h-3 text-coral" /> MVP: <span className="text-gray-300">{match.emotionalMvp}</span>
                     </div>
                   </div>

                   <Link href={`/match/${match.id}`} className="mt-auto">
                     <button className="w-full bg-white/5 hover:bg-white/10 text-white transition-colors py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-between px-6 border border-white/5">
                       Match Centre <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </button>
                   </Link>
                </div>
              ))}
           </div>
        </section>
        )}

        {/* BOTTOM SECTION: MATCH DIRECTORY & MARKET MOVERS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* LEFT: MATCH DIRECTORY (Takes up 2 columns) */}
           <section className="lg:col-span-2">
              <div className="flex items-center gap-6 mb-6 border-b border-white/10">
              {['Hyped', 'All Matches'].map(tab => (
                 <button 
                   key={tab} 
                   onClick={() => setActiveTab(tab)}
                   className={`pb-4 text-sm font-black uppercase tracking-widest transition-colors relative ${activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-gray-300'}`}
                 >
                   {tab}
                   {activeTab === tab && (
                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                   )}
                 </button>
              ))}
           </div>

           <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/5 bg-white/5">
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Match</th>
                       <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Expected Mood / Pulse</th>
                       <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-gray-500">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5 text-sm font-medium">
                    {/* UPCOMING MATCHES */}
                    {upcomingTableData.filter(m => activeTab === 'All Matches' || m.hyped).map(m => (
                       <tr key={m.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                             <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400">{m.time}</span>
                          </td>
                          <td className="px-6 py-4 text-white font-bold">{m.team1} vs {m.team2}</td>
                          <td className="px-6 py-4 text-gray-400 text-xs">{m.mood}</td>
                          <td className="px-6 py-4 text-right">
                             <Link href={`/match/${m.id}`}>
                                <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white/10 text-white rounded text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/20">Preview</button>
                             </Link>
                          </td>
                       </tr>
                    ))}
                    
                    {/* FINISHED MATCHES */}
                    {finishedTableData.filter(m => activeTab === 'All Matches' || m.hyped).map(m => (
                       <tr key={m.id} className="hover:bg-white/5 transition-colors group opacity-60 hover:opacity-100">
                          <td className="px-6 py-4">
                             <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-black uppercase tracking-widest text-gray-500">FT</span>
                          </td>
                          <td className="px-6 py-4 text-white font-bold flex items-center gap-3">
                             <span>{m.team1}</span>
                             <span className="font-mono text-gray-500">{m.score}</span>
                             <span>{m.team2}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-xs">{m.mood}</td>
                          <td className="px-6 py-4 text-right">
                             <Link href={`/match/${m.id}`}>
                                <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-teal/20 text-teal rounded text-[10px] font-black uppercase tracking-widest transition-all hover:bg-teal/40">Recap</button>
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
           </div>
        </section>

        {/* RIGHT: MOOD INDEX WIDGET (Takes up 1 column) */}
        <section className="lg:col-span-1">
           <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <Activity className="w-5 h-5 text-teal" />
              <h3 className="text-sm font-black tracking-widest uppercase text-white">Mood Index</h3>
           </div>

           <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col gap-8">
              
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
        </section>

        </div>
      </div>
    </main>
  );
}
