import Providers from "@/contexts/providers";
import BaseLayout from "@/layouts/base-layout.server";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boggle",
  description:
    "Boggle™ is a word game in which players attempt to find words in sequences of adjacent letters on a plastic grid of lettered dice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  );
}
