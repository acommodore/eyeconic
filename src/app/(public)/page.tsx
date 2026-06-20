"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Activity, Flame, ArrowRight, Play, Users, CheckCircle2, XCircle, AlertTriangle, Terminal as TerminalIcon, Globe
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E5FF]/30 font-sans">
      {/* Global Background Grid & Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <Navbar />
      <main className="flex flex-col items-center overflow-hidden relative z-10">
        <HeroSection />
        <ProblemAndShiftSection />
        <FeaturesSection />
        <TerminalSection />
        <SocialProofSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent border-b border-white/5">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF] to-[#FF4F00] opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
            <Activity className="w-4 h-4 text-white relative z-10" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">Eyeconic</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-gray-400 uppercase">
          <a href="#shift" className="hover:text-white transition-colors">The Shift</a>
          <a href="#features" className="hover:text-white transition-colors">Engine</a>
          <a href="#terminal" className="hover:text-white transition-colors">Terminal</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-xs font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-widest">
            Log In
          </Link>
          <Link href="/onboarding" className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold hover:scale-105 transition-transform uppercase tracking-widest">
            Get Started
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
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-20 overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#00E5FF]/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#FF4F00]/10 rounded-full blur-[120px] mix-blend-screen" />
      </motion.div>

      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 mt-10">
        <div className="flex-1 text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-gray-300 uppercase">Live Intelligence Engine</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] text-white mb-6">
              SEE WHAT'S<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                WORTH WATCHING.
              </span>
            </h1>
            <h2 className="text-[#00E5FF] font-mono tracking-widest uppercase text-sm md:text-sm mb-8 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
              // STATS ARE DECEPTIVE
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-medium mb-12 tracking-wide max-w-xl leading-relaxed">
              Eyeconic parses live crowd sentiment, momentum swings, and tension to broadcast exactly where the drama is happening, right now.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 font-mono">
              <Link href="/onboarding" className="group relative w-full sm:w-auto bg-white text-black font-bold text-sm tracking-widest py-4 px-8 overflow-hidden hover:scale-105 transition-all flex justify-center items-center gap-3 rounded-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                [ GET STARTED ] <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="w-full sm:w-auto text-gray-300 hover:text-white transition-colors bg-transparent border border-white/20 px-8 py-4 hover:bg-white/5 text-sm font-bold tracking-widest flex justify-center items-center rounded-none">
                [ LOG IN ]
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
            <div className="absolute -inset-1 bg-gradient-to-br from-[#00E5FF]/30 to-[#FF4F00]/20 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
            
            <div className="relative backdrop-blur-2xl bg-black/60 border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden font-mono">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              {/* Terminal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3 text-gray-400 text-xs tracking-widest uppercase">
                  <TerminalIcon className="w-4 h-4 text-[#00E5FF]" /> EYECONIC_OS v2.0
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
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
                  <div className="relative p-4 bg-white/5 border border-white/10 rounded-lg overflow-hidden group/item hover:bg-white/10 transition-colors">
                     <div className="absolute left-0 top-0 w-1 h-full bg-[#FF4F00] shadow-[0_0_15px_#FF4F00]" />
                     <div className="flex justify-between items-center">
                       <span className="text-white font-bold tracking-wider">RMA vs MCI</span>
                       <span className="text-[#FF4F00] font-black drop-shadow-[0_0_8px_rgba(255,79,0,0.6)]">98 EMTN</span>
                     </div>
                     <div className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest flex items-center gap-2">
                        <Flame className="w-3 h-3 text-[#FF4F00]" /> Critical Sentiment
                     </div>
                  </div>

                  <div className="relative p-4 border border-white/5 rounded-lg group/item hover:bg-white/5 transition-colors">
                     <div className="absolute left-0 top-0 w-1 h-full bg-[#00E5FF]" />
                     <div className="flex justify-between items-center">
                       <span className="text-gray-300 font-bold tracking-wider">ARS vs PSG</span>
                       <span className="text-[#00E5FF] font-bold">85 EMTN</span>
                     </div>
                  </div>

                  <div className="relative p-4 border border-white/5 rounded-lg group/item hover:bg-white/5 transition-colors opacity-60">
                     <div className="absolute left-0 top-0 w-1 h-full bg-gray-600" />
                     <div className="flex justify-between items-center">
                       <span className="text-gray-500 font-bold tracking-wider">JUV vs MIL</span>
                       <span className="text-gray-500 font-bold">42 EMTN</span>
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
    <section id="shift" className="w-full py-40 px-6 bg-black relative border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white tracking-tighter"
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
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto tracking-wide leading-relaxed font-medium"
          >
            Dozens of matches happening simultaneously. Paralysis of choice. When you have no preference on what to watch, 
            <span className="text-white font-bold"> The Attention Layer </span> 
            cuts through the noise, parsing momentum swings and crowd tension to broadcast exactly which match demands your screen right now.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {/* Traditional Feeds */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-2xl bg-[#080808] border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-800" />
            <h3 className="text-sm font-mono font-bold mb-10 text-gray-600 uppercase tracking-[0.2em]">Traditional Feeds</h3>
            <ul className="space-y-8">
              {['Static Box Scores', 'Lagging Stats', 'Text Play-by-Play'].map((item, i) => (
                <li key={i} className="flex items-center gap-5 text-gray-600 text-lg font-medium tracking-wide">
                  <XCircle className="w-5 h-5 opacity-50 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* The Attention Layer */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-2xl bg-gradient-to-b from-[#00E5FF]/[0.05] to-transparent border border-[#00E5FF]/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-blue-500 shadow-[0_0_20px_#00E5FF]" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#00E5FF]/10 blur-[80px] rounded-full group-hover:bg-[#00E5FF]/20 transition-colors duration-700" />
            
            <h3 className="text-sm font-mono font-bold mb-10 text-white uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
              <Activity className="w-4 h-4 text-[#00E5FF]" /> The Attention Layer
            </h3>
            <ul className="space-y-8 relative z-10">
              {['Live Emotional Intelligence', 'Real-Time Sentiment Parsing', 'Match Excitement Detection'].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-center gap-5 text-white text-lg font-medium tracking-wide"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" /> {item}
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
      title: "Emotional Momentum",
      desc: "Track matches heating up or flatlining in real time.",
      colSpan: "md:col-span-2",
      icon: <Activity className="w-5 h-5 text-[#00E5FF]" />,
      glowColor: "rgba(0, 229, 255, 0.4)",
      borderColor: "border-[#00E5FF]/30",
    },
    {
      title: "Narrative Engine",
      desc: "Instant AI distillation of the match's psychological storyline.",
      colSpan: "md:col-span-1",
      icon: <Flame className="w-5 h-5 text-[#FF4F00]" />,
      glowColor: "rgba(255, 79, 0, 0.4)",
      borderColor: "border-[#FF4F00]/30",
    },
    {
      title: "Disagreement Map",
      desc: "Visualizing the exact moments fan debates explode.",
      colSpan: "md:col-span-1",
      icon: <Users className="w-5 h-5 text-purple-400" />,
      glowColor: "rgba(168, 85, 247, 0.4)",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Call The Moment",
      desc: "The crowd-powered prediction engine rewarding fans who spot the shifts first.",
      colSpan: "md:col-span-2",
      icon: <Play className="w-5 h-5 text-green-400" />,
      glowColor: "rgba(74, 222, 128, 0.4)",
      borderColor: "border-green-500/30",
    }
  ];

  return (
    <section id="features" className="w-full py-40 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase mb-4">// Core Architecture</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-xl">The Engine</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 perspective-[1000px]">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: "easeOut", duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`group relative p-10 rounded-2xl bg-[#080808] border border-white/5 transition-all duration-300 ${feat.colSpan} overflow-hidden`}
              style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)" }}
            >
              {/* Spinning / Glowing Gradient background on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${feat.glowColor} 0%, transparent 70%)`, filter: "blur(40px)" }}
              />
              
              {/* Dynamic border highlight */}
              <div className={`absolute inset-0 border rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${feat.borderColor}`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-8 shadow-inner relative group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: feat.glowColor.replace('0.4', '1') }} />
                  {feat.icon}
                </div>
                <h4 className="text-2xl font-bold mb-3 text-white tracking-tight">{feat.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed tracking-wide">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminalSection() {
  const [dataPoints, setDataPoints] = useState<number[]>([20, 30, 25, 45, 60, 50, 75, 80, 95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const next = [...prev.slice(1), Math.max(10, Math.min(100, prev[prev.length - 1] + (Math.random() * 20 - 10)))];
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pathD = `M ${dataPoints.map((p, i) => `${i * (100 / (dataPoints.length - 1))} ${100 - p}`).join(' L ')}`;

  return (
    <section id="terminal" className="w-full py-40 px-6 relative bg-black border-t border-white/5 overflow-hidden">
      {/* Scanning Laser Line Removed */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tighter">The Attention Layer</h2>
          <p className="text-sm text-gray-500 font-mono tracking-widest uppercase flex items-center justify-center gap-3">
             <span className="w-2 h-2 bg-[#00E5FF] rounded-full animate-ping" />
             Bloomberg Terminal for Football Emotion
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto rounded-xl border border-white/10 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,1)] bg-[#030303] font-mono relative backdrop-blur-xl"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent" />
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/80">
            <div className="flex gap-4 items-center">
              <span className="w-2 h-2 bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
              <span className="text-[#00E5FF] font-bold text-xs tracking-[0.2em] relative overflow-hidden">
                 LIVE TRACKING
              </span>
            </div>
            <div className="flex gap-2">
              <div className="text-[10px] text-gray-600 mr-4 hidden sm:block">UPTIME: 99.99%</div>
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 md:p-12 text-sm leading-loose relative">
             {/* Chart Overlay */}
             <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none p-12 flex items-end">
               <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-32 stroke-[#00E5FF] fill-none stroke-2 drop-shadow-[0_0_10px_#00E5FF]">
                 <path d={pathD} className="transition-all duration-1000 ease-linear" />
               </svg>
             </div>

             <div className="space-y-4 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between text-white bg-white/[0.03] border border-white/5 p-5 rounded-lg transition-colors relative overflow-hidden">
                   <div className="absolute left-0 top-0 w-1 h-full bg-[#FF4F00] shadow-[0_0_15px_#FF4F00]" />
                   <span className="text-gray-300 text-base">
                     <span className="text-white font-bold w-8 inline-block">88'</span> <span className="opacity-30 mx-4">|</span> RMA vs MCI <span className="opacity-30 mx-4">|</span> [ 2 - 2 ]
                   </span>
                   <span className="text-[#FF4F00] font-bold tracking-widest flex items-center gap-3 mt-2 md:mt-0">
                     &gt;&gt; 98 EMTN <span className="px-2 py-0.5 bg-[#FF4F00]/20 border border-[#FF4F00]/40 rounded text-[10px] animate-pulse">CRITICAL</span>
                   </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between text-white hover:bg-white/[0.02] p-5 rounded-lg transition-colors border border-transparent">
                   <span className="text-gray-300 text-base">
                     <span className="text-white font-bold w-8 inline-block">65'</span> <span className="opacity-30 mx-4">|</span> ARS vs PSG <span className="opacity-30 mx-4">|</span> [ 1 - 0 ]
                   </span>
                   <span className="text-[#00E5FF] font-bold tracking-widest flex items-center gap-3 mt-2 md:mt-0">
                     &gt;&gt; 85 EMTN <span className="px-2 py-0.5 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded text-[10px]">RISING</span>
                   </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between text-gray-600 hover:bg-white/[0.02] p-5 rounded-lg transition-colors border border-transparent">
                   <span className="text-base">
                     <span className="font-bold w-8 inline-block">32'</span> <span className="opacity-30 mx-4">|</span> JUV vs MIL <span className="opacity-30 mx-4">|</span> [ 0 - 0 ]
                   </span>
                   <span className="font-bold tracking-widest flex items-center gap-3 mt-2 md:mt-0">
                     &gt;&gt; 42 EMTN <span className="px-2 py-0.5 bg-gray-900 border border-gray-800 rounded text-[10px] text-gray-500">STAGNANT</span>
                   </span>
                </div>
             </div>

             <div className="relative overflow-hidden bg-[#FF4F00]/5 border border-[#FF4F00]/20 p-6 rounded-lg text-[#FF4F00] backdrop-blur-sm z-10 shadow-[inset_0_0_30px_rgba(255,79,0,0.1)]">
                <div className="absolute -inset-x-full top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4F00] to-transparent animate-[scan_3s_linear_infinite]" />
                <div className="flex items-center gap-3 mb-3 font-bold uppercase tracking-[0.2em] text-xs">
                   <AlertTriangle className="w-4 h-4 animate-pulse" /> SYSTEM ALERT // MOMENTUM SHIFT
                </div>
                <p className="font-medium tracking-wide text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] animate-ping" />
                  Madrid pressing heavily. Crowd sentiment spiking <span className="text-white bg-[#FF4F00]/20 border border-[#FF4F00]/30 px-2 py-0.5 rounded text-xs">+400%</span> in the last 120s.
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
    { label: "Matches Analyzed", value: "500+", trend: "Global", icon: <Globe className="w-5 h-5 text-[#FF4F00]" /> },
    { label: "Communities Engaged", value: "100+", trend: "Active", icon: <Users className="w-5 h-5 text-[#A855F7]" /> }
  ];

  return (
    <section className="w-full py-32 px-6 border-y border-white/5 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-[#080808] border border-white/5 relative group overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,1)]"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors duration-500">
                  {stat.icon}
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/5 group-hover:border-[#00E5FF]/20 group-hover:text-[#00E5FF] transition-colors duration-500">
                  {stat.trend}
                </div>
              </div>
              
              <div className="text-5xl font-mono font-bold text-white mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all duration-500">
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
    <section className="w-full py-40 px-6 relative overflow-hidden bg-[#020202]">
      {/* Abstract Data Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] pointer-events-none z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00E5FF_0%,_transparent_50%)] opacity-10 blur-[50px]" />
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.05] rounded-full border-dashed"
         />
         <motion.div 
           animate={{ rotate: -360 }}
           transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#00E5FF]/10 rounded-full"
         />
      </div>
      
      <div className="max-w-xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tighter drop-shadow-2xl">Join the Future of Football Discovery</h2>
        <p className="text-[#00E5FF] font-mono text-xs tracking-[0.4em] uppercase mb-16 flex justify-center items-center gap-4">
           <span className="w-8 h-[1px] bg-[#00E5FF]" /> Enter the Waitlist <span className="w-8 h-[1px] bg-[#00E5FF]" />
        </p>
        
        <form className="space-y-6 text-left p-10 backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative group">
              <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white font-mono text-sm focus:outline-none focus:border-[#00E5FF] transition-colors peer placeholder-transparent" placeholder="Name" id="name" />
              <label htmlFor="name" className="absolute left-0 top-4 text-gray-500 font-mono text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00E5FF] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-gray-400 uppercase tracking-widest">[ Name ]</label>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00E5FF] transition-all duration-300 peer-focus:w-full" />
            </div>
            <div className="relative group">
              <input type="text" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white font-mono text-sm focus:outline-none focus:border-[#00E5FF] transition-colors peer placeholder-transparent" placeholder="Club" id="club" />
              <label htmlFor="club" className="absolute left-0 top-4 text-gray-500 font-mono text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00E5FF] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-gray-400 uppercase tracking-widest">[ Favourite Club ]</label>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00E5FF] transition-all duration-300 peer-focus:w-full" />
            </div>
          </div>
          <div className="relative group mt-8">
            <input type="email" className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white font-mono text-sm focus:outline-none focus:border-[#00E5FF] transition-colors peer placeholder-transparent" placeholder="Email" id="email" />
            <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 font-mono text-sm transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00E5FF] peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-gray-400 uppercase tracking-widest">[ Email Address ]</label>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00E5FF] transition-all duration-300 peer-focus:w-full" />
          </div>
          
          <button className="relative w-full mt-12 bg-[#00E5FF] text-black font-black tracking-[0.3em] text-sm py-6 rounded-none hover:bg-white transition-all uppercase overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            [ SECURE ACCESS ]
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#030303] py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-gray-500" />
          <span className="text-lg font-bold tracking-tighter text-gray-500">Eyeconic</span>
        </div>
        
        <div className="flex gap-10 text-[10px] text-gray-600 font-mono tracking-[0.2em] uppercase">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
