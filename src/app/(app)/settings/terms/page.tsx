import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 min-h-screen text-white space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <BackButton containerClassName="p-2 hover:bg-white/10 rounded-full transition-colors group" iconClassName="w-6 h-6 text-[#00E5FF] group-hover:-translate-x-1 transition-transform" />
        <h1 className="text-3xl font-black tracking-widest uppercase drop-shadow-md">Terms of Service</h1>
      </div>
      
      <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 space-y-6 text-gray-300">
        <p>This is a placeholder for the Terms of Service. It will be updated before launch.</p>
      </div>
    </div>
  );
}
