import { FaPlay, FaQuestion, FaStepForward, FaUndo } from "react-icons/fa";

export default function ModelDashboardHeader() {
  return (
    <header className="mb-10 flex max-h-[250px] w-full rounded-sm">
      {/* Gradient Border Container */}
      <div className="w-full bg-gradient-to-r from-gray-800 to-transparent">
        {/* White Background Container */}
        <div className="mb-[2px] flex bg-white p-5">
          {/* Title */}
          <div className="flex flex-1 flex-col gap-2 self-center">
            <h1 className="text-3xl text-gray-800 lg:text-4xl 2xl:text-5xl">
              Model Playground
            </h1>
            <p className="text-xl text-gray-700">
              Interactive ML Visualization
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3">
            <button className="flex h-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md bg-green-600 pt-1 text-white hover:bg-green-700">
              <FaPlay size={20} />
              <span className="text-sm">Train</span>
            </button>
            <button className="flex h-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md bg-amber-600 pt-1 text-white hover:bg-amber-700">
              <FaStepForward size={20} />
              <span className="text-sm">Step</span>
            </button>
            <button className="flex h-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md bg-red-600 pt-1 text-white hover:bg-red-700">
              <FaUndo size={20} />
              <span className="text-sm">Reset</span>
            </button>
            <button className="flex h-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md bg-blue-600 pt-1 text-white hover:bg-blue-700">
              <FaQuestion size={20} />
              <span className="text-sm">Query</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
