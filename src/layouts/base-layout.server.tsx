import React, { PropsWithChildren } from "react";

type BaseLayoutProps = PropsWithChildren;

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return <div className="w-dvw h-dvh px-8 py-4">{children}</div>;
};

export default BaseLayout;
