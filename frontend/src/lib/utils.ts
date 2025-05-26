// utils/cn.ts

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Side } from "../types/Connector";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function getCoords(rect: DOMRect, side?: Side) {
  switch (side) {
    case "left":
      return { x: rect.left, y: rect.top + rect.height / 2 };
    case "right":
      return { x: rect.right, y: rect.top + rect.height / 2 };
    case "top":
      return { x: rect.left + rect.width / 2, y: rect.top };
    case "bottom":
      return { x: rect.left + rect.width / 2, y: rect.bottom };
    default:
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
  }
}
