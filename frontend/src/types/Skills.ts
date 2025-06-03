import type { IconType } from "react-icons";

export type Skill = {
  icon: IconType | string;
  name: string;
};

export type SkillsEntry = {
  skills: Skill[];
  color: string;
};
