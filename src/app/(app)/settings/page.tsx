import { Settings, Shield, Bell, User, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 min-h-screen space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-black tracking-[0.2em] uppercase drop-shadow-md">SETTINGS</h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          <span className="text-[10px] text-teal font-mono tracking-widest uppercase">CONFIGURATION PROTOCOLS</span>
        </div>
      </div>

      <div className="grid gap-4">
        {[
          { icon: <User className="w-5 h-5" />, title: "Account Details", desc: "Manage your email, password, and active sessions." },
          { icon: <Bell className="w-5 h-5" />, title: "Notifications", desc: "Configure push and email alerts for your clubs." },
          { icon: <Shield className="w-5 h-5" />, title: "Privacy & Security", desc: "Control who sees your Emotional Track Record." },
          { icon: <Settings className="w-5 h-5" />, title: "App Preferences", desc: "Language, haptics, and data usage." }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl cursor-pointer hover:border-foreground transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl text-muted-foreground group-hover:text-foreground transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
      
    </div>
  );
}
