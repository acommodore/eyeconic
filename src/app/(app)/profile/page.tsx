import { Settings, Shield, Edit2, Medal } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black tracking-widest text-white">PROFILE</h1>
        <button className="text-gray-400 hover:text-[#00E5FF] transition-colors p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Top Hero Section */}
      <div className="glass rounded-3xl p-8 mb-8 border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        {/* Avatar */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0">
          <div className="absolute inset-0 rounded-full border-4 border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.3)]" />
          <div className="absolute inset-2 bg-gray-800 rounded-full overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="Maximus Prime" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#00E5FF] rounded-full border-4 border-[#121212] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <Edit2 className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Info & Stats */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase text-white mb-2 drop-shadow-md">MAXIMUS PRIME</h2>
          <div className="flex items-center gap-2 text-sm font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-4 py-1.5 rounded-full border border-[#00E5FF]/30 mb-8">
            <Shield className="w-4 h-4" />
            <span>LVL 42 ELITE FAN</span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 w-full">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-gray-500 font-bold tracking-widest mb-2">EYE ACCURACY</span>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#00E5FF" strokeWidth="4" strokeDasharray="175" strokeDashoffset="21" className="drop-shadow-[0_0_8px_#00E5FF]" />
                  </svg>
                  <span className="text-[#00E5FF] font-black text-xl">88%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-gray-500 font-bold tracking-widest mb-2">VIBE RATING</span>
              <div className="h-16 flex items-center">
                 <span className="text-5xl drop-shadow-[0_0_20px_#FF7F50]">🔥</span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-gray-500 font-bold tracking-widest mb-2">MATCHES RATED</span>
              <span className="text-4xl font-black text-white h-16 flex items-center">142</span>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <span className="text-xs text-gray-500 font-bold tracking-widest mb-2">GLOBAL RANK</span>
              <span className="text-4xl font-black text-[#FF7F50] h-16 flex items-center drop-shadow-[0_0_10px_rgba(255,79,0,0.5)]">#482</span>
            </div>
          </div>

          {/* Loyalty Progress */}
          <div className="w-full mt-8 max-w-2xl hidden md:block">
            <div className="flex justify-between text-xs font-bold mb-3">
              <span className="text-gray-400">LOYALTY PROGRESS</span>
              <span className="text-[#00E5FF]">LVL 42</span>
            </div>
            <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <div className="h-full w-[70%] bg-gradient-to-r from-[#00E5FF] to-[#FF7F50] shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
            </div>
          </div>
        </div>
      </div>

      <button className="w-full md:w-auto glass rounded-xl px-12 py-5 flex items-center justify-center gap-3 text-sm font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all mb-12 border border-white/10 mx-auto md:mx-0 shadow-lg">
        <Shield className="w-5 h-5 text-[#00E5FF]" />
        APPLY FOR PRESS PASS
      </button>

      {/* Desktop 2-Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        
        {/* Tactical Feed */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-[#00E5FF]" />
            <h3 className="text-lg font-bold tracking-widest text-white">TACTICAL FEED</h3>
          </div>
          <div className="space-y-6">
            <div className="border-l-2 border-white/10 pl-8 relative group">
              <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] border-4 border-[#121212]" />
              <div className="flex justify-between items-center text-sm mb-2 bg-[#121212] p-4 rounded-2xl border border-white/5 group-hover:bg-white/5 transition-colors">
                <div>
                  <span className="font-bold text-[#00E5FF] block mb-1">ELITE PREDICTION</span>
                  <p className="text-base text-gray-300">Predicted Alliance clean sheet against Titan Rivals.</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 font-mono text-xs block mb-1">2H AGO</span>
                  <span className="text-[#00E5FF] font-bold text-sm bg-[#00E5FF]/10 px-3 py-1 rounded-lg">+50 XP</span>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-white/10 pl-8 relative group">
              <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-[#FF7F50] shadow-[0_0_15px_#FF7F50] border-4 border-[#121212]" />
              <div className="flex justify-between items-center text-sm mb-2 bg-[#121212] p-4 rounded-2xl border border-white/5 group-hover:bg-white/5 transition-colors">
                <div>
                  <span className="font-bold text-[#FF7F50] block mb-1">RIVALRY FLARE</span>
                  <p className="text-base text-gray-300">Spotted tactical flaw in Titan Rivals defense. Intelligence shared.</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 font-mono text-xs block mb-1">YESTERDAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medals */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-white" />
            <h3 className="text-lg font-bold tracking-widest text-white">MEDALS & ACHIEVEMENTS</h3>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-[#121212] rounded-2xl flex items-center justify-center border border-white/5 opacity-70 hover:opacity-100 hover:scale-105 hover:bg-white/5 transition-all cursor-pointer shadow-lg">
                <Medal className={`w-10 h-10 ${i % 3 === 0 ? 'text-[#FF7F50] drop-shadow-[0_0_8px_rgba(255,79,0,0.5)]' : 'text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]'}`} />
              </div>
            ))}
            <div className="aspect-square bg-[#121212] rounded-2xl flex items-center justify-center border border-white/5 opacity-20">
              <Medal className="w-10 h-10 text-white" />
            </div>
            <div className="aspect-square bg-[#121212] rounded-2xl flex items-center justify-center border border-white/5 opacity-20">
              <Medal className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
