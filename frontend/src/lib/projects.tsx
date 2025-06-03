import type { Project } from "../types/Project";
import { FaReact, FaChartLine, FaCode } from "react-icons/fa";
import { SiNextdotjs, SiOpenai, SiTensorflow } from "react-icons/si";

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "A responsive portfolio website built with React and TypeScript, featuring interactive UI elements and a clean design.",
    link: "https://github.com/username/portfolio",
    logo: <FaReact size={30} color="#3B82F6" />,
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description:
      "A conversational AI assistant built with Python and OpenAI's GPT models, capable of answering questions and performing tasks.",
    link: "https://github.com/username/ai-assistant",
    logo: <SiOpenai size={30} color="#10B981" />,
  },
  {
    id: "data-dashboard",
    title: "Data Analytics Dashboard",
    description:
      "An interactive dashboard for visualizing complex datasets, built with React and D3.js.",
    link: "https://github.com/username/data-dashboard",
    logo: <FaChartLine size={30} color="#8B5CF6" />,
  },
  {
    id: "ml-project",
    title: "Machine Learning Model",
    description:
      "A machine learning model for image classification using TensorFlow and Python, with a web interface for easy use.",
    link: "https://github.com/username/ml-project",
    logo: <SiTensorflow size={30} color="#F97316" />,
  },
  {
    id: "web-app",
    title: "Full-Stack Web App",
    description:
      "A complete web application with Next.js frontend and MongoDB backend, featuring user authentication and real-time updates.",
    link: "https://github.com/username/web-app",
    logo: <SiNextdotjs size={30} color="#1F2937" />,
  },
  {
    id: "api-service",
    title: "RESTful API Service",
    description:
      "A robust API service built with Python Flask, providing data access and manipulation for various client applications.",
    link: "https://github.com/username/api-service",
    logo: <FaCode size={30} color="#2563EB" />,
  },
];
