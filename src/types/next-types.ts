import type { ReactNode } from "react";

export type NextParams<K extends string = string> = Record<
  K,
  string | string[]
>;
export type NextParam = string | string[];

export type NextSearchParam = string | string[] | undefined;
export type NextSearchParams<K extends string = string> = Record<
  K,
  NextSearchParam
>;

export type NextLayoutProps<P extends string = string> = Readonly<{
  children: ReactNode;
  params: Promise<NextParams<P>>;
}>;

export type NextPageProps<
  SP extends string = string,
  P extends string = string
> = Readonly<{
  params: Promise<NextParams<P>>;
  searchParams: Promise<NextSearchParams<SP>>;
}>;

export type NextError = {
  error: Error & { digest?: string };
  reset: () => void;
};
