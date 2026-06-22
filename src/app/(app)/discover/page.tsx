"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, Bell, Zap, GitBranch, Bookmark, Crosshair, Star, Swords, Dices, Mic } from "lucide-react";

function AISentimentEngine() {
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");
  const fullText = "High defensive panic detected in MCI backline. Tension index spiking to 84%. Volatility expected.";

  useEffect(() => {
    // Reset steps if needed, but here it runs once
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3500);
    const t3 = setTimeout(() => {
      setStep(3);
      let i = 0;
      const interval = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 30);
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="mb-10 bg-black border border-[#00E5FF]/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.1)]">
      <div className="bg-[#00E5FF]/10 border-b border-[#00E5FF]/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-[#00E5FF] tracking-widest">EYECONIC_AI // LIVE SENTIMENT</span>
        </div>
        <Mic className="w-3 h-3 text-[#00E5FF]" />
      </div>
      <div className="p-4 font-mono text-[11px] text-gray-300 flex flex-col gap-2 min-h-[140px]">
        {step >= 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 shrink-0">{'>'}</span> 
            <span className={step === 0 ? "animate-pulse" : ""}>Connecting to data streams... {step === 0 && "█"}</span>
          </div>
        )}
        {step >= 1 && (
          <div className="flex items-center gap-2">
            <span className="text-[#FF7F50] shrink-0">{'>'}</span> 
            <span className={step === 1 ? "animate-pulse" : ""}>Parsing 14,204 live tweets & audio feeds... {step === 1 && "█"}</span>
          </div>
        )}
        {step >= 2 && (
          <div className="flex items-center gap-2">
            <span className="text-purple-500 shrink-0">{'>'}</span> 
            <span className={step === 2 ? "animate-pulse" : ""}>Analyzing crowd noise frequency... {step === 2 && "█"}</span>
          </div>
        )}
        {step >= 3 && (
          <div className="flex items-start gap-2 mt-2 pt-2 border-t border-white/10">
            <span className="text-[#00E5FF] shrink-0 pt-0.5">{'>'}</span> 
            <span className="text-white font-bold leading-relaxed">
              <span className="text-[#00E5FF] mr-2">[OUTPUT]</span> 
              {text}
              <span className="animate-pulse ml-1 text-[#00E5FF]">█</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 bg-[#050505] min-h-screen text-white space-y-10">
      
      {/* 1. HERO SECTION: FEATURED MATCH */}
      <section className="w-full rounded-[32px] border border-white/20 overflow-hidden relative group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Dark gradient primarily at the bottom for text readability, clearer at the top */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/20 z-10" />
        {/* Subtle team color tints on the edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/20 via-transparent to-[#FF0000]/10 z-10 mix-blend-overlay" />
        {/* Bright, high-quality stadium background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7137b29de2f6?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-1000" />
        
        <div className="relative z-20 p-6 md:p-10 flex flex-col h-full">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-black/60 border border-[#FF7F50]/30 rounded font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF7F50] animate-pulse" />
                <span className="text-[#FF7F50] text-[9px] font-bold tracking-widest">[ LIVE_FEED // ACTIVE ]</span>
              </div>
              <span className="text-xs text-gray-300 font-medium tracking-wide flex items-center gap-2 font-mono">
                 <div className="w-4 h-4 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white" />
                 </div>
                 Premier League
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <span className="flex items-center gap-1.5 text-xs font-bold">
                <Eye className="w-4 h-4" /> 12.4K
              </span>
              <Bell className="w-5 h-5 text-[#00E5FF] cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Main Scoreboard */}
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="flex items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(108,171,221,0.4)] border-4 border-[#6CABDD]/50 p-2 md:p-3 overflow-hidden">
                  <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" alt="MCI" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl md:text-4xl font-black tracking-widest hidden md:block">MCI</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 md:gap-8 text-5xl md:text-7xl font-mono font-black tracking-tighter">
                  <span>2</span>
                  <span className="text-[#00E5FF]/50">-</span>
                  <span>1</span>
                </div>
                <span className="text-[#00E5FF] font-mono font-bold text-lg mt-2">68'</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-4xl font-black tracking-widest hidden md:block">LIV</span>
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(200,16,46,0.4)] border-4 border-[#C8102E]/50 p-2 md:p-3 overflow-hidden">
                  <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" alt="LIV" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] mt-6">ETIHAD STADIUM</p>
          </div>

          {/* Bottom Data Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mt-auto pt-10">
            {/* MVP & Metrics */}
            <div className="flex items-center justify-between bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#00E5FF] p-0.5 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" alt="Haaland" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#00E5FF] tracking-wider">MVP</span>
                  <h4 className="font-black text-lg leading-tight uppercase">E. HAALAND</h4>
                  <p className="text-[10px] text-gray-400 font-bold tracking-wider mt-0.5 flex items-center gap-1">
                    <span className="text-[#00E5FF] text-sm">9.1</span> AS VOTED BY 12.4K FANS
                  </p>
                </div>
              </div>

              <div className="flex gap-6 pr-2">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold tracking-wider">
                    <Zap className="w-3 h-3 text-[#FF7F50]" /> CHAOS
                  </div>
                  <span className="text-xl font-black text-[#FF7F50]">78</span>
                </div>
                <div className="w-px h-8 bg-white/10 self-center" />
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold tracking-wider">
                    <GitBranch className="w-3 h-3 text-[#00E5FF]" /> TACTICAL
                  </div>
                  <span className="text-xl font-black text-[#00E5FF]">84</span>
                </div>
              </div>
            </div>

            {/* Pulse Button & Ticker */}
            <div className="flex flex-col items-end gap-4">
              <div className="flex items-center text-[10px] font-bold tracking-wider text-gray-400 w-full overflow-hidden whitespace-nowrap relative">
                <div className="flex gap-3 animate-marquee w-fit whitespace-nowrap pl-[100%]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] self-center" /> End-to-end transitions
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] ml-2 self-center" /> High pressing intensity
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] ml-2 self-center" /> Lead changes: <span className="text-[#00E5FF]">3</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] ml-2 self-center" /> Big chances: <span className="text-[#00E5FF]">6</span>
                </div>
              </div>
              <Link href="/pulse" className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FF8C00] text-black font-black py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_30px_rgba(255,79,0,0.3)] text-center flex flex-col items-center justify-center">
                <span className="block text-lg tracking-widest">ENTER MATCH PULSE</span>
                <span className="block text-[10px] font-bold opacity-80 mt-1 tracking-wider">Live ratings, fan talk & real-time moments</span>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-6 h-1 rounded-full bg-[#00E5FF]" />
            <div className="w-4 h-1 rounded-full bg-white/20" />
            <div className="w-4 h-1 rounded-full bg-white/20" />
            <div className="w-4 h-1 rounded-full bg-white/20" />
          </div>

        </div>
      </section>

      {/* 2. CHOOSE YOUR EXPERIENCE (Horizontal Strip) */}
      <section>
        <h2 className="text-xs font-black tracking-widest text-white uppercase mb-4">CHOOSE YOUR EXPERIENCE</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 hover-scrollbar snap-x">
          
          <button className="min-w-[140px] flex-1 border border-[#00E5FF]/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#00E5FF] transition-colors snap-start group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbb1925846?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-20 flex flex-col items-center">
              <Bookmark className="w-8 h-8 text-[#00E5FF] mb-1" />
              <span className="text-[10px] font-bold tracking-widest text-white">BOOKMARKS</span>
              <span className="text-2xl font-black text-[#00E5FF]">8</span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-[8px] font-bold text-[#00E5FF] tracking-widest">LIVE MATCHES</span>
              </div>
            </div>
          </button>

          <button className="min-w-[140px] flex-1 border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#FF7F50]/50 transition-colors snap-start group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-20 flex flex-col items-center">
              <Zap className="w-8 h-8 text-[#FF7F50] mb-1 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,79,0,0.8)]" />
              <span className="text-[10px] font-bold tracking-widest text-gray-300 group-hover:text-white transition-colors">CHAOS</span>
              <span className="text-2xl font-black text-white">6</span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7F50] animate-pulse" />
                <span className="text-[8px] font-bold text-gray-400 tracking-widest">LIVE MATCHES</span>
              </div>
            </div>
          </button>

          <button className="min-w-[140px] flex-1 border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#00E5FF]/50 transition-colors snap-start group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-20 flex flex-col items-center">
              <GitBranch className="w-8 h-8 text-[#00E5FF] mb-1 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
              <span className="text-[10px] font-bold tracking-widest text-gray-300 group-hover:text-white transition-colors">TACTICAL</span>
              <span className="text-2xl font-black text-white">4</span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-[8px] font-bold text-gray-400 tracking-widest">LIVE MATCHES</span>
              </div>
            </div>
          </button>

          <button className="min-w-[140px] flex-1 border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#6200EA]/50 transition-colors snap-start group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7137b29de2f6?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-20 flex flex-col items-center">
              <Star className="w-8 h-8 text-[#6200EA] mb-1 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(98,0,234,0.8)]" />
              <span className="text-[10px] font-bold tracking-widest text-gray-300 group-hover:text-white transition-colors">STAR WATCH</span>
              <span className="text-2xl font-black text-white">5</span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6200EA] animate-pulse" />
                <span className="text-[8px] font-bold text-gray-400 tracking-widest">LIVE MATCHES</span>
              </div>
            </div>
          </button>

          <button className="min-w-[140px] flex-1 border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-[#D32F2F]/50 transition-colors snap-start group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-20 flex flex-col items-center">
              <Swords className="w-8 h-8 text-[#D32F2F] mb-1 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(211,47,47,0.8)]" />
              <span className="text-[10px] font-bold tracking-widest text-gray-300 group-hover:text-white transition-colors">RIVALRIES</span>
              <span className="text-2xl font-black text-white">3</span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-pulse" />
                <span className="text-[8px] font-bold text-gray-400 tracking-widest">LIVE MATCHES</span>
              </div>
            </div>
          </button>

          <button className="min-w-[140px] flex-1 border border-dashed border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors snap-start group relative overflow-hidden">
            <div className="absolute inset-0 bg-black/80 z-10 group-hover:bg-black/60 transition-colors" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-20 flex flex-col items-center">
              <Dices className="w-8 h-8 text-gray-400 mb-1 group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-bold tracking-widest text-gray-300">SURPRISE ME</span>
              <span className="text-2xl font-black text-white">?</span>
              <span className="text-[8px] font-bold text-gray-500 tracking-widest mt-2">PICK FOR ME</span>
            </div>
          </button>

        </div>
      </section>

      {/* 3. SPLIT PANE GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Pane */}
        <div className="xl:col-span-8 space-y-12">
          
          {/* WHAT'S HAPPENING */}
          <section>
             <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black tracking-widest text-white uppercase">WHAT'S HAPPENING</h2>
              <span className="text-xs text-[#00E5FF] font-bold hover:text-white cursor-pointer transition-colors tracking-widest">VIEW ALL &gt;</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 hover-scrollbar snap-x">
              
              {/* Match Card 1 */}
              <div className="min-w-[300px] rounded-3xl p-5 border border-white/10 snap-start flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-black/60 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                
                <div className="relative z-20 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 px-1.5 py-0.5 bg-black/50 border border-[#00E5FF]/30 rounded font-mono text-[#00E5FF] text-[8px] font-bold tracking-widest">
                        <div className="w-1 h-1 rounded-full bg-[#00E5FF] animate-pulse" />
                        [ SYS.SYNC ]
                      </span>
                      <span className="text-[10px] text-gray-300 font-mono drop-shadow-md">Premier League</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-300 drop-shadow-md">
                      <Eye className="w-3 h-3" /> 12.4K
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full p-1 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-full h-full object-contain" alt="MCI" />
                      </div>
                      <span className="text-xs font-bold drop-shadow-md">MCI</span>
                    </div>
                    <div className="flex flex-col items-center drop-shadow-lg">
                      <span className="text-3xl font-mono font-black tracking-tighter text-white">2 - 1</span>
                      <span className="text-xs font-mono font-bold text-[#00E5FF] mt-1">68'</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full p-1 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-full h-full object-contain" alt="ARS" />
                      </div>
                      <span className="text-xs font-bold drop-shadow-md">ARS</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex gap-3 bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-[#FF7F50]/30 shadow-[inset_0_0_20px_rgba(255,79,0,0.05)]">
                      <div className="flex flex-col items-center justify-center pr-3 border-r border-white/10 shrink-0">
                        <span className="flex items-center gap-1 text-[9px] text-[#FF7F50] font-mono tracking-widest"><Zap className="w-3 h-3"/> CHAOS</span>
                        <span className="text-xl font-mono font-black text-[#FF7F50]">78</span>
                      </div>
                      <p className="text-[10px] text-gray-300 leading-tight flex items-center italic">End-to-end transitions increasing</p>
                    </div>
                    <div className="text-[8px] font-mono text-[#00E5FF]/70 tracking-widest flex items-center gap-1 bg-black/60 px-2 py-1 rounded w-fit border border-[#00E5FF]/20">
                      <span className="w-1 h-1 bg-[#00E5FF] animate-pulse rounded-full" />
                      &gt; PARSING 4.2K REACTIONS/SEC...
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 bg-[#FF7F50]/10 border border-[#FF7F50]/50 text-[#FF7F50] font-bold text-xs tracking-widest rounded-xl hover:bg-[#FF7F50] hover:text-black transition-colors py-3">ENTER PULSE</button>
                    <button className="w-12 bg-black/40 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"><Bookmark className="w-4 h-4 text-gray-300" /></button>
                  </div>
                </div>
              </div>

               {/* Match Card 2 */}
              <div className="min-w-[300px] rounded-3xl p-5 border border-white/10 snap-start flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-black/60 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                
                <div className="relative z-20 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 px-1.5 py-0.5 bg-black/50 border border-[#FF7F50]/30 rounded font-mono text-[#FF7F50] text-[8px] font-bold tracking-widest">
                        <div className="w-1 h-1 rounded-full bg-[#FF7F50] animate-pulse" />
                        [ SYS.SYNC ]
                      </span>
                      <span className="text-[10px] text-gray-300 font-mono drop-shadow-md">La Liga</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-300 drop-shadow-md">
                      <Eye className="w-3 h-3" /> 8.2K
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full p-1 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" className="w-full h-full object-contain" alt="RMA" />
                      </div>
                      <span className="text-xs font-bold drop-shadow-md">RMA</span>
                    </div>
                    <div className="flex flex-col items-center drop-shadow-lg">
                      <span className="text-3xl font-mono font-black tracking-tighter text-white">1 - 1</span>
                      <span className="text-xs font-mono font-bold text-[#00E5FF] mt-1">55'</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full p-1 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" className="w-full h-full object-contain" alt="BAR" />
                      </div>
                      <span className="text-xs font-bold drop-shadow-md">BAR</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex gap-3 bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-[#FF7F50]/30 shadow-[inset_0_0_20px_rgba(255,79,0,0.05)]">
                      <div className="flex flex-col items-center justify-center pr-3 border-r border-white/10 shrink-0">
                        <span className="flex items-center gap-1 text-[9px] text-[#FF7F50] font-mono tracking-widest"><Zap className="w-3 h-3"/> CHAOS</span>
                        <span className="text-xl font-mono font-black text-[#FF7F50]">82</span>
                      </div>
                      <p className="text-[10px] text-gray-300 leading-tight flex items-center italic">Momentum swinging both ways</p>
                    </div>
                    <div className="text-[8px] font-mono text-[#FF7F50]/70 tracking-widest flex items-center gap-1 bg-black/60 px-2 py-1 rounded w-fit border border-[#FF7F50]/20">
                      <span className="w-1 h-1 bg-[#FF7F50] animate-pulse rounded-full" />
                      &gt; DETECTING POLARIZED SENTIMENT...
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 bg-[#FF7F50]/10 border border-[#FF7F50]/50 text-[#FF7F50] font-bold text-xs tracking-widest rounded-xl hover:bg-[#FF7F50] hover:text-black transition-colors py-3">ENTER PULSE</button>
                    <button className="w-12 bg-black/40 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"><Bookmark className="w-4 h-4 text-gray-300" /></button>
                  </div>
                </div>
              </div>

               {/* Match Card 3 */}
              <div className="min-w-[300px] rounded-3xl p-5 border border-white/10 snap-start flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-black/60 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                
                <div className="relative z-20 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 px-1.5 py-0.5 bg-black/50 border border-[#00E5FF]/30 rounded font-mono text-[#00E5FF] text-[8px] font-bold tracking-widest">
                        <div className="w-1 h-1 rounded-full bg-[#00E5FF] animate-pulse" />
                        [ SYS.SYNC ]
                      </span>
                      <span className="text-[10px] text-gray-300 font-mono drop-shadow-md">Serie A</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-300 drop-shadow-md">
                      <Eye className="w-3 h-3" /> 4.6K
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-blue-600 rounded-full p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-white/20">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" className="w-full h-full object-contain" alt="INT" />
                      </div>
                      <span className="text-xs font-bold drop-shadow-md">INT</span>
                    </div>
                    <div className="flex flex-col items-center drop-shadow-lg">
                      <span className="text-3xl font-mono font-black tracking-tighter text-white">0 - 0</span>
                      <span className="text-xs font-mono font-bold text-[#00E5FF] mt-1">24'</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-full p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" className="w-full h-full object-contain" alt="MIL" />
                      </div>
                      <span className="text-xs font-bold drop-shadow-md">MIL</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-[#00E5FF]/30 items-center justify-center shadow-[inset_0_0_20px_rgba(0,229,255,0.05)]">
                      <p className="text-[11px] text-[#00E5FF] font-mono font-black tracking-widest flex items-center gap-2"><GitBranch className="w-4 h-4" /> TACTICAL BATTLE</p>
                    </div>
                    <div className="text-[8px] font-mono text-[#00E5FF]/70 tracking-widest flex items-center gap-1 bg-black/60 px-2 py-1 rounded w-fit border border-[#00E5FF]/20">
                      <span className="w-1 h-1 bg-[#00E5FF] animate-pulse rounded-full" />
                      &gt; LOW VOLATILITY DETECTED
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 bg-[#FF7F50]/10 border border-[#FF7F50]/50 text-[#FF7F50] font-bold text-xs tracking-widest rounded-xl hover:bg-[#FF7F50] hover:text-black transition-colors py-3">ENTER PULSE</button>
                    <button className="w-12 bg-black/40 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"><Bookmark className="w-4 h-4 text-gray-300" /></button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* UPCOMING */}
          <section>
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xs font-black tracking-widest text-white uppercase">UPCOMING</h2>
               <span className="text-xs text-[#00E5FF] font-bold hover:text-white cursor-pointer transition-colors">See all &gt;</span>
             </div>
             <div className="flex gap-6 overflow-x-auto pb-4 hover-scrollbar snap-x">
               {[
                 {
                   id: 1, team1: "REAL MADRID", team2: "MAN CITY", time: "15:00", fans: "5.2K", chaos: "91%",
                   img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop",
                   insights: ["Maximum defensive volatility detected", "Transition efficiency at season high", "Both teams top 3 in big chances created"],
                   p1: { name: "RMA", bg: "bg-yellow-500", text: "text-black" },
                   p2: { name: "MCI", bg: "bg-blue-300", text: "text-white" }
                 },
                 {
                   id: 2, team1: "BAYERN", team2: "DORTMUND", time: "17:30", fans: "4.8K", chaos: "85%",
                   img: "https://images.unsplash.com/photo-1518605368461-1e1e38cd1562?q=80&w=1200&auto=format&fit=crop",
                   insights: ["High tempo pressing expected", "Key battle in midfield pivot", "Historical high goal count"],
                   p1: { name: "BAY", bg: "bg-red-600", text: "text-white" },
                   p2: { name: "DOR", bg: "bg-yellow-400", text: "text-black" }
                 }
                ].map((match) => (
                  <div key={match.id} className="min-w-[300px] md:min-w-[340px] rounded-3xl p-5 border border-white/10 relative overflow-hidden flex flex-col group shadow-[0_0_30px_rgba(0,229,255,0.05)] snap-start shrink-0 h-[420px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-black/60 z-10" />
                    <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${match.img}')` }} />
                    
                    <div className="relative z-20 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded font-mono text-[#00E5FF] text-[8px] font-bold tracking-widest">
                            <div className="w-1 h-1 rounded-full bg-[#00E5FF] animate-pulse" />
                            [ SCHEDULED ]
                          </span>
                          <span className="text-[10px] text-gray-300 font-mono drop-shadow-md">{match.time}</span>
                        </div>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-300 drop-shadow-md">
                          {match.fans} FANS
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-white rounded-full p-1 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            <div className={`w-full h-full rounded-full ${match.p1.bg} ${match.p1.text} font-bold flex items-center justify-center text-[11px]`}>{match.p1.name}</div>
                          </div>
                          <span className="text-xs font-bold drop-shadow-md text-center max-w-[80px] truncate">{match.team1}</span>
                        </div>
                        <div className="flex flex-col items-center drop-shadow-lg">
                          <span className="text-2xl font-black tracking-tighter text-white">VS</span>
                          <span className="text-[10px] font-bold text-[#00E5FF] mt-1 tracking-widest px-2 py-0.5 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 cursor-pointer hover:bg-[#00E5FF]/20 transition-colors">JOIN</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-white rounded-full p-1 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            <div className={`w-full h-full rounded-full ${match.p2.bg} ${match.p2.text} font-bold flex items-center justify-center text-[11px]`}>{match.p2.name}</div>
                          </div>
                          <span className="text-xs font-bold drop-shadow-md text-center max-w-[80px] truncate">{match.team2}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 mb-6">
                        <div className="flex gap-3 bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30 shadow-[inset_0_0_20px_rgba(168,85,247,0.05)]">
                          <div className="flex flex-col items-center justify-center pr-3 border-r border-white/10 shrink-0">
                            <span className="flex items-center gap-1 text-[9px] text-purple-500 font-mono tracking-widest"><Zap className="w-3 h-3"/> CHAOS</span>
                            <span className="text-xl font-mono font-black text-purple-500">{match.chaos.replace('%','')}</span>
                          </div>
                          <p className="text-[10px] text-gray-300 leading-tight flex items-center italic">{match.insights[0]}</p>
                        </div>
                        <div className="text-[8px] font-mono text-purple-500/70 tracking-widest flex items-center gap-1 bg-black/60 px-2 py-1 rounded w-fit border border-purple-500/20">
                          <span className="w-1 h-1 bg-purple-500 animate-pulse rounded-full" />
                          &gt; FORECASTING MATCH VOLATILITY...
                        </div>
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <Link href={`/prematch/${match.id}`} className="flex-1 bg-[#FF7F50] text-white font-black text-xs tracking-widest rounded-xl hover:bg-[#FF7F50]/90 transition-colors py-3 flex items-center justify-center shadow-[0_0_15px_rgba(255,79,0,0.3)]">
                          MATCH DETAILS
                        </Link>
                        <button className="w-12 bg-black/40 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors shrink-0">
                          <Bookmark className="w-5 h-5 text-gray-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </section>

        </div>

        {/* Right Pane */}
        <div className="xl:col-span-4 flex flex-col">
           
           <AISentimentEngine />

           <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-black tracking-widest text-white uppercase">MORE TONIGHT</h2>
              <span className="text-[10px] text-[#00E5FF] font-bold hover:text-white cursor-pointer transition-colors tracking-widest">See full schedule &gt;</span>
            </div>
            
            <div className="space-y-4">
               {/* List Item 1 */}
               <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-4">
                     <div className="flex flex-col w-12 shrink-0">
                       <span className="text-lg font-black">20:45</span>
                       <span className="text-[9px] text-gray-500 font-bold tracking-widest">TODAY</span>
                     </div>
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-sm">LIV <span className="text-gray-500 font-normal text-xs mx-0.5">vs</span> MUN</span>
                         <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-bold tracking-widest">EPL</span>
                       </div>
                       <p className="text-[10px] text-gray-400 italic font-medium">High press vs weak defense</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex gap-1">
                       <div className="w-4 h-1.5 bg-[#00E5FF] rounded-sm" />
                       <div className="w-4 h-1.5 bg-[#00E5FF] rounded-sm" />
                       <div className="w-4 h-1.5 bg-white/10 rounded-sm" />
                       <div className="w-4 h-1.5 bg-white/10 rounded-sm" />
                     </div>
                     <span className="font-mono text-[#00E5FF] font-bold">68</span>
                     <Bell className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
               </div>

               {/* List Item 2 */}
               <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-4">
                     <div className="flex flex-col w-12 shrink-0">
                       <span className="text-lg font-black">21:00</span>
                       <span className="text-[9px] text-gray-500 font-bold tracking-widest">TODAY</span>
                     </div>
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-sm">PSG <span className="text-gray-500 font-normal text-xs mx-0.5">vs</span> BVB</span>
                         <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-bold tracking-widest">UCL</span>
                       </div>
                       <p className="text-[10px] text-gray-400 italic font-medium">Strategic gridlock expected</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex gap-1">
                       <div className="w-4 h-1.5 bg-[#00E5FF] rounded-sm" />
                       <div className="w-4 h-1.5 bg-white/10 rounded-sm" />
                       <div className="w-4 h-1.5 bg-white/10 rounded-sm" />
                       <div className="w-4 h-1.5 bg-white/10 rounded-sm" />
                     </div>
                     <span className="font-mono text-[#00E5FF] font-bold">42</span>
                     <Bell className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
               </div>

               {/* List Item 3 */}
               <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-4">
                     <div className="flex flex-col w-12 shrink-0">
                       <span className="text-lg font-black">22:00</span>
                       <span className="text-[9px] text-gray-500 font-bold tracking-widest">TODAY</span>
                     </div>
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-sm">ATM <span className="text-gray-500 font-normal text-xs mx-0.5">vs</span> SEV</span>
                         <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-bold tracking-widest">LALIGA</span>
                       </div>
                       <p className="text-[10px] text-gray-400 italic font-medium">Physical duel in midfield</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex gap-1">
                       <div className="w-4 h-1.5 bg-[#00E5FF] rounded-sm" />
                       <div className="w-4 h-1.5 bg-white/10 rounded-sm" />
                       <div className="w-4 h-1.5 bg-white/10 rounded-sm" />
                       <div className="w-4 h-1.5 bg-white/10 rounded-sm" />
                     </div>
                     <span className="font-mono text-[#00E5FF] font-bold">36</span>
                     <Bell className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
               </div>

            </div>
        </div>

      </div>
    </div>
  );
}
