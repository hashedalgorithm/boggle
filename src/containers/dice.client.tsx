"use client";

import { cn } from "@/lib/utils";
import { TDice } from "@/types/core";

type DiceProps = TDice & {
  isActive: boolean;
};

const Dice = ({
  diceId,
  diceLabel,
  diceValue,
  dicePosition,
  isActive,
}: DiceProps) => {
  return (
    <div
      className={cn(
        "p-5 hover:bg-accent rounded-md border border-accent flex justify-center items-center cursor-pointer",
        {
          "border-amber-400": isActive,
        }
      )}
      data-diceId={diceId}
      data-value={diceValue}
      data-position={dicePosition}
    >
      {diceLabel}
    </div>
  );
};

export default Dice;
