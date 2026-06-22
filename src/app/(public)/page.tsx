"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Activity, Flame, ArrowRight, Play, Users, CheckCircle2, XCircle, AlertTriangle, Terminal as TerminalIcon, Globe
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white selection:bg-[#00E5FF]/30 font-sans transition-colors duration-500">
      {/* Global Background Grid & Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10 dark:opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Navbar />
      <main className="flex flex-col items-center overflow-hidden relative z-10">
        <HeroSection />
        <ProblemAndShiftSection />
        <TerminalSection />
        <FeaturesSection />
        <SocialProofSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent border-b border-gray-300 dark:border-white/5 transition-colors">
      <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md transition-colors" />
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-white/10 flex items-center justify-center relative overflow-hidden group transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF] to-[#FF7F50] opacity-10 dark:opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
            <Activity className="w-4 h-4 text-gray-900 dark:text-white relative z-10 transition-colors" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white transition-colors">Eyeconic</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login" className="hidden sm:block text-xs font-bold text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors uppercase tracking-widest">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-20 overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-500 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
      {/* Heavy Dark Overlay */}
      <div className="absolute inset-0 bg-white/60 dark:bg-[#050505]/90 z-0" />

      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 mt-10">
        <div className="flex-1 text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-8 transition-colors">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#00E5FF] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-black dark:text-gray-300 uppercase font-black">Live Intelligence Engine</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] text-gray-900 dark:text-white mb-6 transition-colors">
              SEE WHAT'S<br/>
              <span className="text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-gray-400 dark:to-gray-600">
                WORTH WATCHING.
              </span>
            </h1>
            <h2 className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm md:text-sm mb-8 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)] font-bold">
              STATS ARE DECEPTIVE
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-12 tracking-wide max-w-xl leading-relaxed transition-colors">
              Eyeconic parses live crowd sentiment, momentum swings, and tension to broadcast exactly where the drama is happening, right now.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 font-mono">
              <Link href="/onboarding" className="group relative w-full sm:w-auto bg-gray-900 text-white dark:bg-white dark:text-black font-bold text-sm tracking-widest py-4 px-8 overflow-hidden hover:scale-105 transition-all flex justify-center items-center gap-3 rounded-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                GET STARTED <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Premium Holographic Terminal */}
        <div className="flex-1 w-full relative h-[600px] hidden lg:block perspective-[2000px]">
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateY: 15, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateY: -5, rotateX: 5 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[480px] transform-style-3d group"
          >
            {/* Glow Behind */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#00E5FF]/30 to-[#FF7F50]/20 blur-2xl opacity-30 dark:opacity-50 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity duration-1000" />
            
            <div className="relative backdrop-blur-2xl bg-white/60 dark:bg-black/60 border border-gray-300 dark:border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden font-mono transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent pointer-events-none" />
              
              {/* Terminal Header */}
              <div className="px-6 py-4 border-b border-gray-300 dark:border-white/10 flex items-center justify-between bg-black/5 dark:bg-white/5 transition-colors">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs tracking-widest uppercase">
                  <TerminalIcon className="w-4 h-4 text-[#00E5FF]" /> EYECONIC_OS v2.0
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-white/20" />
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2 text-[#00E5FF]">
                    <span className="w-2 h-2 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Global Signal Active</span>
                  </div>
                </div>
                
                <div className="space-y-6 text-sm">
                  <div className="relative p-4 bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg overflow-hidden group/item hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                     <div className="absolute left-0 top-0 w-1 h-full bg-[#FF7F50] shadow-[0_0_15px_#FF7F50]" />
                     <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                         <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" className="w-5 h-5 object-contain" alt="RMA" />
                         <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black tracking-widest">VS</span>
                         <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-5 h-5 object-contain" alt="MCI" />
                       </div>
                       <span className="text-[#FF7F50] font-black drop-shadow-[0_0_8px_rgba(255,79,0,0.6)]">98 EMTN</span>
                     </div>
                     <div className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest flex items-center gap-2">
                        <Flame className="w-3 h-3 text-[#FF7F50]" /> Critical Sentiment
                     </div>
                  </div>

                  <div className="relative p-4 border border-gray-300 dark:border-white/5 rounded-lg group/item hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                     <div className="absolute left-0 top-0 w-1 h-full bg-[#00E5FF]" />
                     <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                         <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-5 h-5 object-contain" alt="ARS" />
                         <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black tracking-widest">VS</span>
                         <img src="https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" className="w-5 h-5 object-contain" alt="PSG" />
                       </div>
                       <span className="text-[#00E5FF] font-bold">85 EMTN</span>
                     </div>
                  </div>

                  <div className="relative p-4 border border-gray-300 dark:border-white/5 rounded-lg group/item hover:bg-black/5 dark:hover:bg-white/5 transition-colors opacity-60">
                     <div className="absolute left-0 top-0 w-1 h-full bg-gray-400 dark:bg-gray-600" />
                     <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" className="w-5 h-5 object-contain drop-shadow-md" alt="INT" />
                         <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black tracking-widest">VS</span>
                         <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" className="w-5 h-5 object-contain" alt="MIL" />
                       </div>
                       <span className="text-gray-600 dark:text-gray-500 font-bold transition-colors">42 EMTN</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProblemAndShiftSection() {
  return (
    <section id="shift" className="w-full py-24 px-6 bg-white dark:bg-black relative border-y border-gray-300 dark:border-white/5 transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/[0.03] dark:from-white/[0.03] to-transparent pointer-events-none z-0" />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#00E5FF]/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#FF7F50]/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white tracking-tighter transition-colors"
          >
            Traditional apps show you what happened.<br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">
              Eyeconic shows you what is worth watching.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto tracking-wide leading-relaxed font-medium transition-colors"
          >
            Instead of checking 5 different apps to figure out which game is getting exciting, 
            <span className="text-gray-900 dark:text-white font-bold transition-colors"> Eyeconic </span> 
            does the heavy lifting. Powered by our proprietary <span className="text-[#00E5FF] font-bold">Attention Layer</span>, we analyze real-time crowd noise, tactical shifts, and momentum spikes to tell you exactly when a boring 0-0 draw turns into an absolute thriller.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {/* Traditional Feeds */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-[#080808] border border-gray-300 dark:border-white/5 relative overflow-hidden transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 dark:bg-gray-800 transition-colors" />
            <h3 className="text-sm font-mono font-bold mb-6 text-gray-500 dark:text-gray-600 uppercase tracking-[0.2em] transition-colors">Traditional Feeds</h3>
            <ul className="space-y-4">
              {['Endless scrolling', 'Blind channel surfing', 'Static scores', 'Missed moments', 'Guesswork'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-500 dark:text-gray-600 text-base font-medium tracking-wide transition-colors">
                  <XCircle className="w-4 h-4 opacity-50 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* The Attention Layer */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#00E5FF]/10 dark:from-[#00E5FF]/[0.05] to-transparent border border-[#00E5FF]/20 relative overflow-hidden group transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-blue-500 shadow-[0_0_20px_#00E5FF]" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00E5FF]/10 blur-[80px] rounded-full group-hover:bg-[#00E5FF]/20 transition-colors duration-700" />
            
            <h3 className="text-sm font-mono font-bold mb-6 text-gray-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3 relative z-10 transition-colors">
              <Activity className="w-4 h-4 text-[#00E5FF]" /> Eyeconic
            </h3>
            <ul className="space-y-4 relative z-10">
              {['Instant match intelligence', 'Know what\'s worth watching', 'Live momentum insights', 'Timely game alerts', 'Watch with confidence'].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-4 text-gray-900 dark:text-white text-base font-medium tracking-wide transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" /> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "The EMTN Score",
      desc: "Our live algorithm quantifies match excitement using real-time crowd noise, momentum shifts, and tactical data.",
      colSpan: "md:col-span-2",
      icon: <Activity className="w-5 h-5 text-[#00E5FF]" />,
      glowColor: "rgba(0, 229, 255, 0.4)",
      borderColor: "border-[#00E5FF]/30",
    },
    {
      title: "Smart Match Routing",
      desc: "Never miss a thriller. Get instantly redirected to the best match happening right now, completely hands-free.",
      colSpan: "md:col-span-1",
      icon: <Flame className="w-5 h-5 text-[#FF7F50]" />,
      glowColor: "rgba(255, 79, 0, 0.4)",
      borderColor: "border-[#FF7F50]/30",
    },
    {
      title: "Live Audio Rooms",
      desc: "Drop directly into heated fan discussions exactly when a controversial call or crucial goal happens.",
      colSpan: "md:col-span-1",
      icon: <Users className="w-5 h-5 text-purple-400" />,
      glowColor: "rgba(168, 85, 247, 0.4)",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Sentiment Parsing",
      desc: "Instantly see what the crowd is saying. Our AI breaks down fan debates and tactical reactions in real time.",
      colSpan: "md:col-span-2",
      icon: <Play className="w-5 h-5 text-green-400" />,
      glowColor: "rgba(74, 222, 128, 0.4)",
      borderColor: "border-green-500/30",
    }
  ];

  return (
    <section id="features" className="w-full py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-[#050515] dark:via-[#050505] dark:to-[#150515] relative overflow-hidden transition-colors duration-500">

      
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tighter drop-shadow-xl transition-colors">The Engine</h3>
          <p className="text-[#00E5FF] font-mono tracking-widest mt-4 text-sm md:text-base uppercase">POWERED BY THE ATTENTION LAYER</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 perspective-[1000px]">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: "easeOut", duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`group relative p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-[#080808] border border-gray-300 dark:border-white/5 transition-all duration-300 ${feat.colSpan} overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]`}
            >
              {/* Spinning / Glowing Gradient background on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${feat.glowColor} 0%, transparent 70%)`, filter: "blur(40px)" }}
              />
              
              {/* Dynamic border highlight */}
              <div className={`absolute inset-0 border rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${feat.borderColor}`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-300 dark:border-white/10 flex items-center justify-center mb-6 shadow-inner relative group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: feat.glowColor.replace('0.4', '1') }} />
                  {feat.icon}
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight transition-colors">{feat.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed tracking-wide transition-colors">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type SimulationMode = 'idle' | 'tension' | 'momentum' | 'chaos';

type MatchItem = {
  id: string;
  teams: string;
  score: string;
  timeSeconds: number;
  emtn: number;
};

function TerminalSection() {
  const [simulationMode, setSimulationMode] = useState<SimulationMode>('idle');
  const [selectedMatchId, setSelectedMatchId] = useState<string>('1');
  const [dataPoints, setDataPoints] = useState<number[]>([20, 30, 25, 45, 60, 50, 75, 80, 95]);
  const [matches, setMatches] = useState<MatchItem[]>([
    { id: '1', teams: 'RMA vs MCI', score: '[ 2 - 2 ]', timeSeconds: 88 * 60, emtn: 98 },
    { id: '2', teams: 'ARS vs PSG', score: '[ 1 - 0 ]', timeSeconds: 65 * 60, emtn: 85 },
    { id: '3', teams: 'INT vs MIL', score: '[ 0 - 0 ]', timeSeconds: 32 * 60, emtn: 42 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        let nextValue = prev[prev.length - 1];
        
        switch (simulationMode) {
          case 'idle':
            nextValue += (Math.random() * 20 - 10);
            nextValue = Math.max(10, Math.min(100, nextValue));
            break;
          case 'tension':
            nextValue += (Math.random() * 5 - 10); // Drops and stays low
            nextValue = Math.max(5, Math.min(30, nextValue));
            break;
          case 'momentum':
            nextValue += (Math.random() * 15 + 5); // Consistently rises
            nextValue = Math.max(50, Math.min(100, nextValue));
            break;
          case 'chaos':
            nextValue += (Math.random() * 100 - 50); // Wild swings
            nextValue = Math.max(0, Math.min(100, nextValue));
            break;
        }

        return [...prev.slice(1), nextValue];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [simulationMode]);

  // Tick the clock and slightly fluctuate non-main matches
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setMatches(prev => prev.map(match => {
        let nextTime = match.timeSeconds + 1;
        if (nextTime > 95 * 60) nextTime = 95 * 60; // Max time limit

        let nextEmtn = match.emtn;
        if (match.id !== selectedMatchId) {
          nextEmtn += (Math.random() * 4 - 2);
          nextEmtn = Math.max(10, Math.min(99, nextEmtn));
        }

        return { ...match, timeSeconds: nextTime, emtn: nextEmtn };
      }));
    }, 1000);
    return () => clearInterval(clockInterval);
  }, [selectedMatchId]);

  // Sync the main match's score with the data points
  useEffect(() => {
    setMatches(prev => prev.map(m => m.id === selectedMatchId ? { ...m, emtn: dataPoints[dataPoints.length - 1] } : m));
  }, [dataPoints, selectedMatchId]);

  const pathD = `M ${dataPoints.map((p, i) => `${i * (100 / (dataPoints.length - 1))} ${100 - p}`).join(' L ')}`;
  
  const selectedMatch = matches.find(m => m.id === selectedMatchId);

  const alerts = {
    idle: {
      color: "text-[#00E5FF]", bg: "bg-[#00E5FF]/5", border: "border-[#00E5FF]/20", shadow: "shadow-[inset_0_0_30px_rgba(0,229,255,0.05)] dark:shadow-[inset_0_0_30px_rgba(0,229,255,0.1)]", gradient: "via-[#00E5FF]",
      icon: <Activity className="w-4 h-4 animate-pulse" />, title: "SYSTEM NORMAL - MONITORING", desc: "All systems nominal. Analyzing baseline fan sentiment across global leagues.", pill: "STABLE", dot: "bg-[#00E5FF] animate-pulse"
    },
    tension: {
      color: "text-[#FFBD2E]", bg: "bg-[#FFBD2E]/5", border: "border-[#FFBD2E]/20", shadow: "shadow-[inset_0_0_30px_rgba(255,189,46,0.05)] dark:shadow-[inset_0_0_30px_rgba(255,189,46,0.1)]", gradient: "via-[#FFBD2E]",
      icon: <Activity className="w-4 h-4" />, title: "SYSTEM ALERT - UNUSUAL CROWD SILENCE", desc: "Extreme drop in social volume. High tension. Anticipating major match event.", pill: "TENSION 99%", dot: "bg-[#FFBD2E]"
    },
    momentum: {
      color: "text-[#FF7F50]", bg: "bg-[#FF7F50]/5", border: "border-[#FF7F50]/20", shadow: "shadow-[inset_0_0_30px_rgba(255,79,0,0.05)] dark:shadow-[inset_0_0_30px_rgba(255,79,0,0.1)]", gradient: "via-[#FF7F50]",
      icon: <AlertTriangle className="w-4 h-4 animate-pulse" />, title: "SYSTEM ALERT - MOMENTUM SHIFT", desc: `${selectedMatch?.teams.split(' vs ')[0] || 'Madrid'} pressing heavily. Crowd sentiment spiking exponentially in the last 120s.`, pill: "+400%", dot: "bg-[#FF7F50] animate-ping"
    },
    chaos: {
      color: "text-[#FF5F56]", bg: "bg-[#FF5F56]/10", border: "border-[#FF5F56]/40", shadow: "shadow-[inset_0_0_50px_rgba(255,95,86,0.1)] dark:shadow-[inset_0_0_50px_rgba(255,95,86,0.2)]", gradient: "via-[#FF5F56]",
      icon: <AlertTriangle className="w-4 h-4 animate-ping" />, title: "CRITICAL - MASS DISAGREEMENT DETECTED", desc: "VAR review initiated. Severe polarization across all communities. High volatility.", pill: "CHAOS", dot: "bg-[#FF5F56] animate-pulse"
    }
  };
  const currentAlert = alerts[simulationMode];

  return (
    <section id="terminal" className="w-full py-24 px-6 relative bg-white dark:bg-black border-t border-gray-300 dark:border-white/5 overflow-hidden transition-colors duration-500">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tighter transition-colors">The Attention Layer</h2>
          <p className="text-sm text-gray-500 font-mono tracking-widest uppercase flex items-center justify-center gap-3">
             <span className="w-2 h-2 bg-[#00E5FF] rounded-full animate-ping" />
             Interactive Terminal Demonstrator
          </p>
        </div>
        
        {/* Simulation Controls */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setSimulationMode('idle')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase rounded border transition-colors ${simulationMode === 'idle' ? 'bg-[#00E5FF]/10 border-[#00E5FF]/50 text-[#00E5FF]' : 'bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Reset
          </button>
          <button 
            onClick={() => setSimulationMode('tension')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase rounded border transition-colors ${simulationMode === 'tension' ? 'bg-[#FFBD2E]/10 border-[#FFBD2E]/50 text-[#FFBD2E]' : 'bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-[#FFBD2E]'}`}
          >
            Inject: Tension
          </button>
          <button 
            onClick={() => setSimulationMode('momentum')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase rounded border transition-colors ${simulationMode === 'momentum' ? 'bg-[#FF7F50]/10 border-[#FF7F50]/50 text-[#FF7F50]' : 'bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-[#FF7F50]'}`}
          >
            Inject: Momentum
          </button>
          <button 
            onClick={() => setSimulationMode('chaos')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase rounded border transition-colors ${simulationMode === 'chaos' ? 'bg-[#FF5F56]/10 border-[#FF5F56]/50 text-[#FF5F56]' : 'bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-[#FF5F56]'}`}
          >
            Inject: Chaos (VAR)
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto rounded-xl border border-gray-300 dark:border-white/10 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_100px_rgba(0,0,0,1)] bg-gray-50 dark:bg-[#030303] font-mono relative backdrop-blur-xl transition-colors duration-500"
        >
          <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${currentAlert.gradient} to-transparent opacity-50 transition-colors duration-500`} />
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-300 dark:border-white/5 flex items-center justify-between bg-white dark:bg-black/80 transition-colors">
            <div className="flex gap-4 items-center">
              <span className={`w-2 h-2 rounded-full ${currentAlert.dot} shadow-[0_0_8px_currentColor]`} />
              <span className={`${currentAlert.color} font-bold text-xs tracking-[0.2em] relative overflow-hidden transition-colors`}>
                 LIVE TRACKING
              </span>
            </div>
            <div className="flex gap-2">
              <div className="text-[10px] text-gray-500 dark:text-gray-600 mr-4 hidden sm:block transition-colors">UPTIME: 99.99%</div>
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 md:p-12 text-sm leading-loose relative transition-colors duration-500">
             {/* Chart Overlay */}
             <div className="absolute top-0 right-0 w-full h-full opacity-10 dark:opacity-10 pointer-events-none p-12 flex items-end">
               <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`w-full h-32 fill-none stroke-2 drop-shadow-[0_0_10px_currentColor] ${currentAlert.color} transition-colors duration-500`}>
                 <path d={pathD} className="transition-all duration-1000 ease-linear" />
               </svg>
             </div>

             <div className="space-y-4 mb-16 relative z-10 flex flex-col">
                {[...matches].sort((a, b) => b.emtn - a.emtn).map((match) => {
                  const mMin = Math.floor(match.timeSeconds / 60);
                  const mSec = match.timeSeconds % 60;
                  const timeString = `${mMin}:${mSec < 10 ? '0' + mSec : mSec}`;
                  
                  const isMain = match.id === selectedMatchId;
                  let wrapperStyle = "hover:bg-black/[0.05] dark:hover:bg-white/[0.02] border-gray-300 dark:border-transparent cursor-pointer";
                  let leftBarStyle = "bg-transparent";
                  let scoreColor = "text-gray-600 dark:text-gray-500 font-bold";
                  let pillText = "STAGNANT";
                  let pillBg = "bg-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-500 font-bold";

                  if (isMain && simulationMode !== 'idle') {
                    wrapperStyle = `bg-black/[0.03] dark:bg-white/[0.03] border-gray-400 dark:border-white/5 ${currentAlert.shadow} cursor-pointer`;
                    leftBarStyle = `${currentAlert.dot} shadow-[0_0_15px_currentColor]`;
                    scoreColor = currentAlert.color;
                    pillText = currentAlert.pill;
                    pillBg = `${currentAlert.bg} border ${currentAlert.border} ${currentAlert.color} font-bold`;
                  } else if (match.emtn >= 80) {
                    scoreColor = "text-[#FF7F50] font-bold";
                    pillText = "CRITICAL";
                    pillBg = "bg-[#FF7F50]/10 border-[#FF7F50]/20 text-[#FF7F50] font-bold";
                  } else if (match.emtn >= 50) {
                    scoreColor = "text-[#00E5FF] font-bold";
                    pillText = "RISING";
                    pillBg = "bg-[#00E5FF]/5 border-[#00E5FF]/20 text-[#00E5FF] font-bold";
                  }

                  // Force the left bar for the main match even in idle mode
                  if (isMain && simulationMode === 'idle') {
                    leftBarStyle = "bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]";
                    wrapperStyle = "bg-black/[0.03] dark:bg-white/[0.03] border-gray-400 dark:border-white/5 cursor-pointer";
                  }

                  return (
                    <motion.div 
                      layout 
                      key={match.id}
                      onClick={() => {
                        setSelectedMatchId(match.id);
                        setSimulationMode('idle'); // Reset simulation mode when changing matches
                        setDataPoints(prev => [...prev.slice(1), match.emtn]); // Prevent jarring chart jump
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`flex flex-col md:flex-row md:items-center justify-between text-gray-900 dark:text-white p-5 rounded-lg transition-colors relative overflow-hidden border ${wrapperStyle}`}
                    >
                       <div className={`absolute left-0 top-0 w-1 h-full transition-colors ${leftBarStyle}`} />
                       <span className="text-gray-600 dark:text-gray-300 text-base transition-colors font-mono flex items-center">
                         <span className="text-gray-900 dark:text-white font-bold w-12 inline-block transition-colors shrink-0">{timeString}</span> 
                         <span className="opacity-30 mx-4 text-black dark:text-white shrink-0">|</span> 
                         
                         {match.teams === 'RMA vs MCI' && (
                           <span className="inline-flex items-center gap-2 w-[120px] justify-center">
                             <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" className="w-5 h-5 object-contain" alt="RMA" /> <span className="text-[10px] text-gray-500 font-black">VS</span> <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" className="w-5 h-5 object-contain" alt="MCI" />
                           </span>
                         )}
                         {match.teams === 'ARS vs PSG' && (
                           <span className="inline-flex items-center gap-2 w-[120px] justify-center">
                             <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" className="w-5 h-5 object-contain" alt="ARS" /> <span className="text-[10px] text-gray-500 font-black">VS</span> <img src="https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" className="w-5 h-5 object-contain" alt="PSG" />
                           </span>
                         )}
                         {match.teams === 'INT vs MIL' && (
                           <span className="inline-flex items-center gap-2 w-[120px] justify-center">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" className="w-5 h-5 object-contain drop-shadow-md" alt="INT" /> <span className="text-[10px] text-gray-500 font-black">VS</span> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" className="w-5 h-5 object-contain" alt="MIL" />
                           </span>
                         )}
                         {!['RMA vs MCI', 'ARS vs PSG', 'INT vs MIL'].includes(match.teams) && match.teams}

                         <span className="opacity-30 mx-4 text-black dark:text-white shrink-0">|</span> 
                         {match.score}
                       </span>
                       <span className={`${scoreColor} font-bold tracking-widest flex items-center gap-3 mt-2 md:mt-0 transition-colors`}>
                         &gt;&gt; {Math.round(match.emtn)} <span className={`px-2 py-0.5 rounded text-[10px] ${isMain && simulationMode === 'chaos' ? 'animate-pulse' : ''} ${pillBg}`}>{pillText}</span>
                       </span>
                    </motion.div>
                  );
                })}
             </div>

             <div className={`relative overflow-hidden ${currentAlert.bg} border ${currentAlert.border} p-6 rounded-lg ${currentAlert.color} backdrop-blur-sm z-10 ${currentAlert.shadow} transition-all duration-500`}>
                <div className={`absolute -inset-x-full top-0 h-[1px] bg-gradient-to-r from-transparent ${currentAlert.gradient} to-transparent animate-[scan_3s_linear_infinite] opacity-50`} />
                <div className="flex items-center gap-3 mb-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors">
                   {currentAlert.icon} {currentAlert.title}
                </div>
                <p className="font-medium tracking-wide text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full ${currentAlert.dot}`} />
                  {currentAlert.desc}
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  const stats = [
    { label: "Fan Reactions Parsed", value: "10M+", trend: "Live", icon: <Activity className="w-5 h-5 text-[#00E5FF]" /> },
    { label: "Matches Analyzed", value: "500+", trend: "Global", icon: <Globe className="w-5 h-5 text-[#FF7F50]" /> },
    { label: "Communities Engaged", value: "100+", trend: "Active", icon: <Users className="w-5 h-5 text-[#A855F7]" /> }
  ];

  return (
    <section className="w-full py-16 px-6 border-y border-gray-300 dark:border-white/5 bg-gray-50 dark:bg-[#020202] relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/[0.02] dark:from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-[#080808] border border-gray-300 dark:border-white/5 relative group overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,1)] transition-colors duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-gray-300 dark:border-white/10 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors duration-500">
                  {stat.icon}
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-2 py-1 bg-black/5 dark:bg-white/5 rounded border border-gray-300 dark:border-white/5 group-hover:border-[#00E5FF]/20 group-hover:text-[#00E5FF] transition-colors duration-500">
                  {stat.trend}
                </div>
              </div>
              
              <div className="text-5xl font-mono font-bold text-gray-900 dark:text-white mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-500 dark:group-hover:from-white dark:group-hover:to-gray-500 transition-all duration-500">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden bg-gray-100 dark:bg-[#020202] transition-colors duration-500">
      {/* Abstract Data Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] pointer-events-none z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00E5FF_0%,_transparent_50%)] opacity-20 dark:opacity-10 blur-[50px]" />
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-400 dark:border-white/[0.05] rounded-full border-dashed transition-colors duration-500"
         />
         <motion.div 
           animate={{ rotate: -360 }}
           transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#00E5FF]/30 dark:border-[#00E5FF]/10 rounded-full transition-colors duration-500"
         />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 dark:text-white tracking-tighter drop-shadow-md dark:drop-shadow-2xl transition-colors leading-[1.1]">Join the Future of Football Discovery</h2>
            <p className="text-[#00E5FF] font-mono text-xs tracking-[0.4em] uppercase mb-12 lg:mb-0 flex justify-center lg:justify-start items-center gap-4">
               <span className="w-8 h-[1px] bg-[#00E5FF]" /> Enter the Waitlist <span className="w-8 h-[1px] bg-[#00E5FF]" />
            </p>
          </div>
          
          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <form className="space-y-6 text-left p-10 backdrop-blur-2xl bg-white/60 dark:bg-white/[0.02] border border-gray-300 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-colors duration-500" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative group">
              <input type="text" className="w-full bg-transparent border-b border-gray-300 dark:border-white/20 px-0 py-4 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#00E5FF] transition-colors peer placeholder-transparent" placeholder="Name" id="name" />
              <label htmlFor="name" className="absolute left-0 top-4 text-gray-500 font-mono text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00E5FF] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-gray-500 dark:peer-valid:text-gray-400 uppercase tracking-widest">Name</label>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00E5FF] transition-all duration-300 peer-focus:w-full" />
            </div>
            <div className="relative group">
              <input type="text" className="w-full bg-transparent border-b border-gray-300 dark:border-white/20 px-0 py-4 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#00E5FF] transition-colors peer placeholder-transparent" placeholder="Club" id="club" />
              <label htmlFor="club" className="absolute left-0 top-4 text-gray-500 font-mono text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00E5FF] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-gray-500 dark:peer-valid:text-gray-400 uppercase tracking-widest">Favourite Club</label>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00E5FF] transition-all duration-300 peer-focus:w-full" />
            </div>
          </div>
          <div className="relative group mt-8">
            <input type="email" className="w-full bg-transparent border-b border-gray-300 dark:border-white/20 px-0 py-4 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#00E5FF] transition-colors peer placeholder-transparent" placeholder="Email" id="email" />
            <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 font-mono text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00E5FF] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-gray-500 dark:peer-valid:text-gray-400 uppercase tracking-widest">Email Address</label>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00E5FF] transition-all duration-300 peer-focus:w-full" />
          </div>
          
          <button className="relative w-full mt-12 bg-[#00E5FF] text-black font-black tracking-[0.3em] text-sm py-6 rounded-none hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all uppercase overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 dark:via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            SECURE ACCESS
            </button>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-white/5 bg-gray-50 dark:bg-[#030303] py-16 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-gray-500" />
          <span className="text-lg font-bold tracking-tighter text-gray-500">Eyeconic</span>
        </div>
        
        <div className="flex gap-10 text-[10px] text-gray-500 dark:text-gray-600 font-mono tracking-[0.2em] uppercase transition-colors">
          <a href="#hero" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
          <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
          <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
