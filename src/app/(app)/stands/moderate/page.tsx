"use client";

import { useState } from "react";
import { Search, Mic, MicOff, UserPlus, X, BarChart2, Music, Settings, Send, Play, Pause, SkipForward, Volume2, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ModerateStandPage() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<'none' | 'poll' | 'music'>('none');
  const [pollDuration, setPollDuration] = useState('5m');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground pb-32">
      {/* Header */}
      <header className="p-4 flex items-center justify-end gap-4 max-w-md mx-auto">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aye" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Host Stage Section */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">HOST STAGE</h2>
            <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-teal uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" /> Live
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Host Card */}
            <div className="bg-card border border-teal/30 rounded-3xl p-4 flex flex-col items-center shadow-[0_0_20px_rgba(0,229,255,0.1)] relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 border-2 border-teal relative">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=JukeMaster" alt="JukeMaster" className="w-full h-full object-cover" />
                <div className="absolute -bottom-2 -right-2 bg-card rounded-full p-1 border border-border">
                  <Mic className="w-3 h-3 text-teal" />
                </div>
              </div>
              <h3 className="font-bold text-sm text-foreground">@JukeMaster</h3>
              <p className="text-[10px] text-muted-foreground mt-1 tracking-wider uppercase">Speaking...</p>
              
              <div className="flex items-center gap-2 mt-4 w-full justify-center">
                <button className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                  <MicOff className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                  <UserPlus className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Co-Host Card */}
            <div className="bg-card border border-border rounded-3xl p-4 flex flex-col items-center relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 relative">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=RefWatch" alt="RefWatch" className="w-full h-full object-cover grayscale opacity-80" />
                <div className="absolute -bottom-2 -right-2 bg-card rounded-full p-1 border border-border">
                  <MicOff className="w-3 h-3 text-red-500" />
                </div>
              </div>
              <h3 className="font-bold text-sm text-foreground">@RefWatch</h3>
              <p className="text-[10px] text-muted-foreground mt-1 tracking-wider uppercase">Co-Host</p>
              
              <div className="flex items-center gap-2 mt-4 w-full justify-center">
                <button className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                  <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Speak Requests Section */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xs font-black tracking-wider text-foreground">Speak Requests <span className="text-muted-foreground">(12)</span></h2>
            <button className="text-[10px] font-black tracking-widest text-muted-foreground uppercase hover:text-foreground transition-colors">SEE ALL</button>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-3 flex items-center justify-between group hover:border-teal/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted border border-border">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=GoalHunter99" alt="GoalHunter99" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">@GoalHunter99</h3>
                <p className="text-[9px] font-black tracking-widest text-muted-foreground uppercase mt-0.5 flex items-center gap-1">
                  <Eye className="w-2.5 h-2.5" /> High EAS
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center border border-white/10 hover:bg-white/10 hover:text-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-white text-black font-black text-[10px] tracking-widest uppercase rounded-xl hover:bg-teal hover:text-black transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                INVITE
              </button>
            </div>
          </div>
        </section>

        {/* Super Chat Stream */}
        <section className="relative">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">SUPER CHAT STREAM</h2>
            <div className="px-2 py-0.5 bg-red-500/20 text-red-500 text-[9px] font-black tracking-widest uppercase rounded">LIVE</div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-card border border-yellow-500/30 rounded-2xl p-4 relative overflow-hidden shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              {/* Highlight strip */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Steve" alt="Steve" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-xs">@SuperFan_Steve</span>
                  <span className="px-1.5 py-0.5 bg-yellow-500 text-black font-black text-[10px] rounded">$50.00</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">2m ago</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                That tackle was absolutely clean! Ref needs glasses 🤦‍♂️
              </p>
            </div>
            
            {/* Fade out bottom to simulate stream */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
          </div>
        </section>
      </main>

      {/* Bottom Tool Bar */}
      <div className="fixed bottom-16 left-0 right-0 p-4 max-w-md mx-auto z-40">
        <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-2 flex items-center justify-between gap-2 shadow-2xl backdrop-blur-xl">
          <button className="flex-1 py-3 px-4 border border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500]/10 rounded-2xl flex items-center justify-center gap-2 transition-colors">
            <MicOff className="w-4 h-4" />
            <span className="text-[10px] font-black tracking-widest uppercase">MUTE ALL</span>
          </button>
          
          <button 
            onClick={() => setActiveModal('poll')}
            className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-colors ${activeModal === 'poll' ? 'bg-teal/20 text-teal border border-teal/30' : 'bg-black/20 text-muted-foreground hover:bg-white/5 border border-white/5'}`}
          >
            <BarChart2 className="w-5 h-5" />
            <span className="text-[8px] font-black tracking-widest uppercase">POLLS</span>
          </button>
          
          <button 
            onClick={() => setActiveModal('music')}
            className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-colors ${activeModal === 'music' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-black/20 text-muted-foreground hover:bg-white/5 border border-white/5'}`}
          >
            <Music className="w-5 h-5" />
            <span className="text-[8px] font-black tracking-widest uppercase">MUSIC</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {/* Create Poll Modal */}
      {activeModal === 'poll' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="absolute inset-0" onClick={() => setActiveModal('none')} />
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 w-full max-w-sm space-y-6 shadow-2xl relative z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-teal" /> CREATE LIVE POLL
              </h3>
              <div className="w-2 h-2 rounded-full bg-teal animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
            </div>
            
            <textarea 
              placeholder="Ask the room..."
              className="w-full bg-transparent border-none text-2xl font-bold placeholder:text-muted-foreground/30 focus:outline-none resize-none"
              rows={2}
            />
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
                <span className="text-xs font-black text-muted-foreground/50">A</span>
                <input type="text" placeholder="Option 1" className="w-full bg-transparent text-sm font-medium focus:outline-none" />
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
                <span className="text-xs font-black text-muted-foreground/50">B</span>
                <input type="text" placeholder="Option 2" className="w-full bg-transparent text-sm font-medium focus:outline-none" />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">POLL DURATION</label>
              <div className="flex gap-2">
                {['5m', '10m', '30m', '1h'].map(dur => (
                  <button 
                    key={dur}
                    onClick={() => setPollDuration(dur)}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-colors border ${pollDuration === dur ? 'bg-teal/10 text-teal border-teal' : 'bg-card text-muted-foreground border-border hover:bg-white/5'}`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <button className="flex items-center gap-2 text-teal font-black text-xs tracking-widest uppercase hover:text-teal/80 transition-colors">
                <Plus className="w-4 h-4" /> Add Option
              </button>
              
              <button 
                onClick={() => setActiveModal('none')}
                className="w-12 h-12 bg-[#FF4500] rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,69,0,0.3)]"
              >
                <Send className="w-5 h-5 text-white ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Music Selector Modal */}
      {activeModal === 'music' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="absolute inset-0" onClick={() => setActiveModal('none')} />
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 w-full max-w-sm space-y-6 shadow-2xl relative z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                <Music className="w-4 h-4 text-purple-400" /> BACKGROUND MUSIC
              </h3>
              {isPlayingMusic && <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />}
            </div>
            
            <p className="text-xs text-muted-foreground">Keep the vibe going while nobody is speaking. Music automatically fades out when someone takes the mic.</p>
            
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Music className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">Lo-Fi Stadium Beats</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Chill • Instrumental</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <button className="text-muted-foreground hover:text-white transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                    className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  >
                    {isPlayingMusic ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>
                  <button className="text-muted-foreground hover:text-white transition-colors">
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Eye icon component missing from lucide imports
function Eye(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
