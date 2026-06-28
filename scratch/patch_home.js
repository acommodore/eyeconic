const fs = require('fs');

let content = fs.readFileSync('src/app/(app)/home/page.tsx', 'utf8');

// 1. Add getMatchCurations after imports
const curationsCode = `
import { Flame, Sparkles } from 'lucide-react';

// --- MOCK RANKING DATA ---
const getMatchCurations = (matchId: number, team1: string) => {
  if (team1 === 'Arsenal' || team1 === 'Man City' || team1 === 'Liverpool') {
    return {
      label: 'Unmissable',
      icon: <Flame className="w-4 h-4 text-orange-500" />,
      color: 'from-orange-500/20 to-red-500/20',
      textColor: 'text-orange-500',
      whyWatch: "Huge stakes, intense rivalry, and massive title implications.",
      metrics: { drama: 95, fanTemp: 98, volatility: 92, tactical: 85 }
    }
  } else if (team1 === 'Chelsea' || team1 === 'Man United' || team1 === 'Tottenham') {
    return {
      label: 'Chaos Guaranteed',
      icon: <Zap className="w-4 h-4 text-yellow-500" />,
      color: 'from-yellow-500/20 to-orange-500/20',
      textColor: 'text-yellow-500',
      whyWatch: "Two unpredictable teams known for high-scoring, chaotic games.",
      metrics: { drama: 90, fanTemp: 88, volatility: 95, tactical: 60 }
    }
  } else if (team1 === 'Juventus' || team1 === 'Inter Milan' || team1 === 'Inter') {
    return {
      label: 'Tactical Chess Match',
      icon: <Brain className="w-4 h-4 text-purple-500" />,
      color: 'from-purple-500/20 to-blue-500/20',
      textColor: 'text-purple-400',
      whyWatch: "A battle of elite defensive systems. Expect a tight, disciplined match.",
      metrics: { drama: 72, fanTemp: 80, volatility: 40, tactical: 96 }
    }
  } else {
    return {
      label: 'Sleeper Pick',
      icon: <Sparkles className="w-4 h-4 text-teal" />,
      color: 'from-teal/20 to-blue-500/20',
      textColor: 'text-teal',
      whyWatch: "Under-the-radar fixture featuring young talents and expansive attacking styles.",
      metrics: { drama: 65, fanTemp: 50, volatility: 85, tactical: 70 }
    }
  }
};

const MetricBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
  <div className="flex flex-col gap-1 w-full mb-2">
    <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
    <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
      <div className={\`h-full rounded-full \${colorClass}\`} style={{ width: \`\${value}%\` }} />
    </div>
  </div>
);
`;

content = content.replace("import { allLiveMatches, upcomingTableData, finishedTableData } from '@/lib/mockData';", `import { allLiveMatches, upcomingTableData, finishedTableData } from '@/lib/mockData';\n${curationsCode}`);

// 2. Replace the triggers in TerminalRow with the Curation Label
const triggersHTML = `{match.triggers?.map((t: string, i: number) => (
                    <span key={i} className="text-[9px] font-mono uppercase text-coral bg-coral/5 border border-coral/30 px-1.5 py-0.5 rounded tracking-widest">[{t.replace(/[\\[\\]]/g, '')}]</span>
                 ))}`;

const curatedLabelHTML = `
                 {(() => {
                    const curation = getMatchCurations(match.id, match.team1);
                    return (
                       <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 border border-white/10 rounded-full shadow-sm">
                          {curation.icon}
                          <span className={\`text-[9px] font-black uppercase tracking-widest \${curation.textColor}\`}>{curation.label}</span>
                       </div>
                    );
                 })()}
`;

content = content.replace(triggersHTML, curatedLabelHTML);

// 3. Add AI Pipeline Metrics to the Expanded view
const expandedViewRegex = /<div className="grid grid-cols-1 md:grid-cols-3 gap-6">/;
const expandedViewReplacement = `<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1">
                 {(() => {
                    const curation = getMatchCurations(match.id, match.team1);
                    return (
                      <>
                        <h4 className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
                           <Brain className="w-3 h-3 text-teal" /> AI Ranking Pipeline
                        </h4>
                        <div className="flex flex-col mb-3">
                           <MetricBar label="Chaos" value={curation.metrics.volatility} colorClass="bg-gradient-to-r from-yellow-500 to-orange-500" />
                           <MetricBar label="Tactical" value={curation.metrics.tactical} colorClass="bg-gradient-to-r from-purple-500 to-blue-500" />
                           <MetricBar label="Stakes" value={curation.metrics.drama} colorClass="bg-gradient-to-r from-red-500 to-orange-500" />
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed font-mono italic">
                           "{curation.whyWatch}"
                        </p>
                      </>
                    );
                 })()}
              </div>`;

content = content.replace(expandedViewRegex, expandedViewReplacement);

// 4. Update the ActiveFilters to use AI
content = content.replace(
`  const filters = [
    { name: "Chaos", icon: Zap },
    { name: "Tactical", icon: Brain },
    { name: "Rivalries", icon: Swords },
    { name: "Surprise Me", icon: Shuffle },
    { name: "Bookmarks", icon: Bookmark },
  ];`,
`  const filters = [
    { name: "Chaos & Goals", icon: Zap },
    { name: "Tactical Battles", icon: Brain },
    { name: "High Stakes", icon: Flame },
    { name: "Bookmarks", icon: Bookmark },
  ];`
);

content = content.replace(
`  // Sorting logic for Live Matches based on Active Filter
  const sortedLiveMatches = [...liveMatches]
    .filter(m => activeFilter === "Bookmarks" ? bookmarkedMatches.has(m.id) : true)
    .sort((a, b) => {
      if (activeFilter === "Bookmarks") return b.volatility - a.volatility;
      if (activeFilter === "Chaos") return b.metrics.chaos - a.metrics.chaos;
      if (activeFilter === "Tactical") return b.metrics.tactical - a.metrics.tactical;
      if (activeFilter === "Rivalries") return b.metrics.rivalry - a.metrics.rivalry;
      if (activeFilter === "Surprise Me") return b.metrics.surprise - a.metrics.surprise;
      return 0;
  });`,
`  // Sorting logic for Live Matches based on Active Filter
  const sortedLiveMatches = [...liveMatches]
    .filter(m => activeFilter === "Bookmarks" ? bookmarkedMatches.has(m.id) : true)
    .sort((a, b) => {
      const curationA = getMatchCurations(a.id, a.team1);
      const curationB = getMatchCurations(b.id, b.team1);
      
      if (activeFilter === "Bookmarks") return b.volatility - a.volatility;
      if (activeFilter === "Chaos & Goals") return curationB.metrics.volatility - curationA.metrics.volatility;
      if (activeFilter === "Tactical Battles") return curationB.metrics.tactical - curationA.metrics.tactical;
      if (activeFilter === "High Stakes") return curationB.metrics.drama - curationA.metrics.drama;
      return 0;
  });`
);

fs.writeFileSync('src/app/(app)/home/page.tsx', content);
