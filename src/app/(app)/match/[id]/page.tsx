"use client";

import Link from "next/link";
import { ArrowLeft, Share, Eye, Shield, Zap, X, Play, ThumbsUp, ThumbsDown, ChevronRight, ChevronDown, BarChart3, Activity, Clock, Mic, Flame, Users, Bell, Trophy, Target, Lock, Building2 } from "lucide-react";
import { useState, useEffect, use } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";

import PlayerSummaryModal from "@/components/match/PlayerSummaryModal";
import LivePulseView from "@/components/match/LivePulseView";
import { useAuth } from "@/components/Providers";
import { toast } from "sonner";

const MatchMomentumGraph = ({ data = [], homeColor = 'bg-[#FFD700]', awayColor = 'bg-white' }: { data?: number[], homeColor?: string, awayColor?: string }) => {
  const graphData = data.length > 0 ? data : [
     2, 5, -2, -5, -8, 10, 15, -2, -10, -25, 
     -15, -5, 5, 20, 45, 85, 90, 60, 40, 25, 
     10, -5, -15, -20, -35, -25, -10, -15, -30, -50,
     -40, -10, 10, 20, 15, 30, 40, 75, 20, 10
  ];

  return (
    <div className="w-full flex flex-col gap-1 py-2 mt-2">
      <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
        <span className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-sm ${homeColor}`}></div> Home</span>
        <span className="font-bold text-foreground tracking-widest drop-shadow-md">Match Momentum</span>
        <span className="flex items-center gap-1.5">Away <div className={`w-2 h-2 rounded-sm ${awayColor}`}></div></span>
      </div>
      
      <div className="relative w-full h-24 flex items-center border-x border-white/10 px-0.5 mb-2">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20 z-0"></div>
        <div className="absolute -bottom-4 left-0 text-[8px] font-mono text-muted-foreground">KO</div>
        <div className="absolute -bottom-4 right-0 text-[8px] font-mono text-muted-foreground">HT</div>

        <div className="w-full h-full flex items-center justify-between gap-[2px] z-10">
           {graphData.map((val, idx) => {
              const isHome = val > 0;
              const heightPct = Math.min(100, Math.abs(val));
              return (
                 <div key={idx} className="flex-1 h-full flex flex-col justify-center group cursor-crosshair">
                    <div className="flex-1 flex flex-col justify-end relative">
                       {isHome && <div className={`w-full ${homeColor} rounded-t-[1px] opacity-90 group-hover:opacity-100 transition-all group-hover:shadow-[0_0_8px_currentColor]`} style={{ height: `${heightPct}%` }} />}
                    </div>
                    <div className="h-[1px] w-full shrink-0" />
                    <div className="flex-1 flex flex-col justify-start relative">
                       {!isHome && <div className={`w-full ${awayColor} rounded-b-[1px] opacity-90 group-hover:opacity-100 transition-all group-hover:shadow-[0_0_8px_currentColor]`} style={{ height: `${heightPct}%` }} />}
                    </div>
                 </div>
              )
           })}
        </div>
      </div>
    </div>
  );
};



const getTeamPlayers = () => {
  return [...pitchLIV.map(p => ({...p, team: 'Liverpool'})), ...pitchMCI.map(p => ({...p, team: 'Man City'}))];
};

const initialHotTakes = [
  {
    id: 1,
    question: "Was Salah the right MVP?",
    options: [
      { text: "Yes, 100% deserved", percent: 72, color: "bg-[#75fbd9]" },
      { text: "No, Van Dijk deserved it", percent: 18, color: "bg-[#75fbd9]/30" },
      { text: "Someone else", percent: 10, color: "bg-[#75fbd9]/30" }
    ],
    votes: "8.7K votes"
  },
  {
    id: 2,
    question: "Was the VAR decision fair?",
    options: [
      { text: "Correct decision", percent: 32, color: "bg-gray-500" },
      { text: "Robbery!", percent: 58, color: "bg-coral" },
      { text: "Too close to call", percent: 10, color: "bg-[#75fbd9]/30" }
    ],
    votes: "7.9K votes"
  },
  {
    id: 3,
    question: "What won Liverpool the game?",
    options: [
      { text: "Midfield control", percent: 41, color: "bg-[#75fbd9]" },
      { text: "Salah's brilliance", percent: 37, color: "bg-[#75fbd9]/80" },
      { text: "City's poor finishing", percent: 22, color: "bg-[#75fbd9]/50" }
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

const defaultTimelineEvents = [
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

import { matchService } from '@/services/matchService';
import { Match } from '@/types/match';
interface HotTakeOption {
  text: string;
  percent: number;
  color: string;
}

interface HotTake {
  id: string | number;
  question: string;
  options: HotTakeOption[];
  votes: string;
}

export default function MatchDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const matchId = unwrappedParams.id;
  
  const [matchInfo, setMatchInfo] = useState<Match | null>(null);
  
  const [pulseEvents, setPulseEvents] = useState<any[]>([]);
  const [isSeasonContextOpen, setIsSeasonContextOpen] = useState(false);
  const [matchState, setMatchState] = useState<'prematch' | 'live' | 'postmatch'>('prematch');
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [prematchTab, setPrematchTab] = useState('LINEUP');
  const [takes, setTakes] = useState<HotTake[]>(initialHotTakes);
  const [votedTakes, setVotedTakes] = useState<Record<string | number, boolean>>({});
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  
  const { user } = useAuth();
  const supabase = createClient();
  
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const match = await matchService.getMatchById(Number(matchId));
        if (match) setMatchInfo(match);
      } catch (err) {
        console.error("Error fetching match details:", err);
      }
    };
    fetchMatch();
  }, [matchId]);

  useEffect(() => {
    if (matchInfo) {
      setMatchState(matchInfo.status === 'upcoming' ? 'prematch' : matchInfo.status === 'finished' ? 'postmatch' : 'live');
      if (matchInfo.hotTakes) setTakes(matchInfo.hotTakes as any);
      if (matchInfo.timelineEvents) setPulseEvents(matchInfo.timelineEvents);
    }
  }, [matchInfo]);

  const timelineEvents = (matchInfo as any)?.timelineEvents || defaultTimelineEvents;

  const [votes, setVotes] = useState({ chaos: 64, tactical: 22, tension: 14 });
  const [hasVotedVibe, setHasVotedVibe] = useState(false);
  const [mvpWatchPlayer, setMvpWatchPlayer] = useState('De Bruyne');
  const [fraudWatchPlayer, setFraudWatchPlayer] = useState('Darwin Núñez');

  if (!matchInfo) {
    return (
      <div className="flex-1 w-full min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
           <Activity className="w-8 h-8 text-[coral] mb-4 animate-bounce" />
           <p className="text-white font-mono uppercase tracking-widest text-xs">Loading Match Data...</p>
        </div>
      </div>
    );
  }


  const handlePrematchVote = (type: 'chaos' | 'tactical' | 'tension') => {
    if (hasVotedVibe) return;
    setHasVotedVibe(true);
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

  const handleVote = async (takeId: string | number, optionIndex: number) => {
    if (!user) {
      toast.error('Login Required', {
        description: 'You must be logged in to vote on hot takes.',
      });
      return;
    }
    
    if (votedTakes[takeId]) return;

    // Optimistic UI update
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
    
    // Write to Supabase if it's a real take (uuid)
    if (typeof takeId === 'string' && takeId.includes('-')) {
      const { error } = await supabase.from('hot_take_votes').insert({
        take_id: takeId,
        profile_id: user.id,
        option_index: optionIndex
      });
      if (error) {
        console.error('Error recording vote:', error);
      } else {
        // Also increment the options count in hot_takes table to trigger realtime
        // Note: For a robust app, you'd use a postgres function or trigger to update the percents
        toast.success('Vote recorded!', { description: 'Your voice has been heard in the stands.' });
      }
    }
  };

  const tickerItems = [
    "📈 ARS Fans: +15% Optimism (Saka sub)",
    "📉 MUN Fans: -30% Patience (Ten Hag)",
    "⚠️ RMA Fans: Tension Spiking (0-0 80')",
    "🔥 LIV Fans: Roaring (+45% Momentum)",
    "🧊 CHE Fans: Complete silence at Stamford Bridge",
    "📈 JUV Fans: Tactical approval rising (+12%)",
  ];

  return (
    <div className="bg-[#020202] min-h-screen">
      {/* 0. TERMINAL TICKER TAPE */}
      <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border flex items-center overflow-hidden py-1.5 shadow-2xl">
         <div className="flex whitespace-nowrap animate-ticker w-[200%]">
            <div className="flex justify-around min-w-[50%] shrink-0">
               {tickerItems.map((item, idx) => (
                 <button key={`ticker-1-${idx}`} className="text-[10px] font-mono tracking-widest uppercase text-[#75fbd9] px-8 hover:text-foreground hover:bg-black/5 dark:bg-muted transition-colors rounded py-0.5 cursor-pointer">
                   {item}
                 </button>
               ))}
            </div>
            <div className="flex justify-around min-w-[50%] shrink-0">
               {tickerItems.map((item, idx) => (
                 <button key={`ticker-2-${idx}`} className="text-[10px] font-mono tracking-widest uppercase text-[#75fbd9] px-8 hover:text-foreground hover:bg-black/5 dark:bg-muted transition-colors rounded py-0.5 cursor-pointer">
                   {item}
                 </button>
               ))}
            </div>
         </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-4 md:pt-4 text-foreground pb-24">
      <style>{`
        @keyframes scorerScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scorer-scroll {
          animation: scorerScroll 4s linear infinite;
        }
      `}</style>
      {/* Cinematic Scoreboard */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-4 border border-border shadow-2xl">
        {/* Navigation Buttons Overlay */}
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none px-4 md:px-0 pt-2 md:pt-0">
          <div className="pointer-events-auto">
            <BackButton containerClassName="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors backdrop-blur-md bg-black/40 text-white shadow-lg" iconClassName="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div className="pointer-events-auto">
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-black/60 transition-colors backdrop-blur-md bg-black/40 text-white shadow-lg">
              <Share className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#D32F2F]/20 via-[#020202] to-[#4FC3F7]/20 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10" />
        
        <div className="relative z-20 px-6 py-10 pt-20 md:px-12 md:py-12 md:pt-16 flex flex-col items-center justify-center">

          <div className="flex items-start justify-center gap-6 md:gap-16 w-full max-w-2xl">
            {/* TEAM 1 */}
            <div className="flex flex-col items-center flex-1 relative">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-muted border border-border flex items-center justify-center p-3 shadow-[0_0_40px_rgba(255,107,107,0.3)] mb-3 md:mb-4 group-hover:scale-105 transition-transform">
                <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"} alt="Team 1" className={`w-full h-full object-contain ${matchInfo?.logo1?.includes('black') ? 'invert' : ''}`} />
              </div>
              <h2 className="text-sm md:text-xl font-black tracking-wider uppercase text-center mb-0.5 md:mb-1">{matchInfo?.team1 || "Home"}</h2>
              
              {/* Goal Scorers */}
              {matchState !== 'prematch' && (
                <div className="absolute top-[100%] left-0 right-0 h-6 md:h-8 overflow-hidden mt-1" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
                  <div className="flex flex-col items-center gap-0.5 md:gap-1 text-[9px] md:text-[10px] font-bold text-muted-foreground animate-scorer-scroll">
                    <div className="flex items-center justify-center gap-1 md:gap-1.5 h-3 md:h-4 shrink-0">
                      <span className="text-[#75fbd9] text-[8px] md:text-[10px]">⚽</span> Salah 12'
                    </div>
                    <div className="flex items-center justify-center gap-1 md:gap-1.5 h-3 md:h-4 shrink-0">
                      <span className="text-[#75fbd9] text-[8px] md:text-[10px]">⚽</span> Nunez 54'
                    </div>
                    <div className="flex items-center justify-center gap-1 md:gap-1.5 h-3 md:h-4 shrink-0">
                      <span className="text-[#75fbd9] text-[8px] md:text-[10px]">⚽</span> Salah 12'
                    </div>
                    <div className="flex items-center justify-center gap-1 md:gap-1.5 h-3 md:h-4 shrink-0">
                      <span className="text-[#75fbd9] text-[8px] md:text-[10px]">⚽</span> Nunez 54'
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SCORE / TIME */}
            <div className="flex flex-col items-center justify-start shrink-0 relative z-10 w-24 md:w-32">
              <div className="h-16 md:h-24 flex flex-col items-center justify-center w-full">
                {matchState === 'prematch' ? (
                  <>
                    <span className="text-[9px] md:text-[11px] font-bold text-[#75fbd9] tracking-[0.2em] uppercase mb-1">Kickoff In</span>
                    <span className="text-4xl md:text-5xl font-black tracking-tighter text-foreground drop-shadow-2xl font-mono leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>45:00</span>
                  </>
                ) : (
                  <>
                    <span className={`text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase mb-1 ${matchState === 'live' ? 'text-coral animate-pulse drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]' : 'text-muted-foreground'}`}>
                      {matchState === 'live' ? (
                        <span className="flex items-center gap-1.5"><span className="inline-block w-1.5 h-1.5 bg-coral rounded-full shadow-[0_0_8px_rgba(255,127,80,0.8)]"></span>72'</span>
                      ) : "FT"}
                    </span>
                    <div className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums drop-shadow-xl z-10 relative font-mono leading-none whitespace-nowrap">
                      {(matchInfo as any)?.score || "0 - 0"}
                    </div>
                  </>
                )}
              </div>
              <Link href={`/stands/1`} className="mt-2 md:mt-3 flex items-center justify-center gap-1.5 bg-[#75fbd9]/10 hover:bg-[#75fbd9]/20 text-[#75fbd9] px-3 py-1.5 rounded-2xl border border-[#75fbd9]/30 transition-all shadow-[0_0_15px_rgba(117,251,217,0.2)] hover:shadow-[0_0_20px_rgba(117,251,217,0.4)] hover:scale-105 group backdrop-blur-md">
                <Mic className="w-2.5 h-2.5 md:w-3 md:h-3 animate-pulse" />
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Join Stand</span>
              </Link>
            </div>

            {/* TEAM 2 */}
            <div className="flex flex-col items-center flex-1 relative">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-muted border border-border flex items-center justify-center p-3 shadow-[0_0_40px_rgba(79,195,247,0.3)] mb-3 md:mb-4">
                <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"} alt="Team 2" className={`w-full h-full object-contain ${matchInfo?.logo2?.includes('black') ? 'invert' : ''}`} />
              </div>
              <h2 className="text-sm md:text-xl font-black tracking-wider uppercase text-center mb-0.5 md:mb-1">{matchInfo?.team2 || "Away"}</h2>
              
              {/* Goal Scorers */}
              {matchState !== 'prematch' && (
                <div className="absolute top-[100%] left-0 right-0 h-6 md:h-8 overflow-hidden mt-1" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
                  <div className="flex flex-col items-center gap-0.5 md:gap-1 text-[9px] md:text-[10px] font-bold text-muted-foreground animate-scorer-scroll">
                    <div className="flex items-center justify-center gap-1 md:gap-1.5 h-3 md:h-4 shrink-0">
                      <span className="text-[#75fbd9] text-[8px] md:text-[10px]">⚽</span> Haaland 33'
                    </div>
                    <div className="flex items-center justify-center gap-1 md:gap-1.5 h-3 md:h-4 shrink-0">
                      <span className="text-[#75fbd9] text-[8px] md:text-[10px]">⚽</span> Foden 89'
                    </div>
                    <div className="flex items-center justify-center gap-1 md:gap-1.5 h-3 md:h-4 shrink-0">
                      <span className="text-[#75fbd9] text-[8px] md:text-[10px]">⚽</span> Haaland 33'
                    </div>
                    <div className="flex items-center justify-center gap-1 md:gap-1.5 h-3 md:h-4 shrink-0">
                      <span className="text-[#75fbd9] text-[8px] md:text-[10px]">⚽</span> Foden 89'
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Tab Navigation */}
      <div className="flex gap-2 p-1 bg-[#1A1A1A]/80 backdrop-blur-xl border border-border rounded-2xl mb-4 max-w-lg mx-4 md:mx-auto shadow-2xl">
        {['prematch', 'live', 'postmatch'].map((state) => (
          <button
            key={state}
            onClick={() => setMatchState(state as 'prematch' | 'live' | 'postmatch')}
            className={`flex-1 py-3 px-4 rounded-2xl text-[10px] md:text-xs font-black tracking-widest transition-all ${
              matchState === state 
                ? 'bg-[#75fbd9] text-black shadow-[0_0_20px_rgba(117, 251, 217,0.3)]' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {state === 'prematch' ? 'PRE-MATCH' : state === 'live' ? 'LIVE' : 'THE FALLOUT'}
          </button>
        ))}
      </div>



              {matchState === 'live' && matchInfo?.status === 'upcoming' ? (
        <div className="flex flex-col items-center justify-center py-24 text-center max-w-lg mx-auto border border-border rounded-2xl bg-card text-card-foreground/5 shadow-2xl backdrop-blur-sm relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=1000&auto=format&fit=crop')] opacity-5 mix-blend-luminosity bg-cover z-0 pointer-events-none" />
           <div className="relative z-10 w-16 h-16 rounded-full bg-black/50 border border-[#75fbd9]/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(117, 251, 217,0.15)]">
             <span className="text-3xl">⏳</span>
           </div>
           
           <h3 className="relative z-10 text-3xl font-black tracking-tighter uppercase mb-4 text-foreground">Awaiting Kick Off</h3>
           <p className="relative z-10 text-sm text-muted-foreground max-w-xs font-medium">
             The stage is set. Stimmung will begin tracking momentum, sentiment, and key moments once the match gets underway.
           </p>
        </div>
      ) : matchState === 'live' && matchInfo?.status === 'finished' ? (
        <LivePulseView isMatchFinished={true} matchId={matchId} />
      ) : matchState === 'live' ? (
        <LivePulseView isMatchFinished={false} matchId={matchId} />
      ) : null}
      {/* PRE-MATCH WIDGETS (Removed) */}

      {/* Tab Navigation - Modern Pills */}
      {matchState === 'prematch' && (
        <div className="mb-4 border-b border-border">
          <div className="flex items-center gap-4 mb-4 pl-2 w-full">
            <div className="w-1 h-6 rounded-full bg-[#75fbd9] shadow-[0_0_12px_rgba(117, 251, 217,0.8)]"></div>
            <h2 className="text-sm font-black uppercase tracking-widest text-foreground drop-shadow-lg">MATCH INTEL</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-6 hover-scrollbar hide-scrollbar-mobile">
            {['LINEUP', 'H2H', 'SEASON CONTEXT', 'KEY BATTLES'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setPrematchTab(tab)}
                className={`px-6 py-3 rounded-full text-xs font-black tracking-widest whitespace-nowrap flex items-center gap-2 transition-all ${
                  prematchTab === tab 
                    ? 'bg-[#75fbd9]/10 border border-[#75fbd9]/30 text-[#75fbd9] shadow-[0_0_20px_rgba(117, 251, 217,0.15)]' 
                    : 'border border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {matchState === 'postmatch' && matchInfo?.status === 'finished' && (
        <div className="flex gap-3 overflow-x-auto pb-6 hover-scrollbar hide-scrollbar-mobile mb-4 border-b border-border">
          {['OVERVIEW', 'ROSTER', 'STATS', 'STANDS'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-xs font-black tracking-widest whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === tab 
                  ? 'bg-[#75fbd9]/10 border border-[#75fbd9]/30 text-[#75fbd9] shadow-[0_0_20px_rgba(117, 251, 217,0.15)]' 
                  : 'border border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground'
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
            className="space-y-12 px-4 md:px-0"
          >
             <div className="max-w-4xl mx-auto min-h-[450px]">
                {prematchTab === 'LINEUP' && <LineupTab matchInfo={matchInfo} />}
                {prematchTab === 'H2H' && <H2HTab matchInfo={matchInfo} />}
                {prematchTab === 'SEASON CONTEXT' && <SeasonContextTab matchInfo={matchInfo} />}
                {prematchTab === 'KEY BATTLES' && <KeyBattlesTab matchInfo={matchInfo} />}
             </div>

             {/* Secondary Info Cards (MVP & Fraud Watch) */}
             {prematchTab === 'LINEUP' && (
               <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
                  <div className="bg-muted text-muted-foreground/80 backdrop-blur-xl border border-[#75fbd9]/30 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group shadow-2xl">
                     <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent z-0 pointer-events-none" />
                     <div className="absolute right-0 bottom-0 w-32 h-32 opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none">
                        <img src={getTeamPlayers().find(p => p.name === mvpWatchPlayer)?.img} className="w-full h-full object-cover object-top mix-blend-luminosity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-l from-[#121212] to-transparent" />
                     </div>
                     <div className="relative z-10 w-full h-full flex flex-col justify-center">
                        <h3 className="text-[10px] font-black tracking-widest text-[#75fbd9] uppercase mb-2">MVP WATCH</h3>
                        <select 
                          value={mvpWatchPlayer}
                          onChange={(e) => setMvpWatchPlayer(e.target.value)}
                          disabled={matchInfo?.status === 'finished'}
                          className="w-full bg-transparent text-lg font-black uppercase mb-1 focus:outline-none appearance-none cursor-pointer hover:text-[#75fbd9] transition-colors pb-1 border-b border-border disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {getTeamPlayers().map(p => <option key={p.name} value={p.name} className="bg-muted text-muted-foreground text-sm">{p.name}</option>)}
                        </select>
                        <p className="text-[10px] text-muted-foreground mb-2">{getTeamPlayers().find(p => p.name === mvpWatchPlayer)?.team}</p>
                        <div className="flex items-end gap-1 mt-auto">
                          <span className="text-xl font-black text-[#75fbd9] leading-none">8.7</span>
                          <span className="text-[9px] text-gray-500 uppercase pb-0.5">Season rating</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-muted text-muted-foreground/80 backdrop-blur-xl border border-[#D32F2F]/30 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group shadow-2xl">
                     <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent z-0 pointer-events-none" />
                     <div className="absolute right-0 bottom-0 w-32 h-32 opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none">
                        <img src={getTeamPlayers().find(p => p.name === fraudWatchPlayer)?.img} className="w-full h-full object-cover object-top mix-blend-luminosity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-l from-[#121212] to-transparent" />
                     </div>
                     <div className="relative z-10 w-full h-full flex flex-col justify-center">
                        <h3 className="text-[10px] font-black tracking-widest text-[#D32F2F] uppercase mb-2">FRAUD WATCH</h3>
                        <select 
                          value={fraudWatchPlayer}
                          onChange={(e) => setFraudWatchPlayer(e.target.value)}
                          disabled={matchInfo?.status === 'finished'}
                          className="w-full bg-transparent text-lg font-black uppercase mb-1 focus:outline-none appearance-none cursor-pointer hover:text-[#D32F2F] transition-colors pb-1 border-b border-[#D32F2F]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {getTeamPlayers().map(p => <option key={p.name} value={p.name} className="bg-muted text-muted-foreground text-sm">{p.name}</option>)}
                        </select>
                        <p className="text-[10px] text-muted-foreground mb-2">{getTeamPlayers().find(p => p.name === fraudWatchPlayer)?.team}</p>
                        <div className="flex items-end gap-1.5 mt-auto">
                          <span className="text-[10px] font-bold text-gray-300 leading-tight">Needs a big performance</span>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </motion.div>
        )}

        {/* POST-MATCH CONTENT - LOCKED STATE */}
      {matchState === 'postmatch' && matchInfo?.status !== 'finished' && (
        <div className="w-full max-w-4xl mx-auto space-y-6 px-4 md:px-0">
          <div className="flex flex-col items-center justify-center text-center p-8 bg-card border border-border rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-sm">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=1000&auto=format&fit=crop')] opacity-[0.03] mix-blend-luminosity bg-cover z-0 pointer-events-none" />
             <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-teal to-transparent opacity-30" />
             
             {matchInfo?.status === 'live' && (
               <div className="relative z-10 flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live</span>
               </div>
             )}

             {matchInfo?.status === 'upcoming' && (
               <div className="relative z-10 w-16 h-16 rounded-full bg-black/50 border border-[#75fbd9]/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(117, 251, 217,0.15)]">
                 <span className="text-3xl">⏳</span>
               </div>
             )}

             {matchInfo?.status === 'live' && (
               <div className="relative z-10 w-full h-24 mb-6 opacity-30">
                 {/* Fake pitch/chart animation placeholder */}
                 <div className="absolute inset-0 border border-border rounded-2xl bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/82/Soccer_field_-_empty.svg')] bg-center bg-cover mix-blend-screen overflow-hidden">
                    <div className="w-3 h-3 bg-[#75fbd9] rounded-full absolute top-1/2 left-1/4 shadow-[0_0_10px_rgba(117, 251, 217,1)] animate-pulse" />
                    <div className="w-3 h-3 bg-[#FF7F50] rounded-full absolute top-1/3 left-2/3 shadow-[0_0_10px_rgba(255,127,80,1)] animate-pulse" />
                 </div>
               </div>
             )}

             <h3 className="relative z-10 text-2xl font-black tracking-tighter uppercase mb-3 text-foreground">
               {matchInfo?.status === 'upcoming' ? 'Awaiting the full story' : 'The match is still unfolding'}
             </h3>
             <p className="relative z-10 text-sm text-muted-foreground max-w-md font-medium">
               {matchInfo?.status === 'upcoming' 
                 ? 'The match is yet to be played. Return after full time for ratings, tactical breakdowns, and key takeaways.'
                 : 'We\'re collecting every moment to build the complete story. Full match intelligence becomes available after full time.'}
             </p>
          </div>

          {matchInfo?.status !== 'upcoming' && (
             <div className="grid grid-cols-2 gap-4">
               {['Player Ratings', 'Momentum Swings', 'Tactical Analysis', 'Fan Pulse'].map((label) => (
                 <div key={label} className="bg-card text-card-foreground/5 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 relative overflow-hidden group select-none">
                   <div className="absolute inset-0 bg-muted/30 backdrop-blur-[2px] z-10 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/60 border border-border flex items-center justify-center shadow-xl">
                         <Lock className="w-4 h-4 text-muted-foreground" />
                      </div>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-muted border border-border opacity-20" />
                   <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/30 blur-[1px]">{label}</span>
                 </div>
               ))}
             </div>
          )}
        </div>
      )}

        {/* STANDS TAB */}
        {matchState === 'postmatch' && matchInfo?.status === 'finished' && activeTab === 'STANDS' && (
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -15 }}
             className="space-y-8 px-4 md:px-0"
          >
            <div className="flex items-center gap-2 mb-4">
               <Mic className="w-5 h-5 text-[#75fbd9]" />
               <h3 className="text-sm font-black tracking-widest text-[#75fbd9] uppercase">Highlights from the Stands</h3>
            </div>
            <div className="bg-muted text-muted-foreground/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl space-y-4">
               {[
                 { id: 1, name: "CityZen99", time: "24'", text: "What a ridiculous goal! Nobody saw that coming. That changes the entire trajectory of the game!", color: "from-[#75fbd9] to-blue-500" },
                 { id: 2, name: "AnfieldRed", time: "68'", text: "That decision is shocking. Absolute madness from the ref there.", color: "from-[#C8102E] to-red-500" },
                 { id: 3, name: "NeutralFan", time: "FT", text: "Incredible match. A masterclass in tactical adaptability in the second half.", color: "from-gray-400 to-gray-600" }
               ].map(note => (
                  <div key={note.id} className="bg-black/40 rounded-2xl p-4 md:p-5 border border-border flex gap-4 items-start hover:bg-muted/50 transition-colors cursor-pointer group">
                     <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${note.color} shrink-0`} />
                     <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                           <span className="font-bold text-gray-300">{note.name}</span>
                           <span className="text-[10px] text-gray-500 font-mono tracking-widest">{note.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground italic">"{note.text}"</p>
                        
                        <div className="flex items-center gap-3 md:gap-4 mt-4 bg-black/60 rounded-2xl p-2 md:p-3 overflow-hidden">
                          <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#75fbd9] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Play className="w-3 h-3 md:w-4 md:h-4 text-black fill-black ml-0.5" />
                          </button>
                          <div className="flex-1 flex items-center gap-0.5 md:gap-1 h-4 md:h-6 opacity-50 overflow-hidden">
                            {[...Array(16)].map((_, i) => <div key={i} className="flex-1 min-w-[3px] bg-[#75fbd9] rounded-full" style={{height: `${Math.max(15, ((i * 37) % 80) + 20)}%`}} />)}
                          </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
          </motion.div>
        )}

        {/* Overview Content (Post Match) */}
        {matchState === 'postmatch' && matchInfo?.status === 'finished' && activeTab === 'OVERVIEW' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12 px-4 md:px-0"
          >
          
            {/* SEASON IMPACT */}
            <section className="mt-4 mb-8 border border-border bg-card rounded-2xl p-4 md:p-6 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-teal to-transparent opacity-30" />
              <h2 className="text-lg md:text-xl font-black tracking-tighter uppercase mb-4 text-center text-foreground">Season Impact</h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                {/* Team 1 */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left bg-muted/30 border border-border rounded-2xl p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#75fbd9]/5 to-transparent pointer-events-none" />
                  <div className="flex items-center gap-2 mb-3 w-full justify-center md:justify-start">
                    <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"} className="w-6 h-6 object-contain" />
                    <span className="font-black text-base uppercase tracking-wider">{matchInfo?.team1 || 'Team A'}</span>
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-2xl font-black tabular-nums">2nd</span>
                    <span className="text-xs text-muted-foreground font-bold mb-1">(↑1)</span>
                    <span className="text-xs font-black text-[#75fbd9] bg-[#75fbd9]/10 px-2 py-0.5 rounded border border-[#75fbd9]/20 mb-1">+3 pts</span>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Form</span>
                      <span className="text-xs font-mono font-bold tracking-widest">W-W-W-D-W-W</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Insight</span>
                      <span className="text-xs font-medium text-gray-300">Strengthens title push</span>
                    </div>
                  </div>
                </div>

                {/* Team 2 */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left bg-muted/30 border border-border rounded-2xl p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F50]/5 to-transparent pointer-events-none" />
                  <div className="flex items-center gap-2 mb-3 w-full justify-center md:justify-start">
                    <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"} className="w-6 h-6 object-contain" />
                    <span className="font-black text-base uppercase tracking-wider">{matchInfo?.team2 || 'Team B'}</span>
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-2xl font-black tabular-nums">8th</span>
                    <span className="text-xs text-muted-foreground font-bold mb-1">(↓1)</span>
                    <span className="text-xs font-black text-[#FF7F50] bg-[#FF7F50]/10 px-2 py-0.5 rounded border border-[#FF7F50]/20 mb-1">+0 pts</span>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Form</span>
                      <span className="text-xs font-mono font-bold tracking-widest text-muted-foreground">L-D-L-W-L-L</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Insight</span>
                      <span className="text-xs font-medium text-gray-300">Drifting from top 4</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          {/* FANS HAVE SPOKEN - MVP & FAN XI */}
          <section className="relative w-full rounded-2xl overflow-hidden border border-border shadow-[0_30px_60px_rgba(0,0,0,0.8)] mt-12 mb-16 group">
            {/* Dark Cinematic Background */}
            <div className="absolute inset-0 bg-[#020202] z-0" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee12523b1c4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay z-0" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#75fbd9]/30 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#75fbd9]/30 to-transparent opacity-50" />

            <div className="relative z-10 p-6 md:p-16 flex flex-col items-center">
              
              {/* Premium Header */}
              <div className="flex flex-col items-center mb-12 md:mb-16 relative w-full mt-4 md:mt-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-24 md:h-32 bg-[#75fbd9]/20 blur-[80px] pointer-events-none" />
                <h2 className="text-3xl md:text-6xl font-black text-center tracking-tighter uppercase leading-[0.9] drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                  The Fans Have <br/>
                  <span className="text-[#75fbd9] drop-shadow-[0_0_20px_rgba(117, 251, 217,0.6)]">Spoken.</span>
                </h2>
              </div>

              {/* Score Pill */}
              <div className="bg-black/60 backdrop-blur-xl border border-border rounded-full px-6 py-2 md:px-8 md:py-3 flex items-center gap-4 md:gap-6 mb-16 md:mb-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-[#4FC3F7]/10 to-[#FF7F50]/10" />
                 <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"} className="w-6 h-6 md:w-8 md:h-8 object-contain relative z-10 drop-shadow-md" />
                 <span className="text-2xl md:text-3xl font-black tracking-widest text-foreground relative z-10 font-mono">1 - 2</span>
                 <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"} className="w-6 h-6 md:w-8 md:h-8 object-contain relative z-10 drop-shadow-md" />
              </div>

              {/* MVP SHOWCASE */}
              <div className="w-full max-w-lg mx-auto flex flex-col items-center relative mb-12">
                {/* Massive Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-[#75fbd9]/20 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative">
                  {/* Rotating Rings */}
                  <div className="absolute -inset-4 md:-inset-6 border-2 border-dashed border-[#75fbd9]/30 rounded-full animate-[spin_12s_linear_infinite]" />
                  <div className="absolute -inset-8 md:-inset-10 border border-[#75fbd9]/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                  
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full p-1 md:p-1.5 bg-gradient-to-br from-[#75fbd9] via-[#75fbd9]/20 to-transparent shadow-[0_0_50px_rgba(117, 251, 217,0.3)] relative z-10">
                     <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop" className="w-full h-full rounded-full object-cover border-4 border-[#020202]" />
                  </div>
                  
                  <div className="absolute -top-3 -right-4 md:-top-4 md:-right-6 bg-gradient-to-r from-[#75fbd9] to-[#00B4D8] text-[#020202] text-[10px] md:text-xs font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(117, 251, 217,0.4)] z-20 border border-[#020202] transform rotate-6">
                    MVP
                  </div>
                  
                  <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-[#020202] text-[#75fbd9] text-lg md:text-xl font-black px-4 py-1.5 md:px-5 md:py-2 rounded-2xl border border-[#75fbd9]/50 shadow-[0_10px_30px_rgba(117, 251, 217,0.3)] z-20 font-mono transform -rotate-3">
                    9.2
                  </div>
                  
                  {/* Name Overlaid without taking extra vertical space */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-border z-20 shadow-xl">
                    <span className="text-[10px] md:text-xs font-bold text-foreground uppercase tracking-widest whitespace-nowrap">Mo Salah</span>
                  </div>
                </div>
              </div>

              {/* COMBINED FAN XI */}
              <div className="w-full max-w-3xl relative flex flex-col items-center bg-[#080808]/80 backdrop-blur-xl border border-border rounded-2xl py-12 md:py-16 px-2 md:px-8 shadow-2xl mt-12 md:mt-16">
                 
                 {/* Header Line */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020202] px-4 md:px-6 border border-border rounded-full whitespace-nowrap">
                   <span className="text-[10px] md:text-xs text-muted-foreground font-black tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white">Combined Fan XI</span>
                 </div>

                 {/* Subtle Pitch Lines */}
                 <div className="absolute inset-4 md:inset-8 border-2 border-border rounded-2xl pointer-events-none" />
                 <div className="absolute top-4 md:top-8 bottom-4 md:bottom-8 left-1/2 w-0.5 bg-muted -translate-x-1/2 pointer-events-none" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border-2 border-border rounded-full pointer-events-none" />

                 <div className="w-full relative flex flex-col gap-12 md:gap-20 items-center z-10 mt-6 md:mt-8">
                    {/* GK */}
                    <div className="flex justify-center w-full">
                      <div className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-border bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                          <div className="w-4 h-4 md:w-6 md:h-6 bg-muted/80 rounded-full absolute top-2 md:top-4" />
                          <div className="w-8 h-6 md:w-12 md:h-10 bg-muted/80 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                        </div>
                        <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-foreground transition-colors">Alisson</span>
                      </div>
                    </div>

                    {/* DEFs (3) */}
                    <div className="flex justify-between w-[90%] md:w-[85%]">
                      {['Gvardiol', 'Van Dijk', 'Trent'].map(player => (
                        <div key={player} className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-border bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                            <div className="w-4 h-4 md:w-6 md:h-6 bg-muted/80 rounded-full absolute top-2 md:top-4" />
                            <div className="w-8 h-6 md:w-12 md:h-10 bg-muted/80 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                          </div>
                          <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-foreground transition-colors">{player}</span>
                        </div>
                      ))}
                    </div>

                    {/* MIDs (4) */}
                    <div className="flex justify-between w-full px-2 md:px-4">
                      {['Mac Allister', 'De Bruyne', 'Foden', 'Doku'].map(player => (
                        <div key={player} className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-border bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                            <div className="w-4 h-4 md:w-6 md:h-6 bg-muted/80 rounded-full absolute top-2 md:top-4" />
                            <div className="w-8 h-6 md:w-12 md:h-10 bg-muted/80 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                          </div>
                          <span className="text-[8px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-foreground transition-colors whitespace-nowrap">{player}</span>
                        </div>
                      ))}
                    </div>

                    {/* FWDs (3) */}
                    <div className="flex justify-between w-[90%] md:w-[85%] relative">
                      <div className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-border bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                          <div className="w-4 h-4 md:w-6 md:h-6 bg-muted/80 rounded-full absolute top-2 md:top-4" />
                          <div className="w-8 h-6 md:w-12 md:h-10 bg-muted/80 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                        </div>
                        <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-foreground transition-colors">Diaz</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform relative">
                        <div className="absolute -inset-2 bg-[#75fbd9]/20 rounded-full blur-md" />
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-[#75fbd9] shadow-[0_0_20px_rgba(117, 251, 217,0.4)] p-0.5 md:p-1 bg-[#020202] relative z-10">
                          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <span className="text-[9px] md:text-xs font-black text-[#75fbd9] uppercase tracking-widest drop-shadow-md mt-0.5 md:mt-1">Salah</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-border bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md flex flex-col items-center justify-end overflow-hidden shadow-inner relative">
                          <div className="w-4 h-4 md:w-6 md:h-6 bg-muted/80 rounded-full absolute top-2 md:top-4" />
                          <div className="w-8 h-6 md:w-12 md:h-10 bg-muted/80 rounded-t-[20px] absolute -bottom-1 md:-bottom-2" />
                        </div>
                        <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-foreground transition-colors">Haaland</span>
                      </div>
                    </div>
                 </div>
              </div>
              
              {/* Floating Action Button */}
              <button className="hidden md:flex absolute top-12 right-12 w-14 h-14 bg-muted hover:bg-[#222] rounded-full items-center justify-center shadow-2xl transition-all border border-border group cursor-pointer z-50">
                 <Share className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              </button>
            </div>
          </section>

          {/* AGENDA SETTLEMENT ENGINE & FINAL DAMAGE REPORT */}
          <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
             {/* Final Damage Report / Narrative Curve */}
             <div className="bg-card text-card-foreground border border-border rounded-2xl p-6 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#75fbd9]/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div>
                   <h3 className="text-[10px] font-black tracking-widest text-[#75fbd9] uppercase mb-2 flex items-center gap-2">
                     <Activity className="w-3.5 h-3.5" /> Match Narrative Curve
                   </h3>
                   <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight mb-8">
                     Final Damage Report
                   </h2>
                </div>
                
                {/* Static Narrative Curve Mockup */}
                <div className="w-full h-32 md:h-48 relative border-b border-l border-border flex items-end justify-between px-2 pb-1 mb-6 ml-6 md:ml-8 mt-6">
                   <span className="absolute -left-6 md:-left-8 top-0 text-[8px] text-gray-500 font-bold uppercase tracking-widest -rotate-90 origin-left">Euphoria</span>
                   <span className="absolute -left-6 md:-left-8 bottom-4 text-[8px] text-gray-500 font-bold uppercase tracking-widest -rotate-90 origin-left">Despair</span>
                   
                   {/* Data Points (Bars) */}
                   {[
                     { h: '40%', c: 'bg-[#75fbd9]/20', t: '15\'' },
                     { h: '60%', c: 'bg-[#75fbd9]/40', t: '30\'' },
                     { h: '30%', c: 'bg-coral/40', t: 'HT' },
                     { h: '20%', c: 'bg-coral/80', t: '60\'' },
                     { h: '15%', c: 'bg-[#D32F2F]', t: '75\'' },
                     { h: '85%', c: 'bg-[#75fbd9]/80', t: 'FT' },
                   ].map((bar, i) => (
                     <div key={i} className="flex flex-col items-center gap-2 w-8 md:w-12 group">
                        <div className={`w-full ${bar.c} rounded-t-sm transition-all group-hover:brightness-150`} style={{ height: bar.h }} />
                        <span className="text-[8px] md:text-[10px] text-gray-500 font-bold">{bar.t}</span>
                     </div>
                   ))}

                   {/* Connecting Line Mock */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <polyline points="5,60 22,40 40,70 58,80 75,85 92,15" fill="none" stroke="rgba(117, 251, 217, 0.4)" strokeWidth="1" strokeDasharray="4 2" />
                   </svg>
                </div>

                {/* Sustained Sentiment Crash */}
                <div className="bg-muted text-muted-foreground border border-[#D32F2F]/20 rounded-2xl p-4 flex items-center justify-between shadow-inner">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Sustained Sentiment Crash</span>
                      <span className="text-sm font-black text-foreground">Man City Post-Match Velocity</span>
                   </div>
                   <div className="bg-[#D32F2F]/20 text-[#FF3B00] px-3 py-1.5 rounded-2xl text-sm font-black animate-pulse flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> -18% Spiking
                   </div>
                </div>
             </div>

             {/* Agenda Settlement Checklist */}
             <div className="bg-card text-card-foreground border border-border rounded-2xl p-6 lg:p-10 shadow-2xl relative">
                <h3 className="text-[10px] font-black tracking-widest text-[#75fbd9] uppercase mb-2 flex items-center gap-2">
                   <Target className="w-3.5 h-3.5" /> Autopsy
                </h3>
                <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight mb-8">
                   Agenda Settlements
                </h2>

                <div className="flex flex-col gap-4">
                   {((matchInfo as any)?.hotTakes || [
                     { state: 'debunked', text: 'Man City Midfield Capitulation', sub: 'Rodri completed 92% of passes under pressure.' },
                     { state: 'proven', text: 'Tactical Shift', sub: 'Diaz\'s entry forced Walker deeper, breaking City\'s high press structure.' },
                     { state: 'proven', text: 'The Midfield Battle', sub: 'Mac Allister won 82% of ground duels, sparking sub-4-second transitions.' },
                     { state: 'proven', text: 'Haaland Nullified', sub: 'Van Dijk restricted Haaland to a season-low 14 touches.' },
                     { state: 'debunked', text: 'xG Overperformance', sub: 'Liverpool converted 1.2 xG into 2 goals against the run of play.' }
                   ]).map((agenda: any, i: number) => (
                      <div key={i} className={`p-4 rounded-2xl border ${agenda.state === 'proven' ? 'bg-[#75fbd9]/5 border-[#75fbd9]/20' : 'bg-coral/5 border-coral/20'} flex gap-4 items-start`}>
                         <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${agenda.state === 'proven' ? 'bg-[#75fbd9]/20 text-[#75fbd9]' : 'bg-coral/20 text-coral'}`}>
                            {agenda.state === 'proven' ? '✓' : '✗'}
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] font-black tracking-widest uppercase mb-1">
                               {agenda.state === 'proven' ? <span className="text-[#75fbd9]">AGENDA PROVEN</span> : <span className="text-coral">AGENDA DEBUNKED</span>}
                            </span>
                            <span className="text-sm font-bold text-foreground mb-1">{agenda.text}</span>
                            <span className="text-[10px] text-muted-foreground font-medium leading-relaxed">{agenda.sub}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Hot Takes */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black tracking-widest text-foreground uppercase flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#FF3B00]" /> HOT TAKES
              </h2>
              <button className="text-[10px] text-muted-foreground font-bold hover:text-foreground transition-colors uppercase tracking-widest">See all</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {takes.map((take) => (
                <div key={take.id} className="bg-card text-card-foreground border border-border rounded-2xl p-6 flex flex-col hover:border-border-strong transition-all">
                  <h3 className="text-sm font-black text-foreground mb-6 leading-relaxed">{take.question}</h3>
                  <div className="space-y-4 mb-6 flex-1">
                    {take.options.map((opt, i) => (
                      <div 
                        key={i}
                        onClick={() => handleVote(take.id, i)}
                        className={`group ${votedTakes[take.id] ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className={`${votedTakes[take.id] ? '' : 'group-hover:text-foreground transition-colors'} ${opt.percent > 50 ? 'text-foreground' : 'text-muted-foreground'}`}>{opt.text}</span>
                          <span className={opt.percent > 50 ? 'text-foreground' : 'text-gray-500'}>{opt.percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${opt.color}`} style={{ width: `${opt.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border flex items-center gap-2">
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
      {matchState === 'postmatch' && activeTab === 'ROSTER' && (
        <motion.div 
          key="roster"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-12 px-4 md:px-0"
        >
          {/* Pitch View Roster */}
          <section className="mt-4">
            <div className="w-full max-w-5xl mx-auto flex flex-col">
              {/* MOBILE / TABLET PITCH (Vertical) */}
              <div className="xl:hidden w-full relative bg-[#09150E] rounded-t-[24px] overflow-hidden min-h-[600px] md:min-h-[800px] border border-border border-b-0">
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
                  <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"} className="w-full h-full object-contain" />
                </div>
                <div className="absolute bottom-8 right-8 w-16 h-16 opacity-30 pointer-events-none drop-shadow-xl">
                  <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"} className="w-full h-full object-contain" />
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
                         <div className={`absolute -bottom-2 -right-2 text-[10px] font-black px-1.5 py-0.5 rounded-md border bg-black text-foreground ${isHighRating ? 'border-[#FF7F50]' : 'border-border-strong'}`}>
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
              <div className="hidden xl:block w-full relative bg-[#09150E] rounded-t-[24px] overflow-hidden h-[500px] border border-border border-b-0">
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
                  <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"} className="w-full h-full object-contain" />
                </div>
                <div className="absolute top-1/2 right-24 -translate-y-1/2 w-32 h-32 opacity-20 pointer-events-none drop-shadow-xl">
                  <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"} className="w-full h-full object-contain" />
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
                         <div className={`absolute -bottom-2 -right-2 text-[10px] font-black px-1.5 py-0.5 rounded-md border bg-black text-foreground ${isHighRating ? 'border-[#FF7F50]' : 'border-border-strong'}`}>
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
              <div className="flex flex-col md:flex-row justify-between items-center bg-card text-card-foreground border-t border-border p-4 rounded-b-[24px] gap-4 w-full mt-4 md:mt-0 relative z-20">
                {/* Left side (MCI) */}
                <div className="flex items-center gap-2 w-full">
                  <div className="w-1 h-4 bg-[#4FC3F7]" />
                  <div className="flex gap-1.5">
                    {subsMCI.map(sub => (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-border shrink-0 group cursor-pointer" key={sub.name} title={sub.name}>
                        <img src={sub.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full border border-border bg-black/20 shrink-0" />
                    <div className="w-6 h-6 rounded-full border border-border bg-black/20 shrink-0" />
                    <div className="w-6 h-6 rounded-full border border-border bg-black/20 shrink-0" />
                  </div>
                </div>

                {/* Right side (LIV) */}
                <div className="flex items-center justify-end gap-2 w-full">
                  <div className="flex gap-1.5">
                    <div className="w-6 h-6 rounded-full border border-border bg-black/20 shrink-0" />
                    <div className="w-6 h-6 rounded-full border border-border bg-black/20 shrink-0" />
                    <div className="w-6 h-6 rounded-full border border-border bg-black/20 shrink-0" />
                    {subsLIV.map(sub => (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-border shrink-0 group cursor-pointer" key={sub.name} title={sub.name}>
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
          className="w-full max-w-3xl mx-auto space-y-12 px-4 md:px-0"
        >
          <div className="relative border-l-2 border-border ml-6 md:ml-1/2 md:border-none">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-muted/80 -translate-x-1/2"></div>
            
            {timelineEvents.map((event: any, index: number) => {
              const isTeam1 = event.team === matchInfo?.team1 || event.team === 'LIV';
              return (
                <div key={event.id} className={`relative flex items-center mb-8 ${isTeam1 ? 'md:flex-row-reverse' : 'md:flex-row'} pl-6 md:pl-0`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[#020202] border-2 z-10" style={{ borderColor: isTeam1 ? '#FF7F50' : '#4FC3F7' }}></div>
                  
                  {/* Content Box */}
                  <div className={`md:w-1/2 ${isTeam1 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} w-full`}>
                    <div className="bg-card text-card-foreground border border-border p-4 rounded-2xl hover:bg-muted transition-colors relative group">
                      {/* Event Icon */}
                      <div className={`absolute top-4 ${isTeam1 ? 'right-4 md:left-4 md:right-auto' : 'right-4'} text-xl opacity-50 group-hover:opacity-100 transition-opacity`}>
                        {event.type === 'goal' && '⚽'}
                        {event.type === 'yellow' && '🟨'}
                        {event.type === 'sub' && '🔄'}
                      </div>
                      
                      <div className="text-[#75fbd9] font-black text-xs tracking-widest mb-1">{event.time}</div>
                      <div className="text-lg font-black text-foreground mb-1">
                        {event.type === 'sub' ? `${event.playerIn} In / ${event.playerOut} Out` : event.player}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium leading-relaxed">{event.detail}</div>
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
          className="w-full max-w-4xl mx-auto relative group px-4 md:px-0"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#75fbd9]/5 to-transparent rounded-2xl blur-3xl -z-10 group-hover:from-[#75fbd9]/10 transition-colors duration-1000"></div>
          
          <div className="bg-gradient-to-b from-[#111111]/90 to-[#050505]/95 backdrop-blur-2xl border border-border rounded-2xl p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7F50] via-white/20 to-[#4FC3F7]"></div>

            <div className="flex justify-between items-center mb-12 pb-8 border-b border-border">
               <div className="flex items-center gap-4 md:gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FF7F50] blur-xl opacity-30 rounded-full"></div>
                    <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"} className="w-12 h-12 md:w-20 md:h-20 object-contain relative z-10 drop-shadow-2xl" />
                  </div>
                  <span className="text-2xl md:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">LIV</span>
               </div>
               <div className="flex flex-col items-center">
                 <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-gray-500 uppercase">Match Stats</span>
                 <div className="w-8 h-1 bg-muted/80 rounded-full mt-2"></div>
               </div>
               <div className="flex items-center gap-4 md:gap-6">
                  <span className="text-2xl md:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-gray-400 to-white">MCI</span>
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#4FC3F7] blur-xl opacity-30 rounded-full"></div>
                    <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"} className="w-12 h-12 md:w-20 md:h-20 object-contain relative z-10 drop-shadow-2xl" />
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
                      <span className="text-xl md:text-2xl font-black text-foreground drop-shadow-md">
                        {stat.liv}{stat.type === 'percent' ? <span className="text-sm text-muted-foreground">%</span> : ''}
                      </span>
                      <span className="text-muted-foreground uppercase tracking-widest text-[10px] md:text-xs font-bold group-hover/stat:text-foreground transition-colors">{stat.label}</span>
                      <span className="text-xl md:text-2xl font-black text-foreground drop-shadow-md">
                        {stat.mci}{stat.type === 'percent' ? <span className="text-sm text-muted-foreground">%</span> : ''}
                      </span>
                    </div>
                    <div className="flex w-full h-3 md:h-4 rounded-full overflow-hidden bg-black/50 border border-border gap-1.5 shadow-inner">
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
    </div>
  );
}

// ---------------------------------------------------------
// Pre-Match Tab Components
// ---------------------------------------------------------

function PlayerStatsModal({ player, onClose }: { player: any, onClose: () => void }) {
  if (!player) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
         {/* Cover / Header */}
         <div className={`h-32 relative flex items-end p-5 ${player.team === 'LIV' ? 'bg-gradient-to-tr from-[#C8102E]/40 to-transparent' : 'bg-gradient-to-tr from-[#6CABDD]/40 to-transparent'}`}>
            <div className="absolute inset-0 bg-black/20" />
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md transition-colors z-20">
               <span className="text-white text-xs font-bold">✕</span>
            </button>
            
            <div className="relative z-10 flex items-center gap-4">
               <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-black">
                 <img src={player.img} alt={player.name} className="w-full h-full object-cover" />
               </div>
               <div>
                 <h2 className="text-xl font-black text-white tracking-widest">{player.name}</h2>
                 <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">{player.team} • {player.pos || 'Player'}</p>
               </div>
            </div>
         </div>

         {/* Stats Grid */}
         <div className="p-5 bg-[#0a0a0a]">
            <h3 className="text-[10px] font-black text-white/40 tracking-widest uppercase mb-4">Season Performance</h3>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center justify-center border border-white/5">
                 <span className="text-2xl font-black text-white mb-0.5">{player.goals || Math.floor(Math.random() * 15)}</span>
                 <span className="text-[8px] text-white/50 uppercase tracking-widest">Goals</span>
              </div>
              <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center justify-center border border-white/5">
                 <span className="text-2xl font-black text-white mb-0.5">{player.assists || Math.floor(Math.random() * 10)}</span>
                 <span className="text-[8px] text-white/50 uppercase tracking-widest">Assists</span>
              </div>
              <div className="bg-white/5 rounded-2xl p-3 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[coral]/10" />
                 <span className="text-2xl font-black text-[coral] mb-0.5 relative z-10">{player.rating || (7 + Math.random() * 2).toFixed(1)}</span>
                 <span className="text-[8px] text-[coral]/70 uppercase tracking-widest relative z-10">Rating</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-white/60 mb-1.5 uppercase tracking-wider">
                  <span>Pass Accuracy</span>
                  <span className="text-[#75fbd9]">{player.passAcc || Math.floor(80 + Math.random() * 15)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#75fbd9] rounded-full shadow-[0_0_10px_rgba(117,251,217,0.5)]" style={{ width: `${player.passAcc || Math.floor(80 + Math.random() * 15)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold text-white/60 mb-1.5 uppercase tracking-wider">
                  <span>Shot Conversion</span>
                  <span className="text-white">{player.shotConv || Math.floor(10 + Math.random() * 20)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white/40 rounded-full" style={{ width: `${player.shotConv || Math.floor(10 + Math.random() * 20)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold text-white/60 mb-1.5 uppercase tracking-wider">
                  <span>Duel Success</span>
                  <span className="text-white">{player.duelSucc || Math.floor(50 + Math.random() * 30)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white/40 rounded-full" style={{ width: `${player.duelSucc || Math.floor(50 + Math.random() * 30)}%` }} />
                </div>
              </div>
            </div>
         </div>
      </motion.div>
    </div>
  );
}

function LineupTab({ matchInfo }: { matchInfo: any }) {
  const [vibe, setVibe] = useState(80);
  const [tactical, setTactical] = useState(45);
  const [hasVotedAs, setHasVotedAs] = useState<'fan' | 'neutral' | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

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
         <div className="relative w-full h-[700px] bg-[#070e0a] rounded-t-2xl border border-border border-b-0 overflow-hidden pt-2">
            {/* Team Logos */}
            <div className="absolute top-4 left-4 font-black text-foreground/20 text-xl tracking-tighter flex items-center gap-2">
              <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"} className="w-6 h-6 opacity-40 grayscale brightness-200" alt="" />
              MCI
            </div>
            <div className="absolute bottom-4 right-4 font-black text-foreground/20 text-xl tracking-tighter flex items-center gap-2">
              <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"} className="w-5 h-6 opacity-40 grayscale brightness-200" alt="" />
              LIV
            </div>

            {/* Pitch Markings */}
            <div className="absolute inset-4 border border-green-900/30 rounded-2xl" />
            <div className="absolute left-1/2 -translate-x-1/2 top-4 w-40 h-20 border border-t-0 border-green-900/30 rounded-b-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 top-4 w-20 h-8 border border-t-0 border-green-900/30 rounded-b-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-40 h-20 border border-b-0 border-green-900/30 rounded-t-lg" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-20 h-8 border border-b-0 border-green-900/30 rounded-t-lg" />
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 h-px bg-green-900/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-green-900/30" />

            {/* MCI Players */}
            {mciPlayers.map((p, i) => (
              <div 
                key={i} 
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 z-10 group" 
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onClick={() => setSelectedPlayer({...p, team: 'MCI', img: `https://i.pravatar.cc/100?img=${i+10}`, pos: p.y < 20 ? 'Defender' : p.y > 30 ? 'Forward' : 'Midfielder'})}
              >
                 <div className={`w-10 h-10 rounded-2xl ${p.glow ? 'border-2 border-[#75fbd9] shadow-[0_0_15px_rgba(117, 251, 217,0.6)]' : 'border border-border-strong'} overflow-hidden mb-1 relative bg-card text-card-foreground group-hover:border-white transition-colors`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt={p.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100" />
                 </div>
                 <span className="text-[9px] font-black tracking-wider text-[#75fbd9] drop-shadow-md bg-black/60 px-1 rounded-sm">{p.name}</span>
              </div>
            ))}

            {/* LIV Players */}
            {livPlayers.map((p, i) => (
              <div 
                key={i} 
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 z-10 group" 
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onClick={() => setSelectedPlayer({...p, team: 'LIV', img: `https://i.pravatar.cc/100?img=${i+30}`, pos: p.y > 80 ? 'Defender' : p.y < 70 ? 'Forward' : 'Midfielder'})}
              >
                 <div className={`w-10 h-10 rounded-2xl ${p.glow ? 'border-2 border-[#FF7F50] shadow-[0_0_15px_rgba(255,79,0,0.6)]' : 'border border-border-strong'} overflow-hidden mb-1 relative bg-card text-card-foreground group-hover:border-white transition-colors`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt={p.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100" />
                 </div>
                 <span className="text-[9px] font-black tracking-wider text-[#FF7F50] drop-shadow-md bg-black/60 px-1 rounded-sm">{p.name}</span>
              </div>
            ))}
         </div>

         {/* Bench */}
         <div className="w-full bg-[#1A1A1A] rounded-b-2xl p-4 border border-border border-t-0 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-[#75fbd9]" />
              <div className="flex gap-1.5">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-border"><img src="https://i.pravatar.cc/100?img=1" className="w-full h-full object-cover"/></div>
                <div className="w-6 h-6 rounded-full overflow-hidden border border-border"><img src="https://i.pravatar.cc/100?img=2" className="w-full h-full object-cover"/></div>
                <div className="w-6 h-6 rounded-full border border-border bg-black/20" />
                <div className="w-6 h-6 rounded-full border border-border bg-black/20" />
                <div className="w-6 h-6 rounded-full border border-border bg-black/20" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="flex gap-1.5">
                <div className="w-6 h-6 rounded-full border border-border bg-black/20" />
                <div className="w-6 h-6 rounded-full border border-border bg-black/20" />
                <div className="w-6 h-6 rounded-full border border-border bg-black/20" />
                <div className="w-6 h-6 rounded-full overflow-hidden border border-border"><img src="https://i.pravatar.cc/100?img=3" className="w-full h-full object-cover"/></div>
                <div className="w-6 h-6 rounded-full overflow-hidden border border-border"><img src="https://i.pravatar.cc/100?img=4" className="w-full h-full object-cover"/></div>
              </div>
              <div className="w-1 h-4 bg-[#FF7F50]" />
            </div>
         </div>
      </div>

      <AnimatePresence>
        {selectedPlayer && (
          <PlayerStatsModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
        )}
      </AnimatePresence>

      {/* Lineup Confidence */}
      <div>
         <h3 className="text-[10px] font-black tracking-widest text-gray-500 mb-6 uppercase">LINEUP CONFIDENCE</h3>
         
         <div className="mb-8">
           <div className="flex justify-between items-end mb-3">
             <div className="flex items-center gap-2">
               <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"} className="w-5 h-5" alt=""/>
               <span className="text-[10px] font-black uppercase">YOUR VIBE <span className="text-muted-foreground">(MCI FANS)</span></span>
             </div>
             {hasVotedAs === 'neutral' ? (
               <div className="flex items-center gap-1.5">
                 <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">LOCKED</span>
                 <div className="w-3 h-3 border border-gray-600 rounded-sm flex flex-col items-center justify-center text-[6px] text-gray-500">🔒</div>
               </div>
             ) : (
               <span className="text-[10px] font-black text-[#75fbd9] tracking-widest">{vibe >= 50 ? 'FEELING GOOD' : 'WORRIED'}</span>
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
             disabled={hasVotedAs === 'neutral' || matchInfo?.status === 'finished'}
             className={`w-full h-1 bg-muted/80 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#75fbd9] [&::-webkit-slider-thumb]:rounded-full ${hasVotedAs === 'neutral' || matchInfo?.status === 'finished' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
           />
         </div>

         <div className="mb-10">
           <div className="flex justify-between items-end mb-3">
             <div className="flex items-center gap-2">
               <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"} className="w-4 h-5" alt=""/>
               <span className="text-[10px] font-black uppercase text-muted-foreground">{(matchInfo?.team1?.toUpperCase() || "LIVERPOOL") + " FANS"}</span>
             </div>
             <div className="flex items-center gap-1.5">
               <span className="text-[10px] font-black text-[#D32F2F] tracking-widest">42% WORRIED</span>
               <div className="w-3 h-3 border border-gray-600 rounded-sm flex flex-col items-center justify-center text-[6px] text-gray-500">🔒</div>
             </div>
           </div>
           <div className="w-full h-1 bg-muted/80 rounded-full">
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
               <span className="text-[10px] font-black text-[#75fbd9] tracking-widest">{tactical >= 50 ? 'LIV EDGE' : 'MCI EDGE'}</span>
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
             className={`w-full h-1 bg-muted/80 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#75fbd9] [&::-webkit-slider-thumb]:rounded-full ${hasVotedAs === 'fan' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
           />
         </div>
      </div>
    </div>
  );
}

function SeasonContextTab({ matchInfo }: { matchInfo: any }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-card border border-border rounded-2xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
        <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-4 md:gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#75fbd9] mb-1">League Position</span>
            <div className="text-sm font-black flex items-center gap-2 text-foreground">
              <span className="font-mono tabular-nums">4th</span>
              <span className="text-muted-foreground text-[10px]">vs</span>
              <span className="font-mono tabular-nums">7th</span>
            </div>
          </div>
          <div className="w-px h-8 bg-border hidden md:block"></div>
          <div className="flex flex-col items-center md:items-start text-right md:text-left">
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Gap</span>
            <span className="text-sm font-black text-foreground font-mono tabular-nums">5 pts</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center w-full md:w-auto py-4 md:py-0 border-y border-border md:border-y-0">
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Recent Form</span>
          <div className="flex items-center justify-center gap-1 md:gap-2 text-[10px] font-black uppercase font-mono">
            <span className="text-[#75fbd9] drop-shadow-[0_0_8px_rgba(117, 251, 217,0.5)]">W</span>-
            <span className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">D</span>-
            <span className="text-[#75fbd9] drop-shadow-[0_0_8px_rgba(117, 251, 217,0.5)]">W</span>-
            <span className="text-coral drop-shadow-[0_0_8px_rgba(255,127,80,0.5)]">L</span>-
            <span className="text-[#75fbd9] drop-shadow-[0_0_8px_rgba(117, 251, 217,0.5)]">W</span>
            <span className="text-muted-foreground mx-2 text-[9px]">vs</span>
            <span className="text-coral drop-shadow-[0_0_8px_rgba(255,127,80,0.5)]">L</span>-
            <span className="text-[#75fbd9] drop-shadow-[0_0_8px_rgba(117, 251, 217,0.5)]">W</span>-
            <span className="text-coral drop-shadow-[0_0_8px_rgba(255,127,80,0.5)]">L</span>-
            <span className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">D</span>-
            <span className="text-[#75fbd9] drop-shadow-[0_0_8px_rgba(117, 251, 217,0.5)]">W</span>
          </div>
        </div>
        
        <div className="flex w-full md:w-auto items-center justify-center md:justify-end">
          <div className="flex flex-col items-center md:items-end">
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Last Meeting</span>
            <span className="text-xs font-black text-foreground">{matchInfo?.team1 || 'Team A'} won <span className="text-[#75fbd9] font-mono tabular-nums">(2-1)</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function H2HTab({ matchInfo }: { matchInfo: any }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-card text-card-foreground rounded-2xl p-6 border border-border">
        <h3 className="text-[10px] font-black text-center text-muted-foreground tracking-widest mb-6">LAST 5 MEETINGS</h3>
        
        <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-[#4FC3F7] mb-2" />
               <span className="text-[10px] font-bold">{matchInfo?.team2?.toUpperCase() || "MAN CITY"}</span>
            </div>
            <div className="flex gap-6 text-center">
               <div><div className="text-2xl font-black text-[#75fbd9]">3</div><div className="text-[8px] text-[#75fbd9] tracking-widest">WINS</div></div>
               <div><div className="text-2xl font-black text-foreground">1</div><div className="text-[8px] text-muted-foreground tracking-widest">DRAW</div></div>
               <div><div className="text-2xl font-black text-[#D32F2F]">1</div><div className="text-[8px] text-[#D32F2F] tracking-widest">WIN</div></div>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-[#D32F2F] mb-2" />
               <span className="text-[10px] font-bold">{matchInfo?.team1?.toUpperCase() || "LIVERPOOL"}</span>
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
             <div key={i} className="flex items-center justify-between text-xs border-b border-border pb-2 last:border-0">
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

function StandingsTab({ matchInfo }: { matchInfo: any }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-card text-card-foreground rounded-2xl p-4 border border-border overflow-x-auto hide-scrollbar">
         <div className="text-[9px] font-black text-gray-500 tracking-widest uppercase mb-4 px-2">Premier League</div>
         <table className="w-full text-xs text-left">
           <thead>
             <tr className="text-[9px] text-gray-500 border-b border-border">
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
               { p: 3, t: "Arsenal", icon: "bg-coral", ply: 35, gd: "+29", pts: 68, hl: false },
               { p: 4, t: "Aston Villa", icon: "bg-purple-900", ply: 35, gd: "+20", pts: 66, hl: false },
               { p: 5, t: "Tottenham", icon: "bg-white", ply: 35, gd: "+13", pts: 60, hl: false },
             ].map((r, i) => (
               <tr key={i} className={`border-b border-border last:border-0 ${r.hl ? 'bg-[#75fbd9]/5' : ''}`}>
                 <td className={`py-3 text-center ${r.hl ? 'text-[#75fbd9] font-bold' : 'text-muted-foreground'}`}>{r.p}</td>
                 <td className="py-3 flex items-center gap-2">
                   <div className={`w-4 h-4 rounded-full ${r.icon}`} />
                   <span className={r.hl ? 'text-[#75fbd9] font-bold' : 'text-gray-200'}>{r.t}</span>
                 </td>
                 <td className="py-3 text-right text-muted-foreground">{r.ply}</td>
                 <td className="py-3 text-right text-muted-foreground">{r.gd}</td>
                 <td className={`py-3 text-right pr-2 font-bold ${r.hl ? 'text-[#75fbd9]' : 'text-foreground'}`}>{r.pts}</td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>
    </div>
  );
}

function FormTab({ matchInfo }: { matchInfo: any }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-card text-card-foreground rounded-2xl p-6 border border-border">
         <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-muted-foreground mb-3">{matchInfo?.team2?.toUpperCase() || "MAN CITY"}</span>
              <div className="flex gap-2">
                 {['W','W','W','D','W'].map((r,i) => (
                   <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${r==='W' ? 'bg-green-500/20 text-green-500' : r==='D' ? 'bg-gray-500/20 text-muted-foreground' : 'bg-coral/20 text-coral'}`}>{r}</div>
                 ))}
              </div>
              <div className="flex gap-4 mt-4 text-[10px] text-gray-500">
                <span>Last 5</span>
                <span>GF <strong className="text-foreground">14</strong></span>
                <span>GA <strong className="text-foreground">4</strong></span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase text-[#D32F2F] mb-3">{matchInfo?.team1?.toUpperCase() || "LIVERPOOL"}</span>
              <div className="flex gap-2">
                 {['W','W','L','W','D'].map((r,i) => (
                   <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${r==='W' ? 'bg-green-500/20 text-green-500' : r==='D' ? 'bg-gray-500/20 text-muted-foreground' : 'bg-coral/20 text-coral'}`}>{r}</div>
                 ))}
              </div>
              <div className="flex gap-4 mt-4 text-[10px] text-gray-500">
                <span>Last 5</span>
                <span>GF <strong className="text-foreground">9</strong></span>
                <span>GA <strong className="text-foreground">5</strong></span>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function KeyBattlesTab({ matchInfo }: { matchInfo: any }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="space-y-4">
         <div className="bg-card text-card-foreground border border-border rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold">Haaland</span>
                 <span className="text-[10px] text-gray-500">{matchInfo?.team2 || "Man City"}</span>
               </div>
            </div>
            <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-[8px] font-black text-gray-500">VS</div>
            <div className="flex items-center gap-3 text-right flex-row-reverse">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold">Van Dijk</span>
                 <span className="text-[10px] text-[#D32F2F]">{matchInfo?.team1 || "Liverpool"}</span>
               </div>
            </div>
         </div>

         <div className="bg-card text-card-foreground border border-border rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold">De Bruyne</span>
                 <span className="text-[10px] text-gray-500">{matchInfo?.team2 || "Man City"}</span>
               </div>
            </div>
            <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-[8px] font-black text-gray-500">VS</div>
            <div className="flex items-center gap-3 text-right flex-row-reverse">
               <div className="w-10 h-10 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold">Mac Allister</span>
                 <span className="text-[10px] text-[#D32F2F]">{matchInfo?.team1 || "Liverpool"}</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}


