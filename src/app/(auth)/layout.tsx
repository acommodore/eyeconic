import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#020202] flex flex-col md:flex-row text-white overflow-hidden font-sans">
      
      {/* Left Side: Dramatic Atmosphere (Hidden on mobile) */}
      <div className="hidden md:flex flex-1 relative items-center justify-center overflow-hidden border-r border-white/5">
        {/* Deep ambient glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,229,255,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,127,80,0.05)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
        
        {/* Massive Typography Graphic */}
        <div className="relative z-10 flex flex-col items-center justify-center -rotate-12 scale-110 select-none">
          <h1 className="text-[12rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent">
            STIM
            <br />
            MUNG
          </h1>
        </div>

        {/* Floating Brand Badge */}
        <Link href="/" className="absolute top-10 left-10 flex items-center gap-3 z-20 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/stimmung_logo_nobg.png" alt="Stimmung Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
          </div>
          <span className="font-black tracking-widest text-lg uppercase text-white drop-shadow-md">STIMMUNG</span>
        </Link>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="w-full md:w-[600px] shrink-0 flex flex-col justify-center items-center p-6 md:p-12 relative z-10 bg-[#050505] md:bg-transparent shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        {/* Mobile Brand Badge */}
        <Link href="/" className="md:hidden flex items-center gap-3 mb-12 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#FF7F50] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="font-black tracking-widest text-base uppercase">STIMMUNG</span>
        </Link>

        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
