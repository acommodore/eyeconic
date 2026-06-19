"use client";

import Link from "next/link";
import { ArrowLeft, Share, Eye, Shield, Zap, X, Play, ThumbsUp, ThumbsDown, ChevronRight, BarChart3, Activity, Clock, Mic } from "lucide-react";
import { useState } from "react";

const hotTakes = [
  {
    id: 1,
    question: "Was Salah the right MVP?",
    options: [
      { text: "Yes, 100% deserved", percent: 72, color: "bg-[#00E5FF]" },
      { text: "No, Van Dijk deserved it", percent: 18, color: "bg-[#00E5FF]/30" },
      { text: "Someone else", percent: 10, color: "bg-[#00E5FF]/30" }
    ],
    votes: "8.7K votes"
  },
  {
    id: 2,
    question: "Was the VAR decision fair?",
    options: [
      { text: "Correct decision", percent: 32, color: "bg-gray-500" },
      { text: "Robbery!", percent: 58, color: "bg-[#D32F2F]" },
      { text: "Too close to call", percent: 10, color: "bg-[#00E5FF]/30" }
    ],
    votes: "7.9K votes"
  },
  {
    id: 3,
    question: "What won Liverpool the game?",
    options: [
      { text: "Midfield control", percent: 41, color: "bg-[#00E5FF]" },
      { text: "Salah's brilliance", percent: 37, color: "bg-[#00E5FF]/80" },
      { text: "City's poor finishing", percent: 22, color: "bg-[#00E5FF]/50" }
    ],
    votes: "6.3K votes"
  }
];

const highlights = [
  {
    id: 1,
    user: "FootyFan99",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
    text: "That referee decision was absolutely shocking! Listen to my rant. 😠 #Robbery",
    duration: "0:42",
    likes: "24K"
  },
  {
    id: 2,
    user: "RedArmyTalk",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
    text: "Midfield was everywhere today. We controlled the game! 🔴 #LIVMCI",
    duration: "0:31",
    likes: "18K"
  },
  {
    id: 3,
    user: "CityzenKDB17",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50&h=50&fit=crop",
    text: "We were so wasteful in front of goal. This is frustrating. 😩",
    duration: "0:28",
    likes: "12K"
  }
];

