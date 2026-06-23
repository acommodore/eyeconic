"use client";

import Link from "next/link";
import { ArrowLeft, Camera, HeartCrack, AlertTriangle, Search, Plus } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/ui/BackButton";

export default function EditProfilePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Form states
  const [name, setName] = useState("MARCUS VANCE");
  const [email, setEmail] = useState("m.vance@fan-hq.io");

  const handleSave = () => {
    // In a real app, we'd check if primary club changed.
    // For this prototype, we'll just show the confirm modal to demonstrate the flow.
    setShowConfirmModal(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 min-h-screen text-white relative">
      {/* Mobile Header */}
      <div className="flex md:hidden items-center gap-4 mb-10 relative z-10">
        <BackButton containerClassName="p-2 hover:bg-white/10 rounded-full transition-colors group" iconClassName="w-6 h-6 text-[#00E5FF] group-hover:-translate-x-1 transition-transform" />
        <h1 className="text-xl font-black tracking-widest uppercase">EDIT PROFILE</h1>
      </div>

      <div className="space-y-8 relative z-10">
        {/* Avatar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-2 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)]" />
            <div className="absolute inset-2 bg-gray-800 rounded-full overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#00E5FF] rounded-full border-2 border-[#050505] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <Camera className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-1">FULL NAME</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-1">EMAIL ADDRESS</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
            />
          </div>

          {/* Favorite Club */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-1">FAVORITE CLUB</label>
            <div className="flex gap-3">
               <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] border-2 border-[#00E5FF] flex items-center justify-center p-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                 <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" className="w-full h-full object-contain" alt="Selected" />
               </div>
               <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center p-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                 <img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" className="w-full h-full object-contain" alt="Option 1" />
               </div>
               <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center p-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                 <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" className="w-full h-full object-contain" alt="Option 2" />
               </div>
               <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] border border-white/10 border-dashed flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                 <Plus className="w-6 h-6 text-gray-500" />
               </div>
            </div>
          </div>

          {/* Rival Club */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-1">RIVAL CLUB</label>
            <div className="flex gap-3">
               <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] border-2 border-[#FF3B00] flex items-center justify-center p-2 shadow-[0_0_15px_rgba(255,59,0,0.2)]">
                 <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" className="w-full h-full object-contain" alt="Rival" />
               </div>
               <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] border border-white/10 border-dashed flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                 <Search className="w-6 h-6 text-gray-500" />
               </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-8 space-y-4">
          <button 
            onClick={handleSave}
            className="w-full py-4 bg-[#FF3B00] hover:bg-[#FF3B00]/90 text-white font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,59,0,0.3)]"
          >
            SAVE CHANGES
          </button>
          
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="w-full py-4 bg-transparent hover:bg-white/5 text-gray-500 hover:text-white font-bold tracking-widest text-xs uppercase rounded-xl transition-colors border border-transparent hover:border-white/10"
          >
            DELETE ACCOUNT
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            <HeartCrack className="w-16 h-16 text-[#FF3B00] mb-8" strokeWidth={1.5} />
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">DELETE ACCOUNT?</h2>
            <p className="text-gray-400 text-sm mb-12 px-4">
              This will hide your profile, reset your <span className="text-[#00E5FF]">Fan Score</span>, and terminate all alerts. Your data will be cleared.
            </p>
            
            <button 
              onClick={() => setShowDeleteModal(false)}
              className="w-full py-4 mb-4 bg-[#FF3B00] hover:bg-[#FF3B00]/90 text-white font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,59,0,0.3)]"
            >
              KEEP MY PROFILE
            </button>
            <button 
              onClick={() => {
                // In a real app, hit the API to delete account
                console.log("Account deleted via frontend stub.");
                setShowDeleteModal(false);
              }}
              className="w-full py-4 text-gray-500 hover:text-white font-bold tracking-widest text-xs uppercase rounded-xl transition-colors"
            >
              DELETE MY ACCOUNT
            </button>
          </div>
        </div>
      )}

      {/* Confirm Change Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center shadow-2xl relative">
            <AlertTriangle className="w-12 h-12 text-[#FF3B00] mb-6" strokeWidth={1.5} />
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Are You Sure?</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Changing your primary club will reset your Eye Accuracy Score and all current player rating progress.
            </p>
            
            <button 
              onClick={() => {
                console.log("Changes confirmed.");
                setShowConfirmModal(false);
              }}
              className="w-full py-4 mb-4 bg-[#FF3B00] hover:bg-[#FF3B00]/90 text-white font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,59,0,0.3)]"
            >
              CONFIRM CHANGE
            </button>
            <button 
              onClick={() => setShowConfirmModal(false)}
              className="w-full py-2 text-white text-xs font-bold tracking-widest uppercase hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
