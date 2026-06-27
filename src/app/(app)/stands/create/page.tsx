"use client";

import { useState } from "react";
import { ArrowLeft, Upload, CheckCircle2, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StartStandPage() {
  const router = useRouter();
  const [standName, setStandName] = useState("");
  const [cover, setCover] = useState("classic"); // 'upload' or 'classic'

  const handlePushAgenda = () => {
    // Navigate to the moderation room for a hypothetical new stand ID
    router.push("/stands/moderate");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto relative">
           <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 relative z-20">
             <ArrowLeft className="w-5 h-5" />
           </button>
          
          <h1 className="text-xs font-black tracking-[0.2em] uppercase text-center absolute left-0 right-0 z-10">
            START A<br/>STAND
          </h1>
          
          <div className="w-8 h-8 rounded-full border border-teal/30 p-0.5 relative z-20 flex-shrink-0 bg-black/50 overflow-hidden shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aye" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="p-4 max-w-4xl mx-auto space-y-10 mt-6">
        {/* Cover Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">COVER</h2>
            <span className="text-[10px] font-black text-teal tracking-widest uppercase">Required</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-48">
            <button 
              onClick={() => setCover('upload')}
              className={`rounded-2xl border border-dashed flex flex-col items-center justify-center gap-3 transition-all ${cover === 'upload' ? 'border-teal bg-teal/5' : 'border-border bg-card/30 hover:bg-card/50 text-muted-foreground'}`}
            >
              <Upload className="w-5 h-5" />
              <span className="text-[10px] font-medium">Upload Image</span>
            </button>
            
            <button 
              onClick={() => setCover('classic')}
              className={`rounded-2xl border relative overflow-hidden transition-all group ${cover === 'classic' ? 'border-teal' : 'border-border bg-card/30'}`}
            >
              {/* Mock bg for classic arena */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0A0A0A]" />
              <div className="absolute bottom-4 left-4 text-xs font-black tracking-widest text-white z-10">
                Classic Arena
              </div>
              {cover === 'classic' && (
                <div className="absolute top-3 right-3 text-teal z-10 bg-black/50 rounded-full">
                  <CheckCircle2 className="w-5 h-5 fill-teal text-black" />
                </div>
              )}
              {/* Glow */}
              {cover === 'classic' && <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,229,255,0.15)] pointer-events-none" />}
            </button>
          </div>
        </section>

        {/* Stand Name Section */}
        <section className="space-y-3">
          <h2 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase px-1">STAND NAME</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Name your stand" 
              maxLength={32}
              value={standName}
              onChange={(e) => setStandName(e.target.value)}
              className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-teal/50 transition-colors placeholder:text-muted-foreground/50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/50 font-mono">
              {standName.length}/32
            </span>
          </div>
        </section>

        {/* Match Section */}
        <section className="space-y-3">
          <h2 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase px-1">MATCH</h2>
          <button className="w-full bg-card border border-border rounded-xl p-3 flex items-center justify-between hover:bg-white/5 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1.5">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[8px] font-mono border border-border">img</div>
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[8px] font-mono border border-border z-10">img</div>
              </div>
              <div>
                <h3 className="text-sm font-black tracking-wider text-foreground">MCI vs ARS</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Etihad Stadium • 20:00</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          {/* Empty details blocks to match screenshot */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="h-14 rounded-xl border border-teal/40 shadow-[inset_0_0_15px_rgba(0,229,255,0.05)] bg-card" />
            <div className="h-14 rounded-xl border border-border bg-card" />
            <div className="h-14 rounded-xl border border-border bg-card" />
            <div className="h-14 rounded-xl border border-border bg-card" />
            <div className="col-span-2 h-14 rounded-xl border border-border bg-card" />
          </div>

          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card hover:bg-white/5 transition-colors mt-3">
            <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase text-left leading-tight">ADD<br/>DETAILS</span>
            <Plus className="w-4 h-4 text-teal" />
          </button>
        </section>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent max-w-4xl mx-auto">
        <button 
          onClick={handlePushAgenda}
          className="w-full py-5 bg-gradient-to-r from-[#FF4500] to-[#FF7F50] text-white font-black text-sm tracking-widest uppercase rounded-2xl hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(255,69,0,0.4)]"
        >
          PUSH YOUR AGENDA
        </button>
      </div>
    </div>
  );
}
