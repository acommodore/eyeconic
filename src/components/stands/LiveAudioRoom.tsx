"use client";

import { useEffect, useState } from 'react';
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { Activity } from 'lucide-react';

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
          <div className="animate-pulse flex flex-col items-center"><Activity className="w-8 h-8 text-[coral] mb-4 animate-bounce" /><p className="text-white font-mono uppercase tracking-widest text-xs">Loading Stand...</p></div>
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

