"use client";

import Dice from "@/containers/dice.client";
import {
  useBoogleGridContext,
  useBoogleGridContextUtils,
} from "@/contexts/boogle-grid-context";
import { useGameContextUtils } from "@/contexts/game-controller-context";
import { getAttribute } from "@/lib/utils";
import { MouseEventHandler } from "react";
import { toast } from "sonner";

const BoogleGrid = () => {
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
  const handleOnMouseUp: MouseEventHandler<HTMLDivElement> = () => {
    if (!state.isTracing) return;

    const activePlayer = getActivePlayer();

    if (!activePlayer) {
      toast.error("Cant find active player!");
      return;
    }

    addWordToPlayerInventory(activePlayer.playerId, getWordWithPath());

    dispatch({
      type: "end-tracing",
    });
  };

  return (
    <div
      className="grid grid-cols-4 grid-rows-4 gap-2"
      style={{
        userSelect: "none",
      }}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
    >
      {Object.values(state.dices)
        .sort((a, b) => {
          return a.dicePosition - b.dicePosition;
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