const rosterLIV = [
  { num: 11, name: "Mo Salah", rating: "9.2", MVP: true, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
  { num: 4, name: "Virgil van Dijk", rating: "8.4", MVP: false, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { num: 66, name: "Trent Alexander-Arnold", rating: "7.9", MVP: false, img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop" }
];

const rosterMCI = [
  { num: 9, name: "Erling Haaland", rating: "6.1", MVP: false, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" },
  { num: 17, name: "Kevin De Bruyne", rating: "6.3", MVP: false, img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" },
  { num: 20, name: "Bernardo Silva", rating: "6.4", MVP: false, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" }
];

export default function MatchDetailsPage() {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [activeRoster, setActiveRoster] = useState('LIVERPOOL');

  return (
    <div className="w-full max-w-[1000px] mx-auto p-4 md:p-6 bg-[#050505] min-h-screen text-white pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/insights" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#00E5FF]" />
        </Link>
        
        <div className="flex items-center gap-6 md:gap-12">
          {/* LIV */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#D32F2F] flex items-center justify-center text-white font-black text-xl mb-2 shadow-[0_0_20px_rgba(211,47,47,0.4)]">
              LIV
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase">Liverpool</span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
              2 - 0
            </div>
            <span className="text-[10px] text-[#00E5FF] font-black tracking-widest uppercase">FULL TIME</span>
          </div>

          {/* MCI */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#4FC3F7] flex items-center justify-center text-black font-black text-xl mb-2 shadow-[0_0_20px_rgba(79,195,247,0.4)]">
              MCI
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase">Man City</span>
          </div>
        </div>

        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
          <Share className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Scorers */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium mb-8">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[6px]">⚽</div> Salah 2'</div>
        <span>•</span>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[6px]">⚽</div> Konate 78'</div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-[#121212] rounded-full p-1 mb-8">
        {['OVERVIEW', 'TIMELINE', 'STATS', 'STAND'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold tracking-widest transition-colors ${activeTab === tab ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : 'text-gray-500 hover:text-white'}`}
          >
            {tab === 'OVERVIEW' && <Activity className="w-4 h-4" />}
            {tab === 'TIMELINE' && <Clock className="w-4 h-4" />}
            {tab === 'STATS' && <BarChart3 className="w-4 h-4" />}
            {tab === 'STAND' && <Mic className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Content */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-10">
          
          {/* Fan Voted MVP */}
          <section className="bg-[#121212] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
            {/* Background Heatmap Graphic */}
            <div className="absolute top-0 right-0 w-2/3 h-full opacity-30 pointer-events-none">
               <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Football_field_blank.svg/800px-Football_field_blank.svg.png')] bg-contain bg-no-repeat bg-right-top" style={{ filter: 'invert(1) opacity(0.3)' }} />
               <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-red-600 rounded-full blur-3xl opacity-60" />
               <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-60" />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xs font-black tracking-widest text-white uppercase">FAN VOTED MVP</h2>
              <Eye className="w-3 h-3 text-gray-500" />
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-[3px] border-[#00E5FF] p-1 overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#00E5FF] text-black font-black text-lg px-3 py-1 rounded-lg">
                  9.2
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h3 className="text-3xl font-black">Mo Salah</h3>
                  <span className="px-2 py-0.5 border border-[#00E5FF]/50 text-[#00E5FF] text-[10px] font-black rounded tracking-widest">MVP</span>
                </div>
                <p className="text-sm text-gray-400 font-medium mb-6">Liverpool • Forward • #11</p>

                {/* Vote Breakdown */}
                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="bg-[#1A1A1A] rounded-2xl p-4 min-w-[90px] flex flex-col items-center">
                    <Eye className="w-5 h-5 text-[#00E5FF] mb-2" />
                    <span className="text-lg font-black">75%</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">EYE TEST</span>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-2xl p-4 min-w-[90px] flex flex-col items-center">
                    <Shield className="w-5 h-5 text-[#FF4F00] mb-2" />
                    <span className="text-lg font-black">15%</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">SOLID</span>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-2xl p-4 min-w-[90px] flex flex-col items-center">
                    <X className="w-5 h-5 text-gray-400 mb-2" />
                    <span className="text-lg font-black">10%</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">POOR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" className="w-6 h-6 rounded-full border border-black" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" className="w-6 h-6 rounded-full border border-black" />
                  <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50&h=50&fit=crop" className="w-6 h-6 rounded-full border border-black" />
                </div>
                <span className="text-xs font-bold text-gray-400"><span className="text-white">12.4K</span> fans voted</span>
              </div>
              <button className="text-xs text-gray-400 hover:text-white font-bold flex items-center gap-1">
                See how it works <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Match Key Insights */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-white uppercase mb-4">MATCH KEY INSIGHTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <span className="text-yellow-400 text-lg">😃</span>
                  </div>
                  <h3 className="text-[10px] font-black tracking-widest text-white uppercase">FAN SENTIMENT</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Liverpool fans are ecstatic about the midfield control, but concerned about defensive lapses in the first half.
                </p>
                <div className="mt-auto h-12 flex items-end justify-between gap-1 w-full relative">
                   <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 40">
                     <path d="M0,30 Q10,35 20,25 T40,20 T60,15 T80,25 T100,10" fill="none" stroke="#00E5FF" strokeWidth="2" />
                     {/* Dots */}
                     <circle cx="20" cy="25" r="2" fill="#00E5FF" />
                     <circle cx="40" cy="20" r="2" fill="#00E5FF" />
                     <circle cx="60" cy="15" r="2" fill="#00E5FF" />
                     <circle cx="80" cy="25" r="2" fill="#00E5FF" />
                     <circle cx="100" cy="10" r="2" fill="#00E5FF" />
                   </svg>
                </div>
              </div>

              <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#FF4F00]/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#FF4F00]" />
                  </div>
                  <h3 className="text-[10px] font-black tracking-widest text-white uppercase">CONTROVERSY</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  VAR decision on the 35th minute goal remains a hot topic. <span className="text-[#00E5FF] font-bold">68%</span> of neutral fans voted it should have been disallowed.
                </p>
              </div>

              <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-purple-500 fill-purple-500" />
                  </div>
                  <h3 className="text-[10px] font-black tracking-widest text-white uppercase">GAME FLOW</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Liverpool dominated possession and territory in the second half after a tight first 30 minutes.
                </p>
                <div className="mt-auto h-12 flex items-end gap-1 w-full">
                  {/* Random bars to mimic graph */}
                  {[2, 3, 4, 3, 2, 5, 4, 3, 4, 6, 5, 8, 5, 4, 10, 8, 9, 7, 5].map((h, i) => (
                    <div key={i} className="w-full bg-purple-500" style={{ height: `${h*10}%` }} />
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Hot Takes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-black tracking-widest text-white uppercase">HOT TAKES 🔥</h2>
                <span className="text-xs text-gray-500">Live fan opinions</span>
              </div>
              <button className="text-[#00E5FF] text-xs font-bold hover:underline flex items-center gap-1">
                See all <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 hover-scrollbar snap-x">
              {hotTakes.map((take) => (
                <div key={take.id} className="min-w-[280px] md:min-w-[320px] bg-[#121212] border border-white/5 rounded-3xl p-6 snap-start flex flex-col">
                  <h3 className="text-sm font-bold text-white mb-6">{take.question}</h3>
                  <div className="space-y-4 mb-6 flex-1">
                    {take.options.map((opt, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className={opt.percent > 50 ? 'text-white' : 'text-gray-400'}>{opt.text}</span>
                          <span className={opt.percent > 50 && opt.color.includes('D32F2F') ? 'text-[#D32F2F]' : 'text-white'}>{opt.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${opt.color}`} style={{ width: `${opt.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{take.votes}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Highlights from the Stand */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-black tracking-widest text-white uppercase">HIGHLIGHTS FROM THE STAND</h2>
                <span className="text-xs text-gray-500">Top fan audio & reactions</span>
              </div>
              <button className="text-[#00E5FF] text-xs font-bold hover:underline flex items-center gap-1">
                See all <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 hover-scrollbar snap-x">
              {highlights.map((item) => (
                <div key={item.id} className="min-w-[280px] bg-[#121212] border border-white/5 rounded-3xl p-5 snap-start flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={item.avatar} className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className="text-sm font-bold">{item.user}</h4>
                      <span className="text-[10px] font-black tracking-widest text-[#00E5FF] uppercase">Top Rated Audio</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <button className="w-10 h-10 rounded-full bg-[#00E5FF] flex items-center justify-center shrink-0 hover:bg-[#00E5FF]/80">
                      <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                    </button>
                    <div className="flex-1 flex gap-0.5 items-end h-6">
                       {/* Waveform fake */}
                       {[3, 5, 2, 8, 4, 10, 6, 7, 3, 5, 2, 4, 8].map((h, i) => (
                         <div key={i} className={`flex-1 w-full bg-[#00E5FF] rounded-sm`} style={{ height: `${h*10}%` }} />
                       ))}
                    </div>
                    <span className="text-[10px] font-bold text-white shrink-0">{item.duration}</span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-1">
                    {item.text.split(/(#\w+)/).map((part, i) => 
                      part.startsWith('#') ? <span key={i} className="text-[#00E5FF] font-bold">{part}</span> : part
                    )}
                  </p>

                  <div className="flex items-center gap-4 text-gray-400">
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs font-bold">{item.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Match Roster & Ratings */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-white uppercase mb-4">MATCH ROSTER & RATINGS</h2>
            
            <div className="flex bg-[#1A1A1A] rounded-full p-1 mb-6 border border-white/5">
              <button 
                onClick={() => setActiveRoster('LIVERPOOL')}
                className={`flex-1 py-3 rounded-full text-xs font-bold tracking-widest transition-colors ${activeRoster === 'LIVERPOOL' ? 'bg-[#00E5FF] text-black' : 'text-gray-500 hover:text-white'}`}
              >
                LIVERPOOL
              </button>
              <button 
                onClick={() => setActiveRoster('MAN CITY')}
                className={`flex-1 py-3 rounded-full text-xs font-bold tracking-widest transition-colors ${activeRoster === 'MAN CITY' ? 'bg-[#00E5FF] text-black' : 'text-gray-500 hover:text-white'}`}
              >
                MAN CITY
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {activeRoster === 'LIVERPOOL' ? rosterLIV.map((player) => (
                 <div key={player.num} className="bg-[#121212] border border-white/5 hover:bg-white/5 transition-colors rounded-2xl p-4 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden shrink-0">
                        <img src={player.img} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black w-6 text-center">{player.num}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{player.name}</span>
                          {player.MVP && <span className="text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded border border-[#00E5FF]/50 text-[#00E5FF]">MVP</span>}
                        </div>
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg text-sm font-black ${parseFloat(player.rating) >= 8.0 ? 'text-[#00E5FF] border border-[#00E5FF]/30' : 'text-gray-300 border border-white/10'}`}>
                      {player.rating}
                    </div>
                 </div>
               )) : rosterMCI.map((player) => (
                 <div key={player.num} className="bg-[#121212] border border-white/5 hover:bg-white/5 transition-colors rounded-2xl p-4 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden shrink-0">
                        <img src={player.img} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black w-6 text-center">{player.num}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{player.name}</span>
                          {player.MVP && <span className="text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded border border-[#00E5FF]/50 text-[#00E5FF]">MVP</span>}
                        </div>
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg text-sm font-black ${parseFloat(player.rating) >= 8.0 ? 'text-[#00E5FF] border border-[#00E5FF]/30' : 'text-gray-300 border border-white/10'}`}>
                      {player.rating}
                    </div>
                 </div>
               ))}
            </div>

            <button className="w-full mt-6 py-4 rounded-xl border border-white/10 text-sm font-bold text-[#00E5FF] hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              View full lineup & ratings <ChevronRight className="w-4 h-4" />
            </button>

          </section>

        </div>
      )}

    </div>
  );
}
