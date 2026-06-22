"use client";

import { ChevronRight, Play, Mic, Activity, Globe, Shield } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const dates = [
  { label: 'THU', date: '08', active: false, dotColor: 'bg-gray-600' },
  { label: 'FRI', date: '09', active: false, dotColor: 'bg-[#FF4F00]' },
  { label: 'SAT', date: '10', active: false, dotColor: 'bg-[#00E5FF]' },
  { label: 'SUN', date: '11', active: false, dotColor: 'bg-purple-500' },
  { label: 'MON', date: '12', active: false, dotColor: 'bg-gray-600' },
  { label: 'TUE', date: '13', active: false, dotColor: 'bg-[#FF4F00]' },
  { label: 'TODAY MAY', date: '14', active: true, dotColor: 'bg-[#00E5FF]' },
];

const liveStands = [
  {
    id: 1,
    listeners: '8.4K',
    title: "Arsenal fans debating Saka's 9.2 rating",
    subtitle: "Was he really MVP?\nTitle race implications & more",
    image: "https://images.unsplash.com/photo-1518605368461-1e1e38cd1562?q=80&w=600&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50&h=50&fit=crop"
    ],
    accent: "from-purple-900/80 to-purple-500/20",
    iconBg: "bg-purple-500"
  },
  {
    id: 2,
    listeners: '5.2K',
    title: "Liverpool post-match: Salah MVP debate",
    subtitle: "Brilliance, stats &\nwhat it means for the title",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop"
    ],
    accent: "from-green-900/80 to-green-500/20",
    iconBg: "bg-emerald-500"
  },
  {
    id: 3,
    listeners: '3.6K',
    title: "VAR controversy: Every big call discussed",
    subtitle: "All matches,\nall big decisions",
    image: "https://images.unsplash.com/photo-1614632537197-38a470592751?q=80&w=600&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop",
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=50&h=50&fit=crop"
    ],
    accent: "from-orange-900/80 to-orange-500/20",
    iconBg: "bg-orange-500"
  }
];

const missedHighlights = [
  {
    id: 1,
    tag: "LATEST DRAMA",
    tagColor: "bg-[#00E5FF]/20 text-[#00E5FF]",
    title: "Late drama in Madrid",
    subtitle: "RMD 1 - 1 MC | MVP: BENZEMA 9.0",
    desc: "Benzema's ghost haunts the box in the 94th minute.",
    image: "https://images.unsplash.com/photo-1508344928928-7137b29de216?q=80&w=800&auto=format&fit=crop",
    stats: [
      { label: "AVG RATING", value: "8.4", color: "text-[#00E5FF]" },
      { label: "CHAOS PEAK", value: "94%", color: "text-[#00E5FF]" },
      { label: "SENTIMENT SHIFT", value: "+14%", color: "text-[#00E5FF]" }
    ]
  },
  {
    id: 2,
    tag: "WILD FINISH",
    tagColor: "bg-[#FF4F00]/20 text-[#FF4F00]",
    title: "Spurs steal it at the death",
    subtitle: "TOT 2 - 1 CHE | KULUSEVSKI 91'",
    desc: "",
    image: "https://images.unsplash.com/photo-1518605368461-1e1e38cd1562?q=80&w=800&auto=format&fit=crop",
    stats: [
      { label: "Chaos peak", value: "92%", color: "text-[#FF4F00]" }
    ]
  }
];

const insightsFeed = [
  {
    id: 1,
    title: "ØDEGAARD: SENTIMENT DIVERGENCE",
    desc: "Neutral fans rated his creativity at 8.2, while Arsenal fans' frustration led to 5.2.",
    points: [6.2, 8.2],
    ratingText: "12.4K fan ratings"
  },
  {
    id: 2,
    title: "SAKA: 9.2 RATING ANOMALY",
    desc: "Saka is currently rated 9.2, which is 40% HIGHER than his season average.",
    points: [6.8, 9.2],
    ratingText: "12.4K fan ratings"
  },
  {
    id: 3,
    title: "ROMERO: PEAK 88",
    desc: "A 3-minute spell of dominance...",
    points: [8.8],
    ratingText: "12.4K fan ratings"
  }
];

