"use client";

import React, { PropsWithChildren } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

type ThemeProviderProps = PropsWithChildren;

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="dark">
      <Toaster richColors={true} position="bottom-right" />
      {children}
    </NextThemeProvider>
  );
};

export { ThemeProvider };
