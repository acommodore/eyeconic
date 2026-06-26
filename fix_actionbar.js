const fs = require('fs');

const raw = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

// I will split by "    {/* Chat Input Form */}" and keep only the first occurrence, and then clean it up.
// Actually, it's safer to just do a regex replace of the entire Action Bar block.

const newActionBar = `        {/* Action Bar */}
        <div className="p-2 md:p-4 border-t border-border bg-card text-card-foreground/80 backdrop-blur-xl space-y-2 md:space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] relative z-30">
          
          {/* Reaction Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => spawnEmoji('🤡')}
              className="flex-1 flex flex-col items-center justify-center gap-0 md:gap-1 bg-card text-card-foreground/5 dark:bg-white/5 border border-border rounded-xl py-1 md:py-3 hover:bg-card text-card-foreground/10 dark:bg-white/10 hover:border-white/20 hover:-translate-y-1 active:scale-95 transition-all shadow-lg"
            >
              <span className="text-xl md:text-2xl drop-shadow-md">🤡</span>
              <span className="text-[8px] md:text-[9px] font-black text-muted-foreground tracking-widest uppercase">Waffling</span>
            </button>
            <button 
              onClick={() => spawnEmoji('🍳')}
              className="flex-1 flex flex-col items-center justify-center gap-0 md:gap-1 bg-card text-card-foreground/5 dark:bg-white/5 border border-border rounded-xl py-1 md:py-3 hover:bg-card text-card-foreground/10 dark:bg-white/10 hover:border-white/20 hover:-translate-y-1 active:scale-95 transition-all shadow-lg"
            >
              <span className="text-xl md:text-2xl drop-shadow-md">🍳</span>
              <span className="text-[8px] md:text-[9px] font-black text-muted-foreground tracking-widest uppercase">Cooking</span>
            </button>
            <button 
              onClick={async () => {
                if (localParticipant) {
                  const isMuted = localParticipant.isMicrophoneEnabled === false;
                  await localParticipant.setMicrophoneEnabled(isMuted);
                  setIsMicPending(false);
                }
              }}
              disabled={isMicPending}
              className={\`flex-[2] flex flex-col items-center justify-center gap-0 md:gap-1 rounded-xl py-1 md:py-3 hover:scale-[1.02] active:scale-95 transition-all font-black cursor-pointer \${
                isMicPending 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-muted-foreground border border-border shadow-inner' 
                  : 'bg-gradient-to-br from-[coral] to-[coral] text-black shadow-[0_0_20px_rgba(255,127,80,0.4)] hover:shadow-[0_0_30px_rgba(255,127,80,0.6)] border border-[coral]/50'
              }\`}
            >
              {isMicPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Hand className="w-5 h-5 fill-black drop-shadow-sm" />}
              <span className="text-[10px] tracking-widest uppercase">{(localParticipant?.isMicrophoneEnabled) ? 'Mute Mic' : 'Unmute Mic'}</span>
            </button>
          </div>

          {/* Chat Input Form */}
          <form 
            onSubmit={handleSendMessage}
            className="bg-[#0A0A0A] rounded-full p-1 border border-border flex items-center focus-within:border-[teal] focus-within:shadow-[0_0_20px_rgba(0,229,255,0.15)] focus-within:bg-[#111] transition-all shadow-inner relative z-20 group"
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 ml-1 overflow-hidden border border-border shrink-0 group-focus-within:border-[teal]/50 transition-colors">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="User" />
            </div>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Join the conversation..." 
              className="bg-transparent border-none outline-none text-[16px] md:text-sm w-full px-4 text-foreground placeholder:text-gray-600 font-medium"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className={\`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl transition-all mr-0.5 border \${
                inputText.trim() 
                  ? 'bg-[teal] hover:bg-[teal]/90 border-[teal] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:scale-105' 
                  : 'bg-card text-card-foreground/5 dark:bg-white/5 border-border text-muted-foreground/80'
              }\`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

export default function ActiveStandPage({ params }: { params: { id: string } }) {
  return (
    <LiveAudioRoom roomName={params.id} username={\`User_\${Math.floor(Math.random() * 1000)}\`}>
      <StandRoomLayout matchId={params.id} />
    </LiveAudioRoom>
  );
}`;

const parts = raw.split('{/* Action Bar */}');
fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', parts[0] + newActionBar);
