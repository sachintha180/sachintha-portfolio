import { FaPencilAlt } from "react-icons/fa";
import type { Experiment } from "../types/Experiment";
import { PiShareNetwork } from "react-icons/pi";

export const experiments: Experiment[] = [
  {
    id: "model",
    title: "Model Dashboard",
    link: "/model-dashboard",
    logo: <PiShareNetwork size={30} color="#3B82F6" />,
  },
  {
    id: "notes",
    title: "Notes by Siby",
    link: "https://sachintha180.github.io/notesbysiby.github.io/",
    logo: <FaPencilAlt size={30} color="#10B981" />,
  },
];
