"use client";

import { useGameContext } from "@/contexts/game-controller-context";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useTimer as useReactTimer } from "react-timer-hook";
import { toast } from "sonner";

type UseTimerProps = {
  minutes: number;
};
const useTimer = ({ minutes }: UseTimerProps) => {
  const router = useRouter();
  const { dispatch } = useGameContext();

  const onExpire = () => {
    toast.warning("Time up!!!");
    dispatch({
      type: "end-game",
    });
    router.push("/results");
  };

  const endTime = useMemo(() => {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + minutes);
    return currentDate;
  }, [minutes]);

  const { start, isRunning, totalSeconds, restart, ...timerProps } =
    useReactTimer({
      autoStart: false,
      expiryTimestamp: endTime ?? new Date(),
      onExpire,
    });

  const isTimerEnded = useMemo(() => totalSeconds === 0, [totalSeconds]);

  const callbacksStartTimer = useCallback(() => start(), [start]);
  const callbackRestartTimer = useCallback(
    (...args: Parameters<typeof restart>) => restart(...args),
    [restart]
  );

  useEffect(() => {
    if (!isRunning && !isTimerEnded && endTime) {
      callbacksStartTimer();
    }
  }, [callbacksStartTimer, endTime, isRunning, isTimerEnded]);

  useEffect(() => {
    if (isRunning && totalSeconds !== 0 && endTime) {
      callbackRestartTimer(endTime, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!endTime)
    return {
      ...timerProps,
      isRunning: false,
      isTimerEnded: false,
      totalSeconds,
    };

  return {
    ...timerProps,
    isRunning,
    isTimerEnded,
    totalSeconds,
  };
};

export { useTimer };
