import { Settings, Shield, Edit2, Medal, Activity, Crosshair, Flame, Trophy, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen text-white space-y-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-[0.2em] uppercase drop-shadow-md">OPERATIVE PROFILE</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[10px] text-[#00E5FF] font-mono tracking-widest uppercase">ID: 8492-AX</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-all duration-300 p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:rotate-90">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* 1. CINEMATIC HERO IDENTITY CARD */}
      <section className="relative w-full rounded-[32px] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-1000 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#00E5FF]/20 z-0 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-0" />

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-10">
          
          {/* Avatar Container */}
          <div className="relative shrink-0 group/avatar">
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#00E5FF] to-[#FF7F50] animate-[spin_4s_linear_infinite] opacity-50 group-hover/avatar:opacity-100 transition-opacity" />
            <div className="absolute inset-0 rounded-full border border-white/20 bg-black/50 backdrop-blur-md" />
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#050505]">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" alt="Operative" className="w-full h-full object-cover filter grayscale group-hover/avatar:grayscale-0 transition-all duration-500" />
            </div>
            
            <button className="absolute bottom-2 right-2 w-12 h-12 bg-white rounded-full border-4 border-[#050505] flex items-center justify-center hover:scale-110 hover:bg-[#00E5FF] transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)] z-20 group/edit">
              <Edit2 className="w-5 h-5 text-black group-hover/edit:text-white" />
            </button>
            
            {/* Level Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#050505] border border-white/20 px-4 py-1.5 rounded-full z-20 flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <span className="text-[#00E5FF] font-black text-xs tracking-widest uppercase">Level 42</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full mt-4 md:mt-0">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none drop-shadow-2xl">
              MAXIMUS<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">PRIME</span>
            </h2>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF7F50] tracking-widest uppercase">
                <Flame className="w-3 h-3" /> ELITE INSTIGATOR
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#00E5FF] tracking-widest uppercase">
                <Shield className="w-3 h-3" /> TACTICAL MASTER
              </div>
            </div>
          </div>

          {/* Right side stats/loyalty */}
          <div className="w-full md:w-80 flex flex-col gap-6 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shrink-0">
             <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
               <span className="text-gray-400">Next Rank: <span className="text-white">Titan</span></span>
               <span className="text-[#00E5FF]">8,420 XP</span>
             </div>
             
             {/* Dynamic Progress Bar */}
             <div className="h-4 w-full bg-black rounded-full overflow-hidden border border-white/10 relative">
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBMMjAgMEgxMEwwIDEwVjIwWiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIi8+PC9zdmc+')] opacity-20 pointer-events-none" />
               <div className="h-full w-[75%] bg-gradient-to-r from-[#00E5FF] to-[#FF7F50] shadow-[0_0_15px_rgba(0,229,255,0.6)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] -translate-x-full" />
               </div>
             </div>
             
             <button className="w-full py-3 bg-white hover:bg-gray-200 text-black text-xs font-black tracking-[0.2em] rounded-xl transition-colors uppercase flex justify-center items-center gap-2">
               Apply for Press Pass <ChevronRight className="w-4 h-4" />
             </button>
          </div>

        </div>
      </section>

      {/* 2. STATS GRID */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "EYE ACCURACY", value: "88%", icon: Crosshair, color: "text-[#00E5FF]", border: "border-[#00E5FF]/20" },
          { label: "VIBE RATING", value: "9.2", icon: Activity, color: "text-[#FF7F50]", border: "border-[#FF7F50]/20" },
          { label: "MATCHES RATED", value: "142", icon: Shield, color: "text-white", border: "border-white/10" },
          { label: "GLOBAL RANK", value: "#482", icon: Trophy, color: "text-[#FFD700]", border: "border-[#FFD700]/20" },
        ].map((stat, i) => (
          <div key={i} className={`flex flex-col justify-between p-6 bg-[#0A0A0A] rounded-3xl border ${stat.border} hover:bg-white/5 transition-all group overflow-hidden relative`}>
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <stat.icon className={`w-16 h-16 ${stat.color} -rotate-12`} />
             </div>
             <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase relative z-10">{stat.label}</span>
             <span className={`text-4xl md:text-5xl font-mono font-black mt-4 relative z-10 ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </section>

      {/* 3. TACTICAL FEED & VAULT */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Tactical Feed (Left 3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-3 pl-2">
            <div className="w-2 h-2 bg-[#00E5FF] rotate-45" />
            <h3 className="text-sm font-black tracking-widest text-white uppercase drop-shadow-md">TACTICAL INTEL</h3>
          </div>
          
          <div className="space-y-4">
            
            <div className="flex gap-6 p-6 bg-[#0A0A0A] rounded-[24px] border border-white/5 hover:border-white/20 transition-colors group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[24px]" />
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/50 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                  <Zap className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div className="w-[1px] h-full bg-gradient-to-b from-[#00E5FF]/50 to-transparent mt-2" />
              </div>
              <div className="flex flex-col w-full relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-black text-[#00E5FF] tracking-widest uppercase">ELITE PREDICTION</span>
                  <span className="text-[10px] text-gray-500 font-mono">2H AGO</span>
                </div>
                <p className="text-sm text-gray-300 font-medium">Successfully predicted a clean sheet for the Alliance defense against Titan Rivals. Tactical foresight verified.</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="bg-[#00E5FF]/10 text-[#00E5FF] px-3 py-1 rounded-lg text-[10px] font-black tracking-widest">+50 XP</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-[#0A0A0A] rounded-[24px] border border-white/5 hover:border-white/20 transition-colors group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF7F50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[24px]" />
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF7F50]/20 border border-[#FF7F50]/50 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(255,127,80,0.2)]">
                  <Flame className="w-5 h-5 text-[#FF7F50]" />
                </div>
                <div className="w-[1px] h-full bg-gradient-to-b from-[#FF7F50]/50 to-transparent mt-2" />
              </div>
              <div className="flex flex-col w-full relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-black text-[#FF7F50] tracking-widest uppercase">RIVALRY FLARE</span>
                  <span className="text-[10px] text-gray-500 font-mono">YESTERDAY</span>
                </div>
                <p className="text-sm text-gray-300 font-medium">Instigated chaos by uncovering a major flaw in the high defensive line structure of RMA.</p>
              </div>
            </div>

          </div>
        </div>

        {/* The Vault - Medals (Right 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pl-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rotate-45" />
              <h3 className="text-sm font-black tracking-widest text-white uppercase drop-shadow-md">THE VAULT</h3>
            </div>
            <span className="text-[10px] font-bold text-gray-500">12 UNLOCKED</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-[#0A0A0A] rounded-2xl flex flex-col items-center justify-center border border-white/5 hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Medal className={`w-10 h-10 mb-2 ${i % 3 === 0 ? 'text-[#FF7F50] drop-shadow-[0_0_15px_rgba(255,127,80,0.6)]' : 'text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]'} group-hover:scale-110 group-hover:-translate-y-1 transition-transform`} />
                <span className="text-[8px] font-bold text-gray-500 tracking-widest uppercase group-hover:text-white transition-colors">{i % 3 === 0 ? 'Chaos' : 'Tactics'} {i}</span>
              </div>
            ))}
            {/* Locked spots */}
            {[7, 8, 9].map((i) => (
              <div key={i} className="aspect-square bg-[#050505] rounded-2xl flex items-center justify-center border border-dashed border-white/10 opacity-30">
                <Medal className="w-8 h-8 text-gray-700" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
