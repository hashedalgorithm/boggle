import ThemeToggler from "@/components/theme-toggler";
import React, { PropsWithChildren } from "react";

type BaseLayoutProps = PropsWithChildren;

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="w-dvw h-dvh relative px-8 py-4">
      <ThemeToggler className="top-8 right-8 fixed" />
      {children}
    </div>
  );
};

export default BaseLayout;
