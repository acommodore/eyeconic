"use client";

import { Settings, Shield, Edit2, Medal, Activity, Flame, Trophy, ChevronRight, Zap, Target, Eye, Mic } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("track-record");
  const [profile, setProfile] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  
  const handleSaveProfile = async () => {
    if (!editUsername.trim()) return;
    setIsSaving(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from('profiles').upsert({ 
      id: user.id, 
      username: editUsername.trim(),
      avatar_url: profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
    });

    if (!error) {
      setProfile({ ...(profile || {}), id: user.id, username: editUsername.trim() });
      setIsEditModalOpen(false);
      window.dispatchEvent(new Event('profile-updated'));
    } else {
      console.error("Error saving profile:", error);
    }
    setIsSaving(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (prof) {
          setProfile(prof);
        }
      }
    };
    fetchUser();
  }, [supabase]);


  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen space-y-12 animate-in fade-in duration-500 pb-24">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-[0.2em] uppercase drop-shadow-md">OPERATIVE PROFILE</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-[10px] text-teal font-mono tracking-widest uppercase">ID: 8492-AX</span>
          </div>
        </div>
        <Link href="/settings" className="text-muted-foreground hover:text-foreground transition-all duration-300 p-3 bg-black/5 dark:bg-white/5 rounded-full border border-border hover:bg-black/10 dark:hover:bg-white/10 hover:rotate-90 inline-block">
          <Settings className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - ID Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield className="w-32 h-32 text-foreground" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-2 border-teal p-1 relative z-10">
                  <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                    <img src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + userEmail} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <button onClick={() => { setEditUsername(profile?.username || ""); setIsEditModalOpen(true); }} className="absolute bottom-0 right-0 p-2 bg-foreground text-background rounded-full hover:scale-110 transition-transform z-20">
                  <Edit2 className="w-4 h-4" />
                </button>
                {/* Glow behind avatar */}
                <div className="absolute inset-0 bg-teal/20 blur-2xl rounded-full z-0" />
              </div>
              
              <div>
                <h2 className="text-2xl font-black tracking-widest uppercase">{profile?.username || "Operative"}</h2>
                <p className="text-muted-foreground text-sm font-mono mt-1">{userEmail ? `@${userEmail.split('@')[0]}` : '@operative_99'}</p>
              </div>

              <div className="flex gap-2 w-full pt-4 border-t border-border mt-4">
                <div className="flex-1 bg-black/5 dark:bg-white/5 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Rank</span>
                  <span className="font-black text-teal flex items-center gap-1"><Trophy className="w-3 h-3" /> Gold II</span>
                </div>
                <div className="flex-1 bg-black/5 dark:bg-white/5 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Eye Accuracy</span>
                  <span className="font-black text-foreground flex items-center gap-1"><Target className="w-3 h-3" /> 84%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-4">Acquired Badges</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: <Flame className="w-6 h-6 text-coral" />, name: "Hot Streak", active: true },
                { icon: <Eye className="w-6 h-6 text-teal" />, name: "Visionary", active: true },
                { icon: <Activity className="w-6 h-6 text-purple-400" />, name: "Instigator", active: true },
                { icon: <Medal className="w-6 h-6 text-yellow-500" />, name: "Champion", active: false },
              ].map((badge, i) => (
                <div key={i} className={`aspect-square rounded-xl flex items-center justify-center border ${badge.active ? 'bg-black/5 dark:bg-white/5 border-border hover:border-foreground transition-colors cursor-pointer' : 'opacity-20 border-border grayscale'} relative group`}>
                  {badge.icon}
                  {badge.active && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {badge.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <Link href="/stands/create" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF4500] to-[#FF7F50] text-white font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,69,0,0.3)] mt-6">
            <Mic className="w-5 h-5" /> Push An Agenda
          </Link>

        </div>

        {/* Right Column - Stats & History */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tabs */}
          <div className="flex gap-4 border-b border-border pb-px">
            <button 
              onClick={() => setActiveTab("track-record")}
              className={`pb-4 text-sm font-bold tracking-widest uppercase transition-colors relative ${activeTab === 'track-record' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'}`}
            >
              Emotional Track Record
              {activeTab === 'track-record' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal rounded-t-full shadow-[0_-2px_10px_rgba(0,229,255,0.5)]" />}
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`pb-4 text-sm font-bold tracking-widest uppercase transition-colors relative ${activeTab === 'history' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'}`}
            >
              Echo History
              {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal rounded-t-full shadow-[0_-2px_10px_rgba(0,229,255,0.5)]" />}
            </button>
          </div>

          {activeTab === "track-record" ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border border-border p-5 rounded-2xl">
                  <h4 className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-2">Most Used Reaction</h4>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl">🔥</span>
                    <div>
                      <div className="text-xl font-black">HYPE</div>
                      <div className="text-xs text-muted-foreground">342 times</div>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border p-5 rounded-2xl">
                  <h4 className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-2">Most Rated Player</h4>
                  <div className="flex items-end gap-3">
                    <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                      <img src="https://a.espncdn.com/i/headshots/soccer/players/full/229936.png" alt="Player" className="w-full h-full object-cover scale-150 origin-top" />
                    </div>
                    <div>
                      <div className="text-lg font-black uppercase">O. Dembélé</div>
                      <div className="text-xs text-coral">80% Villain ratings</div>
                    </div>
                  </div>
                </div>
                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col justify-between">
                  <h4 className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-2">Current Vibe</h4>
                  <div className="w-full bg-black/5 dark:bg-white/5 h-2 rounded-full overflow-hidden flex">
                    <div className="h-full bg-teal w-[60%]" />
                    <div className="h-full bg-coral w-[40%]" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono mt-2">
                    <span className="text-teal">Euphoric</span>
                    <span className="text-coral">Anxious</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-3xl p-6">
                <h3 className="text-sm font-bold tracking-widest text-foreground uppercase mb-6 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { text: "Rated Vinicius Jr as 🥶 ICE COLD", time: "2 hours ago", match: "RMA vs MCI" },
                    { text: "Echoed a Voice Note in The Stand", time: "5 hours ago", match: "ARS vs TOT" },
                    { text: "Joined the Arsenal Tribal Room", time: "1 day ago", match: "Global" },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/2 dark:bg-white/2 border border-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                      <div>
                        <p className="text-sm font-medium">{act.text}</p>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase mt-1">{act.match}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{act.time}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center animate-in slide-in-from-left-4 duration-300 h-64">
              <Zap className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-black uppercase tracking-widest mb-2">No Echoes Yet</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Head over to The Stand during a live match to leave your first voice note and start building your echo history.
              </p>
              <Link href="/stands" className="mt-6 px-6 py-2 bg-foreground text-background font-bold text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
                Go to The Stand
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0A0A0A] border border-border rounded-3xl p-6 w-full max-w-sm space-y-6 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-widest text-foreground">Edit Profile</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Username</label>
              <input 
                type="text" 
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                placeholder="Enter new username"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-foreground focus:outline-none focus:border-teal transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-border text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="flex-1 py-3 rounded-xl bg-teal text-black text-xs font-black uppercase tracking-widest hover:bg-teal/90 transition-colors flex justify-center items-center"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}