"use client";

import { useState } from "react";
import { ArrowLeft, Flame, AlertTriangle, ChevronDown, Camera } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col font-sans">
      {/* Brutalist Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-white/10">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
           <button onClick={() => router.back()} className="text-white hover:text-coral transition-colors p-2 -ml-2">
             <ArrowLeft className="w-6 h-6" />
           </button>
          
          <h1 className="text-sm font-black tracking-[0.3em] uppercase text-coral text-center absolute left-0 right-0 z-0 pointer-events-none drop-shadow-[0_0_10px_rgba(255,107,107,0.5)]">
            PUSH AN AGENDA
          </h1>
          
          <div className="w-8 h-8 rounded-none border-2 border-white relative z-10 flex-shrink-0 bg-black overflow-hidden grayscale hover:grayscale-0 transition-all">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aye" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-2xl mx-auto w-full flex flex-col gap-10 mt-4 md:mt-8 pb-32 flex-1">
        
        {/* Match Selection (Compact) */}
        <div className="w-full border-2 border-white/20 bg-white/5 p-4 flex items-center justify-between hover:border-coral transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-white flex items-center justify-center p-1.5 border border-black z-0 group-hover:-translate-x-1 transition-transform">
                <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" alt="MCI" className="w-full h-full object-contain" />
              </div>
              <div className="w-10 h-10 bg-white flex items-center justify-center p-1.5 border border-black z-10 group-hover:translate-x-1 transition-transform">
                <img src="https://upload.wikimedia.org/wikipedia/en/5/3/33/Arsenal_FC.svg" alt="ARS" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Target Match</span>
              <span className="text-lg font-black uppercase tracking-wider">MCI <span className="text-coral">VS</span> ARS</span>
            </div>
          </div>
          <ChevronDown className="w-6 h-6 text-white/50 group-hover:text-coral transition-colors" />
        </div>

        {/* Agenda Title (Massive Input) */}
        <div className="flex flex-col gap-3 relative">
          <div className="flex items-center justify-between">
            <label className="text-sm font-black tracking-[0.2em] text-white uppercase flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-coral" /> The Agenda
            </label>
            <span className="text-xs font-mono font-bold text-white/40">{agendaTitle.length}/40</span>
          </div>
          <textarea 
            placeholder="E.g. PALMER IS THE SYSTEM." 
            maxLength={40}
            rows={2}
            value={agendaTitle}
            onChange={(e) => setAgendaTitle(e.target.value)}
            className="w-full bg-transparent border-b-4 border-white/20 px-0 py-4 text-3xl md:text-5xl font-black uppercase focus:outline-none focus:border-coral transition-all placeholder:text-white/20 resize-none leading-none"
          />
        </div>

        {/* Visuals / Cover */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-black tracking-[0.2em] text-white uppercase flex items-center justify-between">
            <span>Visual Evidence</span>
            <span className="text-[10px] bg-white/10 px-2 py-1 tracking-widest text-white/50">OPTIONAL</span>
          </label>
          <button 
            onClick={() => setHasCover(!hasCover)}
            className={`w-full aspect-[21/9] border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${hasCover ? 'border-coral bg-coral/10' : 'border-white/20 bg-white/5 hover:border-white/50 hover:bg-white/10'}`}
          >
            <Camera className={`w-8 h-8 ${hasCover ? 'text-coral' : 'text-white/40'}`} />
            <span className={`text-xs font-bold tracking-widest uppercase ${hasCover ? 'text-coral' : 'text-white/40'}`}>
              {hasCover ? "EVIDENCE ATTACHED" : "UPLOAD IMAGE / VIDEO"}
            </span>
          </button>
        </div>

        {/* Heat Level Slider */}
        <div className="flex flex-col gap-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <label className="text-sm font-black tracking-[0.2em] text-white uppercase flex items-center gap-2">
              <Flame className={`w-5 h-5 ${heatLevel > 75 ? 'text-coral animate-pulse' : 'text-white/50'}`} /> 
              Toxicity / Heat Level
            </label>
            <span className={`text-xl font-black font-mono ${heatLevel > 75 ? 'text-coral' : 'text-white'}`}>{heatLevel}%</span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={heatLevel}
            onChange={(e) => setHeatLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-none appearance-none cursor-pointer accent-coral"
          />
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
            <span>Civil Debate</span>
            <span>Absolute Chaos</span>
          </div>
        </div>

      </main>

      {/* Brutalist Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-black border-t-2 border-white/10 z-50">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={handlePushAgenda}
            className="w-full bg-coral text-black py-5 font-black text-xl tracking-[0.3em] uppercase hover:bg-white transition-all shadow-[0_0_40px_rgba(255,107,107,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
          >
            <AlertTriangle className="w-6 h-6" />
            GO LIVE
          </button>
        </div>
      </div>
    </div>
  );
}
