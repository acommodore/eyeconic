"use client";

import Link from "next/link";
import { ArrowLeft, User, ChevronRight, Target, Smile, Activity, TrendingUp, ShieldCheck, FileText, HelpCircle, LogOut } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [toggles, setToggles] = useState({
    goalAlerts: true,
    moodShift: false,
    activeStands: true,
  });

  const toggleSetting = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 min-h-screen text-white pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/profile" className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-[#00E5FF]" />
        </Link>
        <h1 className="text-xl font-black tracking-widest uppercase">SETTINGS</h1>
      </div>

      <div className="space-y-8">
        
        {/* ACCOUNT */}
        <section>
          <h2 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3 pl-4">ACCOUNT</h2>
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
            <Link href="/settings/edit" className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Edit Profile</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Link>
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section>
          <h2 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3 pl-4">NOTIFICATIONS</h2>
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
            
            {/* Goal Alerts Toggle */}
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Goal Alerts</span>
              </div>
              <button 
                onClick={() => toggleSetting('goalAlerts')}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${toggles.goalAlerts ? 'bg-[#00E5FF]' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${toggles.goalAlerts ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Mood Shift Toggle */}
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Smile className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Mood Shift</span>
              </div>
              <button 
                onClick={() => toggleSetting('moodShift')}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${toggles.moodShift ? 'bg-[#00E5FF]' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${toggles.moodShift ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Active Stands Toggle */}
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Active Stands</span>
              </div>
              <button 
                onClick={() => toggleSetting('activeStands')}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${toggles.activeStands ? 'bg-[#00E5FF]' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${toggles.activeStands ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Prediction Results Link */}
            <Link href="#" className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Prediction Results</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Link>

          </div>
        </section>

        {/* LEGAL & SUPPORT */}
        <section>
          <h2 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3 pl-4">LEGAL & SUPPORT</h2>
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
            <Link href="/privacy" className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Privacy Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Link>
            <Link href="/terms" className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Terms of Service</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Link>
            <Link href="/help" className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Help Center</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Link>
          </div>
        </section>

        {/* LOGOUT BUTTON */}
        <button className="w-full py-4 mt-8 bg-[#FF3B00] hover:bg-[#FF3B00]/90 text-white font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,59,0,0.3)] flex items-center justify-center gap-3">
          <LogOut className="w-5 h-5" /> LOGOUT
        </button>

      </div>
    </div>
  );
}
