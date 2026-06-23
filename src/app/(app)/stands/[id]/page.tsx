"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Mic, MicOff, Hand, Send, MoreHorizontal, Users, Flame, Zap } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

export default function ActiveStandPage() {
  const [mutedUsers, setMutedUsers] = useState<Record<string, boolean>>({});
  const [floatingEmojis, setFloatingEmojis] = useState<{id: number, emoji: string, left: number}[]>([]);

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

  return (
    <div className="w-full max-w-[1600px] mx-auto min-h-screen text-white flex flex-col xl:flex-row relative bg-[#020202] overflow-hidden">
      
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

      {/* Dynamic Background for the Stage */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00E5FF]/5 via-[#020202] to-[#020202] pointer-events-none" />

      {/* Left Pane: The Stage */}
      <div className="flex-1 space-y-8 flex flex-col p-4 md:p-8 relative z-10">
        
        {/* Stage Header */}
        <header className="flex items-center justify-between border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <BackButton containerClassName="p-2 hover:bg-white/10 rounded-full transition-colors group bg-white/5 backdrop-blur z-20 relative" iconClassName="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
            
            <div className="flex items-center bg-[#0A0A0A] border border-white/10 rounded-full px-2 py-1 pr-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full p-1 flex items-center justify-center shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-full h-full object-contain" alt="ARS" />
                </div>
                <span className="text-sm font-black text-gray-500 tracking-widest italic">VS</span>
                <div className="w-8 h-8 bg-white rounded-full p-1 flex items-center justify-center shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" className="w-full h-full object-contain" alt="TOT" />
                </div>
              </div>
              <div className="w-px h-6 bg-white/10 mx-4" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
                </span>
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">Live Debate</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex px-4 py-2 rounded-full border border-[#FF3B00]/30 bg-[#FF3B00]/10 items-center gap-2">
              <Flame className="w-4 h-4 text-[#FF3B00]" />
              <span className="text-[10px] font-bold text-[#FF3B00] tracking-widest">4.2K IN ROOM</span>
            </div>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white backdrop-blur border border-white/10 shadow-lg relative z-20">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Speakers Grid */}
        <div className="flex-1 flex flex-col justify-center py-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 max-w-5xl mx-auto w-full">
            
            {/* Speaker 1: Active Talking */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer relative" onClick={() => toggleMute('GOONER4LIFE')}>
              {/* Soundwave effect */}
              {!mutedUsers['GOONER4LIFE'] && (
                <>
                  <div className="absolute top-0 w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-[#00E5FF] animate-ping opacity-20" />
                  <div className="absolute top-0 w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-[#00E5FF]/40 animate-pulse" />
                </>
              )}
              
              <div className={`w-32 h-32 md:w-44 md:h-44 rounded-full bg-gray-800 border-4 ${mutedUsers['GOONER4LIFE'] ? 'border-red-500 opacity-50 grayscale' : 'border-[#00E5FF] shadow-[0_0_40px_rgba(0,229,255,0.4)]'} relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-all z-10`}>
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {mutedUsers['GOONER4LIFE'] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <MicOff className="w-12 h-12 text-red-500" />
                  </div>
                )}
                {/* Overlay mute icon on hover if not muted */}
                {!mutedUsers['GOONER4LIFE'] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <MicOff className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              
              <div className="absolute -bottom-4 z-20 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${mutedUsers['GOONER4LIFE'] ? 'bg-red-500' : 'bg-[#00E5FF]'} border-[3px] border-[#020202] flex items-center justify-center shadow-lg mb-1 transition-colors`}>
                  {mutedUsers['GOONER4LIFE'] ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-black" />}
                </div>
                <div className={`bg-[#121212] border ${mutedUsers['GOONER4LIFE'] ? 'border-red-500/50' : 'border-[#00E5FF]/50'} px-3 py-1 rounded-full shadow-lg`}>
                  <span className={`text-xs font-black ${mutedUsers['GOONER4LIFE'] ? 'text-red-500' : 'text-[#00E5FF] drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]'} tracking-widest`}>GOONER4LIFE</span>
                </div>
              </div>
            </div>

            {/* Speaker 2: Muted */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer relative mt-8 lg:mt-0" onClick={() => toggleMute('BLUEMASON')}>
              <div className={`w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#121212] border-2 ${mutedUsers['BLUEMASON'] ? 'border-red-500 opacity-50 grayscale' : 'border-white/10 opacity-80 hover:opacity-100 grayscale hover:grayscale-0'} relative overflow-hidden flex items-center justify-center group-hover:border-white/30 transition-all z-10`}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                {mutedUsers['BLUEMASON'] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <MicOff className="w-12 h-12 text-red-500" />
                  </div>
                )}
                {/* Overlay mute icon on hover if not muted */}
                {!mutedUsers['BLUEMASON'] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <MicOff className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              
              <div className="absolute -bottom-4 z-20 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${mutedUsers['BLUEMASON'] ? 'bg-red-500' : 'bg-[#222]'} border-[3px] border-[#020202] flex items-center justify-center mb-1 transition-colors`}>
                  <MicOff className={`w-3 h-3 ${mutedUsers['BLUEMASON'] ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <div className={`bg-[#121212] border ${mutedUsers['BLUEMASON'] ? 'border-red-500/50' : 'border-white/10'} px-3 py-1 rounded-full`}>
                  <span className={`text-[10px] font-bold ${mutedUsers['BLUEMASON'] ? 'text-red-500' : 'text-gray-400'} tracking-widest uppercase`}>BLUEMASON</span>
                </div>
              </div>
            </div>

            {/* Speaker 3: Muted */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer relative mt-8 lg:mt-0" onClick={() => toggleMute('SPURSY_10')}>
              <div className={`w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#121212] border-2 ${mutedUsers['SPURSY_10'] ? 'border-red-500 opacity-50 grayscale' : 'border-white/10 opacity-80 hover:opacity-100 grayscale hover:grayscale-0'} relative overflow-hidden flex items-center justify-center group-hover:border-white/30 transition-all z-10`}>
                <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                {mutedUsers['SPURSY_10'] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <MicOff className="w-12 h-12 text-red-500" />
                  </div>
                )}
                {/* Overlay mute icon on hover if not muted */}
                {!mutedUsers['SPURSY_10'] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <MicOff className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              
              <div className="absolute -bottom-4 z-20 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${mutedUsers['SPURSY_10'] ? 'bg-red-500' : 'bg-[#222]'} border-[3px] border-[#020202] flex items-center justify-center mb-1 transition-colors`}>
                  <MicOff className={`w-3 h-3 ${mutedUsers['SPURSY_10'] ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <div className={`bg-[#121212] border ${mutedUsers['SPURSY_10'] ? 'border-red-500/50' : 'border-white/10'} px-3 py-1 rounded-full`}>
                  <span className={`text-[10px] font-bold ${mutedUsers['SPURSY_10'] ? 'text-red-500' : 'text-gray-400'} tracking-widest uppercase`}>SPURSY_10</span>
                </div>
              </div>
            </div>

            {/* Speaker 4: Empty Slot */}
            <div className="flex flex-col items-center gap-4 relative mt-8">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#0A0A0A] border-2 border-dashed border-gray-800 relative flex flex-col items-center justify-center z-10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <MicOff className="w-6 h-6 text-gray-800" />
                </div>
                <span className="text-[10px] text-gray-800 font-bold tracking-widest">OPEN SLOT</span>
              </div>
            </div>

            {/* Speaker 5: Active Mic, Non-Speaking */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer relative mt-8" onClick={() => toggleMute('GUNNERVIC')}>
              <div className={`w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#121212] border-2 ${mutedUsers['GUNNERVIC'] ? 'border-red-500 opacity-50 grayscale' : 'border-[#00C853] shadow-[0_0_20px_rgba(0,200,83,0.15)]'} relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-all z-10`}>
                <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                {mutedUsers['GUNNERVIC'] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <MicOff className="w-12 h-12 text-red-500" />
                  </div>
                )}
                {/* Overlay mute icon on hover if not muted */}
                {!mutedUsers['GUNNERVIC'] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <MicOff className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              
              <div className="absolute -bottom-4 z-20 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${mutedUsers['GUNNERVIC'] ? 'bg-red-500' : 'bg-[#00C853]'} border-[3px] border-[#020202] flex items-center justify-center mb-1 transition-colors ${!mutedUsers['GUNNERVIC'] && 'shadow-[0_0_10px_rgba(0,200,83,0.5)]'}`}>
                  {mutedUsers['GUNNERVIC'] ? <MicOff className="w-3 h-3 text-white" /> : <Mic className="w-3 h-3 text-black" />}
                </div>
                <div className={`bg-[#121212] border ${mutedUsers['GUNNERVIC'] ? 'border-red-500/50' : 'border-[#00C853]/50'} px-3 py-1 rounded-full`}>
                  <span className={`text-[10px] font-bold ${mutedUsers['GUNNERVIC'] ? 'text-red-500' : 'text-white'} tracking-widest uppercase`}>GUNNERVIC</span>
                </div>
              </div>
            </div>

            {/* Speaker 6: Empty */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer relative mt-8">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#0A0A0A] border-2 border-dashed border-gray-700 relative flex flex-col items-center justify-center group-hover:bg-white/5 transition-colors z-10">
                <MoreHorizontal className="w-8 h-8 text-gray-700 group-hover:text-white" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Right Pane: Interaction Zone & Chat */}
      <div className="w-full xl:w-[480px] flex flex-col h-[600px] xl:h-screen border-t xl:border-t-0 xl:border-l border-white/10 bg-[#050505] relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur">
          <h3 className="text-xs font-black tracking-widest text-white uppercase flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00E5FF]" /> Live Stand Chat
          </h3>
          <span className="text-[10px] text-gray-500 font-bold bg-white/5 px-2 py-1 rounded">284 ONLINE</span>
        </div>

        {/* Live Chat Feed */}
        <div className="flex-1 overflow-y-auto space-y-6 p-6 scrollbar-hide relative bg-gradient-to-b from-[#0A0A0A] to-[#050505]">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-white/20 p-1 mt-0.5">
              <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-full h-full object-contain" alt="ARS" />
            </div>
            <div className="bg-[#121212] p-3 rounded-2xl rounded-tl-none border border-white/5 shadow-md flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-black text-[#00E5FF] text-xs tracking-wider">Gooner4Life</span>
                <span className="text-[9px] text-gray-600 font-bold">1m ago</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-medium">
                Absolute shocker from the VAR there. Clear penalty! We are being robbed in broad daylight.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-white/20 p-1 mt-0.5">
              <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-full h-full object-contain" alt="LIV" />
            </div>
            <div className="bg-[#121212] p-3 rounded-2xl rounded-tl-none border border-white/5 shadow-md flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-black text-[#FF3B00] text-xs tracking-wider">BlueMason</span>
                <span className="text-[9px] text-gray-600 font-bold">Just now</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-medium">
                Never a pen. He dove before the contact even happened. 🤡 Have some shame!
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-white/20 p-1 mt-0.5">
              <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" className="w-full h-full object-contain" alt="TOT" />
            </div>
            <div className="bg-[#121212] p-3 rounded-2xl rounded-tl-none border border-white/5 shadow-md flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-black text-gray-300 text-xs tracking-wider">Spursy_10</span>
                <span className="text-[9px] text-gray-600 font-bold">Just now</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-medium">
                Host is completely biased as usual. Get him off the mic and let someone objective speak.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#00C853] p-1 mt-0.5 shadow-[0_0_10px_rgba(0,200,83,0.3)]">
              <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-full h-full object-contain" alt="ARS" />
            </div>
            <div className="bg-[#00C853]/10 p-3 rounded-2xl rounded-tl-none border border-[#00C853]/30 shadow-md flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-black text-[#00C853] text-xs tracking-wider">GunnerVic (Speaker)</span>
                <span className="text-[9px] text-[#00C853]/60 font-bold">Just now</span>
              </div>
              <p className="text-sm text-white leading-relaxed font-bold">
                Are you blind?! He clearly clipped his heel! Everyone in the stadium saw it.
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 border-t border-white/10 bg-[#0A0A0A] space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          
          {/* Reaction Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => spawnEmoji('🤡')}
              className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#1A1A1A] border border-white/5 rounded-2xl py-3 hover:bg-white/10 hover:-translate-y-1 active:scale-95 transition-all shadow-md"
            >
              <span className="text-2xl drop-shadow-md">🤡</span>
              <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase">Waffling</span>
            </button>
            <button 
              onClick={() => spawnEmoji('🍳')}
              className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#1A1A1A] border border-white/5 rounded-2xl py-3 hover:bg-white/10 hover:-translate-y-1 active:scale-95 transition-all shadow-md"
            >
              <span className="text-2xl drop-shadow-md">🍳</span>
              <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase">Cooking</span>
            </button>
            <button className="flex-[2] flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#FF7F50] to-[#FF3B00] text-black rounded-2xl py-3 hover:scale-[1.02] active:scale-95 transition-all font-black shadow-[0_0_20px_rgba(255,127,80,0.4)] cursor-pointer">
              <Hand className="w-5 h-5 fill-black drop-shadow-sm" />
              <span className="text-[10px] tracking-widest uppercase">Request Mic</span>
            </button>
          </div>

          {/* Chat Input */}
          <div className="bg-[#121212] rounded-full p-1.5 border border-white/10 flex items-center focus-within:border-[#00E5FF] transition-all shadow-inner relative z-20">
            <div className="w-8 h-8 rounded-full bg-gray-800 ml-1 overflow-hidden border border-white/10 shrink-0">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="User" />
            </div>
            <input 
              type="text" 
              placeholder="Join the conversation..." 
              className="bg-transparent border-none outline-none text-sm w-full px-4 text-white placeholder:text-gray-600 font-medium"
            />
            <button className="w-10 h-10 flex items-center justify-center bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 rounded-full transition-colors mr-0.5 border border-[#00E5FF]/20">
              <Send className="w-4 h-4 text-[#00E5FF]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
