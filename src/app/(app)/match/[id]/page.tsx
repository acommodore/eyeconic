"use client";

import Link from "next/link";
import { ArrowLeft, Share, Eye, Shield, Zap, X, Play, ThumbsUp, ThumbsDown, ChevronRight, BarChart3, Activity, Clock, Mic, Flame, Users, Bell, Trophy, Target } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import PlayerSummaryModal from "@/components/match/PlayerSummaryModal";
import LivePulseView from "@/components/match/LivePulseView";

const playerOptions = [
  { name: 'DE BRUYNE', team: 'Man City', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=200&auto=format&fit=crop' },
  { name: 'HAALAND', team: 'Man City', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop' },
  { name: 'SALAH', team: 'Liverpool', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' },
  { name: 'DARWIN NÚÑEZ', team: 'Liverpool', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop' },
  { name: 'VAN DIJK', team: 'Liverpool', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
];

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

const activeStands = [
  { id: 1, title: "VAR Robbery! Let's talk about it.", host: "Gooner4Life", listeners: "4.2K", tag: "Hot Debate" },
  { id: 2, title: "Midfield Masterclass from Macca", host: "TacticoGenius", listeners: "1.8K", tag: "Tactical" },
  { id: 3, title: "City's finishing was poor today", host: "CityBlueMoon", listeners: "850", tag: "Post-match" },
];

export default function MatchDetailsPage() {
  const [matchState, setMatchState] = useState<'prematch' | 'live' | 'postmatch'>('live');
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [prematchTab, setPrematchTab] = useState('LINEUP');
  const [takes, setTakes] = useState(initialHotTakes);
  const [votedTakes, setVotedTakes] = useState<Record<number, boolean>>({});
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const [votes, setVotes] = useState({ chaos: 64, tactical: 22, tension: 14 });
  const [mvpWatchPlayer, setMvpWatchPlayer] = useState('DE BRUYNE');
  const [fraudWatchPlayer, setFraudWatchPlayer] = useState('DARWIN NÚÑEZ');

  const handlePrematchVote = (type: 'chaos' | 'tactical' | 'tension') => {
    setVotes(prev => {
      const others = (['chaos', 'tactical', 'tension'] as const).filter(t => t !== type);
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
      <div className="flex items-center justify-between mb-8 mt-12">
        <BackButton containerClassName="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md bg-[#0A0A0A]" iconClassName="w-5 h-5 text-white" />
        <h1 className="text-sm font-black tracking-widest text-gray-400 uppercase">Match Center</h1>
        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md bg-[#0A0A0A]">
          <Share className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Cinematic Scoreboard */}
      <div className="relative w-full rounded-[32px] overflow-hidden mb-8 md:mb-12 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D32F2F]/20 via-[#020202] to-[#4FC3F7]/20 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10" />
        
        <div className="relative z-20 p-8 md:p-16 flex flex-col items-center justify-center">
          <div className="px-4 py-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black tracking-widest text-[#00E5FF] uppercase mb-8">
            {matchState === 'prematch' ? 'PRE-MATCH BUILDUP' : matchState === 'live' ? 'LIVE NOW' : 'Full Time'}
          </div>

          <div className="flex items-start justify-center gap-6 md:gap-16 w-full max-w-2xl">
            {/* LIVERPOOL */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-[0_0_40px_rgba(211,47,47,0.3)] mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" alt="LIV" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-sm md:text-xl font-black tracking-wider uppercase text-center mb-4">Liverpool</h2>
              
              {/* Goal Scorers - Only show in postmatch */}
              {matchState === 'postmatch' && (
                <div className="flex flex-col items-center gap-1 mt-2 text-[10px] md:text-xs font-bold text-gray-400">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-[#00E5FF]">⚽</span> Salah 2'
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-[#00E5FF]">⚽</span> Konate 78'
                  </div>
                </div>
              )}
            </div>

            {/* SCORE / TIME */}
            <div className="flex flex-col items-center justify-start pt-6 md:pt-10 shrink-0">
              {matchState === 'prematch' ? (
                <div className="flex flex-col items-center">
                  <span className="text-[10px] md:text-[12px] font-bold text-[#00E5FF] tracking-[0.2em] uppercase mb-1">Kickoff In</span>
                  <span className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-2xl" style={{ fontVariantNumeric: 'tabular-nums' }}>45:00</span>
                </div>
              ) : (
                <div className="text-4xl md:text-7xl font-black tracking-tighter tabular-nums drop-shadow-2xl">
                  2 <span className="text-gray-600 font-normal mx-1 md:mx-2">-</span> 0
                </div>
              )}
            </div>

            {/* MAN CITY */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-[0_0_40px_rgba(79,195,247,0.3)] mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" alt="MCI" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-sm md:text-xl font-black tracking-wider uppercase text-center">Man City</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Tab Navigation */}
      <div className="flex gap-2 p-1 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl mb-8 max-w-lg mx-auto shadow-2xl">
        {['prematch', 'live', 'postmatch'].map((state) => (
          <button
            key={state}
            onClick={() => setMatchState(state as 'prematch' | 'live' | 'postmatch')}
            className={`flex-1 py-3 px-4 rounded-xl text-[10px] md:text-xs font-black tracking-widest transition-all ${
              matchState === state 
                ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.3)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {state === 'prematch' ? 'PRE-MATCH' : state === 'live' ? 'LIVE (PULSE)' : 'POST-MATCH'}
          </button>
        ))}
      </div>

      {matchState === 'live' && (
        <LivePulseView />
      )}
      {/* PRE-MATCH WIDGETS */}
      {matchState === 'prematch' && (
        <div className="flex flex-col gap-3 mb-10 max-w-4xl mx-auto">
           {/* Join the Discussion */}
           <Link href="/stands/2" className="block w-full cursor-pointer hover:-translate-y-0.5 transition-transform">
             <div className="bg-gradient-to-r from-[#00E5FF]/10 to-[#121212]/90 backdrop-blur-xl border border-[#00E5FF]/20 rounded-full p-3 pl-4 flex items-center justify-between group shadow-xl">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#00E5FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                      <Mic className="w-5 h-5 text-black" fill="currentColor" />
                   </div>
                   <div className="flex flex-col justify-center">
                      <h2 className="text-sm font-black tracking-widest uppercase text-white leading-tight mb-0.5">JOIN THE DISCUSSION</h2>
                      <p className="text-[10px] text-[#00E5FF] font-medium tracking-wide">12.4K active in the stands</p>
                   </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-1">
                   <ChevronRight className="w-4 h-4 text-[#00E5FF]" />
                </div>
             </div>
           </Link>

           {/* Crowdcast - Horizontal Segmented */}
           <section className="bg-[#121212]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-4 shadow-xl">
              <div className="flex justify-between items-center mb-3 px-1">
                 <h2 className="text-[10px] font-black tracking-widest uppercase text-gray-400">CROWDCAST VIBE</h2>
                 <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#00E5FF] uppercase">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" /> Live
                 </div>
              </div>
              <div className="flex gap-2 h-12">
                 <div onClick={() => handlePrematchVote('chaos')} className="flex-1 bg-[#0A0A0A] rounded-2xl border border-[#FF7F50]/20 flex items-center justify-between px-4 relative overflow-hidden cursor-pointer hover:bg-white/5 transition-colors group">
                    <div className="absolute left-0 top-0 h-full bg-[#FF7F50]/10 transition-all duration-300" style={{ width: `${votes.chaos}%` }} />
                    <div className="flex items-center gap-2 relative z-10">
                       <Flame className="w-4 h-4 text-[#FF7F50] group-active:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-gray-400 uppercase hidden sm:inline">Chaos</span>
                    </div>
                    <span className="text-sm font-black relative z-10 text-white">{votes.chaos}%</span>
                 </div>
                 <div onClick={() => handlePrematchVote('tactical')} className="flex-1 bg-[#0A0A0A] rounded-2xl border border-[#00E5FF]/20 flex items-center justify-between px-4 relative overflow-hidden cursor-pointer hover:bg-white/5 transition-colors group">
                    <div className="absolute left-0 top-0 h-full bg-[#00E5FF]/10 transition-all duration-300" style={{ width: `${votes.tactical}%` }} />
                    <div className="flex items-center gap-2 relative z-10">
                       <Shield className="w-4 h-4 text-[#00E5FF] group-active:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-gray-400 uppercase hidden sm:inline">Tactical</span>
                    </div>
                    <span className="text-sm font-black relative z-10 text-white">{votes.tactical}%</span>
                 </div>
                 <div onClick={() => handlePrematchVote('tension')} className="flex-1 bg-[#0A0A0A] rounded-2xl border border-purple-500/20 flex items-center justify-between px-4 relative overflow-hidden cursor-pointer hover:bg-white/5 transition-colors group">
                    <div className="absolute left-0 top-0 h-full bg-purple-500/10 transition-all duration-300" style={{ width: `${votes.tension}%` }} />
                    <div className="flex items-center gap-2 relative z-10">
                       <Zap className="w-4 h-4 text-purple-500 group-active:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-gray-400 uppercase hidden sm:inline">Tension</span>
                    </div>
                    <span className="text-sm font-black relative z-10 text-white">{votes.tension}%</span>
                 </div>
              </div>
           </section>
        </div>
      )}

      {/* Tab Navigation - Modern Pills */}
      {matchState !== 'live' && (
        <div className="flex gap-3 overflow-x-auto pb-6 hover-scrollbar hide-scrollbar-mobile mb-4 border-b border-white/5">
          {matchState === 'prematch' ? (
            ['LINEUP', 'H2H', 'STANDINGS', 'FORM', 'KEY BATTLES'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setPrematchTab(tab)}
                className={`px-6 py-3 rounded-full text-xs font-black tracking-widest whitespace-nowrap flex items-center gap-2 transition-all ${
                  prematchTab === tab 
                    ? 'bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.15)]' 
                    : 'border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))
          ) : (
            ['OVERVIEW', 'ROSTER', 'TIMELINE', 'STATS', 'STANDS'].map((tab) => (
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
            ))
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* PRE-MATCH TAB CONTENT */}
        {matchState === 'prematch' && (
          <motion.div 
            key="prematch-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
             <div className="max-w-4xl mx-auto min-h-[450px]">
                {prematchTab === 'LINEUP' && <LineupTab />}
                {prematchTab === 'H2H' && <H2HTab />}
                {prematchTab === 'STANDINGS' && <StandingsTab />}
                {prematchTab === 'FORM' && <FormTab />}
                {prematchTab === 'KEY BATTLES' && <KeyBattlesTab />}
             </div>

             {/* Secondary Info Cards (MVP & Fraud Watch) */}
             <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
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
                      <div className="flex items-end gap-1 mt-auto">
                        <span className="text-xl font-black text-[#00E5FF] leading-none">8.7</span>
                        <span className="text-[9px] text-gray-500 uppercase pb-0.5">Season rating</span>
                      </div>
                   </div>
                </div>

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
          </motion.div>
        )}

        {/* Overview Content (Post Match) */}
        {matchState === 'postmatch' && activeTab === 'OVERVIEW' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
          
          {/* FANS HAVE SPOKEN - MVP & FAN XI */}
          <section className="relative w-full rounded-[32px] overflow-hidden border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] mt-12 mb-16 group">
            {/* Dark Cinematic Background */}
            <div className="absolute inset-0 bg-[#020202] z-0" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay z-0" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent opacity-50" />

            <div className="relative z-10 p-6 md:p-16 flex flex-col items-center">
              
              {/* Premium Header */}
              <div className="flex flex-col items-center mb-12 md:mb-16 relative w-full mt-4 md:mt-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-24 md:h-32 bg-[#00E5FF]/20 blur-[80px] pointer-events-none" />
                <h2 className="text-3xl md:text-6xl font-black text-center tracking-tighter uppercase leading-[0.9] drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                  The Fans Have <br/>
                  <span className="text-[#00E5FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">Spoken.</span>
                </h2>
              </div>

              {/* Score Pill */}
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 md:px-8 md:py-3 flex items-center gap-4 md:gap-6 mb-16 md:mb-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-[#4FC3F7]/10 to-[#FF7F50]/10" />
                 <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-6 h-6 md:w-8 md:h-8 object-contain relative z-10 drop-shadow-md" />
                 <span className="text-2xl md:text-3xl font-black tracking-widest text-white relative z-10 font-mono">1 - 2</span>
                 <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-6 h-6 md:w-8 md:h-8 object-contain relative z-10 drop-shadow-md" />
              </div>

              {/* MVP SHOWCASE */}
              <div className="w-full max-w-lg mx-auto flex flex-col items-center relative mb-12">
                {/* Massive Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-[#00E5FF]/20 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative">
                  {/* Rotating Rings */}
                  <div className="absolute -inset-4 md:-inset-6 border-2 border-dashed border-[#00E5FF]/30 rounded-full animate-[spin_12s_linear_infinite]" />
                  <div className="absolute -inset-8 md:-inset-10 border border-[#00E5FF]/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                  
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full p-1 md:p-1.5 bg-gradient-to-br from-[#00E5FF] via-[#00E5FF]/20 to-transparent shadow-[0_0_50px_rgba(0,229,255,0.3)] relative z-10">
                     <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop" className="w-full h-full rounded-full object-cover border-4 border-[#020202]" />
                  </div>
                  
                  <div className="absolute -top-3 -right-4 md:-top-4 md:-right-6 bg-gradient-to-r from-[#00E5FF] to-[#00B4D8] text-[#020202] text-[10px] md:text-xs font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(0,229,255,0.4)] z-20 border border-[#020202] transform rotate-6">
                    MVP
                  </div>
                  
                  <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-[#020202] text-[#00E5FF] text-lg md:text-xl font-black px-4 py-1.5 md:px-5 md:py-2 rounded-xl border border-[#00E5FF]/50 shadow-[0_10px_30px_rgba(0,229,255,0.3)] z-20 font-mono transform -rotate-3">
                    9.2
                  </div>
                  
                  {/* Name Overlaid without taking extra vertical space */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 z-20 shadow-xl">
                    <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap">Mo Salah</span>
                  </div>
                </div>
              </div>

              {/* COMBINED FAN XI */}
              <div className="w-full max-w-3xl relative flex flex-col items-center bg-[#080808]/80 backdrop-blur-xl border border-white/5 rounded-[40px] py-12 md:py-16 px-2 md:px-8 shadow-2xl mt-12 md:mt-16">
                 
                 {/* Header Line */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020202] px-4 md:px-6 border border-white/10 rounded-full whitespace-nowrap">
                   <span className="text-[10px] md:text-xs text-gray-400 font-black tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white">Combined Fan XI</span>
                 </div>

                 {/* Subtle Pitch Lines */}
                 <div className="absolute inset-4 md:inset-8 border-2 border-white/5 rounded-3xl pointer-events-none" />
                 <div className="absolute top-4 md:top-8 bottom-4 md:bottom-8 left-1/2 w-0.5 bg-white/5 -translate-x-1/2 pointer-events-none" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border-2 border-white/5 rounded-full pointer-events-none" />

                 <div className="w-full relative flex flex-col gap-12 md:gap-20 items-center z-10 mt-6 md:mt-8">
                    {/* GK */}
                    <div className="flex justify-center w-full">
                      <div className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                          <div className="w-4 h-4 md:w-6 md:h-6 bg-white/10 rounded-full absolute top-2 md:top-4" />
                          <div className="w-8 h-6 md:w-12 md:h-10 bg-white/10 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                        </div>
                        <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">Alisson</span>
                      </div>
                    </div>

                    {/* DEFs (3) */}
                    <div className="flex justify-between w-[90%] md:w-[85%]">
                      {['Gvardiol', 'Van Dijk', 'Trent'].map(player => (
                        <div key={player} className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                            <div className="w-4 h-4 md:w-6 md:h-6 bg-white/10 rounded-full absolute top-2 md:top-4" />
                            <div className="w-8 h-6 md:w-12 md:h-10 bg-white/10 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                          </div>
                          <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">{player}</span>
                        </div>
                      ))}
                    </div>

                    {/* MIDs (4) */}
                    <div className="flex justify-between w-full px-2 md:px-4">
                      {['Mac Allister', 'De Bruyne', 'Foden', 'Doku'].map(player => (
                        <div key={player} className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                            <div className="w-4 h-4 md:w-6 md:h-6 bg-white/10 rounded-full absolute top-2 md:top-4" />
                            <div className="w-8 h-6 md:w-12 md:h-10 bg-white/10 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                          </div>
                          <span className="text-[8px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors whitespace-nowrap">{player}</span>
                        </div>
                      ))}
                    </div>

                    {/* FWDs (3) */}
                    <div className="flex justify-between w-[90%] md:w-[85%] relative">
                      <div className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                          <div className="w-4 h-4 md:w-6 md:h-6 bg-white/10 rounded-full absolute top-2 md:top-4" />
                          <div className="w-8 h-6 md:w-12 md:h-10 bg-white/10 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                        </div>
                        <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">Diaz</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform relative">
                        <div className="absolute -inset-2 bg-[#00E5FF]/20 rounded-full blur-md" />
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)] p-0.5 md:p-1 bg-[#020202] relative z-10">
                          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <span className="text-[9px] md:text-xs font-black text-[#00E5FF] uppercase tracking-widest drop-shadow-md mt-0.5 md:mt-1">Salah</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                          <div className="w-4 h-4 md:w-6 md:h-6 bg-white/10 rounded-full absolute top-2 md:top-4" />
                          <div className="w-8 h-6 md:w-12 md:h-10 bg-white/10 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                        </div>
                        <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">Haaland</span>
                      </div>
                    </div>
                 </div>
              </div>
              
              {/* Floating Action Button */}
              <button className="hidden md:flex absolute top-12 right-12 w-14 h-14 bg-[#111] hover:bg-[#222] rounded-full items-center justify-center shadow-2xl transition-all border border-white/10 group cursor-pointer z-50">
                 <Share className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </section>

          {/* Key Insights */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black tracking-widest text-white uppercase flex items-center gap-3">
                <Activity className="w-5 h-5 text-[#00E5FF]" /> KEY INSIGHTS
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#121212]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-[#00E5FF]/30 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 blur-[40px] rounded-full group-hover:bg-[#00E5FF]/20 transition-colors pointer-events-none" />
                <h3 className="text-[#00E5FF] font-black uppercase tracking-widest text-xs mb-3 relative z-10">Tactical Shift</h3>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                  Liverpool's second-half introduction of Diaz forced Walker to drop 15 yards deeper, fundamentally breaking Man City's high press structure and isolating De Bruyne in the right half-space.
                </p>
              </div>
              <div className="bg-[#121212]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-[#00E5FF]/30 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 blur-[40px] rounded-full group-hover:bg-[#00E5FF]/20 transition-colors pointer-events-none" />
                <h3 className="text-[#00E5FF] font-black uppercase tracking-widest text-xs mb-3 relative z-10">The Midfield Battle</h3>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                  Mac Allister won 82% of his ground duels against Rodri, an unusually high success rate that allowed Liverpool to transition from defense to attack in under 4 seconds on average.
                </p>
              </div>
              <div className="bg-[#121212]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-[#00E5FF]/30 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 blur-[40px] rounded-full group-hover:bg-[#00E5FF]/20 transition-colors pointer-events-none" />
                <h3 className="text-[#00E5FF] font-black uppercase tracking-widest text-xs mb-3 relative z-10">Haaland Nullified</h3>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                  Van Dijk maintained a 2-meter buffer from Haaland throughout the match, denying him the space for his signature runs behind. Haaland finished with just 14 touches, his lowest of the season.
                </p>
              </div>
              <div className="bg-[#121212]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-[#00E5FF]/30 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 blur-[40px] rounded-full group-hover:bg-[#00E5FF]/20 transition-colors pointer-events-none" />
                <h3 className="text-[#00E5FF] font-black uppercase tracking-widest text-xs mb-3 relative z-10">xG Overperformance</h3>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                  Despite having an xG of only 1.2, Liverpool managed to score twice through sheer clinical finishing, converting half-chances into key goals when momentum was heavily against them.
                </p>
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
                <div className="absolute top-8 right-8 w-16 h-16 opacity-30 pointer-events-none drop-shadow-xl">
                  <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-full h-full object-contain" />
                </div>
                <div className="absolute bottom-8 right-8 w-16 h-16 opacity-30 pointer-events-none drop-shadow-xl">
                  <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-full h-full object-contain" />
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
                <div className="absolute top-1/2 left-24 -translate-y-1/2 w-32 h-32 opacity-20 pointer-events-none drop-shadow-xl">
                  <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-full h-full object-contain" />
                </div>
                <div className="absolute top-1/2 right-24 -translate-y-1/2 w-32 h-32 opacity-20 pointer-events-none drop-shadow-xl">
                  <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-full h-full object-contain" />
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

              {/* Subs (Horizontal Strip) */}
              <div className="flex flex-col md:flex-row justify-between items-center bg-[#0A0A0A] border-t border-white/5 p-4 rounded-b-[24px] gap-4 w-full mt-4 md:mt-0 relative z-20">
                {/* Left side (MCI) */}
                <div className="flex items-center gap-2 w-full">
                  <div className="w-1 h-4 bg-[#4FC3F7]" />
                  <div className="flex gap-1.5">
                    {subsMCI.map(sub => (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0 group cursor-pointer" key={sub.name} title={sub.name}>
                        <img src={sub.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20 shrink-0" />
                    <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20 shrink-0" />
                    <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20 shrink-0" />
                  </div>
                </div>

                {/* Right side (LIV) */}
                <div className="flex items-center justify-end gap-2 w-full">
                  <div className="flex gap-1.5">
                    <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20 shrink-0" />
                    <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20 shrink-0" />
                    <div className="w-6 h-6 rounded-full border border-white/5 bg-black/20 shrink-0" />
                    {subsLIV.map(sub => (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0 group cursor-pointer" key={sub.name} title={sub.name}>
                        <img src={sub.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                    ))}
                  </div>
                  <div className="w-1 h-4 bg-[#FF7F50]" />
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
          className="w-full max-w-3xl mx-auto space-y-4"
        >
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase">Live Match Stands</h2>
             <button className="text-[10px] bg-[#00E5FF]/10 text-[#00E5FF] px-4 py-2 rounded-full font-bold uppercase tracking-widest border border-[#00E5FF]/20 hover:bg-[#00E5FF]/20 transition-colors">Start a Stand</button>
          </div>

          {activeStands.map(stand => (
            <Link href={`/stands/${stand.id}`} key={stand.id} className="block relative group/post cursor-pointer">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF7F50]/0 via-white/5 to-[#4FC3F7]/0 rounded-2xl blur opacity-0 group-hover/post:opacity-100 transition duration-500"></div>
               <div className="relative bg-[#0A0A0A] hover:bg-[#121212] border border-white/5 group-hover/post:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 flex items-center justify-between">
                 <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-3">
                     <span className="flex items-center gap-1.5 text-[9px] text-[#FF3B00] font-bold tracking-widest uppercase bg-[#FF3B00]/10 px-2 py-1 rounded-full border border-[#FF3B00]/20">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B00] animate-pulse" /> LIVE
                     </span>
                     <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stand.tag}</span>
                   </div>
                   <h3 className="text-lg font-bold text-white mt-1 group-hover/post:text-[#00E5FF] transition-colors">{stand.title}</h3>
                   <div className="text-xs text-gray-400 font-medium">Hosted by <span className="text-white font-bold">{stand.host}</span></div>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                   <div className="flex items-center gap-1.5 text-gray-300">
                     <Users className="w-4 h-4" />
                     <span className="text-sm font-bold font-mono">{stand.listeners}</span>
                   </div>
                   <span className="text-[9px] text-[#00E5FF] font-black tracking-widest uppercase opacity-0 group-hover/post:opacity-100 transition-opacity">Join</span>
                 </div>
               </div>
            </Link>
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

// ---------------------------------------------------------
// Pre-Match Tab Components
// ---------------------------------------------------------

function LineupTab() {
  const [vibe, setVibe] = useState(80);
  const [tactical, setTactical] = useState(45);
  const [hasVotedAs, setHasVotedAs] = useState<'fan' | 'neutral' | null>(null);

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
             {hasVotedAs === 'neutral' ? (
               <div className="flex items-center gap-1.5">
                 <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">LOCKED</span>
                 <div className="w-3 h-3 border border-gray-600 rounded-sm flex flex-col items-center justify-center text-[6px] text-gray-500">🔒</div>
               </div>
             ) : (
               <span className="text-[10px] font-black text-[#00E5FF] tracking-widest">{vibe >= 50 ? 'FEELING GOOD' : 'WORRIED'}</span>
             )}
           </div>
           <div className="flex justify-between text-[8px] text-gray-500 font-bold mb-1">
             <span>WORRIED</span>
             <span>CONFIDENT</span>
           </div>
           <input 
             type="range" min="0" max="100" 
             value={vibe} onChange={(e) => {
               setVibe(parseInt(e.target.value));
               if (!hasVotedAs) setHasVotedAs('fan');
             }}
             disabled={hasVotedAs === 'neutral'}
             className={`w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#00E5FF] [&::-webkit-slider-thumb]:rounded-full ${hasVotedAs === 'neutral' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
             {hasVotedAs === 'fan' ? (
               <div className="flex items-center gap-1.5">
                 <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">LOCKED</span>
                 <div className="w-3 h-3 border border-gray-600 rounded-sm flex flex-col items-center justify-center text-[6px] text-gray-500">🔒</div>
               </div>
             ) : (
               <span className="text-[10px] font-black text-[#00E5FF] tracking-widest">{tactical >= 50 ? 'LIV EDGE' : 'MCI EDGE'}</span>
             )}
           </div>
           <div className="flex justify-between text-[8px] text-gray-500 font-bold mb-1">
             <span>MCI</span>
             <span>LIV</span>
           </div>
           <input 
             type="range" min="0" max="100" 
             value={tactical} onChange={(e) => {
               setTactical(parseInt(e.target.value));
               if (!hasVotedAs) setHasVotedAs('neutral');
             }}
             disabled={hasVotedAs === 'fan'}
             className={`w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#00E5FF] [&::-webkit-slider-thumb]:rounded-full ${hasVotedAs === 'fan' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
