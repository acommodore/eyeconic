-- Eyeconic Database Schema (Supabase / PostgreSQL)

-- 1. Users Table (Extends Supabase Auth)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    reputation_score INT DEFAULT 0,
    favorite_club TEXT,
    rival_club TEXT,
    prediction_accuracy FLOAT DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles." ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.users FOR UPDATE USING (auth.uid() = id);

-- 2. Matches Table
CREATE TYPE match_status AS ENUM ('scheduled', 'live', 'finished');

CREATE TABLE public.matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    league TEXT NOT NULL,
    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    status match_status DEFAULT 'scheduled',
    kickoff_time TIMESTAMP WITH TIME ZONE,
    current_minute INT,
    vibe_score INT DEFAULT 50, -- 0 to 100
    chaos_percent INT DEFAULT 0,
    tactical_percent INT DEFAULT 0,
    tension_percent INT DEFAULT 0,
    active_listeners INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view matches." ON public.matches FOR SELECT USING (true);

-- 3. Fan Reactions Table
CREATE TYPE reaction_type AS ENUM ('chaos', 'tactical', 'tension', 'fire', 'mindblown', 'angry');

CREATE TABLE public.reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    reaction reaction_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view reactions." ON public.reactions FOR SELECT USING (true);
CREATE POLICY "Users can insert own reactions." ON public.reactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Predictions Table
CREATE TYPE prediction_status AS ENUM ('pending', 'correct', 'incorrect');

CREATE TABLE public.predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
    prediction_text TEXT NOT NULL,
    xp_reward INT DEFAULT 50,
    status prediction_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view predictions." ON public.predictions FOR SELECT USING (true);
CREATE POLICY "Users can insert own predictions." ON public.predictions FOR INSERT WITH CHECK (auth.uid() = user_id);
