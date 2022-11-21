export const spreadsheetAPI = "https://sheet.best/api/sheets/7b203d8b-41bf-4e81-a469-fb714033d1f9";
export const leaderboardAPI = "https://adventofcode-api.vercel.app/api/leaderboard";

export const leaderboardCode = "2250663-9283d116";

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