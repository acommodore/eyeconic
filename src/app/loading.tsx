export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#00E5FF]/20 border-t-[#00E5FF] rounded-full animate-spin shadow-[0_0_15px_rgba(0,229,255,0.5)]"></div>
        <p className="text-[#00E5FF] font-black tracking-widest text-sm animate-pulse">LOADING...</p>
      </div>
    </div>
  );
}
