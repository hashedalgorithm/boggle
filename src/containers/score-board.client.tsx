"use client";

import ScoreBoardPlayerCard from "@/containers/score-board-player-card.client";
import { useGameContext } from "@/contexts/game-controller-context";

const ScoreBoard = () => {
  const { state } = useGameContext();

  return (
    <section className="fixed bottom-0 right-8">
      {Object.values(state.players).map((player) => (
        <ScoreBoardPlayerCard
          key={`score-board.client.players.player${player.playerId}`}
          playerName={player.playerName}
          playerId={player.playerId}
          playerStatus={player.playerStatus}
        />
      ))}
    </section>
  );
};

export default ScoreBoard;
