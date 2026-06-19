"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">Welcome</h1>
      <p className="text-gray-400 text-sm mb-8">Sign in to your account.</p>

      {/* Social Login Buttons */}
      <div className="flex gap-4 mb-8">
        <button className="w-14 h-14 rounded-2xl bg-[#121212] border border-white/5 flex items-center justify-center hover:bg-white/5 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </button>
      </div>

      <div className="w-full flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">OR LOG IN WITH</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <form className="w-full space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">EMAIL</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            required
            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">PASSWORD</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password"
              required
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-4 pr-12 text-white focus:outline-none focus:border-[#00E5FF] transition-colors text-sm"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <div className="flex justify-end pt-1">
          <Link href="/forgot-password" className="text-xs text-[#00E5FF] hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="w-full mt-4 bg-[#FF4F00] text-[#050505] font-bold text-sm tracking-wide py-4 rounded-xl hover:bg-[#FF4F00]/90 transition-all shadow-[0_0_20px_rgba(255,79,0,0.3)]">
          SIGN IN
        </button>
      </form>

      <p className="mt-8 text-sm text-gray-400">
        Don&apos;t have an account? <Link href="/signup" className="text-[#00E5FF] hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
