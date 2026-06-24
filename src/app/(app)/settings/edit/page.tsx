"use client";

import Link from "next/link";
import { Camera, HeartCrack, AlertTriangle, Search, Plus } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/ui/BackButton";

export default function EditProfilePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Form states
  const [name, setName] = useState("MARCUS VANCE");
  const [email, setEmail] = useState("m.vance@fan-hq.io");
  
  // Allegiance states
  const availableClubs = [
    { id: "madrid", name: "Real Madrid CF", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
    { id: "united", name: "Manchester United", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
    { id: "barca", name: "FC Barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
  ];

  const [favoriteClub, setFavoriteClub] = useState(availableClubs[0]);
  const [rivalClub, setRivalClub] = useState(availableClubs[2]);

  const handleSave = () => {
    if (favoriteClub.id !== availableClubs[0].id || rivalClub.id !== availableClubs[2].id) {
      setShowConfirmModal(true);
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 min-h-screen text-white relative pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-12 relative z-10">
        <BackButton containerClassName="p-2 hover:bg-white/10 rounded-full transition-colors group bg-white/5 border border-white/10" iconClassName="w-5 h-5 text-[#00E5FF] group-hover:-translate-x-1 transition-transform" />
        <h1 className="text-3xl md:text-4xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">Edit Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Avatar & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)]" />
              <div className="absolute inset-2 bg-gray-800 rounded-full overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#00E5FF] rounded-full border-2 border-[#050505] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg">
                <Camera className="w-4 h-4 text-black" />
              </button>
            </div>
            <h2 className="text-lg font-black tracking-widest uppercase mb-1">{name}</h2>
            <p className="text-sm text-gray-500 font-medium">{email}</p>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Personal Details Card */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 md:p-8 shadow-lg space-y-6">
            <h3 className="text-sm font-bold tracking-widest uppercase text-[#00E5FF] mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#00E5FF] rounded-full" />
              Personal Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-1">FULL NAME</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-4 text-sm font-medium text-white focus:outline-none focus:border-[#00E5FF] transition-colors shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-1">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  value={email}
                  disabled
                  className="w-full bg-[#121212]/50 border border-white/5 rounded-xl px-4 py-4 text-sm font-medium text-gray-500 cursor-not-allowed shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Allegiances Card */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 md:p-8 shadow-lg space-y-6">
             <h3 className="text-sm font-bold tracking-widest uppercase text-[#FF7F50] mb-6 flex items-center gap-3">
               <span className="w-8 h-1 bg-[#FF7F50] rounded-full" />
               Allegiances
             </h3>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Favorite Club */}
                <div className="space-y-3">
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-1">FAVORITE CLUB</label>
                  <div className="flex gap-3">
                     {availableClubs.map(club => (
                       <button
                         key={`fav-${club.id}`}
                         onClick={() => setFavoriteClub(club)}
                         className={`w-16 h-16 rounded-xl bg-[#121212] flex items-center justify-center p-2 transition-all cursor-pointer hover:-translate-y-1 ${
                           favoriteClub.id === club.id 
                             ? 'border-2 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)] opacity-100' 
                             : 'border border-white/10 opacity-50 hover:opacity-100'
                         }`}
                       >
                         <img src={club.logo} className="w-full h-full object-contain" alt={club.name} />
                       </button>
                     ))}
                     <button className="w-16 h-16 rounded-xl bg-[#121212] border border-white/10 border-dashed flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer hover:-translate-y-1">
                       <Plus className="w-6 h-6 text-gray-500" />
                     </button>
                  </div>
                </div>

                {/* Rival Club */}
                <div className="space-y-3">
                  <label className="text-[10px] text-gray-500 font-bold tracking-widest uppercase pl-1">RIVAL CLUB</label>
                  <div className="flex gap-3">
                     {availableClubs.map(club => (
                       <button
                         key={`rival-${club.id}`}
                         onClick={() => setRivalClub(club)}
                         className={`w-16 h-16 rounded-xl bg-[#121212] flex items-center justify-center p-2 transition-all cursor-pointer hover:-translate-y-1 ${
                           rivalClub.id === club.id 
                             ? 'border-2 border-[#FF3B00] shadow-[0_0_15px_rgba(255,59,0,0.2)] opacity-100' 
                             : 'border border-white/10 opacity-50 hover:opacity-100'
                         }`}
                       >
                         <img src={club.logo} className="w-full h-full object-contain" alt={club.name} />
                       </button>
                     ))}
                     <button className="w-16 h-16 rounded-xl bg-[#121212] border border-white/10 border-dashed flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer hover:-translate-y-1">
                       <Search className="w-6 h-6 text-gray-500" />
                     </button>
                  </div>
                </div>
             </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="py-4 px-6 text-gray-500 hover:text-[#FF3B00] font-bold tracking-widest text-xs uppercase rounded-xl transition-colors w-full sm:w-auto text-center order-2 sm:order-1"
            >
              DELETE ACCOUNT
            </button>

            <button 
              onClick={handleSave}
              className="w-full sm:w-auto py-4 px-12 bg-white hover:bg-gray-200 text-[#020202] font-black tracking-[0.2em] uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] order-1 sm:order-2"
            >
              SAVE CHANGES
            </button>
          </div>

        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            <HeartCrack className="w-16 h-16 text-[#FF3B00] mb-8" strokeWidth={1.5} />
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">DELETE ACCOUNT?</h2>
            <p className="text-gray-400 text-sm mb-12 px-4 leading-relaxed">
              This will hide your profile, reset your <span className="text-[#00E5FF]">Fan Score</span>, and terminate all alerts. Your data will be cleared.
            </p>
            
            <button 
              onClick={() => setShowDeleteModal(false)}
              className="w-full py-4 mb-4 bg-white text-[#050505] font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              KEEP MY PROFILE
            </button>
            <button 
              onClick={() => {
                console.log("Account deleted via frontend stub.");
                setShowDeleteModal(false);
              }}
              className="w-full py-4 text-gray-500 hover:text-[#FF3B00] font-bold tracking-widest text-xs uppercase rounded-xl transition-colors"
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
              className="w-full py-4 mb-4 bg-white text-[#050505] font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
            >
              CONFIRM CHANGE
            </button>
            <button 
              onClick={() => setShowConfirmModal(false)}
              className="w-full py-2 text-gray-500 text-xs font-bold tracking-widest uppercase hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
