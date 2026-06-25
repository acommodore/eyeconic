"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Share2, Bell, Play, Flame, Target, Users, Settings2, BarChart2, Mic, ChevronDown, ArrowRightLeft, ChevronRight } from "lucide-react";

// --- Data Models ---
const matchEvents = [
  { id: 1, minute: 12, type: 'goal', title: 'GOAL! LIVERPOOL', player: 'Mohamed Salah', desc: 'Brilliant strike from outside the box into the top right corner.', likes: '12K', isMajor: true },
  { id: 2, minute: 34, type: 'card', title: 'YELLOW CARD', player: 'Rodri', desc: 'Tactical foul to stop a dangerous counter attack in the midfield.', likes: '1.2K', isMajor: false },
  { id: 3, minute: 45, type: 'half', title: 'HALF TIME', player: '', desc: 'Liverpool lead 1-0 at the break after an intense, high-paced 45 minutes.', likes: '5.4K', isMajor: false },
  { id: 4, minute: 72, type: 'save', title: 'SAVE!', player: 'Alisson Becker', desc: 'Point-blank stop to deny Foden from close range.', likes: '4.2K', isMajor: false },
  { id: 5, minute: 78, type: 'save', title: 'SAVE! ALISSON\nBECKER', player: 'Alisson', desc: 'Incredible point-blank reaction save to deny a certain equalizer from Haaland.', likes: '6.7K', isMajor: true },
  { id: 6, minute: 81, type: 'shot', title: 'SHOT ON TARGET', player: 'Kevin De Bruyne', desc: 'Great dipping effort from distance forces a massive corner.', likes: '2.1K', isMajor: false },
  { id: 7, minute: 83, type: 'sub', title: 'SUBSTITUTION', player: 'Doku OFF, Foden ON', desc: 'Tactical change for Man City as they chase the game late.', likes: '1.3K', isMajor: false },
  { id: 8, minute: 88, type: 'var', title: 'VAR REVIEW', player: 'Possible Penalty', desc: 'Checking for a handball in the box by Ruben Dias.', likes: '8.1K', isMajor: false },
];

