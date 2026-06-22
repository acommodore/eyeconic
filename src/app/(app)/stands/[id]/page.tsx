"use client";

import Link from "next/link";
import { ArrowLeft, Share2, Mic, Hand, Send, MoreHorizontal } from "lucide-react";

export default function ActiveStandPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 bg-[#050505] min-h-screen text-white flex flex-col xl:flex-row gap-8 lg:gap-12">
      
      {/* Left Pane: The Stage */}
      <div className="flex-1 space-y-8 flex flex-col">
        
        {/* Stage Header */}
        <header className="flex items-center justify-between border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/stands" className="p-2 hover:bg-white/10 rounded-full transition-colors group">
              <ArrowLeft className="w-6 h-6 text-[#00E5FF] group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md" alt="ARS" />
              <span className="text-xl md:text-2xl font-black text-gray-500 tracking-widest">V</span>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full p-1 flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" className="w-full h-full object-contain" alt="TOT" />
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-full border border-[#00C853]/40 bg-[#00C853]/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" />
              <span className="text-[10px] font-bold text-[#00C853] tracking-widest">4.2K LISTENING</span>
            </div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
            <Share2 className="w-5 h-5" />
          </button>
        </header>

        {/* Speakers Grid */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-4xl mx-auto w-full">
            
            {/* Speaker 1 (Active) */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-gray-800 border-2 border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.2)] relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 md:bottom-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#00E5FF] border-[3px] border-[#121212] flex items-center justify-center">
                  <Mic className="w-4 h-4 md:w-5 md:h-5 text-black" />
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-[#00E5FF] tracking-widest">GOONER4LIFE</span>
            </div>

            {/* Speaker 2 */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-gray-800 border border-white/10 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform opacity-70">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase">BLUEMASON</span>
            </div>

            {/* Speaker 3 */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-gray-800 border border-white/10 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform opacity-70">
                <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase">SPURSY_10</span>
            </div>

            {/* Speaker 4 (Empty) */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-[#121212] border border-white/5 relative flex items-center justify-center group-hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center opacity-50" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-600 tracking-widest uppercase">THETACTICIAN</span>
            </div>

            {/* Speaker 5 (Empty but Active Mic) */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-[#121212] border border-[#00E5FF]/50 relative flex items-center justify-center group-hover:bg-white/5 transition-colors">
                 <div className="absolute bottom-2 md:bottom-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#00E5FF] border-[3px] border-[#121212] flex items-center justify-center">
                  <Mic className="w-4 h-4 md:w-5 md:h-5 text-black" />
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase">GUNNERVIC</span>
            </div>

            {/* Speaker 6 (Empty) */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-[#121212] border border-white/5 relative flex items-center justify-center group-hover:bg-white/5 transition-colors">
                 <MoreHorizontal className="w-8 h-8 text-gray-600" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-600 tracking-widest uppercase">NORTHLDN</span>
            </div>

          </div>
        </div>
      </div>

      {/* Right Pane: Interaction Zone & Chat */}
      <div className="w-full xl:w-[450px] flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-4rem)] border-t xl:border-t-0 xl:border-l border-white/5 xl:pl-8 pt-8 xl:pt-0">
        
        {/* Live Chat Feed */}
        <div className="flex-1 overflow-y-auto space-y-6 pb-6 scrollbar-hide">
          <div className="flex gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-6 h-6 object-contain shrink-0 drop-shadow-sm" alt="ARS" />
            <p className="text-sm text-gray-200 leading-relaxed">
              <span className="font-bold text-[#00E5FF] mr-2">Gooner4Life:</span> 
              Absolute shocker from the VAR there. Clear penalty!
            </p>
          </div>

          <div className="flex gap-3">
            <div className="w-6 h-6 bg-white rounded-full p-0.5 flex items-center justify-center shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className="w-full h-full object-contain" alt="LIV" />
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              <span className="font-bold text-[#00E5FF] mr-2">BlueMason:</span> 
              Never a pen. He dove before the contact even happened. 🤡
            </p>
          </div>

          <div className="flex gap-3">
            <div className="w-6 h-6 bg-white rounded-full p-0.5 flex items-center justify-center shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" className="w-full h-full object-contain" alt="TOT" />
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              <span className="font-bold text-[#00E5FF] mr-2">Spursy_10:</span> 
              Host is biased as usual. Get him off the mic!
            </p>
          </div>

          {/* Faded older messages to show scroll effect */}
          <div className="flex gap-3 opacity-60">
            <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-6 h-6 object-contain shrink-0 drop-shadow-sm" alt="ARS" />
            <p className="text-sm text-gray-200 leading-relaxed">
              <span className="font-bold text-[#00E5FF] mr-2">GunnerVic:</span> 
              Are you blind?! He clipped his heel!
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="space-y-4 pt-4 border-t border-white/5 bg-[#050505]">
          
          {/* Reaction Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#121212] border border-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
              <span className="text-lg">🤡</span>
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Waffling</span>
            </button>
            <button className="flex items-center gap-2 bg-[#121212] border border-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors">
              <span className="text-lg">🍳</span>
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Cooking</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#FF7F50] text-black rounded-xl px-4 py-3 hover:bg-[#FF7F50]/90 transition-all font-bold text-xs tracking-widest shadow-[0_0_20px_rgba(255,79,0,0.3)]">
              <Hand className="w-4 h-4 fill-black" />
              REQUEST TO SPEAK
            </button>
          </div>

          {/* Chat Input */}
          <div className="bg-[#121212] rounded-2xl p-2 border border-white/10 flex items-center focus-within:border-[#00E5FF] transition-colors">
            <input 
              type="text" 
              placeholder="Share your take..." 
              className="bg-transparent border-none outline-none text-sm w-full px-4 text-white placeholder:text-gray-600"
            />
            <button className="p-3 hover:bg-white/5 rounded-xl transition-colors">
              <Send className="w-5 h-5 text-[#FF7F50]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
