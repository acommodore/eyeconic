"use client";

import { ArrowLeft, Bell, BellRing, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotificationsPage() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [matchAlerts, setMatchAlerts] = useState(true);

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
        <h1 className="text-3xl font-black tracking-widest uppercase drop-shadow-md">Notifications</h1>
        <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-widest">Control your alert protocols</p>
      </div>

      <div className="space-y-6">
        
        {/* Global Settings */}
        <div className="bg-card border border-border rounded-3xl p-6 space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-foreground border-b border-border pb-4">Global Alerts</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg"><BellRing className="w-4 h-4 text-[#75fbd9]"/></div>
              <div>
                <p className="text-sm font-bold">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Receive instant alerts on your device.</p>
              </div>
            </div>
            <button 
              onClick={() => setPushEnabled(!pushEnabled)}
              className={`w-12 h-6 rounded-full relative transition-colors ${pushEnabled ? 'bg-[#75fbd9]' : 'bg-muted'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${pushEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg"><MessageSquare className="w-4 h-4 text-muted-foreground"/></div>
              <div>
                <p className="text-sm font-bold">Email Digest</p>
                <p className="text-xs text-muted-foreground">Weekly wrap-up of rivalries and chaos.</p>
              </div>
            </div>
            <button 
              onClick={() => setEmailEnabled(!emailEnabled)}
              className={`w-12 h-6 rounded-full relative transition-colors ${emailEnabled ? 'bg-[#75fbd9]' : 'bg-muted'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${emailEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Live Match Settings */}
        <div className="bg-card border border-border rounded-3xl p-6 space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-foreground border-b border-border pb-4">Match Events</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg"><Bell className="w-4 h-4 text-coral"/></div>
              <div>
                <p className="text-sm font-bold">Chaos & Momentum Spikes</p>
                <p className="text-xs text-muted-foreground">Alert when a match gets extremely volatile.</p>
              </div>
            </div>
            <button 
              onClick={() => setMatchAlerts(!matchAlerts)}
              className={`w-12 h-6 rounded-full relative transition-colors ${matchAlerts ? 'bg-[#75fbd9]' : 'bg-muted'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${matchAlerts ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
