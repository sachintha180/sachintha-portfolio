import Perceptron from "../components/Perceptron";
import { generateTrainingLog } from "../lib/model";
import { FaPlay, FaStepForward, FaUndo } from "react-icons/fa";

export default function ModelDashboard() {
  return (
    <div className="font-title relative flex h-screen w-screen flex-col overflow-hidden p-5">
      {/* Header - fixed height */}
      <div className="h-[150px] flex-shrink-0">
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
                <button className="flex h-20 min-w-20 flex-col items-center justify-center gap-2 rounded-md bg-green-600 pt-1 pt-2 text-white hover:bg-green-700">
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
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Content Area: Horizontal split below header */}
      <div className="flex h-0 flex-grow">
        {/* Visualization */}
        <div className="flex w-3/5 flex-col gap-3 px-3">
          <div className="space-y-2">
            <h2 className="mb-4 border-b-2 border-gray-300 text-lg font-semibold">
              Visualization
            </h2>

            {/* Model Selector */}
            <label htmlFor="model" className="block text-sm font-medium">
              Model
            </label>
            <select
              id="model"
              className="w-full rounded border-2 border-gray-400 p-2"
            >
              <option value="perceptron">Perceptron</option>
            </select>
          </div>

          {/* Model and Statistics */}
          <div className="flex min-h-0 flex-1 gap-3">
            <div className="flex flex-1">
              <Perceptron />
            </div>
            <div className="flex w-[200px] flex-col rounded-md bg-gray-100">
              <h3 className="w-full rounded-t-md bg-gray-300 px-2 py-1 text-sm font-semibold">
                Training Logs
              </h3>
              <pre className="flex-1 overflow-y-auto rounded bg-gray-100 p-2 text-xs">
                {generateTrainingLog(500)}
              </pre>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex h-full w-2/5 flex-col space-y-10 overflow-y-auto px-3">
          {/* Initialization Controls */}
          <div className="space-y-2">
            <h2 className="mb-4 border-b-2 border-gray-300 text-lg font-semibold">
              Initialization
            </h2>

            {/* Dataset */}
            <label htmlFor="dataset" className="block text-sm font-medium">
              Dataset
            </label>
            <select
              id="dataset"
              className="w-full rounded border-2 border-gray-400 p-2"
            >
              <option value="and">AND</option>
              <option value="or">OR</option>
              <option value="linear">Linearly Separable</option>
              <option value="xor">XOR (for failure demo)</option>
            </select>

            {/* Number of Points */}
            <label
              htmlFor="numberOfPoints"
              className="block text-sm font-medium"
            >
              Number of Points
            </label>
            <input
              id="numberOfPoints"
              type="number"
              min={10}
              max={500}
              defaultValue={100}
              className="w-full rounded border-2 border-gray-400 p-2"
            />

            <button className="mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
              Generate Dataset
            </button>
          </div>

          {/* Hyperparameters Controls */}
          <div className="space-y-2">
            <h2 className="mb-4 border-b-2 border-gray-300 text-lg font-semibold">
              Hyperparameters
            </h2>

            {/* Activation Function */}
            <label htmlFor="activationFn" className="block text-sm font-medium">
              Activation Function
            </label>
            <select
              id="activationFn"
              className="w-full rounded border-2 border-gray-400 p-2"
            >
              <option value="sigmoid">Sigmoid</option>
              <option value="relu">ReLU</option>
            </select>

            {/* Learning Rate */}
            <label htmlFor="learningRate" className="block text-sm font-medium">
              Learning Rate
            </label>
            <input
              id="learningRate"
              type="number"
              step="0.01"
              defaultValue={0.1}
              className="w-full rounded border-2 border-gray-400 p-2"
            />

            {/* Epochs (i.e. generations) */}
            <label htmlFor="epochs" className="block text-sm font-medium">
              Epochs
            </label>
            <input
              id="epochs"
              type="number"
              min={1}
              max={1000}
              defaultValue={10}
              className="w-full rounded border-2 border-gray-400 p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
