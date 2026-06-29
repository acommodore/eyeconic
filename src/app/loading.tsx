export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#75fbd9]/20 border-t-[#75fbd9] rounded-full animate-spin shadow-[0_0_15px_rgba(117, 251, 217,0.5)]"></div>
        <p className="text-[#75fbd9] font-black tracking-widest text-sm animate-pulse">LOADING...</p>
      </div>
    </div>
  );
}
