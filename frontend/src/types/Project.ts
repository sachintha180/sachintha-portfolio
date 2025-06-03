import type { ReactNode } from "react";

export type Project = {
  id: string;
  title: string;
  description: string;
  link: string;
  logo: ReactNode;
};
