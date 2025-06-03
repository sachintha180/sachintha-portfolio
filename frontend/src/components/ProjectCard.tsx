import type { Project } from "../types/Project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border-gray-200 border-2 rounded-lg overflow-hidden p-4">
      {/* Logo/Icon */}
      <div className="w-12 h-12 mb-2 flex items-center justify-center">
        {project.logo}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {project.title}
      </h3>

      {/* Description with truncation */}
      <p className="text-gray-600 mb-4 line-clamp-3 h-[4.5rem]">
        {project.description}
      </p>

      {/* Link */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors duration-300"
      >
        View Project
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>
  );
}
