"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";

const TEAMS = [
  { id: "mci", name: "Man City", short: "MCI", league: "ENGLISH PREMIER LEAGUE", bg: "bg-[#4FC3F7]", text: "text-white", border: "border-white/20" },
  { id: "ars", name: "Arsenal", short: "ARS", league: "ENGLISH PREMIER LEAGUE", bg: "bg-red-600", text: "text-white", border: "border-white/20" },
  { id: "liv", name: "Liverpool", short: "LIV", league: "ENGLISH PREMIER LEAGUE", bg: "bg-[#D32F2F]", text: "text-white", border: "border-white/20" },
  { id: "che", name: "Chelsea", short: "CHE", league: "ENGLISH PREMIER LEAGUE", bg: "bg-blue-700", text: "text-white", border: "border-white/20" },
  { id: "mun", name: "Man United", short: "MUN", league: "ENGLISH PREMIER LEAGUE", bg: "bg-red-700", text: "text-white", border: "border-white/20" },
  { id: "tot", name: "Spurs", short: "TOT", league: "ENGLISH PREMIER LEAGUE", bg: "bg-white", text: "text-black", border: "border-gray-200" },
  { id: "rma", name: "Real Madrid", short: "RMA", league: "LALIGA EA SPORTS", bg: "bg-white", text: "text-black", border: "border-gray-200" },
  { id: "bar", name: "Barcelona", short: "BAR", league: "LALIGA EA SPORTS", bg: "bg-blue-800", text: "text-red-500", border: "border-red-500/50" },
  { id: "atm", name: "Atletico", short: "ATM", league: "LALIGA EA SPORTS", bg: "bg-red-600", text: "text-white", border: "border-white/20" },
  { id: "bay", name: "Bayern", short: "BAY", league: "BUNDESLIGA", bg: "bg-red-600", text: "text-white", border: "border-white/20" },
  { id: "dor", name: "Dortmund", short: "DOR", league: "BUNDESLIGA", bg: "bg-yellow-400", text: "text-black", border: "border-black/20" },
  { id: "juv", name: "Juventus", short: "JUV", league: "SERIE A", bg: "bg-black", text: "text-white", border: "border-white/20" },
  { id: "mil", name: "AC Milan", short: "MIL", league: "SERIE A", bg: "bg-red-600", text: "text-black", border: "border-black/50" },
  { id: "psg", name: "PSG", short: "PSG", league: "LIGUE 1", bg: "bg-blue-900", text: "text-red-500", border: "border-white/20" }
];

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
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (step === 2) {
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
            <div className="font-bold text-xs tracking-widest text-gray-400">{step}/2</div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#FF4F00]"
              initial={{ width: step === 1 ? "0%" : "50%" }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
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
                      {step === 1 ? "Where's your loyalty?" : "Now pick your rival"}
                    </h1>
                    <p className="text-gray-400 text-lg">
                      {step === 1 ? "Choose your club to anchor your feed." : "This is where it gets personal."}
                    </p>
                  </div>
                  
                  {/* Search Bar */}
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
                </div>

                {/* Teams Grid by League */}
                <div className="flex flex-col gap-10">
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
                              onClick={() => step === 1 ? setFavorite(team.id) : setRival(team.id)}
                              className={`relative p-3 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 border ${
                                isSelected 
                                  ? 'border-[#FF4F00] bg-[#FF4F00]/10 shadow-[0_0_20px_rgba(255,79,0,0.15)]' 
                                  : 'border-white/5 bg-[#121212] hover:bg-white/10'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shadow-md border ${team.border} ${team.bg} ${team.text}`}>
                                {team.short}
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
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Fixed Bottom Bar */}
        {!isFinishing && (
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-20">
            <button
              onClick={handleNext}
              disabled={step === 1 ? !favorite : !rival}
              className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                (step === 1 ? favorite : rival)
                  ? 'bg-[#FF4F00] text-white hover:bg-[#FF4F00]/90 shadow-[0_0_20px_rgba(255,79,0,0.3)]' 
                  : 'bg-[#121212] text-gray-500 border border-white/5 cursor-not-allowed'
              }`}
            >
              CONTINUE
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
