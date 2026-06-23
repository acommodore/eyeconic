"use client";

import { Target, Smile, Activity, TrendingUp } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/ui/BackButton";
import Link from "next/link";

export default function SettingsNotificationsPage() {
  const [toggles, setToggles] = useState({
    goalAlerts: true,
    moodShift: false,
    activeStands: true,
  });

  const toggleSetting = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 text-white pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-12 relative z-10">
        <BackButton containerClassName="p-2 hover:bg-white/10 rounded-full transition-colors group bg-white/5 border border-white/10" iconClassName="w-5 h-5 text-[#FF7F50] group-hover:-translate-x-1 transition-transform" />
        <h1 className="text-3xl md:text-4xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">Notifications</h1>
      </div>

      <div className="space-y-8">
        <section>
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
            {/* Goal Alerts Toggle */}
            <div className="w-full flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <Target className="w-6 h-6 text-[#00E5FF]" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">Goal Alerts</h3>
                  <p className="text-xs text-gray-500 font-medium">Real-time alerts when your teams score</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting('goalAlerts')}
                className={`w-14 h-7 rounded-full p-1 transition-colors ${toggles.goalAlerts ? 'bg-[#00E5FF]' : 'bg-gray-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${toggles.goalAlerts ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Mood Shift Toggle */}
            <div className="w-full flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <Smile className="w-6 h-6 text-[#00E5FF]" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">Mood Shift</h3>
                  <p className="text-xs text-gray-500 font-medium">Adapt the UI colors based on match events</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting('moodShift')}
                className={`w-14 h-7 rounded-full p-1 transition-colors ${toggles.moodShift ? 'bg-[#00E5FF]' : 'bg-gray-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${toggles.moodShift ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Active Stands Toggle */}
            <div className="w-full flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <Activity className="w-6 h-6 text-[#00E5FF]" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">Active Stands</h3>
                  <p className="text-xs text-gray-500 font-medium">Notify when rivals open a voice room</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting('activeStands')}
                className={`w-14 h-7 rounded-full p-1 transition-colors ${toggles.activeStands ? 'bg-[#00E5FF]' : 'bg-gray-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${toggles.activeStands ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
