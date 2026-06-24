"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Mic, MicOff, Hand, Send, MoreHorizontal, Users, Flame, Zap, Loader2 } from "lucide-react";
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
      <div className="flex-none xl:flex-1 overflow-y-auto hide-scrollbar flex flex-col relative z-10 bg-[#050505]">
        
        {/* Info Section (Header moved to top) */}
        <div className="px-4 py-3 md:px-8 md:py-6 xl:mx-8 xl:mt-6 xl:bg-white/5 xl:border xl:border-white/10 xl:rounded-2xl border-b border-white/5 flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BackButton containerClassName="p-2 hover:bg-white/10 rounded-full transition-colors group bg-white/5" iconClassName="w-5 h-5 text-white" />
              <div className="flex flex-col">
                 <div className="flex items-center gap-2 mb-0.5">
                   <div className="flex items-center gap-1.5 bg-[#00E5FF]/10 px-1.5 py-0.5 rounded border border-[#00E5FF]/20">
                     <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5FF]"></span></span>
                     <span className="text-[8px] font-bold text-[#00E5FF] tracking-widest uppercase">Live Debate</span>
                   </div>
                 </div>
                 <h1 className="text-sm md:text-xl font-black text-white tracking-wider flex items-center gap-2">
                   ARS vs TOT
                   <div className="flex -space-x-2">
                     <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-4 h-4 bg-white rounded-full border border-[#0A0A0A] p-0.5" />
                     <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" className="w-4 h-4 bg-white rounded-full border border-[#0A0A0A] p-0.5" />
                   </div>
                 </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex px-3 py-1.5 rounded-full border border-[#FF3B00]/30 bg-[#FF3B00]/10 items-center gap-1.5 shadow-[0_0_15px_rgba(255,59,0,0.2)]">
                <Flame className="w-3.5 h-3.5 text-[#FF3B00]" />
                <span className="text-[10px] font-bold text-[#FF3B00] tracking-widest">4.2K</span>
              </div>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* The Stream Player (Moved below Info Section) */}
        <div className="w-full aspect-[4/3] md:aspect-video relative bg-black overflow-hidden flex flex-col xl:rounded-2xl shadow-2xl xl:mx-8 xl:mt-6 xl:w-auto xl:aspect-video border-b xl:border border-white/10 shrink-0">
          {/* Dynamic Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop" 
              alt="Stadium stands" 
              className="w-full h-full object-cover opacity-20 grayscale blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/60 via-[#020202]/80 to-[#020202] pointer-events-none" />
          </div>

          {/* Speakers Grid inside Player */}
          <div className="relative z-10 flex-1 grid grid-cols-3 grid-rows-2 gap-1 md:gap-4 p-2 md:p-6 h-full w-full">
            
            {/* Speaker 1: Active Talking */}
            <div className={`relative h-full w-full min-h-0 rounded-xl overflow-hidden border-2 ${mutedUsers['GOONER4LIFE'] ? 'border-white/10' : 'border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]'} group cursor-pointer transition-all`} onClick={() => toggleMute('GOONER4LIFE')}>
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover ${mutedUsers['GOONER4LIFE'] ? 'grayscale opacity-50' : 'opacity-90'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              {!mutedUsers['GOONER4LIFE'] && <div className="absolute inset-0 border-2 border-[#00E5FF]/40 rounded-xl animate-pulse pointer-events-none" />}
              
              {/* Mic Status */}
              <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
                <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['GOONER4LIFE'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#00E5FF]/80 backdrop-blur'} flex items-center justify-center`}>
                  {mutedUsers['GOONER4LIFE'] ? <MicOff className="w-3 h-3 text-white" /> : <Mic className="w-3 h-3 text-black" />}
                </div>
              </div>
              
              {/* Name */}
              <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
                 <div className={`w-2 h-2 rounded-full ${mutedUsers['GOONER4LIFE'] ? 'bg-red-500' : 'bg-[#00E5FF] animate-pulse'} shadow-lg`} />
                 <span className={`text-[9px] md:text-sm font-black ${mutedUsers['GOONER4LIFE'] ? 'text-gray-300' : 'text-white'} drop-shadow-md truncate`}>GOONER4LIFE</span>
              </div>
            </div>

            {/* Speaker 2: Muted */}
            <div className={`relative h-full w-full min-h-0 rounded-xl overflow-hidden border-2 ${mutedUsers['BLUEMASON'] ? 'border-white/10' : 'border-white/30'} group cursor-pointer transition-all`} onClick={() => toggleMute('BLUEMASON')}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover ${mutedUsers['BLUEMASON'] ? 'grayscale opacity-50' : 'opacity-80 group-hover:opacity-100'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Mic Status */}
              <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
                <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['BLUEMASON'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#222]/80 backdrop-blur'} flex items-center justify-center`}>
                  <MicOff className={`w-3 h-3 ${mutedUsers['BLUEMASON'] ? 'text-white' : 'text-gray-400'}`} />
                </div>
              </div>
              
              {/* Name */}
              <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
                 <span className={`text-[9px] md:text-sm font-bold ${mutedUsers['BLUEMASON'] ? 'text-gray-400' : 'text-white'} drop-shadow-md truncate`}>BLUEMASON</span>
              </div>
            </div>

            {/* Speaker 3: Muted */}
            <div className={`relative h-full w-full min-h-0 rounded-xl overflow-hidden border-2 ${mutedUsers['SPURSY_10'] ? 'border-white/10' : 'border-white/30'} group cursor-pointer transition-all`} onClick={() => toggleMute('SPURSY_10')}>
              <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover ${mutedUsers['SPURSY_10'] ? 'grayscale opacity-50' : 'opacity-80 group-hover:opacity-100'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Mic Status */}
              <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
                <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['SPURSY_10'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#222]/80 backdrop-blur'} flex items-center justify-center`}>
                  <MicOff className={`w-3 h-3 ${mutedUsers['SPURSY_10'] ? 'text-white' : 'text-gray-400'}`} />
                </div>
              </div>
              
              {/* Name */}
              <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
                 <span className={`text-[9px] md:text-sm font-bold ${mutedUsers['SPURSY_10'] ? 'text-gray-400' : 'text-white'} drop-shadow-md truncate`}>SPURSY_10</span>
              </div>
            </div>

            {/* Speaker 4: Empty Slot */}
            <div className="relative h-full w-full min-h-0 rounded-xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 text-white/20" />
            </div>

            {/* Speaker 5: Active Mic, Non-Speaking */}
            <div className={`relative h-full w-full min-h-0 rounded-xl overflow-hidden border-2 ${mutedUsers['GUNNERVIC'] ? 'border-white/10' : 'border-[#00C853] shadow-[0_0_15px_rgba(0,200,83,0.15)]'} group cursor-pointer transition-all`} onClick={() => toggleMute('GUNNERVIC')}>
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover ${mutedUsers['GUNNERVIC'] ? 'grayscale opacity-50' : 'opacity-90'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Mic Status */}
              <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
                <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['GUNNERVIC'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#00C853]/80 backdrop-blur'} flex items-center justify-center`}>
                  {mutedUsers['GUNNERVIC'] ? <MicOff className="w-3 h-3 text-white" /> : <Mic className="w-3 h-3 text-black" />}
                </div>
              </div>
              
              {/* Name */}
              <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
                 <span className={`text-[9px] md:text-sm font-bold ${mutedUsers['GUNNERVIC'] ? 'text-gray-400' : 'text-white'} drop-shadow-md truncate`}>GUNNERVIC</span>
              </div>
            </div>

            {/* Speaker 6: Empty Slot */}
            <div className="relative h-full w-full min-h-0 rounded-xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 text-white/20" />
            </div>

          </div>
        </div>

        {/* Space filler on desktop, mobile doesn't need it because chat is flex-1 */}
        <div className="hidden xl:block flex-1 shrink-0"></div>
      </div>

      {/* Right Pane: Interaction Zone & Chat */}
      <div className="w-full xl:w-[480px] flex-1 xl:flex-none flex flex-col h-auto xl:h-full border-t xl:border-t-0 xl:border-l border-white/10 bg-[#050505] relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden">
        


        {/* Live Chat Feed */}
        <div className="flex-1 overflow-y-auto space-y-6 p-6 relative bg-gradient-to-b from-[#0A0A0A] to-[#050505]">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border ${msg.isSpeaker ? 'border-[#00C853] shadow-[0_0_10px_rgba(0,200,83,0.3)]' : 'border-white/20'} p-1 mt-0.5`}>
                <img src={msg.avatar} className="w-full h-full object-contain" alt="avatar" />
              </div>
              <div className={`${msg.isSpeaker ? 'bg-[#00C853]/10 border-[#00C853]/30' : 'bg-[#121212] border-white/5'} p-3 rounded-2xl rounded-tl-none border shadow-md flex-1`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-black ${msg.color} text-xs tracking-wider`}>{msg.name}</span>
                  <span className={`text-[9px] ${msg.isSpeaker ? 'text-[#00C853]/60' : 'text-gray-600'} font-bold`}>{msg.time}</span>
                </div>
                <p className={`text-sm ${msg.isSpeaker ? 'text-white' : 'text-gray-300'} leading-relaxed font-medium`}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="p-1.5 md:p-4 border-t border-white/10 bg-[#0A0A0A] space-y-1.5 md:space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          
          {/* Reaction Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => spawnEmoji('🤡')}
              className="flex-1 flex flex-col items-center justify-center gap-0 md:gap-1 bg-[#1A1A1A] border border-white/5 rounded-xl py-1 md:py-3 hover:bg-white/10 hover:-translate-y-1 active:scale-95 transition-all shadow-md"
            >
              <span className="text-xl md:text-2xl drop-shadow-md">🤡</span>
              <span className="text-[8px] md:text-[9px] font-black text-gray-400 tracking-widest uppercase">Waffling</span>
            </button>
            <button 
              onClick={() => spawnEmoji('🍳')}
              className="flex-1 flex flex-col items-center justify-center gap-0 md:gap-1 bg-[#1A1A1A] border border-white/5 rounded-xl py-1 md:py-3 hover:bg-white/10 hover:-translate-y-1 active:scale-95 transition-all shadow-md"
            >
              <span className="text-xl md:text-2xl drop-shadow-md">🍳</span>
              <span className="text-[8px] md:text-[9px] font-black text-gray-400 tracking-widest uppercase">Cooking</span>
            </button>
            <button 
              onClick={() => setIsMicPending(true)}
              disabled={isMicPending}
              className={`flex-[2] flex flex-col items-center justify-center gap-0 md:gap-1 rounded-xl py-1 md:py-3 hover:scale-[1.02] active:scale-95 transition-all font-black cursor-pointer ${
                isMicPending 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-gray-400 border border-white/10' 
                  : 'bg-gradient-to-br from-[#FF7F50] to-[#FF3B00] text-black shadow-[0_0_20px_rgba(255,127,80,0.4)]'
              }`}
            >
              {isMicPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Hand className="w-5 h-5 fill-black drop-shadow-sm" />}
              <span className="text-[10px] tracking-widest uppercase">{isMicPending ? 'Pending' : 'Request Mic'}</span>
            </button>
          </div>

          {/* Chat Input Form */}
          <form 
            onSubmit={handleSendMessage}
            className="bg-[#121212] rounded-full p-1 border border-white/10 flex items-center focus-within:border-[#00E5FF] transition-all shadow-inner relative z-20"
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 ml-1 overflow-hidden border border-white/10 shrink-0">
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
              className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl transition-colors mr-0.5 border ${
                inputText.trim() 
                  ? 'bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 border-[#00E5FF]/40 text-[#00E5FF]' 
                  : 'bg-[#00E5FF]/5 border-[#00E5FF]/10 text-[#00E5FF]/50'
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
