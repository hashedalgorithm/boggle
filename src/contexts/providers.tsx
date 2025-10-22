import GameControllerProvider from "@/contexts/game-controller-context";
import { ThemeProvider } from "@/contexts/theme-provider/theme-provider.client";
import { PropsWithChildren } from "react";

type ProvidersProps = PropsWithChildren;

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <GameControllerProvider>{children}</GameControllerProvider>
    </ThemeProvider>
  );
};

export default Providers;
