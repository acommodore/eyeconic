"use client";

import { useEffect, useState } from 'react';
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';

export default function LiveAudioRoom({ 
  roomName, 
  username, 
  children 
}: { 
  roomName: string;
  username: string;
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${roomName}&username=${username}`);
        if (!resp.ok) {
          throw new Error('Failed to fetch token');
        }
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error('Error fetching LiveKit token:', e);
      }
    };
    
    fetchToken();
  }, [roomName, username]);

  if (!token) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-4 border-[#75fbd9] border-t-transparent animate-spin" />
          <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">Connecting to Stand...</p>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect={true}
      audio={false}
      video={false}
      className="w-full h-full flex flex-col flex-1 min-h-0"
    >
      <RoomAudioRenderer />
      {children}
    </LiveKitRoom>
  );
}
