import { clsx, type ClassValue } from "clsx";
import { SyntheticEvent } from "react";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uuid = () => v4();

export const getAttribute = <T extends Element, E extends Event>(
  e: SyntheticEvent<T, E>,
  attributeName: string
) => {
  const target = e.target as HTMLDivElement;

  if (!(target instanceof HTMLDivElement)) return;

  return target.getAttribute(attributeName)?.toString();
};
