// SidebarRight.tsx

export default function SidebarRight() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold border-b-2 border-gray-300 mb-4">
        Hyperparameters
      </h2>

      <label htmlFor="activationFn" className="block text-sm font-medium">
        Model
      </label>
      <select
        id="activationFn"
        className="w-full p-2 border-2 border-gray-400 rounded"
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
        className="w-full p-2 border-2 border-gray-400 rounded"
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
        className="w-full p-2 border-2 border-gray-400 rounded"
      />

      <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Train Model
      </button>

      <button className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">
        Reset
      </button>

      <div className="mt-4">
        <h3 className="font-semibold text-sm mb-1">Training Logs</h3>
        <pre className="bg-gray-100 text-xs p-2 rounded h-32 overflow-y-auto">
          Epoch 1: Loss = 0.25
          {"\n"}Epoch 2: Loss = 0.18
          {"\n"}...
        </pre>
      </div>
    </div>
  );
}
