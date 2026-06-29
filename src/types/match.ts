export interface TimelineEvent {
  id: number;
  time: string;
  team: string;
  type: string;
  player: string;
  detail: string;
}

export interface HotTake {
  state: 'debunked' | 'verified' | 'pending' | string;
  text: string;
  sub: string;
}

export interface MatchMetrics {
  chaos: number;
  tactical: number;
  rivalry: number;
  surprise: number;
}

export interface Match {
  id: number;
  team1: string;
  team2: string;
  score?: string;
  time: string;
  logo1: string;
  logo2: string;
  league: string;
  
  // Custom "Eyeconic" Emotional Data
  pulseStatus?: string;
  pulseEmoji?: string;
  pulseColor?: string;
  insight?: string;
  emotionalMvp?: string;
  polarizingPlayer?: string;
  fanMood?: string;
  fanMoodEmoji?: string;
  metrics?: MatchMetrics;
  bookmarked?: boolean;
  agenda?: string;
  volatility?: number;
  triggers?: string[];
  timelineEvents?: TimelineEvent[];
  hotTakes?: HotTake[];
  status?: string;
}
