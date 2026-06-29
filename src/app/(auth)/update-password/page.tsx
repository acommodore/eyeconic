"use client";

import Link from "next/link";
import { Lock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function UpdatePasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
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
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
          New Password
        </h1>
        <p className="text-gray-400 text-sm md:text-base tracking-wide font-medium">
          Create a new, strong password for your account.
        </p>
      </div>

      {!isSubmitted ? (
        <form className="w-full space-y-5" onSubmit={handleUpdate}>
          <div className="group relative">
            <label className="block text-[10px] font-bold tracking-widest text-gray-500 mb-2 uppercase group-focus-within:text-white transition-colors">NEW PASSWORD</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
              <input 
                type="password" 
                placeholder="Enter new password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all duration-300 text-sm font-medium tracking-wide placeholder-gray-600 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

          <div className="group relative">
            <label className="block text-[10px] font-bold tracking-widest text-gray-500 mb-2 uppercase group-focus-within:text-white transition-colors">CONFIRM PASSWORD</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
              <input 
                type="password" 
                placeholder="Confirm new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all duration-300 text-sm font-medium tracking-wide placeholder-gray-600 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

          <button type="submit" className="group relative w-full mt-6 bg-white text-[#020202] font-black text-sm tracking-[0.2em] uppercase py-5 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#020202] to-transparent opacity-20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10">UPDATE PASSWORD</span>
          </button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md"
        >
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Password Updated</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <Link href="/login" className="block w-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-widest uppercase py-4 rounded-2xl transition-colors">
            GO TO LOGIN
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

