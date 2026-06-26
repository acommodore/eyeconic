import fs from 'fs';

let c = fs.readFileSync('src/app/(app)/discover/page.tsx', 'utf8');

// Replace imports
c = c.replace(/import \{ useState \} from 'react';/, `import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';`);

// Replace the component body start
c = c.replace(/export default function DiscoverPage\(\) \{/, `export default function DiscoverPage() {
  const supabase = createClient();
  const [liveMatches, setLiveMatches] = useState(allLiveMatches);
  const [upcomingMatches, setUpcomingMatches] = useState(upcomingTableData);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase.from('matches').select('*');
      if (!error && data) {
        const live = data.filter(m => m.status === 'live');
        const upcoming = data.filter(m => m.status === 'upcoming');
        if (live.length > 0) {
          // Map to match frontend schema
          const mappedLive = live.map(m => ({
            id: m.id,
            team1: m.team1,
            team2: m.team2,
            score: \`\${m.score1} - \${m.score2}\`,
            time: m.current_minute || "0'",
            logo1: m.logo1,
            logo2: m.logo2,
            league: m.league,
            pulseStatus: m.volatility > 90 ? "Volatile" : "Heating Up",
            pulseEmoji: m.mood?.includes('⚡') ? "⚡" : "🔥",
            pulseColor: "text-coral",
            insight: "Real-time insights arriving...",
            emotionalMvp: "Loading...",
            polarizingPlayer: "Loading...",
            fanMood: m.mood?.replace(/[^\w\s]/gi, '').trim() || "Tense",
            fanMoodEmoji: m.mood?.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/)?.[0] || "😬",
            metrics: { chaos: m.volatility, tactical: 80, rivalry: 90, surprise: 40 },
            bookmarked: true,
            agenda: "Live updates active",
            volatility: m.volatility,
            triggers: m.triggers || []
          }));
          setLiveMatches(mappedLive);
        }
        if (upcoming.length > 0) {
          setUpcomingMatches(upcoming);
        }
      }
    };
    
    fetchMatches();

    const channel = supabase.channel('realtime:matches')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'matches' }, (payload) => {
        setLiveMatches(prev => prev.map(m => {
          if (m.id === payload.new.id) {
            return {
              ...m,
              score: \`\${payload.new.score1} - \${payload.new.score2}\`,
              time: payload.new.current_minute || m.time,
              volatility: payload.new.volatility || m.volatility
            };
          }
          return m;
        }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);`);

// Replace allLiveMatches usage with liveMatches
c = c.replace(/const sortedLiveMatches = \[\.\.\.allLiveMatches\]/g, 'const sortedLiveMatches = [...liveMatches]');

// Replace upcomingTableData usage with upcomingMatches
c = c.replace(/upcomingTableData\.map/g, 'upcomingMatches.map');

fs.writeFileSync('src/app/(app)/discover/page.tsx', c);
