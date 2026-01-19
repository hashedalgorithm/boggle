"use client";

import {
  useBoogleGridContext,
  useBoogleGridContextUtils,
} from "@/contexts/boogle-grid-context";
import { cn } from "@/lib/utils";
import { TDice } from "@/types/core";
import { PointerEventHandler, useMemo } from "react";
import { toast } from "sonner";

type DiceProps = TDice;
const Dice = ({
  diceId,
  diceLabel,
  diceValue,
  dicePosition,
  diceStatus,
}: DiceProps) => {
  const { state, dispatch } = useBoogleGridContext();
  const { checkIsDiceAlreadyTraced, getAllowedPositions, getDice } =
    useBoogleGridContextUtils();

  const isDiceAlreadyTraced = checkIsDiceAlreadyTraced(diceId);

  const possibleNextMoves = useMemo(() => {
    if (!state.currentDiceId) return [];

    const currentDice = getDice(state.currentDiceId);

    if (!currentDice) return [];

    return getAllowedPositions(currentDice.dicePosition);
  }, [getAllowedPositions, getDice, state.currentDiceId]);

  const isPossibleMoveFromCurrentDice = useMemo(() => {
    if (state.currentDiceId === diceId) return false;
    if (isDiceAlreadyTraced) return false;

    return !!possibleNextMoves.find(
      (possibleMove) =>
        possibleMove.x === dicePosition.x && possibleMove.y === dicePosition.y,
    );
  }, [
    diceId,
    dicePosition.x,
    dicePosition.y,
    isDiceAlreadyTraced,
    possibleNextMoves,
    state.currentDiceId,
  ]);

  const handleOnPointerEnter: PointerEventHandler<HTMLDivElement> = () => {
    if (!state.isTracing) return;

    if (isDiceAlreadyTraced) {
      toast.warning("Move not allowed!");
      dispatch({
        type: "end-tracing",
      });
      return;
    }

    dispatch({
      type: "update-dice-status",
      diceId,
      status: "active",
    });
  };

  return (
    <div
      className={cn(
        "p-5 hover:bg-accent rounded-md border border-accent flex justify-center items-center cursor-pointer",
        {
          "border-amber-400": diceStatus === "active",
          "border-destructive": diceStatus === "not-available",
          "border-emerald-500/50": isPossibleMoveFromCurrentDice,
        },
      )}
      data-diceid={diceId}
      data-value={diceValue}
      data-position={dicePosition}
      onPointerEnter={handleOnPointerEnter}
    >
      {diceLabel}
    </div>
  );
};

export default Dice;
