import type { Experiment } from "../../types/Experiment";

type ExperimentCardProps = {
  experiment: Experiment;
};

export default function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-lg border-2 border-gray-200 px-4 py-2">
      {/* Logo/Icon */}
      <div className="hidden h-12 w-12 items-center justify-center md:flex">
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
        className="ml-auto inline-flex items-center font-medium text-blue-600 transition-colors duration-300 hover:text-blue-800"
      >
        <svg
          className="h-6 w-6"
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
