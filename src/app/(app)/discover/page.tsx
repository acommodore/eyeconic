"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, Bell, Zap, GitBranch, Bookmark, Mic, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["ALL MATCHES", "LIVE NOW", "HIGH CHAOS", "TACTICAL", "BOOKMARKS"];

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [aiText, setAiText] = useState("");
  const fullText = "High defensive panic detected in MCI backline. Tension index spiking to 84%. Volatility expected.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setAiText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 bg-[#050505] min-h-screen text-white space-y-8">
      
      {/* 1. PILL NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 hover-scrollbar no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-colors ${
              activeTab === tab ? "text-[#020202]" : "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* 2. HERO MATCH */}
      <section className="w-full h-[500px] md:h-[600px] rounded-[32px] border border-white/10 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7137b29de2f6?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-1000" />
        
        <div className="relative z-20 p-8 flex flex-col h-full justify-between items-center text-center">
          
          <div className="w-full flex justify-between items-start">
             <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-[#FF7F50]/30 rounded-full font-mono">
               <div className="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse" />
               <span className="text-[#FF7F50] text-[10px] font-bold tracking-widest uppercase">Live Premier League</span>
             </div>
             <div className="flex items-center gap-4">
               <span className="flex items-center gap-1.5 text-xs font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                 <Eye className="w-4 h-4" /> 12.4K
               </span>
               <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md hover:bg-white/10 transition-colors">
                 <Bell className="w-4 h-4 text-white" />
               </button>
             </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
             <div className="flex items-center justify-between w-full">
               <div className="flex flex-col items-center gap-4">
                 <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_rgba(108,171,221,0.3)] p-4">
                   <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" alt="MCI" className="w-full h-full object-contain" />
                 </div>
                 <span className="text-2xl md:text-4xl font-black tracking-widest drop-shadow-lg">MCI</span>
               </div>
               
               <div className="flex flex-col items-center">
                 <div className="flex items-center gap-4 md:gap-8 text-6xl md:text-8xl font-mono font-black tracking-tighter drop-shadow-2xl">
                   <span>2</span>
                   <span className="text-white/20">-</span>
                   <span>1</span>
                 </div>
                 <span className="text-[#00E5FF] font-mono font-bold text-xl mt-2 animate-pulse">68'</span>
               </div>

               <div className="flex flex-col items-center gap-4">
                 <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_rgba(200,16,46,0.3)] p-4">
                   <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" alt="LIV" className="w-full h-full object-contain" />
                 </div>
                 <span className="text-2xl md:text-4xl font-black tracking-widest drop-shadow-lg">LIV</span>
               </div>
             </div>
          </div>

          <div className="w-full max-w-xl flex flex-col items-center gap-6">
             {/* Integrated AI Sentiment */}
             <div className="w-full bg-black/50 backdrop-blur-xl border border-[#00E5FF]/30 rounded-2xl p-4 flex flex-col">
               <div className="flex items-center gap-2 mb-2">
                 <Mic className="w-3 h-3 text-[#00E5FF]" />
                 <span className="text-[9px] font-mono font-bold text-[#00E5FF] tracking-widest uppercase">AI Insight</span>
               </div>
               <p className="text-sm font-mono text-gray-200">
                 {aiText}<span className="animate-pulse text-[#00E5FF]">█</span>
               </p>
             </div>

             <Link href="/pulse" className="w-full group relative bg-white text-[#050505] font-black tracking-[0.2em] uppercase py-5 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050505] to-transparent opacity-10 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
               <span className="relative z-10">ENTER MATCH PULSE</span>
             </Link>
          </div>

        </div>
      </section>

      {/* 3. GRID SYSTEM */}
      <section className="pt-4">
        <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase mb-6 pl-2">ACTIVE SESSIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Match Card 1 */}
          <div className="rounded-[24px] p-6 bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden flex flex-col h-[320px]">
             <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F50]/5 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="relative z-10 flex justify-between items-start mb-auto">
               <div className="flex flex-col gap-1">
                 <span className="flex items-center gap-1.5 text-[9px] text-[#FF7F50] font-bold tracking-widest uppercase">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#FF7F50] animate-pulse" /> Live La Liga
                 </span>
                 <span className="text-[10px] text-gray-500 font-mono">55' • Santiago Bernabéu</span>
               </div>
               <button className="text-gray-600 hover:text-white transition-colors"><Bookmark className="w-5 h-5" /></button>
             </div>

             <div className="relative z-10 flex justify-between items-center w-full px-2 mb-8">
               <div className="flex flex-col items-center gap-3">
                 <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" className="w-14 h-14 object-contain" alt="RMA" />
                 <span className="text-sm font-bold">RMA</span>
               </div>
               <span className="text-4xl font-mono font-black text-white">1 - 1</span>
               <div className="flex flex-col items-center gap-3">
                 <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" className="w-14 h-14 object-contain" alt="BAR" />
                 <span className="text-sm font-bold">BAR</span>
               </div>
             </div>

             <div className="relative z-10 mt-auto">
               <div className="flex items-center justify-between bg-black/50 border border-white/5 rounded-xl p-3 mb-3">
                 <span className="text-[10px] text-gray-400 font-bold tracking-widest">CHAOS METER</span>
                 <div className="flex items-center gap-2">
                   <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-[#FF7F50] w-[82%]" />
                   </div>
                   <span className="text-xs font-mono font-bold text-[#FF7F50]">82</span>
                 </div>
               </div>
               <Link href="/pulse" className="w-full block text-center bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-widest py-3.5 rounded-xl transition-colors">
                 JOIN PULSE
               </Link>
             </div>
          </div>

          {/* Match Card 2 (Upcoming) */}
          <div className="rounded-[24px] p-6 bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden flex flex-col h-[320px]">
             <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="relative z-10 flex justify-between items-start mb-auto">
               <div className="flex flex-col gap-1">
                 <span className="flex items-center gap-1.5 text-[9px] text-[#00E5FF] font-bold tracking-widest uppercase">
                   Scheduled • UCL
                 </span>
                 <span className="text-[10px] text-gray-500 font-mono">Today, 21:00 • Parc des Princes</span>
               </div>
               <button className="text-gray-600 hover:text-white transition-colors"><Bookmark className="w-5 h-5" /></button>
             </div>

             <div className="relative z-10 flex justify-between items-center w-full px-2 mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
               <div className="flex flex-col items-center gap-3">
                 <img src="https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" className="w-14 h-14 object-contain" alt="PSG" />
                 <span className="text-sm font-bold">PSG</span>
               </div>
               <span className="text-2xl font-black text-gray-500">VS</span>
               <div className="flex flex-col items-center gap-3">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" className="w-14 h-14 object-contain" alt="DOR" />
                 <span className="text-sm font-bold">BVB</span>
               </div>
             </div>

             <div className="relative z-10 mt-auto">
               <div className="flex items-center justify-between bg-black/50 border border-white/5 rounded-xl p-3 mb-3">
                 <span className="text-[10px] text-gray-400 font-bold tracking-widest">TACTICAL FORECAST</span>
                 <div className="flex items-center gap-2">
                   <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-[#00E5FF] w-[65%]" />
                   </div>
                   <span className="text-xs font-mono font-bold text-[#00E5FF]">65</span>
                 </div>
               </div>
               <Link href="/prematch/1" className="w-full block text-center bg-[#00E5FF] text-black text-xs font-bold tracking-widest py-3.5 rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                 MATCH DETAILS
               </Link>
             </div>
          </div>

          {/* Match Card 3 */}
          <div className="rounded-[24px] p-6 bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden flex flex-col h-[320px]">
             <div className="absolute inset-0 bg-gradient-to-br from-[#6200EA]/5 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="relative z-10 flex justify-between items-start mb-auto">
               <div className="flex flex-col gap-1">
                 <span className="flex items-center gap-1.5 text-[9px] text-[#6200EA] font-bold tracking-widest uppercase">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#6200EA] animate-pulse" /> Live Serie A
                 </span>
                 <span className="text-[10px] text-gray-500 font-mono">24' • San Siro</span>
               </div>
               <button className="text-gray-600 hover:text-white transition-colors"><Bookmark className="w-5 h-5" /></button>
             </div>

             <div className="relative z-10 flex justify-between items-center w-full px-2 mb-8">
               <div className="flex flex-col items-center gap-3">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" className="w-14 h-14 object-contain bg-blue-600 rounded-full p-1" alt="INT" />
                 <span className="text-sm font-bold">INT</span>
               </div>
               <span className="text-4xl font-mono font-black text-white">0 - 0</span>
               <div className="flex flex-col items-center gap-3">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" className="w-14 h-14 object-contain bg-white rounded-full p-1" alt="MIL" />
                 <span className="text-sm font-bold">MIL</span>
               </div>
             </div>

             <div className="relative z-10 mt-auto">
               <div className="flex items-center justify-between bg-black/50 border border-white/5 rounded-xl p-3 mb-3">
                 <span className="text-[10px] text-gray-400 font-bold tracking-widest flex items-center gap-1.5">
                   <Star className="w-3 h-3 text-[#6200EA]" /> STAR WATCH
                 </span>
                 <span className="text-[10px] font-mono font-bold text-gray-300">R. Leão (7.8)</span>
               </div>
               <Link href="/pulse" className="w-full block text-center bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-widest py-3.5 rounded-xl transition-colors">
                 JOIN PULSE
               </Link>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
}
