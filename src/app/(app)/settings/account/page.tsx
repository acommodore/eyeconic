"use client";

import { ArrowLeft, Mail, Key, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountDetailsPage() {
  const router = useRouter();

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
        <h1 className="text-3xl font-black tracking-widest uppercase drop-shadow-md">Account Details</h1>
        <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-widest">Manage your credentials</p>
      </div>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2"><Mail className="w-3 h-3"/> Email Address</label>
            <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-4">
              <span className="text-sm font-medium">operative@stimmung.com</span>
              <button className="text-xs font-bold text-[#75fbd9] hover:text-[#75fbd9]/80 uppercase tracking-widest">Edit</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2"><Key className="w-3 h-3"/> Password</label>
            <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-4">
              <span className="text-sm font-medium">••••••••••••</span>
              <button className="text-xs font-bold text-[#75fbd9] hover:text-[#75fbd9]/80 uppercase tracking-widest">Change</button>
            </div>
          </div>

        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-2"><Smartphone className="w-4 h-4 text-muted-foreground"/> Active Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="text-sm font-bold">Windows PC - Chrome</p>
                <p className="text-xs text-[#75fbd9] font-mono mt-1">Current Session</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">iPhone 14 Pro - Safari</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">Last active: 2 hours ago</p>
              </div>
              <button className="text-[10px] uppercase font-bold text-red-500 hover:text-red-400 tracking-widest px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/10">Revoke</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

