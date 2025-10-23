"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import BoogleGrid from "@/containers/boogle-grid.client";
import Timer from "@/containers/timer/timer";
import { useTimer } from "@/containers/timer/use-timer";
import { useGameContext } from "@/contexts/game-controller-context";
import { Home } from "lucide-react";
import Link from "next/link";

const PlayScreen = () => {
  const { state } = useGameContext();
  const timerProps = useTimer({
    minutes: state.time,
  });

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
      <Timer className="mb-8" {...timerProps} />
      <BoogleGrid />
    </section>
  );
};

export default PlayScreen;
