"use client";

import Dice from "@/containers/dice.client";
import {
  useBoogleGridContext,
  useBoogleGridContextUtils,
} from "@/contexts/boogle-grid-context";
import {
  useGameContext,
  useGameContextUtils,
} from "@/contexts/game-controller-context";
import { cn, getAttribute } from "@/lib/utils";
import { MouseEventHandler } from "react";
import { toast } from "sonner";

const BoogleGrid = () => {
  const { state: gameConfig } = useGameContext();
  const { state, dispatch } = useBoogleGridContext();
  const { getActivePlayer, addWordToPlayerInventory } = useGameContextUtils();
  const { getWordWithPath } = useBoogleGridContextUtils();

  const handleOnMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (state.isTracing) return;

    const diceId = getAttribute<HTMLDivElement, MouseEvent>(e, "data-diceid");
    if (!diceId) return;

    dispatch({
      type: "start-tracing",
      diceId,
    });
  };
  const handleOnMouseUp: MouseEventHandler<HTMLDivElement> = async () => {
    if (!state.isTracing) return;

    if (!gameConfig.currentPlayerId) {
      toast.error("Cant find active player!");
      return;
    }
    const activePlayer = getActivePlayer(gameConfig.currentPlayerId);

    if (!activePlayer) {
      toast.error("Cant find active player!");
      return;
    }

    await addWordToPlayerInventory(activePlayer.playerId, getWordWithPath());

    dispatch({
      type: "end-tracing",
    });
  };

  return (
    <div
      className={cn("grid gap-2", {
        "grid-rows-4": gameConfig.gridSize.rows === 4,
        "grid-cols-4": gameConfig.gridSize.columns === 4,
        "grid-rows-5": gameConfig.gridSize.rows === 5,
        "grid-cols-5": gameConfig.gridSize.columns === 5,
        "grid-rows-6": gameConfig.gridSize.rows === 6,
        "grid-cols-6": gameConfig.gridSize.columns === 6,
        "grid-rows-7": gameConfig.gridSize.rows === 7,
        "grid-cols-7": gameConfig.gridSize.columns === 7,
        "grid-rows-8": gameConfig.gridSize.rows === 8,
        "grid-cols-8": gameConfig.gridSize.columns === 8,
        "grid-rows-9": gameConfig.gridSize.rows === 9,
        "grid-cols-9": gameConfig.gridSize.columns === 9,
        "grid-rows-10": gameConfig.gridSize.rows === 10,
        "grid-cols-10": gameConfig.gridSize.columns === 10,
        "grid-rows-11": gameConfig.gridSize.rows === 11,
        "grid-cols-11": gameConfig.gridSize.columns === 11,
        "grid-rows-12": gameConfig.gridSize.rows === 12,
        "grid-cols-12": gameConfig.gridSize.columns === 12,
      })}
      style={{
        userSelect: "none",
      }}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
    >
      {Object.values(state.dices)
        .sort((a, b) => {
          return a.dicePosition.position - b.dicePosition.position;
        })
        .map((dice) => (
          <Dice
            key={`boogle-grid-client.dices.dice.${dice.diceId}`}
            {...dice}
          />
        ))}
    </div>
  );
};

export default BoogleGrid;
