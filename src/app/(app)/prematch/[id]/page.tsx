"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Share, Shield, Zap, Mic, Flame, ChevronRight, Trophy, Target, Activity } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/ui/BackButton";

const playerOptions = [
  { name: 'DE BRUYNE', team: 'Man City', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=200&auto=format&fit=crop' },
  { name: 'HAALAND', team: 'Man City', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop' },
  { name: 'SALAH', team: 'Liverpool', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' },
  { name: 'DARWIN NÚÑEZ', team: 'Liverpool', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop' },
  { name: 'VAN DIJK', team: 'Liverpool', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
];

export default function PreMatchDetails() {
  const [activeTab, setActiveTab] = useState('LINEUP');
  const [votes, setVotes] = useState({ chaos: 64, tactical: 22, tension: 14 });
  const [mvpWatchPlayer, setMvpWatchPlayer] = useState('DE BRUYNE');
  const [fraudWatchPlayer, setFraudWatchPlayer] = useState('DARWIN NÚÑEZ');

  const handleVote = (type: 'chaos' | 'tactical' | 'tension') => {
    setVotes(prev => {
      const others = (['chaos', 'tactical', 'tension'] as const).filter(t => t !== type);
      
      // If the other two are both 0, we can't increase this one anymore
      if (prev[others[0]] === 0 && prev[others[1]] === 0) return prev;
      
      let newVotes = { ...prev };
      newVotes[type] += 2;
      
      if (newVotes[others[0]] > 0 && newVotes[others[1]] > 0) {
        newVotes[others[0]] -= 1;
        newVotes[others[1]] -= 1;
      } else if (newVotes[others[0]] > 0) {
        newVotes[others[0]] -= 2;
      } else {
        newVotes[others[1]] -= 2;
      }
      
      return newVotes;
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00E5FF]/30 pb-24 overflow-x-hidden">
      
      {/* 1. Sleek Hero Header */}
      <div className="relative w-full pt-16 pb-32 flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
        {/* Background Image & Gradients */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-screen" />
           <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00E5FF]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto z-20 flex flex-col px-4 md:px-6">
           {/* Top Nav */}
           <div className="flex justify-between items-center mb-12 md:mb-16 w-full">
             <BackButton containerClassName="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md" iconClassName="w-5 h-5" />
             <div className="flex gap-2">
               <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md">
                 <Bell className="w-4 h-4" />
               </button>
               <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md">
                 <Share className="w-4 h-4" />
               </button>
             </div>
           </div>

           {/* Central Match Info */}
           <div className="flex flex-col items-center w-full">
              <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 flex items-center gap-2 shadow-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-[9px] text-gray-300 font-bold tracking-widest uppercase">PRE-MATCH BUILDUP</span>
              </div>
              
              <div className="flex items-center justify-center gap-6 md:gap-24 w-full mb-12">
                 {/* Team 1 */}
                 <div className="flex flex-col items-center gap-5 flex-1">
                    <div className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center drop-shadow-[0_0_40px_rgba(108,171,221,0.15)] transition-transform hover:scale-105">
                      <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-full h-full object-contain" alt="MCI" />
                    </div>
                    <h1 className="text-xl md:text-3xl font-black tracking-tight text-white text-center uppercase">Man City</h1>
                 </div>
                 
                 {/* VS */}
                 <div className="flex flex-col items-center shrink-0">
                    <span className="text-sm md:text-lg font-black text-gray-700 italic tracking-widest mb-6">VS</span>
                 </div>

                 {/* Team 2 */}
                 <div className="flex flex-col items-center gap-5 flex-1">
                    <div className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center drop-shadow-[0_0_40px_rgba(200,16,46,0.15)] transition-transform hover:scale-105">
                      <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-full h-full object-contain" alt="LIV" />
                    </div>
                    <h1 className="text-xl md:text-3xl font-black tracking-tight text-white text-center uppercase">Liverpool</h1>
                 </div>
              </div>

              <div className="flex flex-col items-center mb-6">
                 <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-2">KICKOFF IN</span>
                 <span className="text-6xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl" style={{ fontVariantNumeric: 'tabular-nums' }}>45:00</span>
              </div>

              <span className="text-[10px] md:text-xs font-medium flex items-center gap-2 text-gray-400">
                 <Activity className="w-3.5 h-3.5 text-[#00E5FF]" /> Sun, 12 May • 5:30 PM
              </span>
           </div>
        </div>
      </div>

      <div className="px-4 md:px-6 max-w-[1400px] mx-auto pb-12 relative z-30 -mt-16 md:-mt-28">
        
        {/* Top 4 Info Cards overlapping Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
           {/* 2. Crowdcast */}
           <section className="bg-[#121212]/80 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-4">
                 <div>
                   <h2 className="text-[10px] font-black tracking-widest uppercase mb-1">CROWDCAST</h2>
                   <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" /> 12.4K voting
                   </div>
                 </div>
                 <span className="text-[#00E5FF] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 bg-[#00E5FF]/10 rounded-full border border-[#00E5FF]/30">Live</span>
              </div>

              <div className="flex gap-2 flex-1">
                 <div onClick={() => handleVote('chaos')} className="flex-1 bg-[#0A0A0A] rounded-2xl flex flex-col items-center justify-center border border-[#FF7F50]/20 relative overflow-hidden cursor-pointer hover:bg-white/5 transition-colors group p-2">
                    <div className="absolute bottom-0 left-0 w-full bg-[#FF7F50]/10 transition-all duration-300" style={{ height: `${votes.chaos}%` }} />
                    <Flame className="w-4 h-4 text-[#FF7F50] mb-1 relative z-10 group-active:scale-110 transition-transform" />
                    <span className="text-xl font-black relative z-10 text-white transition-all">{votes.chaos}%</span>
                 </div>
                 <div onClick={() => handleVote('tactical')} className="flex-1 bg-[#0A0A0A] rounded-2xl flex flex-col items-center justify-center border border-[#00E5FF]/20 relative overflow-hidden cursor-pointer hover:bg-white/5 transition-colors group p-2">
                    <div className="absolute bottom-0 left-0 w-full bg-[#00E5FF]/10 transition-all duration-300" style={{ height: `${votes.tactical}%` }} />
                    <Shield className="w-4 h-4 text-[#00E5FF] mb-1 relative z-10 group-active:scale-110 transition-transform" />
                    <span className="text-xl font-black relative z-10 text-white transition-all">{votes.tactical}%</span>
                 </div>
                 <div onClick={() => handleVote('tension')} className="flex-1 bg-[#0A0A0A] rounded-2xl flex flex-col items-center justify-center border border-purple-500/20 relative overflow-hidden cursor-pointer hover:bg-white/5 transition-colors group p-2">
                    <div className="absolute bottom-0 left-0 w-full bg-purple-500/10 transition-all duration-300" style={{ height: `${votes.tension}%` }} />
                    <Zap className="w-4 h-4 text-purple-500 mb-1 relative z-10 group-active:scale-110 transition-transform" />
                    <span className="text-xl font-black relative z-10 text-white transition-all">{votes.tension}%</span>
                 </div>
              </div>
           </section>

           {/* 3. Join the Discussion */}
           <Link href="/stands/2" className="block cursor-pointer">
             <section className="bg-gradient-to-r from-[#121212]/90 to-[#1a1a1a]/90 backdrop-blur-xl rounded-3xl p-5 h-full flex flex-col justify-center border border-white/10 relative overflow-hidden hover:border-white/20 transition-colors shadow-2xl">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-screen" />
               <div className="relative z-10 flex justify-between items-center h-full">
                  <div>
                     <h2 className="text-lg font-black tracking-tighter mb-1 uppercase">JOIN THE<br/>DISCUSSION</h2>
                     <p className="text-[10px] text-gray-400">12.4K active in stands</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#00E5FF] hover:bg-[#00E5FF]/90 transition-colors flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] shrink-0">
                     <Mic className="w-5 h-5 text-black" fill="currentColor" />
                  </div>
               </div>
             </section>
           </Link>

           {/* MVP Watch */}
           <div className="bg-[#121212]/80 backdrop-blur-xl border border-[#00E5FF]/30 rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent z-0 pointer-events-none" />
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none">
                 <img src={playerOptions.find(p => p.name === mvpWatchPlayer)?.img} className="w-full h-full object-cover object-top mix-blend-luminosity" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                 <div className="absolute inset-0 bg-gradient-to-l from-[#121212] to-transparent" />
              </div>
              <div className="relative z-10 w-full h-full flex flex-col justify-center">
                 <h3 className="text-[10px] font-black tracking-widest text-[#00E5FF] uppercase mb-2">MVP WATCH</h3>
                 <select 
                   value={mvpWatchPlayer}
                   onChange={(e) => setMvpWatchPlayer(e.target.value)}
                   className="w-full bg-transparent text-lg font-black uppercase mb-1 focus:outline-none appearance-none cursor-pointer hover:text-[#00E5FF] transition-colors pb-1 border-b border-white/10"
                 >
                   {playerOptions.map(p => <option key={p.name} value={p.name} className="bg-[#121212] text-sm">{p.name}</option>)}
                 </select>
                 <p className="text-[10px] text-gray-400 mb-2">{playerOptions.find(p => p.name === mvpWatchPlayer)?.team}</p>
                 <div className="flex items-end gap-1.5 mt-auto">
                   <span className="text-xl font-black text-[#00E5FF] leading-none">8.7</span>
                   <span className="text-[9px] text-gray-500 uppercase pb-0.5">Season rating</span>
                 </div>
              </div>
           </div>

           {/* Fraud Watch */}
           <div className="bg-[#121212]/80 backdrop-blur-xl border border-[#D32F2F]/30 rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent z-0 pointer-events-none" />
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none">
                 <img src={playerOptions.find(p => p.name === fraudWatchPlayer)?.img} className="w-full h-full object-cover object-top mix-blend-luminosity" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                 <div className="absolute inset-0 bg-gradient-to-l from-[#121212] to-transparent" />
              </div>
              <div className="relative z-10 w-full h-full flex flex-col justify-center">
                 <h3 className="text-[10px] font-black tracking-widest text-[#D32F2F] uppercase mb-2">FRAUD WATCH</h3>
                 <select 
                   value={fraudWatchPlayer}
                   onChange={(e) => setFraudWatchPlayer(e.target.value)}
                   className="w-full bg-transparent text-lg font-black uppercase mb-1 focus:outline-none appearance-none cursor-pointer hover:text-[#D32F2F] transition-colors pb-1 border-b border-white/10"
                 >
                   {playerOptions.map(p => <option key={p.name} value={p.name} className="bg-[#121212] text-sm">{p.name}</option>)}
                 </select>
                 <p className="text-[10px] text-gray-400 mb-2">{playerOptions.find(p => p.name === fraudWatchPlayer)?.team}</p>
                 <div className="flex items-end gap-1.5 mt-auto">
                   <span className="text-[10px] font-bold text-gray-300 leading-tight">Needs a big performance</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Match Center */}
        <div className="max-w-4xl mx-auto">
          <section className="bg-[#121212] rounded-3xl border border-white/5 p-6 overflow-hidden">
             <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black tracking-widest uppercase">MATCH CENTER</h2>
                  <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-gray-400">i</div>
               </div>
               <span className="text-[10px] text-gray-500 font-bold uppercase">Swipe or tap to explore</span>
             </div>

             {/* Tabs */}
             <div className="flex bg-[#0A0A0A] rounded-full p-1 mb-8 overflow-x-auto hide-scrollbar">
               {['LINEUP', 'H2H', 'STANDINGS', 'FORM', 'KEY BATTLES'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[80px] py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest transition-colors ${activeTab === tab ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : 'text-gray-500 hover:text-white'}`}
                  >
                    {tab}
                  </button>
               ))}
             </div>

             {/* Dynamic Content based on Active Tab */}
             <div className="min-h-[450px]">
                {activeTab === 'LINEUP' && <LineupTab />}
                {activeTab === 'H2H' && <H2HTab />}
                {activeTab === 'STANDINGS' && <StandingsTab />}
                {activeTab === 'FORM' && <FormTab />}
                {activeTab === 'KEY BATTLES' && <KeyBattlesTab />}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Tab Components
// ---------------------------------------------------------

function LineupTab() {
  const [vibe, setVibe] = useState(80);
  const [tactical, setTactical] = useState(45);

  const mciPlayers = [
    { name: "EDERSON", x: 50, y: 6 },
    { name: "WALKER", x: 15, y: 15 },
    { name: "DIAS", x: 35, y: 15 },
    { name: "AKANJI", x: 65, y: 15 },
    { name: "GVARDIOL", x: 85, y: 15 },
    { name: "DE BRUYNE", x: 30, y: 25, glow: true },
    { name: "RODRI", x: 50, y: 23 },
    { name: "SILVA", x: 70, y: 25 },
    { name: "FODEN", x: 20, y: 35 },
    { name: "HAALAND", x: 50, y: 38, glow: true },
    { name: "DOKU", x: 80, y: 35 },
  ];

  const livPlayers = [
    { name: "ALISSON", x: 50, y: 94 },
    { name: "TRENT", x: 15, y: 85 },
    { name: "VAN DIJK", x: 35, y: 85, glow: true },
    { name: "KONATÉ", x: 65, y: 85 },
    { name: "ROBERTSON", x: 85, y: 85 },
    { name: "MAC ALLISTER", x: 30, y: 75, glow: true },
    { name: "GRAVENBERCH", x: 50, y: 77 },
    { name: "SZOBOSZLAI", x: 70, y: 75 },
    { name: "DIAZ", x: 20, y: 65 },
    { name: "JOTA", x: 50, y: 62 },
    { name: "SALAH", x: 80, y: 65, glow: true },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      
      {/* Pitch & Bench Container */}
      <div className="w-full max-w-[420px] mx-auto">
         {/* Pitch Area */}
         <div className="relative w-full h-[700px] bg-[#070e0a] rounded-t-2xl border border-white/5 border-b-0 overflow-hidden pt-2">
            {/* Team Logos */}
            <div className="absolute top-4 left-4 font-black text-white/20 text-xl tracking-tighter flex items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-6 h-6 opacity-40 grayscale brightness-200" alt="" />
              MCI
            </div>
            <div className="absolute bottom-4 right-4 font-black text-white/20 text-xl tracking-tighter flex items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-5 h-6 opacity-40 grayscale brightness-200" alt="" />
              LIV
            </div>

            {/* Pitch Markings */}
            <div className="absolute inset-4 border border-green-900/30 rounded-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 top-4 w-40 h-20 border border-t-0 border-green-900/30 rounded-b-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 top-4 w-20 h-8 border border-t-0 border-green-900/30 rounded-b-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-40 h-20 border border-b-0 border-green-900/30 rounded-t-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-20 h-8 border border-b-0 border-green-900/30 rounded-t-lg" />
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-px bg-green-900/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-green-900/30" />

            {/* MCI Players */}
            {mciPlayers.map((p, i) => (
              <div key={i} className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                 <div className={`w-10 h-10 rounded-2xl ${p.glow ? 'border-2 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.6)]' : 'border border-white/20'} overflow-hidden mb-1 relative bg-[#0A0A0A]`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt={p.name} className="w-full h-full object-cover opacity-90" />
                 </div>
                 <span className="text-[9px] font-black tracking-wider text-[#00E5FF] drop-shadow-md">{p.name}</span>
              </div>
            ))}

            {/* LIV Players */}
            {livPlayers.map((p, i) => (
              <div key={i} className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                 <div className={`w-10 h-10 rounded-2xl ${p.glow ? 'border-2 border-[#FF7F50] shadow-[0_0_15px_rgba(255,79,0,0.6)]' : 'border border-white/20'} overflow-hidden mb-1 relative bg-[#0A0A0A]`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt={p.name} className="w-full h-full object-cover opacity-90" />
                 </div>
                 <span className="text-[9px] font-black tracking-wider text-[#FF7F50] drop-shadow-md">{p.name}</span>
              </div>
            ))}
         </div>

         {/* Bench */}
         <div className="w-full bg-[#1A1A1A] rounded-b-2xl p-4 border border-white/5 border-t-0 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-[#00E5FF]" />
              <div className="flex gap-1.5">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10"><img src="https://i.pravatar.cc/100?img=1" className="w-full h-full object-cover"/></div>
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10"><img src="https://i.pravatar.cc/100?img=2" className="w-full h-full object-cover"/></div>
                <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20" />
                <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20" />
                <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="flex gap-1.5">
                <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20" />
                <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20" />
                <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20" />
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10"><img src="https://i.pravatar.cc/100?img=3" className="w-full h-full object-cover"/></div>
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10"><img src="https://i.pravatar.cc/100?img=4" className="w-full h-full object-cover"/></div>
              </div>
              <div className="w-1 h-4 bg-[#FF7F50]" />
            </div>
         </div>
      </div>

      {/* Lineup Confidence */}
      <div>
         <h3 className="text-[10px] font-black tracking-widest text-gray-500 mb-6 uppercase">LINEUP CONFIDENCE</h3>
         
         <div className="mb-8">
           <div className="flex justify-between items-end mb-3">
             <div className="flex items-center gap-2">
               <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-5 h-5" alt=""/>
               <span className="text-[10px] font-black uppercase">YOUR VIBE <span className="text-gray-400">(MCI FANS)</span></span>
             </div>
             <span className="text-[10px] font-black text-[#00E5FF] tracking-widest">FEELING GOOD</span>
           </div>
           <div className="flex justify-between text-[8px] text-gray-500 font-bold mb-1">
             <span>WORRIED</span>
             <span>CONFIDENT</span>
           </div>
           <input 
             type="range" min="0" max="100" 
             value={vibe} onChange={(e) => setVibe(parseInt(e.target.value))}
             className="w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#00E5FF] [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
           />
         </div>

         <div className="mb-10">
           <div className="flex justify-between items-end mb-3">
             <div className="flex items-center gap-2">
               <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-4 h-5" alt=""/>
               <span className="text-[10px] font-black uppercase text-gray-400">LIVERPOOL FANS</span>
             </div>
             <div className="flex items-center gap-1.5">
               <span className="text-[10px] font-black text-[#D32F2F] tracking-widest">42% WORRIED</span>
               <div className="w-3 h-3 border border-gray-600 rounded-sm flex flex-col items-center justify-center text-[6px] text-gray-500">🔒</div>
             </div>
           </div>
           <div className="w-full h-1 bg-white/10 rounded-full">
             <div className="h-full bg-[#D32F2F] rounded-full" style={{ width: '42%' }} />
           </div>
         </div>

         <div>
           <div className="flex justify-between items-end mb-4">
             <span className="text-[10px] font-black uppercase">NEUTRAL: WHO HAS THE TACTICAL EDGE?</span>
           </div>
           <div className="flex justify-between text-[8px] text-gray-500 font-bold mb-1">
             <span>MCI</span>
             <span>LIV</span>
           </div>
           <input 
             type="range" min="0" max="100" 
             value={tactical} onChange={(e) => setTactical(parseInt(e.target.value))}
             className="w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#00E5FF] [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
           />
         </div>
      </div>
    </div>
  );
}

function H2HTab() {
  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5">
        <h3 className="text-[10px] font-black text-center text-gray-400 tracking-widest mb-6">LAST 5 MEETINGS</h3>
        
        <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-[#4FC3F7] mb-2" />
               <span className="text-[10px] font-bold">MAN CITY</span>
            </div>
            <div className="flex gap-6 text-center">
               <div><div className="text-2xl font-black text-[#00E5FF]">3</div><div className="text-[8px] text-[#00E5FF] tracking-widest">WINS</div></div>
               <div><div className="text-2xl font-black text-white">1</div><div className="text-[8px] text-gray-400 tracking-widest">DRAW</div></div>
               <div><div className="text-2xl font-black text-[#D32F2F]">1</div><div className="text-[8px] text-[#D32F2F] tracking-widest">WIN</div></div>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-[#D32F2F] mb-2" />
               <span className="text-[10px] font-bold">LIVERPOOL</span>
            </div>
        </div>

        <div className="space-y-4">
           {[
             { d: "Dec '23", h: "Man City", s: "1 - 1", a: "Liverpool" },
             { d: "Nov '23", h: "Liverpool", s: "1 - 1", a: "Man City" },
             { d: "Apr '23", h: "Man City", s: "4 - 1", a: "Liverpool" },
             { d: "Oct '22", h: "Liverpool", s: "1 - 0", a: "Man City" },
             { d: "Apr '22", h: "Man City", s: "2 - 1", a: "Liverpool" },
           ].map((m, i) => (
             <div key={i} className="flex items-center justify-between text-xs border-b border-white/5 pb-2 last:border-0">
               <span className="text-gray-500 w-12">{m.d}</span>
               <span className="flex-1 text-right text-gray-300">{m.h}</span>
               <span className="font-black px-4">{m.s}</span>
               <span className="flex-1 text-left text-gray-300">{m.a}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function StandingsTab() {
  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="bg-[#0A0A0A] rounded-2xl p-4 border border-white/5 overflow-x-auto hide-scrollbar">
         <div className="text-[9px] font-black text-gray-500 tracking-widest uppercase mb-4 px-2">Premier League</div>
         <table className="w-full text-xs text-left">
           <thead>
             <tr className="text-[9px] text-gray-500 border-b border-white/5">
               <th className="pb-2 font-normal w-6 text-center">#</th>
               <th className="pb-2 font-normal">TEAM</th>
               <th className="pb-2 font-normal text-right">P</th>
               <th className="pb-2 font-normal text-right">GD</th>
               <th className="pb-2 font-normal text-right pr-2">PTS</th>
             </tr>
           </thead>
           <tbody>
             {[
               { p: 1, t: "Liverpool", icon: "bg-[#D32F2F]", ply: 35, gd: "+41", pts: 80, hl: false },
               { p: 2, t: "Man City", icon: "bg-[#4FC3F7]", ply: 35, gd: "+37", pts: 79, hl: true },
               { p: 3, t: "Arsenal", icon: "bg-red-500", ply: 35, gd: "+29", pts: 68, hl: false },
               { p: 4, t: "Aston Villa", icon: "bg-purple-900", ply: 35, gd: "+20", pts: 66, hl: false },
               { p: 5, t: "Tottenham", icon: "bg-white", ply: 35, gd: "+13", pts: 60, hl: false },
             ].map((r, i) => (
               <tr key={i} className={`border-b border-white/5 last:border-0 ${r.hl ? 'bg-[#00E5FF]/5' : ''}`}>
                 <td className={`py-3 text-center ${r.hl ? 'text-[#00E5FF] font-bold' : 'text-gray-400'}`}>{r.p}</td>
                 <td className="py-3 flex items-center gap-2">
                   <div className={`w-4 h-4 rounded-full ${r.icon}`} />
                   <span className={r.hl ? 'text-[#00E5FF] font-bold' : 'text-gray-200'}>{r.t}</span>
                 </td>
                 <td className="py-3 text-right text-gray-400">{r.ply}</td>
                 <td className="py-3 text-right text-gray-400">{r.gd}</td>
                 <td className={`py-3 text-right pr-2 font-bold ${r.hl ? 'text-[#00E5FF]' : 'text-white'}`}>{r.pts}</td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>
    </div>
  );
}

function FormTab() {
  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5">
         <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-gray-400 mb-3">MAN CITY</span>
              <div className="flex gap-2">
                 {['W','W','W','D','W'].map((r,i) => (
                   <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${r==='W' ? 'bg-green-500/20 text-green-500' : r==='D' ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-500'}`}>{r}</div>
                 ))}
              </div>
              <div className="flex gap-4 mt-4 text-[10px] text-gray-500">
                <span>Last 5</span>
                <span>GF <strong className="text-white">14</strong></span>
                <span>GA <strong className="text-white">4</strong></span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase text-[#D32F2F] mb-3">LIVERPOOL</span>
              <div className="flex gap-2">
                 {['W','W','L','W','D'].map((r,i) => (
                   <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${r==='W' ? 'bg-green-500/20 text-green-500' : r==='D' ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-500'}`}>{r}</div>
                 ))}
              </div>
              <div className="flex gap-4 mt-4 text-[10px] text-gray-500">
                <span>Last 5</span>
                <span>GF <strong className="text-white">9</strong></span>
                <span>GA <strong className="text-white">5</strong></span>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function KeyBattlesTab() {
  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="space-y-4">
         <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold">Haaland</span>
                 <span className="text-[10px] text-gray-500">Man City</span>
               </div>
            </div>
            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[8px] font-black text-gray-500">VS</div>
            <div className="flex items-center gap-3 text-right flex-row-reverse">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold">Van Dijk</span>
                 <span className="text-[10px] text-[#D32F2F]">Liverpool</span>
               </div>
            </div>
         </div>

         <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold">De Bruyne</span>
                 <span className="text-[10px] text-gray-500">Man City</span>
               </div>
            </div>
            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[8px] font-black text-gray-500">VS</div>
            <div className="flex items-center gap-3 text-right flex-row-reverse">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold">Mac Allister</span>
                 <span className="text-[10px] text-[#D32F2F]">Liverpool</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
