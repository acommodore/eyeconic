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

  const handlePushAgenda = () => {
    router.push("/stands/moderate");
  };

  const getHeatColor = () => {
     if (heatLevel < 30) return 'from-teal to-blue-500';
     if (heatLevel < 70) return 'from-yellow-400 to-orange-500';
     return 'from-coral to-red-600';
  };

  const getHeatShadow = () => {
     if (heatLevel < 30) return 'shadow-[0_0_30px_rgba(0,229,255,0.3)]';
     if (heatLevel < 70) return 'shadow-[0_0_30px_rgba(250,204,21,0.3)]';
     return 'shadow-[0_0_40px_rgba(255,107,107,0.5)]';
  };

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col font-sans selection:bg-teal selection:text-black overflow-x-hidden relative">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-0 pointer-events-none" />
      <div className={`fixed top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br ${getHeatColor()} rounded-full blur-[150px] opacity-10 pointer-events-none transition-colors duration-1000 z-0`} />

      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5 px-4 py-4 md:px-8 shadow-2xl relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="flex items-center justify-between max-w-3xl mx-auto w-full relative z-10">
           <button onClick={() => router.back()} className="group w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md">
             <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
           </button>
          
           <div className="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="flex items-center gap-2">
                 <Zap className="w-3.5 h-3.5 text-teal animate-pulse" />
                 <h1 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 drop-shadow-lg">
                   Push Agenda
                 </h1>
              </div>
           </div>
          
          <div className="w-10 h-10 rounded-full border border-white/10 relative z-10 flex-shrink-0 bg-black overflow-hidden hover:scale-105 hover:border-white/30 transition-all shadow-xl cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aye" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-3xl mx-auto w-full flex flex-col gap-6 md:gap-8 mt-2 md:mt-4 pb-40 flex-1 relative z-10">
        
        {/* Match Selection (Cinematic Glassmorphism) */}
        <div className="w-full bg-gradient-to-br from-white/[0.05] to-black/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex items-center justify-between hover:border-white/20 transition-all cursor-pointer group shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="flex -space-x-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-black/60 flex items-center justify-center p-2.5 border border-white/20 z-0 group-hover:-translate-x-2 transition-transform duration-500 shadow-2xl backdrop-blur-md">
                <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" alt="MCI" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-black/60 flex items-center justify-center p-2.5 border border-white/20 z-10 group-hover:translate-x-2 transition-transform duration-500 shadow-2xl backdrop-blur-md">
                <img src="https://upload.wikimedia.org/wikipedia/en/5/3/33/Arsenal_FC.svg" alt="ARS" className="w-full h-full object-contain drop-shadow-md" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black tracking-[0.2em] text-teal uppercase mb-1 flex items-center gap-1.5 opacity-80">
                 <div className="w-1 h-1 rounded-full bg-teal animate-pulse" /> TARGET MATCH
              </span>
              <span className="text-base md:text-xl font-black uppercase tracking-widest text-white drop-shadow-lg">
                 MCI <span className="text-white/30 mx-1">VS</span> ARS
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all relative z-10">
            <ChevronDown className="w-5 h-5 text-white/70" />
          </div>
        </div>

        {/* Agenda Title */}
        <div className="flex flex-col gap-4 relative bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl overflow-hidden group focus-within:border-white/30 transition-colors">
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
            className="w-full bg-transparent border-none px-0 py-4 text-3xl md:text-5xl font-black uppercase tracking-tighter focus:outline-none focus:ring-0 transition-all placeholder:text-white/10 resize-none leading-[1.1] text-white drop-shadow-2xl relative z-10"
          />
        </div>

        {/* Visuals / Cover */}
        <div className="flex flex-col gap-4 relative bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
          <label className="text-[10px] md:text-xs font-black tracking-widest text-white/60 uppercase flex items-center justify-between">
            <span className="flex items-center gap-2"><Camera className="w-3.5 h-3.5 text-white/40" /> VISUAL EVIDENCE</span>
            <span className="text-[9px] text-white/40 tracking-[0.2em] font-mono">OPTIONAL</span>
          </label>
          <button 
            onClick={() => setHasCover(!hasCover)}
            className={`w-full aspect-[21/9] rounded-2xl border flex flex-col items-center justify-center gap-4 transition-all duration-500 overflow-hidden relative group ${hasCover ? 'border-teal/50 bg-teal/5' : 'border-white/10 border-dashed bg-white/[0.02] hover:border-white/30 hover:bg-white/5'}`}
          >
            {hasCover && <div className="absolute inset-0 bg-gradient-to-tr from-teal/20 to-transparent opacity-50" />}
            
            <div className={`p-4 rounded-full transition-transform duration-500 relative z-10 ${hasCover ? 'bg-teal/20 text-teal scale-110 shadow-[0_0_30px_rgba(0,229,255,0.3)]' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:scale-110'}`}>
               <Camera className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className={`text-[10px] md:text-xs font-black tracking-[0.2em] uppercase relative z-10 ${hasCover ? 'text-teal drop-shadow-md' : 'text-white/40'}`}>
              {hasCover ? "EVIDENCE ATTACHED" : "DROP MEDIA HERE"}
            </span>
          </button>
        </div>

        {/* Heat Level Slider */}
        <div className="flex flex-col gap-8 relative bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl overflow-hidden">
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${getHeatColor()} blur-[100px] opacity-10 pointer-events-none transition-colors duration-1000`} />
          
          <div className="flex items-center justify-between relative z-10">
            <label className="text-[10px] md:text-xs font-black tracking-widest text-white/60 uppercase flex items-center gap-2">
              <Flame className={`w-4 h-4 transition-colors duration-500 ${heatLevel > 75 ? 'text-coral animate-pulse' : heatLevel > 30 ? 'text-yellow-400' : 'text-teal'}`} /> 
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
                  background: `linear-gradient(to right, ${heatLevel > 75 ? '#FF6B6B' : heatLevel > 30 ? '#FACC15' : '#00E5FF'} ${heatLevel}%, rgba(255,255,255,0.1) ${heatLevel}%)` 
               }}
             />
             {/* Custom Thumb Styling using CSS in global or just rely on native for now with background trick above */}
          </div>
          
          <div className="flex justify-between text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 relative z-10">
            <span className={heatLevel < 30 ? 'text-teal' : ''}>CIVIL DEBATE</span>
            <span className={heatLevel >= 30 && heatLevel <= 75 ? 'text-yellow-400' : ''}>HEATED</span>
            <span className={heatLevel > 75 ? 'text-coral' : ''}>ABSOLUTE CHAOS</span>
          </div>
        </div>

      </main>

      {/* Floating Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 z-50 pointer-events-none flex justify-center">
         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />
        <div className="max-w-3xl w-full pointer-events-auto relative z-10">
          <button 
            onClick={handlePushAgenda}
            className={`group w-full bg-gradient-to-r ${getHeatColor()} text-white py-5 md:py-6 rounded-[2rem] font-black text-sm md:text-lg tracking-[0.3em] uppercase hover:brightness-110 transition-all duration-300 ${getHeatShadow()} hover:shadow-[0_20px_60px_rgba(255,107,107,0.4)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3 border border-white/20 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:scale-110 transition-transform duration-500" />
            <span className="relative z-10">DEPLOY AGENDA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
