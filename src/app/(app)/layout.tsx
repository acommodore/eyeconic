"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Compass, User, Menu, ChevronLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { OnboardingModal } from "@/components/ui/OnboardingModal";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);
  const isNavVisible = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Ignore iOS rubber-band bounce
        if (currentScrollY < 0) return;
        
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          if (isNavVisible.current) {
            setShowNav(false);
            isNavVisible.current = false;
          }
        } else if (currentScrollY < lastScrollY.current) {
          if (!isNavVisible.current) {
            setShowNav(true);
            isNavVisible.current = true;
          }
        }
        
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: <Compass className="w-6 h-6" />, label: "Discover", href: "/discover" },
    { icon: <User className="w-6 h-6" />, label: "The Stand", href: "/stands" },
  ];

  const isStandRoom = /^\/stands\/[^/]+$/.test(pathname);

  return (
    <div className={`${isStandRoom ? 'h-[100dvh] overflow-hidden' : 'min-h-screen'} bg-[#050505] text-white flex flex-col md:flex-row`}>
      {/* Mobile Top Bar */}
      <header className="md:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-[#0a0a0a]">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 rounded bg-[#00E5FF] flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="font-black tracking-widest uppercase">EYECONIC</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/profile" className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-[#121212]">
             {/* Avatar placeholder */}
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="User" />
          </Link>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col border-r border-white/5 bg-[#0a0a0a] h-screen sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-24 p-4 items-center' : 'w-64 p-6'}`}>
        <div className={`flex items-center mb-12 ${isCollapsed ? 'justify-center w-full' : 'justify-between w-full'}`}>
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#FF7F50] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-widest uppercase">EYECONIC</span>
            </Link>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
             {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 space-y-4 w-full flex flex-col items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link 
                key={item.href} 
                href={item.href}
                title={isCollapsed ? item.label : ""}
                className={`flex items-center rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#00E5FF]/10 text-[#00E5FF] font-semibold" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } ${isCollapsed ? 'justify-center w-12 h-12 p-0' : 'gap-4 px-4 py-3 w-full'}`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4 w-full">
          <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-start px-2'}`}>
            <ThemeToggle />
          </div>
          <Link href="/profile" className={`flex items-center gap-3 rounded-xl bg-[#121212] border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${isCollapsed ? 'justify-center p-2 w-14 h-14' : 'p-3 w-full'}`}>
          <div className="w-10 h-10 shrink-0 rounded-full border border-[#00E5FF] overflow-hidden p-0.5 group-hover:border-white transition-colors">
            <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden relative">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="User" />
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-black" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate group-hover:text-[#00E5FF] transition-colors">Maximus Prime</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          )}
        </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative pb-20 md:pb-0 overflow-x-hidden transition-all duration-300">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className={`md:hidden fixed bottom-0 w-full h-20 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-around px-2 z-50 pb-safe transition-transform duration-300 ${showNav ? 'translate-y-0' : 'translate-y-full'}`}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                isActive ? "text-[#00E5FF]" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <div className={`p-1.5 rounded-full ${isActive ? "bg-[#00E5FF]/10" : ""}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <OnboardingModal />
    </div>
  );
}
