import type { Experiment } from "../types/Experiment";

interface ExperimentCardProps {
  experiment: Experiment;
}

export default function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <div className="border-gray-200 border-2 rounded-lg overflow-hidden px-4 py-2 flex items-center gap-2">
      {/* Logo/Icon */}
      <div className="w-12 h-12 md:flex items-center justify-center hidden">
        {experiment.logo}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">
        {experiment.title}
      </h3>

      {/* Link */}
      <a
        href={experiment.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors duration-300 ml-auto"
      >
        <svg
          className="w-6 h-6"
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
