import { NextLayoutProps } from "@/types/next-types";
import React from "react";

const ResultsLayout = ({ children }: NextLayoutProps) => {
  return (
    <section className="flex w-full h-full justify-center items-center">
      <div className="w-3/4 h-full flex flex-col justify-center items-center">
        {children}
      </div>
    </section>
  );
};

export default ResultsLayout;
