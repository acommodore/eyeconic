import Link from "next/link";
import { Clock, Bell } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 text-white min-h-screen bg-[#050505]">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Main Column (Live Matches) */}
        <div className="xl:col-span-8 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold tracking-widest text-[#00E5FF] flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#00E5FF] rounded-full" />
                LIVE MATCH SCORES
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Featured Live Match Card */}
              <Link href="/match/1" className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-gray-800 to-[#121212] border border-white/10 group block lg:col-span-2 aspect-[16/9] lg:aspect-[21/9]">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                
                <div className="relative z-20 p-6 md:p-8 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1.5 rounded-lg bg-[#FF7F50] text-sm font-bold text-white flex items-center gap-2 shadow-[0_0_15px_rgba(255,79,0,0.5)]">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> MATCH LIVE
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm font-bold border border-[#00E5FF]/30">
                      98 VIBE
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-[#00E5FF] text-sm font-bold mb-1 tracking-wider drop-shadow-md">PREMIER LEAGUE</p>
                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-lg">ARS 2:1 TOT</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300 text-xl font-mono drop-shadow-md">82:14</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Secondary Live Match */}
              <div className="glass rounded-3xl p-6 flex flex-col justify-between hover:bg-white/5 transition-colors border border-white/5">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 rounded bg-[#FF7F50] text-xs font-bold text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
                  </span>
                  <span className="px-2 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold">65 VIBE</span>
                </div>
                
                <div className="my-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 border border-white/10 flex items-center justify-center font-bold text-sm p-1.5">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" className="w-full h-full object-contain" alt="INT" />
                      </div>
                      <span className="font-bold text-xl">INT</span>
                    </div>
                    <span className="text-3xl font-black">0 - 0</span>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-xl">MIL</span>
                      <div className="w-12 h-12 rounded-full bg-white border border-white/10 flex items-center justify-center font-bold text-sm p-1.5">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" className="w-full h-full object-contain" alt="MIL" />
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 font-mono mt-4">32:00</p>
                </div>
                
                <Link href="/match/2" className="w-full bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl hover:bg-white/10 transition-all text-center block">
                  ENTER MATCH CENTRE
                </Link>
              </div>

               {/* Tertiary Live Match */}
               <div className="glass rounded-3xl p-6 flex flex-col justify-between hover:bg-white/5 transition-colors border border-white/5">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 rounded bg-[#FF7F50] text-xs font-bold text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
                  </span>
                  <span className="px-2 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold">88 VIBE</span>
                </div>
                
                <div className="my-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white border border-white/10 flex items-center justify-center font-bold text-sm p-1.5">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" className="w-full h-full object-contain" alt="RMA" />
                      </div>
                      <span className="font-bold text-xl">RMA</span>
                    </div>
                    <span className="text-3xl font-black">2 - 1</span>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-xl">BAR</span>
                      <div className="w-12 h-12 rounded-full bg-white border border-white/10 flex items-center justify-center font-bold text-sm p-1.5">
                        <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" className="w-full h-full object-contain" alt="BAR" />
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-[#FF7F50] font-mono mt-4">76:00 (High Chaos)</p>
                </div>
                
                <Link href="/match/3" className="w-full bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl hover:bg-white/10 transition-all text-center block">
                  ENTER MATCH CENTRE
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="xl:col-span-4 space-y-8">
          <section className="glass p-6 rounded-3xl border border-white/5">
            <h2 className="text-sm font-bold tracking-widest text-white flex items-center gap-2 mb-6">
              <div className="w-1.5 h-4 bg-white rounded-full" />
              TOP SCORERS (LIVE)
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 font-bold flex items-center justify-center text-xs">HA</div>
                  <span className="text-sm font-bold">E. Haaland</span>
                </div>
                <span className="font-bold text-[#00E5FF]">2 Goals</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 font-bold flex items-center justify-center text-xs">SA</div>
                  <span className="text-sm font-bold">B. Saka</span>
                </div>
                <span className="font-bold text-[#00E5FF]">1 Goal, 1 Ast</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
