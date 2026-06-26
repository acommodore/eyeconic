import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('🌱 Starting Supabase Seeding...');

  // 1. Create Profile
  const { data: profile, error: profileError } = await supabase.from('profiles').insert([
    { username: 'Gooner4Life', vibe_score: 98 }
  ]).select().single();

  if (profileError) {
    console.error('Error creating profile:', profileError);
    return;
  }
  console.log('✅ Profile created');

  // 2. Create Matches
  const matches = [
    {
      team1: 'Arsenal',
      team2: 'Man City',
      logo1: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      logo2: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
      match_time: '12:30',
      league: 'Premier League',
      mood: 'Electric ⚡',
      volatility: 95,
      is_hyped: true,
      triggers: ['[TITLE DECIDER]', '[RIVALRY]'],
      status: 'live',
      score1: 2,
      score2: 1,
      current_minute: '78\''
    },
    {
      team1: 'Barcelona',
      team2: 'Real Madrid',
      logo1: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
      logo2: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
      match_time: '16:30',
      league: 'La Liga',
      mood: 'High Tension ⚡',
      volatility: 91,
      is_hyped: true,
      triggers: ['[EL CLASICO]'],
      status: 'upcoming'
    }
  ];

  const { data: insertedMatches, error: matchError } = await supabase.from('matches').insert(matches).select();
  if (matchError) {
    console.error('Error creating matches:', matchError);
    return;
  }
  console.log('✅ Matches created');

  const liveMatch = insertedMatches.find(m => m.status === 'live');

  // 3. Match Events
  const events = [
    { match_id: liveMatch.id, player_name: 'Saka', team: 'Arsenal', event_type: 'goal', message: 'Incredible solo run and finish!', sentiment: 'positive', minute: '12\'' },
    { match_id: liveMatch.id, player_name: 'Rodri', team: 'Man City', event_type: 'card', message: 'Harsh yellow for a late tackle.', sentiment: 'negative', minute: '34\'' },
    { match_id: liveMatch.id, player_name: 'De Bruyne', team: 'Man City', event_type: 'goal', message: 'Rocket from 25 yards out.', sentiment: 'positive', minute: '45+2\'' },
    { match_id: liveMatch.id, player_name: 'Martinelli', team: 'Arsenal', event_type: 'goal', message: 'Tap in at the back post!', sentiment: 'positive', minute: '78\'' }
  ];

  const { error: eventError } = await supabase.from('match_events').insert(events);
  if (eventError) {
    console.error('Error creating events:', eventError);
    return;
  }
  console.log('✅ Match events created');

  // 4. Hot Takes
  const takes = [
    {
      match_id: liveMatch.id,
      question: 'Was the VAR decision fair?',
      options: [
        { text: 'Correct decision', votes: 124 },
        { text: 'Robbery!', votes: 890 },
        { text: 'Too close to call', votes: 45 }
      ]
    },
    {
      match_id: liveMatch.id,
      question: 'Who will score next?',
      options: [
        { text: 'Haaland', votes: 550 },
        { text: 'Odegaard', votes: 430 },
        { text: 'No more goals', votes: 120 }
      ]
    }
  ];

  const { error: takeError } = await supabase.from('hot_takes').insert(takes);
  if (takeError) {
    console.error('Error creating hot takes:', takeError);
    return;
  }
  console.log('✅ Hot Takes created');

  // 5. Stand
  const { error: standError } = await supabase.from('stands').insert([
    {
      match_id: liveMatch.id,
      title: 'Arsenal vs Man City: Title Decider Post-Match',
      host_id: profile.id,
      listener_count: 12400,
      livekit_room: 'stand-arsenal-mancity'
    }
  ]);
  if (standError) {
    console.error('Error creating stand:', standError);
    return;
  }
  console.log('✅ Stand created');

  console.log('🎉 Seeding complete!');
}

seed();
