const fs = require('fs');

let c = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

// 1. Add new imports
c = c.replace(/import LiveAudioRoom from "@\/components\/stands\/LiveAudioRoom";/, 
`import LiveAudioRoom from "@/components/stands/LiveAudioRoom";
import { useParticipants, useLocalParticipant } from "@livekit/components-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";`);

// 2. Rename the main component to StandRoomLayout and remove the export default
c = c.replace(/export default function ActiveStandPage\(\{[^}]+\}\) \{/, 
`function StandRoomLayout({ matchId }: { matchId: string }) {
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

// 4. Update the Request Mic button to actually toggle mic
const micOld = `onClick={() => setIsMicPending(true)}`;
const micNew = `onClick={async () => {
                if (localParticipant) {
                  const isMuted = localParticipant.isMicrophoneEnabled === false;
                  await localParticipant.setMicrophoneEnabled(isMuted);
                  setIsMicPending(false);
                }
              }}`;
c = c.replace(micOld, micNew);

// Update Request Mic Text
const pendingOld = `{isMicPending ? 'Pending' : 'Request Mic'}`;
const pendingNew = `{(localParticipant?.isMicrophoneEnabled) ? 'Mute Mic' : 'Unmute Mic'}`;
c = c.replace(pendingOld, pendingNew);

// 5. Replace the LiveAudioRoom wrapper in StandRoomLayout's return
c = c.replace(/<LiveAudioRoom roomName=\{params\.id\} username=\{`User_\$\{Math\.floor\(Math\.random\(\) \* 1000\)\}`\}>\s*/, '');
c = c.replace(/    <\/LiveAudioRoom>\n/, '');

// 6. Export ActiveStandPage at the bottom
c += `\n
export default function ActiveStandPage({ params }: { params: { id: string } }) {
  return (
    <LiveAudioRoom roomName={params.id} username={\`User_\${Math.floor(Math.random() * 1000)}\`}>
      <StandRoomLayout matchId={params.id} />
    </LiveAudioRoom>
  );
}\n`;

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', c);
