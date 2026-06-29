import { Share, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

// Mock API Call (Instant)
const fetchPlayerStats = async (playerId: string) => {
  return {
    id: playerId,
    name: "Kai Havertz",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    fanScore: 7.8,
    stats: {
      goals: 1,
      assists: 1,
      passAccuracy: "88%",
      duelsWon: "6/10",
      touches: 45,
      shotsOnTarget: 2
    },
    keyMoments: [
      { id: 1, time: "12'", text: "Great link-up play in the final third", type: "pos" },
      { id: 2, time: "34'", text: "Missed a clear header from 6 yards", type: "neg" },
      { id: 3, time: "45+2'", text: "Scored the opening goal", type: "pos" },
      { id: 4, time: "67'", text: "Lost possession leading to counter", type: "neg" },
      { id: 5, time: "89'", text: "Provided the match-winning assist", type: "pos" }
    ]
  };
};

// --- Sub-components ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EventCard = ({ event, isActive, voiceNotes, onRecordClick, echoedNotes, handleEcho }: { event: any, isActive: boolean, voiceNotes: any[], onRecordClick?: () => void, echoedNotes: Set<number>, handleEcho: (id: number) => void }) => (
  <div className={`bg-[#050505] border border-white/5 rounded-2xl p-2.5 flex items-start gap-2.5 hover:bg-[#111] transition-colors ${isActive ? 'ring-1 ring-[#75fbd9]/50' : ''}`}>
    <div className="flex items-center gap-1.5 shrink-0 mt-0.5 w-8">
      <span className={`w-1.5 h-1.5 rounded-full ${event.type === 'pos' ? 'bg-[#75fbd9]' : 'bg-coral'}`}></span>
      <span className="text-[8px] font-bold text-white tracking-widest">{event.time}</span>
    </div>
    <p className="text-[11px] text-gray-300 font-medium leading-relaxed">{event.text}</p>
  </div>
);

