const fs = require('fs');

let c = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

c = c.replace(/className="w-full min-h-screen bg-\[#0A0A0A\]/g, 'className="w-full h-[100dvh] bg-[#0A0A0A]');

c = c.replace('import { useState } from "react";', `import { useState, useEffect } from "react";\nimport { useParticipants, useLocalParticipant } from "@livekit/components-react";\nimport { createClient } from "@/lib/supabase/client";\nimport { useParams } from "next/navigation";`);

c = c.replace('import { BackButton } from "@/components/ui/BackButton";', `import { BackButton } from "@/components/ui/BackButton";\nimport LiveAudioRoom from "@/components/stands/LiveAudioRoom";`);

c = c.replace('export default function ActiveStandPage() {', `function StandRoomLayout({ matchId }: { matchId: string }) {
  const supabase = createClient();
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();

  useEffect(() => {
    const fetchMsgs = async () => {
      const { data } = await supabase.from('stand_messages').select('*, profiles(*)').eq('stand_id', matchId).order('created_at', { ascending: true });
      if (data) {
        setChatMessages(data.map((m: any) => ({
          id: m.id,
          name: m.profiles.username,
          color: "text-[teal]",
          avatar: m.profiles.avatar_url,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: m.message,
          isSpeaker: false
        })));
      }
    };
    fetchMsgs();

    const channel = supabase.channel('stand_chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stand_messages', filter: \`stand_id=eq.\${matchId}\` }, async (payload) => {
        const { data: prof } = await supabase.from('profiles').select('*').eq('id', payload.new.profile_id).single();
        if (prof) {
          setChatMessages(prev => [...prev, {
            id: payload.new.id,
            name: prof.username,
            color: "text-[teal]",
            avatar: prof.avatar_url,
            time: new Date(payload.new.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: payload.new.message,
            isSpeaker: false
          }]);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [matchId, supabase]);
`);

const oldSendMessage = `const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      name: "You",
      color: "text-white",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus",
      time: "Just now",
      text: inputText.trim(),
      isSpeaker: true
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setInputText("");
  };`;

const newSendMessage = `const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please login to chat");
      return;
    }

    await supabase.from('stand_messages').insert({
      stand_id: matchId,
      profile_id: user.id,
      message: inputText.trim()
    });
    
    setInputText("");
  };`;
c = c.replace(oldSendMessage, newSendMessage);

const actionOld = `onClick={() => setIsMicPending(true)}
              disabled={isMicPending}
              className={\`flex-[2] flex flex-col items-center justify-center gap-0 md:gap-1 rounded-xl py-1 md:py-3 hover:scale-[1.02] active:scale-95 transition-all font-black cursor-pointer \${
                isMicPending`;
const actionNew = `onClick={async () => {
                if (localParticipant) {
                  const isMuted = localParticipant.isMicrophoneEnabled === false;
                  await localParticipant.setMicrophoneEnabled(isMuted);
                  setIsMicPending(false);
                }
              }}
              disabled={isMicPending}
              className={\`flex-[2] flex flex-col items-center justify-center gap-0 md:gap-1 rounded-xl py-1 md:py-3 hover:scale-[1.02] active:scale-95 transition-all font-black cursor-pointer \${
                isMicPending`;
c = c.replace(actionOld, actionNew);

const pendingOld = `{isMicPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Hand className="w-5 h-5 fill-black drop-shadow-sm" />}
              <span className="text-[10px] tracking-widest uppercase">{isMicPending ? 'Pending' : 'Request Mic'}</span>`;
const pendingNew = `{isMicPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Hand className="w-5 h-5 fill-black drop-shadow-sm" />}
              <span className="text-[10px] tracking-widest uppercase">{(localParticipant?.isMicrophoneEnabled) ? 'Mute Mic' : 'Unmute Mic'}</span>`;
c = c.replace(pendingOld, pendingNew);

// And we append the new export default ActiveStandPage
c += `\n
export default function ActiveStandPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || "default";

  return (
    <LiveAudioRoom roomName={id} username={\`User_\${Math.floor(Math.random() * 1000)}\`}>
      <StandRoomLayout matchId={id} />
    </LiveAudioRoom>
  );
}\n`;

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', c);
