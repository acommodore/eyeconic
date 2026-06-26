const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Clearing existing matches...');
  await supabase.from('matches').delete().neq('id', 0);

  const mockMatches = [
    {
      team1_name: "Liverpool",
      team2_name: "Man City",
      score: "1 - 2",
      match_time: "74'",
      team1_logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      team2_logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      league: "Premier League",
      pulse_status: "Volatile",
      pulse_emoji: "⚡",
      pulse_color: "text-coral",
      insight: "Liverpool fans have grown frustrated with the midfield after repeated turnovers.",
      emotional_mvp: "De Bruyne",
      polarizing_player: "Mac Allister",
      fan_mood: "Anxious",
      fan_mood_emoji: "😬",
      chaos_metric: 95,
      tactical_metric: 80,
      rivalry_metric: 90,
      surprise_metric: 40,
      agenda: "Midfield Capitulation / Tension Spiking",
      volatility: 95,
      status: "live"
    },
    {
      team1_name: "Real Madrid",
      team2_name: "Barcelona",
      score: "2 - 2",
      match_time: "82'",
      team1_logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
      team2_logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
      league: "La Liga",
      pulse_status: "Heating Up",
      pulse_emoji: "🔥",
      pulse_color: "text-coral",
      insight: "Fans are split on Vinicius despite his assist.",
      emotional_mvp: "Bellingham",
      polarizing_player: "Vinicius Jr",
      fan_mood: "Electric",
      fan_mood_emoji: "🤩",
      chaos_metric: 85,
      tactical_metric: 85,
      rivalry_metric: 99,
      surprise_metric: 30,
      agenda: "Vinicius Backlash / Boiling Point",
      volatility: 88,
      status: "live"
    }
  ];

  console.log('Inserting matches...');
  for (const match of mockMatches) {
    const { data: insertedMatch, error } = await supabase
      .from('matches')
      .insert(match)
      .select()
      .single();

    if (error) {
      console.error('Error inserting match:', error);
      continue;
    }

    console.log(`Inserted match: ${insertedMatch.team1_name} vs ${insertedMatch.team2_name}`);

    // Insert mock events for this match
    const events = [
      {
        match_id: insertedMatch.id,
        event_type: 'GOAL',
        event_time: '15\'',
        description: 'Incredible strike from outside the box!',
        impact_score: 20
      },
      {
        match_id: insertedMatch.id,
        event_type: 'VAR_CHECK',
        event_time: '42\'',
        description: 'Possible penalty check for handball.',
        impact_score: 50
      },
      {
        match_id: insertedMatch.id,
        event_type: 'RED_CARD',
        event_time: '68\'',
        description: 'Straight red for a dangerous tackle!',
        impact_score: 80
      }
    ];

    const { error: eventError } = await supabase
      .from('match_events')
      .insert(events);

    if (eventError) {
      console.error('Error inserting events:', eventError);
    } else {
      console.log(`Inserted ${events.length} events for match ${insertedMatch.id}`);
    }
  }

  console.log('Database seeded successfully!');
}

seed();
