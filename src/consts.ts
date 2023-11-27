export const spreadsheetAPI = "https://sheet.best/api/sheets/be49a2bd-4c6f-4f8d-b9a7-bd8885c66e9f";
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