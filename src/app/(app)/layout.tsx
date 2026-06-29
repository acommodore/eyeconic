"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Home, User, Menu, ChevronLeft, Building2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { OnboardingModal } from "@/components/ui/OnboardingModal";
import { useAuth } from "@/components/Providers";
import { createClient } from "@/lib/supabase/client";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [profile, setProfile] = useState<{username: string, avatar_url: string} | null>(null);
  const lastScrollY = useRef(0);
  const isNavVisible = useRef(true);
  const { user } = useAuth();
  const supabase = createClient();

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

    const handleHideNav = () => {
      if (isNavVisible.current) {
        setShowNav(false);
        isNavVisible.current = false;
      }
    };
    
    const handleShowNav = () => {
      if (!isNavVisible.current) {
        setShowNav(true);
        isNavVisible.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hide-nav', handleHideNav);
    window.addEventListener('show-nav', handleShowNav);

    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase.from('profiles').select('username, avatar_url').eq('id', user.id).single();
        if (data) {
          setProfile(data);
        }
      }
    };
    
    fetchProfile();

    const handleProfileUpdated = () => {
      fetchProfile();
    };
    window.addEventListener('profile-updated', handleProfileUpdated);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hide-nav', handleHideNav);
      window.removeEventListener('show-nav', handleShowNav);
      window.removeEventListener('profile-updated', handleProfileUpdated);
    };
  }, [user, supabase]);

  const displayName = profile?.username || "Operative";
  const avatarUrl = profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Operative";

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: "Home", href: "/home" },
    { icon: <Building2 className="w-6 h-6" />, label: "Stands", href: "/stands" },
  ];

  const isStandRoom = /^\/stands\/[^/]+$/.test(pathname);

  return (
    <div 
      className={`${isStandRoom ? 'h-[100dvh] overflow-hidden' : 'min-h-[100dvh]'} bg-background text-foreground flex flex-col md:flex-row`}
      style={{ '--mobile-nav-height': showNav ? '80px' : '0px' } as React.CSSProperties}
    >
      {/* Mobile Top Bar */}
      {!isStandRoom && (
      <header className="md:hidden h-16 border-b border-border flex items-center justify-between px-4 bg-card text-card-foreground">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/stimmung_logo_nobg.png" alt="Stimmung Logo" className="h-12 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/profile" className="w-8 h-8 rounded-full border border-border overflow-hidden bg-muted">
             {/* Avatar placeholder */}
             <img src={avatarUrl} alt="User" />
          </Link>
        </div>
      </header>
      )}

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col border-r border-border bg-card text-card-foreground h-screen sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-24 p-4 items-center' : 'w-64 p-6'}`}>
        <div className={`flex items-center mb-12 ${isCollapsed ? 'justify-center w-full' : 'justify-between w-full'}`}>
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/stimmung_logo_nobg.png" alt="Stimmung Logo" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            </Link>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors text-muted-foreground hover:text-foreground"
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
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
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
          <Link href="/profile" className={`flex items-center gap-3 rounded-xl bg-muted border border-border hover:bg-muted/80 transition-colors cursor-pointer group ${isCollapsed ? 'justify-center p-2 w-14 h-14' : 'p-3 w-full'}`}>
          <div className="w-10 h-10 shrink-0 rounded-full border border-[#00E5FF] overflow-hidden p-0.5 group-hover:border-foreground transition-colors">
            <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden relative">
              <img src={avatarUrl} alt="User" />
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-black" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate group-hover:text-[#00E5FF] transition-colors">{displayName}</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          )}
        </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col relative min-h-0 ${isStandRoom ? 'pb-0' : 'pb-20 md:pb-0'} overflow-x-hidden transition-all duration-300`}>
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      {!isStandRoom && (
      <nav className={`md:hidden fixed bottom-0 w-full h-[calc(5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-card text-card-foreground border-t border-border flex items-center justify-around px-2 z-50  transition-transform duration-300 ${showNav ? 'translate-y-0' : 'translate-y-full'}`}>
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
            </Link>
          );
        })}
      </nav>
      )}

      <OnboardingModal />
    </div>
  );
}
