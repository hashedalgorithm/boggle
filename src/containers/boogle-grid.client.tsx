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
import {
  MouseEventHandler,
  SyntheticEvent,
  TouchEventHandler,
  useMemo,
} from "react";
import { toast } from "sonner";

const BoogleGrid = () => {
  const { state: gameConfig } = useGameContext();
  const { state, dispatch } = useBoogleGridContext();
  const { getActivePlayer, addWordToPlayerInventory } = useGameContextUtils();
  const { getWordWithPath, checkIsDiceAlreadyTraced } =
    useBoogleGridContextUtils();

  const sortedDices = useMemo(
    () =>
      Object.values(state.dices).sort((a, b) => {
        return a.dicePosition.position - b.dicePosition.position;
      }),
    [state.dices],
  );

  const handleOnStartTrace = (e: SyntheticEvent) => {
    if (state.isTracing) return;

    const diceId = getAttribute(e, "data-diceid");
    if (!diceId) return;

    dispatch({
      type: "start-tracing",
      diceId,
    });
  };

  const handleOnEndTrace = async () => {
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

  const handleOnMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    handleOnStartTrace(e);
  };

  const handleOnMouseUp: MouseEventHandler<HTMLDivElement> = async () => {
    await handleOnEndTrace();
  };

  const handleOnTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    console.log("hello");
    e.preventDefault();
    if (!state.isTracing) return;

    const touch = e.touches?.[0];

    if (!touch) {
      toast.error("Cant find the interaction!");
      return;
    }

    const diceId = document
      .elementFromPoint(touch.clientX, touch.clientY)
      ?.getAttribute("data-diceid");

    if (!diceId) return;

    const isDiceAlreadyTraced = checkIsDiceAlreadyTraced(diceId);

    if (isDiceAlreadyTraced) return;

    dispatch({
      type: "update-dice-status",
      diceId,
      status: "active",
    });
  };

  const handleOnTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const touch = e.changedTouches?.[0];

    if (!touch) {
      toast.error("Cant trace the interaction!");
      return;
    }

    handleOnStartTrace(e);
  };

  const handleOnTouchEnd: TouchEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    await handleOnEndTrace();
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
        touchAction: "none",
      }}
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onTouchMove={handleOnTouchMove}
    >
      {sortedDices.map((dice) => (
        <Dice key={`boogle-grid-client.dices.dice.${dice.diceId}`} {...dice} />
      ))}
    </div>
  );
};

export default BoogleGrid;
