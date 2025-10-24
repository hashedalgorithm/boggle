"use client";

import { Spinner } from "@/components/ui/spinner";
import {
  useGameContext,
  useGameContextUtils,
} from "@/contexts/game-controller-context";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type TimerProps = {
  className?: string;
};
const Timer = ({ className }: TimerProps) => {
  const router = useRouter();
  const { state, dispatch } = useGameContext();
  const { pickNextPlayer } = useGameContextUtils();

  const [timer, setTimer] = useState(state.time * 60);

  const onTimerExpire = useCallback(() => {
    toast.warning("Time up!!!");

    if (!state.currentPlayerId) {
      dispatch({
        type: "end-game",
      });
      router.push("/results");
      return;
    }

    dispatch({
      type: "update-player-status",
      playerId: state.currentPlayerId,
      status: "completed",
    });

    const nextPlayer = pickNextPlayer();

    if (!nextPlayer) {
      dispatch({
        type: "end-game",
      });
      router.push("/results");
      return;
    }

    dispatch({
      type: "set-active-player",
      playerId: nextPlayer.playerId,
    });

    setTimer(state.time * 60);
  }, [dispatch, pickNextPlayer, router, state.currentPlayerId, state.time]);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (timer && timer > 0) {
      t = setTimeout(() => {
        setTimer((prevState) => prevState && prevState - 1);
      }, 1000);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      onTimerExpire();
    }

    return () => t && clearInterval(t);
  }, [onTimerExpire, timer]);

  return (
    <div className={cn("w-full rounded-lg", className)}>
      <div
        className={cn(
          "py-2 w-full flex justify-center items-center rounded-lg gap-4"
        )}
      >
        {timer > 0 ? (
          <>
            <Spinner />
            <p className="font-medium">
              {`Time Remaining - 
             ${timer}`}
            </p>
          </>
        ) : (
          <p>Times up!</p>
        )}
      </div>
    </div>
  );
};

export default Timer;
