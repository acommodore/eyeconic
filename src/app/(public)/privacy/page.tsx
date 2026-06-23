import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackButton } from "@/components/ui/BackButton";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] transition-colors duration-500 font-sans text-gray-900 dark:text-white flex flex-col">
      <nav className="fixed top-0 w-full z-50 bg-transparent border-b border-gray-200 dark:border-white/5 transition-colors">
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md transition-colors" />
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
          <BackButton containerClassName="flex items-center gap-3 group" iconClassName="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <span className="text-sm font-bold tracking-widest uppercase">Back</span>
          </BackButton>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 pt-40 pb-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">Privacy Policy</h1>
        <p className="text-sm font-mono text-[#00E5FF] tracking-widest uppercase mb-12">Last Updated: October 2026</p>
        
        <div className="space-y-12 text-gray-600 dark:text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Data Collection</h2>
            <p>We collect minimal data required to provide the Eyeconic service, including email addresses for waitlist and standard usage analytics.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Use of Information</h2>
            <p>Your data is used strictly for improving the Attention Layer algorithms and providing personalized match recommendations. We do not sell your personal data to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Tracking & Cookies</h2>
            <p>We use standard cookies to maintain user sessions and preferences (such as Light/Dark mode). No invasive tracking mechanisms are deployed.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Contact Us</h2>
            <p>If you have any questions about our privacy policy, please contact us at privacy@eyeconic.app.</p>
          </section>
        </div>
      </main>
      
      <footer className="w-full border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#030303] py-16 px-6 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-gray-500" />
            <span className="text-lg font-bold tracking-tighter text-gray-500">Eyeconic</span>
          </div>
          <div className="flex gap-10 text-[10px] text-gray-500 dark:text-gray-600 font-mono tracking-[0.2em] uppercase transition-colors">
            <Link href="/#hero" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</Link>
            <Link href="/#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link>
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
