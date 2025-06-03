import {
  FaReact,
  FaPython,
  FaGit,
  FaChartBar,
  FaChartLine,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJquery,
  SiFlask,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiOpencv,
  SiHuggingface,
  SiLangchain,
  SiGithubactions,
  SiFirebase,
  SiGooglecloud,
  SiGnubash,
  SiPrisma,
  SiGodotengine,
  SiSqlite,
  SiPostgresql,
  SiGooglecolab,
} from "react-icons/si";
import { VscAzure, VscVscode } from "react-icons/vsc";
import { TbBrandMysql } from "react-icons/tb";
import { DiMongodb } from "react-icons/di";
import { BsKanban } from "react-icons/bs";
import type { Skill, SkillsEntry } from "../types/Skills";

const frontendSkills: Skill[] = [
  { icon: FaReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiJquery, name: "jQuery" },
];

const backendDataSkills: Skill[] = [
  { icon: FaPython, name: "Python" },
  { icon: SiFlask, name: "Flask" },
  { icon: SiPandas, name: "Pandas" },
  { icon: SiNumpy, name: "NumPy" },
  { icon: SiScikitlearn, name: "Scikit-learn" },
  { icon: FaChartLine, name: "Matplotlib" },
  { icon: FaChartBar, name: "Seaborn" },
  { icon: SiOpencv, name: "OpenCV" },
  { icon: SiLangchain, name: "LangChain" },
  { icon: SiHuggingface, name: "HuggingFace" },
  { icon: "L", name: "LlamaIndex" },
  { icon: SiGodotengine, name: "Godot" },
];

const databaseSkills: Skill[] = [
  { icon: DiMongodb, name: "MongoDB" },
  { icon: TbBrandMysql, name: "MySQL" },
  { icon: SiPrisma, name: "Prisma" },
  { icon: SiSqlite, name: "SQLite" },
  { icon: SiPostgresql, name: "PostgreSQL" },
];

const cloudDevopsSkills: Skill[] = [
  { icon: SiGooglecloud, name: "GCP" },
  { icon: VscAzure, name: "Azure" },
  { icon: SiFirebase, name: "Firebase" },
  { icon: SiGithubactions, name: "Git. Actions" },
  { icon: BsKanban, name: "Kanban" },
];

const platformSkills = [
  { icon: FaGit, name: "Git" },
  { icon: SiGnubash, name: "Bash" },
  { icon: VscVscode, name: "VSCode" },
  { icon: "G", name: "Gradio" },
  { icon: SiGooglecolab, name: "Google Colab" },
];

export const allSkills: Record<string, SkillsEntry> = {
  Frontend: {
    color: "#309898",
    skills: frontendSkills,
  },
  "Backend & Data": {
    color: "#3244a8",
    skills: backendDataSkills,
  },
  Database: {
    color: "#F4631E",
    skills: databaseSkills,
  },
  "Cloud & DevOps": {
    color: "#CB0404",
    skills: cloudDevopsSkills,
  },
  Platform: {
    color: "#333333",
    skills: platformSkills,
  },
};
