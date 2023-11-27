export const spreadsheetAPI = "https://sheet.best/api/sheets/5d3a32e4-f58b-43a5-8c6c-d052e4e7c272";
export const leaderboardAPI = "https://adventofcode-api.vercel.app/api/leaderboard";

export const leaderboardCode = "2939112-1da94e27";

export interface ModalType {
  isOpen: boolean;
  toggle: () => void;
}

export type Member = {
  global_score: number;
  id: number;
  last_star_ts: string;
  local_score: number;
  name: string;
  stars: number;
}