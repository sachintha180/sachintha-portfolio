import type { Project } from "../../types/Project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-200 p-4">
      {/* Logo/Icon */}
      <div className="mb-2 flex h-12 w-12 items-center justify-center">
        {project.logo}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-xl font-semibold text-gray-800">
        {project.title}
      </h3>

      {/* Description with truncation */}
      <p className="mb-4 line-clamp-3 h-[4.5rem] text-gray-600">
        {project.description}
      </p>

      {/* Link */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center font-medium text-blue-600 transition-colors duration-300 hover:text-blue-800"
      >
        View Project
        <svg
          className="ml-1 h-4 w-4"
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
