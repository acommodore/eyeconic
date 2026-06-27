"use client";

import { ArrowLeft, Settings2, Vibrate, Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PreferencesPage() {
  const router = useRouter();
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);

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
        <h1 className="text-3xl font-black tracking-widest uppercase drop-shadow-md">App Preferences</h1>
        <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-widest">Customize your interface</p>
      </div>

      <div className="space-y-6">
        
        <div className="bg-card border border-border rounded-3xl p-6 space-y-6">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-foreground border-b border-border pb-4">Device Settings</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg"><Vibrate className="w-4 h-4 text-teal"/></div>
              <div>
                <p className="text-sm font-bold">Haptic Feedback</p>
                <p className="text-xs text-muted-foreground">Feel the tension of live matches.</p>
              </div>
            </div>
            <button 
              onClick={() => setHapticsEnabled(!hapticsEnabled)}
              className={`w-12 h-6 rounded-full relative transition-colors ${hapticsEnabled ? 'bg-teal' : 'bg-muted'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${hapticsEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg"><Settings2 className="w-4 h-4 text-muted-foreground"/></div>
              <div>
                <p className="text-sm font-bold">Data Saver Mode</p>
                <p className="text-xs text-muted-foreground">Reduce data usage in The Stand.</p>
              </div>
            </div>
            <button 
              onClick={() => setDataSaver(!dataSaver)}
              className={`w-12 h-6 rounded-full relative transition-colors ${dataSaver ? 'bg-teal' : 'bg-muted'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${dataSaver ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg"><Languages className="w-4 h-4 text-muted-foreground"/></div>
              <div>
                <p className="text-sm font-bold">Language</p>
                <p className="text-xs text-muted-foreground">System Default (English)</p>
              </div>
            </div>
            <button className="text-[10px] font-bold text-teal hover:text-teal/80 uppercase tracking-widest px-3 py-1.5 border border-border rounded-xl">Change</button>
          </div>
        </div>

      </div>
    </div>
  );
}
