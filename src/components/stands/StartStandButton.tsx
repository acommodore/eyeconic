"use client";

import { useState, useEffect } from "react";
import { Mic, Lock, CheckCircle2, Loader2, Play } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function StartStandButton({ matchId }: { matchId: string }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [applying, setApplying] = useState(false);
  const [roomTitle, setRoomTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(data);
      setLoading(false);
    }
    loadProfile();
  }, [supabase]);

  const handleAction = () => {
    if (!profile) {
      router.push('/login');
      return;
    }
    setShowModal(true);
  };

  const handleApplyPressPass = async () => {
    setApplying(true);
    // Fake application flow that instantly approves them
    setTimeout(async () => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ has_press_pass: true, level: Math.max(5, profile.level || 1) })
        .eq('id', profile.id)
        .select()
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
      setApplying(false);
    }, 1500);
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomTitle.trim() || !profile) return;
    setCreating(true);

    const roomName = `room_\${Math.random().toString(36).substring(7)}`;

    const { data, error } = await supabase
      .from('stands')
      .insert({
        match_id: matchId,
        title: roomTitle,
        host_id: profile.id,
        livekit_room: roomName,
      })
      .select()
      .single();

    if (!error && data) {
      router.push(`/stands/\${roomName}?dbId=\${data.id}`);
    } else {
      setCreating(false);
      alert('Failed to create room');
    }
  };

  if (loading) return null;

  return (
    <>
      <button 
        onClick={handleAction}
        className="flex items-center gap-2 bg-[teal] hover:bg-[teal]/90 text-black px-4 py-2 md:px-6 md:py-3 rounded-full font-black tracking-tight transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:scale-105 active:scale-95"
      >
        <Mic className="w-4 h-4 md:w-5 md:h-5" />
        <span className="text-sm md:text-base">Start a Stand</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] border border-border rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white"
            >
              ✕
            </button>

            {!profile?.has_press_pass ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-black italic text-foreground">LOCKED</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  You need a <strong className="text-white">Press Pass</strong> (Level 5+) to host your own Stand. 
                  Apply now to unlock broadcasting capabilities and invite fans to your stage.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={handleApplyPressPass}
                    disabled={applying}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {applying ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                    {applying ? "Reviewing Application..." : "Apply for Press Pass"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateRoom} className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[teal]/20 border border-[teal]/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                    <Mic className="w-8 h-8 text-[teal]" />
                  </div>
                  <h2 className="text-2xl font-black italic text-foreground">HOST A STAND</h2>
                  <p className="text-muted-foreground text-sm">You have Press Pass clearance.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Stand Title</label>
                  <input
                    type="text"
                    required
                    value={roomTitle}
                    onChange={e => setRoomTitle(e.target.value)}
                    placeholder="e.g. Tactical Breakdown: Arteta's Masterclass"
                    className="w-full px-4 py-3 bg-card text-card-foreground/5 dark:bg-white/5 border border-border rounded-xl focus:outline-none focus:border-[teal] focus:ring-1 focus:ring-[teal] text-foreground font-medium"
                    maxLength={60}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={creating || !roomTitle.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-[teal] hover:bg-[teal]/90 text-black py-3 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50"
                >
                  {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-black" />}
                  {creating ? "Going Live..." : "Go Live Now"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
