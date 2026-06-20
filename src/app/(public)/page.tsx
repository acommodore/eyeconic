"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Activity, Flame, ArrowRight, Play, Users, CheckCircle2, XCircle, AlertTriangle
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#02060A] text-white selection:bg-[#00E5FF]/30">
      <Navbar />
      <main className="flex flex-col items-center overflow-hidden">
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
    <nav className="absolute top-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#0088FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)]">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">Eyeconic</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-widest text-gray-400 uppercase">
          <a href="#shift" className="hover:text-white transition-colors">The Shift</a>
          <a href="#features" className="hover:text-white transition-colors">Engine</a>
          <a href="#terminal" className="hover:text-white transition-colors">Terminal</a>
        </div>
        <Link href="/login" className="px-6 py-3 rounded-full text-white font-bold hover:bg-white/10 transition-all border border-white/10">
          Log In
        </Link>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-20 overflow-hidden bg-[#02060A]">
      <motion.div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7137b29de2f6?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#02060A] via-[#02060A]/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#02060A] via-transparent to-[#02060A]/60 z-10" />
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-[#00E5FF]/10 rounded-full blur-[150px] mix-blend-screen z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#FF4F00]/10 rounded-full blur-[150px] mix-blend-screen z-10" />

      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="flex-1 text-left w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#00E5FF] font-black tracking-[0.3em] uppercase text-sm md:text-base mb-6 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">
              STATS ARE DECEPTIVE.
            </h2>
            <h1 className="text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.9] text-white mb-8">
              SEE WHAT'S<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                WORTH WATCHING.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium mb-12 tracking-wide max-w-xl leading-relaxed">
              Eyeconic parses live crowd sentiment, momentum swings, and tension to broadcast exactly where the drama is happening, right now.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 font-mono">
              <Link href="/onboarding" className="w-full sm:w-auto bg-[#00E5FF] text-black font-black text-lg tracking-[0.1em] py-5 px-12 hover:bg-white transition-all flex justify-center items-center gap-3">
                [ GET STARTED ]
              </Link>
              <Link href="/login" className="w-full sm:w-auto text-white hover:text-[#00E5FF] transition-colors bg-white/5 border border-white/10 px-10 py-5 hover:bg-white/10 text-lg font-black tracking-[0.1em] flex justify-center items-center">
                [ LOG IN ]
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Element */}
        <div className="flex-1 w-full relative h-[600px] hidden lg:block perspective-1000">
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateY: 20 }}
            animate={{ opacity: 1, y: 0, rotateY: -5 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md transform-style-3d"
          >
            {/* Holographic Card matching Terminal vibe */}
            <div className="relative backdrop-blur-xl bg-[#0A1118]/80 border border-white/10 p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden font-mono">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-50" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-50" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2 text-[#00E5FF]">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span className="text-xs font-bold tracking-widest uppercase">Signal Active</span>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-gray-300">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                     <span className="text-white font-bold">RMA vs MCI</span>
                     <span className="text-[#FF4F00] font-black drop-shadow-[0_0_10px_rgba(255,79,0,0.5)]">98 EMOTION</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                     <span>ARS vs PSG</span>
                     <span className="text-[#00E5FF]">85 EMOTION</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span>JUV vs MIL</span>
                     <span className="text-gray-500">42 EMOTION</span>
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
    <section id="shift" className="w-full py-32 px-6 bg-[#050c12]/80 relative border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white tracking-tighter"
          >
            Traditional apps show you what happened.<br/> 
            <span className="text-[#00E5FF]">Eyeconic shows you what it felt like.</span>
          </motion.h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {/* Traditional Feeds */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-[#18181b]/30 border border-white/5"
          >
            <h3 className="text-xl font-bold mb-8 text-gray-500 uppercase tracking-widest">Traditional Feeds</h3>
            <ul className="space-y-6">
              {['Static Box Scores', 'Lagging Stats', 'Text Play-by-Play'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-500 text-lg font-medium">
                  <XCircle className="w-6 h-6 text-gray-600 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* The Attention Layer */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-gradient-to-br from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00E5FF]/20 blur-[60px]" />
            <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-widest flex items-center gap-3 relative z-10">
              <Activity className="w-6 h-6 text-[#00E5FF]" /> The Attention Layer
            </h3>
            <ul className="space-y-6 relative z-10">
              {['Live Emotional Intelligence', 'Real-Time Sentiment Parsing', 'Match Excitement Detection'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white text-lg font-bold">
                  <CheckCircle2 className="w-6 h-6 text-[#00E5FF] shrink-0" /> {item}
                </li>
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
      title: "Emotional Momentum Meter",
      desc: "Track matches heating up or flatlining in real time.",
      colSpan: "md:col-span-2",
      icon: <Activity className="w-6 h-6 text-[#00E5FF]" />
    },
    {
      title: "The Narrative Engine",
      desc: "Instant AI distillation of the match's psychological storyline.",
      colSpan: "md:col-span-1",
      icon: <Flame className="w-6 h-6 text-[#FF4F00]" />
    },
    {
      title: "The Disagreement Map",
      desc: "Visualizing the exact moments fan debates explode.",
      colSpan: "md:col-span-1",
      icon: <Users className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Call The Moment",
      desc: "The crowd-powered prediction engine rewarding fans who spot the shifts first.",
      colSpan: "md:col-span-2",
      icon: <Play className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <section id="features" className="w-full py-32 px-6 bg-[#02060A]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white uppercase tracking-tighter">The Core Engine</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass p-8 rounded-3xl relative overflow-hidden group bg-[#18181b]/40 border border-white/5 ${feat.colSpan}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-black mb-3 text-white">{feat.title}</h3>
                <p className="text-gray-400 text-lg font-medium">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminalSection() {
  return (
    <section id="terminal" className="w-full py-32 px-6 relative bg-[#02060A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white tracking-widest uppercase">The Attention Layer</h2>
          <p className="text-xl text-[#00E5FF] font-mono">// Bloomberg Terminal for Football Emotion</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto rounded-xl border border-white/20 overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.15)] bg-[#050505] font-mono"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black">
            <div className="flex gap-4">
              <span className="text-[#00E5FF] font-bold text-sm tracking-widest">LIVE TRACKING</span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <div className="w-3 h-3 rounded-full bg-gray-700" />
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 text-sm md:text-base leading-loose">
             <div className="space-y-4 mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between text-white border-b border-white/5 pb-4">
                   <span>88' &nbsp;&nbsp; Madrid vs City &nbsp;&nbsp; [ 2 - 2 ]</span>
                   <span className="text-[#FF4F00] font-black tracking-widest">&gt;&gt; 98 EMOTION SCORE (CRITICAL)</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between text-white border-b border-white/5 pb-4">
                   <span>65' &nbsp;&nbsp; Arsenal vs PSG &nbsp;&nbsp; [ 1 - 0 ]</span>
                   <span className="text-[#00E5FF] font-black tracking-widest">&gt;&gt; 85 EMOTION SCORE (RISING)</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between text-gray-500 border-b border-white/5 pb-4">
                   <span>32' &nbsp;&nbsp; Juve vs Milan &nbsp;&nbsp; [ 0 - 0 ]</span>
                   <span className="font-bold tracking-widest">&gt;&gt; 42 EMOTION SCORE (STAGNANT)</span>
                </div>
             </div>

             <div className="bg-[#FF4F00]/10 border border-[#FF4F00]/30 p-6 rounded-lg text-[#FF4F00]">
                <div className="flex items-center gap-3 mb-2 font-black uppercase tracking-widest">
                   <AlertTriangle className="w-5 h-5 animate-pulse" /> MOMENTUM SHIFT DETECTED
                </div>
                <p className="font-bold">ALERT: Madrid pressing hard. Crowd sentiment spiking +400% (Last 120s).</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section className="w-full py-20 px-6 border-y border-white/5 bg-[#03080c]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center gap-12 text-center font-mono">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-5xl font-black text-[#00E5FF] mb-3">10k+</div>
          <div className="text-gray-400 font-bold tracking-widest uppercase text-sm">Fan Reactions Parsed</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <div className="text-5xl font-black text-[#00E5FF] mb-3">500+</div>
          <div className="text-gray-400 font-bold tracking-widest uppercase text-sm">Matches Analyzed</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <div className="text-5xl font-black text-[#00E5FF] mb-3">100+</div>
          <div className="text-gray-400 font-bold tracking-widest uppercase text-sm">Football Communities Engaged</div>
        </motion.div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section className="w-full py-40 px-6 relative overflow-hidden bg-[#02060A]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E5FF]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-white uppercase tracking-tighter">Join the Future of Football Discovery</h2>
        <p className="text-[#00E5FF] font-mono font-bold tracking-widest uppercase mb-12">// Enter the Waitlist</p>
        
        <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <input type="text" className="w-full bg-[#18181b]/80 border border-white/10 rounded-none px-6 py-4 text-white font-mono focus:outline-none focus:border-[#00E5FF] transition-colors" placeholder="[ Name ]" />
            </div>
            <div>
              <input type="text" className="w-full bg-[#18181b]/80 border border-white/10 rounded-none px-6 py-4 text-white font-mono focus:outline-none focus:border-[#00E5FF] transition-colors" placeholder="[ Favourite Club ]" />
            </div>
          </div>
          <div>
            <input type="email" className="w-full bg-[#18181b]/80 border border-white/10 rounded-none px-6 py-4 text-white font-mono focus:outline-none focus:border-[#00E5FF] transition-colors" placeholder="[ Email Address ]" />
          </div>
          <button className="w-full mt-8 bg-[#00E5FF] text-black font-black tracking-[0.2em] text-lg py-5 hover:bg-white transition-all uppercase">
            [ SECURE ACCESS ]
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#03080c] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-[#00E5FF]" />
          <span className="text-xl font-black tracking-tighter text-white">Eyeconic</span>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-500 font-medium tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
