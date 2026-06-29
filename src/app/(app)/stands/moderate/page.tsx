"use client";

import { useState } from "react";
import { Search, Mic, MicOff, UserPlus, X, BarChart2, Music, Settings, Send, Play, Pause, SkipForward, Volume2, Plus, MonitorUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react"; 

export default function ModerateStandPage() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<'none' | 'poll' | 'music'>('none');
  const [pollDuration, setPollDuration] = useState('5m');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handleAddOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto relative">
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 relative z-20">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="absolute left-0 right-0 flex justify-center items-center pointer-events-none">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
               <span className="text-[10px] font-black text-red-500 tracking-widest uppercase">Live Room</span>
             </div>
          </div>

          <div className="flex items-center gap-4 relative z-20">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#75fbd9]/30 shadow-[0_0_10px_rgba(117, 251, 217,0.2)]">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aye" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-6xl mx-auto mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stage & Requests */}
          <div className="lg:col-span-2 space-y-10">
            {/* Host Stage Section */}
            <section>
              <div className="flex items-center justify-between mb-6 px-1 border-b border-border/50 pb-2">
                <h2 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">HOST STAGE</h2>
              </div>
              
              {showMedia && (
                <div className="mb-8 w-full aspect-video rounded-[2rem] overflow-hidden relative border-2 border-[#75fbd9]/30 shadow-[0_0_50px_rgba(117, 251, 217,0.15)] animate-in fade-in zoom-in duration-500 group">
                  <video 
                    src="https://www.w3schools.com/html/mov_bbb.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                  
                  {/* Top Bar */}
                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 bg-red-500 text-white text-xs font-black tracking-widest uppercase rounded-2xl animate-pulse flex items-center gap-2 shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-white" /> LIVE
                      </div>
                      <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-black tracking-widest rounded-2xl flex items-center gap-2 border border-white/10">
                        <Eye className="w-4 h-4 text-[#75fbd9]" /> 12.4K
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar Twitch Style */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl border-2 border-[#75fbd9] overflow-hidden shadow-lg bg-black">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=JukeMaster" alt="JukeMaster" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-white font-black text-lg shadow-black drop-shadow-md">Tactical Analysis: City vs Arsenal</h3>
                        <p className="text-[#75fbd9] font-bold text-xs tracking-wider uppercase drop-shadow-md">@JukeMaster is sharing screen</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Host Card */}
                <div className="bg-card border border-[#75fbd9]/30 rounded-2xl p-6 flex flex-col items-center shadow-[0_0_30px_rgba(117, 251, 217,0.05)] relative group hover:border-[#75fbd9]/50 transition-colors">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mb-4 border-2 border-[#75fbd9] relative shadow-[0_0_15px_rgba(117, 251, 217,0.2)]">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=JukeMaster" alt="JukeMaster" className="w-full h-full object-cover" />
                    <div className="absolute -bottom-2 -right-2 bg-card rounded-full p-1 border border-border">
                      <Mic className="w-4 h-4 text-[#75fbd9]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-foreground">@JukeMaster</h3>
                  <p className="text-[10px] text-[#75fbd9] mt-1 tracking-wider uppercase font-black">Speaking...</p>
                  
                  <div className="flex items-center gap-2 mt-5 w-full justify-center">
                    <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center border border-white/5 hover:bg-white/10 transition-colors">
                      <MicOff className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Co-Host Card */}
                <div className="bg-card/50 border border-border/50 rounded-2xl p-6 flex flex-col items-center relative group hover:border-border transition-colors">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mb-4 relative opacity-80 group-hover:opacity-100 transition-opacity">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=RefWatch" alt="RefWatch" className="w-full h-full object-cover grayscale" />
                    <div className="absolute -bottom-2 -right-2 bg-card rounded-full p-1 border border-border">
                      <MicOff className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-foreground">@RefWatch</h3>
                  <p className="text-[10px] text-muted-foreground mt-1 tracking-wider uppercase font-black">Co-Host</p>
                  
                  <div className="flex items-center gap-2 mt-5 w-full justify-center">
                    <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center border border-white/5 hover:bg-white/10 transition-colors">
                      <MicOff className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Speak Requests Section */}
            <section>
              <div className="flex items-center justify-between mb-6 px-1 border-b border-border/50 pb-2">
                <h2 className="text-xs font-black tracking-wider text-foreground uppercase tracking-[0.2em]">Speak Requests <span className="text-muted-foreground ml-2">(12)</span></h2>
                <button className="text-[10px] font-black tracking-widest text-muted-foreground uppercase hover:text-foreground transition-colors bg-white/5 px-3 py-1.5 rounded-full">SEE ALL</button>
              </div>
              
              <div className="space-y-3">
                <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-4 flex items-center justify-between group hover:border-[#75fbd9]/30 transition-colors shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-muted border border-border">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=GoalHunter99" alt="GoalHunter99" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-foreground">@GoalHunter99</h3>
                      <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase mt-1 flex items-center gap-1.5">
                        <Eye className="w-3 h-3 text-[#75fbd9]" /> High EAS
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                    <button className="px-5 py-2.5 bg-white text-black font-black text-xs tracking-widest uppercase rounded-2xl hover:bg-[#75fbd9] hover:text-black transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(117, 251, 217,0.4)]">
                      INVITE
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Super Chat Stream */}
          <div className="lg:col-span-1">
            <section className="relative h-full min-h-[400px] bg-card/30 rounded-2xl border border-border/50 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-2 shrink-0">
                <h2 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">SUPER CHAT</h2>
                <div className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black tracking-widest uppercase rounded">LIVE</div>
              </div>
              
              <div className="flex-1 overflow-hidden relative">
                <div className="space-y-4">
                  <div className="bg-card border border-yellow-500/30 rounded-2xl p-5 relative overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.05)] hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] transition-shadow">
                    {/* Highlight strip */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-500 shadow-[0_0_10px_#EAB308]" />
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-yellow-500/20">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Steve" alt="Steve" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs">@SuperFan_Steve</span>
                          <span className="text-[9px] text-muted-foreground font-mono">2m ago</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-black text-xs rounded-2xl">$50.00</span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                      That tackle was absolutely clean! Ref needs glasses 🤦‍♂️
                    </p>
                  </div>
                </div>
                
                {/* Fade out bottom to simulate stream */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card/30 via-card/30 to-transparent pointer-events-none rounded-b-3xl" />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Bottom Tool Bar */}
      <div className="sticky bottom-6 left-0 right-0 p-4 max-w-2xl mx-auto z-40 mt-auto">
        <div className="bg-card/90 border border-white/10 rounded-2xl p-2 flex items-center justify-between gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <button className="flex-1 py-4 px-6 border border-[#FF4500]/50 text-[#FF4500] hover:bg-[#FF4500]/10 hover:border-[#FF4500] rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(255,69,0,0.1)]">
            <MicOff className="w-5 h-5" />
            <span className="text-xs font-black tracking-widest uppercase">MUTE ALL</span>
          </button>
          
          <button 
            onClick={() => setShowMedia(!showMedia)}
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-colors ${showMedia ? 'bg-[#75fbd9]/20 text-[#75fbd9] border border-[#75fbd9]/50 shadow-[0_0_20px_rgba(117, 251, 217,0.2)]' : 'bg-black/40 text-muted-foreground hover:bg-white/10 border border-white/10 hover:text-white'}`}
          >
            <MonitorUp className="w-6 h-6" />
            <span className="text-[9px] font-black tracking-widest uppercase">SHARE</span>
          </button>
          
          <button 
            onClick={() => setActiveModal('poll')}
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-colors ${activeModal === 'poll' ? 'bg-[#75fbd9]/20 text-[#75fbd9] border border-[#75fbd9]/50 shadow-[0_0_20px_rgba(117, 251, 217,0.2)]' : 'bg-black/40 text-muted-foreground hover:bg-white/10 border border-white/10 hover:text-white'}`}
          >
            <BarChart2 className="w-6 h-6" />
            <span className="text-[9px] font-black tracking-widest uppercase">POLLS</span>
          </button>
          
          <button 
            onClick={() => setActiveModal('music')}
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-colors ${activeModal === 'music' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-black/40 text-muted-foreground hover:bg-white/10 border border-white/10 hover:text-white'}`}
          >
            <Music className="w-6 h-6" />
            <span className="text-[9px] font-black tracking-widest uppercase">MUSIC</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {/* Create Poll Modal */}
      {activeModal === 'poll' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="absolute inset-0" onClick={() => setActiveModal('none')} />
          <div className="bg-card border border-border rounded-[2rem] p-8 w-full max-w-md space-y-8 shadow-2xl relative z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#75fbd9]" /> CREATE LIVE POLL
              </h3>
              <div className="w-2 h-2 rounded-full bg-[#75fbd9] animate-pulse shadow-[0_0_10px_rgba(117, 251, 217,0.8)]" />
            </div>
            
            <textarea 
              placeholder="Ask the room..."
              className="w-full bg-transparent border-none text-3xl font-bold placeholder:text-muted-foreground/30 focus:outline-none resize-none"
              rows={2}
            />
            
            <div className="space-y-4">
              {pollOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-4 bg-muted/30 border border-border/50 rounded-2xl px-5 py-4 focus-within:border-[#75fbd9]/50 focus-within:bg-card transition-colors shadow-inner">
                  <span className="text-sm font-black text-muted-foreground/50">{String.fromCharCode(65 + i)}</span>
                  <input 
                    type="text" 
                    placeholder={`Option ${i + 1}`} 
                    value={opt}
                    onChange={(e) => handleUpdateOption(i, e.target.value)}
                    className="w-full bg-transparent text-base font-bold focus:outline-none placeholder:text-muted-foreground/50" 
                  />
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">POLL DURATION</label>
              <div className="flex gap-3">
                {['5m', '10m', '30m', '1h'].map(dur => (
                  <button 
                    key={dur}
                    onClick={() => setPollDuration(dur)}
                    className={`flex-1 py-3 rounded-2xl text-sm font-black transition-all border ${pollDuration === dur ? 'bg-[#75fbd9]/10 text-[#75fbd9] border-[#75fbd9]/50 shadow-[0_0_15px_rgba(117, 251, 217,0.15)]' : 'bg-card text-muted-foreground border-border hover:bg-muted'}`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <button 
                onClick={handleAddOption}
                disabled={pollOptions.length >= 5}
                className="flex items-center gap-2 text-[#75fbd9] font-black text-xs tracking-[0.2em] uppercase hover:text-[#75fbd9]/80 transition-colors disabled:opacity-50 disabled:hover:text-[#75fbd9]"
              >
                <Plus className="w-5 h-5" /> Add Option
              </button>
              
              <button 
                onClick={() => setActiveModal('none')}
                className="w-14 h-14 bg-gradient-to-r from-[#FF4500] to-[#FF7F50] rounded-2xl flex items-center justify-center hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,69,0,0.4)]"
              >
                <Send className="w-6 h-6 text-white ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Music Selector Modal */}
      {activeModal === 'music' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="absolute inset-0" onClick={() => setActiveModal('none')} />
          <div className="bg-card border border-border rounded-[2rem] p-8 w-full max-w-md space-y-8 shadow-2xl relative z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-400" /> BACKGROUND MUSIC
              </h3>
              {isPlayingMusic && <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />}
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">Keep the vibe going while nobody is speaking. Music automatically fades out when someone takes the mic.</p>
            
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 flex flex-col gap-6 shadow-inner">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  <Music className="w-7 h-7 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base text-foreground mb-1">Lo-Fi Stadium Beats</h4>
                  <p className="text-xs font-black tracking-widest text-muted-foreground uppercase">Chill • Instrumental</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-border/50 pt-5">
                <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
                  <Volume2 className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                    className="w-14 h-14 rounded-full bg-purple-500 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  >
                    {isPlayingMusic ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
                    <SkipForward className="w-6 h-6" />
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

