import { ThemeProvider } from "@/contexts/theme-provider/theme-provider.client";
import { PropsWithChildren } from "react";

type ProvidersProps = PropsWithChildren;

const Providers = ({ children }: ProvidersProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
