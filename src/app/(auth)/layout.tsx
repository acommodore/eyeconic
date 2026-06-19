export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center p-6 text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="w-full max-w-sm relative z-10">
        {children}
      </div>
    </div>
  );
}
