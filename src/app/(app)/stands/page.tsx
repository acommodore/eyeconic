import Link from "next/link";
import { Search, Bell, Mic, Volume2, Play, Plus, Clock, Shield } from "lucide-react";

export default function StandsPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 bg-[#050505] min-h-screen text-white">
      
      {/* Top Navigation Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-6 hover-scrollbar">
        <button className="px-5 py-2.5 rounded-full bg-[#00603A] border border-[#00C853]/50 text-white font-bold text-sm whitespace-nowrap flex items-center gap-2 shadow-[0_0_15px_rgba(0,200,83,0.2)]">
          <div className="flex gap-0.5 items-center">
             <div className="w-0.5 h-2 bg-white rounded-full" />
             <div className="w-0.5 h-3 bg-white rounded-full" />
             <div className="w-0.5 h-2 bg-white rounded-full" />
          </div>
          Live Now
        </button>
        <button className="px-5 py-2.5 rounded-full border border-white/10 text-gray-400 font-semibold text-sm whitespace-nowrap hover:bg-white/5 transition-colors flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-gray-400" />
          </div>
          Following
        </button>
        <button className="px-5 py-2.5 rounded-full border border-white/10 text-gray-400 font-semibold text-sm whitespace-nowrap hover:bg-white/5 transition-colors flex items-center gap-2">
          <Shield className="w-4 h-4" /> Clubs
        </button>
        <button className="px-5 py-2.5 rounded-full border border-white/10 text-gray-400 font-semibold text-sm whitespace-nowrap hover:bg-white/5 transition-colors">
          All Rooms
        </button>
        <button className="px-5 py-2.5 rounded-full border border-white/10 text-gray-400 font-semibold text-sm whitespace-nowrap hover:bg-white/5 transition-colors">
          Replays
        </button>
      </div>

      <div className="space-y-12 mt-4">
          
          {/* LIVE NOW SECTION */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-white flex items-center gap-2 uppercase">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  LIVE NOW
                </h2>
                <p className="text-xs text-gray-400 mt-1">Join the biggest conversations right now</p>
              </div>
              <span className="text-xs text-[#00C853] font-bold hover:text-white cursor-pointer transition-colors">See all &gt;</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 hover-scrollbar snap-x">
              
              {/* Card 1: Arsenal */}
              <div className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] aspect-[4/5] rounded-[24px] overflow-hidden relative group snap-start shrink-0 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E] via-[#050505]/60 to-[#050505]/40 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" />
                
                <div className="relative z-20 p-5 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 rounded bg-red-600 text-[10px] font-bold text-white flex items-center gap-1">
                      <Mic className="w-3 h-3" /> LIVE
                    </span>
                    <span className="text-[10px] font-bold text-white tracking-wider">
                      8.4K listening
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="w-10 h-10 rounded-full bg-[#6200EA] flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(98,0,234,0.5)]">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white leading-tight mb-2">
                      Arsenal fans debating Saka's 9.2 rating
                    </h3>
                    <p className="text-xs font-medium text-gray-300 mb-4 line-clamp-2">
                      Was he really MVP? Title race implications, stats & more
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=B" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=C" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=D" alt="user"/>
                      </div>
                      <span className="text-xs text-gray-400 font-bold">+8.1K</span>
                    </div>

                    <div className="flex gap-2">
                      <Link href="/stands/2" className="flex-1 bg-[#6200EA] text-white font-bold py-2.5 rounded-xl hover:bg-[#6200EA]/90 transition-all text-sm shadow-[0_0_15px_rgba(98,0,234,0.3)] flex items-center justify-center">
                        Join Stand
                      </Link>
                      <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/20 hover:bg-white/10 transition-colors backdrop-blur">
                        <Volume2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Liverpool */}
              <div className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] aspect-[4/5] rounded-[24px] overflow-hidden relative group snap-start shrink-0 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#003B2E] via-[#050505]/60 to-[#050505]/40 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" />
                
                <div className="relative z-20 p-5 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 rounded bg-red-600 text-[10px] font-bold text-white flex items-center gap-1">
                      <Mic className="w-3 h-3" /> LIVE
                    </span>
                    <span className="text-[10px] font-bold text-white tracking-wider">
                      5.2K listening
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="w-10 h-10 rounded-full bg-[#00C853] flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(0,200,83,0.5)]">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white leading-tight mb-2">
                      Liverpool post-match: Salah MVP debate
                    </h3>
                    <p className="text-xs font-medium text-gray-300 mb-4 line-clamp-2">
                      Brilliance, stats & what it means for the title
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=E" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=F" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=G" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=H" alt="user"/>
                      </div>
                      <span className="text-xs text-gray-400 font-bold">+4.9K</span>
                    </div>

                    <div className="flex gap-2">
                      <Link href="/stands/2" className="flex-1 bg-[#00603A] text-[#00C853] font-bold py-2.5 rounded-xl hover:bg-[#00C853] hover:text-black transition-all text-sm border border-[#00C853]/50 shadow-[0_0_15px_rgba(0,200,83,0.2)] flex items-center justify-center">
                        Join Stand
                      </Link>
                      <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/20 hover:bg-white/10 transition-colors backdrop-blur">
                        <Volume2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

               {/* Card 3: VAR Controversy */}
               <div className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] aspect-[4/5] rounded-[24px] overflow-hidden relative group snap-start shrink-0 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A1E00] via-[#050505]/60 to-[#050505]/40 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" />
                
                <div className="relative z-20 p-5 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 rounded bg-red-600 text-[10px] font-bold text-white flex items-center gap-1">
                      <Mic className="w-3 h-3" /> LIVE
                    </span>
                    <span className="text-[10px] font-bold text-white tracking-wider">
                      3.2K listening
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="w-10 h-10 rounded-full bg-[#FF6D00] flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(255,109,0,0.5)]">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white leading-tight mb-2">
                      VAR controversy: Every big call discussed
                    </h3>
                    <p className="text-xs font-medium text-gray-300 mb-4 line-clamp-2">
                      All matches, all big decisions
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=I" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=J" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=K" alt="user"/>
                        <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=L" alt="user"/>
                      </div>
                      <span className="text-xs text-gray-400 font-bold">+3.6K</span>
                    </div>

                    <div className="flex gap-2">
                      <Link href="/stands/2" className="flex-1 bg-[#FF6D00] text-black font-bold py-2.5 rounded-xl hover:bg-[#FF6D00]/90 transition-all text-sm shadow-[0_0_15px_rgba(255,109,0,0.3)] flex items-center justify-center">
                        Join Stand
                      </Link>
                      <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/20 hover:bg-white/10 transition-colors backdrop-blur">
                        <Volume2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Pagination dots */}
            <div className="flex justify-center gap-1.5 mt-4">
               <div className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
               <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
               <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
               <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
          </section>

          {/* MY CLUBS */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-white uppercase">MY CLUBS</h2>
                <p className="text-xs text-gray-400 mt-1">Rooms from your clubs and leagues</p>
              </div>
              <span className="text-xs text-[#00C853] font-bold hover:text-white cursor-pointer transition-colors">See all &gt;</span>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 hover-scrollbar snap-x">
              <div className="min-w-[220px] bg-[#121212] p-4 rounded-[20px] flex items-center gap-4 relative border border-white/5 hover:bg-white/5 transition-colors cursor-pointer snap-start">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" alt="LFC" className="w-10 h-10 object-contain drop-shadow-md" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">Liverpool FC</p>
                  <p className="text-xs text-gray-400 mt-0.5">Fan Room</p>
                  <p className="text-[10px] text-[#00C853] font-bold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" /> 2.9K online
                  </p>
                </div>
              </div>
              
              <div className="min-w-[220px] bg-[#121212] p-4 rounded-[20px] flex items-center gap-4 relative border border-white/5 hover:bg-white/5 transition-colors cursor-pointer snap-start">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                   <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png" alt="AFC" className="w-10 h-10 object-contain drop-shadow-md" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">Arsenal FC</p>
                  <p className="text-xs text-gray-400 mt-0.5">Fan Room</p>
                  <p className="text-[10px] text-[#00E5FF] font-bold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" /> 1.7K online
                  </p>
                </div>
              </div>

              <div className="min-w-[220px] bg-[#121212] p-4 rounded-[20px] flex items-center gap-4 relative border border-white/5 hover:bg-white/5 transition-colors cursor-pointer snap-start">
                <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-white/5 rounded-full">
                   <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">UEFA Champions</p>
                  <p className="text-xs text-gray-400 mt-0.5">League Room</p>
                  <p className="text-[10px] text-[#00C853] font-bold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" /> 4.3K online
                  </p>
                </div>
              </div>

              <div className="min-w-[220px] bg-[#0a0a0a] p-4 rounded-[20px] flex items-center gap-4 relative border border-dashed border-white/20 hover:bg-white/5 transition-colors cursor-pointer snap-start border-spacing-2">
                <div>
                  <div className="flex gap-1 mb-1">
                     <div className="w-1 h-1 bg-gray-500 rounded-full"/>
                     <div className="w-1 h-1 bg-gray-500 rounded-full"/>
                     <div className="w-1 h-1 bg-gray-500 rounded-full"/>
                  </div>
                  <p className="font-bold text-sm text-white">Add Clubs</p>
                  <p className="text-[10px] text-gray-400 mt-1">Follow clubs to see their rooms here</p>
                </div>
              </div>
            </div>
          </section>

          {/* SCHEDULED TODAY */}
          <section className="mt-12">
             <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-white uppercase">SCHEDULED TODAY</h2>
                <p className="text-xs text-gray-400 mt-1">Upcoming spaces you won't want to miss</p>
              </div>
              <span className="text-xs text-[#00C853] font-bold hover:text-white cursor-pointer transition-colors">See all &gt;</span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 hover-scrollbar snap-x">
              
              <div className="min-w-[260px] md:min-w-[300px] h-[200px] rounded-[24px] relative overflow-hidden group snap-start shrink-0 border border-white/5">
                 <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-10" />
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop')] bg-cover bg-right opacity-40 group-hover:scale-105 transition-transform duration-700" />
                 
                 <div className="relative z-20 p-5 h-full flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-1 rounded-full bg-black/50 border border-[#00E5FF]/30 text-[10px] font-bold text-[#00E5FF] mb-3 inline-block">
                        7:00 PM
                      </span>
                      <h4 className="font-bold text-lg text-white leading-tight mb-1">UCL Semi-final Preview Show</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Starts in 2h 15m</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <img className="w-5 h-5 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=N" alt="user"/>
                          <img className="w-5 h-5 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=O" alt="user"/>
                          <img className="w-5 h-5 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=P" alt="user"/>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold">+1.2K</span>
                      </div>
                      <button className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors flex justify-center items-center gap-2">
                         <Bell className="w-3 h-3" /> Remind Me
                      </button>
                    </div>
                 </div>
              </div>

              <div className="min-w-[260px] md:min-w-[300px] h-[200px] rounded-[24px] relative overflow-hidden group snap-start shrink-0 border border-white/5">
                 <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#2e1505]/40 z-10" />
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=800&auto=format&fit=crop')] bg-cover bg-right opacity-40 group-hover:scale-105 transition-transform duration-700" />
                 
                 <div className="relative z-20 p-5 h-full flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-1 rounded-full bg-black/50 border border-[#FF7F50]/30 text-[10px] font-bold text-[#FF7F50] mb-3 inline-block">
                        8:30 PM
                      </span>
                      <h4 className="font-bold text-lg text-white leading-tight mb-1">Transfer Deadline Live Talk</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Starts in 3h 45m</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <img className="w-5 h-5 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Q" alt="user"/>
                          <img className="w-5 h-5 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=R" alt="user"/>
                          <img className="w-5 h-5 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=S" alt="user"/>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold">+2.3K</span>
                      </div>
                      <button className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors flex justify-center items-center gap-2">
                         <Bell className="w-3 h-3" /> Remind Me
                      </button>
                    </div>
                 </div>
              </div>

               <div className="min-w-[260px] md:min-w-[300px] h-[200px] rounded-[24px] relative overflow-hidden group snap-start shrink-0 border border-white/5">
                 <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#1e0a2b]/40 z-10" />
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=800&auto=format&fit=crop')] bg-cover bg-right opacity-40 group-hover:scale-105 transition-transform duration-700" />
                 
                 <div className="relative z-20 p-5 h-full flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-1 rounded-full bg-black/50 border border-[#6200EA]/30 text-[10px] font-bold text-[#6200EA] mb-3 inline-block">
                        10:00 PM
                      </span>
                      <h4 className="font-bold text-lg text-white leading-tight mb-1">La Liga Title Race Debate</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Starts in 5h 15m</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <img className="w-5 h-5 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=T" alt="user"/>
                          <img className="w-5 h-5 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=U" alt="user"/>
                          <img className="w-5 h-5 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=V" alt="user"/>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold">+980</span>
                      </div>
                      <button className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors flex justify-center items-center gap-2">
                         <Bell className="w-3 h-3" /> Remind Me
                      </button>
                    </div>
                 </div>
              </div>

            </div>
          </section>

          {/* HIGHLIGHTS & REPLAYS */}
          <section className="mt-12">
             <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-white uppercase">HIGHLIGHTS & REPLAYS</h2>
                <p className="text-xs text-gray-400 mt-1">Catch the best moments from past stands</p>
              </div>
              <span className="text-xs text-[#00C853] font-bold hover:text-white cursor-pointer transition-colors">See all &gt;</span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 hover-scrollbar snap-x">
              <div className="min-w-[240px] md:min-w-[280px] space-y-3 group cursor-pointer snap-start shrink-0">
                <div className="w-full aspect-video rounded-2xl bg-gray-800 relative overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold border border-white/10">31:45</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#00C853] flex items-center justify-center shadow-[0_0_20px_rgba(0,200,83,0.4)] group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-black ml-0.5" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight text-white mb-1">Man City fans react to the derby defeat</h4>
                  <p className="text-[10px] text-gray-500">Yesterday • 12K plays</p>
                </div>
              </div>

               <div className="min-w-[240px] md:min-w-[280px] space-y-3 group cursor-pointer snap-start shrink-0">
                <div className="w-full aspect-video rounded-2xl bg-gray-800 relative overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold border border-white/10">28:12</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#00C853] flex items-center justify-center shadow-[0_0_20px_rgba(0,200,83,0.4)] group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-black ml-0.5" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight text-white mb-1">Arteta post-match tactical breakdown</h4>
                  <p className="text-[10px] text-gray-500">Yesterday • 8.7K plays</p>
                </div>
              </div>

               <div className="min-w-[240px] md:min-w-[280px] space-y-3 group cursor-pointer snap-start shrink-0">
                <div className="w-full aspect-video rounded-2xl bg-gray-800 relative overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold border border-white/10">45:10</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#00C853] flex items-center justify-center shadow-[0_0_20px_rgba(0,200,83,0.4)] group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-black ml-0.5" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight text-white mb-1">Was the VAR call a robbery?</h4>
                  <p className="text-[10px] text-gray-500">2d ago • 15K plays</p>
                </div>
              </div>

            </div>
          </section>

          {/* TRENDING VOICES */}
          <section className="mt-12 pb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-white uppercase">TRENDING VOICES</h2>
                <p className="text-xs text-gray-400 mt-1">Top fan hosts and voices on The Stand</p>
              </div>
              <span className="text-xs text-[#00C853] font-bold hover:text-white cursor-pointer transition-colors">See all &gt;</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 hover-scrollbar snap-x">
              <div className="min-w-[160px] bg-[#121212] rounded-2xl p-4 flex flex-col items-center border border-white/5 snap-start">
                <div className="relative mb-3">
                  <img className="w-14 h-14 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pundit" alt="User" />
                  <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-[#6200EA] border-2 border-[#121212] flex items-center justify-center">
                    <Mic className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-[11px] text-center mb-0.5">Football Pundit</h4>
                <p className="text-[9px] text-gray-500 mb-4">23.4K followers</p>
                <button className="w-full py-2 rounded-lg bg-[#00603A] text-[#00C853] border border-[#00C853]/30 text-[10px] font-bold hover:bg-[#00C853] hover:text-black transition-colors flex items-center justify-center gap-1">
                  <Bell className="w-3 h-3" /> Follow
                </button>
              </div>

              <div className="min-w-[160px] bg-[#121212] rounded-2xl p-4 flex flex-col items-center border border-white/5 snap-start">
                <div className="relative mb-3">
                  <img className="w-14 h-14 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Analyst" alt="User" />
                  <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-[#FF6D00] border-2 border-[#121212] flex items-center justify-center">
                    <Mic className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-[11px] text-center mb-0.5">The Footy Analyst</h4>
                <p className="text-[9px] text-gray-500 mb-4">18.7K followers</p>
                <button className="w-full py-2 rounded-lg bg-[#00603A] text-[#00C853] border border-[#00C853]/30 text-[10px] font-bold hover:bg-[#00C853] hover:text-black transition-colors flex items-center justify-center gap-1">
                  <Bell className="w-3 h-3" /> Follow
                </button>
              </div>

              <div className="min-w-[160px] bg-[#121212] rounded-2xl p-4 flex flex-col items-center border border-white/5 snap-start">
                <div className="relative mb-3">
                  <img className="w-14 h-14 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tomi" alt="User" />
                  <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-[#00C853] border-2 border-[#121212] flex items-center justify-center">
                    <Mic className="w-3 h-3 text-black" />
                  </div>
                </div>
                <h4 className="font-bold text-[11px] text-center mb-0.5">Tactical Tomi</h4>
                <p className="text-[9px] text-gray-500 mb-4">15.2K followers</p>
                <button className="w-full py-2 rounded-lg bg-[#00603A] text-[#00C853] border border-[#00C853]/30 text-[10px] font-bold hover:bg-[#00C853] hover:text-black transition-colors flex items-center justify-center gap-1">
                  <Bell className="w-3 h-3" /> Follow
                </button>
              </div>

               <div className="min-w-[160px] bg-[#121212] rounded-2xl p-4 flex flex-col items-center border border-white/5 snap-start">
                <div className="relative mb-3">
                  <img className="w-14 h-14 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=UTD" alt="User" />
                  <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-[#6200EA] border-2 border-[#121212] flex items-center justify-center">
                    <Mic className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-[11px] text-center mb-0.5">UTD Faithful</h4>
                <p className="text-[9px] text-gray-500 mb-4">21.1K followers</p>
                <button className="w-full py-2 rounded-lg bg-[#00603A] text-[#00C853] border border-[#00C853]/30 text-[10px] font-bold hover:bg-[#00C853] hover:text-black transition-colors flex items-center justify-center gap-1">
                  <Bell className="w-3 h-3" /> Follow
                </button>
              </div>
            </div>
          </section>

    </div>
    </div>
  );
}
