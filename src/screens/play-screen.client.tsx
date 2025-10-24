"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BoogleGrid from "@/containers/boogle-grid.client";
import Timer from "@/containers/timer";
import {
  useGameContext,
  useGameContextUtils,
} from "@/contexts/game-controller-context";
import { Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useMemo } from "react";

const PlayScreen = () => {
  const { replace } = useRouter();
  const { state, dispatch } = useGameContext();
  const { getActivePlayer } = useGameContextUtils();

  const currentPlayer = useMemo(() => {
    if (!state.currentPlayerId) return;

    return getActivePlayer(state.currentPlayerId);
  }, [getActivePlayer, state.currentPlayerId]);

  const handleOnClickQuitGame: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({
      type: "end-game",
    });
    replace("/results");
  };

  if (state.status === "idle")
    return (
      <div className="flex flex-col items-center">
        <p></p>

        <Link href={"/"} className="mt-20">
          <Button>
            <Home />
            Home
          </Button>
        </Link>
      </div>
    );

  return (
    <section>
      <Timer className="mb-20" />
      <BoogleGrid />

      {currentPlayer && (
        <>
          <Separator className="my-8" />
          {currentPlayer.playerWordsFound.length > 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p className="muted text-lg">Recent Word</p>
              <p className="text-2xl font-medium">
                {currentPlayer?.playerWordsFound.at(-1)}
              </p>
            </div>
          ) : (
            <p className="text-center">Start Tracing along the letters!</p>
          )}
        </>
      )}

      <div className="flex w-full justify-center mt-10">
        <Button
          variant={"destructive"}
          className=""
          onClick={handleOnClickQuitGame}
        >
          Quit Game!
        </Button>
      </div>
    </section>
  );
};

export default PlayScreen;
