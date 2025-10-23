"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGameContextUtils } from "@/contexts/game-controller-context";
import { TPlayer } from "@/types/core";

type ResultsPlayerCardProps = Pick<
  TPlayer,
  "playerName" | "playerId" | "playerWordsFound"
>;

const ResultslayerCard = ({
  playerId,
  playerName,
  playerWordsFound,
}: ResultsPlayerCardProps) => {
  const { getPlayerScore } = useGameContextUtils();

  const playerScore = getPlayerScore(playerId);

  return (
    <div className="w-full flex justify-between gap-8 items-center py-4 px-4 hover:bg-accent/40 hover:rounded-md">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <p>{playerName}</p>
          <p className="muted text-sm">{`Words found : ${playerWordsFound.length}`}</p>
        </div>
      </div>

      <p className="font-medium text-xl">{playerScore}</p>
    </div>
  );
};

export default ResultslayerCard;
