"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Globe, Shield, BarChart3, Clock, Eye, Play } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans font-light">
      <Navbar />
      <main className="flex flex-col items-center">
        <HeroSection />
        <ProblemAndShiftSection />
        <FeaturesSection />
        <DashboardSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="w-full border-b border-white/20 bg-black z-50">
      <div className="max-w-[1400px] mx-auto px-8 h-24 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-white" />
          <span className="text-xl font-serif tracking-widest uppercase">Eyeconic</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-xs font-mono tracking-[0.2em] uppercase text-gray-400">
          <a href="#shift" className="hover:text-white transition-colors">The Shift</a>
          <a href="#features" className="hover:text-white transition-colors">Methodology</a>
          <a href="#dashboard" className="hover:text-white transition-colors">Data Room</a>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/login" className="hidden sm:block text-xs font-mono uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">
            Client Login
          </Link>
          <Link href="/onboarding" className="border border-white/30 px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors">
            Inquire
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] flex flex-col justify-center px-8 border-b border-white/20 relative">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Typography */}
        <div className="lg:col-span-8 flex flex-col justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-gray-500 mb-12">
              Institutional Grade Emotional Intelligence
            </p>
            
            <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-serif leading-[0.9] tracking-tighter mb-12">
              See What's<br/>
              <span className="text-gray-400 italic">Worth Watching.</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                Eyeconic provides absolute clarity in a saturated market. We parse live crowd sentiment, momentum swings, and tension to broadcast exactly where the drama is happening, right now.
              </p>
              <div className="flex flex-col justify-end gap-6">
                <Link href="/onboarding" className="group flex items-center justify-between border-b border-white/30 pb-4 text-sm font-mono uppercase tracking-widest hover:border-white transition-colors">
                  <span>Enter the Data Room</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-500">
                   <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                   Live Global Indexing
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Abstract Data Visualization */}
        <div className="hidden lg:flex lg:col-span-4 border-l border-white/20 pl-8 flex-col justify-between py-20">
           <div className="space-y-12">
             <div>
               <div className="text-4xl font-serif">10,000+</div>
               <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-2 border-t border-white/20 pt-2">Data Points</div>
             </div>
             <div>
               <div className="text-4xl font-serif">500+</div>
               <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-2 border-t border-white/20 pt-2">Matches Analyzed</div>
             </div>
           </div>
           
           <div className="w-full h-64 border border-white/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform translate-y-[10px] group-hover:translate-y-[-20px] transition-transform duration-1000 ease-in-out" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/50 transform translate-y-[10px] group-hover:translate-y-[-40px] transition-transform duration-[1200ms] ease-in-out" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 transform translate-y-[10px] group-hover:translate-y-[-60px] transition-transform duration-[1400ms] ease-in-out" />
           </div>
        </div>
      </div>
    </section>
  );
}

