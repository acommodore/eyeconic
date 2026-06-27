"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, ChevronRight, Zap } from "lucide-react";

const TEAMS = [
  { id: "mci", name: "Man City", short: "MCI", league: "PREMIER LEAGUE", color: "#4FC3F7", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
  { id: "ars", name: "Arsenal", short: "ARS", league: "PREMIER LEAGUE", color: "#EF0107", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
  { id: "liv", name: "Liverpool", short: "LIV", league: "PREMIER LEAGUE", color: "#C8102E", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
  { id: "che", name: "Chelsea", short: "CHE", league: "PREMIER LEAGUE", color: "#034694", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
  { id: "mun", name: "Man United", short: "MUN", league: "PREMIER LEAGUE", color: "#DA291C", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
  { id: "tot", name: "Spurs", short: "TOT", league: "PREMIER LEAGUE", color: "#FFFFFF", logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg", invert: true },
  { id: "rma", name: "Real Madrid", short: "RMA", league: "LALIGA", color: "#FFFFFF", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
  { id: "bar", name: "Barcelona", short: "BAR", league: "LALIGA", color: "#A50044", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
  { id: "bay", name: "Bayern", short: "BAY", league: "BUNDESLIGA", color: "#DC052D", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
  { id: "dor", name: "Dortmund", short: "DOR", league: "BUNDESLIGA", color: "#FDE100", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
  { id: "int", name: "Inter Milan", short: "INT", league: "SERIE A", color: "#010E80", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" },
  { id: "mil", name: "AC Milan", short: "MIL", league: "SERIE A", color: "#FB090B", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" },
  { id: "psg", name: "PSG", short: "PSG", league: "LIGUE 1", color: "#004170", logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" }
];

const SUGGESTED_RIVALS: Record<string, string[]> = {
  mci: ["mun", "liv", "ars"],
  ars: ["tot", "che", "mci"],
  liv: ["mun", "mci", "che"],
  che: ["ars", "tot", "liv"],
  mun: ["mci", "liv", "ars"],
  tot: ["ars", "che"],
  rma: ["bar"],
  bar: ["rma"],
  bay: ["dor"],
  dor: ["bay"],
  int: ["mil"],
  mil: ["int"],
  psg: []
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [favorite, setFavorite] = useState<string | null>(null);
  const [rival, setRival] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);

  const handleNext = (overrideTeamId?: string) => {
    if (step === 1 && (favorite || overrideTeamId)) {
      setStep(2);
      setSearchQuery("");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2 && (rival || overrideTeamId)) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      router.push("/home");
    }, 2500);
  };

  const filteredTeams = TEAMS.filter(t => 
    (step === 2 ? t.id !== favorite : true) &&
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const leagues = Array.from(new Set(filteredTeams.map(t => t.league)));

  const suggestedRivalIds = favorite && SUGGESTED_RIVALS[favorite] ? SUGGESTED_RIVALS[favorite] : [];
  const suggestedRivalTeams = suggestedRivalIds.flatMap(id => {
    const t = TEAMS.find(t => t.id === id);
    return t ? [t] : [];
  });

  const favoriteTeam = TEAMS.find(t => t.id === favorite);
  const rivalTeam = TEAMS.find(t => t.id === rival);

  // Dynamic ambient glow colors based on selection
  const ambientColor1 = step === 1 && favoriteTeam ? favoriteTeam.color : (step === 3 && favoriteTeam ? favoriteTeam.color : "#333333");
  const ambientColor2 = step === 2 && rivalTeam ? rivalTeam.color : (step === 3 && rivalTeam ? rivalTeam.color : "#111111");

  return (
    <div className="min-h-screen bg-background text-foreground text-foreground flex justify-center relative overflow-hidden font-sans">
      
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ background: `radial-gradient(circle at 20% 30%, ${ambientColor1}33 0%, transparent 50%)` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0" 
        />
        <motion.div 
          animate={{ background: `radial-gradient(circle at 80% 70%, ${ambientColor2}33 0%, transparent 50%)` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0" 
        />
      </div>

      <div className="w-full max-w-6xl z-10 flex flex-col relative px-6 md:px-12">
        
        {/* Header */}
        <header className="py-8 flex items-center justify-between relative z-20">
          <button 
            onClick={handleBack} 
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-muted border border-border hover:bg-muted/80 hover:border-white/30 backdrop-blur-md transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          {/* Premium Progress Indicator */}
          <div className="flex gap-3">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="relative w-16 h-1.5 bg-muted/80 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: step > idx ? "100%" : step === idx ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ opacity: step >= idx ? 1 : 0 }}
                />
              </div>
            ))}
          </div>
        </header>

        <main className="flex-1 flex flex-col py-4 pb-32 relative z-10">
          <AnimatePresence mode="wait">
            {isFinishing ? (
              <motion.div
                key="finishing"
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full my-auto"
              >
                 <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-border" />
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-t-2 border-white" 
                    />
                    <Zap className="w-10 h-10 text-foreground animate-pulse" />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">
                   Calibrating Engine
                 </h2>
                 <p className="text-muted-foreground text-lg font-medium tracking-wide">Tuning narrative tension to your allegiances...</p>
              </motion.div>
            ) : (
              <motion.div
                key={`step${step}`}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col h-full"
              >
                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 ${step === 3 ? 'mb-4' : 'mb-16'}`}>
                  <div className="max-w-2xl">
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase leading-[0.9]"
                    >
                      {step === 1 && <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">Where's your<br/>loyalty?</span>}
                      {step === 2 && <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">Name your<br/>rival.</span>}
                      {step === 3 && <span className="text-foreground">The Stage is Set.</span>}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-muted-foreground text-lg md:text-xl font-medium tracking-wide"
                    >
                      {step === 1 && "Select the club that dictates your weekends."}
                      {step === 2 && "Who boils your blood? This is where it gets personal."}
                      {step === 3 && "Your bias is recorded. The engine is primed."}
                    </motion.p>
                  </div>
                  
                  {/* Premium Search Bar */}
                  {step < 3 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative w-full md:w-80 shrink-0 group"
                    >
                      <div className="absolute inset-0 bg-muted rounded-2xl blur-md transition-all duration-300 group-focus-within:bg-muted/80" />
                      <div className="relative bg-card text-card-foreground border border-border rounded-2xl flex items-center overflow-hidden transition-all duration-300 group-focus-within:border-white/30 group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <Search className="absolute left-4 w-5 h-5 text-gray-500" />
                        <input 
                          type="text" 
                          placeholder="Search clubs..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-transparent py-4 pl-12 pr-4 text-foreground placeholder-gray-600 focus:outline-none font-medium tracking-wide"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Step 3: Preference Confirmation */}
                {step === 3 && favoriteTeam && rivalTeam && (
                  <div className="flex-1 flex flex-col items-center justify-start pt-4 relative w-full max-w-lg mx-auto">
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="w-full bg-card/40 backdrop-blur-md border border-border rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
                     >
                       {/* Subtle Background Elements */}
                       <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-[80px] pointer-events-none" />
                       <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

                       {/* Header */}
                       <div className="text-center mb-8 border-b border-border/50 pb-6 relative z-10">
                         <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground">Profile Summary</h3>
                         <p className="text-muted-foreground font-mono text-[10px] md:text-xs mt-2 uppercase tracking-widest">Confirm your allegiances</p>
                       </div>

                       <div className="flex flex-col gap-4 relative z-10">
                         {/* Ledger Row: Favorite Team */}
                         <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                           <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: favoriteTeam.color || '#00e5ff' }} />
                           <div className="pl-4">
                             <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Primary Club</span>
                             <span className="text-lg md:text-xl font-bold text-foreground drop-shadow-md">{favoriteTeam.name}</span>
                           </div>
                           <div className="w-12 h-12 md:w-16 md:h-16 relative">
                             <img src={favoriteTeam.logo} alt={favoriteTeam.short} className={`w-full h-full object-contain ${favoriteTeam.invert ? 'filter dark:invert-0 invert' : ''}`} />
                           </div>
                         </div>

                         {/* Ledger Row: Arch Rival */}
                         <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-red-500/10 relative overflow-hidden group hover:border-red-500/20 transition-colors">
                           <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500/80" />
                           <div className="pl-4">
                             <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest block mb-1">Arch Rival</span>
                             <span className="text-lg md:text-xl font-bold text-foreground drop-shadow-md">{rivalTeam.name}</span>
                           </div>
                           <div className="w-12 h-12 md:w-16 md:h-16 relative">
                             <img src={rivalTeam.logo} alt={rivalTeam.short} className={`w-full h-full object-contain ${rivalTeam.invert ? 'filter dark:invert-0 invert' : ''}`} />
                           </div>
                         </div>
                       </div>
                     </motion.div>
                  </div>
                )}

                {/* Teams Grid by League */}
                {step < 3 && (
                  <div className="flex flex-col gap-12">
                    
                    {/* Suggested Rivals Section */}
                    {step === 2 && !searchQuery && suggestedRivalTeams.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <h3 className="text-sm font-bold tracking-widest uppercase text-red-400">Suggested Rivals</h3>
                          <div className="flex-1 h-[1px] bg-gradient-to-r from-red-500/30 to-transparent" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {suggestedRivalTeams.map(team => {
                            const isSelected = rival === team.id;
                            return (
                              <button
                                key={`sug-${team.id}`}
                                onClick={() => {
                                  setRival(team.id);
                                  setTimeout(() => handleNext(team.id), 400);
                                }}
                                className={`group relative p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 overflow-hidden ${
                                  isSelected 
                                    ? 'bg-muted/80 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-[1.02]' 
                                    : 'bg-muted border-border hover:bg-muted/80 hover:border-white/30 hover:-translate-y-1'
                                }`}
                                style={{
                                  borderWidth: '1px',
                                  borderStyle: 'solid'
                                }}
                              >
                                {isSelected && (
                                  <motion.div 
                                    layoutId="selectedRival"
                                    className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 pointer-events-none" 
                                  />
                                )}
                                <div className="w-16 h-16 relative z-10 transition-transform duration-300 group-hover:scale-110">
                                  <img src={team.logo} alt={team.short} className={`w-full h-full object-contain ${team.invert ? 'filter dark:invert-0 invert' : ''}`} />
                                </div>
                                <span className={`text-sm font-bold tracking-wide text-center w-full z-10 ${isSelected ? 'text-foreground' : 'text-gray-300 group-hover:text-foreground'}`}>
                                  {team.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {leagues.map((league, lIndex) => {
                      const teamsInLeague = filteredTeams.filter(t => t.league === league);
                      if (teamsInLeague.length === 0) return null;
                      
                      return (
                        <motion.div 
                          key={league}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: lIndex * 0.1 }}
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500">{league}</h3>
                            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {teamsInLeague.map(team => {
                              const isSelected = step === 1 ? favorite === team.id : rival === team.id;
                              const hasSelection = step === 1 ? favorite !== null : rival !== null;
                              const isDimmed = hasSelection && !isSelected;

                              return (
                                <button
                                  key={team.id}
                                  onClick={() => {
                                    if (step === 1) {
                                      setFavorite(team.id);
                                      setTimeout(() => handleNext(team.id), 400);
                                    } else {
                                      setRival(team.id);
                                      setTimeout(() => handleNext(team.id), 400);
                                    }
                                  }}
                                  className={`group relative p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 overflow-hidden ${
                                    isSelected 
                                      ? 'bg-muted/80 border-border0 shadow-[0_0_40px_rgba(255,255,255,0.1)] scale-[1.02] z-10' 
                                      : 'bg-card text-card-foreground border-border hover:bg-muted/50 hover:border-border-strong hover:-translate-y-1'
                                  } ${isDimmed ? 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}
                                  style={{ borderWidth: '1px', borderStyle: 'solid' }}
                                >
                                  {isSelected && (
                                    <motion.div 
                                      layoutId={step === 1 ? "selectedFavorite" : "selectedRival"}
                                      className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 pointer-events-none" 
                                    />
                                  )}
                                  
                                  {/* Dynamic color glow behind logo on hover/select */}
                                  <div 
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-[30px] opacity-0 transition-opacity duration-500 pointer-events-none ${isSelected ? 'opacity-30' : 'group-hover:opacity-20'}`}
                                    style={{ backgroundColor: team.color }}
                                  />

                                  <div className="w-16 h-16 relative z-10 transition-transform duration-500 group-hover:scale-110">
                                    <img src={team.logo} alt={team.short} className={`w-full h-full object-contain drop-shadow-lg ${team.invert ? 'filter dark:invert-0 invert' : ''}`} />
                                  </div>
                                  <span className={`text-sm font-bold tracking-wide text-center w-full z-10 transition-colors duration-300 ${isSelected ? 'text-foreground' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                    {team.name}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Fixed Bottom Bar for Step 3 */}
        {!isFinishing && step === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-[#020202] via-[#020202] to-transparent z-50 flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-xl pointer-events-auto">
              <button
                onClick={() => handleNext()}
                className="group relative w-full py-5 rounded-2xl font-black text-sm md:text-base tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 bg-white text-black hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Lock It In <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
