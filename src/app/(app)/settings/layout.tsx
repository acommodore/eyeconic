"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Lock, Shield, FileText, HelpCircle, LogOut } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

const SETTINGS_LINKS = [
  { href: "/settings/edit", label: "Edit Profile", icon: User },
  { href: "/settings", label: "Notifications", icon: Bell },
  { href: "/privacy", label: "Privacy Policy", icon: Shield },
  { href: "/settings/terms", label: "Terms of Service", icon: FileText },
  { href: "/settings/help", label: "Help Center", icon: HelpCircle },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Show sidebar only if on /settings on mobile, or always on md+
  const isSettingsRoot = pathname === "/settings";

  return (
    <div className="w-full max-w-[1600px] mx-auto min-h-screen bg-[#050505] text-white flex pt-6 md:pt-10">
      
      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-[320px] lg:w-[400px] flex-shrink-0 flex flex-col gap-8 px-4 md:px-8 border-r-0 md:border-r border-white/5 ${isSettingsRoot ? 'block' : 'hidden md:flex'}`}>
        <div className="flex items-center gap-4 mb-4">
          <BackButton containerClassName="p-2 hover:bg-white/10 rounded-full transition-colors group" iconClassName="w-6 h-6 text-[#00E5FF] group-hover:-translate-x-1 transition-transform" />
          <h1 className="text-3xl font-black tracking-tighter uppercase">Settings</h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {SETTINGS_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold tracking-wide transition-all duration-300 ${
                  isActive 
                    ? "bg-[#00E5FF]/10 text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.1)] border border-[#00E5FF]/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#00E5FF]" : "text-gray-500"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pb-10 pt-4">
          <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold tracking-widest uppercase bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-all duration-300">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className={`flex-1 min-w-0 ${isSettingsRoot ? 'hidden md:block' : 'block'}`}>
        {children}
      </main>

    </div>
  );
}