const mockVoiceNotes = [
  { id: 1, user: '@jdoe_88', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop', mood: 'ANGRY', moodColor: 'text-[#FF7F50] bg-[#FF7F50]/10', dotColor: 'bg-[#FF7F50]', comment: '"Unbelievable! How did he even see that through the crowd?! The defense was nowhere to be found."', echoes: 12 },
  { id: 2, user: '@tactics_guy', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop', mood: 'HYPE', moodColor: 'text-teal bg-teal/10', dotColor: 'bg-teal', comment: '"Notice how he shifts his weight right before the moment... absolute class."', echoes: 8 },
  { id: 3, user: '@cityfan_99', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=100&auto=format&fit=crop', mood: 'SHOCKED', moodColor: 'text-yellow-500 bg-yellow-500/10', dotColor: 'bg-yellow-500', comment: '"I thought that was in for sure... you have to be kidding me."', echoes: 45 },
  { id: 4, user: '@sarah_k', avatar: 'https://images.unsplash.com/photo-1574629810360-7efbb1925846?q=80&w=100&auto=format&fit=crop', mood: 'SAD', moodColor: 'text-gray-400 bg-gray-400/10', dotColor: 'bg-gray-400', comment: '"We need to finish those chances if we want to take anything from this game."', echoes: 2 },
];

const filterOptions = ['All', 'Cards', 'Goals', 'VAR', 'Subs'];

type EmojiRating = 'positive' | 'negative' | 'neutral' | null;

interface Player {
  id: string;
  name: string;
  number: number | string;
  position: 'ATT' | 'MID' | 'DEF' | 'GK' | 'SUB' | 'COACH';
  rating: string;
}

const livSquadPlayers: Player[] = [
  { id: '1', name: 'Diaz', number: 7, position: 'ATT', rating: '7.6' },
  { id: '2', name: 'Nunez', number: 9, position: 'ATT', rating: '7.1' },
  { id: '3', name: 'Salah', number: 11, position: 'ATT', rating: '8.8' },
  { id: '4', name: 'Jones', number: 17, position: 'MID', rating: '7.2' },
  { id: '5', name: 'Endo', number: 3, position: 'MID', rating: '7.4' },
  { id: '6', name: 'Mac Allister', number: 10, position: 'MID', rating: '7.6' },
  { id: '7', name: 'Robertson', number: 26, position: 'DEF', rating: '6.8' },
  { id: '8', name: 'Van Dijk', number: 4, position: 'DEF', rating: '8.1' },
  { id: '9', name: 'Konate', number: 5, position: 'DEF', rating: '7.9' },
  { id: '10', name: 'Alexander', number: 66, position: 'DEF', rating: '7.5' },
  { id: '11', name: 'Alisson', number: 1, position: 'GK', rating: '7.3' },
  { id: '12', name: 'Slot', number: 'M', position: 'COACH', rating: '-' },
  { id: '13', name: 'Gakpo', number: 18, position: 'SUB', rating: '-' },
  { id: '14', name: 'Elliott', number: 19, position: 'SUB', rating: '-' },
  { id: '15', name: 'Bradley', number: 84, position: 'SUB', rating: '-' },
  { id: '16', name: 'Gomez', number: 2, position: 'SUB', rating: '-' },
  { id: '17', name: 'Tsimikas', number: 21, position: 'SUB', rating: '-' },
  { id: '18', name: 'Gravenberch', number: 38, position: 'SUB', rating: '-' },
  { id: '19', name: 'Kelleher', number: 62, position: 'SUB', rating: '-' },
];

const mciSquadPlayers: Player[] = [
  { id: '101', name: 'Grealish', number: 10, position: 'ATT', rating: '7.0' },
  { id: '102', name: 'Haaland', number: 9, position: 'ATT', rating: '8.5' },
  { id: '103', name: 'Foden', number: 47, position: 'ATT', rating: '8.2' },
  { id: '104', name: 'De Bruyne', number: 17, position: 'MID', rating: '7.8' },
  { id: '105', name: 'Rodri', number: 16, position: 'MID', rating: '8.4' },
  { id: '106', name: 'Silva', number: 20, position: 'MID', rating: '7.5' },
  { id: '107', name: 'Gvardiol', number: 24, position: 'DEF', rating: '7.2' },
  { id: '108', name: 'Dias', number: 3, position: 'DEF', rating: '7.6' },
  { id: '109', name: 'Akanji', number: 25, position: 'DEF', rating: '7.1' },
  { id: '110', name: 'Walker', number: 2, position: 'DEF', rating: '7.4' },
  { id: '111', name: 'Ederson', number: 31, position: 'GK', rating: '7.0' },
  { id: '112', name: 'Guardiola', number: 'M', position: 'COACH', rating: '-' },
  { id: '113', name: 'Alvarez', number: 19, position: 'SUB', rating: '-' },
  { id: '114', name: 'Doku', number: 11, position: 'SUB', rating: '-' },
  { id: '115', name: 'Kovacic', number: 8, position: 'SUB', rating: '-' },
  { id: '116', name: 'Ake', number: 6, position: 'SUB', rating: '-' },
  { id: '117', name: 'Stones', number: 5, position: 'SUB', rating: '-' },
  { id: '118', name: 'Lewis', number: 82, position: 'SUB', rating: '-' },
  { id: '119', name: 'Ortega', number: 18, position: 'SUB', rating: '-' },
];

const getDotColor = (type: string) => {
  switch(type) {
    case 'goal': return 'bg-yellow-400';
    case 'card': return 'bg-coral';
    case 'sub': return 'bg-green-400';
    case 'var': return 'bg-purple-500';
    case 'save': return 'bg-white';
    case 'shot': return 'bg-orange-500';
    default: return 'bg-gray-400';
  }
};

// --- Sub-components ---
const EventCard = ({ event, isActive, voiceNotes, onRecordClick }: { event: any, isActive: boolean, voiceNotes: any[], onRecordClick?: () => void }) => (
  <div className={`w-full bg-[#0A0A0A] rounded-[2rem] border ${isActive ? 'border-teal/50 shadow-[0_0_30px_rgba(0,229,255,0.1)]' : 'border-white/10'} p-6 md:p-8 relative transition-all duration-500 flex flex-col overflow-hidden`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-teal font-mono font-bold text-xl">{event.minute}'</span>
      
      <div className="flex items-center gap-4">
        <div className="inline-flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full text-xs font-bold text-gray-300">
          <Flame className="w-4 h-4 text-[#FF7F50]"/> {event.likes}
        </div>
        
        <button onClick={onRecordClick} className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center border border-red-500/30 hover:bg-coral/20 hover:scale-105 transition-all text-coral group relative">
          <Mic className="w-5 h-5 group-hover:animate-pulse" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-coral animate-pulse" />
        </button>
      </div>
    </div>
    
    <h3 className="font-black uppercase leading-none mb-4 text-xl md:text-2xl truncate">
      {event.title}
    </h3>
    
    <p className={`text-sm md:text-base text-gray-400 leading-relaxed mb-6 w-full break-words ${isActive ? '' : 'line-clamp-3'}`}>
      {event.player && <strong className="text-white block mb-1">{event.player}</strong>}
      {event.desc}
    </p>

    {event.type === 'half' && (
      <div className="mb-6">
        <Link href="/stands/2" className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FF3B00] border border-[#FF7F50]/50 hover:brightness-110 transition-all rounded-[2rem] p-6 flex flex-col md:flex-row md:items-center justify-between group shadow-[0_0_40px_rgba(255,127,80,0.3)]">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black tracking-widest text-lg md:text-xl uppercase text-white mb-1">JOIN STAND</span>
              <span className="text-xs text-white/80 font-bold uppercase tracking-widest flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> 12.4K FANS ACTIVE
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center md:ml-4 group-hover:bg-white/20 transition-colors">
             <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    )}
    
    {/* Voice Notes List */}
    {event.type !== 'half' && (
      <div className="mt-4 flex flex-col">
      <div className="flex-1 max-h-[300px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {voiceNotes.map(note => (
          <div key={note.id} className="bg-[#121212] rounded-2xl p-4 md:p-5 border border-white/5">
            <div className="flex items-start gap-4 mb-4">
              <img src={note.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-gray-300">{note.user}</span>
                  <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded flex items-center gap-1.5 ${note.moodColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${note.dotColor}`} /> {note.mood}
                  </span>
                </div>
                <p className="text-sm text-white italic leading-snug">{note.comment}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 bg-black/60 rounded-xl p-2 md:p-3 overflow-hidden">
              <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal flex items-center justify-center hover:scale-105 transition-transform shrink-0">
                <Play className="w-3 h-3 md:w-4 md:h-4 text-black fill-black ml-0.5" />
              </button>
              <div className="flex-1 flex items-center gap-0.5 md:gap-1 h-4 md:h-6 opacity-50 min-w-0 pr-2 overflow-hidden">
                {[...Array(16)].map((_, i) => <div key={i} className="flex-1 min-w-[3px] bg-teal rounded-full" style={{height: `${Math.max(15, ((i * 37) % 80) + 20)}%`}} />)}
              </div>
              <button onClick={() => handleEcho(note.id)} className={`flex items-center gap-1.5 ${echoedNotes.has(note.id) ? 'bg-teal text-black hover:bg-teal/90' : 'bg-teal/10 text-teal hover:bg-teal/20'} px-3 py-1.5 rounded-lg border border-teal/30 text-[10px] font-bold transition-colors shrink-0`}>
                <Mic className="w-3 h-3" /> ECHO • {note.echoes + (echoedNotes.has(note.id) ? 1 : 0)}
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    )}
  </div>
);


export default function LivePulseView({ isMatchFinished = false }: { isMatchFinished?: boolean }) {
  const [activeMinute, setActiveMinute] = useState(78);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTeam, setActiveTeam] = useState<'LIV' | 'MCI'>('LIV');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [playerRatings, setPlayerRatings] = useState<Record<string, EmojiRating>>({});

  const [isH2HOpen, setIsH2HOpen] = useState(false);
  const [isStandingsOpen, setIsStandingsOpen] = useState(false);

  const [localVoiceNotes, setLocalVoiceNotes] = useState(mockVoiceNotes);
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(10);
  const [echoedNotes, setEchoedNotes] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleEcho = (noteId: number) => {
    setEchoedNotes(prev => {
      const next = new Set(prev);
      if (next.has(noteId)) next.delete(noteId);
      else next.add(noteId);
      return next;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (diff > 50 && nextEvent) setActiveMinute(nextEvent.minute); // Swipe left -> next
    if (diff < -50 && prevEvent) setActiveMinute(prevEvent.minute); // Swipe right -> prev
    setTouchStart(null);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(10);
    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRecording(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePostReaction = () => {
    let colorClass = 'text-[#FF7F50] bg-[#FF7F50]/10';
    let dotColor = 'bg-[#FF7F50]';
    if (selectedReaction === 'HYPE') { colorClass = 'text-teal bg-teal/10'; dotColor = 'bg-teal'; }
    if (selectedReaction === 'BORING') { colorClass = 'text-gray-400 bg-gray-400/10'; dotColor = 'bg-gray-400'; }

    const newNote = {
      id: Date.now(),
      user: '@you',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      mood: selectedReaction || 'HYPE',
      moodColor: colorClass,
      dotColor: dotColor,
      comment: '"This is my live reaction!"',
      echoes: 0
    };
    setLocalVoiceNotes([newNote, ...localVoiceNotes]);
    setIsRecordingModalOpen(false);
    setSelectedReaction(null);
  };

  const currentSquad = activeTeam === 'LIV' ? livSquadPlayers : mciSquadPlayers;

  const handleEmojiClick = (playerId: string, ratingType: EmojiRating) => {
    if (ratingType === null) {
      setPlayerRatings(prev => {
        const newRatings = {...prev};
        delete newRatings[playerId];
        return newRatings;
      });
    } else {
      setPlayerRatings(prev => ({
        ...prev,
        [playerId]: ratingType
      }));
    }
    setSelectedPlayerId(null);
  };

  const renderPlayer = (p: Player, index: number, array: Player[]) => {
    const isSelected = selectedPlayerId === p.id;
    const ratingStatus = playerRatings[p.id];
    
    let statusGlow = "";
    if (ratingStatus === 'positive') {
      statusGlow = "bg-green-500/20";
    } else if (ratingStatus === 'negative') {
      statusGlow = "bg-coral/20";
    } else if (ratingStatus === 'neutral') {
      statusGlow = "bg-yellow-500/20";
    } else if (isSelected) {
      statusGlow = "bg-white/20";
    }

    let ratingColorClass = "text-gray-400";
    if (parseFloat(p.rating) >= 8.0) {
      ratingColorClass = "text-teal"; // Seafoam Green
    } else if (parseFloat(p.rating) < 7.0 && p.rating !== '-') {
      ratingColorClass = "text-[#FF7F50]"; // Chaos Orange
    } else if (p.rating !== '-') {
      ratingColorClass = "text-yellow-500";
    }

    const borderColor = isSelected ? 'border-white' : ratingStatus === 'positive' ? 'border-green-500' : ratingStatus === 'negative' ? 'border-red-500' : ratingStatus === 'neutral' ? 'border-yellow-500' : 'border-white/10';

    let positionClass = "left-1/2 -translate-x-1/2";
    if (index === 0 && array.length > 1) {
      positionClass = "left-0 translate-x-0";
    } else if (index === array.length - 1 && array.length > 1) {
      positionClass = "right-0 translate-x-0";
    }

    return (
      <div key={p.id} className="flex flex-col items-center cursor-pointer group relative shrink-0" onClick={() => setSelectedPlayerId(isSelected ? null : p.id)}>
        {isSelected && (
          <div className={`absolute -top-12 ${positionClass} bg-[#121212] border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-2 z-50 shadow-2xl animate-in fade-in zoom-in duration-200 whitespace-nowrap`}>
             <button onClick={(e) => { e.stopPropagation(); handleEmojiClick(p.id, 'positive'); }} className="hover:scale-125 transition-transform text-lg">🔥</button>
             <button onClick={(e) => { e.stopPropagation(); handleEmojiClick(p.id, 'positive'); }} className="hover:scale-125 transition-transform text-lg">🧠</button>
             <button onClick={(e) => { e.stopPropagation(); handleEmojiClick(p.id, 'positive'); }} className="hover:scale-125 transition-transform text-lg">🧱</button>
             <button onClick={(e) => { e.stopPropagation(); handleEmojiClick(p.id, 'neutral'); }} className="hover:scale-125 transition-transform text-lg">😐</button>
             <button onClick={(e) => { e.stopPropagation(); handleEmojiClick(p.id, 'negative'); }} className="hover:scale-125 transition-transform text-lg">😤</button>
             <button onClick={(e) => { e.stopPropagation(); handleEmojiClick(p.id, 'negative'); }} className="hover:scale-125 transition-transform text-lg">❌</button>
          </div>
        )}
        <div className={`flex flex-col items-center bg-[#0a0a0a] border ${borderColor} rounded-lg overflow-hidden w-12 md:w-16 shadow-xl transition-all duration-300 relative z-20`}>
          <div className="w-full aspect-square relative bg-[#1A1A1A]">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} className={`w-full h-full object-cover filter ${ratingStatus ? 'opacity-100' : 'opacity-80'}`} />
            {p.rating !== '-' && (
               <div className="absolute bottom-0 right-0 bg-black/80 px-1 md:px-1.5 py-0.5 rounded-tl border-t border-l border-white/5">
                 <span className={`text-[8px] md:text-[10px] font-black ${ratingColorClass}`}>{p.rating}</span>
               </div>
            )}
            {p.position === 'COACH' && (
               <div className="absolute top-0 right-0 bg-[#FF7F50] px-1.5 py-0.5 rounded-bl shadow-lg">
                 <span className="text-[6px] md:text-[8px] font-black text-white uppercase tracking-widest">COACH</span>
               </div>
            )}
            <div className={`absolute inset-0 ${statusGlow} pointer-events-none mix-blend-overlay transition-colors`} />
          </div>
          <div className="w-full py-1 bg-[#121212] border-t border-white/5 flex items-center justify-center">
            <span className="text-[7px] md:text-[8px] text-gray-300 font-bold uppercase tracking-wider truncate px-1">{p.name}</span>
          </div>
        </div>
      </div>
    );
  };

  // Map plural filter names to singular event types
  const getFilterType = (filter: string) => {
    switch(filter) {
      case 'Cards': return 'card';
      case 'Goals': return 'goal';
      case 'VAR': return 'var';
      case 'Subs': return 'sub';
      default: return 'all';
    }
  };

  const filteredEvents = matchEvents.filter(e => {
    if (activeFilter === 'All') return true;
    return e.type === getFilterType(activeFilter);
  });

  const activeEventIndex = matchEvents.findIndex(e => e.minute === activeMinute);
  const activeEvent = activeEventIndex !== -1 ? matchEvents[activeEventIndex] : matchEvents[0];
  
  const prevEvent = activeEventIndex > 0 ? matchEvents[activeEventIndex - 1] : null;
  const nextEvent = activeEventIndex < matchEvents.length - 1 ? matchEvents[activeEventIndex + 1] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevEvent) {
        setActiveMinute(prevEvent.minute);
      } else if (e.key === 'ArrowRight' && nextEvent) {
        setActiveMinute(nextEvent.minute);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevEvent, nextEvent]);

  return (
    <div className="w-full space-y-10">

      {/* 3. SPLIT LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 overflow-hidden">
        
        {/* LEFT PANE: Match Pulse Timeline */}
        <div className={`flex flex-col gap-8 ${isMatchFinished ? 'xl:col-span-12 w-full max-w-5xl mx-auto' : 'xl:col-span-7'}`}>

          {/* Action Feed */}
          <section className="bg-[#0A0A0A] rounded-[2rem] border border-white/5 p-6 shadow-xl flex-1 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-8 relative shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-teal" />
                <h2 className="text-sm font-black tracking-widest text-white uppercase">ACTION FEED</h2>
              </div>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-[10px] text-gray-400 font-bold hover:text-white transition-colors uppercase tracking-widest"
                >
                  <Settings2 className="w-3 h-3" /> {activeFilter === 'All' ? 'Filter' : activeFilter}
                </button>
                
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#121212] border border-white/10 rounded-xl shadow-xl z-50 py-2">
                    {filterOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setActiveFilter(option);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${activeFilter === option ? 'text-teal' : 'text-gray-400'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Timeline */}
            <div className="relative w-full px-2 mb-8 h-10 shrink-0">
              {/* The base line */}
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/10 -translate-y-1/2" />
              {/* The progress line up to the current minute (assuming 90 max) */}
              <div className="absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-yellow-500 via-[#00E5FF] to-transparent -translate-y-1/2 transition-all duration-500" style={{width: `${Math.min((88 / 90) * 100, 100)}%`}} />
              
              {/* The Event Dots (Filtered) */}
              {filteredEvents.map((event) => {
                const isActive = activeMinute === event.minute;
                const leftPos = `${(event.minute / 90) * 100}%`;
                const dotColorClass = getDotColor(event.type);
                
                return (
                  <div 
                    key={event.id}
                    onClick={() => setActiveMinute(event.minute)}
                    className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 cursor-pointer group transition-all"
                    style={{ left: `calc(${leftPos} + 1rem)` }} // adjusting for px-4
                  >
                    <div 
                      className={`w-3 h-3 rounded-full ring-4 transition-all duration-300 ${dotColorClass} ${
                        isActive 
                          ? 'ring-[#050505] shadow-[0_0_15px_rgba(0,229,255,1)] scale-125' 
                          : 'ring-[#050505] opacity-60 group-hover:opacity-100 group-hover:scale-110'
                      }`} 
                    />
                    
                    <div className={`absolute -top-7 text-xs font-bold transition-colors ${isActive ? 'text-teal' : 'text-gray-500'}`}>
                      {event.minute}'
                    </div>
                    
                    {isActive && (
                      <div className="absolute -bottom-6 text-teal animate-pulse">
                        |||
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Carousel of Cards */}
            <div 
              className="relative w-full flex-1 flex flex-col overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
               {/* Fading Gradients for Carousel edges */}
               <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
               <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none" />

               <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full relative flex-1 mt-2">
                 
                 {/* Prev Card */}
                 <div 
                    className={`hidden md:flex col-span-1 transition-all duration-500 cursor-pointer flex-col ${prevEvent ? 'opacity-30 scale-95 blur-[2px] hover:blur-none hover:opacity-50' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => prevEvent && setActiveMinute(prevEvent.minute)}
                 >
                    {prevEvent && <EventCard event={prevEvent} isActive={false} voiceNotes={localVoiceNotes} onRecordClick={() => setIsRecordingModalOpen(true)} />}
                 </div>

                 {/* Active Card */}
                 <div className="col-span-1 md:col-span-3 z-10 transition-all duration-500 flex flex-col">
                    <EventCard event={activeEvent} isActive={true} voiceNotes={localVoiceNotes} onRecordClick={() => setIsRecordingModalOpen(true)} />
                 </div>

                 {/* Next Card */}
                 <div 
                    className={`hidden md:flex col-span-1 transition-all duration-500 cursor-pointer flex-col ${nextEvent ? 'opacity-30 scale-95 blur-[2px] hover:blur-none hover:opacity-50' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => nextEvent && setActiveMinute(nextEvent.minute)}
                 >
                    {nextEvent && <EventCard event={nextEvent} isActive={false} voiceNotes={localVoiceNotes} onRecordClick={() => setIsRecordingModalOpen(true)} />}
                 </div>

               </div>
            </div>
          </section>

        </div>

        {/* RIGHT PANE: Deep Stats & Impact (col-span-5) */}
        {!isMatchFinished && (
        <div className="xl:col-span-5 space-y-8">
           
           {/* Player Impact - TACTICAL VIEW */}
           <section className="bg-[#0A0A0A] rounded-[2rem] border border-white/5 p-6 shadow-xl relative overflow-visible">
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="w-1 h-6 bg-teal" />
                <h2 className="text-sm font-black tracking-widest text-white uppercase">PLAYER IMPACT LIVE</h2>
              </div>
              <p className="text-[10px] text-gray-500 mb-8 uppercase tracking-widest relative z-10">Select player to see rating. Tap again to rate.</p>

              <div className="flex justify-center mb-10 relative z-10">
                <div className="flex bg-[#121212] rounded-full p-1 border border-white/10">
                  <button 
                    onClick={() => setActiveTeam('LIV')}
                    className={`px-6 py-2 flex items-center gap-2 rounded-full text-[10px] font-black tracking-widest transition-all ${activeTeam === 'LIV' ? 'bg-teal text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'text-gray-500 hover:text-white'}`}>
                     <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" className={`w-4 h-4 object-contain ${activeTeam === 'LIV' ? '' : 'opacity-50'}`} alt="LIV" />
                     LIVERPOOL
                  </button>
                  <button 
                    onClick={() => setActiveTeam('MCI')}
                    className={`px-6 py-2 flex items-center gap-2 rounded-full text-[10px] font-black tracking-widest transition-all ${activeTeam === 'MCI' ? 'bg-teal text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'text-gray-500 hover:text-white'}`}>
                     <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className={`w-4 h-4 object-contain ${activeTeam === 'MCI' ? '' : 'opacity-50'}`} alt="MCI" />
                     MAN CITY
                  </button>
                </div>
              </div>

              {/* TACTICAL FORMATION GRID */}
              <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10 w-full max-w-lg mx-auto bg-[#0a0a0a] border-2 border-white/5 rounded-3xl p-6 py-10 overflow-visible shadow-2xl mt-4">
                 
                 {/* Stylized Pitch Outline */}
                 <div className="absolute inset-0 pointer-events-none opacity-20 border-2 border-white/20 rounded-3xl m-3 md:m-4" />
                 <div className="absolute top-4 md:top-5 left-1/2 -translate-x-1/2 w-40 md:w-48 h-20 md:h-24 border-2 border-white/20 rounded-b-[4rem] pointer-events-none" />
                 <div className="absolute top-4 md:top-5 left-1/2 -translate-x-1/2 w-20 md:w-24 h-10 md:h-12 border-2 border-white/20 pointer-events-none" />
                 <div className="absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 w-40 md:w-48 h-20 md:h-24 border-2 border-white/20 rounded-t-[4rem] pointer-events-none" />
                 <div className="absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 w-20 md:w-24 h-10 md:h-12 border-2 border-white/20 pointer-events-none" />
                 <div className="absolute top-1/2 left-3 md:left-4 right-3 md:right-4 h-0 border-t-2 border-white/20 pointer-events-none" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 md:w-24 h-20 md:h-24 border-2 border-white/20 rounded-full pointer-events-none" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-white/20 rounded-full pointer-events-none" />

                 {/* Row 1: Attackers */}
                 <div className="flex justify-between w-full px-4 md:px-12 relative z-10">
                    {currentSquad.filter(p => p.position === 'ATT').map(renderPlayer)}
                 </div>

                 {/* Row 2: Midfielders */}
                 <div className="flex justify-between w-full px-2 md:px-8 relative z-10">
                    {currentSquad.filter(p => p.position === 'MID').map(renderPlayer)}
                 </div>

                 {/* Row 3: Defenders */}
                 <div className="flex justify-between w-full relative z-10">
                    {currentSquad.filter(p => p.position === 'DEF').map(renderPlayer)}
                 </div>

                 {/* Row 4: Goalkeeper */}
                 <div className="flex flex-col items-center gap-2 mt-4 md:mt-6 relative z-10">
                    {currentSquad.filter(p => p.position === 'GK').map(renderPlayer)}
                 </div>
              </div>

              {/* Substitutions */}
              <div className="relative z-10 mt-12 pt-6 border-t border-white/10 w-full flex flex-col items-center overflow-visible">
                 <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.3em] mb-6">BENCH</span>
                 <div className="flex items-center gap-4 w-full justify-start md:justify-center overflow-x-auto pb-6 px-4 no-scrollbar">
                    {currentSquad.filter(p => p.position === 'COACH').map(renderPlayer)}
                    <div className="w-px h-10 bg-white/10 mx-2 shrink-0" /> {/* Divider between coach and players */}
                    {currentSquad.filter(p => p.position === 'SUB').map(renderPlayer)}
                 </div>
              </div>
           </section>

        </div>
        )}

      </div>



      {/* Recording Modal */}
      {isRecordingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] w-full max-w-sm p-8 flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200">
            {/* Recording Visualizer Box */}
            <div className="bg-[#121212] border border-white/5 rounded-3xl w-full p-8 flex items-center justify-between mb-10 shadow-inner">
               
               {!isRecording && recordingTime === 10 ? (
                 <button onClick={startRecording} className="w-[72px] h-[72px] rounded-full border-4 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] flex flex-col items-center justify-center shrink-0 hover:scale-105 transition-transform bg-coral/10 hover:bg-coral/20">
                   <div className="w-4 h-4 bg-coral rounded-full animate-pulse mb-1" />
                   <span className="text-[8px] font-black text-coral uppercase tracking-widest">RECORD</span>
                 </button>
               ) : (
                 <div className="w-[72px] h-[72px] rounded-full border-4 border-teal shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center shrink-0">
                   <span className="text-white font-black tracking-widest text-lg">{recordingTime.toFixed(1)}s</span>
                 </div>
               )}

               <div className="flex items-center gap-1.5 flex-1 justify-center">
                 {/* Soundwave bars (animated) */}
                 {[...Array(6)].map((_, i) => (
                   <div key={i} className={`w-1.5 ${isRecording ? 'bg-teal animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.6)]' : 'bg-white/10'} rounded-full transition-colors`} style={{ height: isRecording ? `${Math.max(12, Math.random() * 45)}px` : '12px', animationDelay: isRecording ? `${i * 0.15}s` : '0s' }} />
                 ))}
               </div>
               <div className="flex flex-col gap-1.5 justify-end h-12 shrink-0">
                 {/* Volume levels */}
                 <div className={`w-5 h-1.5 rounded-sm transition-colors ${isRecording ? 'bg-coral opacity-50' : 'bg-white/10'}`} />
                 <div className={`w-5 h-1.5 rounded-sm transition-colors ${isRecording ? 'bg-yellow-500 opacity-50' : 'bg-white/10'}`} />
                 <div className={`w-5 h-1.5 rounded-sm transition-colors ${isRecording ? 'bg-green-500' : 'bg-white/10'}`} />
                 <div className={`w-5 h-1.5 rounded-sm transition-colors ${isRecording ? 'bg-green-500' : 'bg-white/10'}`} />
                 <div className={`w-5 h-1.5 rounded-sm transition-colors ${isRecording ? 'bg-green-500' : 'bg-white/10'}`} />
               </div>
            </div>
            
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-6">HOW DID THAT MAKE YOU FEEL?</p>

            <div className="flex items-center justify-between w-full gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
              {[{ emoji: '😬', label: 'TENSE' }, { emoji: '😤', label: 'FRUSTRATION' }, { emoji: '😐', label: 'BORING' }, { emoji: '🔥', label: 'HYPE' }, { emoji: '😲', label: 'SHOCK' }].map(rxn => (
                <button 
                  key={rxn.label}
                  onClick={() => setSelectedReaction(rxn.label)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border ${selectedReaction === rxn.label ? 'bg-white/10 border-teal/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-[#121212] border-transparent hover:bg-white/5'} transition-all shrink-0 min-w-[65px]`}
                >
                  <span className="text-3xl drop-shadow-lg">{rxn.emoji}</span>
                  <span className="text-[8px] font-black tracking-widest uppercase text-gray-500">{rxn.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={handlePostReaction}
              disabled={!selectedReaction}
              className={`w-full bg-[#FF7F50] text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-[0_0_20px_rgba(255,79,0,0.3)] ${!selectedReaction ? 'opacity-50 cursor-not-allowed saturate-0' : 'hover:bg-[#FF7F50]/90 hover:scale-[1.02]'}`}
            >
              POST REACTION
            </button>
            
            {/* Close button */}
            <button 
              onClick={() => {
                 setIsRecordingModalOpen(false);
                 setIsRecording(false);
                 setRecordingTime(10);
              }}
              className="mt-6 text-gray-500 text-[10px] font-black tracking-widest uppercase hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
