"use client";

import Link from "next/link";
import { User, Bell, Shield, FileText, HelpCircle, LogOut } from "lucide-react";

export default function SettingsGridPage() {
  const settingsCards = [
    { href: "/settings/edit", label: "Edit Profile", description: "Manage your personal details and allegiances", icon: User, color: "text-[#00E5FF]", bg: "bg-[#00E5FF]/10", border: "border-[#00E5FF]/20" },
    { href: "/settings/notifications", label: "Notifications", description: "Configure goal alerts and mood shifts", icon: Bell, color: "text-[#FF7F50]", bg: "bg-[#FF7F50]/10", border: "border-[#FF7F50]/20" },
    { href: "/privacy", label: "Privacy Policy", description: "Review our data practices", icon: Shield, color: "text-[#00C853]", bg: "bg-[#00C853]/10", border: "border-[#00C853]/20" },
    { href: "/settings/terms", label: "Terms of Service", description: "Read the rules of the platform", icon: FileText, color: "text-[#FFD600]", bg: "bg-[#FFD600]/10", border: "border-[#FFD600]/20" },
    { href: "/settings/help", label: "Help Center", description: "Get support and find answers", icon: HelpCircle, color: "text-[#B388FF]", bg: "bg-[#B388FF]/10", border: "border-[#B388FF]/20" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 min-h-screen text-white pb-24">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">Settings</h1>
        <p className="text-gray-400 font-medium tracking-wide">Manage your Eyeconic experience.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="group block h-full">
              <div className="h-full bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${card.color}`} />
                </div>
                <h3 className="text-lg font-black tracking-widest uppercase mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">{card.label}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{card.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 max-w-md mx-auto md:mx-0">
        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold tracking-widest uppercase bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.1)]">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
