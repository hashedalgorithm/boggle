"use client";

import GameConfiguration from "@/containers/game-configuration.client";

const RootScreen = () => {
  return (
    <section className=" h-full flex gap-4 flex-col w-full justify-center items-center">
      <h1 className="h1">Boggle!</h1>
      <p className="text-center">
        Boggle™ is a word game in which players attempt to find words in <br />
        sequences of adjacent letters on a plastic grid of lettered dice.
      </p>

      <div className="mt-6">
        <GameConfiguration />
      </div>
    </section>
  );
};

export default RootScreen;
