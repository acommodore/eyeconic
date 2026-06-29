const fs = require('fs');

let content = fs.readFileSync('src/components/match/LivePulseView.tsx', 'utf8');

const targetHandle = `           {/* Mobile Drawer Handle */}
           <div className={\`xl:hidden w-full flex flex-col items-center justify-center pt-2 pb-6 relative \${activeMobileView === 'feed' ? 'animate-bounce' : ''}\`} 
             onClick={(e) => {
               if (activeMobileView === 'pulse') {
                 e.stopPropagation();
                 setActiveMobileView('feed');
               }
             }}
           >
              <div className="w-12 h-1.5 bg-white/20 rounded-full mb-3" />
              {activeMobileView === 'feed' ? (
                <div className="flex items-center gap-2 text-teal text-sm font-black uppercase tracking-widest drop-shadow-[0_0_15px_rgba(0,229,255,0.8)] animate-pulse">
                   <ChevronUp className="w-5 h-5" /> Player Impact Live
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-foreground">
                   <ChevronDown className="w-4 h-4" /> Tap to Close
                </div>
              )}
           </div>`;

const replaceHandle = `           {/* Mobile Drawer Handle */}
           <div className={\`xl:hidden w-full flex flex-col pt-2 pb-6 relative \${activeMobileView === 'feed' ? 'animate-bounce' : ''}\`} 
             onClick={(e) => {
               if (activeMobileView === 'pulse') {
                 e.stopPropagation();
                 setActiveMobileView('feed');
               }
             }}
           >
              <div className="w-full flex justify-center mb-3">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>
              {activeMobileView === 'feed' ? (
                <div className="flex items-center gap-3 w-full justify-start pl-6">
                   <div className="w-1 h-6 bg-teal" />
                   <h2 className="text-sm font-black tracking-widest text-foreground uppercase flex items-center gap-2">
                     PLAYER IMPACT LIVE <ChevronUp className="w-5 h-5 text-teal animate-pulse" />
                   </h2>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full px-6">
                   <div className="flex items-center gap-3">
                     <div className="w-1 h-6 bg-teal" />
                     <h2 className="text-sm font-black tracking-widest text-foreground uppercase">PLAYER IMPACT LIVE</h2>
                   </div>
                   <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-foreground">
                      <ChevronDown className="w-4 h-4" /> Tap to Close
                   </div>
                </div>
              )}
           </div>`;

const targetHeading = `           {/* Player Impact - TACTICAL VIEW */}
           <section className="bg-card rounded-[2rem] border border-border p-6 shadow-xl relative overflow-visible">
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="w-1 h-6 bg-teal" />
                <h2 className="text-sm font-black tracking-widest text-foreground uppercase">PLAYER IMPACT LIVE</h2>
              </div>`;

const replaceHeading = `           {/* Player Impact - TACTICAL VIEW */}
           <section className="bg-card rounded-[2rem] border border-border p-6 shadow-xl relative overflow-visible">
              <div className="hidden xl:flex items-center gap-3 mb-2 relative z-10">
                <div className="w-1 h-6 bg-teal" />
                <h2 className="text-sm font-black tracking-widest text-foreground uppercase">PLAYER IMPACT LIVE</h2>
              </div>`;

content = content.replace(targetHandle, replaceHandle);
content = content.replace(targetHeading, replaceHeading);

fs.writeFileSync('src/components/match/LivePulseView.tsx', content);
