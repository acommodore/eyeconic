"use client";

import { ArrowLeft, Shield, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PrivacyPage() {
  const router = useRouter();
  const [privateProfile, setPrivateProfile] = useState(false);
  const [hideTrackRecord, setHideTrackRecord] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 min-h-screen space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors w-fit group">
          <div className="p-2 bg-black/5 dark:bg-white/5 rounded-full group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Back to Settings</span>
        </button>
        <h1 className="text-3xl font-black tracking-widest uppercase drop-shadow-md">Privacy & Security</h1>
        <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-widest">Protect your operative data</p>
      </div>

      <div className="space-y-6">
        
        <div className="bg-card border border-border rounded-3xl p-6 space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-foreground border-b border-border pb-4">Visibility Settings</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg"><Lock className="w-4 h-4 text-muted-foreground"/></div>
              <div>
                <p className="text-sm font-bold">Private Profile</p>
                <p className="text-xs text-muted-foreground">Only approved contacts can see your profile.</p>
              </div>
            </div>
            <button 
              onClick={() => setPrivateProfile(!privateProfile)}
              className={`w-12 h-6 rounded-full relative transition-colors ${privateProfile ? 'bg-[#75fbd9]' : 'bg-muted'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${privateProfile ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg"><EyeOff className="w-4 h-4 text-muted-foreground"/></div>
              <div>
                <p className="text-sm font-bold">Hide Emotional Track Record</p>
                <p className="text-xs text-muted-foreground">Hide your reaction statistics from others.</p>
              </div>
            </div>
            <button 
              onClick={() => setHideTrackRecord(!hideTrackRecord)}
              className={`w-12 h-6 rounded-full relative transition-colors ${hideTrackRecord ? 'bg-[#75fbd9]' : 'bg-muted'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${hideTrackRecord ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
