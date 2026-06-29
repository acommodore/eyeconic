"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, HeartPulse, Swords, ArrowRight, Play } from "lucide-react";

export function OnboardingModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeen = localStorage.getItem("stimmung_has_seen_onboarding");
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("stimmung_has_seen_onboarding", "true");
    setIsOpen(false);
    router.push('/home');
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-card border border-border rounded-[2.5rem] w-full max-w-md overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
        
        {/* Step Indicators */}
        <div className="absolute top-6 left-0 right-0 flex justify-center gap-2 z-10">
           <div className={`h-1 rounded-full transition-all duration-300 ${step === 0 ? 'w-8 bg-teal shadow-[0_0_8px_rgba(0,229,255,0.8)]' : 'w-4 bg-white/20'}`} />
           <div className={`h-1 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-teal shadow-[0_0_8px_rgba(0,229,255,0.8)]' : 'w-4 bg-white/20'}`} />
           <div className={`h-1 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-teal shadow-[0_0_8px_rgba(0,229,255,0.8)]' : 'w-4 bg-white/20'}`} />
        </div>

        {/* Content Slider */}
        <div className="flex-1 flex w-[300%] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ transform: `translateX(-${step * (100/3)}%)` }}>
          
          {/* STEP 0: Watchability */}
          <div className="w-1/3 p-10 pt-16 flex flex-col items-center text-center">
             <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center mb-6 border border-teal/30 relative">
                <Zap className="w-10 h-10 text-teal" />
                <div className="absolute inset-0 bg-teal/20 rounded-full animate-ping opacity-20" />
             </div>
             <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">The Watchability Score</h2>
             <p className="text-muted-foreground text-sm leading-relaxed">
               Forget possession stats. We rank matches by Chaos, Tension, and Surprise. If a game goes crazy, it hits the top of your feed instantly.
             </p>
          </div>

          {/* STEP 1: Player Pulse */}
          <div className="w-1/3 p-10 pt-16 flex flex-col items-center text-center">
             <div className="w-24 h-24 bg-coral/10 rounded-full flex items-center justify-center mb-6 border border-coral/30">
                <HeartPulse className="w-10 h-10 text-coral" />
             </div>
             <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">The Player Pulse</h2>
             <p className="text-muted-foreground text-sm leading-relaxed">
               When you're in a match, pull up the bottom drawer. You can rate players live and see exactly who is the Hero, and who is the Villain.
             </p>
          </div>

          {/* STEP 2: The Stand */}
          <div className="w-1/3 p-10 pt-16 flex flex-col items-center text-center">
             <div className="w-24 h-24 bg-[#a855f7]/10 rounded-full flex items-center justify-center mb-6 border border-[#a855f7]/30 relative overflow-hidden">
                <Swords className="w-10 h-10 text-[#a855f7]" />
             </div>
             <h2 className="text-2xl font-black uppercase tracking-widest text-foreground mb-4">Enter The Stand</h2>
             <p className="text-muted-foreground text-sm leading-relaxed">
               Leave a Voice Note reaction to a specific moment. Other fans can "Echo" your note if they agree. Speak your truth, filter by tribe.
             </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 flex flex-col gap-4">
          <button 
            onClick={handleNext}
            className="w-full bg-foreground text-background font-black uppercase tracking-widest py-4 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 cursor-pointer"
          >
             {step === 2 ? 'ENTER STIMMUNG' : 'NEXT'} {step === 2 ? <Play className="w-4 h-4 fill-background" /> : <ArrowRight className="w-4 h-4" />}
          </button>
          <button 
            onClick={handleClose}
            className="w-full text-[10px] font-black tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
             SKIP INTRO
          </button>
        </div>

      </div>
    </div>
  );
}
