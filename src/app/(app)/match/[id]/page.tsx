"use client";

import Link from "next/link";
import { ArrowLeft, Share, Eye, Shield, Zap, X, Play, ThumbsUp, ThumbsDown, ChevronRight, BarChart3, Activity, Clock, Mic, Flame } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/ui/BackButton";

const hotTakes = [
  {
    id: 1,
    question: "Was Salah the right MVP?",
    options: [
      { text: "Yes, 100% deserved", percent: 72, color: "bg-[#00E5FF]" },
      { text: "No, Van Dijk deserved it", percent: 18, color: "bg-[#00E5FF]/30" },
      { text: "Someone else", percent: 10, color: "bg-[#00E5FF]/30" }
    ],
    votes: "8.7K votes"
  },
  {
    id: 2,
    question: "Was the VAR decision fair?",
    options: [
      { text: "Correct decision", percent: 32, color: "bg-gray-500" },
      { text: "Robbery!", percent: 58, color: "bg-[#FF3B00]" },
      { text: "Too close to call", percent: 10, color: "bg-[#00E5FF]/30" }
    ],
    votes: "7.9K votes"
  },
  {
    id: 3,
    question: "What won Liverpool the game?",
    options: [
      { text: "Midfield control", percent: 41, color: "bg-[#00E5FF]" },
      { text: "Salah's brilliance", percent: 37, color: "bg-[#00E5FF]/80" },
      { text: "City's poor finishing", percent: 22, color: "bg-[#00E5FF]/50" }
    ],
    votes: "6.3K votes"
  }
];

const highlights = [
  {
    id: 1,
    user: "FootyFan99",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
    text: "That referee decision was absolutely shocking! Listen to my rant. 😠 #Robbery",
    duration: "0:42",
    likes: "24K"
  },
  {
    id: 2,
    user: "RedArmyTalk",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
    text: "Midfield was everywhere today. We controlled the game! 🔴 #LIVMCI",
    duration: "0:31",
    likes: "18K"
  },
  {
    id: 3,
    user: "CityzenKDB17",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50&h=50&fit=crop",
    text: "We were so wasteful in front of goal. This is frustrating. 😩",
    duration: "0:28",
    likes: "12K"
  }
];

const pitchLIV = [
  { id: 1, name: "Alisson", num: 1, pos: "GK", rating: "7.5", top: "90%", left: "50%" },
  { id: 2, name: "Trent", num: 66, pos: "RB", rating: "7.9", top: "78%", left: "85%" },
  { id: 3, name: "Konate", num: 5, pos: "CB", rating: "8.2", top: "82%", left: "65%" },
  { id: 4, name: "Van Dijk", num: 4, pos: "CB", rating: "8.4", top: "82%", left: "35%" },
  { id: 5, name: "Robertson", num: 26, pos: "LB", rating: "7.2", top: "78%", left: "15%" },
  { id: 6, name: "Mac Allister", num: 10, pos: "CM", rating: "8.1", top: "65%", left: "65%" },
  { id: 7, name: "Endo", num: 3, pos: "CDM", rating: "7.8", top: "72%", left: "50%" },
  { id: 8, name: "Szoboszlai", num: 8, pos: "CM", rating: "7.4", top: "65%", left: "35%" },
  { id: 9, name: "Salah", num: 11, pos: "RW", rating: "9.2", top: "52%", left: "80%" },
  { id: 10, name: "Nunez", num: 9, pos: "ST", rating: "7.1", top: "48%", left: "50%" },
  { id: 11, name: "Diaz", num: 7, pos: "LW", rating: "8.0", top: "52%", left: "20%" },
];

const pitchMCI = [
  { id: 12, name: "Ederson", num: 31, pos: "GK", rating: "6.5", top: "10%", left: "50%" },
  { id: 13, name: "Walker", num: 2, pos: "RB", rating: "6.2", top: "22%", left: "20%" },
  { id: 14, name: "Dias", num: 3, pos: "CB", rating: "6.8", top: "18%", left: "35%" },
  { id: 15, name: "Ake", num: 6, pos: "CB", rating: "6.4", top: "18%", left: "65%" },
  { id: 16, name: "Gvardiol", num: 24, pos: "LB", rating: "6.0", top: "22%", left: "80%" },
  { id: 17, name: "Rodri", num: 16, pos: "CDM", rating: "7.5", top: "28%", left: "50%" },
  { id: 18, name: "Foden", num: 47, pos: "RM", rating: "6.9", top: "35%", left: "20%" },
  { id: 19, name: "De Bruyne", num: 17, pos: "CM", rating: "6.3", top: "35%", left: "35%" },
  { id: 20, name: "Silva", num: 20, pos: "CM", rating: "6.4", top: "35%", left: "65%" },
  { id: 21, name: "Doku", num: 11, pos: "LM", rating: "6.6", top: "35%", left: "80%" },
  { id: 22, name: "Haaland", num: 9, pos: "ST", rating: "6.1", top: "45%", left: "50%" },
];

