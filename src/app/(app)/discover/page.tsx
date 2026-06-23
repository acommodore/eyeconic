"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, Bell, Zap, GitBranch, Bookmark, Mic, Star, Swords, Dices } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "ALL", label: "ALL MATCHES", icon: null, color: "text-white" },
  { id: "LIVE", label: "LIVE NOW", icon: null, color: "text-[#00E5FF]" },
  { id: "CHAOS", label: "HIGH CHAOS", icon: Zap, color: "text-[#FF7F50]" },
  { id: "TACTICAL", label: "TACTICAL", icon: GitBranch, color: "text-[#00E5FF]" },
  { id: "RIVALRIES", label: "RIVALRIES", icon: Swords, color: "text-[#D32F2F]" },
  { id: "SURPRISE", label: "SURPRISE ME", icon: Dices, color: "text-gray-400" },
  { id: "BOOKMARKS", label: "BOOKMARKS", icon: Bookmark, color: "text-gray-300" },
];

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
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
      
      {/* 1. LIVELY PILL NAVIGATION */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 hover-scrollbar no-scrollbar">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                isActive 
                  ? "text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                  : `bg-white/5 border border-white/5 hover:bg-white/10 ${cat.color}`
              }`}
              style={isActive ? { backgroundColor: "#fff" } : {}}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : cat.color}`} />}
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. CINEMATIC HERO SHOWDOWN */}
      <section className="w-full h-[600px] md:h-[700px] rounded-[32px] border border-white/10 overflow-hidden relative group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Dynamic Split Background */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1431324155629-1a6d0a11f4ee?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000 origin-right" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/30 to-[#050505]/90 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
          </div>
          <div className="w-1/2 h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1e12a43b2f53?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000 origin-left" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#C8102E]/30 to-[#050505]/90 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
          </div>
        </div>

        {/* Tension Graph Overlay (SVG) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none mix-blend-screen">
           <svg className="w-full h-full text-[#00E5FF]" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,50 Q10,60 20,40 T40,50 T60,30 T80,60 T100,50" fill="none" stroke="currentColor" strokeWidth="0.2" className="animate-[dash_3s_linear_infinite]" strokeDasharray="2,2" />
              <path d="M0,55 Q15,65 25,45 T45,55 T65,35 T85,65 T100,55" fill="none" stroke="#FF7F50" strokeWidth="0.2" className="animate-[dash_4s_linear_infinite_reverse]" strokeDasharray="1,2" />
           </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent z-10 pointer-events-none" />
        
        <div className="relative z-20 p-6 md:p-12 flex flex-col h-full justify-between items-center text-center">
          
          <div className="w-full flex justify-between items-start">
             <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-[#00E5FF]/30 rounded-full font-mono shadow-[0_0_20px_rgba(0,229,255,0.2)]">
               <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_10px_rgba(0,229,255,1)]" />
               <span className="text-[#00E5FF] text-[10px] font-black tracking-widest uppercase">Live Premier League</span>
             </div>
             <div className="flex items-center gap-4">
               <span className="flex items-center gap-2 text-xs font-bold bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                 <Eye className="w-4 h-4 text-[#00E5FF]" /> 12.4K
               </span>
               <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-white/20 hover:scale-110 transition-all">
                 <Bell className="w-4 h-4 text-white" />
               </button>
             </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto flex-1 mt-8">
             <div className="flex items-center justify-between w-full">
               
               {/* MCI Left */}
               <div className="flex flex-col items-center gap-4 md:gap-6">
                 <span className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter drop-shadow-[0_0_30px_rgba(0,229,255,0.4)] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-none">MCI</span>
                 <div className="flex flex-col items-center gap-1 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-xl border border-white/5">
                    <span className="text-[10px] font-black tracking-widest text-[#00E5FF] uppercase">Possession</span>
                    <span className="text-2xl font-mono font-black text-white drop-shadow-md">64%</span>
                 </div>
               </div>
               
               {/* Center Score */}
               <div className="flex flex-col items-center relative z-30 mx-4">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00E5FF]/20 blur-[60px] rounded-full pointer-events-none" />
                 <div className="flex items-center justify-center gap-4 md:gap-12 text-8xl md:text-[140px] font-mono font-black tracking-tighter drop-shadow-2xl">
                   <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">2</span>
                   <span className="text-white/20 text-6xl md:text-8xl">-</span>
                   <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">1</span>
                 </div>
                 <div className="flex items-center gap-3 mt-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                   <span className="text-red-500 font-mono font-bold text-xl tracking-widest">68:12</span>
                 </div>
               </div>

               {/* LIV Right */}
               <div className="flex flex-col items-center gap-4 md:gap-6">
                 <span className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter drop-shadow-[0_0_30px_rgba(200,16,46,0.4)] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-none">LIV</span>
                 <div className="flex flex-col items-center gap-1 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-xl border border-white/5">
                    <span className="text-[10px] font-black tracking-widest text-[#C8102E] uppercase">xG Danger</span>
                    <span className="text-2xl font-mono font-black text-white drop-shadow-md">2.4</span>
                 </div>
               </div>
             </div>
          </div>

          <div className="w-full max-w-2xl flex flex-col items-center gap-6 mt-8">
             {/* Integrated AI Sentiment */}
             <div className="w-full bg-black/60 backdrop-blur-xl border border-[#00E5FF]/30 rounded-2xl p-5 flex flex-col shadow-[0_0_30px_rgba(0,229,255,0.1)] relative overflow-hidden group-hover:border-[#00E5FF]/60 transition-colors">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
               <div className="flex items-center gap-2 mb-2 relative z-10">
                 <Mic className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
                 <span className="text-[10px] font-mono font-black text-[#00E5FF] tracking-widest uppercase">AI Tactical Feed</span>
               </div>
               <p className="text-sm md:text-base font-mono text-gray-200 relative z-10">
                 {aiText}<span className="animate-pulse text-[#00E5FF] ml-1">█</span>
               </p>
             </div>

             <Link href="/pulse" className="w-full group/btn relative bg-white text-[#050505] font-black tracking-[0.2em] uppercase py-5 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050505] to-transparent opacity-10 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
               <span className="relative z-10 flex items-center justify-center gap-3">ENTER MATCH PULSE <Zap className="w-4 h-4" /></span>
             </Link>
          </div>

        </div>
      </section>

      {/* 3. CINEMATIC GRID SYSTEM */}
      <section className="pt-8">
        <div className="flex items-center justify-between mb-8 pl-2">
           <h2 className="text-sm font-black tracking-widest text-white drop-shadow-md uppercase">ACTIVE SESSIONS</h2>
           <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Match Card 1: Poster Style */}
          <div className="rounded-[24px] border border-white/5 hover:border-white/20 transition-all duration-500 group relative overflow-hidden flex flex-col h-[450px]">
             {/* Player Poster Background */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#FF7F50]/30 z-0" />
             
             <div className="relative z-10 flex justify-between items-start p-6 mb-auto">
               <div className="flex flex-col gap-2">
                 <span className="flex items-center gap-2 text-[10px] text-black bg-[#FF7F50] px-3 py-1 rounded-full font-black tracking-widest uppercase shadow-[0_0_15px_rgba(255,127,80,0.5)]">
                   <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" /> Live La Liga
                 </span>
                 <span className="text-[10px] text-gray-300 font-mono drop-shadow-md font-bold ml-1">55' • Santiago Bernabéu</span>
               </div>
               <button className="text-white hover:text-[#FF7F50] transition-colors bg-black/40 p-2.5 rounded-full backdrop-blur-md border border-white/10"><Bookmark className="w-4 h-4" /></button>
             </div>

             <div className="relative z-10 p-6 mt-auto flex flex-col gap-6">
               
               {/* Massive MVP Rating Overlay */}
               <div className="flex flex-col w-full">
                 <div className="flex items-end justify-between w-full">
                   <div className="flex flex-col">
                     <span className="text-[9px] font-black text-[#FF7F50] tracking-widest uppercase mb-1 drop-shadow-md">VINI JR. DOMINANCE</span>
                     <span className="text-7xl font-mono font-black text-white drop-shadow-[0_0_30px_rgba(255,127,80,0.6)] leading-none -ml-1 tracking-tighter">9.4</span>
                   </div>
                   <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg">
                     <span className="text-xl font-black text-white">RMA</span>
                     <span className="text-lg font-mono text-[#FF7F50] font-bold">1-1</span>
                     <span className="text-xl font-black text-gray-400">BAR</span>
                   </div>
                 </div>
               </div>

               <Link href="/pulse" className="w-full block text-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white text-white hover:text-black text-xs font-black tracking-[0.2em] uppercase py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                 JOIN PULSE
               </Link>
             </div>
          </div>

          {/* Match Card 2: Poster Style */}
          <div className="rounded-[24px] border border-white/5 hover:border-white/20 transition-all duration-500 group relative overflow-hidden flex flex-col h-[450px]">
             {/* Player Poster Background */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#6200EA]/30 z-0" />
             
             <div className="relative z-10 flex justify-between items-start p-6 mb-auto">
               <div className="flex flex-col gap-2">
                 <span className="flex items-center gap-2 text-[10px] text-white bg-[#6200EA] px-3 py-1 rounded-full font-black tracking-widest uppercase shadow-[0_0_15px_rgba(98,0,234,0.5)]">
                   <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live Serie A
                 </span>
                 <span className="text-[10px] text-gray-300 font-mono drop-shadow-md font-bold ml-1">24' • San Siro</span>
               </div>
               <button className="text-white hover:text-[#6200EA] transition-colors bg-black/40 p-2.5 rounded-full backdrop-blur-md border border-white/10"><Bookmark className="w-4 h-4" /></button>
             </div>

             <div className="relative z-10 p-6 mt-auto flex flex-col gap-6">
               
               {/* Massive MVP Rating Overlay */}
               <div className="flex flex-col w-full">
                 <div className="flex items-end justify-between w-full">
                   <div className="flex flex-col">
                     <span className="text-[9px] font-black text-[#6200EA] tracking-widest uppercase mb-1 drop-shadow-md">R. LEÃO MASTERCLASS</span>
                     <span className="text-7xl font-mono font-black text-white drop-shadow-[0_0_30px_rgba(98,0,234,0.6)] leading-none -ml-1 tracking-tighter">8.2</span>
                   </div>
                   <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg">
                     <span className="text-xl font-black text-white">INT</span>
                     <span className="text-lg font-mono text-[#6200EA] font-bold">0-0</span>
                     <span className="text-xl font-black text-gray-400">MIL</span>
                   </div>
                 </div>
               </div>

               <Link href="/pulse" className="w-full block text-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white text-white hover:text-black text-xs font-black tracking-[0.2em] uppercase py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                 JOIN PULSE
               </Link>
             </div>
          </div>

          {/* Match Card 3: Upcoming Cinematic */}
          <div className="rounded-[24px] border border-white/5 hover:border-white/20 transition-all duration-500 group relative overflow-hidden flex flex-col h-[450px]">
             {/* Stadium Background */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-700 filter grayscale group-hover:grayscale-0" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#00E5FF]/20 z-0" />
             
             <div className="relative z-10 flex justify-between items-start p-6 mb-auto">
               <div className="flex flex-col gap-2">
                 <span className="flex items-center gap-2 text-[10px] text-black bg-[#00E5FF] px-3 py-1 rounded-full font-black tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.5)]">
                   Scheduled • UCL
                 </span>
                 <span className="text-[10px] text-gray-300 font-mono drop-shadow-md font-bold ml-1">Today, 21:00 • Parc des Princes</span>
               </div>
               <button className="text-white hover:text-[#00E5FF] transition-colors bg-black/40 p-2.5 rounded-full backdrop-blur-md border border-white/10"><Bookmark className="w-4 h-4" /></button>
             </div>

             <div className="relative z-10 p-6 mt-auto flex flex-col gap-6">
               
               <div className="flex flex-col w-full items-center justify-center py-6">
                 <div className="flex items-center justify-between w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-md">PSG</span>
                   <span className="text-xl font-black italic text-gray-500">VS</span>
                   <span className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-md">BVB</span>
                 </div>
               </div>

               <Link href="/prematch/1" className="w-full block text-center bg-[#00E5FF] hover:bg-white text-black text-xs font-black tracking-[0.2em] uppercase py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                 MATCH DETAILS
               </Link>
             </div>
          </div>

        </div>
      </section>

      {/* 4. MORE TONIGHT (Secondary List) */}
      <section className="pt-8">
         <div className="flex items-center justify-between mb-6 pl-2">
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase">MORE TONIGHT</h2>
            <Link href="/schedule" className="text-[10px] text-[#00E5FF] font-bold hover:text-white transition-colors tracking-widest uppercase">
               View Full Schedule &gt;
            </Link>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* List Item 1 */}
            <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-white/5 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
               <div className="flex items-center gap-6 relative z-10">
                  <div className="flex flex-col w-12 shrink-0">
                    <span className="text-lg font-black text-white drop-shadow-md">20:45</span>
                    <span className="text-[9px] text-gray-500 font-bold tracking-widest group-hover:text-[#00E5FF] transition-colors">TODAY</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-6 h-6 object-contain bg-white rounded-full p-0.5 shadow-md group-hover:scale-110 transition-transform" alt="ARS" />
                          <span className="font-bold text-sm text-white group-hover:text-[#00E5FF] transition-colors">ARS</span>
                       </div>
                       <span className="text-gray-600 text-xs font-black italic">VS</span>
                       <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg" className="w-6 h-6 object-contain bg-[#003399] rounded-full p-0.5 shadow-md group-hover:scale-110 transition-transform" alt="EVE" />
                          <span className="font-bold text-sm text-white group-hover:text-[#00E5FF] transition-colors">EVE</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase">
                       <GitBranch className="w-3 h-3 text-[#00E5FF] group-hover:animate-pulse" /> 
                       <span className="text-gray-500">EXPECTED:</span> 
                       <span className="text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">TACTICAL</span>
                    </div>
                  </div>
               </div>
               <div className="flex flex-col items-end gap-2 relative z-10">
                  <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-bold tracking-widest border border-white/5">EPL</span>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                     <span className="text-[10px] text-[#00E5FF] font-black tracking-widest drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">PREVIEW</span>
                  </div>
               </div>
            </div>

            {/* List Item 2 */}
            <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-white/5 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF7F50]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
               <div className="flex items-center gap-6 relative z-10">
                  <div className="flex flex-col w-12 shrink-0">
                    <span className="text-lg font-black text-white drop-shadow-md">21:00</span>
                    <span className="text-[9px] text-gray-500 font-bold tracking-widest group-hover:text-[#FF7F50] transition-colors">TODAY</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg" className="w-6 h-6 object-contain bg-white rounded-full p-0.5 shadow-md group-hover:scale-110 transition-transform" alt="AVL" />
                          <span className="font-bold text-sm text-white group-hover:text-[#FF7F50] transition-colors">AVL</span>
                       </div>
                       <span className="text-gray-600 text-xs font-black italic">VS</span>
                       <div className="flex items-center gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg" className="w-6 h-6 object-contain bg-white rounded-full p-0.5 shadow-md group-hover:scale-110 transition-transform" alt="WHU" />
                          <span className="font-bold text-sm text-white group-hover:text-[#FF7F50] transition-colors">WHU</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase">
                       <Zap className="w-3 h-3 text-[#FF7F50] group-hover:animate-pulse" /> 
                       <span className="text-gray-500">EXPECTED:</span> 
                       <span className="text-[#FF7F50] drop-shadow-[0_0_10px_rgba(255,127,80,0.5)]">CHAOS</span>
                    </div>
                  </div>
               </div>
               <div className="flex flex-col items-end gap-2 relative z-10">
                  <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-bold tracking-widest border border-white/5">EPL</span>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                     <span className="text-[10px] text-[#FF7F50] font-black tracking-widest drop-shadow-[0_0_10px_rgba(255,127,80,0.8)]">PREVIEW</span>
                  </div>
               </div>
            </div>

         </div>
      </section>

    </div>
  );
}
