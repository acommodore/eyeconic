const fs = require('fs');

let c = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

c = c.replace(/className="w-full min-h-screen bg-\[#0A0A0A\]/g, 'className="w-full h-[100dvh] bg-[#0A0A0A]');

// Add imports
if (!c.includes('useParticipants')) {
  c = c.replace('import { useState } from "react";', `import { useState, useEffect } from "react";\nimport { useParticipants, useLocalParticipant } from "@livekit/components-react";\nimport { createClient } from "@/lib/supabase/client";`);
}

// Ensure LiveAudioRoom is imported
if (!c.includes('import LiveAudioRoom')) {
  c = c.replace('import { BackButton } from "@/components/ui/BackButton";', `import { BackButton } from "@/components/ui/BackButton";\nimport LiveAudioRoom from "@/components/stands/LiveAudioRoom";`);
}

// Rename the component correctly
c = c.replace(/export default function ActiveStandPage\(\{ params \}: \{ params: \{ id: string \} \}\) \{/g, `function StandRoomLayout({ matchId }: { matchId: string }) {
  const supabase = createClient();
  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();
  // Fetch real chat messages
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
        // Fetch the profile for the new message
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

// 3. Update handleSendMessage to insert into DB
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

// Update Request Mic Text
const pendingOld = `{isMicPending ? 'Pending' : 'Request Mic'}`;
const pendingNew = `{(localParticipant?.isMicrophoneEnabled) ? 'Mute Mic' : 'Unmute Mic'}`;
c = c.replace(pendingOld, pendingNew);

// Remove existing LiveAudioRoom wrapper from the return inside StandRoomLayout
c = c.replace(/<LiveAudioRoom roomName=\{params\.id\} username=\{`User_\$\{Math\.floor\(Math\.random\(\) \* 1000\)\}`\}>\s*/g, '');
c = c.replace(/    <\/LiveAudioRoom>\n/g, '');

if (!c.includes('export default function ActiveStandPage')) {
  c += `\n
export default function ActiveStandPage({ params }: { params: { id: string } }) {
  return (
    <LiveAudioRoom roomName={params.id} username={\`User_\${Math.floor(Math.random() * 1000)}\`}>
      <StandRoomLayout matchId={params.id} />
    </LiveAudioRoom>
  );
}\n`;
}

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', c);
