"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGameContextUtils } from "@/contexts/game-controller-context";
import { cn } from "@/lib/utils";
import { TPlayer } from "@/types/core";

type ScoreBoardPlayerCardProps = Pick<
  TPlayer,
  "playerName" | "playerStatus" | "playerId"
>;

const ScoreBoardPlayerCard = ({
  playerId,
  playerName,
  playerStatus,
}: ScoreBoardPlayerCardProps) => {
  const { getPlayerScore } = useGameContextUtils();

  const playerScore = getPlayerScore(playerId);
  return (
    <div className="w-80 flex justify-between gap-8 items-center py-4 px-4 hover:bg-accent/40 hover:rounded-md">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0">
          <p>{playerName}</p>
          <p
            className={cn({
              "text-emerald-500": playerStatus === "playing",
              muted: playerStatus !== "playing",
            })}
          >
            {playerStatus === "playing"
              ? "Playing..."
              : playerStatus === "waiting"
              ? "Idle"
              : "Completed"}
          </p>
        </div>
      </div>

      <p className="strong text-xl">{playerScore}</p>
    </div>
  );
};

export default ScoreBoardPlayerCard;
