export type TPlayer = {
  playerId: string;
  playerName: string;
  playerScore: number;
  playerStatus: "active" | "idle";
  playerWordsFound: string[];
};

export type TDiceStatus = "idle" | "active" | "not-available";
export type TDice = {
  diceId: string;
  dicePosition: number;
  diceLabel: string;
  diceValue: string;
  diceStatus: TDiceStatus;
};
