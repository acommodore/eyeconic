"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Activity, Flame, ArrowRight, Play, Users, CheckCircle2, XCircle
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#02060A] text-white selection:bg-[#00E5FF]/30">
      <Navbar />
      <main className="flex flex-col items-center overflow-hidden">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <DashboardMockupSection />
        <ComparisonSection />
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
          <a href="#how-it-works" className="hover:text-white transition-colors">Engine</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Live View</a>
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
      {/* Animated Stadium Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1508344928928-7137b29de2f6?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Complex Vignette & Ambient Light Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#02060A] via-[#02060A]/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#02060A] via-transparent to-[#02060A]/60 z-10" />
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-[#00E5FF]/10 rounded-full blur-[150px] mix-blend-screen z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#FF4F00]/10 rounded-full blur-[150px] mix-blend-screen z-10" />

      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Typography & CTA */}
        <div className="flex-1 text-left w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#00E5FF] font-black tracking-[0.3em] uppercase text-sm md:text-base mb-6 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">
              Stats are deceptive.
            </h2>
            <h1 className="text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.9] text-white mb-8">
              See what's<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                worth watching.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium mb-12 tracking-wide max-w-xl leading-relaxed">
              Eyeconic parses live crowd sentiment, momentum swings, and tension to tell you <span className="text-white">exactly what game you should be watching right now.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/onboarding" className="w-full sm:w-auto bg-gradient-to-r from-[#FF4F00] to-[#FF7300] text-black font-black text-lg tracking-[0.1em] py-5 px-12 rounded-2xl hover:scale-105 hover:shadow-[0_0_50px_rgba(255,79,0,0.5)] transition-all flex justify-center items-center gap-3">
                GET STARTED <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
                <div className="w-10 h-[1px] bg-gray-700" />
                Or <Link href="/login" className="text-white hover:text-[#00E5FF] transition-colors ml-1">Log In</Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: The Floating Emotion Engine */}
        <div className="flex-1 w-full relative h-[600px] hidden lg:block perspective-1000">
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateY: 20 }}
            animate={{ opacity: 1, y: 0, rotateY: -5 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md transform-style-3d"
          >
            {/* Main Holographic Card */}
            <div className="relative backdrop-blur-xl bg-[#0A1118]/60 border border-white/10 p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-[#00E5FF]/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-50" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-50" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold tracking-widest text-red-500 uppercase">Live Tension</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400">88:14</span>
                </div>

                <div className="flex items-end justify-between mb-2">
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter text-white">RMA vs MCI</h3>
                    <p className="text-sm font-bold text-gray-400 font-mono">AGG 3-3</p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-black text-[#FF4F00] tracking-tighter">98</div>
                    <p className="text-[10px] font-bold tracking-widest text-[#FF4F00] uppercase">Emotion Score</p>
                  </div>
                </div>

                {/* Simulated Chart */}
                <div className="h-32 mt-8 flex items-end gap-1.5 opacity-80">
                  {[30, 35, 32, 45, 55, 60, 50, 75, 85, 95, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: 0.5 + (i * 0.05) }}
                      className={`w-full rounded-t-sm ${h > 80 ? 'bg-[#FF4F00]' : h > 50 ? 'bg-[#00E5FF]' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Context Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-12 -bottom-12 backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-2xl shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FF4F00]/20 flex items-center justify-center border border-[#FF4F00]/30 shrink-0">
                  <Flame className="w-5 h-5 text-[#FF4F00]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Chaos Detected</h4>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-[200px]">Massive spike in fan disagreement over penalty call. Momentum shifting rapidly.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="w-full py-32 px-6 bg-[#050c12]/50 relative border-y border-white/5">
      <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[#fb7185]/5 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-8 text-white"
        >
          Too Many Matches.<br/> <span className="text-[#fb7185]">Too Little Time.</span>
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-6 text-xl text-gray-400"
        >
          <p>Football fans constantly switch channels, check scores, and ask friends which match is worth watching.</p>
          <p>Traditional apps tell you what&apos;s happening.</p>
          <p className="text-2xl font-semibold text-white">Eyeconic tells you what&apos;s worth your attention.</p>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: <Users className="w-8 h-8 text-[#2dd4bf]" />,
      title: "1. Fans React",
      desc: "Fans rate moments, players, decisions, and match excitement in real time."
    },
    {
      icon: <Activity className="w-8 h-8 text-[#fb7185]" />,
      title: "2. Eyeconic Analyzes",
      desc: "AI combines fan sentiment with live match data to understand the story."
    },
    {
      icon: <Flame className="w-8 h-8 text-white" />,
      title: "3. Discover the Best",
      desc: "Get instant recommendations based on drama, intensity, and momentum swings."
    }
  ];

  return (
    <section id="how-it-works" className="w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-gray-400">Three steps to never miss a moment.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-3xl hover:border-[#2dd4bf]/50 transition-colors group relative overflow-hidden bg-[#18181b]/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2dd4bf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Emotional Momentum Meter",
      desc: "Track which matches are heating up and which are losing energy.",
      colSpan: "md:col-span-2",
      color: "from-[#2dd4bf] to-blue-500"
    },
    {
      title: "Narrative Engine",
      desc: "Understand the story behind every match instantly.",
      colSpan: "md:col-span-1",
      color: "from-[#fb7185] to-purple-500"
    },
    {
      title: "Disagreement Map",
      desc: "See where fans agree and where debates are exploding.",
      colSpan: "md:col-span-1",
      color: "from-white to-[#fb7185]"
    },
    {
      title: "Call The Moment",
      desc: "Live crowd-powered prediction engine. Reward fans who identify big moments first.",
      colSpan: "md:col-span-2",
      color: "from-[#2dd4bf] to-[#fb7185]"
    }
  ];

  return (
    <section id="features" className="w-full py-32 px-6 bg-[#03080c]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Core Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl">A new suite of tools designed for the modern football fan&apos;s attention span.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass p-8 rounded-3xl relative overflow-hidden group bg-[#18181b]/50 ${feat.colSpan}`}
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feat.color} opacity-10 blur-[80px] rounded-full group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10 flex flex-col h-full justify-end min-h-[200px]">
                <h3 className="text-2xl font-bold mb-3 text-white">{feat.title}</h3>
                <p className="text-gray-400">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardMockupSection() {
  return (
    <section id="dashboard" className="w-full py-32 px-6 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2dd4bf]/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">The Attention Layer</h2>
          <p className="text-xl text-gray-400">Your Bloomberg Terminal for football emotion.</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative bg-[#0a1219]"
        >
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#2dd4bf] via-[#fb7185] to-[#2dd4bf] opacity-50" />
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/40">
            <div className="flex gap-4">
              <button className="text-[#2dd4bf] font-medium text-sm flex items-center gap-2">
                <Flame className="w-4 h-4" /> Live Rankings
              </button>
              <button className="text-gray-400 hover:text-white transition-colors font-medium text-sm">
                Trending
              </button>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-10 grid md:grid-cols-3 gap-8">
            {/* Left Col: Match List */}
            <div className="col-span-2 space-y-4">
              {[
                { teams: "Madrid vs City", score: "2 - 2", emotion: 98, trend: "up", time: "88'" },
                { teams: "Arsenal vs PSG", score: "1 - 0", emotion: 85, trend: "up", time: "65'" },
                { teams: "Juve vs Milan", score: "0 - 0", emotion: 42, trend: "down", time: "32'" },
              ].map((match, i) => (
                <div key={i} className="glass p-5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors border border-white/5 bg-[#18181b]/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-xs text-gray-400 border border-white/5">
                      {match.time}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{match.teams}</h4>
                      <p className="text-sm text-gray-400 font-mono">{match.score}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-xl ${match.emotion > 80 ? "text-[#fb7185]" : "text-[#2dd4bf]"}`}>
                        {match.emotion}
                      </span>
                      <Flame className={`w-5 h-5 ${match.emotion > 80 ? "text-[#fb7185]" : "text-gray-500"}`} />
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Emotion Score</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Col: Momentum */}
            <div className="glass rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/5 bg-[#18181b]/50">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#fb7185]/20 blur-[50px] rounded-full" />
              <div className="relative z-10">
                <h4 className="text-sm text-gray-400 font-semibold mb-6 flex items-center gap-2 tracking-wide">
                  <Activity className="w-4 h-4 text-[#fb7185]" /> MOMENTUM SHIFT
                </h4>
                <div className="text-3xl font-bold mb-2 text-white">Chaos Detected</div>
                <p className="text-sm text-gray-400 mb-8">Madrid is pressing hard. Crowd sentiment spiking by 400% in the last 2 minutes.</p>
                
                {/* Fake Chart */}
                <div className="flex items-end gap-1 h-32 w-full opacity-80 mt-auto">
                  {[40, 45, 35, 50, 60, 55, 70, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-[#fb7185]/10 to-[#fb7185] rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="w-full py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">Why Eyeconic is Different</h2>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-[#18181b]/30 border border-white/5"
          >
            <h3 className="text-xl font-bold mb-6 text-gray-400">Traditional Apps</h3>
            <ul className="space-y-4">
              {['Scores', 'Stats', 'Lineups', 'Basic Match Events'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-500">
                  <XCircle className="w-5 h-5 text-gray-600" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-[#2dd4bf]/10 to-[#fb7185]/10 border border-[#2dd4bf]/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2dd4bf]/20 blur-[40px]" />
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#2dd4bf]" /> Eyeconic
            </h3>
            <ul className="space-y-4 relative z-10">
              {['Emotional Intelligence', 'Fan Sentiment', 'Match Excitement Detection', 'Real-Time Recommendations'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2dd4bf]" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section className="w-full py-20 px-6 border-y border-white/5 bg-[#03080c]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-5xl font-bold text-[#2dd4bf] mb-2">10k+</div>
          <div className="text-gray-400 font-medium">Fan Reactions</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="text-5xl font-bold text-[#fb7185] mb-2">500+</div>
          <div className="text-gray-400 font-medium">Matches Analyzed</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="text-5xl font-bold text-white mb-2">100+</div>
          <div className="text-gray-400 font-medium">Communities Engaged</div>
        </motion.div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section className="w-full py-40 px-6 relative overflow-hidden bg-[#050c12]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fb7185]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join the Future of Football Discovery</h2>
        <p className="text-gray-400 mb-10 text-lg">Eyeconic is creating a new layer of football intelligence powered by fans, emotion, and collective insight.</p>
        
        <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input type="text" className="w-full bg-[#18181b]/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2dd4bf] transition-colors" placeholder="Jude Bellingham" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Favourite Club</label>
              <input type="text" className="w-full bg-[#18181b]/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2dd4bf] transition-colors" placeholder="Real Madrid" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <input type="email" className="w-full bg-[#18181b]/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2dd4bf] transition-colors" placeholder="jude@madrid.com" />
          </div>
          <button className="w-full mt-6 bg-gradient-to-r from-[#2dd4bf] to-[#2dd4bf]/80 text-[#050c12] font-bold text-lg py-4 rounded-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all">
            Join the Waitlist
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
          <Activity className="w-6 h-6 text-[#2dd4bf]" />
          <span className="text-xl font-bold text-white">Eyeconic</span>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-500 font-medium">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
        
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-gray-400 text-sm font-bold">X</div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-gray-400 text-sm font-bold">IN</div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-gray-400 text-sm font-bold">IG</div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Eyeconic. All rights reserved. Not a scores app.
      </div>
    </footer>
  );
}
