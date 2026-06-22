"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";

const TEAMS = [
  { id: "mci", name: "Man City", short: "MCI", league: "ENGLISH PREMIER LEAGUE", bg: "bg-[#4FC3F7]", text: "text-white", border: "border-white/20", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
  { id: "ars", name: "Arsenal", short: "ARS", league: "ENGLISH PREMIER LEAGUE", bg: "bg-red-600", text: "text-white", border: "border-white/20", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
  { id: "liv", name: "Liverpool", short: "LIV", league: "ENGLISH PREMIER LEAGUE", bg: "bg-[#D32F2F]", text: "text-white", border: "border-white/20", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
  { id: "che", name: "Chelsea", short: "CHE", league: "ENGLISH PREMIER LEAGUE", bg: "bg-blue-700", text: "text-white", border: "border-white/20", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
  { id: "mun", name: "Man United", short: "MUN", league: "ENGLISH PREMIER LEAGUE", bg: "bg-red-700", text: "text-white", border: "border-white/20", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
  { id: "tot", name: "Spurs", short: "TOT", league: "ENGLISH PREMIER LEAGUE", bg: "bg-white", text: "text-black", border: "border-gray-200", logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" },
  { id: "rma", name: "Real Madrid", short: "RMA", league: "LALIGA EA SPORTS", bg: "bg-white", text: "text-black", border: "border-gray-200", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
  { id: "bar", name: "Barcelona", short: "BAR", league: "LALIGA EA SPORTS", bg: "bg-blue-800", text: "text-red-500", border: "border-red-500/50", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
  { id: "atm", name: "Atletico", short: "ATM", league: "LALIGA EA SPORTS", bg: "bg-red-600", text: "text-white", border: "border-white/20", logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg" },
  { id: "bay", name: "Bayern", short: "BAY", league: "BUNDESLIGA", bg: "bg-red-600", text: "text-white", border: "border-white/20", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
  { id: "dor", name: "Dortmund", short: "DOR", league: "BUNDESLIGA", bg: "bg-yellow-400", text: "text-black", border: "border-black/20", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
  { id: "juv", name: "Juventus", short: "JUV", league: "SERIE A", bg: "bg-black", text: "text-white", border: "border-white/20", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo_%28white%29.svg" },
  { id: "mil", name: "AC Milan", short: "MIL", league: "SERIE A", bg: "bg-red-600", text: "text-black", border: "border-black/50", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" },
  { id: "psg", name: "PSG", short: "PSG", league: "LIGUE 1", bg: "bg-white", text: "text-black", border: "border-white/20", logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" }
];

const SUGGESTED_RIVALS: Record<string, string[]> = {
  mci: ["mun", "liv", "ars"],
  ars: ["tot", "che", "mci"],
  liv: ["mun", "mci", "che"],
  che: ["ars", "tot", "liv"],
  mun: ["mci", "liv", "ars"],
  tot: ["ars", "che"],
  rma: ["bar", "atm"],
  bar: ["rma", "atm"],
  atm: ["rma", "bar"],
  bay: ["dor"],
  dor: ["bay"],
  juv: ["mil"],
  mil: ["juv"],
  psg: []
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [favorite, setFavorite] = useState<string | null>(null);
  const [rival, setRival] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);

  const handleNext = () => {
    if (step === 1 && favorite) {
      setStep(2);
      setSearchQuery("");
      window.scrollTo(0, 0);
    } else if (step === 2 && rival) {
      setStep(3);
      window.scrollTo(0, 0);
    } else if (step === 3) {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
      setSearchQuery("");
    } else {
      router.back();
    }
  };

  const finishOnboarding = () => {
    setIsFinishing(true);
    setTimeout(() => {
      router.push("/discover");
    }, 2000);
  };

  const filteredTeams = TEAMS.filter(t => 
    (step === 2 ? t.id !== favorite : true) &&
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group teams by league
  const leagues = Array.from(new Set(filteredTeams.map(t => t.league)));

  const suggestedRivalIds = favorite && SUGGESTED_RIVALS[favorite] ? SUGGESTED_RIVALS[favorite] : [];
  const suggestedRivalTeams = suggestedRivalIds.flatMap(id => {
    const t = TEAMS.find(t => t.id === id);
    return t ? [t] : [];
  });

  const favoriteTeam = TEAMS.find(t => t.id === favorite);
  const rivalTeam = TEAMS.find(t => t.id === rival);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex justify-center">
      {/* Expanded container for PC */}
      <div className="w-full max-w-5xl bg-[#050505] min-h-screen flex flex-col relative px-4 md:px-8">
        
        {/* Header */}
        <header className="py-6 relative z-10 bg-[#050505] sticky top-0">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handleBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="font-bold text-xs tracking-widest text-gray-400">STEP {step}</div>
            <div className="font-bold text-xs tracking-widest text-gray-400">{step}/3</div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#FF4F00]"
              initial={{ width: step === 1 ? "0%" : step === 2 ? "33%" : "66%" }}
              animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </header>

        <main className="flex-1 flex flex-col py-8 pb-32 relative z-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            {isFinishing ? (
              <motion.div
                key="finishing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full my-auto"
              >
                 <div className="w-16 h-16 border-4 border-white/10 border-t-[#FF4F00] rounded-full animate-spin mb-8" />
                 <h2 className="text-3xl font-black uppercase mb-4 tracking-tighter">Building Your Profile</h2>
                 <p className="text-gray-400">Tuning the emotion engine to your preferences...</p>
              </motion.div>
            ) : (
              <motion.div
                key={`step${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                      {step === 1 && "Where's your loyalty?"}
                      {step === 2 && "Now pick your rival"}
                      {step === 3 && "Is this right?"}
                    </h1>
                    <p className="text-gray-400 text-lg">
                      {step === 1 && "Choose your club to anchor your feed."}
                      {step === 2 && "This is where it gets personal."}
                      {step === 3 && "Your entire feed will be tuned to this rivalry."}
                    </p>
                  </div>
                  
                  {/* Search Bar (Only step 1 & 2) */}
                  {step < 3 && (
                    <div className="relative w-full md:w-72 shrink-0">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" 
                        placeholder="Find your club" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl py-4 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4F00] transition-colors"
                      />
                    </div>
                  )}
                </div>

                {/* Step 3 Confirmation Graphic */}
                {step === 3 && favoriteTeam && rivalTeam && (
                  <div className="flex flex-col items-center justify-center py-10">
                     <div className="flex items-center gap-6 md:gap-12 w-full justify-center max-w-2xl">
                       
                       <div className="flex flex-col items-center gap-4 flex-1">
                         <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center p-4 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20 ${favoriteTeam.bg}`}>
                           <img src={favoriteTeam.logo} alt={favoriteTeam.short} className={`w-full h-full object-contain drop-shadow-md ${favoriteTeam.id === 'tot' || favoriteTeam.id === 'juv' ? 'filter dark:invert-0 invert' : ''}`} />
                         </div>
                         <div className="text-center">
                           <span className="text-[10px] text-[#00E5FF] font-bold tracking-widest uppercase mb-1 block">YOUR CLUB</span>
                           <span className="text-xl font-black tracking-wide">{favoriteTeam.name}</span>
                         </div>
                       </div>

                       <div className="flex flex-col items-center">
                         <span className="text-4xl md:text-6xl font-black tracking-tighter text-gray-500">VS</span>
                       </div>

                       <div className="flex flex-col items-center gap-4 flex-1">
                         <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center p-4 shadow-[0_0_30px_rgba(255,79,0,0.1)] border border-[#FF4F00]/50 ${rivalTeam.bg}`}>
                           <img src={rivalTeam.logo} alt={rivalTeam.short} className={`w-full h-full object-contain drop-shadow-md ${rivalTeam.id === 'tot' || rivalTeam.id === 'juv' ? 'filter dark:invert-0 invert' : ''}`} />
                         </div>
                         <div className="text-center">
                           <span className="text-[10px] text-[#FF4F00] font-bold tracking-widest uppercase mb-1 block">YOUR RIVAL</span>
                           <span className="text-xl font-black tracking-wide">{rivalTeam.name}</span>
                         </div>
                       </div>

                     </div>
                     
                     <p className="text-center text-sm text-gray-400 mt-16 max-w-md">
                       Your dashboard, alerts, and discover feed will prioritize updates from this historic matchup.
                     </p>
                  </div>
                )}

                {/* Teams Grid by League */}
                {step < 3 && (
                  <div className="flex flex-col gap-10">
                    
                    {/* Suggested Rivals Section (Step 2 Only) */}
                    {step === 2 && !searchQuery && suggestedRivalTeams.length > 0 && (
                      <div className="bg-[#121212]/50 border border-[#FF4F00]/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF4F00]/10 via-transparent to-transparent pointer-events-none" />
                        <div className="inline-block px-4 py-1.5 mb-6 rounded bg-[#FF4F00]/10 border border-[#FF4F00]/30 text-[#FF4F00] text-xs font-bold tracking-widest uppercase relative z-10">
                          SUGGESTED RIVALS
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 relative z-10">
                          {suggestedRivalTeams.map(team => {
                            const isSelected = rival === team.id;
                            return (
                              <button
                                key={`sug-${team.id}`}
                                onClick={() => {
                                  setRival(team.id);
                                  setTimeout(() => {
                                    setStep(3);
                                    window.scrollTo(0, 0);
                                  }, 250);
                                }}
                                className={`relative p-3 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 border ${
                                  isSelected 
                                    ? 'border-[#FF4F00] bg-[#FF4F00]/10 shadow-[0_0_20px_rgba(255,79,0,0.15)]' 
                                    : 'border-[#FF4F00]/20 bg-[#121212] hover:bg-white/10'
                                }`}
                              >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center p-1.5 shadow-md border ${team.border} ${team.bg}`}>
                                  <img src={team.logo} alt={team.short} className={`w-full h-full object-contain ${team.id === 'tot' || team.id === 'juv' ? 'filter dark:invert-0 invert' : ''}`} />
                                </div>
                                <span className={`text-[10px] font-bold tracking-wide text-center truncate w-full ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                                  {team.name}
                                </span>
                                {isSelected && (
                                  <motion.div layoutId="outline2" className="absolute inset-0 border-2 border-[#FF4F00] rounded-xl pointer-events-none" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {leagues.map(league => (
                      <div key={league}>
                        {/* League Pill */}
                        <div className="inline-block px-4 py-1.5 mb-6 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-widest uppercase">
                          {league}
                        </div>
                        
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                          {filteredTeams.filter(t => t.league === league).map(team => {
                            const isSelected = step === 1 ? favorite === team.id : rival === team.id;
                            return (
                              <button
                                key={team.id}
                                onClick={() => {
                                  if (step === 1) {
                                    setFavorite(team.id);
                                    // Auto advance
                                    setTimeout(() => {
                                      setStep(2);
                                      setSearchQuery("");
                                      window.scrollTo(0, 0);
                                    }, 250);
                                  } else {
                                    setRival(team.id);
                                    // Auto advance
                                    setTimeout(() => {
                                      setStep(3);
                                      window.scrollTo(0, 0);
                                    }, 250);
                                  }
                                }}
                                className={`relative p-3 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 border ${
                                  isSelected 
                                    ? 'border-[#FF4F00] bg-[#FF4F00]/10 shadow-[0_0_20px_rgba(255,79,0,0.15)]' 
                                    : 'border-white/5 bg-[#121212] hover:bg-white/10'
                                }`}
                              >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center p-1.5 shadow-md border ${team.border} ${team.bg}`}>
                                  <img src={team.logo} alt={team.short} className={`w-full h-full object-contain ${team.id === 'tot' || team.id === 'juv' ? 'filter dark:invert-0 invert' : ''}`} />
                                </div>
                                <span className={`text-[10px] font-bold tracking-wide text-center truncate w-full ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                                  {team.name}
                                </span>
                                {isSelected && (
                                  <motion.div layoutId={`outline${step}`} className="absolute inset-0 border-2 border-[#FF4F00] rounded-xl pointer-events-none" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Fixed Bottom Bar */}
        {!isFinishing && step === 3 && (
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-20">
            <button
              onClick={handleNext}
              disabled={!rival}
              className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                rival
                  ? 'bg-[#FF4F00] text-white hover:bg-[#FF4F00]/90 shadow-[0_0_20px_rgba(255,79,0,0.3)]' 
                  : 'bg-[#121212] text-gray-500 border border-white/5 cursor-not-allowed'
              }`}
            >
              {step === 3 ? "CONFIRM & ENTER" : "CONTINUE"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
