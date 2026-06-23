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

// Pitch coordinates
const pitchLIV = [
  { id: 1, name: "Alisson", num: 1, pos: "GK", rating: "7.5", vTop: "90%", vLeft: "50%", hTop: "50%", hLeft: "10%", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { id: 2, name: "Trent", num: 66, pos: "RB", rating: "7.9", vTop: "78%", vLeft: "85%", hTop: "80%", hLeft: "25%", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
  { id: 3, name: "Konaté", num: 5, pos: "CB", rating: "8.2", vTop: "80%", vLeft: "65%", hTop: "65%", hLeft: "22%", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 4, name: "Van Dijk", num: 4, pos: "CB", rating: "8.4", vTop: "80%", vLeft: "35%", hTop: "35%", hLeft: "22%", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" },
  { id: 5, name: "Robertson", num: 26, pos: "LB", rating: "7.2", vTop: "78%", vLeft: "15%", hTop: "20%", hLeft: "25%", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" },
  { id: 6, name: "Szoboszlai", num: 8, pos: "CM", rating: "7.4", vTop: "65%", vLeft: "75%", hTop: "70%", hLeft: "38%", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
  { id: 7, name: "Gravenberch", num: 38, pos: "CDM", rating: "7.8", vTop: "68%", vLeft: "50%", hTop: "50%", hLeft: "35%", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { id: 8, name: "Mac Allister", num: 10, pos: "CM", rating: "8.1", vTop: "65%", vLeft: "25%", hTop: "30%", hLeft: "38%", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop" },
  { id: 9, name: "Salah", num: 11, pos: "RW", rating: "9.2", vTop: "48%", vLeft: "82%", hTop: "80%", hLeft: "52%", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { id: 10, name: "Jota", num: 20, pos: "ST", rating: "7.1", vTop: "42%", vLeft: "50%", hTop: "50%", hLeft: "58%", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" },
  { id: 11, name: "Diaz", num: 7, pos: "LW", rating: "8.0", vTop: "48%", vLeft: "18%", hTop: "20%", hLeft: "52%", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
];

const pitchMCI = [
  { id: 12, name: "Ederson", num: 31, pos: "GK", rating: "6.5", vTop: "10%", vLeft: "50%", hTop: "50%", hLeft: "90%", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { id: 13, name: "Walker", num: 2, pos: "RB", rating: "6.2", vTop: "22%", vLeft: "15%", hTop: "20%", hLeft: "75%", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
  { id: 14, name: "Dias", num: 3, pos: "CB", rating: "6.8", vTop: "20%", vLeft: "35%", hTop: "35%", hLeft: "78%", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 15, name: "Ake", num: 6, pos: "CB", rating: "6.4", vTop: "20%", vLeft: "65%", hTop: "65%", hLeft: "78%", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" },
  { id: 16, name: "Gvardiol", num: 24, pos: "LB", rating: "6.0", vTop: "22%", vLeft: "85%", hTop: "80%", hLeft: "75%", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" },
  { id: 17, name: "Rodri", num: 16, pos: "CDM", rating: "7.5", vTop: "32%", vLeft: "50%", hTop: "50%", hLeft: "65%", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
  { id: 20, name: "Silva", num: 20, pos: "CM", rating: "6.4", vTop: "35%", vLeft: "25%", hTop: "30%", hLeft: "62%", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { id: 18, name: "Foden", num: 47, pos: "RM", rating: "6.9", vTop: "52%", vLeft: "18%", hTop: "20%", hLeft: "45%", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop" },
  { id: 19, name: "De Bruyne", num: 17, pos: "CM", rating: "6.3", vTop: "35%", vLeft: "75%", hTop: "70%", hLeft: "62%", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { id: 21, name: "Doku", num: 11, pos: "LM", rating: "6.6", vTop: "52%", vLeft: "82%", hTop: "80%", hLeft: "45%", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" },
  { id: 22, name: "Haaland", num: 9, pos: "ST", rating: "6.1", vTop: "58%", vLeft: "50%", hTop: "50%", hLeft: "42%", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
];

const subsLIV = [
  { name: "Kelleher", rating: "N/A", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { name: "Gomez", rating: "6.5", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
];
const subsMCI = [
  { name: "Ortega", rating: "N/A", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
  { name: "Akanji", rating: "6.2", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
];

const coaches = {
  liv: { name: "Jurgen Klopp", rating: "8.5", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" },
  mci: { name: "Pep Guardiola", rating: "6.0", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" }
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

          {/* Pitch View Roster */}
          <section className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-black tracking-widest text-white uppercase flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" /> LIVE PITCH RATINGS
              </h2>
            </div>

            <div className="w-full max-w-5xl mx-auto flex flex-col">
              {/* MOBILE / TABLET PITCH (Vertical) */}
              <div className="xl:hidden w-full relative bg-[#09150E] rounded-t-[24px] overflow-hidden min-h-[600px] md:min-h-[800px] border border-white/5 border-b-0">
                {/* Field Lines (Vertical) */}
                <div className="absolute inset-4 border border-[#1A3A24] pointer-events-none" />
                <div className="absolute top-1/2 left-4 right-4 h-px bg-[#1A3A24] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#1A3A24] rounded-full pointer-events-none" />
                
                {/* Penalty Boxes (Vertical) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 md:w-64 h-24 md:h-32 border border-[#1A3A24] border-t-0 pointer-events-none" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 md:h-12 border border-[#1A3A24] border-t-0 pointer-events-none" />
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 md:w-64 h-24 md:h-32 border border-[#1A3A24] border-b-0 pointer-events-none" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 md:h-12 border border-[#1A3A24] border-b-0 pointer-events-none" />

                {/* Team Logos */}
                <div className="absolute top-8 right-8 w-16 h-16 opacity-10 pointer-events-none">
                  <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-full h-full object-contain grayscale" />
                </div>
                <div className="absolute bottom-8 right-8 w-16 h-16 opacity-10 pointer-events-none">
                  <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-full h-full object-contain grayscale" />
                </div>

                {/* Players */}
                {[...pitchMCI, ...pitchLIV].map(player => {
                  const isLiv = pitchLIV.some(p => p.id === player.id);
                  const isHighRating = parseFloat(player.rating) >= 8.0;
                  
                  return (
                    <div 
                      key={player.id} 
                      className="absolute flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ top: player.vTop, left: player.vLeft }}
                    >
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 overflow-hidden shadow-xl transition-transform group-hover:scale-110 ${
                        isHighRating ? 'border-[#FF7F50] shadow-[0_0_15px_rgba(255,127,80,0.6)]' : 'border-gray-500'
                      }`}>
                         <img src={player.img} className="w-full h-full object-cover" />
                      </div>
                      <div className={`text-[10px] md:text-xs font-black uppercase tracking-widest drop-shadow-md ${isLiv ? 'text-[#FF7F50]' : 'text-[#4FC3F7]'}`}>
                        {player.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DESKTOP PITCH (Horizontal) */}
              <div className="hidden xl:block w-full relative bg-[#09150E] rounded-t-[24px] overflow-hidden h-[500px] border border-white/5 border-b-0">
                {/* Field Lines (Horizontal) */}
                <div className="absolute inset-4 border border-[#1A3A24] pointer-events-none" />
                <div className="absolute top-4 bottom-4 left-1/2 w-px bg-[#1A3A24] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#1A3A24] rounded-full pointer-events-none" />
                
                {/* Penalty Boxes (Horizontal) */}
                <div className="absolute top-1/2 left-4 -translate-y-1/2 w-32 h-64 border border-[#1A3A24] border-l-0 pointer-events-none" />
                <div className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-32 border border-[#1A3A24] border-l-0 pointer-events-none" />
                
                <div className="absolute top-1/2 right-4 -translate-y-1/2 w-32 h-64 border border-[#1A3A24] border-r-0 pointer-events-none" />
                <div className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-32 border border-[#1A3A24] border-r-0 pointer-events-none" />

                {/* Team Logos */}
                <div className="absolute top-1/2 left-24 -translate-y-1/2 w-32 h-32 opacity-5 pointer-events-none">
                  <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-full h-full object-contain grayscale" />
                </div>
                <div className="absolute top-1/2 right-24 -translate-y-1/2 w-32 h-32 opacity-5 pointer-events-none">
                  <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-full h-full object-contain grayscale" />
                </div>

                {/* Players */}
                {[...pitchMCI, ...pitchLIV].map(player => {
                  const isLiv = pitchLIV.some(p => p.id === player.id);
                  const isHighRating = parseFloat(player.rating) >= 8.0;
                  
                  return (
                    <div 
                      key={player.id} 
                      className="absolute flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ top: player.hTop, left: player.hLeft }}
                    >
                      <div className={`w-14 h-14 rounded-full border-2 overflow-hidden shadow-xl transition-transform group-hover:scale-110 ${
                        isHighRating ? 'border-[#FF7F50] shadow-[0_0_15px_rgba(255,127,80,0.6)]' : 'border-gray-500'
                      }`}>
                         <img src={player.img} className="w-full h-full object-cover" />
                      </div>
                      <div className={`text-xs font-black uppercase tracking-widest drop-shadow-md ${isLiv ? 'text-[#FF7F50]' : 'text-[#4FC3F7]'}`}>
                        {player.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subs & Coaches (Horizontal Strip) */}
              <div className="bg-[#1A1A1A] px-4 py-5 flex items-center justify-between w-full rounded-b-[24px]">
                {/* Left side (LIV Subs & Coach) */}
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-1.5 h-10 bg-[#FF7F50] rounded-full mr-1 md:mr-2 shadow-[0_0_10px_rgba(255,127,80,0.4)]" />
                  
                  {/* Coach */}
                  <div className="relative group cursor-pointer" title={`Coach: ${coaches.liv.name}`}>
                    <img src={coaches.liv.img} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#FF7F50] object-cover hover:scale-110 transition-transform" />
                  </div>
                  
                  {/* Subs */}
                  {subsLIV.map(sub => (
                    <div className="relative group cursor-pointer" key={sub.name} title={sub.name}>
                      <img src={sub.img} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 object-cover hover:scale-110 transition-transform hover:border-white/50" />
                    </div>
                  ))}
                  
                  {/* Empty slots */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/5" />
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/5" />
                </div>

                {/* Right side (MCI Subs & Coach) */}
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Empty slots */}
                  <div className="hidden sm:block w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/5" />
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/5" />
                  
                  {/* Subs */}
                  {subsMCI.map(sub => (
                    <div className="relative group cursor-pointer" key={sub.name} title={sub.name}>
                      <img src={sub.img} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 object-cover hover:scale-110 transition-transform hover:border-white/50" />
                    </div>
                  ))}
                  
                  {/* Coach */}
                  <div className="relative group cursor-pointer" title={`Coach: ${coaches.mci.name}`}>
                    <img src={coaches.mci.img} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#4FC3F7] object-cover hover:scale-110 transition-transform" />
                  </div>

                  <div className="w-1.5 h-10 bg-[#4FC3F7] rounded-full ml-1 md:ml-2 shadow-[0_0_10px_rgba(79,195,247,0.4)]" />
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