interface PlayerSummaryModalProps {
  playerId: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function PlayerSummaryModal({ playerId, onClose, onNext, onPrev }: PlayerSummaryModalProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchStats = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const data = await fetchPlayerStats(playerId);
      if (!ignore) {
        setPlayer(data);
        setLoading(false);
      }
    };
    fetchStats();
    return () => { ignore = true; };
  }, [playerId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="w-10 h-10 border-4 border-[#75fbd9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isHighRating = player.fanScore >= 7.0;
  const ratingColor = isHighRating ? '#75fbd9' : '#FF3B00';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      {/* Container: Smaller width (max-w-4xl) to make it more compact */}
      <div 
        className="w-full max-w-4xl max-h-[90vh] md:max-h-[80vh] bg-[#0A0A0A] rounded-2xl border border-white/10 text-white relative flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="shrink-0 flex items-center justify-between p-4 border-b border-white/5 bg-[#050505]">
          <h1 className="text-[10px] md:text-xs font-black tracking-widest text-gray-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#75fbd9] animate-pulse"></span>
            POST-MATCH SUMMARY
          </h1>
          <div className="flex items-center gap-1.5 md:gap-2">
            {onPrev && (
              <button onClick={onPrev} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
            )}
            {onNext && (
              <button onClick={onNext} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            )}
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Share className="w-3.5 h-3.5 text-white" />
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-coral/10 border border-[#FF3B00]/20 flex items-center justify-center hover:bg-coral/20 transition-colors text-[#FF3B00]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden min-h-0">
          
          {/* LEFT COLUMN: Player Identity & Stats */}
          <div className="md:w-5/12 flex flex-col items-center p-6 border-r border-white/5 bg-[#020202]">
            {/* Avatar */}
            <div className="relative mb-3">
              <div 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 p-1 transition-all"
                style={{ 
                  borderColor: ratingColor, 
                  boxShadow: `0 0 20px ${ratingColor}30, inset 0 0 10px ${ratingColor}20` 
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                  <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-white text-black text-[8px] font-black tracking-widest uppercase shadow-lg">
                FORWARD
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black tracking-tight mb-0.5 text-center">{player.name}</h2>
            <div className="flex items-center gap-1.5 mb-6">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Fan Score</span>
              <span className="text-lg font-black" style={{ color: ratingColor }}>{player.fanScore}</span>
            </div>

            {/* Compact Stats Grid */}
            <div className="grid grid-cols-2 gap-2 w-full mt-auto">
               <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-2.5 flex flex-col items-center">
                  <span className="text-base font-black text-white">{player.stats.goals}</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Goals</span>
               </div>
               <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-2.5 flex flex-col items-center">
                  <span className="text-base font-black text-white">{player.stats.assists}</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Assists</span>
               </div>
               <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-2.5 flex flex-col items-center">
                  <span className="text-base font-black text-white">{player.stats.passAccuracy}</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Pass Acc</span>
               </div>
               <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-2.5 flex flex-col items-center">
                  <span className="text-base font-black text-[#75fbd9]">{player.stats.touches}</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Touches</span>
               </div>
               <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-2.5 flex flex-col items-center">
                  <span className="text-base font-black text-white">{player.stats.duelsWon}</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Duels</span>
               </div>
               <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-2.5 flex flex-col items-center">
                  <span className="text-base font-black text-white">{player.stats.shotsOnTarget}</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">S.O.T</span>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Timeline & Moments */}
          <div className="md:w-7/12 p-6 flex flex-col md:overflow-y-auto hide-scrollbar">
            
            {/* Fan Sentiment Timeline */}
            <div className="mb-6 shrink-0">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[9px] font-black tracking-widest text-gray-500 uppercase">FAN SENTIMENT</h3>
                <div className="flex items-center gap-2.5 text-[8px] font-bold tracking-widest uppercase">
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#75fbd9]"></span> POS</div>
                  <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-coral"></span> NEG</div>
                </div>
              </div>
              
              <div className="bg-[#050505] border border-white/5 rounded-2xl p-3 relative overflow-hidden h-28 flex flex-col justify-end">
                <div className="absolute inset-x-3 top-1/2 h-px bg-white/5 z-0" />
                <div className="absolute inset-0 z-10 w-full h-full px-3 py-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#75fbd9" />
                        <stop offset="45%" stopColor="#75fbd9" />
                        <stop offset="55%" stopColor="#FF3B00" />
                        <stop offset="100%" stopColor="#FF3B00" />
                      </linearGradient>
                      <linearGradient id="sentimentFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#75fbd9" stopOpacity="0.2" />
                        <stop offset="45%" stopColor="#75fbd9" stopOpacity="0" />
                        <stop offset="55%" stopColor="#FF3B00" stopOpacity="0" />
                        <stop offset="100%" stopColor="#FF3B00" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M 0,50 C 10,20 20,20 30,50 C 40,60 45,40 50,30 C 55,20 60,70 70,80 C 80,90 85,75 90,75 C 95,75 98,85 100,85"
                      fill="none" stroke="url(#sentimentGradient)" strokeWidth="2.5" strokeLinecap="round"
                    />
                    <path 
                      d="M 0,50 C 10,20 20,20 30,50 C 40,60 45,40 50,30 C 55,20 60,70 70,80 C 80,90 85,75 90,75 C 95,75 98,85 100,85 L 100,50 L 0,50 Z"
                      fill="url(#sentimentFill)" 
                    />
                  </svg>
                </div>
                <div className="relative z-20 flex justify-between text-[7px] font-bold text-gray-600 tracking-widest mt-auto px-1">
                  <span>0&apos;</span><span>15&apos;</span><span>30&apos;</span><span>HT</span><span>60&apos;</span><span>75&apos;</span><span>FT</span>
                </div>
              </div>
            </div>

            {/* Key Moments */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-2.5 shrink-0">
                <h3 className="text-[9px] font-black tracking-widest text-gray-500 uppercase">KEY MOMENTS</h3>
              </div>
              <div className="space-y-1.5 overflow-y-auto hide-scrollbar pb-2">
                {player.keyMoments.map((moment: { id: string; minute: number; type: string; desc: string; }) => (
                  <div key={moment.id} className="bg-[#050505] border border-white/5 rounded-2xl p-2.5 flex items-start gap-2.5 hover:bg-[#111] transition-colors">
                    <div className="flex items-center gap-1.5 shrink-0 mt-0.5 w-8">
                      <span className={`w-1.5 h-1.5 rounded-full ${moment.type === 'pos' ? 'bg-[#75fbd9]' : 'bg-coral'}`}></span>
                      <span className="text-[8px] font-bold text-white tracking-widest">{moment.minute}'</span>
                    </div>
                    <p className="text-[11px] text-gray-300 font-medium leading-relaxed">{moment.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

