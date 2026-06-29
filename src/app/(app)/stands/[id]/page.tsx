
"use client";

import { useState, useEffect, useRef } from "react";
import { useParticipants, useLocalParticipant, useIsSpeaking } from "@livekit/components-react";
import type { Participant } from "livekit-client";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Share2, Mic, MicOff, Hand, Send, MoreHorizontal, Users, Flame, Zap, Loader2, MonitorPlay, ChevronDown, ChevronUp, Activity } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import LiveAudioRoom from "@/components/stands/LiveAudioRoom";
import { matchService } from '@/services/matchService';
import { Match } from '@/types/match';

function SpeakerTile({ participant, speakerClass }: { participant: Participant, speakerClass: string }) {
  const isSpeaking = useIsSpeaking(participant);
  const isMuted = !participant.isMicrophoneEnabled;
  const username = participant.identity;

  return (
    <div className={`${speakerClass} overflow-hidden border-2 ${isMuted ? 'border-border' : isSpeaking ? 'border-[coral] shadow-[0_0_20px_rgba(255,59,0,0.4)]' : 'border-border-strong hover:border-white/40'} group cursor-pointer transition-all duration-500 hover:scale-[1.02]`}>
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isMuted ? 'grayscale opacity-50' : 'opacity-100'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
      {isSpeaking && !isMuted && <div className="absolute inset-0 border-2 border-[coral]/40 rounded-2xl animate-pulse pointer-events-none" />}
      
      <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3">
        <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full ${isMuted ? 'bg-red-500/80 backdrop-blur' : isSpeaking ? 'bg-[coral]/90 backdrop-blur shadow-[0_0_15px_rgba(255,59,0,0.5)]' : 'bg-[#222]/80 backdrop-blur border border-border'} flex items-center justify-center`}>
          {isMuted ? <MicOff className="w-3 h-3 text-foreground" /> : <Mic className={`w-3 h-3 ${isSpeaking ? 'text-black' : 'text-muted-foreground'}`} />}
        </div>
      </div>
      
      <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 flex items-center gap-1.5">
         <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isMuted ? 'bg-red-500' : 'bg-[coral] animate-pulse'} shadow-lg`} />
         <span className={`text-[9px] md:text-sm font-black ${isMuted ? 'text-gray-300' : 'text-foreground'} drop-shadow-md truncate`}>{username}</span>
      </div>
    </div>
  );
}

