import CentralCanvas from "../components/CentralCanvas";
import ModelDashboardHeader from "../components/ModelDashboardHeader";

export default function ModelDashboard() {
  return (
    <div className="font-title relative flex h-screen w-screen flex-col overflow-hidden p-5">
      {/* Header Row - Fixed at top */}
      <div className="z-30 flex-shrink-0">
        <ModelDashboardHeader />
      </div>

      {/* Content Section - Scrollable */}
      <section
        id="content"
        className="relative flex-grow space-y-15 overflow-y-auto px-3"
      >
        {/* Left Sidebar */}
        <div className="space-y-2">
          <h2 className="mb-4 border-b-2 border-gray-300 text-lg font-semibold">
            Initialization
          </h2>

          <label htmlFor="model" className="block text-sm font-medium">
            Model
          </label>
          <select
            id="model"
            className="w-full rounded border-2 border-gray-400 p-2"
          >
            <option value="perceptron">Perceptron</option>
          </select>

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

          <label htmlFor="numberOfPoints" className="block text-sm font-medium">
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

        {/* Central Canvas */}
        <CentralCanvas />

        {/* Sidebar Right */}
        <div className="space-y-2">
          <h2 className="mb-4 border-b-2 border-gray-300 text-lg font-semibold">
            Hyperparameters
          </h2>

          <label htmlFor="activationFn" className="block text-sm font-medium">
            Model
          </label>
          <select
            id="activationFn"
            className="w-full rounded border-2 border-gray-400 p-2"
          >
            <option value="sigmoid">Sigmoid</option>
            <option value="relu">ReLU</option>
          </select>

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

          <button className="mt-4 w-full rounded bg-green-600 py-2 text-white hover:bg-green-700">
            Train Model
          </button>

          <button className="w-full rounded bg-gray-300 py-2 hover:bg-gray-400">
            Reset
          </button>

          <div className="mt-4">
            <h3 className="mb-1 text-sm font-semibold">Training Logs</h3>
            <pre className="h-32 overflow-y-auto rounded bg-gray-100 p-2 text-xs">
              Epoch 1: Loss = 0.25
              {"\n"}Epoch 2: Loss = 0.18
              {"\n"}...
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