const overviewMatches = [
  {
    id: 1,
    league: 'Premier',
    team1Score: 3,
    team1Color: 'bg-[#00E5FF]',
    team2Score: 1,
    team2Color: 'bg-teal-800',
    time: "90'",
    mvpName: "Haaland",
    mvpImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    timeline: [
      { type: 'gray', left: '15%' },
      { type: 'cyan', left: '50%' },
      { type: 'yellow', left: '75%' },
      { type: 'cyan', left: '85%' },
    ]
  },
  {
    id: 2,
    league: 'Premier',
    team1Score: 2,
    team1Color: 'bg-[#FF4F00]',
    team2Score: 2,
    team2Color: 'bg-orange-800',
    time: "FT",
    mvpName: "Saka",
    mvpImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    timeline: [
      { type: 'orange', left: '25%' },
      { type: 'gray', left: '40%' },
      { type: 'orange', left: '60%' },
      { type: 'yellow', left: '80%' },
    ]
  },
  {
    id: 3,
    league: 'LaLiga',
    team1Score: 4,
    team1Color: 'bg-purple-500',
    team2Score: 0,
    team2Color: 'bg-purple-900',
    time: "FT",
    mvpName: "Vinicius",
    mvpImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    timeline: [
      { type: 'yellow', left: '20%' },
      { type: 'purple', left: '40%' },
      { type: 'purple', left: '60%' },
      { type: 'purple', left: '80%' },
      { type: 'purple', left: '95%' },
    ]
  },
  {
    id: 4,
    league: 'Serie A',
    team1Score: 1,
    team1Color: 'bg-blue-500',
    team2Score: 0,
    team2Color: 'bg-red-500',
    time: "82'",
    mvpName: "Leao",
    mvpImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    timeline: [
      { type: 'blue', left: '33%' },
      { type: 'yellow', left: '55%' },
      { type: 'gray', left: '70%' },
    ]
  },
  {
    id: 5,
    league: 'Bundesliga',
    team1Score: 2,
    team1Color: 'bg-red-600',
    team2Score: 1,
    team2Color: 'bg-yellow-400',
    time: "FT",
    mvpName: "Kane",
    mvpImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    timeline: [
      { type: 'red', left: '10%' },
      { type: 'yellow', left: '45%' },
      { type: 'red', left: '88%' },
    ]
  }
];

