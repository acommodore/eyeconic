const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'app', '(app)', 'home', 'page.tsx');

const content = `"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Zap, Brain, ArrowRight, Bookmark, Swords, Flame, Sparkles } from 'lucide-react';
import { allLiveMatches, upcomingTableData, finishedTableData } from '@/lib/mockData';

// --- MOCK RANKING DATA ---
const getMatchCurations = (matchId: number, team1: string) => {
  // Mock logic to return curated tags based on teams
  if (team1 === 'Arsenal' || team1 === 'Man City' || team1 === 'Liverpool') {
    return {
      label: 'Unmissable',
      icon: <Flame className="w-4 h-4 text-orange-500" />,
      color: 'from-orange-500/20 to-red-500/20',
      textColor: 'text-orange-500',
      whyWatch: "Huge stakes, intense rivalry, and massive title implications. Both teams are built for attacking football.",
      metrics: { drama: 95, fanTemp: 98, volatility: 92, tactical: 85 }
    }
  } else if (team1 === 'Chelsea' || team1 === 'Man United' || team1 === 'Tottenham') {
    return {
      label: 'Chaos Guaranteed',
      icon: <Zap className="w-4 h-4 text-yellow-500" />,
      color: 'from-yellow-500/20 to-orange-500/20',
      textColor: 'text-yellow-500',
      whyWatch: "Two highly unpredictable teams known for high-scoring, chaotic games and defensive vulnerabilities.",
      metrics: { drama: 90, fanTemp: 88, volatility: 95, tactical: 60 }
    }
  } else if (team1 === 'Juventus' || team1 === 'Inter Milan' || team1 === 'Inter') {
    return {
      label: 'Tactical Chess Match',
      icon: <Brain className="w-4 h-4 text-purple-500" />,
      color: 'from-purple-500/20 to-blue-500/20',
      textColor: 'text-purple-400',
      whyWatch: "A battle of elite defensive systems. Expect a tight, highly disciplined match decided by fine margins.",
      metrics: { drama: 72, fanTemp: 80, volatility: 40, tactical: 96 }
    }
  } else {
    return {
      label: 'Sleeper Pick',
      icon: <Sparkles className="w-4 h-4 text-teal" />,
      color: 'from-teal/20 to-blue-500/20',
      textColor: 'text-teal',
      whyWatch: "Under-the-radar fixture featuring young talents and expansive attacking styles.",
      metrics: { drama: 65, fanTemp: 50, volatility: 85, tactical: 70 }
    }
  }
};

const MetricBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
      <div className={\`h-full rounded-full \${colorClass}\`} style={{ width: \`\${value}%\` }} />
    </div>
  </div>
);

const CuratedMatchCard = ({ match, isLive = false, isFinished = false }: { match: any, isLive?: boolean, isFinished?: boolean }) => {
  const curation = getMatchCurations(match.id, match.team1);

  return (
    <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-[2rem] p-6 lg:p-8 relative overflow-hidden group hover:border-white/10 hover:bg-card/60 transition-all shadow-xl flex flex-col h-full">
      {/* Background glow based on label */}
      <div className={\`absolute -inset-40 bg-gradient-to-br \${curation.color} opacity-10 blur-[80px] pointer-events-none group-hover:opacity-20 transition-opacity\`} />
      
      {/* Label Badge */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={\`inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-lg\`}>
          {curation.icon}
          <span className={\`text-xs font-black tracking-widest uppercase \${curation.textColor}\`}>{curation.label}</span>
        </div>
        
        {isLive && (
          <div className="flex items-center gap-2 px-3 py-1 bg-coral/10 border border-coral/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
            <span className="text-[10px] font-black text-coral tracking-widest uppercase">{match.time}</span>
          </div>
        )}
      </div>

      {/* Header: Teams & Score */}
      <div className="flex items-center justify-between mb-8 relative z-10">
         <div className="flex flex-col items-center gap-3 w-[40%]">
            {match.logo1 && (
               <img src={match.logo1} alt={match.team1} className={\`w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-xl \${match.logo1.includes('black') || match.team1 === 'Juventus' ? 'invert' : ''}\`} />
            )}
            <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-center line-clamp-1">{match.team1}</h3>
         </div>

         <div className="flex flex-col items-center justify-center shrink-0 w-[20%]">
            {(isLive || isFinished) && match.score ? (
               <div className="text-3xl md:text-4xl font-black font-mono tracking-tighter tabular-nums drop-shadow-md">
                 {match.score}
               </div>
            ) : (
               <span className="text-lg font-black text-muted-foreground uppercase font-mono">VS</span>
            )}
         </div>

         <div className="flex flex-col items-center gap-3 w-[40%]">
            {match.logo2 && (
               <img src={match.logo2} alt={match.team2} className={\`w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-xl \${match.logo2.includes('black') || match.team2 === 'Juventus' ? 'invert' : ''}\`} />
            )}
            <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-center line-clamp-1">{match.team2}</h3>
         </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10 mt-auto">
         <MetricBar label="Drama" value={curation.metrics.drama} colorClass="bg-gradient-to-r from-orange-500 to-red-500" />
         <MetricBar label="Tactical" value={curation.metrics.tactical} colorClass="bg-gradient-to-r from-purple-500 to-blue-500" />
         <MetricBar label="Volatility" value={curation.metrics.volatility} colorClass="bg-gradient-to-r from-teal to-blue-400" />
         <MetricBar label="Fan Temp" value={curation.metrics.fanTemp} colorClass="bg-gradient-to-r from-yellow-400 to-orange-500" />
      </div>

      {/* Why Watch */}
      <div className="bg-black/30 rounded-2xl p-5 mb-8 relative z-10 border border-white/5 backdrop-blur-sm">
         <p className="text-xs text-gray-300 leading-relaxed font-medium">
            <span className="text-white font-black uppercase tracking-widest block mb-2 text-[10px]">Why watch?</span> 
            {curation.whyWatch}
         </p>
      </div>

      {/* CTA */}
      <Link href={\`/match/\${match.id}\`} className="relative z-10 w-full block text-center py-4 rounded-xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
         {isLive ? 'Open Match' : 'Match Preview'}
      </Link>
    </div>
  )
}

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
          const mappedLive = live.map(m => ({
            id: m.id,
            team1: m.team1,
            team2: m.team2,
            score: \`\${m.score1} - \${m.score2}\`,
            time: m.current_minute || "0'",
            logo1: m.logo1,
            logo2: m.logo2,
            league: m.league,
            volatility: m.volatility
          }));
        }
        if (upcoming.length > 0) {
          setUpcomingMatches(upcoming);
        }
      }
    };
    
    fetchMatches();
  }, [supabase]);

  const [activeFilter, setActiveFilter] = useState("All"); 

  const filters = [
    { name: "All", icon: Sparkles },
    { name: "Chaos & Goals", icon: Zap },
    { name: "Tactical Battles", icon: Brain },
    { name: "Rivalries", icon: Swords },
    { name: "High Stakes", icon: Flame },
  ];

  const allCurrentMatches = [
    ...liveMatches.map(m => ({ ...m, status: 'live' })),
    ...upcomingMatches.map(m => ({ ...m, status: 'upcoming' }))
  ];

  // Mock filtering based on preferences
  let filteredMatches = allCurrentMatches;
  if (activeFilter === "Chaos & Goals") {
     filteredMatches = allCurrentMatches.filter(m => getMatchCurations(m.id, m.team1).label === 'Chaos Guaranteed');
  } else if (activeFilter === "Tactical Battles") {
     filteredMatches = allCurrentMatches.filter(m => getMatchCurations(m.id, m.team1).label === 'Tactical Chess Match');
  } else if (activeFilter === "High Stakes" || activeFilter === "Rivalries") {
     filteredMatches = allCurrentMatches.filter(m => getMatchCurations(m.id, m.team1).label === 'Unmissable');
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-teal selection:text-black pb-32 overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal/20 blur-[120px]"></div>
         <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[100px]"></div>
         <div className="absolute top-[40%] right-[-20%] w-[60%] h-[60%] rounded-full bg-purple-900/10 blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 pt-12 md:pt-20">
        
        {/* HEADER */}
        <header className="mb-16 max-w-2xl">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 leading-tight">
              Don't just watch football.<br/>
              <span className="text-teal">Watch the right football.</span>
           </h1>
           <p className="text-base md:text-lg text-gray-400 font-medium tracking-wide">
              Eyeconic curates the best live and upcoming matches using our AI Ranking Pipeline. Find the match that fits your vibe right now.
           </p>
        </header>

        {/* PERSONALIZATION FILTERS */}
        <div className="mb-12 border-b border-white/10 pb-6">
           <h3 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase mb-4">I usually watch matches for:</h3>
           <div className="flex flex-wrap items-center gap-3">
              {filters.map(f => {
                const Icon = f.icon;
                const isActive = activeFilter === f.name;
                return (
                  <button 
                    key={f.name}
                    onClick={() => setActiveFilter(f.name)}
                    className={\`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all \${isActive ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-card/50 border border-white/10 text-muted-foreground hover:border-white/30 hover:text-white backdrop-blur-md'}\`}
                  >
                    <Icon className="w-4 h-4" /> {f.name}
                  </button>
                )
              })}
           </div>
        </div>

        {/* MATCH GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
           {filteredMatches.map((match) => (
              <CuratedMatchCard 
                key={match.id} 
                match={match} 
                isLive={match.status === 'live'} 
                isFinished={match.status === 'finished'} 
              />
           ))}

           {filteredMatches.length === 0 && (
             <div className="col-span-full p-20 text-center bg-card/40 rounded-[2rem] border border-white/5 backdrop-blur-md">
               <span className="text-muted-foreground text-sm font-mono tracking-widest uppercase">No matches currently fit this vibe.</span>
             </div>
           )}
        </section>

      </div>
    </main>
  );
}
`;

fs.writeFileSync(targetPath, content);
console.log('Successfully updated home/page.tsx with the Match Ranking Pipeline UI!');