const subsLIV = [
  { name: "Kelleher", rating: "N/A" }, { name: "Gomez", rating: "6.5" }, { name: "Elliott", rating: "7.0" }, { name: "Gakpo", rating: "6.8" }
];
const subsMCI = [
  { name: "Ortega", rating: "N/A" }, { name: "Akanji", rating: "6.2" }, { name: "Kovacic", rating: "6.5" }, { name: "Alvarez", rating: "6.1" }
];

const coaches = {
  liv: { name: "Jurgen Klopp", rating: "8.5" },
  mci: { name: "Pep Guardiola", rating: "6.0" }
};

export default function MatchDetailsPage() {
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 md:p-8 bg-[#020202] min-h-screen text-white pb-24">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between mb-8">
        <BackButton containerClassName="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md bg-[#0A0A0A]" iconClassName="w-5 h-5 text-white" />
        <h1 className="text-sm font-black tracking-widest text-gray-400 uppercase">Match Center</h1>
        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md bg-[#0A0A0A]">
          <Share className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Cinematic Scoreboard */}
      <div className="relative w-full rounded-[32px] overflow-hidden mb-12 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D32F2F]/20 via-[#020202] to-[#4FC3F7]/20 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10" />
        
        <div className="relative z-20 p-8 md:p-16 flex flex-col items-center justify-center">
          <div className="px-4 py-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black tracking-widest text-[#00E5FF] uppercase mb-8">
            Full Time
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-16 w-full max-w-2xl">
            {/* LIVERPOOL */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-[0_0_40px_rgba(211,47,47,0.3)] mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" alt="LIV" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-sm md:text-xl font-black tracking-wider uppercase text-center">Liverpool</h2>
            </div>

            {/* SCORE */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="text-5xl md:text-7xl font-black tracking-tighter tabular-nums drop-shadow-2xl">
                2 <span className="text-gray-600 font-normal mx-2">-</span> 0
              </div>
            </div>

            {/* MAN CITY */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-[0_0_40px_rgba(79,195,247,0.3)] mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" alt="MCI" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-sm md:text-xl font-black tracking-wider uppercase text-center">Man City</h2>
            </div>
          </div>

          {/* Goal Scorers */}
          <div className="mt-12 flex flex-col items-center gap-2">
            <div className="bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 rounded-xl px-6 py-3 flex items-center gap-4 text-xs font-bold text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-[#00E5FF]">⚽</span> Salah 2'
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <div className="flex items-center gap-2">
                <span className="text-[#00E5FF]">⚽</span> Konate 78'
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Modern Pills */}
      <div className="flex gap-3 overflow-x-auto pb-6 hover-scrollbar hide-scrollbar-mobile mb-4 border-b border-white/5">
        {['OVERVIEW', 'TIMELINE', 'STATS', 'STANDS'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full text-xs font-black tracking-widest whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab 
                ? 'bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.15)]' 
                : 'border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {tab === 'OVERVIEW' && <Activity className={`w-4 h-4 ${activeTab === tab ? 'animate-pulse' : ''}`} />}
            {tab === 'TIMELINE' && <Clock className="w-4 h-4" />}
            {tab === 'STATS' && <BarChart3 className="w-4 h-4" />}
            {tab === 'STANDS' && <Mic className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Content */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-12">
          
          {/* Pitch View Roster */}
          <section className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-black tracking-widest text-white uppercase flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" /> PITCH RATINGS
              </h2>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
              {/* Pitch */}
              <div className="flex-1 relative bg-gradient-to-b from-[#113A1E] to-[#1A4A28] rounded-[24px] border border-white/20 shadow-2xl overflow-hidden min-h-[600px] xl:min-h-[800px]">
                {/* Field Lines */}
                <div className="absolute inset-4 border border-white/30 rounded-lg pointer-events-none" />
                <div className="absolute top-1/2 left-4 right-4 h-px bg-white/30 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 border border-white/30 rounded-full pointer-events-none" />
                
                {/* Penalty Boxes */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-40 sm:w-56 h-16 sm:h-24 border border-white/30 border-t-0 pointer-events-none" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-6 sm:h-8 border border-white/30 border-t-0 pointer-events-none" />
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 sm:w-56 h-16 sm:h-24 border border-white/30 border-b-0 pointer-events-none" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-6 sm:h-8 border border-white/30 border-b-0 pointer-events-none" />

                {/* Team Labels */}
                <div className="absolute top-6 left-6 text-white/20 font-black text-3xl uppercase tracking-widest rotate-90 origin-left pointer-events-none">MCI</div>
                <div className="absolute bottom-6 right-6 text-white/20 font-black text-3xl uppercase tracking-widest -rotate-90 origin-right pointer-events-none">LIV</div>

                {/* Players */}
                {[...pitchMCI, ...pitchLIV].map(player => {
                  const isLiv = pitchLIV.some(p => p.id === player.id);
                  const isHighRating = parseFloat(player.rating) >= 8.0;
                  const isLowRating = parseFloat(player.rating) <= 6.3;
                  
                  return (
                    <div 
                      key={player.id} 
                      className="absolute flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ top: player.top, left: player.left }}
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-black border-[3px] shadow-lg transition-transform group-hover:scale-110 ${
                        isLiv 
                          ? 'bg-[#D32F2F] border-white/90 text-white shadow-[0_0_15px_rgba(211,47,47,0.5)]' 
                          : 'bg-[#4FC3F7] border-white/90 text-[#020202] shadow-[0_0_15px_rgba(79,195,247,0.5)]'
                      }`}>
                        {player.num}
                      </div>
                      
                      <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md text-center shadow-lg group-hover:border-white/30 transition-colors">
                        <div className="text-[9px] sm:text-[10px] font-bold text-white whitespace-nowrap mb-0.5">{player.name}</div>
                        <div className={`text-[10px] sm:text-xs font-black ${
                          isHighRating ? 'text-[#00E5FF]' : isLowRating ? 'text-[#FF3B00]' : 'text-yellow-400'
                        }`}>
                          {player.rating}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sidebar (Subs & Coaches) */}
              <div className="w-full xl:w-80 flex flex-col gap-6">
                {/* Coaches */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] p-6">
                   <h3 className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-4">Coaches</h3>
                   <div className="flex flex-col gap-4">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#D32F2F]/20 flex items-center justify-center border border-[#D32F2F]/50 text-[#D32F2F] font-black text-xs">LIV</div>
                         <span className="text-sm font-bold text-white">{coaches.liv.name}</span>
                       </div>
                       <span className="text-sm font-black text-[#00E5FF]">{coaches.liv.rating}</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#4FC3F7]/20 flex items-center justify-center border border-[#4FC3F7]/50 text-[#4FC3F7] font-black text-xs">MCI</div>
                         <span className="text-sm font-bold text-white">{coaches.mci.name}</span>
                       </div>
                       <span className="text-sm font-black text-[#FF3B00]">{coaches.mci.rating}</span>
                     </div>
                   </div>
                </div>

                {/* Subs Liverpool */}
                <div className="bg-[#0A0A0A] border border-[#D32F2F]/20 rounded-[24px] p-6 flex-1">
                   <h3 className="text-[10px] font-black tracking-widest text-[#D32F2F] uppercase mb-4 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                     Liverpool Bench
                   </h3>
                   <div className="flex flex-col gap-3">
                     {subsLIV.map((sub, i) => (
                       <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                         <span className="text-sm text-gray-300 font-medium">{sub.name}</span>
                         <span className={`text-xs font-black ${sub.rating !== "N/A" ? 'text-yellow-400' : 'text-gray-600'}`}>{sub.rating}</span>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Subs Man City */}
                <div className="bg-[#0A0A0A] border border-[#4FC3F7]/20 rounded-[24px] p-6 flex-1">
                   <h3 className="text-[10px] font-black tracking-widest text-[#4FC3F7] uppercase mb-4 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#4FC3F7]" />
                     Man City Bench
                   </h3>
                   <div className="flex flex-col gap-3">
                     {subsMCI.map((sub, i) => (
                       <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                         <span className="text-sm text-gray-300 font-medium">{sub.name}</span>
                         <span className={`text-xs font-black ${sub.rating !== "N/A" ? 'text-yellow-400' : 'text-gray-600'}`}>{sub.rating}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>

            </div>
          </section>

          {/* Fan Voted MVP - Redesigned */}
          <section className="bg-gradient-to-r from-[#121212] to-[#0A0A0A] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
            {/* Background Heatmap Graphic */}
            <div className="absolute top-0 right-0 w-2/3 h-full opacity-20 pointer-events-none transition-transform duration-1000 group-hover:scale-105">
               <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Football_field_blank.svg/800px-Football_field_blank.svg.png')] bg-contain bg-no-repeat bg-right-top" style={{ filter: 'invert(1) opacity(0.3)' }} />
               <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-red-600 rounded-full blur-[80px] opacity-60" />
               <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-[#00E5FF] rounded-full blur-[60px] opacity-40" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h2 className="text-sm font-black tracking-widest text-[#00E5FF] uppercase flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#00E5FF]" /> FAN VOTED MVP
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              {/* Avatar Ultimate Team Style */}
              <div className="relative shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] border border-[#00E5FF]/30 p-2 overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.2)] bg-[#020202]">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" className="w-full h-full rounded-[1.5rem] object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#00E5FF] text-black font-black text-2xl px-5 py-2 rounded-xl border-4 border-[#020202] rotate-3 hover:rotate-0 transition-transform">
                  9.2
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Mo Salah</h3>
                <p className="text-sm text-[#00E5FF] font-bold tracking-widest uppercase mb-8">Liverpool • Forward • #11</p>

                {/* Bento Box Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0">
                  <div className="bg-[#050505] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-white/20 transition-colors">
                    <span className="text-2xl font-black text-white">75%</span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">EYE TEST</span>
                  </div>
                  <div className="bg-[#050505] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-white/20 transition-colors">
                    <span className="text-2xl font-black text-[#FF3B00]">15%</span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">SOLID</span>
                  </div>
                  <div className="bg-[#050505] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-white/20 transition-colors">
                    <span className="text-2xl font-black text-gray-600">10%</span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">POOR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full border-2 border-[#121212]" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full border-2 border-[#121212]" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#121212] bg-[#1A1A1A] flex items-center justify-center text-[8px] font-black">+12K</div>
                </div>
                <span className="text-xs font-bold text-gray-400">fans voted</span>
              </div>
              <button className="text-xs font-black tracking-widest text-white hover:text-[#00E5FF] transition-colors flex items-center gap-2 uppercase">
                View Breakdown <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Match Key Insights - Bento Box Redesign */}
          <section>
            <h2 className="text-sm font-black tracking-widest text-white uppercase mb-6 flex items-center gap-3">
               <Activity className="w-5 h-5 text-purple-500" /> KEY INSIGHTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] p-6 flex flex-col hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-4">
                  <span className="text-yellow-400 text-xl">😃</span>
                </div>
                <h3 className="text-xs font-black tracking-widest text-white uppercase mb-3">FAN SENTIMENT</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Liverpool fans are ecstatic about the midfield control, but concerned about defensive lapses in the first half.
                </p>
                <div className="mt-auto h-12 relative w-full opacity-50">
                   <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 40">
                     <path d="M0,30 Q10,35 20,25 T40,20 T60,15 T80,25 T100,10" fill="none" stroke="#00E5FF" strokeWidth="2" />
                     <circle cx="20" cy="25" r="2" fill="#00E5FF" />
                     <circle cx="40" cy="20" r="2" fill="#00E5FF" />
                     <circle cx="60" cy="15" r="2" fill="#00E5FF" />
                     <circle cx="80" cy="25" r="2" fill="#00E5FF" />
                     <circle cx="100" cy="10" r="2" fill="#00E5FF" />
                   </svg>
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] p-6 flex flex-col hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                <div className="w-10 h-10 rounded-xl bg-[#FF3B00]/10 flex items-center justify-center mb-4">
                  <Activity className="w-5 h-5 text-[#FF3B00]" />
                </div>
                <h3 className="text-xs font-black tracking-widest text-white uppercase mb-3">CONTROVERSY</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  VAR decision on the 35th min goal remains a hot topic. <span className="text-[#FF3B00] font-bold">68%</span> of neutrals say it was a robbery.
                </p>
              </div>

              <div className="bg-[#0A0A0A] border border-white/5 rounded-[24px] p-6 flex flex-col hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-xs font-black tracking-widest text-white uppercase mb-3">GAME FLOW</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Liverpool dominated possession and territory in the second half.
                </p>
                <div className="mt-auto h-12 flex items-end gap-1 w-full opacity-50">
                  {[2, 3, 4, 3, 2, 5, 4, 3, 4, 6, 5, 8, 5, 4, 10, 8, 9, 7, 5].map((h, i) => (
                    <div key={i} className="w-full bg-purple-500 rounded-t-sm hover:bg-purple-400 transition-colors" style={{ height: `${h*10}%` }} />
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Hot Takes */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black tracking-widest text-white uppercase flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#FF3B00]" /> HOT TAKES
              </h2>
              <button className="text-[10px] text-gray-400 font-bold hover:text-white transition-colors uppercase tracking-widest">See all</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotTakes.map((take) => (
                <div key={take.id} className="bg-[#0A0A0A] border border-white/5 rounded-[24px] p-6 flex flex-col hover:border-white/20 transition-all">
                  <h3 className="text-sm font-black text-white mb-6 leading-relaxed">{take.question}</h3>
                  <div className="space-y-4 mb-6 flex-1">
                    {take.options.map((opt, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className={opt.percent > 50 ? 'text-white' : 'text-gray-400'}>{opt.text}</span>
                          <span className={opt.percent > 50 ? 'text-white' : 'text-gray-500'}>{opt.percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${opt.color}`} style={{ width: `${opt.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{take.votes} LIVE</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