export default function InsightsPage() {
  const [activeLeague, setActiveLeague] = useState('All Leagues');
  
  const displayedMatches = activeLeague === 'All Leagues' 
    ? overviewMatches.slice(0, 3) 
    : overviewMatches.filter(m => m.league === activeLeague);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E5FF]/30 pb-24">
      {/* Date Selector */}
      <section className="pt-8 px-6 overflow-x-auto hover-scrollbar">
        <div className="flex gap-4 min-w-max">
          {dates.map((item, idx) => (
            <button 
              key={idx}
              className={`flex flex-col items-center justify-center w-20 h-24 rounded-2xl border transition-all ${item.active ? 'border-[#00E5FF] bg-[#00E5FF]/5' : 'border-white/10 bg-[#121212] hover:border-white/30'}`}
            >
              <span className={`text-[10px] font-black tracking-widest uppercase mb-1 ${item.active ? 'text-[#00E5FF]' : 'text-gray-500'}`}>{item.label}</span>
              <span className={`text-2xl font-bold mb-2 ${item.active ? 'text-white' : 'text-gray-300'}`}>{item.date}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
            </button>
          ))}
        </div>
      </section>

      {/* What You Missed */}
      <section className="mt-12">
        <div className="flex items-center justify-between px-6 mb-6">
          <h2 className="text-sm font-black tracking-widest uppercase">WHAT YOU MISSED</h2>
          <button className="text-[#00E5FF] text-sm font-bold flex items-center gap-1 hover:underline">
            See all missed matches <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 overflow-x-auto hover-scrollbar flex gap-6 pb-4">
          {missedHighlights.map(highlight => (
             <Link href={`/match/${highlight.id}`} key={highlight.id} className="relative w-[380px] shrink-0 rounded-[2rem] overflow-hidden border border-white/10 group block">
               <div className="absolute inset-0">
                 <img src={highlight.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
               </div>

               <div className="relative p-8 flex flex-col justify-end h-[360px]">
                 <div>
                    <span className={`px-3 py-1.5 rounded flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase w-max mb-6 ${highlight.tagColor}`}>
                      <Activity className="w-3 h-3" /> {highlight.tag}
                    </span>
                    <h3 className="text-3xl font-black mb-2">{highlight.title}</h3>
                    <p className="text-[#00E5FF] font-bold tracking-widest text-xs mb-4 uppercase">{highlight.subtitle}</p>
                    {highlight.desc && <p className="text-sm text-gray-400 max-w-sm mb-6">{highlight.desc}</p>}
                 </div>

                 <div className="flex items-end justify-between mt-4">
                   <div className="flex items-center gap-4">
                     {highlight.stats.map((stat, idx) => (
                       <div key={idx} className="flex flex-col">
                         <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">{stat.label}</span>
                         <span className={`text-xl font-black ${stat.color}`}>{stat.value}</span>
                       </div>
                     ))}
                   </div>
                   
                   <button className="w-12 h-12 shrink-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors group-hover:scale-110">
                     <Play className="w-5 h-5 text-white fill-white ml-1" />
                   </button>
                 </div>
               </div>
             </Link>
          ))}
        </div>
      </section>

      {/* Daily Debrief */}
      <section className="mt-12">
        <h2 className="text-sm font-black tracking-widest uppercase mb-6 px-6">DAILY DEBRIEF</h2>
        
        <div className="px-6 overflow-x-auto hover-scrollbar flex gap-6 pb-4">
          {/* Top 3 Players */}
          <div className="bg-[#121212] border border-white/5 rounded-[2rem] p-6 w-[380px] shrink-0 flex flex-col">
            <h3 className="text-[10px] text-gray-400 font-black tracking-widest uppercase mb-8 text-center">TOP 3 PLAYERS OF THE DAY</h3>
            
            <div className="flex justify-center items-end gap-4 mb-8">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden mb-2 relative">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" className="w-full h-full object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-[#00E5FF] text-black text-[10px] font-black px-1.5 rounded">8.8</div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500"><Activity className="w-3 h-3 text-gray-500"/> 2 <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"/> 1</div>
              </div>
              
              {/* 1st Place */}
              <div className="flex flex-col items-center pb-4">
                <div className="w-20 h-20 rounded-full border-2 border-[#00E5FF] overflow-hidden mb-2 relative shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" className="w-full h-full object-cover" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#00E5FF] text-black text-xs font-black px-2 py-0.5 rounded">9.2</div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500"><Activity className="w-3 h-3 text-gray-500"/> 2 <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"/> 1</div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden mb-2 relative">
                  <img src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=100&h=100&fit=crop" className="w-full h-full object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-[#00E5FF] text-black text-[10px] font-black px-1.5 rounded">8.5</div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500"><Activity className="w-3 h-3 text-gray-500"/> 1 <div className="w-1.5 h-1.5 rounded-full bg-[#FF4F00]"/> 1</div>
              </div>
            </div>

            <button className="mt-auto w-full flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl text-sm font-bold text-gray-300">
              See full rankings <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Insights Feed */}
          {insightsFeed.map((insight) => (
            <div key={insight.id} className="w-[380px] shrink-0 bg-[#121212] border border-white/5 rounded-[2rem] p-6 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-[#00E5FF] font-black">2 - 2</span>
                  <div className="flex gap-0.5">
                    <div className="w-2 h-2 bg-[#00E5FF] rotate-45" />
                    <div className="w-2 h-2 bg-gray-600 rotate-45" />
                  </div>
                </div>
                <h3 className="text-xs font-black tracking-widest text-[#00E5FF] uppercase leading-relaxed mb-4">{insight.title}</h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                  {/* Parsing text to make numbers bold */}
                  {insight.desc.split(/(\d\.?\d*%?)/).map((part, i) => 
                    /^\d\.?\d*%?$/.test(part) || part === 'HIGHER' ? <strong key={i} className={part.includes('%') ? 'text-[#00E5FF]' : 'text-white'}>{part}</strong> : part
                  )}
                </p>

                {/* Slider Visualization */}
                <div className="mt-auto relative w-full h-1 bg-white/10 rounded-full mb-6">
                  {insight.points.map((pt, i) => (
                     <div key={i} className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.8)]" style={{ left: `${(pt/10)*100}%` }} />
                  ))}
                  {insight.points.length > 1 && (
                    <div className="absolute top-1/2 -translate-y-1/2 h-1 bg-[#00E5FF]/30" style={{ left: `${(insight.points[0]/10)*100}%`, right: `${100 - (insight.points[1]/10)*100}%` }} />
                  )}
                  <span className="absolute -bottom-5 text-[8px] font-bold text-gray-500" style={{ left: 0 }}>6.0</span>
                  <span className="absolute -bottom-5 text-[8px] font-bold text-gray-500" style={{ right: 0 }}>9.2</span>
                </div>
                
                <p className="text-[10px] text-gray-500 font-bold">{insight.ratingText}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Live Now: Top Stands (Ticker Style) */}
      <section className="mt-12 border-y border-white/10 bg-[#0A0A0A] py-6 relative overflow-hidden">
        <div className="flex items-center gap-3 px-6 mb-4">
          <span className="bg-red-500 text-white text-[10px] font-black tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
             LIVE <Activity className="w-3 h-3 animate-pulse" />
          </span>
          <h2 className="text-xs font-black tracking-widest uppercase text-gray-300">TOP STANDS</h2>
        </div>
        
        {/* Continuous Ticker Container */}
        <div className="flex overflow-hidden relative py-2">
           {/* Fade Masks */}
           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

           <div className="flex w-max animate-ticker gap-6 items-center hover:cursor-grab active:cursor-grabbing">
             {[...liveStands, ...liveStands, ...liveStands, ...liveStands].map((stand, i) => (
               <div key={`${stand.id}-${i}`} className="relative min-w-[380px] shrink-0 border border-white/10 hover:border-white/30 transition-all rounded-full p-2 pr-6 flex items-center justify-between cursor-pointer group overflow-hidden">
                 
                 {/* Color Injection to fix "too dark" issue */}
                 <div className={`absolute inset-0 bg-gradient-to-r ${stand.accent} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                 <div className="absolute inset-0 bg-[#0A0A0A]/70 backdrop-blur-md" />

                 <div className="flex items-center gap-4 relative z-10">
                   {/* Icon/Avatar Cluster */}
                   <div className="flex items-center">
                     <div className={`w-12 h-12 rounded-full ${stand.iconBg} flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(0,0,0,0.6)]`}>
                       <Mic className="w-5 h-5 text-white" />
                     </div>
                     <div className="flex items-center -ml-4">
                       {stand.avatars.slice(0, 3).map((avatar, idx) => (
                         <img 
                           key={idx} 
                           src={avatar} 
                           className="w-10 h-10 rounded-full border-2 border-[#121212] object-cover -ml-2 grayscale group-hover:grayscale-0 transition-all duration-500" 
                           style={{ zIndex: 9 - idx }}
                         />
                       ))}
                     </div>
                   </div>

                   {/* Title */}
                   <div className="flex flex-col justify-center">
                     <h3 className="text-sm font-bold text-white max-w-[180px] truncate group-hover:text-[#00E5FF] transition-colors">{stand.title}</h3>
                     <span className="text-[10px] text-gray-300 font-mono tracking-wider font-bold">{stand.listeners} LISTENING</span>
                   </div>
                 </div>

                 {/* Join Button */}
                 <button className="relative z-10 text-[10px] font-black tracking-widest uppercase text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors shrink-0 backdrop-blur-sm border border-white/10 group-hover:border-white/30">
                   JOIN
                 </button>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* All Leagues Overview */}
      <section className="mt-12 px-6 mb-12">
        <h2 className="text-sm font-black tracking-widest uppercase mb-6">ALL LEAGUES OVERVIEW</h2>
        
        {/* League Filter */}
        <div className="flex gap-4 overflow-x-auto hover-scrollbar mb-8">
          <button 
            onClick={() => setActiveLeague('All Leagues')}
            className={`flex flex-col items-center justify-center w-[120px] h-[120px] rounded-3xl shrink-0 transition-colors ${activeLeague === 'All Leagues' ? 'bg-[#00E5FF]/5 border border-[#00E5FF]/50' : 'bg-[#0A0A0A] border border-white/5 hover:border-white/20'}`}
          >
            <Globe className={`w-8 h-8 mb-3 ${activeLeague === 'All Leagues' ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
            <span className={`text-xs font-bold ${activeLeague === 'All Leagues' ? 'text-[#00E5FF]' : 'text-gray-400'}`}>All Leagues</span>
          </button>
          {['Premier', 'LaLiga', 'Serie A', 'Bundesliga'].map(league => (
            <button 
              key={league} 
              onClick={() => setActiveLeague(league)}
              className={`flex flex-col items-center justify-center w-[120px] h-[120px] rounded-3xl shrink-0 transition-colors ${activeLeague === league ? 'bg-[#00E5FF]/5 border border-[#00E5FF]/50' : 'bg-[#0A0A0A] border border-white/5 hover:border-white/20'}`}
            >
               {league === 'Premier' ? <Activity className={`w-8 h-8 mb-3 ${activeLeague === league ? 'text-[#00E5FF]' : 'text-gray-400'}`} /> : 
                league === 'LaLiga' ? <Shield className={`w-8 h-8 mb-3 ${activeLeague === league ? 'text-[#00E5FF]' : 'text-gray-400'}`} /> :
                <div className={`w-8 h-8 rounded-full border mb-3 flex items-center justify-center ${activeLeague === league ? 'border-[#00E5FF]' : 'border-gray-400'}`}><Activity className={`w-4 h-4 ${activeLeague === league ? 'text-[#00E5FF]' : 'text-gray-400'}`}/></div>}
              <span className={`text-xs font-bold whitespace-nowrap ${activeLeague === league ? 'text-[#00E5FF]' : 'text-gray-400'}`}>{league}</span>
            </button>
          ))}
        </div>

        {/* Match Rows */}
        <div className="flex flex-col gap-4">
          {displayedMatches.length > 0 ? displayedMatches.map((match) => (
            <Link href={`/match/${match.id}`} key={match.id} className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-6 px-10 flex items-center gap-8 relative overflow-hidden h-[140px] hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer">
              {/* Colored line at the bottom matching team1 color */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${match.team1Color}`} />
              
              {/* Score */}
              <div className="flex flex-col gap-6 w-16 shrink-0 relative z-10">
                 <div className="flex items-center gap-4">
                   <div className={`w-3.5 h-3.5 ${match.team1Color} rotate-45 shrink-0`} />
                   <span className="text-2xl font-black">{match.team1Score}</span>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className={`w-3.5 h-3.5 ${match.team2Color} rotate-45 shrink-0`} />
                   <span className="text-2xl font-black">{match.team2Score}</span>
                 </div>
              </div>

              {/* Timeline */}
              <div className="flex-1 relative flex items-center h-full mx-4 z-10">
                 <div className="w-full h-px bg-white/10 relative">
                    {/* Markers */}
                    {match.timeline.map((marker, i) => (
                       <div key={i} className={`absolute top-1/2 -translate-y-1/2 ${
                          marker.type === 'cyan' ? 'w-2.5 h-2.5 bg-[#00E5FF] rotate-45' :
                          marker.type === 'orange' ? 'w-2.5 h-2.5 bg-[#FF4F00] rotate-45' :
                          marker.type === 'purple' ? 'w-2.5 h-2.5 bg-purple-500 rotate-45' :
                          marker.type === 'blue' ? 'w-2.5 h-2.5 bg-blue-500 rotate-45' :
                          marker.type === 'red' ? 'w-2.5 h-2.5 bg-red-600 rotate-45' :
                          marker.type === 'yellow' ? 'w-2.5 h-2.5 bg-yellow-500' :
                          'w-2 h-2 rounded-full bg-gray-500'
                       }`} style={{left: marker.left}} />
                    ))}
                 </div>
              </div>

              {/* MVP & Action */}
              <div className="flex items-center gap-6 shrink-0 relative z-10">
                 <div className="flex items-center gap-3">
                   <span className="text-[10px] text-gray-500 font-bold tracking-widest mt-6">{match.time}</span>
                   <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-[#00E5FF] overflow-hidden bg-gray-800 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                         <img src={match.mvpImage} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#00E5FF] text-black text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full z-20">MVP</div>
                   </div>
                 </div>
                 
                 {/* Play Button */}
                 <div className="w-12 h-12 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center group-hover:bg-[#00E5FF] group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                   <Play className="w-5 h-5 text-[#00E5FF] group-hover:text-black ml-1 transition-colors" fill="currentColor" />
                 </div>
              </div>
            </Link>
          )) : (
             <div className="text-center text-gray-500 py-8">No featured matches currently.</div>
          )}
        </div>
      </section>

    </div>
  );
}
