"use client";

import ScoreBoard from "@/containers/score-board.client";
import { NextLayoutProps } from "@/types/next-types";

const PlayLayout = ({ children }: NextLayoutProps) => {
  return (
    <section className="relative flex flex-col w-full h-full justify-center items-center">
      {children}
      <ScoreBoard />
    </section>
  );
};

export default PlayLayout;
