"use client";

import Dice from "@/containers/dice.client";
import { uuid } from "@/lib/utils";
import { TDice } from "@/types/core";
import { MouseEventHandler, useMemo, useState } from "react";
import { toast } from "sonner";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWX";

const BoogleGrid = () => {
  const [activeDices, setActiveDices] = useState<string[]>([]);

  const dices = useMemo(() => {
    return Array.from(Array(16).keys()).map((value) => {
      // eslint-disable-next-line react-hooks/purity
      const randomIndex = Math.floor(Math.random() * alphabets.length);
      return {
        diceId: uuid(),
        diceLabel: alphabets[randomIndex],
        dicePosition: value,
        diceValue: alphabets[randomIndex].toLowerCase(),
      } satisfies TDice;
    });
  }, []);

  const handleOnClickBoogle: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;

    if (!(target instanceof HTMLDivElement)) return;

    const value = target.getAttribute("data-value")?.toString();

    if (!value) {
      toast.info("Invalid value");
      return;
    }

    setActiveDices(activeDices ? [...activeDices, value] : [value]);
  };

  return (
    <div
      className="grid grid-cols-4 grid-rows-4 gap-2"
      onClick={handleOnClickBoogle}
    >
      {dices.map((dice) => (
        <Dice
          key={`boogle-grid-client.dices.dice.${dice.diceId}`}
          {...dice}
          isActive={false}
        />
      ))}
    </div>
  );
};

export default BoogleGrid;
