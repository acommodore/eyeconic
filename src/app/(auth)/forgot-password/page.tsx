"use client";

import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/ui/BackButton";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex flex-col"
    >
      <div className="mb-10">
        <BackButton containerClassName="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-white transition-colors mb-6" iconClassName="w-4 h-4">
          Back
        </BackButton>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
          Reset Password
        </h1>
        <p className="text-gray-400 text-sm md:text-base tracking-wide font-medium">
          Enter your email to regain access.
        </p>
      </div>

      {!isSubmitted ? (
        <form className="w-full space-y-5" onSubmit={handleReset}>
          <div className="group relative">
            <label className="block text-[10px] font-bold tracking-widest text-gray-500 mb-2 uppercase group-focus-within:text-white transition-colors">EMAIL</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
              <input 
                type="email" 
                placeholder="Enter your email"
                required
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all duration-300 text-sm font-medium tracking-wide placeholder-gray-600 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

          <button type="submit" className="group relative w-full mt-6 bg-white text-[#020202] font-black text-sm tracking-[0.2em] uppercase py-5 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#020202] to-transparent opacity-20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10">SEND RESET LINK</span>
          </button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md"
        >
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
            <Mail className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Check your inbox</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            We&apos;ve sent a password reset link to your email. It will expire in 30 minutes.
          </p>
          <Link href="/login" className="block w-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-widest uppercase py-4 rounded-2xl transition-colors">
            RETURN TO LOGIN
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

