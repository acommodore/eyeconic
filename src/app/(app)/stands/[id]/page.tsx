"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Mic, MicOff, Hand, Send, MoreHorizontal, Users, Flame, Zap, Loader2, MonitorPlay, ChevronDown, ChevronUp } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

export default function ActiveStandPage() {
  const [mutedUsers, setMutedUsers] = useState<Record<string, boolean>>({});
  const [floatingEmojis, setFloatingEmojis] = useState<{id: number, emoji: string, left: number}[]>([]);
  const [inputText, setInputText] = useState("");
  const [isMicPending, setIsMicPending] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      name: "Gooner4Life",
      color: "text-[#00E5FF]",
      avatar: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      time: "1m ago",
      text: "Absolute shocker from the VAR there. Clear penalty! We are being robbed in broad daylight.",
      isSpeaker: false
    },
    {
      id: 2,
      name: "BlueMason",
      color: "text-[#FF3B00]",
      avatar: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      time: "Just now",
      text: "Never a pen. He dove before the contact even happened. 🤡 Have some shame!",
      isSpeaker: false
    },
    {
      id: 3,
      name: "Spursy_10",
      color: "text-gray-300",
      avatar: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
      time: "Just now",
      text: "Host is completely biased as usual. Get him off the mic and let someone objective speak.",
      isSpeaker: false
    },
    {
      id: 4,
      name: "GunnerVic (Speaker)",
      color: "text-[#00C853]",
      avatar: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      time: "Just now",
      text: "Are you blind?! He clearly clipped his heel! Everyone in the stadium saw it.",
      isSpeaker: true
    }
  ]);

  const [pollVotes, setPollVotes] = useState({ yes: 780, no: 220 });
  const [hasVoted, setHasVoted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPollExpanded, setIsPollExpanded] = useState(false);

  const totalVotes = pollVotes.yes + pollVotes.no;
  const yesPercentage = Math.round((pollVotes.yes / totalVotes) * 100);
  const noPercentage = 100 - yesPercentage;

  const handleVote = (option: 'yes' | 'no') => {
    if (hasVoted) return;
    setPollVotes(prev => ({
      ...prev,
      [option]: prev[option] + 50
    }));
    setHasVoted(true);
  };

  const toggleMute = (username: string) => {
    setMutedUsers(prev => ({ ...prev, [username]: !prev[username] }));
  };

  const spawnEmoji = (emoji: string) => {
    const id = Date.now() + Math.random();
    setFloatingEmojis(prev => [...prev, { id, emoji, left: Math.random() * 80 + 10 }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 2500);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      name: "Maximus (You)",
      color: "text-[#FF7F50]",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus",
      time: "Just now",
      text: inputText.trim(),
      isSpeaker: false
    };

    setChatMessages(prev => [...prev, newMessage]);
    setInputText("");
  };

  const renderSpeakers = (isMediaMode: boolean) => {
    const speakerClass = isMediaMode 
      ? "relative w-14 h-14 xl:w-24 xl:h-24 md:w-32 md:h-32 shrink-0 rounded-lg xl:rounded-2xl" 
      : "relative aspect-square h-full md:w-full md:h-full md:aspect-auto shrink-0 min-h-0 rounded-xl";

    return (
      <>
        {/* Speaker 1: Active Talking */}
        <div className={`${speakerClass} overflow-hidden border-2 ${mutedUsers['GOONER4LIFE'] ? 'border-white/10' : 'border-[#FF3B00] shadow-[0_0_20px_rgba(255,59,0,0.4)]'} group cursor-pointer transition-all duration-500 hover:scale-[1.02]`} onClick={() => toggleMute('GOONER4LIFE')}>
          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${mutedUsers['GOONER4LIFE'] ? 'grayscale opacity-50' : 'opacity-100'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
          {!mutedUsers['GOONER4LIFE'] && <div className="absolute inset-0 border-2 border-[#FF3B00]/40 rounded-xl animate-pulse pointer-events-none" />}
          
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
            <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['GOONER4LIFE'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#FF3B00]/90 backdrop-blur shadow-[0_0_15px_rgba(255,59,0,0.5)]'} flex items-center justify-center`}>
              {mutedUsers['GOONER4LIFE'] ? <MicOff className="w-3 h-3 text-white" /> : <Mic className="w-3 h-3 text-black" />}
            </div>
          </div>
          
          <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
             <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${mutedUsers['GOONER4LIFE'] ? 'bg-red-500' : 'bg-[#FF3B00] animate-pulse'} shadow-lg`} />
             <span className={`text-[9px] md:text-sm font-black ${mutedUsers['GOONER4LIFE'] ? 'text-gray-300' : 'text-white'} drop-shadow-md truncate`}>GOONER4LIFE</span>
          </div>
        </div>

        {/* Speaker 2: Muted */}
        <div className={`${speakerClass} overflow-hidden border-2 ${mutedUsers['BLUEMASON'] ? 'border-white/10' : 'border-white/20 hover:border-white/40'} group cursor-pointer transition-all duration-500 hover:scale-[1.02]`} onClick={() => toggleMute('BLUEMASON')}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${mutedUsers['BLUEMASON'] ? 'grayscale opacity-50' : 'opacity-80 group-hover:opacity-100'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
          
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
            <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['BLUEMASON'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#222]/80 backdrop-blur border border-white/10'} flex items-center justify-center`}>
              <MicOff className={`w-3 h-3 ${mutedUsers['BLUEMASON'] ? 'text-white' : 'text-gray-400'}`} />
            </div>
          </div>
          
          <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
             <span className={`text-[9px] md:text-sm font-bold ${mutedUsers['BLUEMASON'] ? 'text-gray-400' : 'text-white'} drop-shadow-md truncate`}>BLUEMASON</span>
          </div>
        </div>

        {/* Speaker 3: Muted */}
        <div className={`${speakerClass} overflow-hidden border-2 ${mutedUsers['SPURSY_10'] ? 'border-white/10' : 'border-white/20 hover:border-white/40'} group cursor-pointer transition-all duration-500 hover:scale-[1.02]`} onClick={() => toggleMute('SPURSY_10')}>
          <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${mutedUsers['SPURSY_10'] ? 'grayscale opacity-50' : 'opacity-80 group-hover:opacity-100'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
            <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['SPURSY_10'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#222]/80 backdrop-blur border border-white/10'} flex items-center justify-center`}>
              <MicOff className={`w-3 h-3 ${mutedUsers['SPURSY_10'] ? 'text-white' : 'text-gray-400'}`} />
            </div>
          </div>
          
          <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
             <span className={`text-[9px] md:text-sm font-bold ${mutedUsers['SPURSY_10'] ? 'text-gray-400' : 'text-white'} drop-shadow-md truncate`}>SPURSY_10</span>
          </div>
        </div>

        {/* Speaker 4: Empty Slot */}
        <div className={`${speakerClass} border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center transition-colors hover:bg-white/10 cursor-pointer`}>
          <MoreHorizontal className="w-6 h-6 text-white/20" />
        </div>

        {/* Speaker 5: Active Mic, Non-Speaking */}
        <div className={`${speakerClass} overflow-hidden border-2 ${mutedUsers['GUNNERVIC'] ? 'border-white/10' : 'border-[#FF3B00] shadow-[0_0_20px_rgba(255,59,0,0.2)]'} group cursor-pointer transition-all duration-500 hover:scale-[1.02]`} onClick={() => toggleMute('GUNNERVIC')}>
          <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${mutedUsers['GUNNERVIC'] ? 'grayscale opacity-50' : 'opacity-100'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
            <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['GUNNERVIC'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#FF3B00]/90 backdrop-blur shadow-[0_0_15px_rgba(255,59,0,0.4)]'} flex items-center justify-center`}>
              {mutedUsers['GUNNERVIC'] ? <MicOff className="w-3 h-3 text-white" /> : <Mic className="w-3 h-3 text-black" />}
            </div>
          </div>
          
          <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
             <span className={`text-[9px] md:text-sm font-bold ${mutedUsers['GUNNERVIC'] ? 'text-gray-400' : 'text-white'} drop-shadow-md truncate`}>GUNNERVIC</span>
          </div>
        </div>

        {/* Speaker 6: Empty Slot */}
        <div className={`${speakerClass} border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center transition-colors hover:bg-white/10 cursor-pointer`}>
          <MoreHorizontal className="w-6 h-6 text-white/20" />
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto h-[calc(100dvh-9rem)] md:h-[100dvh] text-white flex flex-col xl:flex-row relative bg-[#020202] overflow-hidden">
      
      {/* Floating Animations CSS */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0px) scale(0.5); opacity: 0; }
          15% { transform: translateY(-50px) scale(1.5); opacity: 1; }
          100% { transform: translateY(-400px) scale(1); opacity: 0; }
        }
        .animate-float {
          animation: floatUp 2.5s ease-out forwards;
        }
      `}</style>

      {/* Floating Emojis Container */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingEmojis.map(item => (
          <div 
            key={item.id} 
            className="absolute bottom-32 text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-float"
            style={{ left: `${item.left}%` }}
          >
            {item.emoji}
          </div>
        ))}
      </div>
      
      {/* Left Pane: The Stage */}
      <div className="flex-none xl:flex-1 overflow-y-auto hide-scrollbar flex flex-col relative z-10 bg-[#050505] xl:p-8">
        
        {/* Info Section (Premium Header) */}
        <div className="px-3 py-2 md:px-6 md:py-4 relative overflow-hidden bg-white/5 border-b xl:border border-white/10 xl:rounded-2xl flex flex-col gap-2 shrink-0 backdrop-blur-md z-20">
          {/* Subtle glowing orbs behind the header */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00E5FF]/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FF3B00]/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <BackButton containerClassName="p-2 hover:bg-white/10 rounded-full transition-colors group bg-black/40 border border-white/10 backdrop-blur" iconClassName="w-5 h-5 text-white" />
              <div className="flex flex-col justify-center">
                 <div className="flex items-center">
                   <div className="flex -space-x-3">
                     <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full border-2 border-[#0A0A0A] p-0.5 shadow-lg relative z-10" />
                     <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full border-2 border-[#0A0A0A] p-0.5 shadow-lg relative z-0" />
                   </div>
                 </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <button 
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className={`flex px-3 py-1.5 rounded-full border items-center gap-1.5 transition-colors shadow-lg backdrop-blur ${isVideoPlaying ? 'bg-[#00E5FF]/20 border-[#00E5FF]/50 text-[#00E5FF]' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
              >
                <MonitorPlay className="w-3.5 h-3.5" />
                <span className="text-[10px] md:text-xs font-black tracking-widest hidden md:block">MEDIA</span>
              </button>
              <div className="flex px-3 py-1.5 rounded-full border border-[#FF3B00]/40 bg-[#FF3B00]/10 items-center gap-1.5 shadow-[0_0_15px_rgba(255,59,0,0.3)] backdrop-blur">
                <Flame className="w-3.5 h-3.5 text-[#FF3B00] animate-pulse" />
                <span className="text-[10px] md:text-xs font-black text-[#FF3B00] tracking-widest">4.2K</span>
              </div>
              <button className="p-2 bg-black/40 border border-white/10 hover:bg-white/10 rounded-full transition-colors text-white backdrop-blur">
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Container to center stage on desktop */}
        <div className="w-full flex flex-col xl:m-auto xl:max-w-6xl mt-4 xl:mt-auto">
          
          {isVideoPlaying ? (
            <div className="w-full flex flex-row xl:flex-col gap-2 md:gap-4 px-2 xl:px-0">
              {/* The Video Area (70% width on mobile) */}
              <div className="flex-[7] xl:flex-none xl:w-full aspect-video bg-black relative overflow-hidden rounded-xl xl:rounded-2xl shadow-2xl border-b xl:border border-white/10 shrink-0 group">
                <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2 md:p-6 pointer-events-none">
                  <h2 className="text-[10px] md:text-3xl font-black text-white drop-shadow-lg mb-0.5 md:mb-2 leading-tight">Arteta's Post-Match Interview</h2>
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00E5FF] w-1/3" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center">
                    <MonitorPlay className="w-3 h-3 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* The Speakers Area (30% width on mobile, locked height) */}
              <div className="flex-[3] xl:flex-none xl:w-full relative shrink-0">
                <div className="absolute inset-0 xl:relative xl:inset-auto xl:w-full overflow-y-auto xl:overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex flex-col items-center xl:flex-row gap-1 md:gap-2">
                    {renderSpeakers(true)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-24 md:h-auto md:aspect-video relative bg-black overflow-hidden flex flex-col xl:rounded-2xl shadow-2xl xl:w-auto xl:aspect-video border-b xl:border border-white/10 shrink-0">
              {/* The Stream Player */}
              {/* Dynamic Premium Background */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop" 
                  alt="Stadium stands" 
                  className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                />
                {/* Rich color overlays for the teams */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/20 via-[#020202]/80 to-[#001C58]/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent pointer-events-none" />
              </div>

              {/* Speakers Grid inside Player */}
              <div className="relative z-10 flex-1 flex flex-row items-center overflow-x-auto gap-2 p-2 md:grid md:grid-cols-3 md:grid-rows-2 md:gap-4 md:p-6 h-full w-full scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {renderSpeakers(false)}
              </div>
            </div>
          )}
          
        </div>
        
      </div>

      {/* Right Pane: Interaction Zone & Chat */}
      <div className="w-full xl:w-[480px] flex-1 xl:flex-none flex flex-col h-auto xl:h-full border-t xl:border-t-0 xl:border-l border-white/10 bg-[#020202] relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden">
        
        {/* Poll Pop-up (Top of Chat) */}
        <div className="p-4 bg-gradient-to-b from-[#050505] to-transparent relative z-10 shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md relative overflow-hidden shadow-lg group hover:border-white/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/10 rounded-full blur-[30px] pointer-events-none group-hover:bg-[#00E5FF]/20 transition-all duration-500" />
            
            <div 
              className="flex items-center justify-between cursor-pointer group/toggle"
              onClick={() => setIsPollExpanded(!isPollExpanded)}
            >
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00E5FF]" />
                <h3 className="text-sm font-black text-white group-hover/toggle:text-[#00E5FF] transition-colors">Live Poll</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">1m 24s left</span>
                {isPollExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400 group-hover/toggle:text-white transition-colors" />}
              </div>
            </div>
            
            <div className={`transition-all duration-500 overflow-hidden ${isPollExpanded ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 md:max-h-64 md:opacity-100 md:mt-4'}`}>
              <p className="text-gray-300 text-xs font-medium mb-4">Was it a clear penalty on Saka?</p>
              
              <div className="space-y-3">
                {/* Option 1 */}
                <div 
                  onClick={() => handleVote('yes')}
                  className={`relative h-8 rounded-lg bg-black/40 border overflow-hidden transition-colors ${hasVoted ? 'cursor-default border-white/5' : 'cursor-pointer border-white/10 hover:border-[#00E5FF]/50'}`}
                >
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00E5FF]/40 to-[#00E5FF]/20 transition-all duration-1000" style={{ width: `${yesPercentage}%` }} />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-xs font-bold text-white z-10 drop-shadow-md">Yes, clear foul</span>
                    <span className="text-[10px] font-black text-[#00E5FF] z-10 drop-shadow-md">{yesPercentage}%</span>
                  </div>
                </div>
                
                {/* Option 2 */}
                <div 
                  onClick={() => handleVote('no')}
                  className={`relative h-8 rounded-lg bg-black/40 border overflow-hidden transition-colors ${hasVoted ? 'cursor-default border-white/5' : 'cursor-pointer border-white/10 hover:border-[#FF3B00]/50'}`}
                >
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF3B00]/40 to-[#FF3B00]/20 transition-all duration-1000" style={{ width: `${noPercentage}%` }} />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-xs font-bold text-white z-10 drop-shadow-md">No, he dove</span>
                    <span className="text-[10px] font-black text-[#FF3B00] z-10 drop-shadow-md">{noPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 px-4 md:px-6 pb-4 md:pb-6 relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A]">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex gap-2 md:gap-3 group">
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center shrink-0 border ${msg.isSpeaker ? 'border-[#00C853] shadow-[0_0_15px_rgba(0,200,83,0.4)]' : 'border-white/20'} p-0.5 md:p-1 mt-0.5 transition-transform duration-300 group-hover:scale-110`}>
                <img src={msg.avatar} className="w-full h-full object-contain" alt="avatar" />
              </div>
              <div className={`${msg.isSpeaker ? 'bg-gradient-to-br from-[#00C853]/10 to-[#00C853]/5 border-[#00C853]/30 shadow-[0_4px_20px_rgba(0,200,83,0.1)]' : 'bg-white/5 border-white/10 hover:bg-white/10'} p-2 md:p-3 rounded-2xl rounded-tl-none border backdrop-blur-sm transition-colors flex-1`}>
                <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                  <span className={`font-black ${msg.color} text-[10px] md:text-xs tracking-wider drop-shadow-sm`}>{msg.name}</span>
                  <span className={`text-[8px] md:text-[9px] ${msg.isSpeaker ? 'text-[#00C853]/60' : 'text-gray-500'} font-bold`}>{msg.time}</span>
                </div>
                <p className={`text-xs md:text-sm ${msg.isSpeaker ? 'text-white' : 'text-gray-300'} leading-snug md:leading-relaxed font-medium`}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="p-2 md:p-4 border-t border-white/10 bg-black/80 backdrop-blur-xl space-y-2 md:space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] relative z-30">
          
          {/* Reaction Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => spawnEmoji('🤡')}
              className="flex-1 flex flex-col items-center justify-center gap-0 md:gap-1 bg-white/5 border border-white/10 rounded-xl py-1 md:py-3 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 active:scale-95 transition-all shadow-lg"
            >
              <span className="text-xl md:text-2xl drop-shadow-md">🤡</span>
              <span className="text-[8px] md:text-[9px] font-black text-gray-400 tracking-widest uppercase">Waffling</span>
            </button>
            <button 
              onClick={() => spawnEmoji('🍳')}
              className="flex-1 flex flex-col items-center justify-center gap-0 md:gap-1 bg-white/5 border border-white/10 rounded-xl py-1 md:py-3 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 active:scale-95 transition-all shadow-lg"
            >
              <span className="text-xl md:text-2xl drop-shadow-md">🍳</span>
              <span className="text-[8px] md:text-[9px] font-black text-gray-400 tracking-widest uppercase">Cooking</span>
            </button>
            <button 
              onClick={() => setIsMicPending(true)}
              disabled={isMicPending}
              className={`flex-[2] flex flex-col items-center justify-center gap-0 md:gap-1 rounded-xl py-1 md:py-3 hover:scale-[1.02] active:scale-95 transition-all font-black cursor-pointer ${
                isMicPending 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-gray-400 border border-white/10 shadow-inner' 
                  : 'bg-gradient-to-br from-[#FF7F50] to-[#FF3B00] text-black shadow-[0_0_20px_rgba(255,127,80,0.4)] hover:shadow-[0_0_30px_rgba(255,127,80,0.6)] border border-[#FF3B00]/50'
              }`}
            >
              {isMicPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Hand className="w-5 h-5 fill-black drop-shadow-sm" />}
              <span className="text-[10px] tracking-widest uppercase">{isMicPending ? 'Pending' : 'Request Mic'}</span>
            </button>
          </div>

          {/* Chat Input Form */}
          <form 
            onSubmit={handleSendMessage}
            className="bg-[#0A0A0A] rounded-full p-1 border border-white/10 flex items-center focus-within:border-[#00E5FF] focus-within:shadow-[0_0_20px_rgba(0,229,255,0.15)] focus-within:bg-[#111] transition-all shadow-inner relative z-20 group"
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 ml-1 overflow-hidden border border-white/10 shrink-0 group-focus-within:border-[#00E5FF]/50 transition-colors">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="User" />
            </div>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Join the conversation..." 
              className="bg-transparent border-none outline-none text-sm w-full px-4 text-white placeholder:text-gray-600 font-medium"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl transition-all mr-0.5 border ${
                inputText.trim() 
                  ? 'bg-[#00E5FF] hover:bg-[#00E5FF]/90 border-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:scale-105' 
                  : 'bg-white/5 border-white/10 text-gray-500'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
