import { Match } from '@/types/match';
import { allLiveMatches, upcomingTableData, finishedTableData } from '@/lib/mockData';

/**
 * MatchService is an adapter layer that handles fetching match data.
 * Currently it returns mock data asynchronously to prepare the UI for real API integration.
 * In the future, this will fetch from a real API (e.g. API-Football) and augment it with OpenAI.
 */
export const matchService = {
  getLiveMatches: async (): Promise<Match[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return allLiveMatches as Match[];
  },

  getMatchById: async (id: number): Promise<Match | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const match = allLiveMatches.find(m => m.id === id);
    return match as Match | undefined;
  },

  getUpcomingMatches: async (): Promise<Match[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return upcomingTableData as Match[];
  },

  getFinishedMatches: async (): Promise<Match[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return finishedTableData as Match[];
  }
};
