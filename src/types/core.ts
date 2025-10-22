export type TPlayer = {
  playerId: string;
  playerName: string;
  playerScore: number;
  playerStatus: "active" | "idle";
  playerWordsFound: string[];
};
