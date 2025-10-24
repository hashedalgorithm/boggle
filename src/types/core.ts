export type TPlayer = {
  playerId: string;
  playerName: string;
  playerScore: number;
  playerStatus: "playing" | "waiting" | "completed";
  playerWordsFound: string[];
};

export type TDiceStatus = "idle" | "active" | "not-available";
export type TDice = {
  diceId: string;
  dicePosition: {
    x: number;
    y: number;
    position: number;
  };
  diceLabel: string;
  diceValue: string;
  diceStatus: TDiceStatus;
};
