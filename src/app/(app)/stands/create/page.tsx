"use client";

import { useState } from "react";
import { ArrowLeft, Upload, CheckCircle2, ChevronDown, Plus, ChevronRight } from "lucide-react";
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
    <div className="min-h-screen bg-[#0A0A0A] text-foreground flex flex-col">
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

      <main className="p-4 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-4 md:mt-8 pb-8 flex-1">
        {/* Left Column */}
        <div className="flex flex-col space-y-6">
          {/* Cover Section */}
          <section className="space-y-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">COVER</h2>
              <div className="px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-[10px] font-black text-teal tracking-widest uppercase">Required</div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 flex-1">
              <button 
                onClick={() => setCover('upload')}
                className={`rounded-3xl border border-dashed flex flex-col items-center justify-center gap-4 transition-all group p-8 min-h-[160px] ${cover === 'upload' ? 'border-teal bg-teal/5 shadow-[0_0_30px_rgba(0,229,255,0.1)]' : 'border-border/50 bg-card/20 hover:bg-card/40 hover:border-border text-muted-foreground'}`}
              >
                <div className={`p-4 rounded-full transition-colors ${cover === 'upload' ? 'bg-teal/20' : 'bg-muted group-hover:bg-muted/80'}`}>
                  <Upload className={`w-6 h-6 ${cover === 'upload' ? 'text-teal' : ''}`} />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase">Upload Image</span>
              </button>
              
              <button 
                onClick={() => setCover('classic')}
                className={`rounded-3xl border relative overflow-hidden transition-all group min-h-[200px] ${cover === 'classic' ? 'border-teal shadow-[0_0_30px_rgba(0,229,255,0.15)]' : 'border-border/50 bg-card/20 hover:border-border'}`}
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                <div className="absolute bottom-6 left-6 text-sm font-black tracking-[0.2em] text-white z-10 drop-shadow-lg">
                  CLASSIC ARENA
                </div>
                {cover === 'classic' && (
                  <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
                    <CheckCircle2 className="w-6 h-6 fill-teal text-black" />
                  </div>
                )}
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-8 justify-center">
          {/* Stand Name Section */}
          <section className="space-y-6">
            <h2 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">STAND NAME</h2>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5FF]/20 to-[#FF7F50]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              <input 
                type="text" 
                placeholder="e.g. The Blue Moon Tactics Board" 
                maxLength={32}
                value={standName}
                onChange={(e) => setStandName(e.target.value)}
                className="relative w-full bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl px-6 py-5 text-lg font-bold focus:outline-none focus:border-teal/50 focus:bg-card transition-all placeholder:text-muted-foreground/30 shadow-xl"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/50 font-mono font-bold">
                {standName.length}/32
              </span>
            </div>
          </section>

          {/* Match Section */}
          <section className="space-y-6">
            <h2 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">MATCH LINK</h2>
            <button className="w-full bg-gradient-to-br from-card/80 to-muted/30 backdrop-blur-md border border-border/50 rounded-2xl p-5 flex items-center justify-between hover:border-teal/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.05)] transition-all group shadow-xl">
              <div className="flex items-center gap-5">
                <div className="flex -space-x-3 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border-2 border-background z-0 p-2 shadow-sm transform group-hover:-translate-x-1 transition-transform">
                    <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" alt="MCI" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border-2 border-background z-10 p-2 shadow-sm transform group-hover:translate-x-1 transition-transform">
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/3/33/Arsenal_FC.svg" alt="ARS" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-base font-black tracking-widest text-foreground uppercase mb-1">MCI <span className="text-muted-foreground mx-1">VS</span> ARS</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                    <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Etihad Stadium • LIVE</p>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-teal/10 transition-colors border border-transparent group-hover:border-teal/20">
                <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-teal transition-colors" />
              </div>
            </button>
          </section>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent z-50 max-w-6xl mx-auto mt-auto">
        <button 
          onClick={handlePushAgenda}
          className="relative w-full py-5 rounded-2xl font-black text-sm tracking-[0.3em] uppercase text-black overflow-hidden group hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(0,229,255,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#00E5FF]/80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            PUSH YOUR AGENDA <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
}
