"use client";

import { useBoogleGridContext } from "@/contexts/boogle-grid-context";
import { cn } from "@/lib/utils";
import { TDice } from "@/types/core";
import { MouseEventHandler } from "react";

type DiceProps = TDice;
const Dice = ({
  diceId,
  diceLabel,
  diceValue,
  dicePosition,
  diceStatus,
}: DiceProps) => {
  const { state, dispatch } = useBoogleGridContext();
  const handleOnMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    if (!state.isTracing) return;

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
        }
      )}
      data-diceid={diceId}
      data-value={diceValue}
      data-position={dicePosition}
      onMouseEnter={handleOnMouseEnter}
    >
      {diceLabel}
    </div>
  );
};

export default Dice;
