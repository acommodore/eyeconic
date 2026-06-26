import fs from 'fs';

let c = fs.readFileSync('src/app/(app)/match/[id]/page.tsx', 'utf8');

if (!c.includes("import { createClient }")) {
  c = c.replace(/import \{ useState \} from "react";/, `import { useState, useEffect } from "react";\nimport { createClient } from "@/lib/supabase/client";`);
}

const componentStartRegex = /export default function MatchDetailsPage\(\) \{/;
if (componentStartRegex.test(c)) {
  c = c.replace(componentStartRegex, `export default function MatchDetailsPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const [matchData, setMatchData] = useState<any>(null);
  const [pulseEvents, setPulseEvents] = useState<any[]>([]);`);

  // Add the useEffect after the first few state declarations
  const stateRegex = /const \[selectedPlayer, setSelectedPlayer\] = useState<string \| null>\(null\);/;
  c = c.replace(stateRegex, `const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch live match
      const { data: match } = await supabase.from('matches').select('*').eq('status', 'live').single();
      if (match) {
        setMatchData(match);
        
        // Fetch hot takes
        const { data: hotTakes } = await supabase.from('hot_takes').select('*').eq('match_id', match.id);
        if (hotTakes && hotTakes.length > 0) {
          setTakes(hotTakes.map(ht => ({
            id: ht.id,
            question: ht.question,
            options: ht.options,
            votes: "Real-time"
          })));
        }

        // Fetch events
        const { data: events } = await supabase.from('match_events').select('*').eq('match_id', match.id);
        if (events) {
          setPulseEvents(events);
        }
      }
    };
    fetchData();

    // Subscribe to hot takes
    const channel = supabase.channel('match_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hot_takes' }, (payload) => {
        fetchData(); // Refresh all for simplicity
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'match_events' }, (payload) => {
        fetchData();
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'matches' }, (payload) => {
        setMatchData(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);`);

  // Replace hardcoded scores with dynamic data if it exists
  c = c.replace(/<div className="text-4xl md:text-6xl font-black text-white tracking-widest bg-black\/50 px-4 md:px-8 py-2 md:py-4 rounded-2xl border border-white\/10 shadow-inner">/, 
    `<div className="text-4xl md:text-6xl font-black text-white tracking-widest bg-black/50 px-4 md:px-8 py-2 md:py-4 rounded-2xl border border-white/10 shadow-inner">
                  {matchData ? \`\${matchData.score1} - \${matchData.score2}\` : `);
  
  // We need to close the JSX bracket properly
  c = c.replace(/1 - 2\n                <\/div>/, `1 - 2}\n                </div>`);
}

fs.writeFileSync('src/app/(app)/match/[id]/page.tsx', c);
