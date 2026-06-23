import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

export default function HelpPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 min-h-screen text-white space-y-8">
      <div className="flex items-center gap-4 mb-12">
        <BackButton containerClassName="p-2 hover:bg-white/10 rounded-full transition-colors group bg-white/5 border border-white/10" iconClassName="w-5 h-5 text-[#B388FF] group-hover:-translate-x-1 transition-transform" />
        <h1 className="text-3xl md:text-4xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">Help Center</h1>
      </div>
      
      <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 space-y-6 text-gray-300">
        <p>This is a placeholder for the Help Center. It will be populated with FAQs and support contacts before launch.</p>
      </div>
    </div>
  );
}