function ProblemAndShiftSection() {
  return (
    <section id="shift" className="w-full border-b border-white/20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* The Problem */}
        <div className="p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/20 bg-[#050505]">
          <h2 className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-16 border-l-2 border-gray-500 pl-4">The Status Quo</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-12">Traditional apps show you what happened.</h3>
          <p className="text-lg text-gray-400 font-light leading-relaxed mb-12">
            Dozens of matches happening simultaneously. Paralysis of choice. The industry standard relies on static box scores and lagging statistics that fail to capture the narrative of the game.
          </p>
          <ul className="space-y-6 font-mono text-xs uppercase tracking-widest text-gray-500">
            <li className="flex items-center gap-4"><div className="w-1 h-1 bg-gray-500" /> Static Box Scores</li>
            <li className="flex items-center gap-4"><div className="w-1 h-1 bg-gray-500" /> Lagging Stats</li>
            <li className="flex items-center gap-4"><div className="w-1 h-1 bg-gray-500" /> Text Play-by-Play</li>
          </ul>
        </div>
        
        {/* The Solution */}
        <div className="p-16 lg:p-24 bg-white text-black">
          <h2 className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-16 border-l-2 border-black pl-4">The Eyeconic Shift</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-12">Eyeconic shows you what is worth watching.</h3>
          <p className="text-lg text-gray-700 font-light leading-relaxed mb-12">
            When you have no preference on what to watch, The Attention Layer cuts through the noise, parsing momentum swings and crowd tension to broadcast exactly which match demands your screen right now.
          </p>
          <ul className="space-y-6 font-mono text-xs uppercase tracking-widest text-black">
            <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-black" /> Live Emotional Intelligence</li>
            <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-black" /> Real-Time Sentiment Parsing</li>
            <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-black" /> Match Excitement Detection</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Emotional Momentum",
      desc: "Track matches heating up or flatlining in real time. Proprietary indexing of crowd psychology.",
      icon: <Activity className="w-5 h-5" />
    },
    {
      title: "Narrative Engine",
      desc: "Instant AI distillation of the match's psychological storyline and critical inflection points.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Disagreement Map",
      desc: "Visualizing the exact moments fan debates explode, mapping consensus and divergence.",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: "Predictive Analytics",
      desc: "The crowd-powered engine rewarding analytical fans who forecast momentum shifts accurately.",
      icon: <Shield className="w-5 h-5" />
    }
  ];

  return (
    <section id="features" className="w-full border-b border-white/20 py-24 px-8 bg-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <h2 className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-4">Methodology</h2>
            <h3 className="text-5xl font-serif">Core Architecture</h3>
          </div>
          <p className="max-w-md text-gray-400 font-light text-sm">
            Our infrastructure is built on rigorous data parsing, analyzing millions of data points per second to deliver an uninterrupted stream of match intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/20 border border-white/20">
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-black p-10 hover:bg-white hover:text-black transition-colors duration-500 group"
            >
              <div className="mb-12 text-white group-hover:text-black transition-colors">
                {feat.icon}
              </div>
              <h4 className="text-xl font-serif mb-4">{feat.title}</h4>
              <p className="text-sm font-light text-gray-400 group-hover:text-gray-700 transition-colors leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardSection() {
  return (
    <section id="dashboard" className="w-full py-24 px-8 border-b border-white/20 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-4">The Attention Layer</h2>
          <h3 className="text-4xl font-serif">Live Data Room</h3>
        </div>
        
        <div className="w-full border border-white/20 bg-black">
          {/* Dashboard Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/20 font-mono text-xs uppercase tracking-widest text-gray-500">
            <div className="col-span-4 md:col-span-3">Fixture</div>
            <div className="col-span-2 hidden md:block">Time</div>
            <div className="col-span-4 md:col-span-3">Index</div>
            <div className="col-span-4">Status</div>
          </div>
          
          {/* Row 1 */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/20 items-center hover:bg-white/5 transition-colors group cursor-pointer">
            <div className="col-span-4 md:col-span-3 font-bold font-serif text-lg">RMA v MCI</div>
            <div className="col-span-2 hidden md:block font-mono text-sm">88:12</div>
            <div className="col-span-4 md:col-span-3 font-mono">
              <span className="text-xl">98.4</span>
            </div>
            <div className="col-span-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                 <span className="font-mono text-xs uppercase tracking-widest">Critical Volatility</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/20 items-center hover:bg-white/5 transition-colors group cursor-pointer">
            <div className="col-span-4 md:col-span-3 font-bold font-serif text-lg text-gray-300">ARS v PSG</div>
            <div className="col-span-2 hidden md:block font-mono text-sm text-gray-400">65:00</div>
            <div className="col-span-4 md:col-span-3 font-mono text-gray-300">
              <span className="text-xl">85.2</span>
            </div>
            <div className="col-span-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-400">
                 <div className="w-2 h-2 bg-gray-500 rounded-full" />
                 <span className="font-mono text-xs uppercase tracking-widest">Rising Interest</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/5 transition-colors group cursor-pointer">
            <div className="col-span-4 md:col-span-3 font-bold font-serif text-lg text-gray-500">JUV v MIL</div>
            <div className="col-span-2 hidden md:block font-mono text-sm text-gray-600">32:14</div>
            <div className="col-span-4 md:col-span-3 font-mono text-gray-500">
              <span className="text-xl">42.0</span>
            </div>
            <div className="col-span-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                 <div className="w-2 h-2 border border-gray-600 rounded-full" />
                 <span className="font-mono text-xs uppercase tracking-widest">Stagnant</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section className="w-full py-32 px-8 bg-black">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-7xl font-serif mb-8">Secure Access</h2>
        <p className="text-gray-400 font-light mb-16 max-w-lg">
          Eyeconic is currently available to select partners. Submit your inquiry to join the waitlist for institutional access.
        </p>
        
        <form className="w-full space-y-12" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group">
              <input type="text" className="w-full bg-transparent border-b border-white/30 px-0 py-4 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors peer placeholder-transparent rounded-none" placeholder="Name" id="name" />
              <label htmlFor="name" className="absolute left-0 top-4 text-gray-500 font-mono text-xs transition-all peer-focus:-top-4 peer-focus:text-white peer-valid:-top-4 peer-valid:text-gray-400 uppercase tracking-widest">Full Name</label>
            </div>
            <div className="relative group">
              <input type="text" className="w-full bg-transparent border-b border-white/30 px-0 py-4 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors peer placeholder-transparent rounded-none" placeholder="Organization" id="org" />
              <label htmlFor="org" className="absolute left-0 top-4 text-gray-500 font-mono text-xs transition-all peer-focus:-top-4 peer-focus:text-white peer-valid:-top-4 peer-valid:text-gray-400 uppercase tracking-widest">Organization</label>
            </div>
          </div>
          
          <div className="relative group">
            <input type="email" className="w-full bg-transparent border-b border-white/30 px-0 py-4 text-white font-mono text-sm focus:outline-none focus:border-white transition-colors peer placeholder-transparent rounded-none" placeholder="Email" id="email" />
            <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 font-mono text-xs transition-all peer-focus:-top-4 peer-focus:text-white peer-valid:-top-4 peer-valid:text-gray-400 uppercase tracking-widest">Corporate Email</label>
          </div>
          
          <button className="w-full md:w-auto px-16 py-5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors">
            Submit Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-white/20 bg-black py-12 px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 text-white">
          <div className="w-2 h-2 bg-white" />
          <span className="text-lg font-serif tracking-widest uppercase">Eyeconic</span>
        </div>
        
        <div className="flex gap-12 text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase">
          <a href="#" className="hover:text-white transition-colors">Legal</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        
        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          © {new Date().getFullYear()} Eyeconic Intelligence. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
