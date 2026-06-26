"use client";

import { useState, useEffect, useRef } from "react";
import { useParticipants, useLocalParticipant } from "@livekit/components-react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Share2, Mic, MicOff, Hand, Send, MoreHorizontal, Users, Flame, Zap, Loader2, MonitorPlay, ChevronDown, ChevronUp } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import LiveAudioRoom from "@/components/stands/LiveAudioRoom";

function StandRoomLayout({ matchId }: { matchId: string }) {
  const supabase = createClient();
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();

  useEffect(() => {
    const fetchMsgs = async () => {
      const { data } = await supabase.from('stand_messages').select('*, profiles(*)').eq('stand_id', matchId).order('created_at', { ascending: true });
      if (data) {
        setChatMessages(data.map((m: any) => ({
          id: m.id,
          name: m.profiles.username,
          color: "text-[teal]",
          avatar: m.profiles.avatar_url,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: m.message,
          isSpeaker: false
        })));
      }
    };
    fetchMsgs();

    const channel = supabase.channel('stand_chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stand_messages', filter: `stand_id=eq.${matchId}` }, async (payload) => {
        const { data: prof } = await supabase.from('profiles').select('*').eq('id', payload.new.profile_id).single();
        if (prof) {
          setChatMessages(prev => [...prev, {
            id: payload.new.id,
            name: prof.username,
            color: "text-[teal]",
            avatar: prof.avatar_url,
            time: new Date(payload.new.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: payload.new.message,
            isSpeaker: false
          }]);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [matchId, supabase]);

  const [mutedUsers, setMutedUsers] = useState<Record<string, boolean>>({});
  const [floatingEmojis, setFloatingEmojis] = useState<{id: number, emoji: string, left: number}[]>([]);
  const [inputText, setInputText] = useState("");
  const [isMicPending, setIsMicPending] = useState(false);
  
  const lastChatScrollY = useRef(0);
  const handleChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (currentScrollY > lastChatScrollY.current && currentScrollY > 20) {
      window.dispatchEvent(new CustomEvent('hide-nav'));
    } else if (currentScrollY < lastChatScrollY.current) {
      window.dispatchEvent(new CustomEvent('show-nav'));
    }
    lastChatScrollY.current = currentScrollY;
  };

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      name: "Gooner4Life",
      color: "text-[teal]",
      avatar: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      time: "1m ago",
      text: "Absolute shocker from the VAR there. Clear penalty! We are being robbed in broad daylight.",
      isSpeaker: false
    },
    {
      id: 2,
      name: "BlueMason",
      color: "text-[coral]",
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
      color: "text-[coral]",
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
        <div className={`${speakerClass} overflow-hidden border-2 ${mutedUsers['GOONER4LIFE'] ? 'border-border' : 'border-[coral] shadow-[0_0_20px_rgba(255,59,0,0.4)]'} group cursor-pointer transition-all duration-500 hover:scale-[1.02]`} onClick={() => toggleMute('GOONER4LIFE')}>
          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${mutedUsers['GOONER4LIFE'] ? 'grayscale opacity-50' : 'opacity-100'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
          {!mutedUsers['GOONER4LIFE'] && <div className="absolute inset-0 border-2 border-[coral]/40 rounded-xl animate-pulse pointer-events-none" />}
          
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
            <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['GOONER4LIFE'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[coral]/90 backdrop-blur shadow-[0_0_15px_rgba(255,59,0,0.5)]'} flex items-center justify-center`}>
              {mutedUsers['GOONER4LIFE'] ? <MicOff className="w-3 h-3 text-foreground" /> : <Mic className="w-3 h-3 text-black" />}
            </div>
          </div>
          
          <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
             <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${mutedUsers['GOONER4LIFE'] ? 'bg-red-500' : 'bg-[coral] animate-pulse'} shadow-lg`} />
             <span className={`text-[9px] md:text-sm font-black ${mutedUsers['GOONER4LIFE'] ? 'text-gray-300' : 'text-foreground'} drop-shadow-md truncate`}>GOONER4LIFE</span>
          </div>
        </div>

        {/* Speaker 2: Muted */}
        <div className={`${speakerClass} overflow-hidden border-2 ${mutedUsers['BLUEMASON'] ? 'border-border' : 'border-white/20 hover:border-white/40'} group cursor-pointer transition-all duration-500 hover:scale-[1.02]`} onClick={() => toggleMute('BLUEMASON')}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${mutedUsers['BLUEMASON'] ? 'grayscale opacity-50' : 'opacity-80 group-hover:opacity-100'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
          
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
            <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['BLUEMASON'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#222]/80 backdrop-blur border border-border'} flex items-center justify-center`}>
              <MicOff className={`w-3 h-3 ${mutedUsers['BLUEMASON'] ? 'text-foreground' : 'text-muted-foreground'}`} />
            </div>
          </div>
          
          <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
             <span className={`text-[9px] md:text-sm font-bold ${mutedUsers['BLUEMASON'] ? 'text-muted-foreground' : 'text-foreground'} drop-shadow-md truncate`}>BLUEMASON</span>
          </div>
        </div>

        {/* Speaker 3: Muted */}
        <div className={`${speakerClass} overflow-hidden border-2 ${mutedUsers['SPURSY_10'] ? 'border-border' : 'border-white/20 hover:border-white/40'} group cursor-pointer transition-all duration-500 hover:scale-[1.02]`} onClick={() => toggleMute('SPURSY_10')}>
          <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${mutedUsers['SPURSY_10'] ? 'grayscale opacity-50' : 'opacity-80 group-hover:opacity-100'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
            <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['SPURSY_10'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[#222]/80 backdrop-blur border border-border'} flex items-center justify-center`}>
              <MicOff className={`w-3 h-3 ${mutedUsers['SPURSY_10'] ? 'text-foreground' : 'text-muted-foreground'}`} />
            </div>
          </div>
          
          <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
             <span className={`text-[9px] md:text-sm font-bold ${mutedUsers['SPURSY_10'] ? 'text-muted-foreground' : 'text-foreground'} drop-shadow-md truncate`}>SPURSY_10</span>
          </div>
        </div>

        {/* Speaker 4: Empty Slot */}
        <div className={`${speakerClass} border-2 border-dashed border-border bg-card text-card-foreground/5 dark:bg-white/5 flex items-center justify-center transition-colors hover:bg-card text-card-foreground/10 dark:bg-white/10 cursor-pointer`}>
          <MoreHorizontal className="w-6 h-6 text-foreground/20" />
        </div>

        {/* Speaker 5: Active Mic, Non-Speaking */}
        <div className={`${speakerClass} overflow-hidden border-2 ${mutedUsers['GUNNERVIC'] ? 'border-border' : 'border-[coral] shadow-[0_0_20px_rgba(255,59,0,0.2)]'} group cursor-pointer transition-all duration-500 hover:scale-[1.02]`} onClick={() => toggleMute('GUNNERVIC')}>
          <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=400&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${mutedUsers['GUNNERVIC'] ? 'grayscale opacity-50' : 'opacity-100'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
            <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${mutedUsers['GUNNERVIC'] ? 'bg-red-500/80 backdrop-blur' : 'bg-[coral]/90 backdrop-blur shadow-[0_0_15px_rgba(255,59,0,0.4)]'} flex items-center justify-center`}>
              {mutedUsers['GUNNERVIC'] ? <MicOff className="w-3 h-3 text-foreground" /> : <Mic className="w-3 h-3 text-black" />}
            </div>
          </div>
          
          <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
             <span className={`text-[9px] md:text-sm font-bold ${mutedUsers['GUNNERVIC'] ? 'text-muted-foreground' : 'text-foreground'} drop-shadow-md truncate`}>GUNNERVIC</span>
          </div>
        </div>

        {/* Speaker 6: Empty Slot */}
        <div className={`${speakerClass} border-2 border-dashed border-border bg-card text-card-foreground/5 dark:bg-white/5 flex items-center justify-center transition-colors hover:bg-card text-card-foreground/10 dark:bg-white/10 cursor-pointer`}>
          <MoreHorizontal className="w-6 h-6 text-foreground/20" />
        </div>
      </>
    );
  };

  return (
    <div className="flex-1 w-full md:max-w-[1600px] md:mx-auto text-foreground flex flex-col xl:flex-row bg-background overflow-hidden">
      
      {/* Custom Animations CSS */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0px) scale(0.5); opacity: 0; }
          15% { transform: translateY(-50px) scale(1.5); opacity: 1; }
          100% { transform: translateY(-400px) scale(1); opacity: 0; }
        }
        .animate-float {
          animation: floatUp 2.5s ease-out forwards;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
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
      <div className="flex-none xl:flex-1 overflow-y-auto hide-scrollbar flex flex-col relative z-10 bg-background xl:p-8">
        
        {/* Info Section (Premium Header) */}
        <div className="px-3 py-2 md:px-6 md:py-4 relative overflow-hidden bg-card text-card-foreground/5 dark:bg-white/5 border-b xl:border border-border xl:rounded-2xl flex flex-col gap-2 shrink-0 backdrop-blur-md z-20">
          {/* Subtle glowing orbs behind the header */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[teal]/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[coral]/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <BackButton containerClassName="p-2 hover:bg-card text-card-foreground/10 dark:bg-white/10 rounded-full transition-colors group bg-card text-card-foreground/40 border border-border backdrop-blur" iconClassName="w-5 h-5 text-foreground" />
              <div className="flex flex-col justify-center">
                 <div className="flex items-center">
                   <div className="flex -space-x-3">
                     <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full border-2 border-[#0A0A0A] p-0.5 shadow-lg relative z-10" />
                     <img src="https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full border-2 border-[#0A0A0A] p-0.5 shadow-lg relative z-0" />
                   </div>
                 </div>
              </div>
            </div>
            
            {/* Scrolling Title */}
            <div className="flex-1 overflow-hidden mx-2 md:mx-4 flex items-center" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              <div className="whitespace-nowrap animate-marquee pl-[100%] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 tracking-widest text-[10px] md:text-sm uppercase">
                Arsenal vs Tottenham Hotspur • Live Post-Match Debate
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <button 
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className={`flex px-3 py-1.5 rounded-full border items-center gap-1.5 transition-colors shadow-lg backdrop-blur ${isVideoPlaying ? 'bg-[teal]/20 border-[teal]/50 text-[teal]' : 'bg-card text-card-foreground/5 dark:bg-white/5 border-border hover:bg-card text-card-foreground/10 dark:bg-white/10 text-foreground'}`}
              >
                <MonitorPlay className="w-3.5 h-3.5" />
                <span className="text-[10px] md:text-xs font-black tracking-widest hidden md:block">MEDIA</span>
              </button>
              <div className="flex px-3 py-1.5 rounded-full border border-[coral]/40 bg-[coral]/10 items-center gap-1.5 shadow-[0_0_15px_rgba(255,59,0,0.3)] backdrop-blur">
                <Flame className="w-3.5 h-3.5 text-[coral] animate-pulse" />
                <span className="text-[10px] md:text-xs font-black text-[coral] tracking-widest">4.2K</span>
              </div>
              <button className="p-2 bg-card text-card-foreground/40 border border-border hover:bg-card text-card-foreground/10 dark:bg-white/10 rounded-full transition-colors text-foreground backdrop-blur">
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Container to center stage on desktop */}
        <div className="w-full flex flex-col xl:m-auto xl:max-w-6xl mt-4 xl:mt-auto">
          
          {isVideoPlaying ? (
            <div className="w-full flex flex-row xl:flex-col gap-2 md:gap-4 px-2 xl:px-0">
              {/* The Video Area */}
              <div className="flex-1 xl:flex-none xl:w-full aspect-video bg-card text-card-foreground relative overflow-hidden rounded-xl xl:rounded-2xl shadow-2xl border-b xl:border border-border shrink-0 group">
                <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2 md:p-6 pointer-events-none">
                  <h2 className="text-[10px] md:text-3xl font-black text-foreground drop-shadow-lg mb-0.5 md:mb-2 leading-tight">Arteta's Post-Match Interview</h2>
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[teal] w-1/3" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-card text-card-foreground/50 backdrop-blur border border-white/20 flex items-center justify-center">
                    <MonitorPlay className="w-3 h-3 md:w-6 md:h-6 text-foreground" />
                  </div>
                </div>
              </div>

              {/* The Speakers Area (Fixed width perfectly hugging the avatars) */}
              <div className="w-14 md:w-16 xl:w-full relative shrink-0">
                <div className="absolute inset-0 xl:relative xl:inset-auto xl:w-full overflow-y-auto xl:overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex flex-col items-center xl:flex-row gap-1 md:gap-2">
                    {renderSpeakers(true)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-24 md:h-auto md:aspect-video relative bg-card text-card-foreground overflow-hidden flex flex-col xl:rounded-2xl shadow-2xl xl:w-auto xl:aspect-video border-b xl:border border-border shrink-0">
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

      {/* Right Pane: Live Chat & Polls */}
      <div className="flex-1 xl:h-full xl:w-[400px] 2xl:w-[480px] bg-[#0A0A0A] flex flex-col border-t xl:border-t-0 xl:border-l border-border shrink-0 relative z-20 overflow-hidden">
        
        {/* Poll Pop-up (Top of Chat) */}
        <div className="p-4 bg-gradient-to-b from-[#050505] to-transparent relative z-10 shrink-0">
          <div className="bg-card text-card-foreground/5 dark:bg-white/5 border border-border rounded-xl p-4 backdrop-blur-md relative overflow-hidden shadow-lg group hover:border-white/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[teal]/10 rounded-full blur-[30px] pointer-events-none group-hover:bg-[teal]/20 transition-all duration-500" />
            
            <div 
              className="flex items-center justify-between cursor-pointer group/toggle"
              onClick={() => setIsPollExpanded(!isPollExpanded)}
            >
              <div className="flex items-center gap-1.5 relative">
                <Zap className="w-4 h-4 text-[teal]" />
                <h3 className="text-sm font-black text-foreground group-hover/toggle:text-[teal] transition-colors">Live Poll</h3>
                {!hasVoted && (
                  <div className="flex items-center justify-center w-4 h-4 bg-[coral] rounded-full text-[9px] font-black text-foreground shadow-[0_0_10px_rgba(255,59,0,0.5)] animate-bounce ml-0.5">
                    1
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-muted-foreground bg-card text-card-foreground/5 dark:bg-white/5 px-2 py-0.5 rounded-full border border-border">1m 24s left</span>
                {isPollExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground group-hover/toggle:text-foreground transition-colors" />}
              </div>
            </div>
            
            <div className={`transition-all duration-500 overflow-hidden ${isPollExpanded ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <p className="text-gray-300 text-xs font-medium mb-4">Was it a clear penalty on Saka?</p>
              
              <div className="space-y-3">
                {/* Option 1 */}
                <div 
                  onClick={() => handleVote('yes')}
                  className={`relative h-8 rounded-lg bg-card text-card-foreground/40 border overflow-hidden transition-colors ${hasVoted ? 'cursor-default border-border' : 'cursor-pointer border-border hover:border-[teal]/50'}`}
                >
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[teal]/40 to-[teal]/20 transition-all duration-1000" style={{ width: `${yesPercentage}%` }} />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-xs font-bold text-foreground z-10 drop-shadow-md">Yes, clear foul</span>
                    <span className="text-[10px] font-black text-[teal] z-10 drop-shadow-md">{yesPercentage}%</span>
                  </div>
                </div>
                
                {/* Option 2 */}
                <div 
                  onClick={() => handleVote('no')}
                  className={`relative h-8 rounded-lg bg-card text-card-foreground/40 border overflow-hidden transition-colors ${hasVoted ? 'cursor-default border-border' : 'cursor-pointer border-border hover:border-[coral]/50'}`}
                >
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[coral]/40 to-[coral]/20 transition-all duration-1000" style={{ width: `${noPercentage}%` }} />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-xs font-bold text-foreground z-10 drop-shadow-md">No, he dove</span>
                    <span className="text-[10px] font-black text-[coral] z-10 drop-shadow-md">{noPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 px-4 md:px-6 pb-4 md:pb-6 relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A]" onScroll={handleChatScroll}>
          {chatMessages.map((msg) => (
            <div key={msg.id} className="flex gap-2 md:gap-3 group">
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center shrink-0 border ${msg.isSpeaker ? 'border-[#00C853] shadow-[0_0_15px_rgba(0,200,83,0.4)]' : 'border-white/20'} p-0.5 md:p-1 mt-0.5 transition-transform duration-300 group-hover:scale-110`}>
                <img src={msg.avatar} className="w-full h-full object-contain" alt="avatar" />
              </div>
              <div className={`${msg.isSpeaker ? 'bg-gradient-to-br from-[#00C853]/10 to-[#00C853]/5 border-[#00C853]/30 shadow-[0_4px_20px_rgba(0,200,83,0.1)]' : 'bg-card text-card-foreground/5 dark:bg-white/5 border-border hover:bg-card text-card-foreground/10 dark:bg-white/10'} p-2 md:p-3 rounded-2xl rounded-tl-none border backdrop-blur-sm transition-colors flex-1`}>
                <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                  <span className={`font-black ${msg.color} text-[10px] md:text-xs tracking-wider drop-shadow-sm`}>{msg.name}</span>
                  <span className={`text-[8px] md:text-[9px] ${msg.isSpeaker ? 'text-[#00C853]/60' : 'text-muted-foreground/80'} font-bold`}>{msg.time}</span>
                </div>
                <p className={`text-xs md:text-sm ${msg.isSpeaker ? 'text-foreground' : 'text-gray-300'} leading-snug md:leading-relaxed font-medium`}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="p-2 md:p-4 border-t border-border bg-card text-card-foreground/80 backdrop-blur-xl space-y-2 md:space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] relative z-30">
          
          {/* Reaction Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => spawnEmoji('🤡')}
              className="flex-1 flex flex-col items-center justify-center gap-0 md:gap-1 bg-card text-card-foreground/5 dark:bg-white/5 border border-border rounded-xl py-1 md:py-3 hover:bg-card text-card-foreground/10 dark:bg-white/10 hover:border-white/20 hover:-translate-y-1 active:scale-95 transition-all shadow-lg"
            >
              <span className="text-xl md:text-2xl drop-shadow-md">🤡</span>
              <span className="text-[8px] md:text-[9px] font-black text-muted-foreground tracking-widest uppercase">Waffling</span>
            </button>
            <button 
              onClick={() => spawnEmoji('🍳')}
              className="flex-1 flex flex-col items-center justify-center gap-0 md:gap-1 bg-card text-card-foreground/5 dark:bg-white/5 border border-border rounded-xl py-1 md:py-3 hover:bg-card text-card-foreground/10 dark:bg-white/10 hover:border-white/20 hover:-translate-y-1 active:scale-95 transition-all shadow-lg"
            >
              <span className="text-xl md:text-2xl drop-shadow-md">🍳</span>
              <span className="text-[8px] md:text-[9px] font-black text-muted-foreground tracking-widest uppercase">Cooking</span>
            </button>
            <button 
              onClick={() => setIsMicPending(true)}
              disabled={isMicPending}
              className={`flex-[2] flex flex-col items-center justify-center gap-0 md:gap-1 rounded-xl py-1 md:py-3 hover:scale-[1.02] active:scale-95 transition-all font-black cursor-pointer ${
                isMicPending 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-muted-foreground border border-border shadow-inner' 
                  : 'bg-gradient-to-br from-[coral] to-[coral] text-black shadow-[0_0_20px_rgba(255,127,80,0.4)] hover:shadow-[0_0_30px_rgba(255,127,80,0.6)] border border-[coral]/50'
              }`}
            >
              {isMicPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Hand className="w-5 h-5 fill-black drop-shadow-sm" />}
              <span className="text-[10px] tracking-widest uppercase">{isMicPending ? 'Pending' : 'Request Mic'}</span>
            </button>
          </div>

          {/* Chat Input Form */}
          <form 
            onSubmit={handleSendMessage}
            className="bg-[#0A0A0A] rounded-full p-1 border border-border flex items-center focus-within:border-[teal] focus-within:shadow-[0_0_20px_rgba(0,229,255,0.15)] focus-within:bg-[#111] transition-all shadow-inner relative z-20 group"
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 ml-1 overflow-hidden border border-border shrink-0 group-focus-within:border-[teal]/50 transition-colors">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="User" />
            </div>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Join the conversation..." 
              className="bg-transparent border-none outline-none text-[16px] md:text-sm w-full px-4 text-foreground placeholder:text-gray-600 font-medium"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl transition-all mr-0.5 border ${
                inputText.trim() 
                  ? 'bg-[teal] hover:bg-[teal]/90 border-[teal] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:scale-105' 
                  : 'bg-card text-card-foreground/5 dark:bg-white/5 border-border text-muted-foreground/80'
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


export default function ActiveStandPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || "default";

  return (
    <LiveAudioRoom roomName={id} username={`User_${Math.floor(Math.random() * 1000)}`}>
      <StandRoomLayout matchId={id} />
    </LiveAudioRoom>
  );
}
