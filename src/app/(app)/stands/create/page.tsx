"use client";

import { useState } from "react";
import { ArrowLeft, Flame, AlertTriangle, ChevronDown, Camera, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PushAgendaPage() {
  const router = useRouter();
  const [agendaTitle, setAgendaTitle] = useState("");
  const [heatLevel, setHeatLevel] = useState(50);
  const [hasCover, setHasCover] = useState(false);
  const [isMatchSelectOpen, setIsMatchSelectOpen] = useState(false);
  const [targetMatch, setTargetMatch] = useState({
    team1: "MCI",
    team2: "ARS",
    logo1: "https://crests.football-data.org/65.svg",
    logo2: "https://crests.football-data.org/57.svg"
  });

  const availableMatches = [
    { team1: "MCI", team2: "ARS", logo1: "https://crests.football-data.org/65.svg", logo2: "https://crests.football-data.org/57.svg" },
    { team1: "LIV", team2: "CHE", logo1: "https://crests.football-data.org/64.svg", logo2: "https://crests.football-data.org/61.svg" },
    { team1: "MUN", team2: "TOT", logo1: "https://crests.football-data.org/66.svg", logo2: "https://crests.football-data.org/73.svg" }
  ];

  const handlePushAgenda = () => {
    router.push("/stands/moderate");
  };

  const getHeatColor = () => {
     if (heatLevel < 30) return 'from-[#75fbd9] to-blue-500';
     if (heatLevel < 70) return 'from-yellow-400 to-orange-500';
     return 'from-coral to-red-600';
  };

  const getHeatShadow = () => {
     if (heatLevel < 30) return 'shadow-[0_0_30px_rgba(117, 251, 217,0.3)]';
     if (heatLevel < 70) return 'shadow-[0_0_30px_rgba(250,204,21,0.3)]';
     return 'shadow-[0_0_40px_rgba(255,107,107,0.5)]';
  };

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col font-sans selection:bg-[#75fbd9] selection:text-black overflow-x-hidden relative w-full">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-0 pointer-events-none" />
      <div className={`fixed top-[-10%] left-1/2 -translate-x-1/2 w-[150vw] md:w-[800px] h-[50vw] md:h-[500px] bg-gradient-to-br ${getHeatColor()} rounded-full blur-[100px] md:blur-[150px] opacity-10 pointer-events-none transition-colors duration-1000 z-0`} />

      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5 px-4 pt-20 pb-4 md:pt-6 md:px-8 shadow-2xl relative overflow-hidden w-full">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full relative z-10">
           <button onClick={() => router.back()} className="group w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md shrink-0">
             <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
           </button>
          
           <div className="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="flex items-center gap-2">
                 <Zap className="w-3.5 h-3.5 text-[#75fbd9] animate-pulse" />
                 <h1 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 drop-shadow-lg">
                   Push Agenda
                 </h1>
              </div>
           </div>
          
          <div className="w-10 h-10 rounded-full border border-white/10 relative z-10 shrink-0 bg-black overflow-hidden hover:scale-105 hover:border-white/30 transition-all shadow-xl cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aye" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-5xl mx-auto w-full flex flex-col gap-6 md:gap-8 mt-2 md:mt-4 pb-40 flex-1 relative z-10">
        
        {/* Match Selection (Cinematic Glassmorphism) */}
        <div className="relative z-20">
          <div 
            onClick={() => setIsMatchSelectOpen(!isMatchSelectOpen)}
            className="w-full bg-gradient-to-br from-white/[0.05] to-black/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 flex items-center justify-between hover:border-white/20 transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
          >
          <div className="absolute inset-0 bg-gradient-to-r from-[#75fbd9]/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-black/60 flex items-center justify-center p-2.5 border border-white/20 z-0 group-hover:-translate-x-2 transition-transform duration-500 shadow-2xl backdrop-blur-md">
                <img src={targetMatch.logo1} alt={targetMatch.team1} className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-black/60 flex items-center justify-center p-2.5 border border-white/20 z-10 group-hover:translate-x-2 transition-transform duration-500 shadow-2xl backdrop-blur-md">
                <img src={targetMatch.logo2} alt={targetMatch.team2} className="w-full h-full object-contain drop-shadow-md" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black tracking-[0.2em] text-[#75fbd9] uppercase mb-1 flex items-center gap-1.5 opacity-80">
                 <div className="w-1 h-1 rounded-full bg-[#75fbd9] animate-pulse" /> TARGET MATCH
              </span>
              <span className="text-base md:text-xl font-black uppercase tracking-widest text-white drop-shadow-lg">
                 {targetMatch.team1} <span className="text-white/30 mx-1">VS</span> {targetMatch.team2}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all relative z-10">
            <ChevronDown className={`w-5 h-5 text-white/70 transition-transform duration-300 ${isMatchSelectOpen ? 'rotate-180' : ''}`} />
          </div>
          </div>

          {/* Match Dropdown */}
          {isMatchSelectOpen && (
            <div className="absolute top-full mt-4 left-0 w-full bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-top-4">
              {availableMatches.map((m, idx) => (
                <div 
                  key={idx}
                  onClick={() => { setTargetMatch(m); setIsMatchSelectOpen(false); }}
                  className="w-full p-4 flex items-center gap-4 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <div className="flex -space-x-2">
                    <img src={m.logo1} className="w-8 h-8 rounded-full bg-white/10 p-1 border border-white/20" />
                    <img src={m.logo2} className="w-8 h-8 rounded-full bg-white/10 p-1 border border-white/20 z-10" />
                  </div>
                  <span className="font-black uppercase tracking-widest text-white text-sm">
                    {m.team1} <span className="text-white/30">VS</span> {m.team2}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start relative z-10">
          <div className="flex flex-col gap-6 md:gap-8 lg:col-span-1">
            {/* Agenda Title */}
        <div className="flex flex-col gap-4 relative bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-5 md:p-6 shadow-2xl overflow-hidden group focus-within:border-white/30 transition-colors">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-focus-within:via-teal/50 transition-colors duration-500" />
          
          <div className="flex items-center justify-between relative z-10">
            <label className="text-[10px] md:text-xs font-black tracking-widest text-white/60 uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> THE HEADLINE
            </label>
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
               <span className={`text-[10px] font-mono font-bold ${agendaTitle.length > 35 ? 'text-coral' : 'text-white/50'}`}>{agendaTitle.length}/40</span>
            </div>
          </div>
          <textarea 
            placeholder="E.g. PALMER IS THE SYSTEM." 
            maxLength={40}
            rows={2}
            value={agendaTitle}
            onChange={(e) => setAgendaTitle(e.target.value)}
            className="w-full bg-transparent border-none px-0 py-2 text-2xl md:text-4xl font-black uppercase tracking-tighter focus:outline-none focus:ring-0 transition-all placeholder:text-white/10 resize-none leading-[1.1] text-white drop-shadow-2xl relative z-10"
          />
        </div>
        </div>

          <div className="flex flex-col gap-6 md:gap-8 lg:col-span-1">
        {/* Visuals / Cover */}
        <div className="flex flex-col gap-4 relative bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-5 md:p-6 shadow-2xl">
          <label className="text-[10px] md:text-xs font-black tracking-widest text-white/60 uppercase flex items-center justify-between">
            <span className="flex items-center gap-2"><Camera className="w-3.5 h-3.5 text-white/40" /> VISUAL EVIDENCE</span>
            <span className="text-[9px] text-white/40 tracking-[0.2em] font-mono">OPTIONAL</span>
          </label>
          <button 
            onClick={() => setHasCover(!hasCover)}
            className={`w-full aspect-[21/9] rounded-2xl border flex flex-col items-center justify-center gap-4 transition-all duration-500 overflow-hidden relative group ${hasCover ? 'border-[#75fbd9]/50 bg-[#75fbd9]/5' : 'border-white/10 border-dashed bg-white/[0.02] hover:border-white/30 hover:bg-white/5'}`}
          >
            {hasCover && <div className="absolute inset-0 bg-gradient-to-tr from-[#75fbd9]/20 to-transparent opacity-50" />}
            
            <div className={`p-4 rounded-full transition-transform duration-500 relative z-10 ${hasCover ? 'bg-[#75fbd9]/20 text-[#75fbd9] scale-110 shadow-[0_0_30px_rgba(117, 251, 217,0.3)]' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:scale-110'}`}>
               <Camera className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className={`text-[10px] md:text-xs font-black tracking-[0.2em] uppercase relative z-10 ${hasCover ? 'text-[#75fbd9] drop-shadow-md' : 'text-white/40'}`}>
              {hasCover ? "EVIDENCE ATTACHED" : "DROP MEDIA HERE"}
            </span>
          </button>
        </div>
          </div>
          
          <div className="flex flex-col gap-6 md:gap-8 lg:col-span-1">
            {/* Heat Level Slider */}
        <div className="flex flex-col gap-6 relative bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-5 md:p-6 shadow-2xl overflow-hidden">
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${getHeatColor()} blur-[100px] opacity-10 pointer-events-none transition-colors duration-1000`} />
          
          <div className="flex items-center justify-between relative z-10">
            <label className="text-[10px] md:text-xs font-black tracking-widest text-white/60 uppercase flex items-center gap-2">
              <Flame className={`w-4 h-4 transition-colors duration-500 ${heatLevel > 75 ? 'text-coral animate-pulse' : heatLevel > 30 ? 'text-yellow-400' : 'text-[#75fbd9]'}`} /> 
              AGENDA TEMPERATURE
            </label>
            <div className={`px-4 py-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-md ${getHeatShadow()} transition-all duration-500`}>
               <span className={`text-sm md:text-base font-black font-mono tracking-wider transition-colors duration-500 text-transparent bg-clip-text bg-gradient-to-r ${getHeatColor()}`}>{heatLevel}%</span>
            </div>
          </div>
          
          <div className="relative pt-4 pb-2 z-10">
             <input 
               type="range" 
               min="0" 
               max="100" 
               value={heatLevel}
               onChange={(e) => setHeatLevel(parseInt(e.target.value))}
               className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer outline-none relative z-10"
               style={{ 
                  background: `linear-gradient(to right, ${heatLevel > 75 ? '#FF6B6B' : heatLevel > 30 ? '#FACC15' : '#75fbd9'} ${heatLevel}%, rgba(255,255,255,0.1) ${heatLevel}%)` 
               }}
             />
             {/* Custom Thumb Styling using CSS in global or just rely on native for now with background trick above */}
          </div>
          
          <div className="flex justify-between text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 relative z-10">
            <span className={heatLevel < 30 ? 'text-[#75fbd9]' : ''}>CIVIL DEBATE</span>
            <span className={heatLevel >= 30 && heatLevel <= 75 ? 'text-yellow-400' : ''}>HEATED</span>
            <span className={heatLevel > 75 ? 'text-coral' : ''}>ABSOLUTE CHAOS</span>
          </div>
        </div>

          </div>
        </div>
      </main>

      {/* Floating Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 z-50 pointer-events-none flex justify-center">
         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />
        <div className="max-w-5xl w-full pointer-events-auto relative z-10">
          <button 
            onClick={handlePushAgenda}
            className={`w-full max-w-sm mx-auto bg-[#75fbd9] text-slate-900 py-4 md:py-5 rounded-full font-black text-sm md:text-base tracking-[0.2em] uppercase hover:bg-[#75fbd9]/90 transition-all shadow-[0_0_30px_rgba(117, 251, 217,0.4)] hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-3 border border-[#75fbd9] group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <AlertTriangle className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-500" />
            <span className="relative z-10">GO LIVE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