function StandRoomLayout({ matchId }: { matchId: string }) {
  const [matchInfo, setMatchInfo] = useState<Match | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      const match = await matchService.getMatchById(Number(matchId));
      if (match) setMatchInfo(match);
    };
    fetchMatch();
  }, [matchId]);

  const supabase = createClient();

  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setCurrentUser(data.user);
    });
  }, [supabase]);

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

  const toggleMic = async () => {
    if (!localParticipant) return;
    try {
      setIsMicPending(true);
      const isEnabled = localParticipant.isMicrophoneEnabled;
      await localParticipant.setMicrophoneEnabled(!isEnabled);
    } catch (e) {
      console.error("Failed to toggle mic", e);
    } finally {
      setIsMicPending(false);
    }
  };
  
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

  const messagesEndRef = useRef<HTMLDivElement>(null);



  const [chatMessages, setChatMessages] = useState([
    ...Array(15).fill(0).flatMap((_, i) => [
      {
        id: i * 2 + 1,
        name: "Gooner4Life",
        color: "text-[teal]",
        avatar: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        time: "1m ago",
        text: "Absolute shocker from the VAR there. Clear penalty! We are being robbed in broad daylight.",
        isSpeaker: false
      },
      {
        id: i * 2 + 2,
        name: "BlueMason",
        color: "text-[coral]",
        avatar: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
        time: "Just now",
        text: "Never a pen. He dove before the contact even happened. 🤡 Have some shame!",
        isSpeaker: false
      }
    ])
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

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    if (!currentUser) {
      alert("You must be logged in to chat.");
      return;
    }

    const text = inputText.trim();
    setInputText("");

    const { error } = await supabase.from('stand_messages').insert([{
      stand_id: matchId,
      profile_id: currentUser.id,
      message: text
    }]);

    if (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderSpeakers = (isMediaMode: boolean) => {
    const speakerClass = isMediaMode 
      ? "relative w-14 h-14 md:w-24 md:h-24 md:w-32 md:h-32 shrink-0 rounded-2xl xl:rounded-2xl" 
      : "relative aspect-square h-full md:w-full md:h-full md:aspect-auto shrink-0 min-h-0 rounded-2xl";

    const paddedParticipants = [...participants];
    const slots = [];
    
    for (let i = 0; i < 6; i++) {
      if (i < paddedParticipants.length) {
        slots.push(<SpeakerTile key={paddedParticipants[i].identity} participant={paddedParticipants[i]} speakerClass={speakerClass} />);
      } else {
        slots.push(
          <div key={`empty-${i}`} className={`${speakerClass} border-2 border-dashed border-border bg-card text-card-foreground/5 dark:bg-muted flex items-center justify-center transition-colors hover:bg-card text-card-foreground/10 dark:bg-muted/80 cursor-pointer`}>
            <MoreHorizontal className="w-6 h-6 text-foreground/20" />
          </div>
        );
      }
    }

    return <>{slots}</>;
  };

  const renderPoll = () => (
    <div className="p-3 md:p-4 bg-gradient-to-b from-[#050505] to-transparent shrink-0">
      <div className="bg-card text-card-foreground/5 dark:bg-muted border border-border rounded-2xl p-3 md:p-4 backdrop-blur-md relative overflow-hidden shadow-lg group hover:border-border-strong transition-all duration-300">
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
            <span className="text-[9px] font-bold text-muted-foreground bg-card text-card-foreground/5 dark:bg-muted px-2 py-0.5 rounded-full border border-border">1m 24s left</span>
            {isPollExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground group-hover/toggle:text-foreground transition-colors" />}
          </div>
        </div>
        
        <div className={`transition-all duration-500 overflow-hidden ${isPollExpanded ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <p className="text-gray-300 text-xs font-medium mb-4">Was it a clear penalty on Saka?</p>
          
          <div className="space-y-3">
            <div 
              onClick={() => handleVote('yes')}
              className={`relative h-8 rounded-2xl bg-card text-card-foreground/40 border overflow-hidden transition-colors ${hasVoted ? 'cursor-default border-border' : 'cursor-pointer border-border hover:border-[teal]/50'}`}
            >
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[teal]/40 to-[teal]/20 transition-all duration-1000" style={{ width: `${yesPercentage}%` }} />
              <div className="absolute inset-0 flex items-center justify-between px-3">
                <span className="text-xs font-bold text-foreground z-10 drop-shadow-md">Yes, clear foul</span>
                <span className="text-[10px] font-black text-[teal] z-10 drop-shadow-md">{yesPercentage}%</span>
              </div>
            </div>
            <div 
              onClick={() => handleVote('no')}
              className={`relative h-8 rounded-2xl bg-card text-card-foreground/40 border overflow-hidden transition-colors ${hasVoted ? 'cursor-default border-border' : 'cursor-pointer border-border hover:border-[coral]/50'}`}
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
  );

  return (
    <div className="flex-1 min-h-0 w-full md:max-w-[1600px] md:mx-auto text-foreground flex flex-col md:flex-row bg-background overflow-hidden relative">
      
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

      {!matchInfo ? (
        <div className="flex-1 w-full min-h-screen bg-black flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
             <Activity className="w-8 h-8 text-[coral] mb-4 animate-bounce" />
             <p className="text-white font-mono uppercase tracking-widest text-xs">Loading Stand...</p>
          </div>
        </div>
      ) : (
      <>
        {/* MOBILE LAYOUT */}
        <div className="flex-1 min-h-0 md:hidden flex flex-col overflow-hidden bg-black/90 relative z-10 border-b border-border shadow-2xl w-full">

        {/* Stage on mobile */}
        <div className="shrink-0 flex flex-col bg-background px-3 pb-3 border-b border-border z-10">
          <div className="px-3 py-2 relative overflow-hidden bg-card text-card-foreground/5 dark:bg-muted border border-border rounded-2xl flex flex-col gap-2 shrink-0 backdrop-blur-md mb-3">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 shrink-0">
                <BackButton containerClassName="p-2 hover:bg-card text-card-foreground/10 rounded-full transition-colors group bg-card text-card-foreground/40 border border-border backdrop-blur" iconClassName="w-4 h-4 text-foreground" />
                <div className="flex -space-x-3">
                  <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"} className={`w-7 h-7 bg-white rounded-full border-2 border-[#0A0A0A] p-0.5 shadow-lg relative z-10 ${matchInfo?.logo1?.includes('black') ? 'invert' : ''}`} />
                  <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg"} className={`w-7 h-7 bg-white rounded-full border-2 border-[#0A0A0A] p-0.5 shadow-lg relative z-0 ${matchInfo?.logo2?.includes('black') ? 'invert' : ''}`} />
                </div>
              </div>
              <div className="flex-1 overflow-hidden mx-2 flex items-center" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <div className="whitespace-nowrap animate-marquee pl-[100%] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 tracking-widest text-[10px] uppercase">
                  {matchInfo ? `${matchInfo.team1} vs ${matchInfo.team2} • Live` : 'Arsenal vs Tottenham Hotspur • Live'}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setIsVideoPlaying(!isVideoPlaying)} className={`flex px-2.5 py-1 rounded-full border items-center gap-1 transition-colors shadow-lg backdrop-blur ${isVideoPlaying ? 'bg-[teal]/20 border-[teal]/50 text-[teal]' : 'bg-card text-card-foreground/5 border-border text-foreground'}`}>
                  <MonitorPlay className="w-3.5 h-3.5" />
                </button>
                <div className="flex px-2.5 py-1 rounded-full border border-[coral]/40 bg-[coral]/10 items-center gap-1 shadow-[0_0_15px_rgba(255,59,0,0.3)] backdrop-blur">
                  <Flame className="w-3.5 h-3.5 text-[coral] animate-pulse" />
                  <span className="text-[10px] font-black text-[coral] tracking-widest">4.2K</span>
                </div>
              </div>
            </div>
          </div>
          
          {isVideoPlaying ? (
            <div className="w-full flex flex-row gap-2">
              <div className="flex-1 aspect-video bg-card relative overflow-hidden rounded-2xl shadow-lg border border-border group">
                <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-card/50 backdrop-blur border border-border-strong flex items-center justify-center">
                    <MonitorPlay className="w-3 h-3 text-foreground" />
                  </div>
                </div>
              </div>
              <div className="w-14 relative shrink-0">
                <div className="absolute inset-0 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex flex-col gap-1 items-center">
                    {renderSpeakers(true)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-20 relative bg-card overflow-hidden flex rounded-2xl shadow-lg border border-border shrink-0">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/20 via-[#020202]/80 to-[#001C58]/20" />
              </div>
              <div className="relative z-10 flex-1 flex flex-row items-center overflow-x-auto gap-1.5 p-1.5 h-full w-full scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {renderSpeakers(false)}
              </div>
            </div>
          )}
        </div>

        {/* Poll below stage on mobile */}
        {renderPoll()}

        {/* Chat Feed on mobile */}
        <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col-reverse relative bg-gradient-to-b from-transparent via-[#050505] to-[#0A0A0A] px-3 pb-4 pt-4 gap-4" onScroll={handleChatScroll}>
          <div ref={messagesEndRef} />
          {[...chatMessages].reverse().map((msg) => (
            <div key={msg.id} className="flex gap-2 group">
              <div className={`w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 border ${msg.isSpeaker ? 'border-[#00C853] shadow-[0_0_15px_rgba(0,200,83,0.4)]' : 'border-border-strong'} p-0.5 mt-0.5`}>
                <img src={msg.avatar} className="w-full h-full object-contain" alt="avatar" />
              </div>
              <div className={`${msg.isSpeaker ? 'bg-gradient-to-br from-[#00C853]/10 to-[#00C853]/5 border-[#00C853]/30' : 'bg-card text-card-foreground/5 dark:bg-muted border-border'} p-2 rounded-2xl rounded-tl-none border backdrop-blur-sm flex-1`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`font-black ${msg.color} text-[10px] tracking-wider drop-shadow-sm`}>{msg.name}</span>
                  <span className={`text-[8px] ${msg.isSpeaker ? 'text-[#00C853]/60' : 'text-muted-foreground/80'} font-bold`}>{msg.time}</span>
                </div>
                <p className={`text-xs ${msg.isSpeaker ? 'text-foreground' : 'text-gray-300'} leading-snug font-medium`}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Action Bar on mobile */}
        <div className="shrink-0 p-2 border-t border-border bg-card text-card-foreground/80 backdrop-blur-xl space-y-2 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-30" style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + 8px)` }}>
          <div className="flex gap-2">
            <button onClick={() => spawnEmoji('🤡')} className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-card text-card-foreground/5 border border-border rounded-2xl py-1 transition-all">
              <span className="text-xl">🤡</span>
              <span className="text-[8px] font-black text-muted-foreground tracking-widest uppercase">Waffling</span>
            </button>
            <button onClick={() => spawnEmoji('🍳')} className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-card text-card-foreground/5 border border-border rounded-2xl py-1 transition-all">
              <span className="text-xl">🍳</span>
              <span className="text-[8px] font-black text-muted-foreground tracking-widest uppercase">Cooking</span>
            </button>
            <button onClick={toggleMic} disabled={isMicPending} className={`flex-[2] flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1 font-black transition-colors ${localParticipant?.isMicrophoneEnabled ? 'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-inner border border-red-500/50' : isMicPending ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-muted-foreground border border-border shadow-inner' : 'bg-gradient-to-br from-[coral] to-[coral] text-black shadow-[0_0_20px_rgba(255,127,80,0.4)] border border-[coral]/50'}`}>
              {isMicPending ? <Loader2 className="w-4 h-4 animate-spin" /> : (localParticipant?.isMicrophoneEnabled ? <MicOff className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4 fill-black" />)}
              <span className="text-[9px] tracking-widest uppercase">{isMicPending ? 'Pending' : (localParticipant?.isMicrophoneEnabled ? 'Mute Mic' : 'Request Mic')}</span>
            </button>
          </div>
          <form onSubmit={handleSendMessage} className="bg-card text-card-foreground rounded-full p-1 border border-border flex items-center relative z-20">
            <div className="w-7 h-7 rounded-full bg-gray-800 ml-1 overflow-hidden shrink-0">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="User" />
            </div>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Join the conversation..." className="bg-transparent border-none outline-none text-[15px] w-full px-3 text-foreground placeholder:text-gray-600 font-medium" />
            <button type="submit" disabled={!inputText.trim()} className={`w-8 h-8 flex items-center justify-center rounded-2xl transition-all mr-0.5 border ${inputText.trim() ? 'bg-[teal] border-[teal] text-black' : 'bg-card text-card-foreground/5 border-border text-muted-foreground/80'}`}>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
      
      {/* DESKTOP LAYOUT (unchanged functionally, just isolated in md:flex block) */}
      <div className="hidden md:flex flex-1 w-full h-full overflow-hidden">
        {/* Left Pane: The Stage */}
        <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col relative z-10 bg-background p-8 shrink-0">
          <div className="px-6 py-4 relative overflow-hidden bg-card text-card-foreground/5 dark:bg-muted border border-border rounded-2xl flex flex-col gap-2 shrink-0 backdrop-blur-md z-20">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[teal]/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[coral]/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3 shrink-0">
                <BackButton containerClassName="p-2 hover:bg-card text-card-foreground/10 rounded-full transition-colors group bg-card text-card-foreground/40 border border-border backdrop-blur" iconClassName="w-5 h-5 text-foreground" />
                <div className="flex flex-col justify-center">
                   <div className="flex items-center">
                     <div className="flex -space-x-3">
                       <img src={matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"} className={`w-10 h-10 bg-white rounded-full border-2 border-[#0A0A0A] p-0.5 shadow-lg relative z-10 ${matchInfo?.logo1?.includes('black') ? 'invert' : ''}`} />
                       <img src={matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg"} className={`w-10 h-10 bg-white rounded-full border-2 border-[#0A0A0A] p-0.5 shadow-lg relative z-0 ${matchInfo?.logo2?.includes('black') ? 'invert' : ''}`} />
                     </div>
                   </div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden mx-4 flex items-center" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <div className="whitespace-nowrap animate-marquee pl-[100%] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 tracking-widest text-sm uppercase">
                  {matchInfo ? `${matchInfo.team1} vs ${matchInfo.team2} • Live Post-Match Debate` : 'Arsenal vs Tottenham Hotspur • Live Post-Match Debate'}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => setIsVideoPlaying(!isVideoPlaying)} className={`flex px-3 py-1.5 rounded-full border items-center gap-1.5 transition-colors shadow-lg backdrop-blur ${isVideoPlaying ? 'bg-[teal]/20 border-[teal]/50 text-[teal]' : 'bg-card text-card-foreground/5 border-border hover:bg-card text-card-foreground/10 text-foreground'}`}>
                  <MonitorPlay className="w-3.5 h-3.5" />
                  <span className="text-xs font-black tracking-widest block">MEDIA</span>
                </button>
                <div className="flex px-3 py-1.5 rounded-full border border-[coral]/40 bg-[coral]/10 items-center gap-1.5 shadow-[0_0_15px_rgba(255,59,0,0.3)] backdrop-blur">
                  <Flame className="w-3.5 h-3.5 text-[coral] animate-pulse" />
                  <span className="text-xs font-black text-[coral] tracking-widest">4.2K</span>
                </div>
                <button className="p-2 bg-card text-card-foreground/40 border border-border hover:bg-card text-card-foreground/10 rounded-full transition-colors text-foreground backdrop-blur">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col m-auto max-w-6xl mt-auto">
            {isVideoPlaying ? (
              <div className="w-full flex flex-col gap-4">
                <div className="w-full aspect-video bg-card relative overflow-hidden rounded-2xl shadow-2xl border border-border group">
                  <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-card/50 backdrop-blur border border-border-strong flex items-center justify-center">
                      <MonitorPlay className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </div>
                <div className="w-full relative shrink-0">
                  <div className="relative w-full overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="flex flex-row gap-2">
                      {renderSpeakers(true)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full relative bg-card overflow-hidden flex flex-col rounded-2xl shadow-2xl aspect-video border border-border shrink-0">
                <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/20 via-[#020202]/80 to-[#001C58]/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
                </div>
                <div className="relative z-10 flex-1 grid grid-cols-3 grid-rows-2 gap-4 p-6 h-full w-full">
                  {renderSpeakers(false)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Live Chat & Polls */}
        <div className="w-[400px] xl:w-[480px] bg-card text-card-foreground flex flex-col border-l border-border shrink-0 relative z-20 overflow-hidden h-full">
          {renderPoll()}
          {/* Desktop Chat Box Container */}
          <div className="flex-1 min-h-0 bg-black/40 backdrop-blur-sm border-x border-b border-border-strong flex flex-col relative" onScroll={handleChatScroll}>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {chatMessages.map((msg) => (
              <div key={msg.id} className="flex gap-3 group">
                <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border ${msg.isSpeaker ? 'border-[#00C853] shadow-[0_0_15px_rgba(0,200,83,0.4)]' : 'border-border-strong'} p-1 transition-transform group-hover:scale-110`}>
                  <img src={msg.avatar} className="w-full h-full object-contain" alt="avatar" />
                </div>
                <div className={`${msg.isSpeaker ? 'bg-gradient-to-br from-[#00C853]/10 to-[#00C853]/5 border-[#00C853]/30' : 'bg-card text-card-foreground/5 dark:bg-muted border-border hover:bg-card text-card-foreground/10'} p-3 rounded-2xl rounded-tl-none border backdrop-blur-sm flex-1`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-black ${msg.color} text-xs tracking-wider`}>{msg.name}</span>
                    <span className={`text-[9px] ${msg.isSpeaker ? 'text-[#00C853]/60' : 'text-muted-foreground/80'} font-bold`}>{msg.time}</span>
                  </div>
                  <p className={`text-sm ${msg.isSpeaker ? 'text-foreground' : 'text-gray-300'} leading-relaxed font-medium`}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
              </div>
          </div>
          <div className="p-4 border-t border-border bg-card text-card-foreground/80 backdrop-blur-xl space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] relative z-30">
            <div className="flex gap-3">
              <button onClick={() => spawnEmoji('🤡')} className="flex-1 flex flex-col items-center justify-center gap-1 bg-card text-card-foreground/5 border border-border rounded-2xl py-3 hover:bg-card text-card-foreground/10 hover:border-border-strong hover:-translate-y-1 transition-all shadow-lg">
                <span className="text-2xl">🤡</span>
                <span className="text-[9px] font-black text-muted-foreground tracking-widest uppercase">Waffling</span>
              </button>
              <button onClick={() => spawnEmoji('🍳')} className="flex-1 flex flex-col items-center justify-center gap-1 bg-card text-card-foreground/5 border border-border rounded-2xl py-3 hover:bg-card text-card-foreground/10 hover:border-border-strong hover:-translate-y-1 transition-all shadow-lg">
                <span className="text-2xl">🍳</span>
                <span className="text-[9px] font-black text-muted-foreground tracking-widest uppercase">Cooking</span>
              </button>
              <button onClick={toggleMic} disabled={isMicPending} className={`flex-[2] flex flex-col items-center justify-center gap-1 rounded-2xl py-3 hover:scale-[1.02] font-black cursor-pointer transition-colors ${localParticipant?.isMicrophoneEnabled ? 'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-inner border border-red-500/50' : isMicPending ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-muted-foreground border border-border' : 'bg-gradient-to-br from-[coral] to-[coral] text-black shadow-[0_0_20px_rgba(255,127,80,0.4)] hover:shadow-[0_0_30px_rgba(255,127,80,0.6)] border border-[coral]/50'}`}>
                {isMicPending ? <Loader2 className="w-5 h-5 animate-spin" /> : (localParticipant?.isMicrophoneEnabled ? <MicOff className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5 fill-black" />)}
                <span className="text-[10px] tracking-widest uppercase">{isMicPending ? 'Pending' : (localParticipant?.isMicrophoneEnabled ? 'Mute Mic' : 'Request Mic')}</span>
              </button>
            </div>
            <form onSubmit={handleSendMessage} className="bg-card text-card-foreground rounded-full p-1 border border-border flex items-center focus-within:border-[teal] focus-within:shadow-[0_0_20px_rgba(117, 251, 217,0.15)] transition-all">
              <div className="w-8 h-8 rounded-full bg-gray-800 ml-1 overflow-hidden shrink-0">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="User" />
              </div>
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Join the conversation..." className="bg-transparent border-none outline-none text-sm w-full px-4 text-foreground placeholder:text-gray-600 font-medium" />
              <button type="submit" disabled={!inputText.trim()} className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all mr-0.5 border ${inputText.trim() ? 'bg-[teal] hover:bg-[teal]/90 border-[teal] text-black shadow-[0_0_15px_rgba(117, 251, 217,0.4)] hover:scale-105' : 'bg-card text-card-foreground/5 border-border text-muted-foreground/80'}`}>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}

export default function ActiveStandPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || "default";
  const [username] = useState(() => `User_${Math.floor(Math.random() * 1000)}`);

  return (
    <LiveAudioRoom roomName={id} username={username}>
      <StandRoomLayout matchId={id} />
    </LiveAudioRoom>
  );
}

