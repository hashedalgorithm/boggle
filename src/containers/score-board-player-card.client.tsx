"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TPlayer } from "@/types/core";

type ScoreBoardPlayerCardProps = Pick<
  TPlayer,
  "playerName" | "playerScore" | "playerStatus"
>;

const ScoreBoardPlayerCard = ({
  playerName,
  playerScore,
  playerStatus,
}: ScoreBoardPlayerCardProps) => {
  return (
    <div className="w-80 flex justify-between gap-8 items-center py-4 px-4 hover:bg-accent/40 hover:rounded-md">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0">
          <p>{playerName}</p>
          <p className="muted">
            {playerStatus === "active" ? "Playing..." : "Idle"}
          </p>
        </div>
      </div>

      <p className="strong text-xl">{playerScore}</p>
    </div>
  );
};

export default ScoreBoardPlayerCard;
