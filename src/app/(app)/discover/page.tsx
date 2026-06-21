"use client";

import Link from "next/link";
import { Eye, Bell, Zap, GitBranch, Bookmark, Crosshair, Star, Swords, Dices, Mic, Activity, TrendingUp, BarChart2 } from "lucide-react";

export default function DiscoverPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 bg-[#050505] min-h-screen text-white space-y-10">
      
      {/* 1. HERO SECTION: FEATURED MATCH */}
      <section className="w-full rounded-2xl border border-white/10 overflow-hidden relative group shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-[#0A0A0A]">
        {/* Very dark gradient primarily at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#050505]/80 to-transparent z-10" />
        {/* Moody background image, very low opacity */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7137b29de2f6?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" />
        
        <div className="relative z-20 p-6 md:p-8 flex flex-col h-[400px]">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-2 py-1 bg-black/60 border border-[#00E5FF]/20 rounded font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-[#00E5FF] text-[10px] font-bold tracking-widest">[ SYSTEM // ACTIVE ]</span>
              </div>
              <span className="text-xs text-gray-400 font-medium tracking-wide flex items-center gap-2 font-mono">
                 Premier League
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 font-mono text-xs">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" /> 12.4K
              </span>
              <Bell className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Main Scoreboard */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="flex items-center justify-center gap-8 md:gap-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(108,171,221,0.2)]">
                  <span className="text-[#6CABDD] font-black text-lg md:text-xl tracking-tighter">MCI</span>
                </div>
                <span className="text-xs md:text-sm font-bold tracking-widest text-gray-300">MAN CITY</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 md:gap-6 text-5xl md:text-6xl font-mono font-black tracking-tighter text-white">
                  <span>2</span>
                  <span className="text-gray-700">-</span>
                  <span>1</span>
                </div>
                <div className="flex items-center gap-2 mt-4 text-[#00E5FF] font-mono text-xs md:text-sm border border-[#00E5FF]/30 px-3 py-1 rounded bg-[#00E5FF]/5">
                  <span className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-ping" />
                  68:14
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(200,16,46,0.2)]">
                  <span className="text-[#C8102E] font-black text-lg md:text-xl tracking-tighter">LIV</span>
                </div>
                <span className="text-xs md:text-sm font-bold tracking-widest text-gray-300">LIVERPOOL</span>
              </div>
            </div>
          </div>

          {/* Bottom Data Row - Terminal Style */}
          <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col gap-2 w-1/2 md:w-1/3">
               <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Momentum Delta</span>
               <div className="flex items-end gap-1 h-6">
                 {[40, 45, 30, 60, 75, 80, 95, 85, 90].map((h, i) => (
                   <div key={i} className="w-1 md:w-2 bg-[#00E5FF]" style={{ height: `${h}%`, opacity: (i+1)/9 }} />
                 ))}
               </div>
               <span className="text-[9px] md:text-xs text-[#00E5FF] font-mono font-bold truncate">&gt; MCI PRESSURE SURGING</span>
            </div>

            <div className="flex flex-col items-end gap-3 w-1/2 md:w-1/3">
              <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono text-gray-400">
                <div className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#FF4F00]"/> CHAOS: <span className="text-white font-bold">78</span></div>
                <div className="hidden md:flex items-center gap-1"><GitBranch className="w-3 h-3 text-[#00E5FF]"/> TACTIC: <span className="text-white font-bold">84</span></div>
              </div>
              <Link href="/pulse" className="bg-white text-black font-bold text-[10px] md:text-xs px-4 md:px-6 py-2 md:py-2.5 rounded hover:bg-gray-200 transition-colors tracking-widest flex items-center gap-2 w-fit">
                <Activity className="w-3 h-3 md:w-4 md:h-4" /> ENTER PULSE
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CHOOSE YOUR EXPERIENCE (Sleek Toggles) */}
      <section className="flex gap-2 overflow-x-auto pb-2 hover-scrollbar">
        {[
          { icon: <Bookmark className="w-4 h-4" />, label: "BOOKMARKS", color: "text-[#00E5FF]", border: "border-[#00E5FF]/30", bg: "bg-[#00E5FF]/5" },
          { icon: <Zap className="w-4 h-4" />, label: "CHAOS", color: "text-[#FF4F00]", border: "border-[#FF4F00]/30", bg: "bg-transparent" },
          { icon: <GitBranch className="w-4 h-4" />, label: "TACTICAL", color: "text-gray-400", border: "border-white/10", bg: "bg-transparent" },
          { icon: <Star className="w-4 h-4" />, label: "STAR WATCH", color: "text-gray-400", border: "border-white/10", bg: "bg-transparent" },
          { icon: <Swords className="w-4 h-4" />, label: "RIVALRIES", color: "text-gray-400", border: "border-white/10", bg: "bg-transparent" },
          { icon: <Dices className="w-4 h-4" />, label: "SURPRISE ME", color: "text-gray-400", border: "border-white/10", bg: "bg-transparent" }
        ].map((filter, i) => (
          <button key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded border ${filter.border} ${filter.bg} hover:bg-white/5 transition-colors whitespace-nowrap`}>
            <span className={filter.color}>{filter.icon}</span>
            <span className={`text-[10px] font-bold tracking-widest ${i === 0 ? 'text-white' : 'text-gray-400'}`}>{filter.label}</span>
          </button>
        ))}
      </section>

      {/* 3. SPLIT PANE GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Pane */}
        <div className="xl:col-span-8 space-y-12">
          
          {/* WHAT'S HAPPENING */}
          <section>
             <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
              <h2 className="text-xs font-mono tracking-widest text-gray-400 uppercase"><span className="text-[#00E5FF]">&gt;</span> LIVE MATCHES</h2>
              <span className="text-[10px] text-gray-500 font-mono cursor-pointer hover:text-white transition-colors">[ VIEW ALL ]</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Match Node 1 */}
              <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-5 flex flex-col relative group hover:border-[#00E5FF]/30 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1 h-1 bg-[#00E5FF] animate-pulse rounded-full" /> SYS.SYNC
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">12.4K</span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white w-8">MCI</span>
                    <span className="text-xl font-mono font-bold text-white">2</span>
                  </div>
                  <div className="text-xs font-mono text-gray-600">-</div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-mono font-bold text-white">1</span>
                    <span className="text-sm font-bold text-gray-400 w-8 text-right">ARS</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>MOMENTUM</span>
                    <span className="text-[#FF4F00]">CHAOS: 78</span>
                  </div>
                  {/* Minimalist sparkline */}
                  <div className="h-4 w-full flex items-end gap-[2px]">
                    {[2,3,4,3,5,6,8,7,9,10,9,12,11,14,13].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#FF4F00]/50 rounded-t-sm" style={{ height: `${(h/14)*100}%` }} />
                    ))}
                  </div>
                </div>
              </div>

               {/* Match Node 2 */}
              <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-5 flex flex-col relative group hover:border-[#FF4F00]/30 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-[#FF4F00] bg-[#FF4F00]/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1 h-1 bg-[#FF4F00] animate-pulse rounded-full" /> LALIGA
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">8.2K</span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white w-8">RMA</span>
                    <span className="text-xl font-mono font-bold text-white">1</span>
                  </div>
                  <div className="text-xs font-mono text-gray-600">-</div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-mono font-bold text-white">1</span>
                    <span className="text-sm font-bold text-gray-400 w-8 text-right">BAR</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>MOMENTUM</span>
                    <span className="text-[#00E5FF]">TACTICAL: 82</span>
                  </div>
                  <div className="h-4 w-full flex items-end gap-[2px]">
                    {[10,9,11,10,8,7,6,5,7,6,4,5,3,4,2].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#00E5FF]/50 rounded-t-sm" style={{ height: `${(h/11)*100}%` }} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* UPCOMING */}
          <section>
             <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
               <h2 className="text-xs font-mono tracking-widest text-gray-400 uppercase"><span className="text-[#00E5FF]">&gt;</span> UPCOMING_PREDICTIONS</h2>
             </div>
             
             <div className="space-y-3">
               {[
                 { id: 1, team1: "RMA", team2: "MCI", time: "15:00", fans: "5.2K", chaos: "91", insight: "Maximum defensive volatility detected", spark: [2,4,6,5,8,7,9,12,14] },
                 { id: 2, team1: "BAY", team2: "DOR", time: "17:30", fans: "4.8K", chaos: "85", insight: "High tempo pressing expected", spark: [1,2,2,3,4,5,4,6,7] }
               ].map((match) => (
                 <div key={match.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-white/5 bg-[#0A0A0A] hover:bg-white/5 transition-colors gap-4">
                   
                   <div className="flex items-center gap-6 w-full sm:w-auto">
                     <span className="text-xs font-mono text-gray-500 w-10">{match.time}</span>
                     <div className="flex items-center gap-3">
                       <span className="font-bold text-white">{match.team1}</span>
                       <span className="text-xs text-gray-600">v</span>
                       <span className="font-bold text-gray-400">{match.team2}</span>
                     </div>
                   </div>

                   <div className="flex items-center gap-6 w-full sm:w-auto flex-1 justify-end">
                     <div className="hidden md:flex flex-col gap-1 items-end w-32">
                        <span className="text-[9px] font-mono text-purple-400">PREDICTED VOLATILITY</span>
                        <div className="h-3 w-full flex items-end gap-[1px] justify-end">
                          {match.spark.map((h, i) => (
                            <div key={i} className="w-1.5 bg-purple-500/50" style={{ height: `${(h/14)*100}%` }} />
                          ))}
                        </div>
                     </div>
                     <span className="text-[10px] font-mono text-purple-400 border border-purple-500/20 bg-purple-500/10 px-2 py-1 rounded">
                       {match.chaos} IDX
                     </span>
                     <button className="text-[10px] font-bold tracking-widest text-black bg-white px-3 py-1.5 rounded hover:bg-gray-200">
                       PREMATCH
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </section>

        </div>

        {/* Right Pane (Command Sidebar) */}
        <div className="xl:col-span-4">
           <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
              <h2 className="text-xs font-mono tracking-widest text-gray-400 uppercase"><span className="text-[#00E5FF]">&gt;</span> SYS.LOG / SCHEDULE</h2>
            </div>
            
            <div className="space-y-3">
               {[
                 { time: "20:45", t1: "LIV", t2: "MUN", league: "EPL", desc: "High press vs weak defense", metric: "68", trend: "up" },
                 { time: "21:00", t1: "PSG", t2: "BVB", league: "UCL", desc: "Strategic gridlock expected", metric: "42", trend: "down" },
                 { time: "22:00", t1: "ATM", t2: "SEV", league: "LAL", desc: "Physical duel in midfield", metric: "36", trend: "down" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col p-4 bg-[#0A0A0A] border border-white/5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-3">
                         <span className="text-xs font-mono text-gray-500">{item.time}</span>
                         <span className="text-xs font-bold text-white">{item.t1} <span className="text-gray-600 font-normal">v</span> {item.t2}</span>
                       </div>
                       <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-400 font-mono">
                         {item.league}
                       </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] text-gray-500 font-mono italic">{item.desc}</p>
                      <div className="flex items-center gap-1 font-mono text-xs">
                        <span className={item.trend === 'up' ? 'text-[#FF4F00]' : 'text-gray-500'}>
                          {item.trend === 'up' ? '▲' : '▼'}
                        </span>
                        <span className="text-white">{item.metric}</span>
                      </div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Volatility Movers Mini-module */}
            <div className="mt-8">
               <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                  <h2 className="text-xs font-mono tracking-widest text-gray-400 uppercase"><span className="text-[#FF4F00]">&gt;</span> VOLATILITY MOVERS</h2>
               </div>
               <div className="p-4 bg-gradient-to-br from-[#FF4F00]/10 to-transparent border border-[#FF4F00]/20 rounded-xl flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-mono text-[#FF4F00]">#1 SPIKE DETECTED</span>
                   <span className="text-sm font-bold text-white">TOT v CHE</span>
                 </div>
                 <div className="flex flex-col items-end gap-1">
                   <span className="text-lg font-mono font-black text-[#FF4F00]">+24%</span>
                   <span className="text-[9px] text-gray-400 font-mono">LAST 1HR</span>
                 </div>
               </div>
            </div>
        </div>

      </div>
    </div>
  );
}
