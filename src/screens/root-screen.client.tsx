"use client";

import { Button } from "@/components/ui/button";
import GameConfiguration from "@/containers/game-configuration.client";
import { Play } from "lucide-react";
import { Activity, MouseEventHandler, useState } from "react";

const RootScreen = () => {
  const [showConfiguration, setShowConfiguration] = useState(false);

  const handleOnToggleShowConfiguration: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setShowConfiguration(!showConfiguration);
  };

  return (
    <section className=" h-full flex gap-4 flex-col w-full justify-center items-center">
      <h1 className="h1">Boggle!</h1>
      <p className="text-center">
        Boggle™ is a word game in which players attempt to find words in <br />
        sequences of adjacent letters on a plastic grid of lettered dice.
      </p>

      <Activity>
        <div className="mt-6">
          {showConfiguration ? (
            <GameConfiguration />
          ) : (
            <Button className="mt-6" onClick={handleOnToggleShowConfiguration}>
              <Play />
              Start!
            </Button>
          )}
        </div>
      </Activity>
    </section>
  );
};

export default RootScreen;
