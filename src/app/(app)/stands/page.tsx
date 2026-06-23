"use client";

import Link from "next/link";
import { Search, Bell, Mic, Volume2, Play, Plus, Clock, Shield, Flame, Radio, Calendar, Activity, Zap, Scissors } from "lucide-react";

export default function StandsPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by 100px to account for the sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto min-h-screen text-white bg-[#020202]">
      
      {/* Top Navigation Tabs - Floating & Glassy */}
      <div className="sticky top-0 z-50 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 hover-scrollbar hide-scrollbar-mobile">
          <button onClick={() => scrollToSection('live-now')} className="px-6 py-2.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] font-black tracking-widest text-xs whitespace-nowrap flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:bg-[#00E5FF]/20 transition-all cursor-pointer">
            <Radio className="w-4 h-4 animate-pulse" />
            LIVE NOW
          </button>
          <button onClick={() => scrollToSection('trending')} className="px-6 py-2.5 rounded-full border border-white/10 text-gray-400 font-bold tracking-widest text-xs whitespace-nowrap hover:bg-white/5 hover:text-white transition-all flex items-center gap-2 cursor-pointer">
            <Activity className="w-4 h-4" /> TOP VOICES
          </button>
          <button onClick={() => scrollToSection('my-clubs')} className="px-6 py-2.5 rounded-full border border-white/10 text-gray-400 font-bold tracking-widest text-xs whitespace-nowrap hover:bg-white/5 hover:text-white transition-all flex items-center gap-2 cursor-pointer">
            <Shield className="w-4 h-4" /> MY CLUBS
          </button>
          <button onClick={() => scrollToSection('scheduled')} className="px-6 py-2.5 rounded-full border border-white/10 text-gray-400 font-bold tracking-widest text-xs whitespace-nowrap hover:bg-white/5 hover:text-white transition-all flex items-center gap-2 cursor-pointer">
            <Calendar className="w-4 h-4" /> SCHEDULED
          </button>
          <button onClick={() => scrollToSection('highlights')} className="px-6 py-2.5 rounded-full border border-white/10 text-gray-400 font-bold tracking-widest text-xs whitespace-nowrap hover:bg-white/5 hover:text-white transition-all flex items-center gap-2 cursor-pointer">
            <Zap className="w-4 h-4 text-yellow-500" /> HIGHLIGHTS
          </button>
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-16">
          
          {/* HERO SECTION: Featured Live Stand */}
          <section className="relative w-full rounded-[32px] overflow-hidden group cursor-pointer border border-white/10 shadow-2xl">
            {/* Animated Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6200EA]/20 via-[#020202] to-[#FF3B00]/20 z-0" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000 z-0 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-10" />
            
            <div className="relative z-20 p-6 md:p-12 flex flex-col md:flex-row items-end justify-between gap-8 h-full min-h-[400px]">
              
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1.5 rounded-md bg-red-600 text-[10px] font-black tracking-widest text-white flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> ON AIR
                  </span>
                  <span className="text-xs font-bold text-[#00E5FF] tracking-widest bg-[#00E5FF]/10 px-3 py-1.5 rounded-md border border-[#00E5FF]/20">
                    12.4K LISTENING
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-wide">
                  Arsenal vs Man City:<br/>Title Decider Post-Match
                </h1>
                <p className="text-gray-400 font-medium md:text-lg line-clamp-2 max-w-xl mb-8">
                  The biggest game of the season just ended. Tactical breakdowns, controversial VAR calls, and fan meltdowns. Join the debate.
                </p>

                <div className="flex items-center gap-4">
                  <Link href="/stands/1" className="bg-white text-black font-black tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95">
                    JOIN STAND
                  </Link>
                  <div className="flex -space-x-3">
                    <img className="w-10 h-10 rounded-full border-2 border-[#020202] shadow-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host1" alt="Host"/>
                    <img className="w-10 h-10 rounded-full border-2 border-[#020202] shadow-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host2" alt="Host"/>
                    <img className="w-10 h-10 rounded-full border-2 border-[#020202] shadow-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host3" alt="Host"/>
                  </div>
                </div>
              </div>

              {/* Featured Speakers Mini-list */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-full md:w-auto min-w-[250px]">
                <h4 className="text-[10px] font-black text-gray-500 tracking-widest uppercase mb-4">On Stage</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-[#00E5FF] p-0.5"><img className="w-full h-full rounded-full bg-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host1" /></div>
                     <div><p className="text-xs font-bold text-white">Gooner4Life</p><p className="text-[9px] text-[#00E5FF] font-bold">HOST</p></div>
                     <Mic className="w-3 h-3 text-[#00E5FF] ml-auto" />
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-white/10 p-0.5"><img className="w-full h-full rounded-full bg-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host2" /></div>
                     <div><p className="text-xs font-bold text-gray-300">CityZenX</p><p className="text-[9px] text-gray-500 font-bold">CO-HOST</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-white/10 p-0.5"><img className="w-full h-full rounded-full bg-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Host3" /></div>
                     <div><p className="text-xs font-bold text-gray-300">TacticsGuy</p><p className="text-[9px] text-gray-500 font-bold">SPEAKER</p></div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* LIVE NOW GRID */}
          <section id="live-now" className="scroll-mt-32">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black tracking-widest text-white flex items-center gap-3 uppercase">
                <Flame className="w-5 h-5 text-[#FF3B00]" />
                Live Stands
              </h2>
              <span className="text-xs text-gray-400 font-bold hover:text-white cursor-pointer transition-colors uppercase tracking-widest">View All</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden relative group border border-white/5 hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative z-20 p-5 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 rounded bg-red-600 text-[9px] font-black text-white flex items-center gap-1 uppercase tracking-widest">
                      Live
                    </span>
                    <span className="px-2 py-1 rounded bg-black/50 backdrop-blur text-[9px] font-bold text-white tracking-widest border border-white/10">
                      5.2K LISTENING
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-black text-white leading-tight mb-2 group-hover:text-[#00E5FF] transition-colors">
                      Liverpool post-match: Salah MVP debate
                    </h3>
                    
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                      <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=E" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=F" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=G" alt="user"/>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hosted by LFCFanTV</span>
                    </div>
                  </div>
                </div>
              </div>

               {/* Card 2 */}
               <div className="aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden relative group border border-white/5 hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative z-20 p-5 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 rounded bg-red-600 text-[9px] font-black text-white flex items-center gap-1 uppercase tracking-widest">
                      Live
                    </span>
                    <span className="px-2 py-1 rounded bg-black/50 backdrop-blur text-[9px] font-bold text-white tracking-widest border border-white/10">
                      3.1K LISTENING
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-black text-white leading-tight mb-2 group-hover:text-[#00E5FF] transition-colors">
                      VAR controversy: Every big call discussed
                    </h3>
                    
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                      <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=I" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=J" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=K" alt="user"/>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hosted by TheRef</span>
                    </div>
                  </div>
                </div>
              </div>

               {/* Card 3 */}
               <div className="aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden relative group border border-white/5 hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative z-20 p-5 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 rounded bg-red-600 text-[9px] font-black text-white flex items-center gap-1 uppercase tracking-widest">
                      Live
                    </span>
                    <span className="px-2 py-1 rounded bg-black/50 backdrop-blur text-[9px] font-bold text-white tracking-widest border border-white/10">
                      1.8K LISTENING
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-black text-white leading-tight mb-2 group-hover:text-[#00E5FF] transition-colors">
                      Transfer Rumors: Mbappe to Madrid?
                    </h3>
                    
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                      <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=M1" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=M2" alt="user"/>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hosted by MadridistaHQ</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 4 - Hidden on smaller screens to balance grid */}
               <div className="hidden xl:block aspect-[4/5] rounded-[24px] overflow-hidden relative group border border-white/5 hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbb1925846?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative z-20 p-5 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 rounded bg-red-600 text-[9px] font-black text-white flex items-center gap-1 uppercase tracking-widest">
                      Live
                    </span>
                    <span className="px-2 py-1 rounded bg-black/50 backdrop-blur text-[9px] font-bold text-white tracking-widest border border-white/10">
                      950 LISTENING
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-black text-white leading-tight mb-2 group-hover:text-[#00E5FF] transition-colors">
                      Serie A Title Race: Inter's dominance
                    </h3>
                    
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                      <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=S1" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=S2" alt="user"/>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hosted by CalcioTalk</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SCHEDULED & UPCOMING */}
          <section id="scheduled" className="mb-12 scroll-mt-32">
             <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#00E5FF]" /> Scheduled Today
              </h2>
              <span className="text-[10px] text-gray-400 font-bold hover:text-white cursor-pointer transition-colors uppercase tracking-widest">See all</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Scheduled Item 1 */}
              <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex flex-col items-center justify-center border border-white/10 shadow-inner shrink-0 group-hover:border-[#00E5FF]/50 transition-colors">
                  <span className="text-xs font-black text-gray-400">7:00</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-sm group-hover:text-[#00E5FF] transition-colors truncate">UCL Semi-final Preview</h4>
                  <p className="text-[10px] text-[#00E5FF] font-bold uppercase tracking-widest mt-1">In 2h 15m</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 shrink-0">
                  <Bell className="w-3 h-3 text-white" />
                </button>
              </div>

              {/* Scheduled Item 2 */}
              <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex flex-col items-center justify-center border border-white/10 shadow-inner shrink-0 group-hover:border-[#FF3B00]/50 transition-colors">
                  <span className="text-xs font-black text-gray-400">8:30</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-sm group-hover:text-[#FF3B00] transition-colors truncate">Transfer Deadline Talk</h4>
                  <p className="text-[10px] text-[#FF3B00] font-bold uppercase tracking-widest mt-1">In 3h 45m</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 shrink-0">
                  <Bell className="w-3 h-3 text-white" />
                </button>
              </div>

               {/* Scheduled Item 3 */}
               <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex flex-col items-center justify-center border border-white/10 shadow-inner shrink-0 group-hover:border-[#6200EA]/50 transition-colors">
                  <span className="text-xs font-black text-gray-400">10:00</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-sm group-hover:text-[#6200EA] transition-colors truncate">La Liga Title Race</h4>
                  <p className="text-[10px] text-[#6200EA] font-bold uppercase tracking-widest mt-1">In 5h 15m</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 shrink-0">
                  <Bell className="w-3 h-3 text-white" />
                </button>
              </div>

            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* TOP VOICES */}
            <section id="trending" className="scroll-mt-32">
               <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-3">
                  <Mic className="w-5 h-5 text-[#6200EA]" /> Top Voices
                </h2>
                <span className="text-[10px] text-gray-400 font-bold hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Discover</span>
              </div>
              
              <div className="space-y-4">
                
                <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/10 shrink-0 overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gooner" alt="Creator" className="w-full h-full bg-gray-800" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">Gooner4Life</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">12.4K Followers</p>
                  </div>
                  <button className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-black tracking-widest hover:bg-gray-200 transition-colors shrink-0">
                    FOLLOW
                  </button>
                </div>

                <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/10 shrink-0 overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tactics" alt="Creator" className="w-full h-full bg-gray-800" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">TacticsGuy</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">8.2K Followers</p>
                  </div>
                  <button className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-black tracking-widest hover:bg-gray-200 transition-colors shrink-0">
                    FOLLOW
                  </button>
                </div>

                <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/10 shrink-0 overflow-hidden">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MadridHQ" alt="Creator" className="w-full h-full bg-gray-800" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">MadridistaHQ</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">5.9K Followers</p>
                  </div>
                  <button className="px-4 py-1.5 rounded-full border border-white/20 text-white text-xs font-black tracking-widest hover:bg-white/10 transition-colors shrink-0">
                    FOLLOWING
                  </button>
                </div>

              </div>
            </section>

            {/* MY CLUBS / COMMUNITIES - COMPACT */}
            <section id="my-clubs" className="scroll-mt-32">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-400" /> My Clubs
                </h2>
                <span className="text-[10px] text-gray-400 font-bold hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Manage</span>
              </div>
              
              <div className="space-y-4">
                
                <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" alt="LFC" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">Liverpool FC</h4>
                    <p className="text-[10px] font-bold text-[#00E5FF] mt-1 flex items-center gap-1.5 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" /> 2 LIVE ROOMS
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" alt="AFC" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">Arsenal FC</h4>
                    <p className="text-[10px] font-bold text-[#FF3B00] mt-1 flex items-center gap-1.5 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B00] animate-pulse" /> 1 LIVE ROOM
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" alt="TOT" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">Tottenham</h4>
                    <p className="text-[10px] font-bold text-gray-600 mt-1 uppercase tracking-widest">
                      NO LIVE ROOMS
                    </p>
                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* HIGHLIGHTS SECTION */}
          <section id="highlights" className="mt-12 scroll-mt-32">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-500" /> Highlights
              </h2>
              <span className="text-[10px] text-gray-400 font-bold hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Browse Clips</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Highlight 1 */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] overflow-hidden group cursor-pointer hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded bg-black/80 text-[10px] font-bold text-white tracking-widest border border-white/10 flex items-center gap-1">
                    <Scissors className="w-3 h-3 text-yellow-500" /> 1:45
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-white text-sm group-hover:text-gray-300 transition-colors line-clamp-2">"That was never a penalty!" - Heated El Clasico Debate</h4>
                  <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> YESTERDAY
                  </p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] overflow-hidden group cursor-pointer hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded bg-black/80 text-[10px] font-bold text-white tracking-widest border border-white/10 flex items-center gap-1">
                    <Scissors className="w-3 h-3 text-yellow-500" /> 0:58
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-white text-sm group-hover:text-gray-300 transition-colors line-clamp-2">Roy Keane's brutal takedown of Man United midfield</h4>
                  <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> 2 DAYS AGO
                  </p>
                </div>
              </div>

               {/* Highlight 3 */}
               <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] overflow-hidden group cursor-pointer hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628891435222-06592ce29663?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded bg-black/80 text-[10px] font-bold text-white tracking-widest border border-white/10 flex items-center gap-1">
                    <Scissors className="w-3 h-3 text-yellow-500" /> 2:15
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-white text-sm group-hover:text-gray-300 transition-colors line-clamp-2">"Messi wouldn't survive a cold night in Stoke"</h4>
                  <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> LAST WEEK
                  </p>
                </div>
              </div>

              {/* Highlight 4 */}
              <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] overflow-hidden group cursor-pointer hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hidden lg:block">
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded bg-black/80 text-[10px] font-bold text-white tracking-widest border border-white/10 flex items-center gap-1">
                    <Scissors className="w-3 h-3 text-yellow-500" /> 1:12
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-white text-sm group-hover:text-gray-300 transition-colors line-clamp-2">Why Bellingham is already better than Zidane</h4>
                  <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> LAST WEEK
                  </p>
                </div>
              </div>

            </div>
          </section>

      </div>
    </div>
  );
}
