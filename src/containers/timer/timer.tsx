"use client";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { toast } from "sonner";

type TimerProps = {
  className?: string;
  minutes: number;
  seconds: number;
  isTimerEnded: boolean;
};
const Timer = ({ minutes, seconds, className, isTimerEnded }: TimerProps) => {
  useEffect(() => {
    if (seconds === 30 && minutes === 0) {
      toast.warning("Time is running out! Just 30 seconds left.");
    }
  }, [minutes, seconds]);
  return (
    <div className={cn("w-full rounded-lg z-100 boxshadow", className)}>
      <div
        className={cn(
          "py-2 w-full h-full flex justify-center items-center rounded-lg gap-4"
        )}
      >
        {!isTimerEnded ? (
          <>
            <Spinner />
            <p>{`Time Remaining - ${minutes}:${seconds}`}</p>
          </>
        ) : (
          <p>Times up!</p>
        )}
      </div>
    </div>
  );
};

export default Timer;
