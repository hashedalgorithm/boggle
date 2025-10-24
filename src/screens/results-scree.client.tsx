"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import ResultsPlayerCard from "@/containers/results-player-card";
import { useGameContext } from "@/contexts/game-controller-context";
import { Rotate3d } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

const ResultsScreen = () => {
  const { push } = useRouter();
  const { state, dispatch } = useGameContext();

  const handleOnClickPlayAgain: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({
      type: "reset-game",
    });
    push("/");
  };

  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex  w-full items-center justify-between gap-12 mb-8">
        <h3 className="h3">Summary</h3>

        <Button onClick={handleOnClickPlayAgain}>
          <Rotate3d />
          Play Again
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {Object.values(state.players).map((player) => (
          <AccordionItem
            value={player.playerId}
            key={`results-screen.client.players.player-score-card.${player.playerId}`}
          >
            <AccordionTrigger>
              <ResultsPlayerCard
                playerId={player.playerId}
                playerName={player.playerName}
                playerWordsFound={player.playerWordsFound}
              />
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>{player.playerWordsFound.join(",")}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default ResultsScreen;
