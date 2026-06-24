"use client";

import { ArrowLeft, Share, Eye, Shield, Zap, X, Play, ThumbsUp, ThumbsDown, ChevronRight, BarChart3, Activity, Clock, Mic, Flame, Users } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import PlayerSummaryModal from "@/components/match/PlayerSummaryModal";

const initialHotTakes = [
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
  { id: 1, name: "Alisson", num: 1, pos: "GK", rating: "7.5", vTop: "92%", vLeft: "50%", hTop: "50%", hLeft: "8%", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { id: 2, name: "Trent", num: 66, pos: "RB", rating: "7.9", vTop: "82%", vLeft: "85%", hTop: "85%", hLeft: "22%", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
  { id: 3, name: "Konaté", num: 5, pos: "CB", rating: "8.2", vTop: "85%", vLeft: "65%", hTop: "65%", hLeft: "18%", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 4, name: "Van Dijk", num: 4, pos: "CB", rating: "8.4", vTop: "85%", vLeft: "35%", hTop: "35%", hLeft: "18%", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" },
  { id: 5, name: "Robertson", num: 26, pos: "LB", rating: "7.2", vTop: "82%", vLeft: "15%", hTop: "15%", hLeft: "22%", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" },
  { id: 6, name: "Szoboszlai", num: 8, pos: "CM", rating: "7.4", vTop: "70%", vLeft: "75%", hTop: "75%", hLeft: "35%", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
  { id: 7, name: "Gravenberch", num: 38, pos: "CDM", rating: "7.8", vTop: "75%", vLeft: "50%", hTop: "50%", hLeft: "28%", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { id: 8, name: "Mac Allister", num: 10, pos: "CM", rating: "8.1", vTop: "70%", vLeft: "25%", hTop: "25%", hLeft: "35%", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop" },
  { id: 9, name: "Salah", num: 11, pos: "RW", rating: "9.2", vTop: "58%", vLeft: "82%", hTop: "82%", hLeft: "46%", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { id: 10, name: "Jota", num: 20, pos: "ST", rating: "7.1", vTop: "60%", vLeft: "50%", hTop: "50%", hLeft: "44%", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" },
  { id: 11, name: "Diaz", num: 7, pos: "LW", rating: "8.0", vTop: "58%", vLeft: "18%", hTop: "18%", hLeft: "46%", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
];

const pitchMCI = [
  { id: 12, name: "Ederson", num: 31, pos: "GK", rating: "6.5", vTop: "8%", vLeft: "50%", hTop: "50%", hLeft: "92%", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { id: 13, name: "Walker", num: 2, pos: "RB", rating: "6.2", vTop: "18%", vLeft: "15%", hTop: "15%", hLeft: "78%", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
  { id: 14, name: "Dias", num: 3, pos: "CB", rating: "6.8", vTop: "15%", vLeft: "35%", hTop: "35%", hLeft: "82%", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { id: 15, name: "Ake", num: 6, pos: "CB", rating: "6.4", vTop: "15%", vLeft: "65%", hTop: "65%", hLeft: "82%", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" },
  { id: 16, name: "Gvardiol", num: 24, pos: "LB", rating: "6.0", vTop: "18%", vLeft: "85%", hTop: "85%", hLeft: "78%", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" },
  { id: 17, name: "Rodri", num: 16, pos: "CDM", rating: "7.5", vTop: "25%", vLeft: "50%", hTop: "50%", hLeft: "72%", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
  { id: 20, name: "Silva", num: 20, pos: "CM", rating: "6.4", vTop: "30%", vLeft: "25%", hTop: "25%", hLeft: "65%", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  { id: 18, name: "Foden", num: 47, pos: "RM", rating: "6.9", vTop: "42%", vLeft: "18%", hTop: "18%", hLeft: "54%", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop" },
  { id: 19, name: "De Bruyne", num: 17, pos: "CM", rating: "6.3", vTop: "30%", vLeft: "75%", hTop: "75%", hLeft: "65%", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { id: 21, name: "Doku", num: 11, pos: "LM", rating: "6.6", vTop: "42%", vLeft: "82%", hTop: "82%", hLeft: "54%", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" },
  { id: 22, name: "Haaland", num: 9, pos: "ST", rating: "6.1", vTop: "40%", vLeft: "50%", hTop: "50%", hLeft: "56%", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
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

const timelineEvents = [
  { id: 1, time: "2'", team: "LIV", type: "goal", player: "Mohamed Salah", detail: "Right footed shot from the center of the box to the bottom right corner. Assisted by Trent Alexander-Arnold." },
  { id: 2, time: "18'", team: "MCI", type: "yellow", player: "Rodri", detail: "Foul on Alexis Mac Allister." },
  { id: 3, time: "35'", team: "LIV", type: "yellow", player: "Wataru Endo", detail: "Foul on Kevin De Bruyne." },
  { id: 4, time: "45+2'", team: "MCI", type: "sub", playerIn: "Jeremy Doku", playerOut: "Jack Grealish", detail: "Tactical substitution." },
  { id: 5, time: "60'", team: "LIV", type: "sub", playerIn: "Darwin Nunez", playerOut: "Diogo Jota", detail: "Tactical substitution." },
  { id: 6, time: "78'", team: "LIV", type: "goal", player: "Ibrahima Konate", detail: "Header from very close range to the bottom left corner. Assisted by Andy Robertson following a corner." },
  { id: 7, time: "85'", team: "MCI", type: "yellow", player: "Bernardo Silva", detail: "Foul on Luis Diaz." },
];

const matchStats = [
  { label: "Possession", liv: 48, mci: 52, type: "percent" },
  { label: "Shots", liv: 14, mci: 9, type: "number" },
  { label: "Shots on Target", liv: 6, mci: 2, type: "number" },
  { label: "Passes", liv: 450, mci: 512, type: "number" },
  { label: "Pass Accuracy", liv: 82, mci: 88, type: "percent" },
  { label: "Fouls", liv: 11, mci: 8, type: "number" },
  { label: "Corners", liv: 7, mci: 4, type: "number" },
];

const standsFeed = [
  { id: 1, user: "AnfieldRoar", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop", type: "comment", text: "What a performance from the lads! Konate was an absolute rock at the back today. 🧱🔴", time: "10m ago", upvotes: 342, comments: 24 },
  { id: 2, user: "SkySportsGHD", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop", type: "highlight", text: "Highlights: Konate rises highest to seal the victory for Liverpool! ⚽🔥", time: "15m ago", videoCover: "https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=800&auto=format&fit=crop", upvotes: 1205, comments: 89 },
  { id: 3, user: "CityBlueMoon", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop", type: "comment", text: "Terrible finishing from us today. Haaland completely isolated up top. Pep needs to rethink this tactic. 🤦‍♂️", time: "22m ago", upvotes: 215, comments: 45 },
  { id: 4, user: "TacticoGenius", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=50&h=50&fit=crop", type: "comment", text: "The way Mac Allister controlled the tempo in the second half was world class. Unsung hero. 🎯", time: "30m ago", upvotes: 560, comments: 32 },
  { id: 5, user: "LFC_Official", avatar: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg", type: "highlight", text: "A trademark Mo Salah finish to get us underway! 👑🇪🇬", time: "1h ago", videoCover: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop", upvotes: 4500, comments: 320 },
];

export default function MatchDetailsPage() {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [takes, setTakes] = useState(initialHotTakes);
  const [votedTakes, setVotedTakes] = useState<Record<number, boolean>>({});
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const allPitchPlayers = [...pitchLIV, ...pitchMCI];
  
  const handleNextPlayer = () => {
    if (!selectedPlayer) return;
    const currentIndex = allPitchPlayers.findIndex(p => p.id.toString() === selectedPlayer);
    if (currentIndex !== -1 && currentIndex < allPitchPlayers.length - 1) {
      setSelectedPlayer(allPitchPlayers[currentIndex + 1].id.toString());
    } else {
      setSelectedPlayer(allPitchPlayers[0].id.toString());
    }
  };

  const handlePrevPlayer = () => {
    if (!selectedPlayer) return;
    const currentIndex = allPitchPlayers.findIndex(p => p.id.toString() === selectedPlayer);
    if (currentIndex !== -1 && currentIndex > 0) {
      setSelectedPlayer(allPitchPlayers[currentIndex - 1].id.toString());
    } else {
      setSelectedPlayer(allPitchPlayers[allPitchPlayers.length - 1].id.toString());
    }
  };

  const handleVote = (takeId: number, optionIndex: number) => {
    if (votedTakes[takeId]) return;

    setTakes(currentTakes => currentTakes.map(take => {
      if (take.id !== takeId) return take;

      const newOptions = [...take.options];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        percent: newOptions[optionIndex].percent + 1
      };
      
      const otherIndices = [0, 1, 2].filter(i => i !== optionIndex);
      otherIndices.forEach(i => {
        if (newOptions[i]) {
          newOptions[i] = {
            ...newOptions[i],
            percent: Math.max(0, newOptions[i].percent - 0.5)
          };
        }
      });

      return {
        ...take,
        options: newOptions
      };
    }));

    setVotedTakes(prev => ({ ...prev, [takeId]: true }));
  };

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
              <div className="text-4xl md:text-7xl font-black tracking-tighter tabular-nums drop-shadow-2xl">
                2 <span className="text-gray-600 font-normal mx-1 md:mx-2">-</span> 0
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
        {['OVERVIEW', 'ROSTER', 'TIMELINE', 'STATS', 'STANDS'].map((tab) => (
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
            {tab === 'ROSTER' && <Users className="w-4 h-4" />}
            {tab === 'TIMELINE' && <Clock className="w-4 h-4" />}
            {tab === 'STATS' && <BarChart3 className="w-4 h-4" />}
            {tab === 'STANDS' && <Mic className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Overview Content */}
        {activeTab === 'OVERVIEW' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
          
          {/* FANS HAVE SPOKEN - MVP & FAN XI */}
          <section className="bg-gradient-to-b from-[#111111] to-[#050505] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl md:text-5xl font-black text-center tracking-tight mb-6 uppercase drop-shadow-2xl">
              The Fans Have <br/><span className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">Spoken.</span>
            </h2>
            
            {/* Score Pill */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-full px-6 py-2 flex items-center gap-4 mb-12 shadow-inner">
               <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-6 h-6 object-contain" />
               <span className="text-xl font-black tracking-widest text-white">1 - 2</span>
               <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-6 h-6 object-contain" />
            </div>

            {/* MVP */}
            <div className="relative mb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-br from-[#00E5FF] to-transparent shadow-[0_0_30px_rgba(0,229,255,0.3)] group cursor-pointer hover:scale-105 transition-transform">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute -top-2 -right-4 bg-[#00E5FF] text-black text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest border-2 border-black drop-shadow-md">MVP</div>
              <div className="absolute -bottom-2 -right-2 bg-black text-[#00E5FF] text-sm font-black px-3 py-1 rounded-full border border-[#00E5FF] drop-shadow-md">9.2</div>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-16 drop-shadow-xl">Mo Salah</h3>

            {/* COMBINED FAN XI */}
            <div className="text-xs text-gray-500 font-bold tracking-[0.3em] uppercase mb-12 relative">
               <span className="relative z-10 bg-[#080808] px-4">Combined Fan XI</span>
               <div className="absolute top-1/2 left-[-100%] right-[-100%] h-px bg-white/5 -z-10"></div>
            </div>
            
            <div className="w-full max-w-2xl relative flex flex-col gap-12 md:gap-16 items-center">
               {/* FWDs (3) */}
               <div className="flex justify-between w-[80%]">
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Diaz</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] p-0.5">
                     <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" className="w-full h-full rounded-full object-cover" />
                   </div>
                   <span className="text-[10px] md:text-xs font-black text-[#00E5FF] uppercase tracking-widest drop-shadow-md">Salah</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Haaland</span>
                 </div>
               </div>

               {/* MIDs (4) */}
               <div className="flex justify-between w-full">
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Mac Allister</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">De Bruyne</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Foden</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Doku</span>
                 </div>
               </div>

               {/* DEFs (3) */}
               <div className="flex justify-between w-[80%]">
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Gvardiol</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Van Dijk</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Trent</span>
                 </div>
               </div>

               {/* GK */}
               <div className="flex justify-center w-full mt-4">
                 <div className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"></div>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Alisson</span>
                 </div>
               </div>
            </div>
            
            {/* Share Button */}
            <button className="absolute bottom-6 right-6 w-14 h-14 bg-[#FF3B00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,59,0,0.5)] hover:scale-110 transition-transform border border-white/20">
               <Share className="w-6 h-6 text-white" />
            </button>
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
              {takes.map((take) => (
                <div key={take.id} className="bg-[#0A0A0A] border border-white/5 rounded-[24px] p-6 flex flex-col hover:border-white/20 transition-all">
                  <h3 className="text-sm font-black text-white mb-6 leading-relaxed">{take.question}</h3>
                  <div className="space-y-4 mb-6 flex-1">
                    {take.options.map((opt, i) => (
                      <div 
                        key={i}
                        onClick={() => handleVote(take.id, i)}
                        className={`group ${votedTakes[take.id] ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className={`${votedTakes[take.id] ? '' : 'group-hover:text-white transition-colors'} ${opt.percent > 50 ? 'text-white' : 'text-gray-400'}`}>{opt.text}</span>
                          <span className={opt.percent > 50 ? 'text-white' : 'text-gray-500'}>{opt.percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${opt.color}`} style={{ width: `${opt.percent}%` }} />
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
        </motion.div>
      )}

      {/* ROSTER Content */}
      {activeTab === 'ROSTER' && (
        <motion.div 
          key="roster"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-12"
        >
          {/* Pitch View Roster */}
          <section className="mt-4">
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
                      onClick={() => setSelectedPlayer(player.id.toString())}
                      key={player.id} 
                      className="absolute flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                      style={{ top: player.vTop, left: player.vLeft }}
                    >
                      <div className={`w-12 h-12 md:w-14 md:h-14 relative rounded-full border-2 shadow-xl transition-transform group-hover:scale-110 ${
                        isHighRating ? 'border-[#FF7F50] shadow-[0_0_15px_rgba(255,127,80,0.6)]' : 'border-gray-500'
                      }`}>
                         <img src={player.img} className="w-full h-full object-cover rounded-full" />
                         <div className={`absolute -bottom-2 -right-2 text-[10px] font-black px-1.5 py-0.5 rounded-md border bg-black text-white ${isHighRating ? 'border-[#FF7F50]' : 'border-white/20'}`}>
                           {player.rating}
                         </div>
                      </div>
                      <div className={`text-[10px] md:text-xs font-black uppercase tracking-widest drop-shadow-md mt-1 ${isLiv ? 'text-[#FF7F50]' : 'text-[#4FC3F7]'}`}>
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
                      onClick={() => setSelectedPlayer(player.id.toString())}
                      key={player.id} 
                      className="absolute flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                      style={{ top: player.hTop, left: player.hLeft }}
                    >
                      <div className={`w-14 h-14 relative rounded-full border-2 shadow-xl transition-transform group-hover:scale-110 ${
                        isHighRating ? 'border-[#FF7F50] shadow-[0_0_15px_rgba(255,127,80,0.6)]' : 'border-gray-500'
                      }`}>
                         <img src={player.img} className="w-full h-full object-cover rounded-full" />
                         <div className={`absolute -bottom-2 -right-2 text-[10px] font-black px-1.5 py-0.5 rounded-md border bg-black text-white ${isHighRating ? 'border-[#FF7F50]' : 'border-white/20'}`}>
                           {player.rating}
                         </div>
                      </div>
                      <div className={`text-xs font-black uppercase tracking-widest drop-shadow-md mt-1 ${isLiv ? 'text-[#FF7F50]' : 'text-[#4FC3F7]'}`}>
                        {player.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subs & Coaches (Horizontal Strip) */}
              <div className="bg-[#1A1A1A] px-4 py-5 flex flex-col md:flex-row items-center justify-between w-full rounded-b-[24px] gap-4 overflow-hidden">
                {/* Left side (LIV Subs & Coach) */}
                <div className="flex items-center gap-1.5 md:gap-2 w-full pb-2 md:pb-0">
                  <div className="w-1.5 h-8 md:h-10 bg-[#FF7F50] rounded-full mr-1 shadow-[0_0_10px_rgba(255,127,80,0.4)] shrink-0" />
                  
                  {/* Coach */}
                  <div className="relative group cursor-pointer shrink-0" title={`Coach: ${coaches.liv.name}`}>
                    <img src={coaches.liv.img} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#FF7F50] object-cover hover:scale-110 transition-transform" />
                  </div>
                  
                  {/* Subs */}
                  {subsLIV.map(sub => (
                    <div className="relative group cursor-pointer shrink-0" key={sub.name} title={sub.name}>
                      <img src={sub.img} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 object-cover hover:scale-110 transition-transform hover:border-white/50" />
                    </div>
                  ))}
                  
                  {/* Empty slots */}
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 border border-white/5 shrink-0" />
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 border border-white/5 shrink-0" />
                </div>

                {/* Right side (MCI Subs & Coach) */}
                <div className="flex items-center gap-1.5 md:gap-2 w-full md:justify-end pb-2 md:pb-0">
                  {/* Empty slots */}
                  <div className="hidden sm:block w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 border border-white/5 shrink-0" />
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 border border-white/5 shrink-0" />
                  
                  {/* Subs */}
                  {subsMCI.map(sub => (
                    <div className="relative group cursor-pointer shrink-0" key={sub.name} title={sub.name}>
                      <img src={sub.img} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 object-cover hover:scale-110 transition-transform hover:border-white/50" />
                    </div>
                  ))}
                  
                  {/* Coach */}
                  <div className="relative group cursor-pointer shrink-0" title={`Coach: ${coaches.mci.name}`}>
                    <img src={coaches.mci.img} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#4FC3F7] object-cover hover:scale-110 transition-transform" />
                  </div>

                  <div className="w-1.5 h-8 md:h-10 bg-[#4FC3F7] rounded-full ml-1 shadow-[0_0_10px_rgba(79,195,247,0.4)] shrink-0" />
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* TIMELINE Content */}
      {activeTab === 'TIMELINE' && (
        <motion.div 
          key="timeline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl mx-auto space-y-12"
        >
          <div className="relative border-l-2 border-white/10 ml-6 md:ml-1/2 md:border-none">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/10 -translate-x-1/2"></div>
            
            {timelineEvents.map((event, index) => {
              const isLiv = event.team === 'LIV';
              return (
                <div key={event.id} className={`relative flex items-center mb-8 ${isLiv ? 'md:flex-row-reverse' : 'md:flex-row'} pl-6 md:pl-0`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[#020202] border-2 z-10" style={{ borderColor: isLiv ? '#FF7F50' : '#4FC3F7' }}></div>
                  
                  {/* Content Box */}
                  <div className={`md:w-1/2 ${isLiv ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} w-full`}>
                    <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-2xl hover:bg-[#111] transition-colors relative group">
                      {/* Event Icon */}
                      <div className={`absolute top-4 ${isLiv ? 'right-4 md:left-4 md:right-auto' : 'right-4'} text-xl opacity-50 group-hover:opacity-100 transition-opacity`}>
                        {event.type === 'goal' && '⚽'}
                        {event.type === 'yellow' && '🟨'}
                        {event.type === 'sub' && '🔄'}
                      </div>
                      
                      <div className="text-[#00E5FF] font-black text-xs tracking-widest mb-1">{event.time}</div>
                      <div className="text-lg font-black text-white mb-1">
                        {event.type === 'sub' ? `${event.playerIn} In / ${event.playerOut} Out` : event.player}
                      </div>
                      <div className="text-xs text-gray-400 font-medium leading-relaxed">{event.detail}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* STATS Content */}
      {activeTab === 'STATS' && (
        <motion.div 
          key="stats"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl mx-auto relative group"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/5 to-transparent rounded-[32px] blur-3xl -z-10 group-hover:from-[#00E5FF]/10 transition-colors duration-1000"></div>
          
          <div className="bg-gradient-to-b from-[#111111]/90 to-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7F50] via-white/20 to-[#4FC3F7]"></div>

            <div className="flex justify-between items-center mb-12 pb-8 border-b border-white/5">
               <div className="flex items-center gap-4 md:gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FF7F50] blur-xl opacity-30 rounded-full"></div>
                    <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-12 h-12 md:w-20 md:h-20 object-contain relative z-10 drop-shadow-2xl" />
                  </div>
                  <span className="text-2xl md:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">LIV</span>
               </div>
               <div className="flex flex-col items-center">
                 <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-gray-500 uppercase">Match Stats</span>
                 <div className="w-8 h-1 bg-white/10 rounded-full mt-2"></div>
               </div>
               <div className="flex items-center gap-4 md:gap-6">
                  <span className="text-2xl md:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-gray-400 to-white">MCI</span>
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#4FC3F7] blur-xl opacity-30 rounded-full"></div>
                    <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-12 h-12 md:w-20 md:h-20 object-contain relative z-10 drop-shadow-2xl" />
                  </div>
               </div>
            </div>
            
            <div className="space-y-10">
              {matchStats.map((stat, idx) => {
                const total = stat.liv + stat.mci;
                const livPercent = (stat.liv / total) * 100;
                const mciPercent = (stat.mci / total) * 100;
                
                return (
                  <div key={idx} className="flex flex-col group/stat">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-xl md:text-2xl font-black text-white drop-shadow-md">
                        {stat.liv}{stat.type === 'percent' ? <span className="text-sm text-gray-400">%</span> : ''}
                      </span>
                      <span className="text-gray-400 uppercase tracking-widest text-[10px] md:text-xs font-bold group-hover/stat:text-white transition-colors">{stat.label}</span>
                      <span className="text-xl md:text-2xl font-black text-white drop-shadow-md">
                        {stat.mci}{stat.type === 'percent' ? <span className="text-sm text-gray-400">%</span> : ''}
                      </span>
                    </div>
                    <div className="flex w-full h-3 md:h-4 rounded-full overflow-hidden bg-black/50 border border-white/5 gap-1.5 shadow-inner">
                      <div className="h-full bg-gradient-to-l from-[#FF7F50] to-[#E64A19] shadow-[0_0_15px_rgba(255,127,80,0.5)] relative overflow-hidden" style={{ width: `${livPercent}%` }}>
                         <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] group-hover/stat:translate-x-[300%] transition-transform duration-1000"></div>
                      </div>
                      <div className="h-full bg-gradient-to-r from-[#4FC3F7] to-[#0288D1] shadow-[0_0_15px_rgba(79,195,247,0.5)] relative overflow-hidden" style={{ width: `${mciPercent}%` }}>
                         <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] group-hover/stat:translate-x-[300%] transition-transform duration-1000 delay-100"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* STANDS Content */}
      {activeTab === 'STANDS' && (
        <motion.div 
          key="stands"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl mx-auto space-y-6"
        >
          
          {/* Feed */}
          {standsFeed.map(post => (
            <div key={post.id} className="relative group/post">
               {/* Premium Glow effect behind the card */}
               <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7F50]/0 via-white/5 to-[#4FC3F7]/0 rounded-2xl blur opacity-0 group-hover/post:opacity-100 transition duration-500"></div>
               
               <div className="relative bg-gradient-to-br from-[#111111]/80 to-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-300">
                 
                 {/* Top header: User & Time */}
                 <div className="flex items-center gap-4 mb-4">
                   <div className="relative">
                     <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-50"></div>
                     <img src={post.avatar} className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-white/10 ${post.user === 'LFC_Official' ? 'bg-white p-1' : ''}`} />
                   </div>
                   <div>
                     <div className="text-sm font-black text-white flex items-center gap-1.5">
                       {post.user} 
                       {post.user === 'LFC_Official' && <span className="text-[#00E5FF] drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">✔️</span>}
                     </div>
                     <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{post.time}</div>
                   </div>
                 </div>
                 
                 {/* Text Content */}
                 <p className="text-[15px] text-gray-200 mb-5 leading-relaxed font-medium">{post.text}</p>
                 
                 {/* Highlight Video Embed */}
                 {post.type === 'highlight' && (
                   <div className="w-full relative rounded-xl overflow-hidden mb-5 border border-white/10 group/video cursor-pointer shadow-2xl">
                     <img src={post.videoCover} className="w-full h-56 md:h-72 object-cover group-hover/video:scale-105 transition-transform duration-700 ease-out" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center transition-colors">
                       <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover/video:bg-[#00E5FF] group-hover/video:border-transparent transition-all duration-300 group-hover/video:scale-110">
                         <Play className="w-6 h-6 text-white group-hover/video:text-black transition-colors" />
                       </div>
                     </div>
                     <div className="absolute bottom-4 left-4 text-xs font-black tracking-widest uppercase text-white drop-shadow-md flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF3B00] animate-pulse"></span>
                        Watch Highlight
                     </div>
                   </div>
                 )}
                 
                 {/* Action Bar */}
                 <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                   <button className="flex items-center gap-2 text-gray-400 hover:text-[#00E5FF] transition-all group/btn">
                     <div className="p-2 rounded-full bg-white/5 group-hover/btn:bg-[#00E5FF]/20 group-hover/btn:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all">
                       <ThumbsUp className="w-4 h-4" />
                     </div>
                     <span className="text-xs font-black">{post.upvotes}</span>
                   </button>
                   <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group/btn">
                     <div className="p-2 rounded-full bg-white/5 group-hover/btn:bg-white/20 transition-all">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                     </div>
                     <span className="text-xs font-black">{post.comments}</span>
                   </button>
                   <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group/btn ml-auto">
                     <div className="p-2 rounded-full bg-white/5 group-hover/btn:bg-white/20 transition-all">
                       <Share className="w-4 h-4" />
                     </div>
                   </button>
                 </div>
               </div>
            </div>
          ))}
        </motion.div>
      )}
      </AnimatePresence>

      {selectedPlayer && (
        <PlayerSummaryModal 
          playerId={selectedPlayer} 
          onClose={() => setSelectedPlayer(null)}
          onNext={handleNextPlayer}
          onPrev={handlePrevPlayer}
        />
      )}
    </div>
  );
}
